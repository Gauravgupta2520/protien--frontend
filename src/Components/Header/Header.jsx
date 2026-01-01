import React from 'react'
import headerImg from './header_img.png'
import './Header.css'

const Header = () => {
  return (

    <div className='header' style={{backgroundImage: `url(${headerImg})`}}>
        <div className="header-Content">
            <h2>Order your favorite food here</h2>
            <p>Choose from a diverse menu ,the best food available in the town</p>
      
            <button className="header-btn">View Menu</button>
        </div>
      
    </div>
  )
}

export default Header
