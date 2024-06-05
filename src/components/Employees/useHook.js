import Api_Hits from '../../APIs/APIs'
import Swal from 'sweetalert2'

export default function useHook() {
    const getAllEmployees =async (setData , setLoading) => {
        const header = {
            'Authorization' : `Bearer ${localStorage.getItem('token')}`
        }
        await Api_Hits.getAllUsers(header)
        .then((res)=> setData(res.data))
        .catch((error)=>{
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: "Oops...",
                text: error.message,
              });
            // Swal.fire({
            //     title: 'Error!',
            //     text: 'Do you want to continue',
            //     icon: 'error',
            //     confirmButtonText: 'Cool'
            //   })
        })
        .finally(()=>{setLoading(false)})
    }

    const Userdelete =async (id ) =>{
        const header = {
            'Authorization' : `Bearer ${localStorage.getItem('token')}`
        }
        await Api_Hits.deleteUser(id , header)
        .then((responce)=>{
            // console.log(responce);
        })
    .catch((error)=>{
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    })
}
return { getAllEmployees , Userdelete}
}
