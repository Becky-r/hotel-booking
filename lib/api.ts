import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
} from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
// Token Management

// Axios Instance

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
   headers: {
    "Accept": "application/json",
  },
});



//  Main Request Function
export async function apiRequest<T>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<T> {
  try {
    const response = await api({
      method,
      url,
      data,
      ...config,
    });

    return response.data as T;
  } catch (error: any) {
    if (error.response?.data) {
      const errData = error.response.data;
      const message =
        errData?.detail ||
        errData?.non_field_errors?.[0] ||
        errData?.message ||
        "Request failed. Please try again.";
      
        throw new Error(message);

    }
    throw new Error("Network error or server unreachable");
  }
}

// Auth & Booking Helpers
export async function login(email: string, password: string) {
  const data = await apiRequest<{ access: string; refresh: string }>(
    "POST",
    "/account/login/",
    {
      email,
      password,
    },
  );
  return data;
}

export async function logout() {
  return apiRequest("POST", "/account/logout/");
}
export async function getUser() {
  return apiRequest<any>("GET", "/account/get-user/");
}

export async function register(data: {
  full_name: string;
  email: string;
  phone: string;
  password: string;
  password2: string;
}) {
  return apiRequest<any>("POST", "/account/register/", data);
}

export async function forgotPassword(email: string) {
  return apiRequest<any>("POST", "/account/forgot-password/", { email });
}

export async function resetPassword(data: {
  uid: string;
  token: string;
  new_password: string;
}) {
  return apiRequest<any>("POST", "/account/reset-password/", data);
}

export async function changePassword(data: {
  current_password: string;
  new_password: string;
  new_password_confirm: string;
}) {
  return apiRequest<any>("POST", "/account/change-password/", data);
}

export async function availableRooms(params: {
  check_in: string;
  check_out: string;
  adults: number;
  children: number;
}) {
  return apiRequest<any>("GET", "/booking/available-rooms/", undefined, { params });
}

export async function createBooking(data: any) {
  return apiRequest<any>("POST", "/booking/create/", data);
}

export async function uploadPaymentScreenshot(
  reference: string,
  fileData: FormData,
) {
  return apiRequest<any>(
    "POST",
    `/booking/payment-screenshot/${reference}/`,
    fileData,
  );
}

export async function anonCancelBooking(data: {
  reference: string;
  phone: string;
}) {
  return apiRequest<any>("POST", "/booking/anon-cancel/", data);
}

export async function cancelBooking(reference: string) {
  return apiRequest<any>("POST", `/booking/${reference}/cancel/`);
}

export async function validateBooking(data: any) {
  return apiRequest<any>("POST", "/booking/validate-booking/", data);
}

export async function getBookingDetails(reference: string) {
  return apiRequest<any>("GET", `/booking/${reference}/detail/`);
}

export async function getUserBookings() {
  return apiRequest<any>("GET", "/booking/user-bookings/");
}

export async function getServices() { 
  return apiRequest<any>("GET", "/inventory/services/");
}
export async function getRoomTypes() {
  return apiRequest<any>("GET", "/inventory/room-types/")
}

export async function getRoomTypeDetails(id: number) { 
  return apiRequest<any>("GET", `/inventory/room-types/${id}/`)
}