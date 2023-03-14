import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../template_part/AdminSidebar'
import { Link } from 'react-router-dom'
import { getDatabase, onValue, ref, update } from 'firebase/database';


function Dashbord() {
  const db=getDatabase();
  const [razorpayAuto, setrazorpayAuto]=useState(false);
  const [razorpayManual, setrazorpayManual]=useState(false);

  useEffect(()=>{
onValue(ref(db, 'Admin'), snapshot=>{
if(snapshot.val().RazorpayProcess==='Auto'){
setrazorpayAuto(true);
setrazorpayManual(false);
}
else{
  setrazorpayManual(true);
  setrazorpayAuto(false);
};
});
  },[db]);
    const handelrazorpayAuto = ()=>{
update(ref(db, 'Admin'), {
  RazorpayProcess: 'Auto'
});
    };
    const handelrazorpayManual =()=>{
      update(ref(db, 'Admin'), {
        RazorpayProcess: 'Manual'
      });
    };
    const opensidenevs=()=>{

    };
  return (
<div className="container-fluid">
<div className="row">
<AdminSidebar/>

<div className="w-100 vh-100 position-fixed overlay d-none" id="sidebar-overlay"></div>
 <div className="col-md-9 col-lg-10 ml-md-auto px-0">
<nav className="w-100 d-flex px-4 py-2 mb-4 shadow-sm">
 <button className="btn py-0 d-lg-none" onClick={opensidenevs}>
<span className="bi bi-list text-primary h3"></span>
 </button>
  <div className="dropdown ml-auto">
<button className="btn py-0 d-flex align-items-center" id="logout-dropdown" data-toggle="dropdown" aria-expanded="false">
<span className="bi bi-person text-primary h4"></span>
  <span className="bi bi-chevron-down ml-1 mb-2 small"></span>
  </button>
   <div className="dropdown-menu dropdown-menu-right border-0 shadow-sm" aria-labelledby="logout-dropdown">
    <Link className="dropdown-item" href="#">Logout</Link>
  <Link className="dropdown-item" href="#">Settings</Link>
     </div> </div>  </nav>
 <main className="container-fluid">
 <section className="row">
  <div className="col-md-6 col-lg-4">
                     
     <article className="p-4 rounded shadow-sm border-left
                         mb-4">
                        <Link id="pathlink" href="#" className="d-flex align-items-center">
                          <span className="bi bi-controller h5"></span>
                          <h5 className="ml-2">Games</h5>
                        </Link>
                      </article>
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <article className="p-4 rounded shadow-sm border-left mb-4">
                        <Link href="/admin-panel/user/" className="d-flex align-items-center">
                          <span className="bi bi-person h5"></span>
                          <h5 className="ml-2">Users</h5>
                        </Link>
                      </article>
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <article className="p-4 rounded shadow-sm border-left mb-4">
                        <Link href="#" className="d-flex align-items-center">
                          <span className="bi bi-arrow-clockwise h5"></span>
                          <h5 className="ml-2">Active Lobby</h5>
                        </Link>
                      </article>
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <article className="p-4 rounded shadow-sm border-left mb-4">
                        <Link href="#" className="d-flex align-items-center">
                          <span className="bi bi-arrow-clockwise h5"></span>
                          <h5 className="ml-2">Razorpay Payment Process</h5>
                        </Link>
                        <br/>
  <input type="radio" id="auto" name="fav_language" value="HTML" onClick={handelrazorpayAuto} 
  checked={razorpayAuto}
  onChange={e=>e.target.value}
  />
  <label>Auto</label>
  <input type="radio" id="manuals" name="fav_language" value="CSS" onClick={handelrazorpayManual} 
checked={razorpayManual} onChange={e=>e.target.value}/>
  <label>Manual</label>
                      </article>
                    </div>
                  </section>
                  
                  <div className="jumbotron jumbotron-fluid rounded bg-white border-0 shadow-sm border-left px-4">
            <div className="container">
              <h1 className="display-4 mb-2 text-primary">Estimate Deposit Analytics</h1>
              <p className="lead text-muted">......</p>
            </div>
          </div>
                </main>
              </div>
</div>
</div>
  )
}

export default Dashbord