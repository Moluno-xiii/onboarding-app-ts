"use client";

import Link from "next/link";
import { FormEvent, useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import FormItem from "./FormItem";
import Button from "./ui/Button";
import { login } from "../utils/actions";
import { useAuth } from "@/contexts/Authcontext";

const LoginForm = () => {
  const [error, setError] = useState<string | null>("");
  const { login, isLoading } = useAuth();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as {
      email: string;
      password: string;
    };
    console.log("login data", data);
    login({
      userEmail: data.email.trim(),
      userPassword: data.password,
      setErrorCb: setError,
    });
  };
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-y-5">
      <FormItem error={null} label="Email" name="email" required />
      <FormItem
        error={null}
        label="Password"
        name="password"
        required
        type="password"
        minLength={8}
      />
      <span className="text-center text-sm text-red-600">{error}</span>
      <section
        aria-labelledby="forgot password section"
        className="flex flex-col justify-between gap-y-2 md:flex-row"
      >
        <p className="">
          Don&apos;t have an account?{" "}
          <Link
            href={"/signup"}
            className="text-xs text-blue-600 italic underline transition-all duration-200 hover:text-blue-400"
          >
            Signup
          </Link>{" "}
        </p>
        <Link
          href={"/forgot-password"}
          className="text-blue-600 italic underline transition-all duration-200 hover:text-blue-400"
        >
          Forgot password?
        </Link>{" "}
      </section>
      <Button
        disabled={isLoading}
        type="submit"
        text={isLoading ? "Signing up..." : "Signup"}
        additionalStyles="self-center"
      />{" "}
    </form>
  );
};

export default LoginForm;
