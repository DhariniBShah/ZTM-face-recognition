import React from 'react';
import Tilt from 'react-parallax-tilt';
import './logo.css';
import brain from './face-detection.png';

const Logo = () => {
    return (
        <div className = 'ma3 mt0'>
            <Tilt 
            className="Tilt shadow-3"
            scale={1.08}
            >
                <div className="Tilt-inner pa3">
                    <img src = {brain} alt = 'brain-logo'/>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;