import React from 'react'
import { Link } from 'react-router-dom';

function AdminSidebar() {
  return (
    <div className="col-md-3 col-lg-2 px-0 position-fixed h-100 bg-white shadow-sm sidebar" id="sidebar">
    <h1 style={{textAlign: 'center', color: 'blue', border: '1px solid blue', borderRadius: '25px'}}>Dashboard</h1>
    <div className="list-group rounded-0">
      <Link  to={"/admin-panel"} className="list-group-item list-group-item-action active border-0 d-flex align-items-center">
        <span className="bi bi-border-all"></span>
        <span className="ml-2">Dashboard</span>
      </Link>
      <Link id="pathlink2" to={"/admin-panel/add-lobby/"} className="list-group-item list-group-item-action border-0 align-items-center">
        <span className="bi bi-controller"></span>
        <span className="ml-2">Add Lobby</span>
      </Link>

      <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#lobby-collapse">
        <div>
          <span className="bi bi-joystick"></span>
          <span className="ml-2">Lobby</span>
        </div>
        <span className="bi bi-chevron-down small"></span>
      </button>
      <div className="collapse" id="lobby-collapse" data-parent="#sidebar">
        <div className="list-group">
          <Link to={"/admin-panel/lobby/ludo_short/"} className="list-group-item list-group-item-action border-0 pl-5">Ludo Short</Link>
          <Link to={"/admin-panel/lobby/ludo_classic/"} className="list-group-item list-group-item-action border-0 pl-5">Ludo classic</Link>
        </div>
      </div>
      
      <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#Deposit-collapse">
        <div>
          <span className="bi bi-wallet2"></span>
          <span className="ml-2">Deposit</span>
        </div>
        <span className="bi bi-chevron-down small"></span>
      </button> 
<div className="container" id="badge">
<Link className="entypo-bell"></Link>
</div>
<div className="collapse" id="Deposit-collapse" data-parent="#sidebar">
        <div className="list-group">
          <Link to={"/admin-panel/deposit-all/"} className="list-group-item list-group-item-action border-0 pl-5">All Deposit</Link>
          <Link to={"/admin-panel/deposit-pending/"} className="list-group-item list-group-item-action border-0 pl-5">Pending Deposit</Link>
        </div>
      </div>


      <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#Withdrow-collapse">
        <div>
          <span className="bi bi-cash-stack"></span>
          <span className="ml-2">Withdraw</span>
        </div>
        <span className="bi bi-chevron-down small"></span>
      </button> 
<div className="container" id="badge">
<Link className="entypo-bell"></Link>
</div>
<div className="collapse" id="Withdrow-collapse" data-parent="#sidebar">
        <div className="list-group">
          <Link to={"/admin-panel/withdraw-all/"} className="list-group-item list-group-item-action border-0 pl-5">All Withdraw</Link>
          <Link to={"/admin-panel/withdraw-pending/"} className="list-group-item list-group-item-action border-0 pl-5">Pending Withdraw</Link>
        </div>
      </div>

    </div>
  </div>
  )
}

export default AdminSidebar