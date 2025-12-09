"use client";

import { emailRegex } from "@/constants";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import FormItem from "./FormItem";
import Button from "./ui/Button";
import supabase from "../utils/supabase/supabase";

const ForgotPasswordForm: React.FC = () => {
  const [isPending, setIsPending] = useState(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as { email: string };

    try {
      setIsPending(true);
      if (!emailRegex.test(data.email)) {
        toast.error("Invalid email");
        return;
      }

      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: "https://datavista-seven.vercel.app/reset-password",
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Reset instructions sent, check your inbox.", {
        duration: 6000,
      });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unexpected error, refresh the page and try again.";
      toast.error(message);
    } finally {
      setIsPending(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
      <FormItem required error={null} label="Email" name="email" />
      <Button
        text={
          isPending
            ? "Sending reset instructions..."
            : "Send reset instructions"
        }
      />
    </form>
  );
};

export default ForgotPasswordForm;
