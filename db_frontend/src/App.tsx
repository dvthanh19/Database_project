import { Routes, Route, BrowserRouter } from 'react-router-dom'
import React from 'react';
import Login from './pages/Login'
import Question1 from './pages/Question1'
import Question2 from './pages/Question2'
import Question3 from './pages/Question3'
import Question4 from './pages/Question4'
import Home from './pages/Home'
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './route/ProtectedRoute';

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
              <Route path="/login" element={<Login/>} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Home/>
                </ProtectedRoute>
              } />
              <Route path="/question1" element={
                <ProtectedRoute>
                  <Question1/>
                </ProtectedRoute>
              } />
              <Route path="/question2" element={
                <ProtectedRoute>
                  <Question2/>
                </ProtectedRoute>
              } />
              <Route path="/question3" element={
                <ProtectedRoute>
                  <Question3/>
                </ProtectedRoute>
              } />
              <Route path="/question4" element={
                <ProtectedRoute>
                  <Question4/>
                </ProtectedRoute>
              } />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App