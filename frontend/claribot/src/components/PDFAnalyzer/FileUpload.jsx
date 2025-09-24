import React from 'react';
import { FileText, Upload, CheckCircle } from 'lucide-react';

const FileUpload = ({ 
  file, 
  dragActive, 
  error, 
  handleDrag, 
  handleDrop, 
  handleFileChange 
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          <FileText className="w-5 h-5 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-slate-800">Upload Financial Document</h3>
      </div>
      
      <div
        className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300 ${
          dragActive
            ? 'border-blue-400 bg-blue-50 shadow-lg scale-105'
            : file
            ? 'border-green-400 bg-green-50 shadow-md'
            : 'border-slate-300 hover:border-blue-300 hover:bg-blue-25'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        {file ? (
          <div className="flex items-center justify-center gap-4">
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-left">
              <div className="text-slate-800 font-semibold text-lg">{file.name}</div>
              <div className="text-slate-600">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <p className="text-slate-700 text-lg mb-2">
                Drop your PDF here or <span className="text-blue-600 font-semibold">click to browse</span>
              </p>
              <p className="text-slate-500">PDF files only, max 10MB</p>
              <p className="text-slate-400 text-sm mt-2">Supported: Financial statements, reports, portfolios</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;