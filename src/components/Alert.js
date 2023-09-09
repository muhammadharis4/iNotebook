import React from "react";

const ALert = ({ message }) => {
  return (
    <div class="alert alert-primary" role="alert">
      {message}
    </div>
  );
};

export default ALert;
