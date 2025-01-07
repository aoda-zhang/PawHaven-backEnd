import React from "react";
const CommonFooter = () => {
  return (
    <div
      style={{
        fontSize: "10px",
        textAlign: "center",
        width: "100%",
      }}
    >
      第<span className="pageNumber"> </span>页，共
      <span className="totalPages"> </span>页
    </div>
  );
};

export default CommonFooter;
