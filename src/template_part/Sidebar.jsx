import React from 'react'
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
<div className="rcBanner flex-center">
<picture className="rcBanner-img-container">
<img src="/assets/images/gamesclashin.png" alt=""/>
</picture>
<div className="rcBanner-text">GamesClash
<span className="rcBanner-text-bold"> Win Real Cash!</span>
</div>
<div className="rcBanner-footer">For best experience, open <Link to={'/'}>
GamesClash.in </Link> 
<img src="/assets/images/global-chrome.png" alt=""/> chrome mobile</div>
</div>
  )
}

export default Sidebar