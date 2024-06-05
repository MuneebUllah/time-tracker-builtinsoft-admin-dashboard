import Api_Hits from '../../APIs/APIs'
import moment from 'moment'
import Swal from 'sweetalert2';

export default function useHook() {

    const getTotalTime = async (id , startDate , endDate ,setData , setLoading) => {
        const startDateInMillis = moment(startDate).valueOf();
        const endDateInMillis = moment(endDate).valueOf();
        const body = {
            startDate : startDateInMillis,
            endDate : endDateInMillis
        }
        await Api_Hits.getTotalTime(id , body)
        .then((responce)=>{
            setData(responce.data);
        })
    .catch((error)=>{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
    })
    .finally(()=>{setLoading(false)})
}

const usersNameById = async(id) =>{

    await Api_Hits.getUsersNameById(id)
    .then((response)=>{
        // console.log(response);
    })
    .catch((error) =>{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
    })

}
  return { getTotalTime , usersNameById}
}
