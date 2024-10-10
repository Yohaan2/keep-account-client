import { ImCheckboxChecked } from "react-icons/im";

interface AlertSuccessProps {
  customClasses?: string;
  title: string;
}

const AlertSuccess = ({ title }: AlertSuccessProps) => {
  return (
    <>
      <div className="flex items-center w-full rounded-[10px] border-l-6 border-green bg-green-light-7 px-7 py-6 dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
        <div className="mr-5.5 flex h-8 w-full max-w-8 items-center justify-center rounded-md border-2 border-green bg-white">
          <ImCheckboxChecked className="fill-current" color="rgb(34 173 92)" size={30} />
        </div>
        <div className="w-full">
          <h5 className="font-bold leading-[22px] text-[#004434] dark:text-[#34D399]">
            {title}
          </h5>
        </div>
      </div>
    </>
  );
};

export default AlertSuccess;
