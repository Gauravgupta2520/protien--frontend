import React from 'react'
import './Footer.css'

import logo from '../../assets/frontend_assets/logo.png'    
import facebook_icon from '../../assets/frontend_assets/facebook_icon.png'
import twitter_icon from '../../assets/frontend_assets/twitter_icon.png'
import linkedin_icon from '../../assets/frontend_assets/linkedin_icon.png'
  

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      
      <div className="footer-content">

        {/* LEFT SECTION */}
        <div className="footer-content-left">
          <img src={logo} alt="logo" />

          <p>
            Our mission is to provide fresh, healthy, and high-protein meals that help people 
            meet their daily nutritional needs. We aim to make clean eating simple, accessible, 
            and delicious for everyone.
          </p>

          <div className="footer-social-icons">
            <img src={facebook_icon} alt="Facebook" />
            <img src={linkedin_icon} alt="LinkedIn" />
            <img src={twitter_icon} alt="Twitter" />
            
          </div>
        </div>

        {/* CENTER SECTION */}
        <div className="footer-content-center">
          <h3>Company</h3>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* RIGHT SECTION */}
        <div className="footer-content-right">
          <h2>Get In Touch</h2>
          <ul>
            <li>Phone: +123 456 7890</li>
            <li>Email: contact@tomato.com</li>
          </ul>
        </div>

      </div>

      <hr />

      <div className="footer-bottom">
        <p>© 2024 Tomato. All rights reserved.</p>
        <p>Designed by Gaurav and Urval</p>
      </div>

    </div>
  )
}

export default Footer
