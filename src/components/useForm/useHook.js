import React from 'react'
import Api_Hits from '../../APIs/APIs';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
export default function useHook() {

  const navigate = useNavigate();
    const addUser = async (formData) => {
        await Api_Hits.signUp(formData )
        .then((responce)=>{
          if(responce.status === 201){
          navigate('/')
        }
        else{
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responce.data.errors[0],
          });
        }
        })
        .catch((error)=>{
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        })
      };
      const uploadImg = async(picture) => {
        const body = {
          'file': picture
        }
        console.log(picture);
        await Api_Hits.uploadImg(body)
        .then((res)=>{
          console.log(res);
        }).catch((error)=>{
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        })
      }
  return { addUser , uploadImg}
  
}
