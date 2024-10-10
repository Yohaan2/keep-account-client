import React, { useEffect, useState } from "react";

interface InputGroupProps {
  customClasses?: string;
  label: string;
  type: string;
  value?: string;
  error?: boolean;
  helpText?: string;
  endIcon?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const InputGroup: React.FC<InputGroupProps> = ({
  customClasses,
  label,
  type,
  value,
  error,
  helpText,
  onChange,
  endIcon,
  placeholder,
}) => {
  const [inputValue, setInputValue] = useState<string>("");

    useEffect(() => {
    setInputValue(value !== undefined ? value : "");
  }, [value]);

    const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (onChange) onChange(e);
  };

    const renderEndIcon = (
    <div className="pointer-events-none absolute right-0 w-9 h-9 pt-2 pr-13 fill-current">
      {endIcon}	
    </div>
  );

  return (
    <>
      <div className={`${customClasses}`}>
        <label htmlFor={label} className="mb-2.5 block font-medium text-dark dark:text-white">
          {label}
        </label>
        <div className="relative flex items-center">
          <input
            type={type}
            name={label}
            id={label}
            placeholder={placeholder}
            onChange={handleOnChangeInput}
            value={inputValue}
            className={`w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary ${error && "dark:border-red focus:dark:border-red"}`}
            
            />
            {endIcon ? renderEndIcon : null}

        </div>
          {error && <span className="text-red pl-5">{helpText}</span>}
      </div>
    </>
  );
};

export default InputGroup;
