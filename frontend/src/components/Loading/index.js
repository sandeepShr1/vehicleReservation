import React from "react";
import loadingGif from "../../assets/loading.gif"

const index = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={loadingGif}
        alt=""
      />
    </div>
  );
};

export default index;
