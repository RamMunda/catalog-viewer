import { useState } from 'react';
import './App.css';
import preloader from './assets/preloader.gif';
import close from './assets/close.png';
import leftArrow from './assets/arrow-left.png';
import rightArrow from './assets/arrow-right.png';

import {data} from './components/Data';

var setinterval_var;
var count = 1;

function App() {

  const [currentImage,setcurrentimag] = useState({});
  const [imagepopup,setimagepopup] = useState(false);

  const onclickhandler = (id,url) =>{
    setimagepopup(true);
    setcurrentimag({id:id,url:url});
    document.querySelector('body').classList.add('body_set_overflow_class');
  }
  
  const imagecheckHandler = (v) =>{
    if(v==="prev"){
      if(currentImage.id===1){
        setcurrentimag({id:data.length,url:data[data.length-1].imgurl});
        return null;
      }
      setcurrentimag({id:currentImage.id-1,url:data[currentImage.id-2].imgurl});
    }
    if(v==="next"){
      if(currentImage.id===data.length){
        setcurrentimag({id:1,url:data[0].imgurl});
        return null;
      }
      setcurrentimag({id:currentImage.id+1,url:data[currentImage.id].imgurl});
    }
  }
  const resetHandler = () =>{
    clearInterval(setinterval_var);
    setcurrentimag({});
    setimagepopup(false);
    document.querySelector('body').classList.remove('body_set_overflow_class');
  }

  const imageSetterfunction = () =>{
    let currentImage_local_id = currentImage.id;

    if(count===(data.length - currentImage_local_id+1)){
      count = 1;
      currentImage_local_id = 0;
      currentImage.id = 0;
    }
    setcurrentimag({id:currentImage_local_id + count,url:data[currentImage_local_id + count-1].imgurl});
    count++;
  }

  const checkboxHandler = () =>{
    var autoslide = document.getElementById('autoslide');
    if(autoslide.checked === true){
        setinterval_var =  setInterval(() => {
          imageSetterfunction();
      }, 2500);
    }
    else{
      count = 1;
      clearInterval(setinterval_var);
    }
  }

  return (
    <div className="App">
       <div className="image_gallery">
         <h1>Image Gallery</h1>
         <div className="image_container">
            {
              data ? data.map(d =>(
                <img key={d.id} src={d.imgurl} alt={d.id + "photo"} onClick={()=>onclickhandler(d.id,d.imgurl)} />
                )) : <img src={preloader} alt="preloader" />
            }
         </div>
       </div>
       {
       imagepopup ?     
        <div className="slider_wrapper">
          <div className="sliding_area">
            <img src={close} alt="close" onClick={resetHandler} />
            <div className="auto_sliding_checkbox">
              <form>
                <input type="checkbox" id="autoslide" name="autoslide" onChange={checkboxHandler} />
                <label htmlFor="autoslide"> Auto Slide</label>
              </form>
            </div>
            <div className="slider_section">
            {currentImage ? <img src={currentImage.url} alt="currentimage" /> : null}
            <div className="left_arrow">
              <img src={leftArrow} alt="left_arrow" onClick={() =>imagecheckHandler("prev")} />
            </div>
            <div className="right_arrow">
              <img src={rightArrow} alt="right_arrow" onClick={()=>imagecheckHandler("next")} />
            </div>
          </div>
          </div>
        </div>
       : null
       }

    </div>
  );
}

export default App;
