import React from "react";
import "./Header.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import { img } from "../../Assets/images/images";
import { frontend_Base_URL } from "../../APIs/ApiHandle";
import { useParams } from "react-router-dom";

export default function Header() {
  const currentUrl = window.location.href
  const { id } = useParams()

  return (
    <div className="w-100  p-2" style={{ borderBottom: "1px solid #d9e0e5" }}>
      <div className=" gap-3 align-items-center">
        <div className=" d-flex justify-content-between gap-3 me-3 align-items-center">
          <div>
           
            <h2 className="header" >{currentUrl === `${frontend_Base_URL}/` ? 'Employees' : (currentUrl === `${frontend_Base_URL}/user-detail/${id}` ? localStorage.getItem('name') : (currentUrl === `${frontend_Base_URL}/user-screenshots/${id}` ? localStorage.getItem('name') : (currentUrl === `${frontend_Base_URL}/user-form` ? 'Add New User' : '')))}</h2>
          </div>
          <div className="d-flex justify-content-end gap-3 me-3">
            <img src={img.dami} alt="img" className="rounded-circle" style={{ width: "50px" }} />
            <div>
              <span style={{ fontWeight: "500" }}>BuiltinSoft</span>
              <p className="font-outfit mb-0">Manager</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
