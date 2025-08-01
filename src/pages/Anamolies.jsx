import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function Anomalies() {
  const [inputs, setInputs] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: ""
  });
  const [result, setResult] = useState(null);

  const formatPredictions = (result) => {
    if (!result) return "";

    const formattedResult = result
      .toString()
      .split(",")
      .filter((item) => item.trim() !== "" && parseFloat(item) !== 0)
      .join(",");

    return formattedResult || "N/A";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        inputs
      );
      setResult(response.data.predictions);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-[80%] flex flex-col items-center my-16">
        <div>
          <h1 className="outfit-600 text-[28px] text-center">Prediction</h1>
        </div>
        <form onSubmit={handleSubmit} className="w-full mt-4 mb-8">
          <div className="grid grid-cols-3 gap-4">
            <input
              className="input-field"
              type="text"
              name="input1"
              value={inputs.input1}
              onChange={handleInputChange}
              placeholder="Commodity Purchase ID"
            />
            <input
              className="input-field"
              type="text"
              name="input2"
              value={inputs.input2}
              onChange={handleInputChange}
              placeholder="Market type ID"
            />
            <input
              className="input-field"
              type="text"
              name="input3"
              value={inputs.input3}
              onChange={handleInputChange}
              placeholder="Market ID"
            />
            <input
              className="input-field"
              type="text"
              name="input4"
              value={inputs.input4}
              onChange={handleInputChange}
              placeholder="Year Recorded"
            />
            <input
              className="input-field"
              type="text"
              name="input5"
              value={inputs.input5}
              onChange={handleInputChange}
              placeholder="Country ID"
            />
            <input
              className="input-field"
              type="text"
              name="input6"
              value={inputs.input6}
              onChange={handleInputChange}
              placeholder="Locality ID"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-lg mt-4"
            >
              Submit
            </button>
          </div>
        </form>
        
        <div className="outfit-300 mt-8 px-16">
          <div>
            <span className="outfit-500">Predictions: </span>
            {formatPredictions(result)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Anomalies;
