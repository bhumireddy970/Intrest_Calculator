import React from "react";
import "./history.css";

const History = ({ history }) => {
  return (
    <div className="history-page">
      <h1>లావాదేవీల చరిత్ర</h1>
      {history.length > 0 ? (
        <ul>
          {history.map((entry, index) => (
            <li key={index}>
              <strong>తేదీలు:</strong> {entry.startDate} - {entry.endDate} |{" "}
              <strong>అసలు:</strong> ₹{entry.principle} |{" "}
              <strong>వడ్డీ:</strong> ₹{entry.intrest} |{" "}
              <strong>మొత్తం:</strong> ₹{entry.amount}
            </li>
          ))}
        </ul>
      ) : (
        <p>చరిత్ర లభించదు</p>
      )}
    </div>
  );
};

export default History;
