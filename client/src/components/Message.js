import React from "react";

const Message = (props) => {
  return (
    <div>
      <div role="alert" className="error">
        {props.message.msgBody.map((err, index) => (
          <h1 key={index}>-{err}</h1>
        ))}
      </div>
    </div>
  );
};

export default Message;
