import { useState, useContext } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ILogin } from "@/types/Auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { ToasterContext } from "@/contexts/ToasterContext";

const loginSchema = yup.object().shape({
  identifier: yup.string().required("Mohon masukkan nama lengkap atau email"),
  password: yup
    .string()
    .required("Mohon masukkan kata sandi"),
});

const useLogin = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const { setToaster } = useContext(ToasterContext);

  const callbackUrl: string = (router.query.callbackUrl as string) || "/";

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const loginService = async (payload: ILogin) => {
    const result = await signIn("credentials", {
      ...payload,
      redirect: false,
      callbackUrl
    });

    console.log("SignIn Result:", result); // Debugging
    console.error("Login Error:", result?.error); // Lih

    if (result?.error && result?.status === 401) {
      throw new Error("Gagal Login!")
    }
  };

  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: loginService,
    onError: () => {
      setToaster({
        type: "error",
        message: "Nama Pengguna/Email atau Kata Sandi Salah!",
      });
    },
    onSuccess: () => {
      reset();
      setToaster({
        type: "success",
        message: "Login Berhasil!",
      });
      router.push(callbackUrl);
    },
  });

  const handleLogin = (data: ILogin) => mutateLogin(data);

  return {
    isVisible,
    toggleVisibility,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  };
};

export default useLogin;
