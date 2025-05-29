export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  endpoints: {
    login: "/auth/login",
    register: "/auth/register",
    forgotPassword: "/auth/forgotPassword",
    verifyCode: "/auth/verifyCode",
    setPassword: "/auth/setPassword",
    virtualAccount: "/virtualAccount",
    NINVerify: "/verify/nin",
    BVNVerify: "/verify/bvn",
  },
};
