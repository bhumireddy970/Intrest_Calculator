import React, { useState } from "react";
import "./body.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Body = ({ history, setHistory }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [principle, setPrinciple] = useState("");
  const [rate, setRate] = useState("");
  const [timeDifference, setTimeDifference] = useState("");
  const [principleError, setPrincipleError] = useState("");
  const [rateError, setRateError] = useState("");
  const [intrest, setIntrest] = useState(0);
  const [amount, setAmount] = useState(0);

  const calIntrest = () => {
    setPrincipleError("");
    setRateError("");

    if (startDate instanceof Date && endDate instanceof Date) {
      const start = startDate;
      const end = endDate;

      if (end < start) {
        setTimeDifference("తేదీలను సరిగా నమోదు చేయండి!");
        return;
      }

      let tempYears = end.getFullYear() - start.getFullYear();
      let tempMonths = end.getMonth() - start.getMonth();
      let tempDays = end.getDate() - start.getDate();
      let totalMonths = tempYears * 12 + tempMonths + tempDays / 30;

      if (tempDays < 0) {
        tempMonths -= 1;
        tempDays += 30;
      }
      if (tempMonths < 0) {
        tempYears -= 1;
        tempMonths += 12;
      }

      setTimeDifference(
        `${tempYears} సంవత్సరాలు, ${tempMonths} నెలలు, ${tempDays} రోజులు`
      );
      const parsedPrinciple = parseFloat(principle);
      const parsedRate = parseFloat(rate);

      if (isNaN(parsedPrinciple) || parsedPrinciple <= 0) {
        setPrincipleError("దయచేసి సరైన అసలు నమోదు చేయండి.");
        return;
      }

      if (isNaN(parsedRate) || parsedRate <= 0) {
        setRateError("దయచేసి సరైన వడ్డీ నమోదు చేయండి.");
        return;
      }

      const calculatedInterest =
        (parsedPrinciple * totalMonths * parsedRate) / 100;
      setIntrest(calculatedInterest.toFixed(2));
      setAmount((parsedPrinciple + calculatedInterest).toFixed(2));

      // Update history
      const newEntry = {
        startDate,
        endDate,
        principle: parsedPrinciple,
        rate: parsedRate,
        intrest: calculatedInterest.toFixed(2),
        amount: (parsedPrinciple + calculatedInterest).toFixed(2),
      };
      setHistory([newEntry, ...history]);
    } else {
      setTimeDifference("దయచేసి తేదీలను నమోదు చేయండి.");
    }
  };

  const clearFields = () => {
    setStartDate(null);
    setEndDate(null);
    setPrinciple("");
    setRate("");
    setTimeDifference("");
    setPrincipleError("");
    setRateError("");
    setIntrest(0);
    setAmount(0);
  };

  return (
    <main className="main-container">
      <div className="body-container">
        <h2>
          <label>డబ్బులు తీసుకున్న తేది : </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd-MM-yyyy"
            placeholderText="Select Start Date"
            className="datepicker-input"
          />
        </h2>
        <h2>
          <label>డబ్బులు ఇస్తున్న తేది : </label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="dd-MM-yyyy"
            placeholderText="Select End Date"
            className="datepicker-input"
          />
        </h2>
        <h2>
          <label>అసలు : </label>
          <input
            type="number"
            placeholder="అసలు నమోదు చెయ్యండి"
            value={principle}
            onChange={(e) => setPrinciple(e.target.value)}
          />
        </h2>
        <h2>
          <label>వడ్డీ : </label>
          <input
            type="number"
            placeholder="వడ్డీ నమోదు చెయ్యండి"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </h2>
        <button className="button" onClick={calIntrest}>
          వడ్డీ లెక్కించండి
        </button>
        <button className="button clear-button" onClick={clearFields}>
          క్లియర్ చెయ్యండి
        </button>
        <div className="results">
          {timeDifference && <p className="error-message">{timeDifference}</p>}
          {principleError && <p className="error-message">{principleError}</p>}
          {rateError && <p className="error-message">{rateError}</p>}
          {amount > 0 && (
            <>
              <h3 className="success-message">మొత్తం వడ్డీ: ₹{intrest}</h3>
              <h3 className="success-message">
                మొత్తం ఇవ్వవలసిన డబ్బులు: ₹{amount}
              </h3>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Body;
