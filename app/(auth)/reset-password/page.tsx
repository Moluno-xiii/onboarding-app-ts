import ResetPasswordForm from "@/app/_components/ResetPasswordForm";

const Page: React.FC = async () => {
  return (
    <div className="flex flex-col min-w-full py-5 px-3  justify-center items-center gap-y-5 md:gap-y-7">
      <h2 className="text-2xl md:text-4xl">Reset Password</h2>
      <ResetPasswordForm />
    </div>
  );
};

export default Page;
