import React, { useState, useCallback, memo } from "react";
import axios from "axios";

const initial = { cm_id:"", pt_id:"", mkt_id:"", mp_year:"", adm0_id:"", adm1_id:"" };

const Field = memo(function Field({label, name, placeholder, value, onChange}) {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-gray-600 mb-1" htmlFor={name}>{label}</label>
      <input
        id={name}
        className="border rounded px-3 py-2"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type="text"             // keep text to avoid browser reformat on number
        inputMode="numeric"     // mobile numeric keyboard
        pattern="[0-9]*"        // only digits
        autoComplete="off"
      />
    </div>
  );
});

export default function SinglePredict() {
  const [inputs, setInputs] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    // allow only digits
    if (/^\d*$/.test(value)) {
      setInputs(prev => ({ ...prev, [name]: value }));
    }
  }, []);

  const isValid = () =>
    Object.keys(initial).every((k) => inputs[k] !== "" && !Number.isNaN(Number(inputs[k])));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!isValid()) {
      setError("Please enter numeric values for all fields.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        input1: Number(inputs.cm_id),
        input2: Number(inputs.pt_id),
        input3: Number(inputs.mkt_id),
        input4: Number(inputs.mp_year),
        input5: Number(inputs.adm0_id),
        input6: Number(inputs.adm1_id),
      };
      const { data } = await axios.post("http://127.0.0.1:5000/predict", payload);
      setResult(data.predictions);
    } catch (err) {
      setError(err?.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">  {/* IMPORTANT: no dynamic key here */}
      <h1 className="text-xl font-semibold">Single Prediction</h1>
      <p className="text-gray-700">Enter identifiers below. Digits only.</p>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4">
        <Field label="Commodity ID (cm_id)" name="cm_id" placeholder="e.g., 1" value={inputs.cm_id} onChange={onChange} />
        <Field label="Price Type ID (pt_id)" name="pt_id" placeholder="e.g., 1" value={inputs.pt_id} onChange={onChange} />
        <Field label="Market ID (mkt_id)" name="mkt_id" placeholder="e.g., 42" value={inputs.mkt_id} onChange={onChange} />
        <Field label="Year (mp_year)" name="mp_year" placeholder="e.g., 2020" value={inputs.mp_year} onChange={onChange} />
        <Field label="Country ID (adm0_id)" name="adm0_id" placeholder="e.g., 3" value={inputs.adm0_id} onChange={onChange} />
        <Field label="Locality ID (adm1_id)" name="adm1_id" placeholder="e.g., 15" value={inputs.adm1_id} onChange={onChange} />

        <div className="md:col-span-3">
          <button disabled={loading} className="bg-black text-white px-4 py-2 rounded">
            {loading ? "Predicting..." : "Get Prediction"}
          </button>
          <button
            type="button"
            className="ml-3 px-3 py-2 border rounded"
            onClick={() => { setInputs(initial); setResult(null); setError(""); }}
          >
            Reset
          </button>
        </div>
      </form>

      {error && <div className="text-red-600 text-sm">{error}</div>}
      {result && (
        <div className="border rounded p-4">
          <div className="font-semibold">Prediction</div>
          <div className="text-gray-800">{Array.isArray(result) ? result[0] : result}</div>
        </div>
      )}
    </div>
  );
}
