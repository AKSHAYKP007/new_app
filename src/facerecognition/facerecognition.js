import React from 'react';
import './facerecognition.css';
const Facerecognition=({imageUrl,box}) =>{
	return(
    <div className='c'>
      <div className='absolute mt2'>
        <img id='inputimage' alt='' src={imageUrl} width='100px' height='100px'/>
        <div className='bounding_box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
      </div>
    </div>
  );
}
export default Facerecognition;