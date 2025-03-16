import { Router } from "express";
import dotenv from "dotenv";

dotenv.config();
const masterKey = process.env.MASTER_KEY;

const router = Router();

// In-memory data store for quotes
let quotes = [
  // Inspiration
  { id: 1, quoteText: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
  { id: 2, quoteText: "Act as if what you do makes a difference. It does.", category: "Inspiration" },
  { id: 3, quoteText: "Believe you can and you're halfway there.", category: "Inspiration" },
  { id: 4, quoteText: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", category: "Inspiration" },
  { id: 5, quoteText: "Everything you’ve ever wanted is on the other side of fear.", category: "Inspiration" },
  { id: 6, quoteText: "With the new day comes new strength and new thoughts.", category: "Inspiration" },
  { id: 7, quoteText: "Don’t watch the clock; do what it does. Keep going.", category: "Inspiration" },
  { id: 8, quoteText: "The way to get started is to quit talking and begin doing.", category: "Inspiration" },
  { id: 9, quoteText: "Quality means doing it right when no one is looking.", category: "Inspiration" },
  { id: 10, quoteText: "Be the change that you wish to see in the world.", category: "Inspiration" },
  { id: 11, quoteText: "You are never too old to set another goal or to dream a new dream.", category: "Inspiration" },
  { id: 12, quoteText: "Keep your eyes on the stars, and your feet on the ground.", category: "Inspiration" },
  { id: 13, quoteText: "Do not go where the path may lead, go instead where there is no path and leave a trail.", category: "Inspiration" },
  { id: 14, quoteText: "The best way to predict the future is to create it.", category: "Inspiration" },
  { id: 15, quoteText: "Your time is limited, so don’t waste it living someone else’s life.", category: "Inspiration" },
  { id: 16, quoteText: "The purpose of our lives is to be happy.", category: "Inspiration" },
  { id: 17, quoteText: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Inspiration" },

  // Motivation
  { id: 18, quoteText: "Life is 10% what happens to us and 90% how we react to it.", category: "Motivation" },
  { id: 19, quoteText: "Do what you can, with what you have, where you are.", category: "Motivation" },
  { id: 20, quoteText: "Setting goals is the first step in turning the invisible into the visible.", category: "Motivation" },
  { id: 21, quoteText: "Hardships often prepare ordinary people for an extraordinary destiny.", category: "Motivation" },
  { id: 22, quoteText: "Difficulties in life are intended to make us better, not bitter.", category: "Motivation" },
  { id: 23, quoteText: "You don’t have to be great to start, but you have to start to be great.", category: "Motivation" },
  { id: 24, quoteText: "We generate fears while we sit. We overcome them by action.", category: "Motivation" },
  { id: 25, quoteText: "Opportunities don’t happen. You create them.", category: "Motivation" },
  { id: 26, quoteText: "What you get by achieving your goals is not as important as what you become by achieving your goals.", category: "Motivation" },
  { id: 27, quoteText: "You miss 100% of the shots you don’t take.", category: "Motivation" },
  { id: 28, quoteText: "If you are not willing to risk the usual, you will have to settle for the ordinary.", category: "Motivation" },
  { id: 29, quoteText: "Do something today that your future self will thank you for.", category: "Motivation" },
  { id: 30, quoteText: "Work until your idols become your rivals.", category: "Motivation" },
  { id: 31, quoteText: "Dream big and dare to fail.", category: "Motivation" },
  { id: 32, quoteText: "A year from now you may wish you had started today.", category: "Motivation" },
  { id: 33, quoteText: "Little by little, one travels far.", category: "Motivation" },

  // Positivity
  { id: 34, quoteText: "Keep your face always toward the sunshine—and shadows will fall behind you.", category: "Positivity" },
  { id: 35, quoteText: "The only way to do great work is to love what you do.", category: "Positivity" },
  { id: 36, quoteText: "Happiness is not something ready made. It comes from your own actions.", category: "Positivity" },
  { id: 37, quoteText: "When you arise in the morning, think of what a precious privilege it is to be alive.", category: "Positivity" },
  { id: 38, quoteText: "The sun himself is weak when he first rises, and gathers strength and courage as the day gets on.", category: "Positivity" },
  { id: 39, quoteText: "Every day may not be good, but there's something good in every day.", category: "Positivity" },
  { id: 40, quoteText: "Happiness depends upon ourselves.", category: "Positivity" },
  { id: 41, quoteText: "Turn your wounds into wisdom.", category: "Positivity" },
  { id: 42, quoteText: "Live life to the fullest, and focus on the positive.", category: "Positivity" },
  { id: 43, quoteText: "Optimism is the faith that leads to achievement.", category: "Positivity" },
  { id: 44, quoteText: "It’s not whether you get knocked down, it’s whether you get up.", category: "Positivity" },
  { id: 45, quoteText: "Don’t let yesterday take up too much of today.", category: "Positivity" },
  { id: 46, quoteText: "Stay positive. Work hard. Make it happen.", category: "Positivity" },
  { id: 47, quoteText: "Believe in yourself and all that you are.", category: "Positivity" },
  { id: 48, quoteText: "There is nothing in a caterpillar that tells you it’s going to be a butterfly.", category: "Positivity" },
  { id: 49, quoteText: "Be yourself; everyone else is already taken.", category: "Positivity" },
  { id: 50, quoteText: "Light tomorrow with today.", category: "Positivity" },
];



const getNextId = () => (quotes.length ? Math.max(...quotes.map(q => q.id)) + 1 : 1);

// GET a random quote
router.get("/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  res.json(quotes[randomIndex]);
});

// GET a specific quote by ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const foundQuote = quotes.find((quote) => quote.id === id);
  if (!foundQuote) {
    return res.status(404).json({ message: "Quote not found" });
  }
  res.json(foundQuote);
});

