import ForgotPasswordForm from "@/app/_components/ForgotPasswordForm";

const Page: React.FC = () => {
  return (
    <div className="flex flex-col min-w-full py-5 px-3  justify-center items-center gap-y-5 md:gap-y-7">
      <h2 className="text-2xl md:text-4xl">Forgot Password</h2>
      <ForgotPasswordForm />
    </div>
  );
};

export default Page;
