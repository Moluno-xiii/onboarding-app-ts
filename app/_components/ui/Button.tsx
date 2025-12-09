import { ComponentProps } from "react";
import { MdChevronRight } from "react-icons/md";

interface Props extends ComponentProps<"button"> {
  text: string;
  variant?: "default" | "transparent" | "link";
  additionalStyles?: string;
}

const modifiedStyles: Record<"default" | "transparent" | "link", string> = {
  default:
    "bg-primary hover:bg-primary/70 py-2 md:py-[15px] border-none text-light",
  transparent:
    "bg-transparent hover:text-light py-2 md:py-[15px] border hover:bg-darker border-darker  text-darker",
  link: "bg-transparent hover:text-primary text-darker border-none",
};

const Button: React.FC<Props> = ({
  text,
  variant = "default",
  additionalStyles,
  ...rest
}) => {
  return (
    <button
      className={`${modifiedStyles[variant]} flex cursor-pointer w-fit disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-darker flex-row rounded-lg items-center gap-x-1 px-8 uppercase transition-all duration-200 max-md:text-[13px] ${additionalStyles}`}
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
