/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VUE_APP_API_URI: string
  // Add more env variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}