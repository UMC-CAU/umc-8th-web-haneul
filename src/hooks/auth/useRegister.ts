import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface RegisterForm {
  name: string;
  email: string;
  bio: string;
  avatar: string;
  password: string;
}

const serverURL = import.meta.env.VITE_SERVER_URL;

const handleRegister = async (data: RegisterForm) => {
  const res = await axios.post(`${serverURL}/auth/signup`, data);

  return res.data;
};

export const useRegister = (data: RegisterForm) => {
  return useMutation({
    mutationFn: async () => {
      const res = await handleRegister(data);
      return res;
    },
  });
};

export default useRegister;
