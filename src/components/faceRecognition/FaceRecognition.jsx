import React from 'react';

const FaceRecognition = ({ imageUrl }) => {
    return (
        <div className = 'center ma'>
            <div className = 'absolute mt2'>
                <img 
                    className = 'ba b--light-silver' 
                    src = {imageUrl} 
                    alt = '' 
                    width = '500px' 
                    height = 'auto'
                />
            </div>
        </div>
    );
}

export default FaceRecognition;