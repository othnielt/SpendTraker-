import React, { useEffect, useRef, useContex } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Components.css";
import image from "../media/undraw_invest.png";
import lottie from "lottie-web";
import animationData from "../media/wallet.json";
import {  useNavigate } from "react-router-dom";


/* .

 first  page that will be display page  
*/
export function WelcomePage() {
  return (
    <div>
      <div className="body-color">
        <div className="h-300 d-flex align-items-center">
          <div className="w-100 text-center">
            <h1 className="my-4">Wecome to Spend Tracker!</h1>
          </div>
        </div>
      </div>

      <MoneyAnimation />
    </div>
  );
}

/* .

Image first page 
*/

export function WelcomePageImage() {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <img src={image} alt="image" />
    </div>
  );
}

/**
 *
 * @returns
 * Navigation Button
 */

export function NavigateButton() {
  const navigator = useNavigate();
 
  return (
    <div className="d-flex align-items-center justify-content-center">
      <button
        type="button"
        className="btn btn-outline-primary "
        onClick={() =>  navigator("/login")}
      >
        {" "}
        Continue{" "}
      </button>
    </div>
  );
}

export function MoneyAnimation() {
  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      animationData,
      renderer: "svg",
      loop: true,
      autoplay: true,
    });

    return () => {
      lottie.destroy();
    };
  }, [animationData]);

  return (
    <div className="row ">
      <div className="d-flex align-items-center justify-content-center "> </div>
      <div
        ref={container}
        className="MoneyAnimation justify-content-center d-flex align-items-center col "
      >
        {" "}
      </div>

      <h1 className="ustify-content-center d-flex align-items-center col ">
        {" "}
        Track and optimize your expenses with Spend Tracker
      </h1>

      <div>
        {" "}
        <NavigateButton/>
      </div>
    </div>
  );
}















