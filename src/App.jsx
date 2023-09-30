import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import './assets/style/main.scss'

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { store } from './store/store'
import { AppHeader } from './cmps/AppHeader'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { ToyIndex } from './pages/ToyIndex'
import { ToyDetails } from './pages/ToyDetails'
import { AppFooter } from './cmps/AppFooter'
import { ToyEdit } from './pages/ToyEdit'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Dashboard } from './pages/Dashboard'

export function App() {

    return (
        <Provider store={store}>
            <Router>
                <AppHeader />
                <main className='flex algn-center justify-center'>
                    <Routes>
                        <Route element={<HomePage />} path="/" />
                        <Route element={<Dashboard />} path="/dashboard" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<AboutPage />} path="/about" />
                        <Route element={<ToyIndex />} path="/toy" />
                        <Route element={<ToyDetails />} path="/toy/:toyId" />
                        <Route element={<ToyEdit />} path="/toy/edit" />
                    </Routes>
                </main>
                <AppFooter />
            </Router>
        </Provider>
    )
}

export default App
