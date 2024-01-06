import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";
import CurrencyInfo from "./currencyInfo.json";
import ScrollToTopButton from "./components/ScrollToTopButton";

const defaultCurrency = "USD";

function App() {
  const [baseCurrency, setBaseCurrency] = useState("");
  const [currencies, setCurrencies] = useState("");
  const [amount, setAmount] = useState("");
  const [conversionData, setConversionData] = useState(null);
  const [currencyInfo, setCurrencyInfo] = useState(null);
  const [error, setError] = useState(null);
  const tableRef = useRef(null);

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [conversionData]);

  const handleClear = () => {
    setBaseCurrency("");
    setCurrencies("");
    setAmount("");
    setConversionData(null);
    setCurrencyInfo(CurrencyInfo[defaultCurrency]);
    setError(null);
  };

  const handleConvert = async () => {
    try {
      const response = await axios.post("http://localhost:5000/convert", {
        base_currency: baseCurrency,
        currencies: currencies,
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
  };

  const setDefaultCurrencyInfo = () => {
    setCurrencyInfo(CurrencyInfo[defaultCurrency]);
  };

  useEffect(() => {
    setDefaultCurrencyInfo();
  }, []);

  const handleOptionsChange = (e) => {
    setBaseCurrency(e.target.value);
  };

  return (
    <div className="App">
      <h1>Currency Converter</h1>
      <div className="currency-list">
        <h2>Currencies</h2>
        {currencyInfo ? (
          <div className="currency-info">
            <div>{currencyInfo.name}</div>
            <div>{currencyInfo.symbol}</div>
          </div>
        ) : (
          <div className="currency-info">
            <div>USD</div>
            <div>$</div>
          </div>
        )}
        <ul>
          {Object.keys(CurrencyInfo).map((currency, index) => (
            <li key={index} onClick={() => handleCurrencyInfoClick(currency)}>
              {currency}
            </li>
          ))}
        </ul>
      </div>
      <div className="form-container">
        <label>From:</label>
        <div className="input-container">
          <input
            type="text"
            maxLength={3}
            placeholder="USD"
            value={baseCurrency}
            onChange={handleBaseCurrencyChange}
          />
          <select
            id="baseCurrency"
            value={baseCurrency}
            onChange={handleOptionsChange}
          >
            {Object.keys(CurrencyInfo).map((currency, index) => (
              <option key={index} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <label>To:</label>
        <input
          type="text"
          placeholder="ALL"
          value={currencies}
          onChange={handleCurrencyChange}
        />
        <label>Amount:</label>
        <input
          type="text"
          placeholder="1"
          value={amount}
          onChange={handleAmountChange}
        />
      </div>
      <div className="buttons-container">
        <button onClick={handleConvert}>Convert</button>
        <button onClick={handleClear}>Clear</button>
      </div>

      {error && <p>{error}</p>}

      {conversionData && (
        <div ref={tableRef}>
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
      <ScrollToTopButton />
    </div>
  );
}

export default App;
