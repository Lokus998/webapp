import React from 'react'
import Hader from './../template_part/Hader';
import Sidebar from './../template_part/Sidebar';

function Notification() {
  return (
    <>
    <div className="leftContainer">
        <Hader/>
<div   className="main-area" style={{paddingTop: '60px'}}>
<div   className="cxy flex-column px-4 text-center" style={{marginTop: '70px'}}>
<img src="/assets/images/nonotification.png" width="220px" alt=""/>
<div   className="games-section-title mt-4" style={{fontSize: '1.2em'}}>No notification yet!</div>
<div   className="games-section-headline mt-2" style={{fontSize: '0.85em'}}>Seems like you haven’t done any
                        activity yet</div>
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

export default Notification