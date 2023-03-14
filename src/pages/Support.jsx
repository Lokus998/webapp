import React, { useEffect } from 'react'
import Hader from './../template_part/Hader';
import Sidebar from './../template_part/Sidebar';

function Support() {
    useEffect(()=>{
        (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/63518978b0d6371309ca9ee1/1gfr82028';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
        })();
    },[]);
    const openchatfunction=()=>{
            window.Tawk_API.toggle();
    
    //Example
    
    window.Tawk_API.onLoad = () =>{
        window.Tawk_API.toggle();
    };
    };
  return (
    <>
    <div className="leftContainer">
        <Hader/>
        <div   className="main-area" style={{paddingTop: '60px'}}>
        <div   className="cxy flex-column mx-4" style={{marginTop: '70px'}}>
        <img src="/assets/images/contact_us.png" width="280px" alt=""/>
    <div   className="games-section-title mt-4" style={{fontSize: '1.2em'}}>Contact us at below platforms.</div>
  <div  className="mt-4" onClick={openchatfunction} style={{fontSize: '20px', fontWeight: 500}}>
    <svg   className="MuiSvgIcon-root mr-2" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z">
    </path>
    </svg>Chat with us</div>
    
    <span   className="font-9 mt-3 mb-2">OR</span>
    <div   className="mt-2 d-flex justify-content-around w-80">
    <a   className="cxy flex-column" href="mailto:info@khelbro.com">
    <img width="50px" src="/images/mail.png" alt=""/>
    <span     className="footer-text-bold">info@khelbro.com</span></a></div>
                </div>
            </div>
    </div>
    <div className="divider-y"></div>
    <div className="rightContainer">
<Sidebar/>
    </div>
    </>
  )
}

export default Support