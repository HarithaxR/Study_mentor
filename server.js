import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/ask", (req, res) => {
  const { question, mode } = req.body;

  const q = question.toLowerCase();

  let explain = "";
  let summary = "";
  let points = "";
  let questions = "";

  if (q.includes("tcp")) {
    explain = "TCP (Transmission Control Protocol) ensures reliable data transmission between devices using a 3-way handshake.";
    summary = "TCP = reliable communication protocol.";
    points = "- Reliable\n- Ordered delivery\n- Error checking";
    questions = "1. What is TCP?\n2. Why is TCP reliable?";
  } 
  else if (q.includes("dns")) {
    explain = "DNS (Domain Name System) converts domain names into IP addresses so browsers can load websites.";
    summary = "DNS = internet phonebook.";
    points = "- Name to IP\n- Faster access\n- Used in browsing";
    questions = "1. What is DNS?\n2. Why is DNS important?";
  } 
  else {
    explain = `${question} is an important concept explained in a simple way for students.`;
    summary = `${question} is explained briefly for revision.`;
    points = "- Important topic\n- Used in real applications\n- Helpful for exams";
    questions = `1. What is ${question}?\n2. Explain ${question}.`;
  }

  let response = "";

  if (mode === "explain") response = "Explanation:\n" + explain;
  else if (mode === "summary") response = "Summary:\n" + summary;
  else if (mode === "points") response = "Key Points:\n" + points;
  else if (mode === "questions") response = "Practice Questions:\n" + questions;

  res.json(response);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});