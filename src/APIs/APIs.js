import { Base_URL, Request } from "./ApiHandle";
import axios from 'axios';

export function configureHeaders() {
   axios.interceptors.request.use(
     (config) => {
       const accessToken = localStorage.getItem('token');
       if (accessToken) {
         config.headers.Authorization = `Bearer ${accessToken}`;
       }
       return config;
     },
     (error) => Promise.reject(error),
   );
 }
 //configure Interceptors
 export const configureInterceptors = () => {
   axios.interceptors.response.use(
     (response) => response,
     async (error) => {
       const originalRequest = error.config;
       if ((error.response.status === 498 || error.response.status === 401) && !originalRequest._retry) {
         originalRequest._retry = true;
         const token = localStorage.getItem("token");
         
         // const response = await refreshToken({ token });
         // const accessToken = response?.success?.data;
         // if (response.success) {
         //   localStorage.setItem('token', accessToken);
         // }
         return axios(originalRequest);
       }
       return Promise.reject(error);
     },
   );
 }

const header = {
   'Authorization' : `Bearer ${localStorage.getItem('token')}`
}
      
   const Api_Hits={
      signUp:(data )=>Request.post(Base_URL + "auth/register" ,data , { headers:header }),
      login:(data)=>Request.post(Base_URL + "auth/login" , data),
      forgetPassword:()=>Request.post(Base_URL + "auth/forgetPassword"),
      verifyOtpPassword:()=>Request.post(Base_URL + "auth/verifyForgetPasswordOtp"),
      changePassword:()=>Request.post(Base_URL + "auth/changePassword"),
      resetPassword:()=>Request.post(Base_URL + "auth/resetPassword"),
      uploadImg:(body)=>Request.post(Base_URL+"auth/upload" , body),
      getAllUsers:()=>Request.get(Base_URL + "auth/getAllUsers" , {headers:header}),
      getTotalTime:(id ,body)=>Request.get(Base_URL + `time-tracker/getTotalTimeById?userId=${id}&startDate=${body.startDate}${body.startDate === body.endDate ? '' :`&endDate=${body.endDate}`}` , {headers:header}),
      getUsersNameById:(id)=>Request.get(Base_URL + `auth/getUserById/${id}` , {headers:header}),
      getAllRecords:(userId )=>Request.get(Base_URL + `attendance/getRecordById/${userId}` , {headers:header}),
      getScreenShotImages:(id ,date)=>Request.get(Base_URL + `time-tracker/recordsById?userId=${id}&startDate=${date}` , {headers:header}),
      getScreenShots:(body )=>Request.post(Base_URL + `screenshots/getImagesByDate` ,body , {headers:header}),
      deleteUser:(id ) => Request.delete(Base_URL + `auth/${id}` , {headers:header})
}
export default  Api_Hits;
