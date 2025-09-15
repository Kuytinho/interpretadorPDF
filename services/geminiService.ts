import { GoogleGenAI } from "@google/genai";

// This check is for robustness, but the app assumes the API key is provided.
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Sends a PDF page image (as a base64 string) to the Gemini API for interpretation.
 * @param base64Image The base64 encoded string of the image (without the data URL prefix).
 * @returns A text interpretation from the AI.
 */
export async function interpretPageImage(base64Image: string): Promise<string> {
  const prompt = `
    Analise a imagem fornecida, que é uma página de um documento PDF.
    Sua tarefa é fornecer uma interpretação abrangente e estruturada de todo o conteúdo da página.
    - Transcreva todo o texto com precisão.
    - Descreva quaisquer imagens, gráficos ou tabelas em detalhes.
    - Se houver uma tabela, represente-a em um formato estruturado (como markdown).
    - Resuma as informações principais e o propósito da página.
    Estruture sua saída de forma clara.
  `;

  try {
    const imagePart = {
      inlineData: {
        mimeType: 'image/jpeg',
        data: base64Image,
      },
    };

    const textPart = {
      text: prompt
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
    });

    return response.text;

  } catch (error: any) {
    console.error("Error interpreting page with Gemini API:", error);
    let errorMessage = "Ocorreu um erro desconhecido ao contatar o serviço de IA.";
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    
    if (errorMessage.includes('API key not valid')) {
        return `[Erro de IA: A chave da API não é válida. Por favor, verifique se está configurada corretamente.]`;
    }
    
    return `[Erro de IA: Falha ao interpretar a página. Motivo: ${errorMessage}]`;
  }
}