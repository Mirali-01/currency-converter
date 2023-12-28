import { useState } from "react";
import axios from "axios";
import "./App.css";
import CurrencyInfo from "./currencyInfo.json";

function App() {
  const [baseCurrency, setBaseCurrency] = useState("");
  const [currencies, setCurrencies] = useState("");
  const [amount, setAmount] = useState("");
  const [conversionData, setConversionData] = useState(null);
  const [currencyInfo, setCurrencyInfo] = useState([]);
  const [error, setError] = useState(null);

  const handleClear = () => {
    setBaseCurrency("");
    setCurrencies("");
    setAmount("");
    setConversionData(null);
    setCurrencyInfo([]);
    setError(null);
  };

  const handleConvert = async () => {
    try {
      const convertedBaseCurrencies = baseCurrency === "" ? "" : baseCurrency;
      const convertedCurrencies = currencies === "" ? "" : currencies;
      const response = await axios.post("http://localhost:5000/convert", {
        base_currency: convertedBaseCurrencies,
        currencies: convertedCurrencies,
        amount: amount,
      });
      setConversionData(response.data);
      setError(null);
    } catch (error) {
      setError("Invalid request. Please try again.");
      setConversionData(null);
    }
  };

  const handleBaseCurrencyChange = (e) => {
    setBaseCurrency(e.target.value);
  };

  const handleCurrencyChange = (e) => {
    setCurrencies(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleCurrencyInfoClick = (currency) => {
    setCurrencyInfo(CurrencyInfo[currency]);
    console.log(CurrencyInfo[currency]);
  };

  // Account for multiple currencies at To:
  return (
    <div className="App">
      <h1>Currency Converter</h1>
      <div className="currency-list">
        <h2>Available Currencies</h2>
        <ul>
          {Object.keys(CurrencyInfo).map((currency, index) => (
            <li key={index} onClick={() => handleCurrencyInfoClick(currency)}>
              {currency}
            </li>
          ))}
        </ul>
      </div>
      {currencyInfo && (
        <div className="currency-info">
          {/* <div>{currencyInfo.code}</div>
          <div>{currencyInfo.decimal_digits}</div> */}
          <div>{currencyInfo.name}</div>
          {/* <div>{currencyInfo.name_plural}</div> */}
          {/* <div>{currencyInfo.rounding}</div> */}
          <div>{currencyInfo.symbol}</div>
          {/* <div>{currencyInfo.symbol_native}</div> */}
        </div>
      )}
      <div className="form-container">
        <div className="input-container">
          <label>From:</label>
          <input
            type="text"
            maxLength={3}
            placeholder="USD"
            value={baseCurrency}
            onChange={handleBaseCurrencyChange}
          />
          <label>To:</label>
          <input
            type="text"
            // maxLength={3}
            value={currencies}
            onChange={handleCurrencyChange}
          />
        </div>
        <div className="input-container">
          <label>Amount:</label>
          <input type="text" value={amount} onChange={handleAmountChange} />
        </div>
      </div>
      <div className="buttons-container">
        <button onClick={handleConvert}>Convert</button>
        <button onClick={handleClear}>Clear</button>
      </div>

      {error && <p>{error}</p>}

      {conversionData && (
        <div>
          <h2>Converted Amounts</h2>
          <table>
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Converted Amount</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(conversionData).map(([ticker, value]) => (
                <tr key={ticker}>
                  <td>{ticker}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
