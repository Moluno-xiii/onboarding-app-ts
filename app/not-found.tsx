import Link from "next/link";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col w-full  justify-center items-center gap-y-5">
      <h3 className="text-xl md:text-3xl xl:text-5xl font-mono">
        Page not found
      </h3>
      <Link
        className="bg-primary text-white px-8 py-2 rounded-md font-mono hover:bg-slate-400 cursor-pointer transition-all duration-200"
        href={"/"}
      >
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
