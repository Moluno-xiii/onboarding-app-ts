import SignupForm from "@/app/_components/SignupForm";

const Page: React.FC = () => {
  return (
    <div className="flex min-w-full flex-col items-center justify-center gap-y-5 px-3 py-5 md:gap-y-7">
      <h2 className="text-2xl md:text-4xl">Signup</h2>
      <SignupForm />
    </div>
  );
};

export default Page;
