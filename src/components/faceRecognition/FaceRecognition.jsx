import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ boxes , imageUrl }) => {
    return(
        <div className='ImageRecognition center mv3'>
          <div className='absolute'>
            {(imageUrl !== '') && <img id='inputImage' alt={'Face Recognized'} src={imageUrl} width='500px'/>  } 
            {boxes.map((box, index) =>
              <div key={index} className='bounding-box' style={{top: box.top_row, right: box.right_col, bottom: box.bottom_row, left: box.left_col}}>
                <div class = "bounding-box-concepts"> 
                  <div class="bounding-box__concept" title="face">
                    <span>face </span>
                    <span>{index+1}</span>
                  </div>
                </div>
              </div> 
            )}
          </div>
        </div>
      )
}

export default FaceRecognition;