import React from "react";
import "./spinner.css";

export default function LoadingSpinner({ isApprovaltx, isSwaptx, theme }) {
  let display_message = "";
  if (isApprovaltx) {
    display_message = "Approving tokens...";
  } else if (isSwaptx) {
    display_message = "Your NFT is swapping.....";
  } else if (!isApprovaltx && !isSwaptx) {
    display_message = "Fetching your NFTs...";
  }
  const cName =
    theme !== "light" ? "loader-container-dark" : "loader-container-light";
  const dName =
    theme !== "light" ? "display-message-dark" : "display-message-light";
  return (
    <div className={cName}>
      <div className="spinner"></div>
      <div className={dName}>{display_message}</div>
    </div>
  );
}
