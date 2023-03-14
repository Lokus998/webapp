import { onAuthStateChanged } from 'firebase/auth';
import { child, get, getDatabase, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase';
import Hader from '../template_part/Hader'
import Sidebar from '../template_part/Sidebar'

function Wallet() {
const db = getDatabase();
const navigate = useNavigate();
const [depositCash, setDepositCash] = useState(0);
const [winningCash, setwinngCash] = useState(0);

useEffect(()=>{})
useEffect(() =>{
onAuthStateChanged(auth, user=>{
if(user){
get(child(ref(db), 'User/'+user.uid)).then(snapshot=>{
setDepositCash(snapshot.val().DEPOSITCASH);
setwinngCash(snapshot.val().WINNINGSCASH);
});
}
else{
    navigate('/login')
}
});
});
  return (
    <>
    <div className="leftContainer">
    <Hader/>
<div className="main-area" style={{paddingTop: '60px'}}>
<div className="p-4 bg-light">
<Link className="d-flex align-items-center profile-wallet undefined" to={"/transaction-history"}>
<picture className="ml-4">
<img width="32px" src="/assets/images/order-history.png" alt=""/>
</picture>
<div className="ml-5 mytext text-muted ">Order History</div>
</Link></div>
                
<div className="divider-x"></div>
<div className="p-4 bg-light">
<div 
className="wallet-card"
style={
{backgroundColor: 'rgb(71, 130, 244)', backgroundImage: 'url(/assets/images/bg-wallets-deposit.png)'}}>
<div className="d-flex align-items-center">
<picture className="mr-1">
<img height="26px" width="26px" src="/assets/images/global-rupeeIcon.png" alt=""/>
</picture>
<span className="text-white" style={{fontSize: '1.3em', fontWeight: '900'}}>₹ {depositCash}</span>
</div>
<div className="text-white text-uppercase" style={{fontSize: '0.9em', fontWeight: '500'}}>Deposit Cash</div>
<div className="mt-5" style={{fontSize: '0.9em', color: 'rgb(191, 211, 255)'}}>
Can be used to play Tournaments &amp; Battles.<br/>Cannot be withdrawn to Paytm or Bank.
</div>
<button 
className="walletCard-btn d-flex justify-content-center align-items-center text-uppercase" 
onClick={e=>navigate('/add-funds')}>Add Cash</button>
</div>

<div className="wallet-card"
style={
{backgroundColor: 'rgb(127, 153, 255)', backgroundImage: 'url(/assets/images/bg-wallets-winnings.png)'}}>
<div className="d-flex align-items-center">
<picture className="mr-1">
<img height="26px" width="26px" src="/assets/images/global-rupeeIcon.png" alt=""/>
</picture>
<span className="text-white" style={{fontSize: '1.3em', fontWeight: '900'}} id="wincashs">₹ {winningCash}</span>
</div>

<div className="text-white text-uppercase" style={{fontSize: '0.9em', fontWeight: 500}}>Winnings Cash</div>
<div className="mt-5" style={{fontSize: '0.9em', color: 'rgb(216, 224, 255)'}}>
Can be withdrawn to Paytm or Bank. Can be used to play Tournaments &amp; Battles.
</div>

<button
className="walletCard-btn d-flex justify-content-center align-items-center text-uppercase"
onClick={e=> navigate('/withdraw-funds')}>Withdraw</button>
</div></div></div>

    </div>
    <div className="divider-y"></div>
    <div className="rightContainer">
<Sidebar/>
    </div>
    </>
  )
}

export default Wallet