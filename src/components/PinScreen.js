import React, { useState } from "react";

const PinScreen = ({ onPinEntered }) => {
  const [pin, setPin] = useState("");

  const handlePinInput = (digit) => {
    if (pin.length < 4) {
      setPin((prevPin) => prevPin + digit);
    }
  };

  const handleDeleteDigit = () => {
    setPin((prevPin) => prevPin.slice(0, -1));
  };

  const handleSubmit = () => {
    if (pin === "2903") {
      onPinEntered();
    } else {
      setPin("");
      alert("Invalid PIN. Please try again.");
    }
  };

  return (
    <div>
      <h5>Enter PIN to continue</h5>
      <div>
        <input style={{margin:"10px"}} type="password" value={pin} disabled />
      </div>
      <div>
        <button className="numpad" onClick={() => handlePinInput("1")}>1</button>
        <button className="numpad" onClick={() => handlePinInput("2")}>2</button>
        <button className="numpad" onClick={() => handlePinInput("3")}>3</button>
      </div>
      <div>
        <button className="numpad" onClick={() => handlePinInput("4")}>4</button>
        <button className="numpad" onClick={() => handlePinInput("5")}>5</button>
        <button className="numpad" onClick={() => handlePinInput("6")}>6</button>
      </div>
      <div>
        <button className="numpad" onClick={() => handlePinInput("7")}>7</button>
        <button className="numpad" onClick={() => handlePinInput("8")}>8</button>
        <button className="numpad" onClick={() => handlePinInput("9")}>9</button>
      </div>
      <div>
        <button className="numpad" onClick={handleDeleteDigit}>Delete</button>
        <button className="numpad" onClick={() => handlePinInput("0")}>0</button>
        <button className="numpad" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default PinScreen;
