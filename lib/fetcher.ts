// import { getCurrentUser } from '@/lib/session';
//
// export async function getToken() {
//   const user = await getCurrentUser();
//   return user?.accessToken || null;
// }

export interface FetcherOptions {
  locale?: string;
  headers?: Record<string, string>;
}

export async function fetcher<T>(url: string, options: FetcherOptions = {}): Promise<T> {
  const { locale, headers: optionHeaders = {} } = options;
  // const token = await getToken();
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
      cache: 'force-cache',
      next: { revalidate: 60 },
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': locale || 'hy',
        // Authorization: token ? `Bearer ${token}` : '',
        ...optionHeaders,
      },
    });

    if (response.status === 401) {
      return Promise.reject(new Error('Unauthorized: Logging out'));
    }

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.log(error, '000000');
    return Promise.reject(error);
  }
}
