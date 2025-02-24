export interface IRequestParams {
  searchParams?: URLSearchParams;
  host?: string;
  path: string;
}

async function request<TData>(
  { path, searchParams }: IRequestParams,
  options?: RequestInit,
): Promise<TData | null> {
  const url = new URL(path, import.meta.env.VITE_API_HOST);
  if (searchParams) {
    url.search = searchParams.toString();
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      ...options?.headers
    }
  });

  if (!response.ok) {
    const errorMessage = `Error ${response.status}: ${response.statusText}`;
    const errorResponse = await response.json();
    throw new Error(errorMessage, { cause: { ...errorResponse, status: response.status } });
  }

  if (response.status === 204) {
    // 204 response, return null or an empty object as needed
    return null;
  }
  // For other status codes with a body, parse as JSON
  return response.json();
}

export default request;
