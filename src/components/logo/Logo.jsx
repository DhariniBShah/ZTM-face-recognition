import React from 'react';
import Tilt from 'react-parallax-tilt';
import './logo.css';
import brain from './brain.png';

const Logo = () => {
    return (
        <div className = 'ma3 mt0'>
            <Tilt 
            className="Tilt br2 shadow-2"
            perspective={500}
            glareEnable={true}
            glareMaxOpacity={0.45}
            scale={1.02}
            options={{ max : 65 }}>
                <div className="Tilt-inner pa3">
                    <img src = {brain} alt = 'brain-logo'/>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;