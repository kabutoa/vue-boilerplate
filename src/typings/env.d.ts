/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_BASE_URL: string
  readonly VITE_API_PREFIX: string
  readonly VITE_MOCK_PATH: string
  readonly VITE_CDN_PATH: string
  readonly VITE_MOCK: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
