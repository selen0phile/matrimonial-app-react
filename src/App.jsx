import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Template from './layouts/Template'
import Account from './pages/Account'
import './App.css'
import Profile from './pages/Profile'
import Explore from './pages/Explore'
import Members from './pages/Members'
import Chat from './pages/Chat'
import Packages from './pages/Packages'
import Search from './pages/Search'
import { ProtectedRoute } from './layouts/ProtectedRoute'
import Logout from './pages/Logout'
import { Toaster } from 'react-hot-toast';
import { useSetAtom } from 'jotai';
import { loaderRefAtom } from './atoms/General'
import LoadingBar from 'react-top-loading-bar';
import { useEffect, useRef } from 'react'
import Conversation from './components/Conversation'

export default function App() {

  const loaderRef = useRef();
  const setLoaderRef = useSetAtom(loaderRefAtom)
  useEffect(() => {
    setLoaderRef(loaderRef);
  }, []);

  return (
    <>
      <LoadingBar color='white' ref={loaderRef} />
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoute />}>
            <Route path="/conversation/:id" element={<Conversation />} />
            <Route path="/" element={<Template />}>
              <Route path="/" element={<Explore />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/account" element={<Account />} />
              <Route path="/members" element={<Members />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/search" element={<Search />} />
              <Route path="/logout" element={<Logout />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
