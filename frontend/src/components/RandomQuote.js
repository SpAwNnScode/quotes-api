import React, { useState, useEffect } from "react";

const RandomQuote = () => {
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState(null);

  const fetchRandomQuote = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/quotes/random");
      if (!res.ok) {
        throw new Error("Failed to fetch random quote.");
      }
      const data = await res.json();
      setQuote(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!quote) return <p>Loading...</p>;

  return (
    <div
      style={{
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "4px",
        backgroundColor: "#fff"
      }}
    >
      <blockquote>"{quote.quoteText}"</blockquote>
      <p>
        <strong>Category:</strong> {quote.category}
      </p>
      <button onClick={fetchRandomQuote}>Get Another Random Quote</button>
    </div>
  );
};

export default RandomQuote;
