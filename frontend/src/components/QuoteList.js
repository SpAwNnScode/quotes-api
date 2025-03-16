import React from "react";
import QuoteItem from "./QuoteItem";

const QuoteList = ({ quotes, onUpdate, onDelete }) => {
  if (!quotes.length) return <p>No quotes available.</p>;

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {quotes.map((quote) => (
        <QuoteItem
          key={quote.id}
          quote={quote}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default QuoteList;
