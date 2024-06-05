import Api_Hits from '../../APIs/APIs'
import moment from 'moment'
import Swal from 'sweetalert2'

export default function useHook() {

  const ScreenShotsImages = async (id, date, setData , setLoading) => {
    const dateInMiliseconds = moment(date).valueOf()

    await Api_Hits.getScreenShotImages(id, dateInMiliseconds)
      .then((responce) => {
        console.log(responce);
        setData(responce.data);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      })
      .finally(()=>{setLoading(false)})
  }
  return { ScreenShotsImages }
}
