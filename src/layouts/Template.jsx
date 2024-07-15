import { Outlet } from 'react-router-dom'
import AppBar from '../components/AppBar'
import Sidebar from '../components/Sidebar'
export default function Template() {
  return (
    <div>
      <AppBar />
      <Sidebar />
      <Outlet />
    </div>
  )
}
