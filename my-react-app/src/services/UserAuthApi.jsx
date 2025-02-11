import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAuthApi = createApi({
  reducerPath: "userAuthApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/v1/auth" }),

  endpoints: (builder) => ({

    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/register/",
        method: "POST",
        body: userData,
        headers: { "Content-Type": "application/json" },
      }),
    }),

    verifyOtp: builder.mutation({
      query: (otpData) => ({
        url: "/verify-email/", // Change this to /verify-email/
        method: "POST",
        body: otpData,
        headers: { "Content-Type": "application/json" },
      }),
    }),

    
  }),
});

export const { useRegisterUserMutation, useVerifyOtpMutation } = userAuthApi; // Ensure OTP mutation is exported
