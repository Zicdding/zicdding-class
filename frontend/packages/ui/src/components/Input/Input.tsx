import { cn } from '@ui/lib/utils';
import React from 'react';

const labelStyle = "font-['Roboto'] font-normal block text-left text-[14px] leading-[22px]";

const inputStyle =
  'w-full box-border flex-row align-center p-[13px] gap-[10px] bg-[#FFFFFF] border-[1px] border-[#C6C6C6] rounded-[20px]';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  label?: string;
  inputClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ id, type, disabled, required, defaultValue, label, placeholder, inputClassName = '', ...props }: Props, ref) => {
    console.log('defaultValue', defaultValue);

    return (
      <p className="mb-[15px]">
        {label && <label className={labelStyle}>{label}</label>}
        <input
          ref={ref}
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
  },
);

Input.displayName = 'Input';
