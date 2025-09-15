import { useState, useCallback } from 'react';
import { interpretPageImage } from '../services/geminiService';
import type { ProcessingState } from '../types';

// This is a workaround for using pdf.js from a CDN in a module environment
declare const pdfjsLib: any;

interface UsePdfProcessorProps {
  onUpdate: (state: ProcessingState) => void;
  onComplete: (result: string) => void;
  onError: (error: string) => void;
}

export const usePdfProcessor = ({ onUpdate, onComplete, onError }: UsePdfProcessorProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const processPdf = useCallback(async (file: File) => {
    if (isProcessing) return;

    setIsProcessing(true);
    let fullInterpretation = `Interpretação de PDF para: ${file.name}\n\n`;

    try {
      if (typeof pdfjsLib === 'undefined') {
        throw new Error('A biblioteca PDF.js não foi carregada. Por favor, verifique a conexão com a internet.');
      }
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.mjs`;

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
      const totalPages = pdf.numPages;

      onUpdate({ currentPage: 0, totalPages, currentTask: 'PDF carregado. Iniciando processamento das páginas...' });

      for (let i = 1; i <= totalPages; i++) {
        onUpdate({ currentPage: i, totalPages, currentTask: `Renderizando página ${i}...` });

        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) {
            throw new Error(`Não foi possível obter o contexto do canvas para a página ${i}`);
        }

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport }).promise;

        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        // Remove the data URL prefix to get the pure base64 string
        const base64Image = dataUrl.split(',')[1];
        
        onUpdate({ currentPage: i, totalPages, currentTask: `Analisando página ${i} com IA...` });
        
        const interpretation = await interpretPageImage(base64Image);
        
        fullInterpretation += `--- Página ${i} de ${totalPages} ---\n\n`;
        fullInterpretation += interpretation;
        fullInterpretation += `\n\n--- Fim da Página ${i} ---\n\n`;
      }

      onComplete(fullInterpretation);

    } catch (error) {
      console.error("Failed to process PDF:", error);
      const errorMessage = error instanceof Error ? error.message : "Ocorreu um erro desconhecido durante o processamento do PDF.";
      onError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing, onUpdate, onComplete, onError]);

  return { processPdf, isProcessing };
};