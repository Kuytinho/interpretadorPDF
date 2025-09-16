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

  const baseClass = 'relative flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-lg transition-all duration-300 bg-black/20';
  const defaultStateClass = 'border-[#47E5BC]/40 hover:border-[#47E5BC] shadow-[inset_0_0_10px_rgba(71,229,188,0.1)]';
  const dragOverClass = 'border-[#47E5BC] bg-[#47E5BC]/20 scale-105 shadow-[inset_0_0_25px_rgba(71,229,188,0.4)]';

  return (
    <div
      className={`${baseClass} ${isDragging ? dragOverClass : defaultStateClass}`}
      onDragEnter={(e) => handleDragEvents(e, true)}
      onDragLeave={(e) => handleDragEvents(e, false)}
      onDragOver={(e) => handleDragEvents(e, true)}
      onDrop={handleDrop}
    >
      <DocumentIcon className="w-16 h-16 text-[#47E5BC] mb-4" style={{ filter: 'drop-shadow(0 0 5px #47E5BC)' }} />
      <p className="text-lg font-semibold text-gray-200">Arraste e solte seu PDF aqui</p>
      <p className="text-gray-400 my-2">ou</p>
      <label
        htmlFor="file-upload"
        className="cursor-pointer px-6 py-2 bg-[#47E5BC] hover:bg-[#81E4DA] text-[#013438] font-semibold rounded-lg shadow-md transition-all duration-300 hover:scale-105"
        style={{ boxShadow: '0 0 8px rgba(71, 229, 188, 0.5), 0 0 15px rgba(71, 229, 188, 0.3)' }}
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