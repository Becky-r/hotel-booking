import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

let accessToken: string | null = null;

export const setTokens = (access: string, refresh: string) => {
  accessToken = access;
  localStorage.setItem("accessToken", access);
  localStorage.setItem("refreshToken", refresh);
};

export const getAccessToken = () => {
  if (!accessToken) {
    accessToken = localStorage.getItem("accessToken");
  }
  return accessToken;
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const clearTokens = () => {
  accessToken = null;
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

/* =========================
   AXIOS INSTANCE
========================= */

export const api = axios.create({
  baseURL: API_BASE_URL,
});

/* =========================
   REQUEST INTERCEPTOR
========================= */

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/* =========================
   REFRESH HANDLING
========================= */

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

/* =========================
   RESPONSE INTERCEPTOR
========================= */

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue requests while refreshing
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve,
            reject,
          });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getRefreshToken();

      if (!refreshToken) {
        clearTokens();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(
          `/${API_BASE_URL}/token/refresh/`,
          {
            refresh: refreshToken,
          },
        );

        const { access: newAccess, refresh: newRefresh } = response.data as any;

        setTokens(newAccess, newRefresh ?? refreshToken);

        processQueue(null, newAccess);

        originalRequest.headers.Authorization = `Bearer ${newAccess}`;

        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        clearTokens();
        // window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

/* =========================
   MAIN REQUEST FUNCTION
========================= */

export async function apiRequest<T>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  url: string,
  data?: any,
): Promise<T> {
  try {
    const isFormData = data instanceof FormData;

    const response = await api({
      method,
      url,
      data,
      headers: isFormData
        ? { "Content-Type": "multipart/form-data" }
        : undefined,
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      const data = error.response.data;

      const message =
        data?.detail ||
        data?.non_field_errors?.[0] ||
        "Something went wrong. Please try again.";

      throw new Error(message);
    }

    throw new Error("Network error");
  }
}

/* =========================
   AUTH FUNCTIONS
========================= */

export async function login(email: string, password: string) {
  const data = await apiRequest<{
    access: string;
    refresh: string;
  }>("POST", "/account/login/", { email, password });

  setTokens(data.access, data.refresh);

  return data;
}

export function logout() {
  clearTokens();
  // window.location.href = "/login";
}

export async function getUser() {
  return apiRequest("GET", "/account/get-user/");
}

export async function register(data: {
  full_name: string;
  email: string;
  phone: string;
  password: string;
  password2: string;
}) {
  return apiRequest("POST", "/account/register/", data);
}

export async function forgotPassword(email: string) {
  return apiRequest("POST", "/account/forgot-password/", { email });
}

export async function resetPassword(data: {
  uid: string;
  token: string;
  new_password: string;
}) {
  return apiRequest("POST", "/account/reset-password/", data);
}

export async function changePassword(data: {
  current_password: string;
  new_password: string;
  new_password_confirm: string;
}) {
  return apiRequest("POST", "/account/change-password/", data);
}

export async function availableRooms(params: {
  check_in: string;
  check_out: string;
  adults: number;
  children: number;
}) {
  return apiRequest("GET", "booking/available-rooms/", params);
}

export async function createBooking(data: any) {
  return apiRequest("POST", "/booking/create/", data);
}

export async function uploadPaymentScreenshot(
  reference: string,
  data: FormData,
) {
  return apiRequest("POST", `/booking/payment-screenshot/${reference}/`, data);
}
// anonymously cancel a booking with reference number, no auth required
export async function anonCancelBooking(data : {
  reference: string,
  email: string
}) {
  return apiRequest("POST", "/booking/anon-cancel/", data);
}

export async function cancelBooking(reference: string) {
  return apiRequest("POST", `/booking/${reference}/cancel/`);
}

export async function validateBooking(data: any) {
  return apiRequest("GET", "/booking/validate-booking/", data);
}

export async function getBookingDetails(reference: string) {
  return apiRequest("GET", `/booking/${reference}/detail/`);
}

export async function getUserBookings() {
  return apiRequest("GET", "/booking/user-bookings/");
}