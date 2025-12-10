"use client";

import { emailRegex } from "@/constants";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import FormItem from "./FormItem";
import Button from "./ui/Button";
import supabase from "../utils/supabase/supabase";

const ResetPasswordForm: React.FC = () => {
  const [error, setError] = useState({ email: "", password: "" });
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as {
      email: string;
      password: string;
      confirmPassword: string;
    };

    try {
      setIsPending(true);
      setError({ email: "", password: "" });

      if (!emailRegex.test(data.email)) {
        setError({ email: "Invalid email format", password: "" });
        return;
      }

      if (data.password !== data.confirmPassword) {
        setError({ email: "", password: "Password fields do not match." });
        return;
      }

      const { error } = await supabase.auth.updateUser({
        email: data.email.trim(),
        password: data.password,
      });

      if (error) {
        console.error("reset password", error);
        toast.error(error.message);
        return;
      }
      toast.success("password reset successful");
      router.push("/login");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unexpected error";
      toast.error(message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
      <FormItem required error={error.email} label="Email" name="email" />
      <FormItem
        type="password"
        required
        error={error.password}
        label="Password"
        name="password"
      />
      <FormItem
        type="password"
        required
        error={error.password}
        label="Confirm Password"
        name="confirmPassword"
      />
      <Button
        type="submit"
        text={isPending ? "Resetting password..." : "Reset password"}
        disabled={isPending}
      />
    </form>
  );
};

export default ResetPasswordForm;
