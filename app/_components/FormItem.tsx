import { ComponentProps } from "react";

interface Props extends ComponentProps<"input"> {
  name: string;
  label: string;
  error?: string | null;
  type?: string;
}

const FormItem = ({ error, name, label, type = "text", ...rest }: Props) => {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex flex-row items-center justify-between gap-5">
        <label htmlFor={name}>{label}</label>
        <span className="text-sm text-red-600">{error}</span>
      </div>
      <input type={type} name={name} className="input border border-light-black outline-light-black" {...rest} />
    </div>
  );
};

export default FormItem;
