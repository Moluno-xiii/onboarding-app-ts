"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import FormItem from "./FormItem";
import Button from "./ui/Button";
import { login } from "../utils/actions";

const LoginForm = () => {
  const [state, formAction] = useActionState(login, {
    error: { email: null, password: null },
    success: false,
  });
  return (
    <form action={formAction} className="flex flex-col gap-y-5">
      <FormItem error={state.error.email} label="Email" name="email" required />
      <FormItem
        error={state.error.password}
        label="Password"
        name="password"
        required
        type="password"
        minLength={8}
      />
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
      <SubmitButton />
    </form>
  );
};

export default LoginForm;

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      type="submit"
      text={pending ? "Logging in..." : "Login"}
      additionalStyles="self-center"
    />
  );
};
