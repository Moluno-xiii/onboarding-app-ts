import { ComponentProps } from "react";
import { MdChevronRight } from "react-icons/md";

interface Props extends ComponentProps<"button"> {
  text: string;
  variant?: "default" | "transparent" | "link" | "error";
  additionalStyles?: string;
}

const modifiedStyles: Record<
  "default" | "transparent" | "link" | "error",
  string
> = {
  default:
    "bg-yellow hover:bg-light-black/70 py-2 md:py-[15px] border-none text-white",
  transparent:
    "bg-transparent hover:text-white py-2 md:py-[15px] border hover:bg-darker border-darker  text-darker",
  link: "bg-transparent hover:text-primary text-darker border-none",
  error:
    "bg-red-600 hover:bg-red-600/70   md:py-[15px] border-none  text-white border-none",
};

const Button: React.FC<Props> = ({
  text,
  variant = "default",
  additionalStyles,
  ...rest
}) => {
  return (
    <button
      className={`${modifiedStyles[variant]} disabled:text-darker flex w-fit cursor-pointer flex-row items-center gap-x-1 rounded-lg px-8 uppercase transition-all duration-200 disabled:cursor-not-allowed disabled:bg-slate-300 max-md:text-[13px] ${additionalStyles}`}
      {...rest}
    >
      {text}

      {variant === "link" && (
        <MdChevronRight size={20} color="var(--color-primary)" />
      )}
    </button>
  );
};

export default Button;
