import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { TaskItem } from "~/components/TaskItem";
import { TaskCreateForm } from "~/components/TaskCreateForm";
import { AppButton } from "~/components/AppButton";
import { Dialog } from "~/components/Dialog";
import { TaskEditForm } from "~/components/TaskEditForm";
import { ListEditForm } from "~/components/ListEditForm";
import { setCurrentList } from "~/store/list";
import { fetchTasks } from "~/store/task";
import "./index.css";

const ListIndex = () => {
  const dispatch = useDispatch();
  const { listId } = useParams();
  const navigate = useNavigate();
  const taskEditDialogRef = useRef(null);
  const listEditDialogRef = useRef(null);
  const [editingTask, setEditingTask] = useState(null);

  const isLoading = useSelector((state) => state.task.isLoading || state.list.isLoading);

  const tasks = useSelector((state) => state.task.tasks);
  const listName = useSelector((state) => {
    const currentId = state.list.current;
    const list = state.list.lists?.find((list) => list.id === currentId);
    return list?.title;
  });
  const incompleteTasksCount = useSelector((state) => {
    return state.task.tasks?.filter((task) => !task.done).length;
  });

  const handleEditList = () => {
    listEditDialogRef.current?.showModal();
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    taskEditDialogRef.current?.showModal();
  };

  useEffect(() => {
    dispatch(setCurrentList(listId));
    dispatch(fetchTasks()).unwrap();
  }, [listId]);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className="tasks_list">
      <Dialog ref={taskEditDialogRef}>
        {editingTask && (
          <TaskEditForm
            key={editingTask.id}
            task={editingTask}
            handleClose={() => taskEditDialogRef.current?.close()}
          />
        )}
      </Dialog>
      <Dialog ref={listEditDialogRef}>
        <ListEditForm
          listId={listId}
          listTitle={listName}
          handleClose={() => listEditDialogRef.current?.close()}
          onDelete={() => navigate(`/`)}
        />
      </Dialog>
      <div className="tasks_list__title">
        {listName}
        {incompleteTasksCount > 0 && (
          <span className="tasks_list__title__count">{incompleteTasksCount}</span>
        )}
        <div className="tasks_list__title_spacer"></div>
        <AppButton onClick={handleEditList}>Edit...</AppButton>
      </div>
      <div className="tasks_list__items">
        <TaskCreateForm />
        {tasks?.map((task) => {
          return <TaskItem key={task.id} task={task} handleEdit={handleEditTask} />;
        })}
        {tasks?.length === 0 && <div className="tasks_list__items__empty">No tasks yet!</div>}
      </div>
    </div>
  );
};

export default ListIndex;