// GET quotes all or filtered by category
router.get("/", (req, res) => {
  if (req.query.category) {
    const category = req.query.category;
    const filteredQuotes = quotes.filter((quote) =>
      quote.category.toLowerCase() === category.toLowerCase()
    );
    if (filteredQuotes.length > 0) {
      return res.json(filteredQuotes);
    } else {
      return res.status(404).json({ message: "No quotes found for this category" });
    }
  }
  res.json(quotes);
});

// POST a new quote
router.post("/", (req, res) => {
  const { text, category } = req.body;
  if (!text || !category) {
    return res.status(400).json({ message: "Quote text and category are required" });
  }
  const newQuote = {
    id: getNextId(),
    quoteText: text,
    category,
  };
  quotes.push(newQuote);
  res.status(201).json(newQuote);
});

// replace a quote
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { text, category } = req.body;
  if (!text || !category) {
    return res.status(400).json({ message: "Quote text and category are required" });
  }
  const quoteIndex = quotes.findIndex((quote) => quote.id === id);
  if (quoteIndex === -1) {
    return res.status(404).json({ message: "Quote not found" });
  }
  const updatedQuote = { id, quoteText: text, category };
  quotes[quoteIndex] = updatedQuote;
  res.json(updatedQuote);
});

// update a quote
router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const quote = quotes.find((quote) => quote.id === id);
  if (!quote) {
    return res.status(404).json({ message: "Quote not found" });
  }
  const { text, category } = req.body;
  if (text) quote.quoteText = text;
  if (category) quote.category = category;
  res.json(quote);
});

// DELETE a specific quote
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const quoteIndex = quotes.findIndex((quote) => quote.id === id);
  if (quoteIndex === -1) {
    return res.status(404).json({ message: "Quote not found" });
  }
  quotes.splice(quoteIndex, 1);
  res.status(200).json({ message: "Quote deleted" });
});

// DELETE all quotes 
router.delete("/all", (req, res) => {
  const userKey = req.query.key;
  if (userKey !== masterKey) {
    return res.status(403).json({ message: "Invalid master key" });
  }
  quotes = [];
  res.status(200).json({ message: "All quotes have been deleted" });
});

export default router;
