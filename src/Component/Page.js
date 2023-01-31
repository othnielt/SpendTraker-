import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Component.css'
import  image  from  '../media/undraw_invest.png'; 




/* .

 first  page that will be display page  
*/
 export function WelcomePage (){

 return  <div className="body-color">
 <div className="h-300 d-flex align-items-center">
 <div className="w-100 text-center">
   <h1 className="my-4">Wecome to Spend Tracker!</h1>
 </div>
</div>

</div>

}

/* .

Image first page 
*/



 export function WelcomePageImage(){


    return  <div  className = "d-flex align-items-center justify-content-center" > 

        <img src={image} alt= "image" />
    </div>




}



//className="d-flex align-items-center justify-content-center/


