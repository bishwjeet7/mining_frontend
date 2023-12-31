// HomePage.js
import React, { useEffect, useState } from 'react';
import ncl from '../ncl.jpg';
import iit from '../iit_logo_original.png';
import '../../src/App.css';
import { Navigate } from 'react-router-dom';
import '../App.css'
import homepage_logo from '../homepage.jpg'

const HomePage = () => {
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRedirect(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='homePageLogo' style={{ backgroundImage: `url(${homepage_logo})` }}>
  <div className='headingBox'>
        <img src={iit} alt='iit'></img>
        <h1>TDR Application</h1>
        <img className='nclLogo' src={ncl} alt='ncl'></img>
      </div>
  <div className='details'>
    <h3>Project PI - Prof Sk Sharma</h3>
    <h3>Research Fellow - Kadam Mishra</h3>
  </div>
  {shouldRedirect && <Navigate to="/graph" />}
</div>

  );
}

export default HomePage;
