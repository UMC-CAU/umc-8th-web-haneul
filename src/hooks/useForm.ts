import { useEffect } from "react";

type TuseForm = {
  value: string;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
  regexString: RegExp;
};

const useForm = ({ value, setIsValid, regexString }: TuseForm) => {
  useEffect(() => {
    setIsValid(regexString.test(value));
  }, [value]);
};

export default useForm;
