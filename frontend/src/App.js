import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import QuoteList from "./components/QuoteList";
import RandomQuote from "./components/RandomQuote";
import AddQuote from "./components/AddQuote";
import "./App.css";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [error, setError] = useState(null);
  const [filterCategory, setFilterCategory] = useState("");

  // Fetch all quotes or filter by category using async/await and a relative URL
  const fetchQuotes = async (category = "") => {
    let url = "http://localhost:5000/api/quotes";
    if (category) {
      url += `?category=${category}`;
    }
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch quotes.");
      }
      const data = await res.json();
      setQuotes(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  // Handle filter buttons
  const handleFilter = (category) => {
    setFilterCategory(category);
    fetchQuotes(category);
  };

  // Handle new quote added
  const handleAddQuote = (newQuote) => {
    setQuotes((prevQuotes) => [...prevQuotes, newQuote]);
  };

  // Handle update quote
  const handleUpdateQuote = (updatedQuote) => {
    setQuotes((prevQuotes) =>
      prevQuotes.map((q) => (q.id === updatedQuote.id ? updatedQuote : q))
    );
  };

  // Handle delete quote
  const handleDeleteQuote = (id) => {
    setQuotes((prevQuotes) => prevQuotes.filter((q) => q.id !== id));
  };

  return (
    <div>
      <Header />
      <main>
        <h2>All Quotes {filterCategory && `- ${filterCategory}`}</h2>
        {error && <p>Error: {error}</p>}
        <AddQuote onAdd={handleAddQuote} />
        <QuoteList
          quotes={quotes}
          onUpdate={handleUpdateQuote}
          onDelete={handleDeleteQuote}
        />
        <div style={{ marginTop: "2rem" }}>
          <button onClick={() => handleFilter("")}>Show All</button>
          <button onClick={() => handleFilter("Inspiration")}>Inspiration</button>
          <button onClick={() => handleFilter("Motivation")}>Motivation</button>
          <button onClick={() => handleFilter("Positivity")}>Positivity</button>
        </div>
        <section style={{ marginTop: "3rem" }}>
          <h2>Random Quote</h2>
          <RandomQuote />
        </section>
      </main>
    </div>
  );
}

export default App;
