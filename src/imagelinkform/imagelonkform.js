import React from 'react';
const Imagelinkform=({onInputChange,onSubmit}) =>{
	return(
        <div className='main'>
          <p classname='f3'>
           {'this magic brain will detect '}
          </p>
          <div>
            <input classname='f4 pa2 w-70 center' type='tex' onChange={onInputChange}/> 
            <button classname='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onSubmit}> detect </button>
          </div>  
        </div> 
    );
}
export default Imagelinkform;