import React from 'react'
import Footer from '../template_part/Footer';
import HomeMain from '../template_part/HomeMain';
import Hader from './../template_part/Hader';
import Sidebar from './../template_part/Sidebar';

function Home() {
  return (
    <>
    <div className="leftContainer">
        <Hader/>
        <HomeMain/>
        <Footer/>
    </div>
    <div className="divider-y"></div>
    <div className="rightContainer">
<Sidebar/>
    </div>
    </>
  )
}

export default Home