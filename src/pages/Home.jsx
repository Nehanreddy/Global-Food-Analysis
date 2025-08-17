import React from "react";

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Welcome to Global Food Analysis</h1>
      <p className="text-gray-700">
        This tool predicts market prices for food commodities using a machine learning model trained on historical market data.
      </p>
      <div className="border rounded-lg p-4">
        <h2 className="font-semibold mb-2">How it works</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Enter the six identifiers for a single case (commodity, price type, market, year, country, locality) and get a prediction.</li>
          <li>Or upload a CSV containing many rows to get batch predictions and download results.</li>
          <li>The backend runs locally at http://127.0.0.1:5000 using a trained RandomForest model.</li>
        </ol>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <a href="/single" className="border rounded p-4 hover:bg-gray-50">
          <h3 className="font-semibold">Single Prediction</h3>
          <p className="text-sm text-gray-600">Fill a form and get one prediction instantly.</p>
        </a>
        <a href="/batch" className="border rounded p-4 hover:bg-gray-50">
          <h3 className="font-semibold">Batch Prediction</h3>
          <p className="text-sm text-gray-600">Upload CSV, preview, map columns, run predictions, and download results.</p>
        </a>
      </div>
    </div>
  );
}
