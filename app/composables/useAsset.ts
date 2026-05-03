export function useAsset() {
  const config = useRuntimeConfig()
  const base = config.app.baseURL.replace(/\/$/, '')
  return (path: string) => `${base}${path}`
}
