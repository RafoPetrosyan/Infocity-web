export interface User {
  avatar: string | null;
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string | null;
  locale: string | null;
  city_id: number | null;
  email_verified: boolean;
  role: string;
  emotion_ids: number[];
}

export interface UsersState {
  currentUser: User | null;
  loading: boolean;
}

export interface RegisterResponse {
  user_id: string;
  access_token: string;
  refresh_token: string;
  message: string;
}

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  lang_code?: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface SignUpResponse {
  message: string;
  verification_token: string;
}

export interface VerifyEmailRequest {
  token: string;
  code: string;
}

export interface VerifyEmailResponse {
  message: string;
  user: User;
  access_token: string;
  refresh_token: string;
}

export interface ResendEmailCodeRequest {
  token: string;
}

export interface ResendEmailCodeResponse {
  message: string;
}

export interface UpdateProfileRequest {
  city_id?: number;
  emotion_ids?: string;
}

export interface UpdateProfileResponse {
  message: string;
  user?: User;
}
