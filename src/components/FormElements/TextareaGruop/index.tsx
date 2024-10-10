import React, { useEffect, useState } from "react";

interface TextareaGroupProps {
  customClasses?: string;
  label: string;
  value?: string;
  placeholder: string;
  error?: boolean;
  helpText?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; 
}

const TextareaGroup: React.FC<TextareaGroupProps> = ({
  customClasses,
  label,
  placeholder,
  value,
  error,
  helpText,
  onChange,
}) => {

  const [inputValue, setInputValue] = useState("");

    useEffect(() => {
    setInputValue(value ? value : "");
  }, [value]);

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    if (onChange) onChange(e);
  };

  return (
    <>
      <div className={customClasses}>
        <label className="mb-2.5 block font-medium text-dark dark:text-white">
          {label}
        </label>
        <textarea
        value={inputValue}
        placeholder={placeholder}
        onChange={handleOnChangeInput}
        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
        />
        {error && <span className="text-red pl-5">{helpText}</span>}
      </div>
    </>
  );
};

export default TextareaGroup;
