const Loading: React.FC = ({ message }: { message?: string }) => {
  return (
    <div className="bg-primary/20 fixed inset-0 z-20 flex items-center justify-center backdrop-blur-xs">
      <div className="text-text mx-auto flex max-w-lg flex-col items-center gap-y-4 rounded-md p-4 drop-shadow-2xl max-sm:mx-5 max-sm:w-full">
        <span className="loader"></span>
        <p className="font-mono text-xl md:text-2xl xl:text-3xl">
          {message ?? "Loading..."}
        </p>
      </div>
    </div>
  );
};

export default Loading;
