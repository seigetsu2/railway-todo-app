import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Sidebar } from '~/components/Sidebar'
import Home from '~/pages/index.page'
import NotFound from '~/pages/404'
import SignIn from '~/pages/signin/index.page'
import NewList from '~/pages/list/new/index.page'
import EditTask from '~/pages/lists/[listId]/tasks/[taskId]/index.page'
import SignUp from '~/pages/signup/index.page'
import EditList from '~/pages/lists/[listId]/edit/index.page'
import ListIndex from '~/pages/lists/[listId]/index.page'

export const Router = () => {
  const auth = useSelector((state) => state.auth.token !== null)

  return (
    <BrowserRouter>
      <Sidebar />
      <div className="main_content">
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={
            auth ? <Home /> : <Navigate replace to="/signin"/>
          } />
          <Route path="/lists/:listId" element={
            auth ? <ListIndex /> : <Navigate replace to="/signin"/>
          } />
          <Route path="/list/new" element={
            auth ? <NewList /> : <Navigate replace to="/signin"/>
          } />
          <Route path="/lists/:listId/tasks/:taskId" element={
            auth ? <EditTask /> : <Navigate replace to="/signin"/>
          } />
          <Route path="/lists/:listId/edit" element={
            auth ? <EditList /> : <Navigate replace to="/signin"/>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
