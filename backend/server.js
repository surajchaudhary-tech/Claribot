import express from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import fs from 'fs';
import { PdfReader } from "pdfreader";
import cors from 'cors';
import { GoogleGenerativeAI } from "@google/generative-ai";
dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());


// Create uploads directory if it doesn't exist
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

// Multer setup for PDF upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    cb(null, `${timestamp}_${file.originalname}`);
  },
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Initialize Google Gemini AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Comprehensive prompts for different languages
const getAnalysisPrompts = () => {
  return {
    english: `You are a highly experienced financial analyst with expertise in risk assessment, portfolio management, and financial document analysis. Analyze this financial document text thoroughly and provide a comprehensive analysis in English.

Please provide a detailed analysis covering:
1. Overall financial health assessment
2. Risk factors identification and analysis
3. Portfolio diversification evaluation
4. Key performance indicators analysis
5. Market trends and implications
6. Specific recommendations for improvement
7. Potential opportunities and threats
8. Compliance and regulatory considerations

Return your analysis in JSON format only:
{
  "response": "Provide a comprehensive 400-600 word analysis covering all aspects mentioned above. Include specific numbers, percentages, and concrete observations from the document. Explain risk factors in detail, diversification strengths/weaknesses, performance trends, and actionable recommendations. Make it professional but accessible.",
  "risk": "HIGH/MEDIUM/LOW (based on comprehensive risk assessment)",
  "percentage": "0-100 (overall risk percentage considering all factors)",
  "diversification_score": "0-100 (portfolio diversification quality score)"
}

Document text to analyze:`,

    hindi: `You are a highly experienced financial analyst with expertise in risk assessment, portfolio management, and financial document analysis. Analyze this financial document text thoroughly and provide a comprehensive analysis in Hindi.

Please provide a detailed analysis covering all the key aspects of financial health, risk assessment, diversification, performance indicators, market trends, recommendations, opportunities, threats, and compliance considerations.

Return your analysis in JSON format only with responses in Hindi:
{
  "response": "Provide a comprehensive 400-600 word analysis in Hindi covering all financial aspects. Include specific numbers, percentages, and concrete observations from the document.",
  "risk": "उच्च/मध्यम/कम (based on comprehensive risk assessment)",
  "percentage": "0-100 (overall risk percentage considering all factors)",
  "diversification_score": "0-100 (portfolio diversification quality score)"
}

Document text to analyze:`,

    spanish: `You are a highly experienced financial analyst with expertise in risk assessment, portfolio management, and financial document analysis. Analyze this financial document text thoroughly and provide a comprehensive analysis in Spanish.

Please provide a detailed analysis covering all the key aspects of financial health, risk assessment, diversification, performance indicators, market trends, recommendations, opportunities, threats, and compliance considerations.

Return your analysis in JSON format only with responses in Spanish:
{
  "response": "Provide a comprehensive 400-600 word analysis in Spanish covering all financial aspects. Include specific numbers, percentages, and concrete observations from the document.",
  "risk": "ALTO/MEDIO/BAJO (based on comprehensive risk assessment)",
  "percentage": "0-100 (overall risk percentage considering all factors)",
  "diversification_score": "0-100 (portfolio diversification quality score)"
}

Document text to analyze:`,

    french: `You are a highly experienced financial analyst with expertise in risk assessment, portfolio management, and financial document analysis. Analyze this financial document text thoroughly and provide a comprehensive analysis in French.

Please provide a detailed analysis covering all the key aspects of financial health, risk assessment, diversification, performance indicators, market trends, recommendations, opportunities, threats, and compliance considerations.

Return your analysis in JSON format only with responses in French:
{
  "response": "Provide a comprehensive 400-600 word analysis in French covering all financial aspects. Include specific numbers, percentages, and concrete observations from the document.",
  "risk": "ÉLEVÉ/MOYEN/FAIBLE (based on comprehensive risk assessment)",
  "percentage": "0-100 (overall risk percentage considering all factors)",
  "diversification_score": "0-100 (portfolio diversification quality score)"
}

Document text to analyze:`,

    german: `You are a highly experienced financial analyst with expertise in risk assessment, portfolio management, and financial document analysis. Analyze this financial document text thoroughly and provide a comprehensive analysis in German.

Please provide a detailed analysis covering all the key aspects of financial health, risk assessment, diversification, performance indicators, market trends, recommendations, opportunities, threats, and compliance considerations.

Return your analysis in JSON format only with responses in German:
{
  "response": "Provide a comprehensive 400-600 word analysis in German covering all financial aspects. Include specific numbers, percentages, and concrete observations from the document.",
  "risk": "HOCH/MITTEL/NIEDRIG (based on comprehensive risk assessment)",
  "percentage": "0-100 (overall risk percentage considering all factors)",
  "diversification_score": "0-100 (portfolio diversification quality score)"
}

Document text to analyze:`,

    portuguese: `You are a highly experienced financial analyst with expertise in risk assessment, portfolio management, and financial document analysis. Analyze this financial document text thoroughly and provide a comprehensive analysis in Portuguese.

Please provide a detailed analysis covering all the key aspects of financial health, risk assessment, diversification, performance indicators, market trends, recommendations, opportunities, threats, and compliance considerations.

Return your analysis in JSON format only with responses in Portuguese:
{
  "response": "Provide a comprehensive 400-600 word analysis in Portuguese covering all financial aspects. Include specific numbers, percentages, and concrete observations from the document.",
  "risk": "ALTO/MÉDIO/BAIXO (based on comprehensive risk assessment)",
  "percentage": "0-100 (overall risk percentage considering all factors)",
  "diversification_score": "0-100 (portfolio diversification quality score)"
}

Document text to analyze:`,

    italian: `You are a highly experienced financial analyst with expertise in risk assessment, portfolio management, and financial document analysis. Analyze this financial document text thoroughly and provide a comprehensive analysis in Italian.

Please provide a detailed analysis covering all the key aspects of financial health, risk assessment, diversification, performance indicators, market trends, recommendations, opportunities, threats, and compliance considerations.

Return your analysis in JSON format only with responses in Italian:
{
  "response": "Provide a comprehensive 400-600 word analysis in Italian covering all financial aspects. Include specific numbers, percentages, and concrete observations from the document.",
  "risk": "ALTO/MEDIO/BASSO (based on comprehensive risk assessment)",
  "percentage": "0-100 (overall risk percentage considering all factors)",
  "diversification_score": "0-100 (portfolio diversification quality score)"
}

Document text to analyze:`,

    chinese: `You are a highly experienced financial analyst with expertise in risk assessment, portfolio management, and financial document analysis. Analyze this financial document text thoroughly and provide a comprehensive analysis in Chinese.

Please provide a detailed analysis covering all the key aspects of financial health, risk assessment, diversification, performance indicators, market trends, recommendations, opportunities, threats, and compliance considerations.

Return your analysis in JSON format only with responses in Chinese:
{
  "response": "Provide a comprehensive 400-600 word analysis in Chinese covering all financial aspects. Include specific numbers, percentages, and concrete observations from the document.",
  "risk": "高/中/低 (based on comprehensive risk assessment)",
  "percentage": "0-100 (overall risk percentage considering all factors)",
  "diversification_score": "0-100 (portfolio diversification quality score)"
}

Document text to analyze:`,

    japanese: `You are a highly experienced financial analyst with expertise in risk assessment, portfolio management, and financial document analysis. Analyze this financial document text thoroughly and provide a comprehensive analysis in Japanese.

Please provide a detailed analysis covering all the key aspects of financial health, risk assessment, diversification, performance indicators, market trends, recommendations, opportunities, threats, and compliance considerations.

Return your analysis in JSON format only with responses in Japanese:
{
  "response": "Provide a comprehensive 400-600 word analysis in Japanese covering all financial aspects. Include specific numbers, percentages, and concrete observations from the document.",
  "risk": "高/中/低 (based on comprehensive risk assessment)",
  "percentage": "0-100 (overall risk percentage considering all factors)",
  "diversification_score": "0-100 (portfolio diversification quality score)"
}

Document text to analyze:`,

    korean: `You are a highly experienced financial analyst with expertise in risk assessment, portfolio management, and financial document analysis. Analyze this financial document text thoroughly and provide a comprehensive analysis in Korean.

Please provide a detailed analysis covering all the key aspects of financial health, risk assessment, diversification, performance indicators, market trends, recommendations, opportunities, threats, and compliance considerations.

Return your analysis in JSON format only with responses in Korean:
{
  "response": "Provide a comprehensive 400-600 word analysis in Korean covering all financial aspects. Include specific numbers, percentages, and concrete observations from the document.",
  "risk": "높음/보통/낮음 (based on comprehensive risk assessment)",
  "percentage": "0-100 (overall risk percentage considering all factors)",
  "diversification_score": "0-100 (portfolio diversification quality score)"
}

Document text to analyze:`,

    arabic: `You are a highly experienced financial analyst with expertise in risk assessment, portfolio management, and financial document analysis. Analyze this financial document text thoroughly and provide a comprehensive analysis in Arabic.

Please provide a detailed analysis covering all the key aspects of financial health, risk assessment, diversification, performance indicators, market trends, recommendations, opportunities, threats, and compliance considerations.

Return your analysis in JSON format only with responses in Arabic:
{
  "response": "Provide a comprehensive 400-600 word analysis in Arabic covering all financial aspects. Include specific numbers, percentages, and concrete observations from the document.",
  "risk": "عالي/متوسط/منخفض (based on comprehensive risk assessment)",
  "percentage": "0-100 (overall risk percentage considering all factors)",
  "diversification_score": "0-100 (portfolio diversification quality score)"
}

Document text to analyze:`,

    russian: `You are a highly experienced financial analyst with expertise in risk assessment, portfolio management, and financial document analysis. Analyze this financial document text thoroughly and provide a comprehensive analysis in Russian.

Please provide a detailed analysis covering all the key aspects of financial health, risk assessment, diversification, performance indicators, market trends, recommendations, opportunities, threats, and compliance considerations.

Return your analysis in JSON format only with responses in Russian:
{
  "response": "Provide a comprehensive 400-600 word analysis in Russian covering all financial aspects. Include specific numbers, percentages, and concrete observations from the document.",
  "risk": "ВЫСОКИЙ/СРЕДНИЙ/НИЗКИЙ (based on comprehensive risk assessment)",
  "percentage": "0-100 (overall risk percentage considering all factors)",
  "diversification_score": "0-100 (portfolio diversification quality score)"
}

Document text to analyze:`,

    dutch: `You are a highly experienced financial analyst with expertise in risk assessment, portfolio management, and financial document analysis. Analyze this financial document text thoroughly and provide a comprehensive analysis in Dutch.

Please provide a detailed analysis covering all the key aspects of financial health, risk assessment, diversification, performance indicators, market trends, recommendations, opportunities, threats, and compliance considerations.

Return your analysis in JSON format only with responses in Dutch:
{
  "response": "Provide a comprehensive 400-600 word analysis in Dutch covering all financial aspects. Include specific numbers, percentages, and concrete observations from the document.",
  "risk": "HOOG/GEMIDDELD/LAAG (based on comprehensive risk assessment)",
  "percentage": "0-100 (overall risk percentage considering all factors)",
  "diversification_score": "0-100 (portfolio diversification quality score)"
}

Document text to analyze:`,

    swedish: `You are a highly experienced financial analyst with expertise in risk assessment, portfolio management, and financial document analysis. Analyze this financial document text thoroughly and provide a comprehensive analysis in Swedish.

Please provide a detailed analysis covering all the key aspects of financial health, risk assessment, diversification, performance indicators, market trends, recommendations, opportunities, threats, and compliance considerations.

Return your analysis in JSON format only with responses in Swedish:
{
  "response": "Provide a comprehensive 400-600 word analysis in Swedish covering all financial aspects. Include specific numbers, percentages, and concrete observations from the document.",
  "risk": "HÖG/MEDEL/LÅG (based on comprehensive risk assessment)",
  "percentage": "0-100 (overall risk percentage considering all factors)",
  "diversification_score": "0-100 (portfolio diversification quality score)"
}

Document text to analyze:`,

    norwegian: `You are a highly experienced financial analyst with expertise in risk assessment, portfolio management, and financial document analysis. Analyze this financial document text thoroughly and provide a comprehensive analysis in Norwegian.

Please provide a detailed analysis covering all the key aspects of financial health, risk assessment, diversification, performance indicators, market trends, recommendations, opportunities, threats, and compliance considerations.

Return your analysis in JSON format only with responses in Norwegian:
{
  "response": "Provide a comprehensive 400-600 word analysis in Norwegian covering all financial aspects. Include specific numbers, percentages, and concrete observations from the document.",
  "risk": "HØY/MIDDELS/LAV (based on comprehensive risk assessment)",
  "percentage": "0-100 (overall risk percentage considering all factors)",
  "diversification_score": "0-100 (portfolio diversification quality score)"
}

Document text to analyze:`,

    danish: `You are a highly experienced financial analyst with expertise in risk assessment, portfolio management, and financial document analysis. Analyze this financial document text thoroughly and provide a comprehensive analysis in Danish.

Please provide a detailed analysis covering all the key aspects of financial health, risk assessment, diversification, performance indicators, market trends, recommendations, opportunities, threats, and compliance considerations.

Return your analysis in JSON format only with responses in Danish:
{
  "response": "Provide a comprehensive 400-600 word analysis in Danish covering all financial aspects. Include specific numbers, percentages, and concrete observations from the document.",
  "risk": "HØJ/MELLEM/LAV (based on comprehensive risk assessment)",
  "percentage": "0-100 (overall risk percentage considering all factors)",
  "diversification_score": "0-100 (portfolio diversification quality score)"
}

Document text to analyze:`,

    finnish: `You are a highly experienced financial analyst with expertise in risk assessment, portfolio management, and financial document analysis. Analyze this financial document text thoroughly and provide a comprehensive analysis in Finnish.

Please provide a detailed analysis covering all the key aspects of financial health, risk assessment, diversification, performance indicators, market trends, recommendations, opportunities, threats, and compliance considerations.

Return your analysis in JSON format only with responses in Finnish:
{
  "response": "Provide a comprehensive 400-600 word analysis in Finnish covering all financial aspects. Include specific numbers, percentages, and concrete observations from the document.",
  "risk": "KORKEA/KESKITASO/MATALA (based on comprehensive risk assessment)",
  "percentage": "0-100 (overall risk percentage considering all factors)",
  "diversification_score": "0-100 (portfolio diversification quality score)"
}

Document text to analyze:`,

    turkish: `You are a highly experienced financial analyst with expertise in risk assessment, portfolio management, and financial document analysis. Analyze this financial document text thoroughly and provide a comprehensive analysis in Turkish.

Please provide a detailed analysis covering all the key aspects of financial health, risk assessment, diversification, performance indicators, market trends, recommendations, opportunities, threats, and compliance considerations.

Return your analysis in JSON format only with responses in Turkish:
{
  "response": "Provide a comprehensive 400-600 word analysis in Turkish covering all financial aspects. Include specific numbers, percentages, and concrete observations from the document.",
  "risk": "YÜKSEK/ORTA/DÜŞÜK (based on comprehensive risk assessment)",
  "percentage": "0-100 (overall risk percentage considering all factors)",
  "diversification_score": "0-100 (portfolio diversification quality score)"
}

Document text to analyze:`,

    greek: `You are a highly experienced financial analyst with expertise in risk assessment, portfolio management, and financial document analysis. Analyze this financial document text thoroughly and provide a comprehensive analysis in Greek.

Please provide a detailed analysis covering all the key aspects of financial health, risk assessment, diversification, performance indicators, market trends, recommendations, opportunities, threats, and compliance considerations.

Return your analysis in JSON format only with responses in Greek:
{
  "response": "Provide a comprehensive 400-600 word analysis in Greek covering all financial aspects. Include specific numbers, percentages, and concrete observations from the document.",
  "risk": "ΥΨΗΛΟΣ/ΜΕΣΟΣ/ΧΑΜΗΛΟΣ (based on comprehensive risk assessment)",
  "percentage": "0-100 (overall risk percentage considering all factors)",
  "diversification_score": "0-100 (portfolio diversification quality score)"
}

Document text to analyze:`,

    polish: `You are a highly experienced financial analyst with expertise in risk assessment, portfolio management, and financial document analysis. Analyze this financial document text thoroughly and provide a comprehensive analysis in Polish.

Please provide a detailed analysis covering all the key aspects of financial health, risk assessment, diversification, performance indicators, market trends, recommendations, opportunities, threats, and compliance considerations.

Return your analysis in JSON format only with responses in Polish:
{
  "response": "Provide a comprehensive 400-600 word analysis in Polish covering all financial aspects. Include specific numbers, percentages, and concrete observations from the document.",
  "risk": "WYSOKIE/ŚREDNIE/NISKIE (based on comprehensive risk assessment)",
  "percentage": "0-100 (overall risk percentage considering all factors)",
  "diversification_score": "0-100 (portfolio diversification quality score)"
}

Document text to analyze:`
  };
};

