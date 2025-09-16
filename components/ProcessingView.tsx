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
      <SpinnerIcon className="w-16 h-16 text-[#47E5BC]" style={{ filter: 'drop-shadow(0 0 5px #47E5BC)' }}/>
      <h2 className="text-2xl font-bold mt-6 mb-2 text-white" style={{ textShadow: '0 0 4px #47E5BC' }}>Processando PDF...</h2>
      <p className="text-gray-300 mb-6">{currentTask}</p>
      
      <div className="w-full bg-black/30 rounded-full h-2.5">
        <div
          className="bg-[#47E5BC] h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%`, boxShadow: '0 0 8px #47E5BC' }}
        ></div>
      </div>
      
      <p className="mt-3 text-lg font-semibold text-gray-200">
        Página {currentPage} de {totalPages}
      </p>
    </div>
  );
};

export default ProcessingView;