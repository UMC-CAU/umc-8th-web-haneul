import { UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps {
  register: UseFormRegisterReturn;
  type: string;
  placeholder: string;
  errorMessage?: string;
}

const ErrorCheckingInput = ({
  register,
  type,
  placeholder,
  errorMessage,
}: FormInputProps) => {
  return (
    <div className={"flex flex-col items-start space-y-1"}>
      <input
        {...register}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      {errorMessage && (
        <span className={"text-sm text-red-500"}>{errorMessage}</span>
      )}
    </div>
  );
};

export default ErrorCheckingInput;
