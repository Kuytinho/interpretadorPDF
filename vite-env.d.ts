/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OPENAI_API_KEY: string
  // você pode declarar outras variáveis se precisar
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
