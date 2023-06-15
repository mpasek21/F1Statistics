
import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'bootstrap/dist/js/bootstrap.min.js';
import { Link } from 'react-router-dom';
import "./main.css"
const Main = () => {
  useEffect(() => {
    const carousel = document.querySelector('#carouselExampleSlidesOnly');
    const bsCarousel = new Carousel(carousel, {
      interval: 5000, 
      ride: true, 
    });

    return () => {
      bsCarousel.dispose();
    };
  }, []);

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
            <div className="row mt-4">
                <div className="col-md-6">
                    <div className="card">
                    <Link to="/drivers">
                        <img src="carousel1.jpg" className="card-img-top" alt="Banner 1" />
                        </Link>
                        <div className="card-body">
                            <h5 className="card-title">2023 Season is underway!</h5>
                            <p className="card-text">Click here to see all statistics from current F1 season</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                    <Link to="/list">
                        <img src="carousel2.jpg" className="card-img-top" alt="Banner 2" />
                        </Link>
                        <div className="card-body">
                            <h5 className="card-title">All circuits</h5>
                            <p className="card-text">Click above to see all tracks that ever appeared in F1</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
