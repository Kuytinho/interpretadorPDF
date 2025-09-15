import React, { useState, useCallback } from 'react';
import { DocumentIcon } from './icons/DocumentIcon';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        onFileSelect(file);
      } else {
        alert('Por favor, selecione um arquivo PDF válido.');
      }
    }
  };

  const handleDragEvents = useCallback((e: React.DragEvent<HTMLDivElement>, dragging: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(dragging);
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    handleDragEvents(e, false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
       const file = e.dataTransfer.files[0];
       if (file.type === 'application/pdf') {
        onFileSelect(file);
      } else {
        alert('Por favor, selecione um arquivo PDF válido.');
      }
    }
  }, [onFileSelect, handleDragEvents]);

  const dragOverClass = isDragging ? 'border-indigo-500 bg-gray-700/50 scale-105' : 'border-gray-600 hover:border-indigo-600';

  return (
    <div
      className={`relative flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-lg transition-all duration-300 ${dragOverClass}`}
      onDragEnter={(e) => handleDragEvents(e, true)}
      onDragLeave={(e) => handleDragEvents(e, false)}
      onDragOver={(e) => handleDragEvents(e, true)}
      onDrop={handleDrop}
    >
      <DocumentIcon className="w-16 h-16 text-gray-500 mb-4" />
      <p className="text-lg font-semibold text-gray-300">Arraste e solte seu PDF aqui</p>
      <p className="text-gray-500 my-2">ou</p>
      <label
        htmlFor="file-upload"
        className="cursor-pointer px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-300"
      >
        Selecionar Arquivo
      </label>
      <input
        id="file-upload"
        type="file"
        className="hidden"
        accept="application/pdf"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileUploader;