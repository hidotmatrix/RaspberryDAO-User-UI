import React from "react";
import "./spinner.css";

export default function LoadingSpinner({isApprovaltx,isSwaptx}) {
    let display_message = ""
    if(isApprovaltx){
        display_message = "Approving tokens..."
    } else if (isSwaptx){
        display_message = "Your NFT is swapping....."
    } else if (!isApprovaltx && !isSwaptx){
        display_message = "Fetching your NFTs..."
    }
  return (
    <div className="loader-container">
      	  <div className="spinner"></div>
          <div className="display-message">{display_message}</div>
    </div>
  );
}