import React from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import "./Portal.css";
import { GiCancel } from "react-icons/gi";
const DisplayData = ({ closePortal }) => {
  console.log(closePortal);
  const JSONData = useSelector((state) => state.JsonTransFormationReducer);
  return (
    <div className="portalContainer">
      <div className="cancelButtonPortal" onClick={closePortal}>
        <GiCancel size="30px" fill="#e8eaed" />
      </div>
      <pre className="jsonText">{JSON.stringify(JSONData, undefined, 2)}</pre>
    </div>
  );
};

const Portal = ({ closePortal }) => {
  return ReactDOM.createPortal(
    <DisplayData closePortal={closePortal} />,
    document.getElementById("portal")
  );
};

export default Portal;
