import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === '/admin') {
      navigate('/admin/dashboard');
    }
  }, []);

  return (
    <Outlet />
  )
}

export default Admin