import React from "react";

const ALert = ({ alert }) => {
  return (
    <div className="mb-2" style={{ height: '50px' }}>
            {alert &&
                <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                    <strong>{alert.type}</strong>: {alert.msg}
                </div>}
        </div>
  );
};

export default ALert;
