import React from 'react'
import './AppDownload.css'
import header_img from '../../assets/frontend_assets/header_img.png'
import play_store from '../../assets/frontend_assets/play_store.png'
import app_store from '../../assets/frontend_assets/app_store.png'
const AppDownload = () => {
  return (
    <section className='app-download' id='app-download' >
      <div className="app-container">
        <div className="download-text">
          <h3>Get the Tomato App</h3>
          <p>For a better experience, download the Tomato app and order your favourite high-protein meals with a tap.</p>

          <div className="store-badges">
            <a href="#" aria-label="Download on the App Store">
              <img src={app_store} alt="App Store"/>
            </a>
            <a href="#" aria-label="Get it on Google Play">
              <img src={play_store} alt="Google Play"/>
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}

export default AppDownload
