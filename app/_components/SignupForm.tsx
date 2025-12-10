"use client";

import { useAuth } from "@/contexts/Authcontext";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import FormItem from "./FormItem";
import Button from "./ui/Button";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const [error, setError] = useState<string | null>("");
  const { signup, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/dashboard");
  }, [user, router]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as {
      email: string;
      password: string;
      confirmPassword: string;
      displayName: string;
    };
    signup({
      userEmail: data.email.trim(),
      confirmPassword: data.confirmPassword,
      userPassword: data.password,
      displayName: data.displayName.trim(),
      setErrorCb: setError,
    });
  };
  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center gap-y-5">
      <FormItem error={null} label="Email" name="email" required />
      <FormItem error={null} label="Display Name" name="displayName" required />
      <FormItem
        error={null}
        label="Password"
        name="password"
        required
        type="password"
        minLength={8}
      />
      <FormItem
        error={null}
        label="Confirm password"
        name="confirmPassword"
        required
        type="password"
        minLength={8}
      />
      <span className="text-sm text-red-600">{error}</span>
      <p className="">
        Already have an account?{" "}
        <Link
          href={"/login"}
          className="text-xs text-blue-600 italic underline transition-all duration-200 hover:text-blue-400"
        >
          Login
        </Link>{" "}
      </p>
      <Button
        disabled={isLoading}
        type="submit"
        text={isLoading ? "Signing up..." : "Signup"}
        additionalStyles="self-center"
      />{" "}
    </form>
  );
};

export default SignupForm;
