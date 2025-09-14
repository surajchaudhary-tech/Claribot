import express from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public')); // Serve static files from public directory

// Ensure uploads directory exists
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

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

// Serve HTML upload form
app.get("/", (req, res) => {
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PDF Summarizer</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .container {
            background: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            text-align: center;
            max-width: 500px;
            width: 100%;
        }
        
        h1 {
            color: #333;
            margin-bottom: 10px;
            font-size: 2.5rem;
        }
        
        .subtitle {
            color: #666;
            margin-bottom: 30px;
            font-size: 1.1rem;
        }
        
        .upload-area {
            border: 3px dashed #ddd;
            border-radius: 15px;
            padding: 40px 20px;
            margin: 30px 0;
            background: #fafafa;
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .upload-area:hover {
            border-color: #667eea;
            background: #f0f0ff;
        }
        
        .upload-area.dragover {
            border-color: #667eea;
            background: #f0f0ff;
            transform: scale(1.02);
        }
        
        .upload-icon {
            font-size: 3rem;
            color: #ddd;
            margin-bottom: 15px;
            transition: color 0.3s ease;
        }
        
        .upload-area:hover .upload-icon {
            color: #667eea;
        }
        
        .file-input {
            display: none;
        }
        
        .upload-text {
            color: #666;
            font-size: 1.1rem;
            margin-bottom: 10px;
        }
        
        .file-info {
            color: #888;
            font-size: 0.9rem;
        }
        
        .selected-file {
            background: #e8f5e8;
            color: #2d5a2d;
            padding: 15px;
            border-radius: 10px;
            margin: 20px 0;
            font-weight: 500;
        }
        
        .btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 30px;
            border: none;
            border-radius: 50px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin: 10px;
        }
        
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }
        
        .btn:disabled {
            background: #ccc;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }
        
        .loading {
            display: none;
            margin: 20px 0;
        }
        
        .spinner {
            border: 3px solid #f3f3f3;
            border-top: 3px solid #667eea;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 0 auto 15px;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .result {
            background: #f8f9fa;
            border-radius: 15px;
            padding: 25px;
            margin-top: 30px;
            text-align: left;
            display: none;
        }
        
        .result h3 {
            color: #333;
            margin-bottom: 15px;
            font-size: 1.3rem;
        }
        
        .result p {
            color: #555;
            line-height: 1.6;
            font-size: 1rem;
        }
        
        .error {
            background: #fee;
            color: #c33;
            border-left: 4px solid #c33;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
            display: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📄 PDF Summarizer</h1>
        <p class="subtitle">Upload a PDF and get an AI-powered summary</p>
        
        <form id="uploadForm" enctype="multipart/form-data">
            <div class="upload-area" id="uploadArea">
                <div class="upload-icon">📁</div>
                <div class="upload-text">Click to select a PDF file</div>
                <div class="file-info">or drag and drop here</div>
                <input type="file" id="pdfFile" name="pdfFile" class="file-input" accept=".pdf">
            </div>
            
            <div id="selectedFile" class="selected-file" style="display: none;"></div>
            
            <button type="submit" class="btn" id="submitBtn" disabled>
                Generate Summary
            </button>
        </form>
        
        <div class="loading" id="loading">
            <div class="spinner"></div>
            <p>Analyzing your PDF... This may take a moment.</p>
        </div>
        
        <div class="error" id="error"></div>
        
        <div class="result" id="result">
            <h3>📋 Summary</h3>
            <p id="summaryText"></p>
        </div>
    </div>

    <script>
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('pdfFile');
        const selectedFile = document.getElementById('selectedFile');
        const submitBtn = document.getElementById('submitBtn');
        const form = document.getElementById('uploadForm');
        const loading = document.getElementById('loading');
        const result = document.getElementById('result');
        const error = document.getElementById('error');
        const summaryText = document.getElementById('summaryText');

        // Click to upload
        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });

        // Drag and drop
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length > 0 && files[0].type === 'application/pdf') {
                fileInput.files = files;
                handleFileSelection(files[0]);
            }
        });

        // File selection
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                handleFileSelection(e.target.files[0]);
            }
        });

        function handleFileSelection(file) {
            selectedFile.textContent = \`Selected: \${file.name} (\${(file.size / 1024 / 1024).toFixed(2)} MB)\`;
            selectedFile.style.display = 'block';
            submitBtn.disabled = false;
            error.style.display = 'none';
            result.style.display = 'none';
        }

        // Form submission
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!fileInput.files[0]) {
                showError('Please select a PDF file.');
                return;
            }

            const formData = new FormData();
            formData.append('pdfFile', fileInput.files[0]);

            // Show loading
            loading.style.display = 'block';
            submitBtn.disabled = true;
            error.style.display = 'none';
            result.style.display = 'none';

            try {
                const response = await fetch('/upload-pdf', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (response.ok) {
                    summaryText.textContent = data.summary;
                    result.style.display = 'block';
                } else {
                    showError(data.error || 'Error processing PDF');
                }
            } catch (err) {
                showError('Network error. Please try again.');
            } finally {
                loading.style.display = 'none';
                submitBtn.disabled = false;
            }
        });

        function showError(message) {
            error.textContent = message;
            error.style.display = 'block';
        }
    </script>
</body>
</html>
  `;
  
  res.send(htmlContent);
});

// PDF upload and process endpoint
app.post("/upload-pdf", upload.single("pdfFile"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No PDF uploaded" });

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
    res.status(500).json({ error: "Error processing PDF" });
  }
});

app.listen(PORT, () => {
  console.log("server is running at", PORT);
});