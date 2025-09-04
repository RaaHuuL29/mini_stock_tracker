import React from "react";

function StockTable({ stocks, onUpdateQuantity }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Quantity</th>
          <th>Average Buy Price</th>
          <th>Total Invested</th>
          <th>Current Price</th>
          <th>Market Value</th>
          <th>Update Qty</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((s, i) => (
          <tr key={i}>
            <td>{s.symbol}</td>
            <td>{s.quantity}</td>
            <td>{s.averageBuyPrice}</td>
            <td>{s.totalInvested}</td>
            <td>{s.currentPrice}</td>
            <td>{s.marketValue}</td>
            <td>
              <input
                type="number"
                defaultValue={s.quantity}
                onBlur={(e) => onUpdateQuantity(s.symbol, e.target.value)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StockTable;
