import { z } from "zod";

/*
  회원가입 : /v1/auth/signup
  {
    "name": "매튜",
    "email": "dydals3440@gmail.com",
    "bio": "안녕하세요. 저는 매튜입니다.",
    "avatar": "https://avatars.githubusercontent.com/u/55682610?v=4",
    "password": "Smu123!!"
  }
 */

export const registerSchema = z.object({
  name: z.string().min(1, { message: "이름을 입력해주세요." }),
  email: z.string().email({ message: "유효한 이메일을 입력해주세요." }),
  bio: z.string().optional(),
  avatar: z
    .instanceof(File, { message: "유효한 파일을 업로드해주세요." })
    .optional(),
  password: z
    .string()
    .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." })
    .max(20, { message: "비밀번호는 최대 20자까지 가능합니다." }),
  confirmPassword: z
    .string()
    .min(1, { message: "비밀번호 확인을 입력해주세요." }),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "유효한 이메일을 입력해주세요." }),
  password: z
    .string()
    .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." })
    .max(20, { message: "비밀번호는 최대 20자까지 가능합니다." }),
});
