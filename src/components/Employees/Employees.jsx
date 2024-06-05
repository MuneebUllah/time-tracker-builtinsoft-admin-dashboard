import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Layout from '../../Layout/Layout';
import './Employees.scss'
import { useNavigate } from 'react-router-dom';
import useHook from './useHook';
import img from '../../Assets/images/delete.svg'
import eyeIcon from '../../Assets/images/eye.jpg'
import Swal from 'sweetalert2';
import Loader from '../loader/Loader';
import moment from 'moment';
export default function Employees() {
  const { getAllEmployees, Userdelete } = useHook()
  const [data, setData] = useState([])
  const [userName, setUserName] = useState('Muneeb')
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  const userData = (id, name) => {
    localStorage.setItem('name', name)
    navigate(`/user-detail/${id}`)
  }
  useEffect(() => {
    getAllEmployees(setData, setLoading)
    
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    const dateInMiliseconds = moment(formattedDate).valueOf()
    // console.log(moment.utc().valueOf() , dateInMiliseconds);

  }, [getAllEmployees])
  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        Userdelete(id)
      }
    });
  }
  return (
    <Layout userName={userName}>

      <div className='d-flex justify-content-center rounded-2 w-100 bg-white' >
        <div className='w-100'>
          {loading ?
            <Loader /> :
            (<table className="table table-striped mt-3" >
              <thead>
                <tr>
                  <th>Sr.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Stack</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  return (
                    <tr key={index} >
                      <td>{index + 1}</td>
                      <td ><p>{item.name}</p></td>
                      <td>{item.email}</td>
                      <td>{item.stack}</td>
                      <td className='d-flex gap-3'>
                        <img src={eyeIcon} style={{ width: "30px", height: "30px", cursor: "pointer" }} className='rounded-circle' alt='img' onClick={() => (userData(item._id, item.name))} />
                        <img src={img} alt='img' onClick={() => { deleteUser(item._id) }} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>)
          }
        </div>
      </div>
    </Layout>
  )
}
