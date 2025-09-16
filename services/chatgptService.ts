// Pega a chave da API do arquivo .env
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

console.log("Using OpenAI API Key:", apiKey ? "Provided" : "Not Provided");

/**
 * Envia uma imagem de página de PDF (em base64) para a API da OpenAI.
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
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`, // agora pega da env certa
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1", // ou gpt-4o / gpt-4o-mini
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`
                }
              }
            ]
          }
        ]
      })
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content ?? "";
  } catch (error: any) {
    console.error("Error interpreting page with OpenAI API:", error);
    return `[AI Error: ${error.message ?? "Unknown"}]`;
  }
}
