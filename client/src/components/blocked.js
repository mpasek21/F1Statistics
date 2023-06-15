import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Carousel } from 'bootstrap/dist/js/bootstrap.min.js';
const Blocked = () => {
    useEffect(() => {
        const carousel = document.querySelector('#carouselExampleSlidesOnly');
        const bsCarousel = new Carousel(carousel, {
          interval: 3500, 
          ride: true, 
        });
    
        return () => {
          bsCarousel.dispose();
        };
      });
  return (
    <div className="container">
    <h1 className='stats-text'>F1 Statistics</h1>

    <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="carousel1.jpg" className="d-block w-100 carousel-img" alt="Slide 1" style={{ height: '600px' }}/>
          <div className="carousel-caption">
            <h3>Welcome to F1 Stats page!</h3>
          </div>
        </div>
        <div className="carousel-item">
          <img src="carousel2.jpg" className="d-block w-100 carousel-img" alt="Slide 2" style={{ height: '600px' }}/>
          <div className="carousel-caption">
            <h3>Analyse drivers and results from previous races</h3>
          </div>
        </div>
        <div className="carousel-item">
          <img src="carousel3.jpg" className="d-block w-100 carousel-img" alt="Slide 3" style={{ height: '600px' }}/>
          <div className="carousel-caption">
            <h3>Take a look at charts and circuits for F1 world</h3>
          </div>
        </div>
      </div>
    </div>
    <div className="alert alert-info mt-3" role="alert" style={{textAlign: 'center', fontSize: '42px', fontWeight: 'bold'}}>
        Sign up to see all stats!
      </div>
    </div>
  );
};

export default Blocked;