import React, { useEffect, useState } from 'react'
import './SideBar.scss';
import { useNavigate, useParams } from 'react-router-dom';
import img from '../../Assets/images/user-profile-icon-free-vector.jpg'
import image from '../../Assets/images/timeDoctor.png'
import Swal from 'sweetalert2'


export default function SideBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate()
  const logout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log Out!"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        navigate('/login')
      }
    });
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        setSidebarOpen(false);
        // toggleSidebar()
      } else {
        // toggleSidebar()
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={sidebarOpen ? "sidebar-open text-white bg-white sidebar-toggle vh-100" : "text-white bg-white  sidebar-toggle vh-100"} >
      {/* <div className={(currentUrl === `${frontend_Base_URL}/user-detail/${id}` ? 'd-none' : '')}> */}
      <svg onClick={toggleSidebar} className="hb" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" stroke="#000" strokeWidth=".6" fill="rgba(0,0,0,0)" strokeLinecap="round" style={{ cursor: "pointer" }}>
        <path d="M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7">
          <animate dur="0.2s" attributeName="d" values="M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7;M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7" fill="freeze" begin="start.begin" />
          <animate dur="0.2s" attributeName="d" values="M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7;M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7" fill="freeze" begin="reverse.begin" />
        </path>
        <rect width="10" height="10" stroke="none">
          <animate dur="2s" id="reverse" attributeName="width" begin="click" />
        </rect>
        <rect width="10" height="10" stroke="none">
          <animate dur="0.001s" id="start" attributeName="width" values="10;0" fill="freeze" begin="click" />
          <animate dur="0.001s" attributeName="width" values="0;10" fill="freeze" begin="reverse.begin" />
        </rect>
      </svg>
      <div className='p-3 text-center'>
        <img src={image} width={150} />
      </div>
      <ul className='list-group'>
        <li className="list-group-item sidebar border-0 p-2 px-4 my-3" onClick={() => navigate('/home')}>
          <img src={img} alt='img' className="me-2 rounded-circle" width="30" height="30" />
          Employees
        </li>
      </ul>
      <div className='d-flex justify-conteny-center align-items-center gap-3 flex-column sideBar-buttons'>
        <button className="btn btn-primary float-end" style={{ width: "90%" }} onClick={() => { navigate('/user-form') }}>Add User</button>
        <button className="btn btn-danger" style={{ width: "90%" }} onClick={logout}>Log out</button>
      </div>


    </div>
    // </div>
  )
}
