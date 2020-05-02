import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return(
        <div>
            <p className = 'f5 fw6 dark-gray'>
                {'This Magic Brain will detect face in your pictures. Give it a try!'}
            </p>
            <div className = 'center'>
                <div className = 'form center pa4 br3 shadow-5'>
                    <input 
                    className = 'f5 pa2 w-70 center' 
                    type = 'text'
                    onChange = { onInputChange }    
                    />
                    <button 
                    className = 'w-30 grow f5 link ph3 pv2 dic white bg-light-purple'
                    onClick = {onButtonSubmit}
                    >Detect
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;