// Function to extract text from PDF using pdfreader
const extractTextFromPDF = (filePath) => {
  return new Promise((resolve, reject) => {
    const textItems = [];
    
    new PdfReader().parseFileItems(filePath, (err, item) => {
      if (err) {
        reject(err);
      } else if (!item) {
        // End of file - sort by y position and x position to maintain reading order
        textItems.sort((a, b) => {
          if (Math.abs(a.y - b.y) > 0.1) {
            return a.y - b.y; // Different lines, sort by y position
          }
          return a.x - b.x; // Same line, sort by x position
        });
        
        // Group text items by lines and concatenate
        const lines = [];
        let currentLine = [];
        let currentY = null;
        
        textItems.forEach(item => {
          if (currentY === null || Math.abs(item.y - currentY) > 0.1) {
            if (currentLine.length > 0) {
              lines.push(currentLine.join(' '));
            }
            currentLine = [item.text];
            currentY = item.y;
          } else {
            currentLine.push(item.text);
          }
        });
        
        // Don't forget the last line
        if (currentLine.length > 0) {
          lines.push(currentLine.join(' '));
        }
        
        const fullText = lines.join('\n');
        resolve(fullText);
      } else if (item.text) {
        // Store text items with their positions
        textItems.push({
          text: item.text,
          x: item.x,
          y: item.y
        });
      }
    });
  });
};

