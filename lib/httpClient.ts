import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL, LANGUAGE_STORAGE_KEY } from '@/constants';

const httpClient = axios.create({
  baseURL: API_BASE_URL,
});

// Flag to prevent multiple simultaneous refresh attempts
let isRefreshing = false;

// Queue to store failed requests while refreshing
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });

  failedQueue = [];
};

const logoutUser = async () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('currentUser');

  const { signOut } = await import('next-auth/react');
  await signOut({ redirect: true, callbackUrl: '/' });
};

httpClient.interceptors.request.use(async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
  const accessToken = localStorage.getItem('accessToken') || '';
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

  config.headers['locale'] = localStorage.getItem(LANGUAGE_STORAGE_KEY) || 'hy';

  return config;
});

httpClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response && error.response.status === 403 && !originalRequest._retry) {
      if (typeof window === 'undefined') {
        return Promise.reject(error);
      }

      // Queue requests while refreshing
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return httpClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token available');

        const refreshResponse = await axios.post(`${API_BASE_URL}/users/refresh-token`, {
          refresh_token: refreshToken,
        });

        const newAccessToken = refreshResponse.data?.access_token;
        const newRefreshToken = refreshResponse.data?.refresh_token;
        if (!newAccessToken && !newRefreshToken) throw new Error('Failed to get new access token');

        localStorage.setItem('accessToken', newAccessToken);
        localStorage.setItem('refreshToken', newRefreshToken);

        // update next-auth session
        const { signIn } = await import('next-auth/react');
        await signIn('credentials', {
          mode: 'update',
          redirect: false,
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
          user: refreshResponse.data.user,
        });

        // Update the original request with new token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        // Process queued requests
        processQueue(null, newAccessToken);
        isRefreshing = false;

        // Retry the original request
        return httpClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed, clear auth data and sign out
        processQueue(refreshError, null);
        isRefreshing = false;

        await logoutUser();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default httpClient;
