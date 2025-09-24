import express from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import fs from 'fs';
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Multer setup for PDF upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, "uploaded.pdf");
  },
});
const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new Error("Only PDF files are allowed"));
  }
});

// Initialize Google Genie AI client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.get("/", (req, res) => {
  res.send("server is running");
});

// PDF upload and process endpoint
app.post("/upload-pdf", upload.single("pdfFile"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send("No PDF uploaded");

    // Read PDF file as base64 inline data
    const pdfBuffer = fs.readFileSync(req.file.path);
    const pdfBase64 = pdfBuffer.toString("base64");

    // Prepare content parts with inline PDF data
    const contents = [
      {
        inlineData: {
          data: pdfBase64,
          mimeType: "application/pdf",
        },
      },
      { text: "Give a brief summary of the uploaded PDF in simple words." },
    ];

    // Call Gemini API
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
    });

    // Return Gemini response text
    res.json({ summary: response.text });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing PDF");
  }
});

app.listen(PORT, () => {
  console.log("server is running at", PORT);
});
