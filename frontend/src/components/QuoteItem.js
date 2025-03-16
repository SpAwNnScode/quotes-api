import React, { useState } from "react";

const QuoteItem = ({ quote, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuote, setEditedQuote] = useState(quote.quoteText);
  const [editedCategory, setEditedCategory] = useState(quote.category);
  const [error, setError] = useState(null);

  const handleSave = async () => {
    if (!editedQuote || !editedCategory) {
      setError("Both text and category are required.");
      return;
    }
    try {
      const res = await fetch(`/api/quotes/${quote.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: editedQuote, category: editedCategory })
      });
      if (!res.ok) {
        throw new Error("Failed to update quote.");
      }
      const data = await res.json();
      onUpdate(data);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/quotes/${quote.id}`, {
        method: "DELETE"
      });
      if (!res.ok) {
        throw new Error("Failed to delete quote.");
      }
      await res.json();
      onDelete(quote.id);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <li
      style={{
        marginBottom: "1rem",
        padding: "1rem",
        border: "1px solid #ddd",
        borderRadius: "4px",
        backgroundColor: "#fff"
      }}
    >
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedQuote}
            onChange={(e) => setEditedQuote(e.target.value)}
          />
          <input
            type="text"
            value={editedCategory}
            onChange={(e) => setEditedCategory(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </>
      ) : (
        <>
          <blockquote>"{quote.quoteText}"</blockquote>
          <p>
            <strong>Category:</strong> {quote.category}
          </p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </>
      )}
    </li>
  );
};

export default QuoteItem;
