import React from "react";
import AdminNav from "../../components/nav/AdminNav";
const AdminDashBoard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">Admin page</div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
