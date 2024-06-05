import React, { useState } from 'react';
import './AddUserForm.scss';
import Layout from '../../Layout/Layout';
import useHook from './useHook'
import  imag  from '../../Assets/images/Boss.png'

export default function AddUserForm() {
  const {addUser , uploadImg} = useHook();
  const [picture , setPicture] = useState()
  const [formData, setFormData] = useState({
    name: '',
    stack: '',
    phone: '',
    email: '',
    password: '',
    screenshotTime: '',
    profilePicture: null
  });
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value, type, files } = e.target;
    let newValue;
  
    if (type === 'file') {
      // If the type is file, handle file upload
      if (files.length > 0) {
        uploadImg(files[0]).then(url => {
          // Assuming uploadImg returns a promise resolving to the uploaded image URL
          setFormData(prevState => ({
            ...prevState,
            [name]: url // Assuming the uploaded image URL should be stored
          }));
        }).catch(error => {
          console.error("Error uploading image: ", error);
        });
      }
    } else {
      // If not a file input, directly set the value
      newValue = value;
      setFormData(prevState => ({
        ...prevState,
        [name]: newValue
      }));
    }
  
    // If it's a file input and there are files, update the preview
    if (type === 'file' && files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const { current } = uploadedImage;
        current.file = files[0];
        current.src = e.target.result;
      };
      reader.readAsDataURL(files[0]);
    }
  };
  
  // function imgHandleChange(event) {
  //   const file = event.target.files[0];
    
  //   if (file) {
  //     const url = URL.createObjectURL(file);
  //     console.log("URL of the selected file:", url);
  //     return url;
  //   }
    
  //   return null; // Return null if no file selected
  // }

  const addNewUser =(e)=>{
e.preventDefault()
    addUser(formData)
    // navigate('/')
  }



  const handleImageUpload = e => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Layout>
    <div className='w-100 h-auto' style={{backgroundColor:"whitesmoke"}}>
      <div className="d-flex flex-column justify-content-center align-items-center w-100" style={{height: '100%'}}>
        <div className="shadow-lg bg-white rounded d-flex flex-column justify-content-center align-items-center p-3" style={{ width: "90%" }}>
    <h1>Add New Employees</h1>
          <form className="row d-flex flex-wrap p-3 text-start">
          <div className="col-6 py-2 d-grid justify-content-center w-100 text-center">
              {/* <img src={imag} width={150} height={150}/> */}
              {/* <label>Add Profile Picture</label> */}
              {/* <input className="input-img" type="file" name="profilePicture" onChange={handleChange} /> */}
             

              <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleChange  }
        ref={imageUploader}
        style={{
          display: "none"
        }}
      />
      <div
        style={{
          height: "120px",
          width: "120px",
        }}
        onClick={() => imageUploader.current.click()}
      >
        <img
          ref={uploadedImage}
          src={imag}
          style={{
            width: "120px",
            height: "120px",
            position: "relative",
            borderRadius:'50%'
          }}
        />
      </div>
      </div>



              {/* <input onChange={photoUpload} src={imagePreviewUrl}/> */}            
            </div>
              <div className="col-6 py-2 d-grid">
                <label>Name</label>
                <input className = "input"  type="text" name="name" value={formData.name} onChange={handleChange} placeholder="BuiltinSoft" required/>
              </div>
              <div className="col-6 py-2 d-grid">
                <label>Email</label>
                <input className = "input" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="testing@builtinsoft.com" required/>
              </div>
              <div className="col-6 py-2 d-grid">
                <label>Phone</label>
                <input className = "input" type="number" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required/>
              </div>
              <div className="col-6 py-2 d-grid">
                <label>Stack</label>
                <input className = "input" type="text" name="stack" value={formData.stack} onChange={handleChange} placeholder="Angular" required/>
              </div>
            <div className="col-6 py-2 d-grid">
              <label>Password</label>
              <input className = "input" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required/>
            </div>
            <div className="col-6 py-2 d-grid">
              <label>ScreenShot Time</label>
              <input className = "input" type="number" name="screenshotTime" value={formData.screenshotTime} onChange={handleChange} placeholder="Enter the time in minutes" required/>
            </div>
           
            <div className="example-box col-12 text-end p-2 pe-5">
              <button className="btn btn-primary button" onClick={addNewUser}>Save</button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </Layout>
  );
}
