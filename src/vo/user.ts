import { type valueObject } from "@/type";

export default function User(defaultObject?: Record<string, any>): valueObject {
  return {
    username: {
      value: defaultObject?.username || "",
      name: "username",
      desc: "사용자이름",
      option: {},
    },
    password: {
      value: defaultObject?.password || "",
      name: "password",
      desc: "비밀번호",
      option: {},
    },
    email: {
      value: defaultObject?.email || "",
      name: "email",
      desc: "이메일",
      option: {},
    },
    phone: {
      value: defaultObject?.phone || "",
      name: "phone",
      desc: "휴대폰번호",
      option: {},
    },
    auth: {
      value: defaultObject?.auth || "",
      name: "auth",
      desc: "권한",
      option: {},
    },
    role: {
      value: defaultObject?.role || "",
      name: "role",
      desc: "역할",
      option: {},
    },
  };
}
