import React from "react";
import "./history.css";

const History = ({ history }) => {
  return (
    <div className="history-page">
      <h1>లావాదేవీల చరిత్ర</h1>
      {history.length > 0 ? (
        <div className="history-grid">
          {history.map((entry, index) => {
            // Format the dates before rendering
            const formattedStartDate = new Date(
              entry.startDate
            ).toLocaleDateString("te-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
            const formattedEndDate = new Date(entry.endDate).toLocaleDateString(
              "te-IN",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            );

            return (
              <div key={index} className="history-card">
                <p>
                  <strong>తేదీలు:</strong> {formattedStartDate} -{" "}
                  {formattedEndDate}
                </p>
                <p>
                  <strong>అసలు:</strong> ₹{entry.principle}
                </p>
                <p>
                  <strong>వడ్డీ:</strong> ₹{entry.intrest}
                </p>
                <p>
                  <strong>మొత్తం:</strong> ₹{entry.amount}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <p>చరిత్ర లభించదు</p>
      )}
    </div>
  );
};

export default History;
