import { useState, useRef } from 'react';
import { Upload, Image, X, CheckCircle } from 'lucide-react';

export default function FileUpload({ onFileSelect }) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleFile = (selectedFile) => {
    if (selectedFile) {
      setFile(selectedFile);
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target.result);
        reader.readAsDataURL(selectedFile);
      }
      onFileSelect && onFileSelect(selectedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    onFileSelect && onFileSelect(null);
  };

  if (file) {
    return (
      <div className="border border-green-500/30 bg-green-500/5 rounded-2xl p-6">
        <div className="flex items-center gap-4">
          {preview ? (
            <img src={preview} alt="Preview" className="w-20 h-20 object-cover rounded-xl border border-white/10" />
          ) : (
            <div className="w-20 h-20 bg-white/5 rounded-xl flex items-center justify-center">
              <Image className="w-8 h-8 text-gray-500" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
              <p className="text-white font-medium truncate">{file.name}</p>
            </div>
            <p className="text-gray-500 text-sm mt-1">
              {(file.size / 1024).toFixed(1)} KB • Ready to upload
            </p>
          </div>
          <button
            onClick={removeFile}
            className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300
        ${dragActive
          ? 'border-red-500 bg-red-500/10 shadow-[0_0_30px_rgba(188,2,2,0.2)]'
          : 'border-white/10 hover:border-red-600/50 hover:bg-white/[0.02]'
        }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
      <Upload className={`w-10 h-10 mx-auto mb-3 ${dragActive ? 'text-red-500' : 'text-gray-600'}`} />
      <p className="text-white font-medium mb-1">
        {dragActive ? 'Drop your screenshot here' : 'Drag & drop your payment screenshot'}
      </p>
      <p className="text-gray-500 text-sm">
        or <span className="text-red-500 hover:underline">click to browse</span> • PNG, JPG up to 5MB
      </p>
    </div>
  );
}