app.get("/", (req, res) => {
  res.json({ message: "PDF Financial Analysis Server is running" });
});

// PDF upload and analysis endpoint
app.post("/analyze-pdf", upload.single("pdfFile"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No PDF file uploaded" });
    }
  
    const { language = "english" } = req.body;

    // Extract text from PDF
    console.log("Extracting text from PDF...");
    const pdfText = await extractTextFromPDF(req.file.path);
    
    if (!pdfText || pdfText.trim().length === 0) {
      return res.status(400).json({ 
        error: "No text could be extracted from the PDF. The PDF might be image-based or corrupted." 
      });
    }

    console.log("Extracted text length:", pdfText.length);
    console.log("First 500 characters:", pdfText.substring(0, 500));

    // Get prompts and create the selected prompt
    const prompts = getAnalysisPrompts();
    const selectedPrompt = prompts[language.toLowerCase()] || prompts.english;
    const fullPrompt = selectedPrompt + '\n\n' + pdfText;

    // Prepare content for Gemini with retry logic
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.3,
        topK: 32,
        topP: 0.9,
        maxOutputTokens: 4096,
      }
    });

    let result;
    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
      try {
        attempts++;
        console.log(`Attempt ${attempts} to analyze PDF...`);
        
        // Send text directly to Gemini instead of base64
        result = await model.generateContent([
          { text: fullPrompt }
        ]);
        
        break; // Success, exit the loop
        
      } catch (apiError) {
        console.log(`Attempt ${attempts} failed:`, apiError.message);
        
        if (attempts === maxAttempts) {
          throw apiError; // Re-throw if all attempts failed
        }
        
        // Wait before retrying (exponential backoff)
        const waitTime = Math.pow(2, attempts) * 1000; // 2s, 4s, 8s
        console.log(`Waiting ${waitTime/1000}s before retry...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }

    const response = await result.response;
    const text = response.text();

    // Try to extract JSON from the response
    let analysisResult;
    try {
      // Look for JSON in the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysisResult = JSON.parse(jsonMatch[0]);
      } else {
        // If no JSON found, create a structured response
        analysisResult = {
          response: text,
          risk: "MEDIUM",
          percentage: "50",
          diversification_score: "60"
        };
      }
    } catch (parseError) {
      // Fallback if JSON parsing fails
      analysisResult = {
        response: text,
        risk: "MEDIUM",
        percentage: "50",
        diversification_score: "60"
      };
    }

    // Clean up uploaded file
    fs.unlink(req.file.path, (err) => {
      if (err) console.error('Error deleting file:', err);
    });

    // Return analysis result
    res.json({
      success: true,
      analysis: analysisResult,
      filename: req.file.originalname,
      textLength: pdfText.length,
      language: language
    });

  } catch (error) {
    console.error('Analysis error:', error);
    
    // Clean up file if it exists
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }

    res.status(500).json({ 
      error: "Error analyzing PDF", 
      details: error.message 
    });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Financial Analysis Server running at http://localhost:${PORT}`);
});
