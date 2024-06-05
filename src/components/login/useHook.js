import Api_Hits from '../../APIs/APIs';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
export default function useHook() {
  const navigate = useNavigate();
  const login = async (data) => {
    await Api_Hits.login(data)
      .then((responce) => {
        localStorage.setItem('token', responce.data.data.token)
        if (responce.data.status) {
          navigate('/')
        }
        else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please Enter The Correct Email & Password",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please Enter The Correct Email & Password",
          footer: '<a href="#">Why do I have this issue?</a>'
        });
      })
  };


  return { login };
}