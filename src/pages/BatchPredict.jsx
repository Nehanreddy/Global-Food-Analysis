import React, { useState } from "react";
import axios from "axios";

const REQUIRED = ['cm_id','pt_id','mkt_id','mp_year','adm0_id','adm1_id'];

export default function BatchPredict() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState({ columns: [], rows: [] }); // local preview only
  const [serverRows, setServerRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [csvDownload, setCsvDownload] = useState("");

  const onFileChange = (e) => {
    setError("");
    setServerRows([]);
    setCsvDownload("");
    const f = e.target.files?.[0];
    setFile(f || null);
    if (!f) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = reader.result;
        // simple CSV sniff for preview (first 20 rows)
        const lines = String(text).split(/\r?\n/).filter(Boolean);
        const headers = lines.split(",");
        const rows = lines.slice(1, 21).map(line => {
          const vals = line.split(",");
          const obj = {};
          headers.forEach((h, i) => obj[h.trim()] = vals[i]?.trim());
          return obj;
        });
        setPreview({ columns: headers, rows });
      } catch (e) {
        setError("Failed to read CSV preview.");
      }
    };
    reader.readAsText(f);
  };

  const uploadToServer = async () => {
    if (!file) { setError("Please choose a CSV file."); return; }
    // crude header check (optional – backend also validates)
    const hasAll = REQUIRED.every(r => preview.columns.includes(r));
    if (!hasAll) {
      setError(`CSV must contain columns: ${REQUIRED.join(", ")}`);
      return;
    }
    setLoading(true);
    setError("");
    setServerRows([]);
    setCsvDownload("");
    try {
      const form = new FormData();
      form.append("file", file);
      const { data } = await axios.post("http://127.0.0.1:5000/batch_predict", form, {
        headers: { "Content-Type": "multipart/form-data" },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      });
      setServerRows(data.rows || []);
      setCsvDownload(data.csv || "");
    } catch (err) {
      setError(err?.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = () => {
    const blob = new Blob([csvDownload], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "predictions.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Batch Prediction (CSV)</h1>
      <div className="text-gray-700">
        Upload a CSV with columns: <span className="font-mono">{REQUIRED.join(", ")}</span>.
      </div>

      <input type="file" accept=".csv" onChange={onFileChange} className="block" />

      {preview.columns.length > 0 && (
        <div className="border rounded p-4">
          <div className="font-semibold mb-2">CSV Preview (first 20 rows)</div>
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  {preview.columns.map((c) => <th key={c} className="border px-2 py-1 text-left">{c}</th>)}
                </tr>
              </thead>
              <tbody>
                {preview.rows.map((r, idx) => (
                  <tr key={idx}>
                    {preview.columns.map((c) => <td key={c} className="border px-2 py-1">{r[c] ?? ""}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button disabled={loading} onClick={uploadToServer} className="mt-3 bg-black text-white px-4 py-2 rounded">
            {loading ? "Predicting..." : "Run Predictions"}
          </button>
        </div>
      )}

      {error && <div className="text-red-600 text-sm">{error}</div>}

      {serverRows.length > 0 && (
        <div className="border rounded p-4">
          <div className="flex items-center justify-between">
            <div className="font-semibold">Results</div>
            {csvDownload && (
              <button onClick={downloadCSV} className="border px-3 py-1 rounded">Download CSV</button>
            )}
          </div>
          <div className="overflow-auto mt-3">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  {Object.keys(serverRows[0]).map(h => <th key={h} className="border px-2 py-1 text-left">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {serverRows.map((r, i) => (
                  <tr key={i}>
                    {Object.keys(serverRows).map(h => <td key={h} className="border px-2 py-1">{String(r[h])}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="text-sm text-gray-600">
        Tip: Large CSVs will take longer. Keep the server console open to observe progress and any validation messages.
      </div>
    </div>
  );
}
