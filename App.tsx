import React, { useState, useEffect, useCallback } from 'react';
import { usePdfProcessor } from './hooks/usePdfProcessor';
import FileUploader from './components/FileUploader';
import ProcessingView from './components/ProcessingView';
import DownloadView from './components/DownloadView';
import type { AppState, ProcessingState } from './types';
import { AppStatus } from './types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>({ status: AppStatus.IDLE });
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const onProcessingUpdate = useCallback((state: ProcessingState) => {
    setAppState({ status: AppStatus.PROCESSING, ...state });
  }, []);

  const onProcessingComplete = useCallback((result: string) => {
    setAppState({ status: AppStatus.DONE, resultText: result });
  }, []);

  const onProcessingError = useCallback((error: string) => {
    setAppState({ status: AppStatus.ERROR, error });
  }, []);

  const { processPdf, isProcessing } = usePdfProcessor({
    onUpdate: onProcessingUpdate,
    onComplete: onProcessingComplete,
    onError: onProcessingError,
  });

  useEffect(() => {
    if (pdfFile) {
      processPdf(pdfFile);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdfFile]);

  const handleFileSelect = (file: File) => {
    setPdfFile(file);
  };

  const handleReset = () => {
    setPdfFile(null);
    setAppState({ status: AppStatus.IDLE });
  };

  const renderContent = () => {
    switch (appState.status) {
      case AppStatus.IDLE:
        return <FileUploader onFileSelect={handleFileSelect} />;
      case AppStatus.PROCESSING:
        return (
          <ProcessingView
            currentPage={appState.currentPage ?? 0}
            totalPages={appState.totalPages ?? 0}
            currentTask={appState.currentTask ?? 'Inicializando...'}
          />
        );
      case AppStatus.DONE:
        return (
          <DownloadView
            resultText={appState.resultText ?? ''}
            onReset={handleReset}
          />
        );
      case AppStatus.ERROR:
        return (
          <div className="text-center p-8 bg-[#93748A]/20 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Ocorreu um Erro</h2>
            <p className="text-gray-300 mb-6">{appState.error}</p>
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-[#47E5BC] hover:bg-[#81E4DA] text-black font-semibold rounded-lg shadow-md transition-colors duration-300"
            >
              Começar de Novo
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#2B2228] text-gray-200 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#47E5BC] to-[#81E4DA]">
            Interpretador de Páginas de PDF
          </h1>
          <p className="mt-2 text-lg text-[#AECFDF]">
            Envie um PDF para obter uma interpretação completa de cada página com o poder da IA.
          </p>
        </header>
        <main className="bg-[#93748A]/10 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-[#9F9FAD]/30">
          {renderContent()}
        </main>
        <footer className="text-center mt-8 text-[#9F9FAD] text-sm">
          <p>Desenvolvido com Gemini AI</p>
        </footer>
      </div>
    </div>
  );
};

export default App;