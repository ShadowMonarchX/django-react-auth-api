import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAuthApi = createApi({
  reducerPath: "userAuthApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8001/api/v1/auth" }),
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
        url: "/verify-email/",
        method: "POST",
        body: otpData,
        headers: { "Content-Type": "application/json" },
      }),
    }),
    loginUser: builder.mutation({
      query: (user) => ({
        url: "/login/",
        method: "POST",
        body: user,
        headers: { "Content-Type": "application/json" },
      }),
    }),
    additionalUser: builder.mutation({
      query: ({ access_token, actualData }) => ({
        url: "/AdditionalUser/",
        method: "PATCH",
        body: actualData,
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }),
    }),
    forgotPassword: builder.mutation({
      query: (emailData) => ({
        url: "/password-reset/",
        method: "POST",
        body: emailData,
        headers: { "Content-Type": "application/json" },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ password, confirmPassword, uidb64, token }) => ({
        url: "/set-new-password/",
        method: "PATCH",
        body: { password, confirm_password: confirmPassword, uidb64, token },
        headers: { "Content-Type": "application/json" },
      }),
    }),

    validateResetToken: builder.query({
      query: ({ uidb64, token }) => ({
        url: `/password-reset-confirm/${uidb64}/${token}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useVerifyOtpMutation,
  useLoginUserMutation,
  useAdditionalUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useValidateResetTokenQuery,
} = userAuthApi;
