# Interpretador De PDF

---

## Descrição
Este projeto é uma **aplicação para interpretar PDFs**: ele extrai o conteúdo de arquivos PDF e envia esse conteúdo para a **API da OpenAI (ChatGPT)** junto com um **prompt bem detalhado e elaborado** para obter interpretações, resumos, extração de dados estruturados, análises ou qualquer outro processamento textual desejado.

---

## Pré-requisitos
- Node.js instalado
- Chave de API da OpenAI (definida em variáveis de ambiente)

---

## Executar localmente

1. Instale as dependências:

npm install

2. Crie (ou edite) o arquivo `.env.local` e defina sua chave:

VITE_OPENAI_API_KEY=sk-INSIRA_SUA_CHAVE_AQUI
 **Importante:** nunca comite seu `.env.local` com a chave para repositórios públicos.

3. Rode a aplicação em modo de desenvolvimento:

npm run dev

4. (Opcional) Build para produção:

npm run build

## O que o projeto faz (resumido)
- Recebe uploads de PDF na interface (ou outro fluxo de entrada).
- Extrai texto/metadados do PDF (processo interno do app).
- Constrói e envia um **prompt detalhado** para a API do ChatGPT para:
  - Resumir o conteúdo;
  - Extrair tabelas, datas, entidades ou campos específicos;
  - Gerar Q&A sobre o documento;
  - Classificar ou etiquetar se necessário.
- Exibe as respostas retornadas pela API na interface.

---

## Variáveis de ambiente
- `VITE_OPENAI_API_KEY` — chave da OpenAI usada pelo cliente/servidor (dependendo da arquitetura do seu projeto).

---

## Segurança e boas práticas
- Não exponha a chave em repositórios públicos.
- Se estiver chamando a API diretamente do front-end, considere usar um backend/proxy para esconder a chave e controlar quotas/validações.
- Valide e sanitize PDFs e inputs antes de processar.

---

## Aplicação feita com ajuda do Google AI Studio




