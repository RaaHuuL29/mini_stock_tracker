import React, { useState, useEffect } from "react";
import AddStockForm from "./components/AddStockForm";
import StockTable from "./components/StockTable";
import PortfolioValue from "./components/PortfolioValue";
import "./App.css"

function App() {
  const [stocks, setStocks] = useState([]);
  const [portfolioValue, setPortfolioValue] = useState(0);

  const apiBase = "https://localhost:7124/api";

  const fetchStocks = async () => {
  try {
    const res = await fetch(`${apiBase}/stocks`);
    if (!res.ok) throw new Error("Server error");
    const data = await res.json();
    setStocks(data);
  } catch (err) {
    console.error("Error fetching stocks:", err.message);
    setStocks([]); 
  }
};

const fetchPortfolioValue = async () => {
  try {
    const res = await fetch(`${apiBase}/portfolio/value`);
    if (!res.ok) throw new Error("Server error");
    const data = await res.json();
    setPortfolioValue(data.totalPortfolioValue);
  } catch (err) {
    console.error("Error fetching portfolio value:", err.message);
    setPortfolioValue(0); 
  }
};

const addStock = async (stock) => {
  try {
    const response = await fetch(`${apiBase}/stocks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(stock),
    });

    if (!response.ok) {
      const errorText = await response.text();
      alert(errorText);
      return;
    }

    fetchStocks();
    fetchPortfolioValue();
  } catch (err) {
    console.error("Error adding stock:", err.message);
  }
};

const updateQuantity = async (symbol, quantity) => {
  try {
    await fetch(`${apiBase}/stocks/${symbol}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quantity),
    });
    fetchStocks();
    fetchPortfolioValue();
  } catch (err) {
    console.error("Error updating quantity:", err.message);
  }
};

  return (
    <div className="container">
      <h1>Mini Stock Tracker</h1>
      <AddStockForm onAddStock={addStock} />
      <StockTable stocks={stocks} onUpdateQuantity={updateQuantity} />
      <PortfolioValue value={portfolioValue} />
    </div>
  );
}

export default App;
