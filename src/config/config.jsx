export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  endpoints: {
    login: "/auth/login",
    register: "/auth/register",
    forgotPassword: "/auth/forgotPassword",
    verifyCode: "/auth/verifyCode",
    setPassword: "/auth/setPassword",
    virtualAccount: "/virtualAccount",
  },
};
