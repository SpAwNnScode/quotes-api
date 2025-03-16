import express from "express";
import dotenv from "dotenv";
import quotesRouter from "./routes/quotes.js";
import cors from 'cors';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use("/api/quotes", quotesRouter);

app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`);
});