const Loading: React.FC = ({ message }: { message?: string }) => {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-y-7 bg-black/10 backdrop-blur-md">
      <span className="loader"></span>
      <p className="font-mono text-xl md:text-2xl xl:text-3xl">
        {message ?? "Loading..."}
      </p>
    </div>
  );
};

export default Loading;
