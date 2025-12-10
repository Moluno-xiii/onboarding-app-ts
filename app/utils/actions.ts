/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { redirect } from "next/navigation";
import supabase from "./supabase/supabase";
import { LoginReturnType, LogoutReturnType } from "@/types";
import { emailRegex } from "@/constants";
import { User } from "@supabase/supabase-js";

type AuthActionState = {
  error: string | null;
};

const resetPassword = async (
  _: any,
  formData: FormData,
): Promise<{ success: boolean; error: null | string }> => {
  const email = formData.get("email") as string;

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  const { data, error } = await supabase.auth.updateUser({
    email,
    password: confirmPassword,
  });

  if (password !== confirmPassword) {
    return { error: "Password fields do not match", success: false };
  }

  if (error) {
    return { error: error.message, success: false };
  }
  redirect("/login");
};

const signup = async (_: any, formData: FormData): Promise<LoginReturnType> => {
  "use server";
  const userEmail = formData.get("email");
  const userPassword = formData.get("password");
  const confirmPassword = formData.get("confirm-password");
  const displayName = formData.get("displayName");

  if (!emailRegex.test(userEmail as string)) {
    return {
      error: { password: null, email: "Invalid email format, try again" },
      success: false,
    };
  }

  if (confirmPassword !== userPassword) {
    return {
      error: { password: "Password fields do not match", email: null },
      success: false,
    };
  }

  const { error } = await supabase.auth.signUp({
    email: userEmail as string,
    password: userPassword as string,
    options: {
      data: {
        displayName,
      },
    },
  });

  if (error) {
    return {
      error: { password: error.message, email: null },
      success: false,
    };
  }
  redirect("/login");
};

const login = async (_: any, formData: FormData): Promise<LoginReturnType> => {
  "use server";
  const userEmail = formData.get("email") as string;
  const userPassword = formData.get("password") as string;

  if (!emailRegex.test(userEmail as string)) {
    return {
      error: { password: null, email: "Invalid email format, try again" },
      success: false,
    };
  }

  const { error, data } = await supabase.auth.signInWithPassword({
    email: userEmail,
    password: userPassword,
  });

  if (error) {
    return {
      error: { password: error.message, email: null },
      success: false,
    };
  }
  console.log("user data", data);
  redirect("/dashboard");
};

const logout = async (): Promise<LogoutReturnType> => {
  "use server";

  const { error } = await supabase.auth.signOut();
  if (error) {
    return {
      error: { message: error.message },
      success: false,
    };
  }
  redirect("/");
};

const getUser = async (): Promise<User | null> => {
  "use server";

  const { error, data } = await supabase.auth.getUser();
  if (error) {
    console.log("get user error", error.message);
    return null;
  }
  return data.user;
};

export { resetPassword, signup, login, logout, getUser };
