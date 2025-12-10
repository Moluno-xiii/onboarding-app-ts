type CardProps = {
  title: React.ReactNode;
  description: string;
  icon: string;
  borderColor?: string;
};

const Card: React.FC<CardProps> = ({
  title,
  description,
  icon,
  borderColor = "border-[#FFD24D]",
}) => {
  return (
    <div
      className="bg-card relative flex h-100 w-full flex-col items-center justify-between rounded-[2.5rem] p-8 shadow-sm transition-transform hover:scale-105 md:max-w-sm"
      style={{ border: `4px solid ${borderColor}` }}
    >
      <div className="mb-8 flex h-40 w-40 items-center justify-center">
        <img
          src={icon}
          alt="Card icon"
          className="h-full w-full object-contain"
        />
      </div>

      <div className="mb-4 flex-1 text-center">
        <h3 className="text-text text-xl tracking-wide sm:text-2xl">{title}</h3>

        <p className="font-raleway text-text mt-4 text-base">{description}</p>
      </div>
      <div className="flex-1"></div>
    </div>
  );
};

export default Card;