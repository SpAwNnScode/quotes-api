import React, { useState } from "react";

const AddQuote = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text || !category) {
      setError("Both quote text and category are required.");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text, category })
      });

      if (!res.ok) {
        throw new Error("Failed to add quote.");
      }

      const data = await res.json();
      onAdd(data);
      setText("");
      setCategory("");
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginBottom: "2rem",
        backgroundColor: "#fff",
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "4px"
      }}
    >
      <h3>Add a New Quote</h3>
      <div>
        <label>Quote Text: </label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div>
        <label>Category: </label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Add Quote</button>
    </form>
  );
};

export default AddQuote;
