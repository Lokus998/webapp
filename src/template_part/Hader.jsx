import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase';
import { getDatabase, onValue, ref } from 'firebase/database';

function Hader() {
  const [UserLogin, setUserLogin] = useState(false);
  const [Sidenev, setSidenev] = useState(false);
  const [balance, setBalance] = useState(0);
  const [avatar, setavatar] = useState(1);
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setUserLogin(true);
      const dbRef = (ref(getDatabase(), 'User/'+user.uid));
onValue(dbRef, snapshot=>{
  if(snapshot.exists()){
setBalance(+snapshot.val().WINNINGSCASH+snapshot.val().DEPOSITCASH);
setavatar(snapshot.val().Avatar);
      }});
      }
      else {
        console.log('no user');
      }
    })

  });
  return (
    <>

    <div className={Sidenev===true?"sideNav-overlay":""} onClick={e=>setSidenev(false)} ></div>
    <div className={Sidenev===true?"sideNav sideNav-open": "sideNav"}>
    <Link className="sideNav-options" to={"/profile"}>
    <picture className="sideNav-icon">
    <img className="border-50" id="Avatar" src={"/assets/avatar/Avatar"+avatar+".png"} alt="My Profile"/>
</picture><div className="position-relative ml-3"><div className="sideNav-text">My Profile</div>
</div><picture className="sideNav-arrow"><img src="/assets/images/global-black-chevronRight.png" alt=""/>
</picture><div className="sideNav-divider"></div></Link><Link className="sideNav-options" to={"/"}>
<picture className="sideNav-icon"><img className="" src="/assets/images/gamepad.png" alt="Win Cash"/></picture>
<div className="position-relative ml-3"><div className="sideNav-text">Win Cash</div></div>
<picture className="sideNav-arrow"><img src="/assets/images/global-black-chevronRight.png" alt=""/></picture>
<div className="sideNav-divider"></div></Link><Link className="sideNav-options" to={"/wallet"}>
<picture className="sideNav-icon"><img className="" src="/assets/images/sidebar-wallet.png" alt="My Wallet"/></picture>
<div className="position-relative ml-3"><div className="sideNav-text">My Wallet</div></div>
<picture className="sideNav-arrow"><img src="/assets/images/global-black-chevronRight.png" alt=""/></picture>
<div className="sideNav-divider"></div></Link><Link className="sideNav-options" to={"/game-history"}>
<picture className="sideNav-icon"><img className="" src="/assets/images/sidebar-gamesHistory.png" alt="Games History"/>
</picture><div className="position-relative ml-3"><div className="sideNav-text">Games History</div></div>
<picture className="sideNav-arrow"><img src="/assets/images/global-black-chevronRight.png" alt=""/></picture>
<div className="sideNav-divider"></div></Link><Link className="sideNav-options" to={"/transaction-history"}>
<picture className="sideNav-icon"><img className="" src="/assets/images/order-history.png" alt="Transaction History"/>
</picture><div className="position-relative ml-3"><div className="sideNav-text">Transaction History</div>
</div><picture className="sideNav-arrow"><img src="/assets/images/global-black-chevronRight.png" alt=""/>
</picture><div className="sideNav-divider"></div></Link><Link className="sideNav-options" to={"/refer-earn"}>
<picture className="sideNav-icon"><img className="" src="/assets/images/sidebar-referEarn.png" alt="ReferEarn"/>
</picture><div className="position-relative ml-3"><div className="sideNav-text">Refer &amp; Earn</div></div>
<picture className="sideNav-arrow"><img src="/assets/images/global-black-chevronRight.png" alt=""/></picture>
<div className="sideNav-divider"></div></Link><Link className="sideNav-options" to={"/notification"}>
<picture className="sideNav-icon"><img className="" src="/assets/images/sidebar-notifications.png" alt="Notification"/>
</picture><div className="position-relative ml-3"><div className="sideNav-text">Notification</div></div>
<picture className="sideNav-arrow"><img src="/assets/images/global-black-chevronRight.png" alt=""/></picture>
<div className="sideNav-divider"></div></Link><Link className="sideNav-options" to={"/support"}>
<picture className="sideNav-icon"><img className="" src="/assets/images/sidebar-support.png" alt="Support"/></picture>
<div className="position-relative ml-3"><div className="sideNav-text">Support</div></div>
<picture className="sideNav-arrow"><img src="/assets/images/global-black-chevronRight.png" alt=""/>
</picture><div className="sideNav-divider"></div></Link></div>

      {UserLogin === true ?
        <div className="headerContainer">
        <Link onClick={e=>Sidenev===false?setSidenev(true):setSidenev(false)} className="cxy h-100">
        <picture className="sideNavIcon ml-3 mr-2"><img src="/assets/images/header-hamburger.png" alt=""/>
            </picture></Link><Link to={"/"}><picture className="ml-2 navLogo d-flex">
              <img src="/assets/images/gamesclashin.png" alt=""/></picture></Link><div>

            <div className="menu-items" ><Link className="box" to={"/add-funds"}>
              <picture className="moneyIcon-container">
                <img src="/assets/images/global-rupeeIcon.png" alt=""/></picture>
              <div className="mt-1 ml-1"><div className="moneyBox-header">Cash</div>
                <div className="moneyBox-text" id="wincash">{Math.floor(balance)}</div></div><picture className="moneyBox-add">
                <img src="/assets/images/global-addSign.png" alt=""/></picture></Link></div>
            <span className="mx-5"></span></div><span className="mx-5"></span>
        </div>

        :
        <div className="headerContainer">
          <Link to={"/"}><picture className="ml-2 navLogonon d-flex">
            <img src="/assets/images/gamesclesh.png" alt="" /></picture>
          </Link>
          <div className="menu-items">
            <Link type="button" className="login-btn border-success text-success" to={"/login"}>SIGNUP</Link>
            <Link type="button" className="login-btn" to={"/login"}>LOGIN</Link>
          </div><span className="mx-5"></span>
        </div>
      }
    </>
  )
}

export default Hader