import React, { useEffect, useState } from 'react'
import Hader from './../template_part/Hader';
import Sidebar from './../template_part/Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

function TransactionHistory() {
const db = getDatabase();
const navigate = useNavigate();
const [UserID, setUserID] = useState(0);
const [visiblehistory, setvisiblehistory] = useState(false);
const [TranslationData, setTranslationData] = useState({TranslationData: []});

useEffect(()=>{
onAuthStateChanged(auth, user=>{
if(user){
setUserID(user.uid);
onValue(ref(db, 'Transaction'), snapshot=>{
const records = [];
snapshot.forEach(childsnapshot=>{
records.push(childsnapshot.val());
});
const SearchData = records.filter(data=> data.UserID.includes(UserID));
if(SearchData.length>=1){
setvisiblehistory(true);
};
records.sort((a,b)=>b.Ms-a.Ms);
setTranslationData({TranslationData:records});
});
}
else{
navigate('/login');
}
})
},[db, navigate, UserID]);

  return (
    <>
<div className="leftContainer">
        <Hader/>



 {visiblehistory===true ? 
 <div className="main-area" style={{paddingTop: '60px'}}>
 <nav aria-label="pagination navigation" className="MuiPagination-root d-flex justify-content-center">
 <ul className="MuiPagination-ul">
<li><button 
className="MuiButtonBase-root MuiPaginationItem-root MuiPaginationItem-page MuiPaginationItem-textSecondary Mui-disabled Mui-disabled"
type="button" 
aria-label="Go to previous page" disabled="">
<Link>
<svg className="MuiSvgIcon-root MuiPaginationItem-icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
</svg>
 </Link>
</button></li>

<li><button
className="MuiButtonBase-root MuiPaginationItem-root MuiPaginationItem-page MuiPaginationItem-textSecondary Mui-selected"
 type="button" aria-label="page 1" 
aria-current="true">1<span className="MuiTouchRipple-root"></span></button></li>
                        
<li><button
className="MuiButtonBase-root MuiPaginationItem-root MuiPaginationItem-page MuiPaginationItem-textSecondary"
 type="button" aria-label="Go to page 2">2<span className="MuiTouchRipple-root"></span></button></li>
<li><button
className="MuiButtonBase-root MuiPaginationItem-root MuiPaginationItem-page MuiPaginationItem-textSecondary"
 type="button" aria-label="Go to page 3">3<span className="MuiTouchRipple-root"></span></button></li>
<li><button
className="MuiButtonBase-root MuiPaginationItem-root MuiPaginationItem-page MuiPaginationItem-textSecondary"
 type="button" aria-label="Go to page 4">4<span className="MuiTouchRipple-root"></span></button></li>
<li><button
className="MuiButtonBase-root MuiPaginationItem-root MuiPaginationItem-page MuiPaginationItem-textSecondary"
 type="button" aria-label="Go to page 5">5<span className="MuiTouchRipple-root"></span></button></li>
<li><button
className="MuiButtonBase-root MuiPaginationItem-root MuiPaginationItem-page MuiPaginationItem-textSecondary"
 type="button" aria-label="Go to next page">
<Link>
<svg className="MuiSvgIcon-root MuiPaginationItem-icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
</svg><span className="MuiTouchRipple-root"></span></Link></button></li>
</ul>
 </nav>
 
 {TranslationData.TranslationData.filter(data=> data.UserID.includes(UserID)).map((row, index) =>{
return(
 <div className="w-100 py-3 d-flex align-items-center list-item" key={index}>
 <div className="center-xy list-date mx-2">
 <div>{row.Month}</div><small>{row.Time}</small></div>
 <div className="list-divider-y"></div>
 <div className="mx-3 d-flex list-body">
 <div className="d-flex align-items-center"></div>
 <div className="d-flex flex-column font-8">
 Cash {row.Type}  {row.Through}  
 <div className="games-section-headline">
 Payment ID: {row.PaymentID}
 </div> </div></div>
 <div className="right-0 d-flex align-items-end pr-3 flex-column">
 <div className="d-flex float-right font-8">
 <div className="text-success">
 <div className={row.Type}>{row.Symbol}</div>
 </div>
 <picture className="ml-1 mb-1">
 <img height="21px" width="21px" src="/assets/images/global-rupeeIcon.png" alt=""/>
 </picture>
 <span className="pl-1">{row.Amount}</span>
 </div>
 <div className="games-section-headline" style={{fontSize: '0.6em'}}>
 <div className={row.Status}>{row.Status}</div></div>
 </div></div>
)
})}
 </div>
 : 
 <div className="main-area" style={{paddingTop: '60px'}}>
 <div className="cxy flex-column px-4 text-center" style={{margin:'60px'}}>
 <img src="/assets/images/notransactionhistory.png" width={'220px'} alt=""/>
 <div className="games-section-title mt-4" style={{fontSize: '1.2em'}}>No transaction history!</div>
 <div className="games-section-headline mt-2" style={{fontSize: '0.85em'}}>
 Seems like you haven’t done any activity yet</div>
 </div></div>
 }

        
    </div>
    <div className="divider-y"></div>
    <div className="rightContainer">
<Sidebar/>
    </div>
    </>
  )
}

export default TransactionHistory