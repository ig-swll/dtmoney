/* eslint-disable no-undef */
const BASE_URL = 'http://localhost:3333' as const

async function fetcher<T>(path: string, config: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}/${path}`, config)

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json().catch(() => ({})) as Promise<T>
}

async function get<T>(path: string, config?: RequestInit) {
  const defaultConfig = {
    method: 'GET',
    ...config,
  } satisfies RequestInit
  return (await fetcher(path, defaultConfig)) as Promise<T>
}

async function post<T>(path: string, config?: RequestInit) {
  const defaultConfig = {
    method: 'POST',
    ...config,
  } satisfies RequestInit
  return (await fetcher(path, defaultConfig)) as Promise<T>
}

export const api = { get, post }
