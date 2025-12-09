"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import FormItem from "./FormItem";
import Button from "./ui/Button";
import { signup } from "../utils/actions";

const SignupForm = () => {
  const [state, formAction] = useActionState(signup, {
    error: { email: null, password: null },
    success: false,
  });
  return (
    <form action={formAction} className="flex flex-col items-center gap-y-5">
      <FormItem error={state.error.email} label="Email" name="email" required />
      <FormItem error={null} label="Display Name" name="displayName" required />
      <FormItem
        error={state.error.password}
        label="Password"
        name="password"
        required
        type="password"
        minLength={8}
      />
      <FormItem
        error={state.error.password}
        label="Confirm password"
        name="confirm-password"
        required
        type="password"
        minLength={8}
      />
      <p className="">
        Already have an account?{" "}
        <Link
          href={"/login"}
          className="text-xs text-blue-600 italic underline transition-all duration-200 hover:text-blue-400"
        >
          Login
        </Link>{" "}
      </p>
      <SubmitButton />
      {/* {state.success && (
        <p className="text-green-600 text-xl md:text-2xl text-center">
          Signup successful, check your email for instructions.
        </p>
      )} */}
    </form>
  );
};

export default SignupForm;

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      type="submit"
      text={pending ? "Signing up..." : "Signup"}
      additionalStyles="self-center"
    />
  );
};
