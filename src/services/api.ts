/* eslint-disable no-undef */
const BASE_URL = 'http://localhost:3333' as const

interface FetcherConfig extends RequestInit {
  queryParams?: { [key: string]: string }
}

async function fetcher<T>(path: string, config: FetcherConfig): Promise<T> {
  const { queryParams } = config
  const queryParamsKeys = Object.keys(queryParams ?? {})

  const queryURL = new URL(`${BASE_URL}`)
  queryURL.pathname = path

  if (queryParams && queryParamsKeys.length > 0) {
    queryParamsKeys.forEach((key) => {
      queryURL.searchParams.append(key, queryParams[key])
    })
  }

  delete config.queryParams
  const response = await fetch(queryURL, config)

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json().catch(() => ({})) as Promise<T>
}

async function get<T>(path: string, config?: FetcherConfig) {
  const defaultConfig = {
    method: 'GET',
    ...config,
  } satisfies RequestInit
  return (await fetcher(path, defaultConfig)) as Promise<T>
}

async function post<T>(path: string, config?: FetcherConfig) {
  const defaultConfig = {
    method: 'POST',
    ...config,
  } satisfies RequestInit
  return (await fetcher(path, defaultConfig)) as Promise<T>
}

export const api = { get, post }
