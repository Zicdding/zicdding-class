import { cn } from '@ui/lib/utils';

const labelStyle = "font-['Roboto'] font-normal block text-left text-[14px] leading-[22px]";

const inputStyle =
  'w-full box-border flex-row align-center p-[13px] gap-[10px] bg-[#FFFFFF] border-[1px] border-[#C6C6C6] rounded-[20px]';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  label?: string;
  inputClassName?: string;
}

export function Input({
  id,
  type,
  disabled,
  required,
  defaultValue,
  label,
  placeholder,
  inputClassName = '',
  ...props
}: Props) {
  return (
    <p className="mb-[15px]">
      {label && <label className={labelStyle}>{label}</label>}
      <input
        id={id}
        className={cn(inputStyle, inputClassName)}
        type={type}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...props}
      />
    </p>
  );
}

Input.displayName = 'Input';
