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
      <h2 className="text-3xl font-bold text-white mb-4" style={{ textShadow: '0 0 5px #47E5BC, 0 0 10px #47E5BC' }}>Processamento Concluído!</h2>
      <p className="text-gray-300 mb-8">Seu PDF foi interpretado com sucesso. Baixe os resultados abaixo.</p>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <button
          onClick={handleDownload}
          className="w-full sm:w-auto px-8 py-3 bg-[#47E5BC] hover:bg-[#81E4DA] text-[#013438] font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105"
          style={{ boxShadow: '0 0 10px rgba(71, 229, 188, 0.6), 0 0 20px rgba(71, 229, 188, 0.4)' }}
        >
          Baixar Interpretação
        </button>
        <button
          onClick={onReset}
          className="w-full sm:w-auto px-8 py-3 bg-transparent hover:bg-[#47E5BC]/10 border border-[#47E5BC]/80 text-[#AECFDF] hover:text-white font-semibold rounded-lg shadow-md transition-colors"
        >
          Processar Outro PDF
        </button>
      </div>
    </div>
  );
};

export default DownloadView;