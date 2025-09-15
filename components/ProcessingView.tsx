import React from 'react';
import { SpinnerIcon } from './icons/SpinnerIcon';

interface ProcessingViewProps {
  currentPage: number;
  totalPages: number;
  currentTask: string;
}

const ProcessingView: React.FC<ProcessingViewProps> = ({ currentPage, totalPages, currentTask }) => {
  const progressPercentage = totalPages > 0 ? (currentPage / totalPages) * 100 : 0;

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <SpinnerIcon className="w-16 h-16 text-indigo-400" />
      <h2 className="text-2xl font-bold mt-6 mb-2 text-gray-200">Processando PDF...</h2>
      <p className="text-gray-400 mb-6">{currentTask}</p>
      
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div
          className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <p className="mt-3 text-lg font-semibold text-gray-300">
        Página {currentPage} de {totalPages}
      </p>
    </div>
  );
};

export default ProcessingView;