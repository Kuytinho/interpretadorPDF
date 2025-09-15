import React from 'react';

interface DownloadViewProps {
  resultText: string;
  onReset: () => void;
}

const DownloadView: React.FC<DownloadViewProps> = ({ resultText, onReset }) => {
  const handleDownload = () => {
    const blob = new Blob([resultText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'interpretacao_pdf.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="text-center p-8">
      <h2 className="text-3xl font-bold text-green-400 mb-4">Processamento Concluído!</h2>
      <p className="text-gray-300 mb-8">Seu PDF foi interpretado com sucesso. Baixe os resultados abaixo.</p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={handleDownload}
          className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105"
        >
          Baixar Interpretação
        </button>
        <button
          onClick={onReset}
          className="px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md transition-colors"
        >
          Processar Outro PDF
        </button>
      </div>
    </div>
  );
};

export default DownloadView;