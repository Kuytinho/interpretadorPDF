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
      <h2 className="text-3xl font-bold text-[#47E5BC] mb-4">Processamento Concluído!</h2>
      <p className="text-[#AECFDF] mb-8">Seu PDF foi interpretado com sucesso. Baixe os resultados abaixo.</p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={handleDownload}
          className="px-8 py-3 bg-[#47E5BC] hover:bg-[#81E4DA] text-black font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105"
        >
          Baixar Interpretação
        </button>
        <button
          onClick={onReset}
          className="px-8 py-3 bg-[#93748A] hover:bg-[#9F9FAD] text-white font-semibold rounded-lg shadow-md transition-colors"
        >
          Processar Outro PDF
        </button>
      </div>
    </div>
  );
};

export default DownloadView;