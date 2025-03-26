import { Button, Card, CardBody, Input, Spinner } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import useLogin from "./useLogin";
import { Controller } from "react-hook-form";
import { FaEye, FaEyeSlash, FaHeart, FaInstagram, FaXTwitter, FaDiscord } from "react-icons/fa6";

const Login = () => {
  const {
    isVisible,
    toggleVisibility,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  } = useLogin();

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 flex w-full flex-col items-center justify-center">
        <Card className="w-full max-w-md shadow-xl border-none">
          <CardBody className="p-8">
            <div className="flex flex-col items-center mb-6">
              <Image
                src="/images/general/logo.svg"
                alt="logo"
                width={180}
                height={60}
                className="mb-4"
              />
              <h2 className="text-2xl font-bold text-center">Registrasi</h2>
            </div>

            {errors.root && (
              <p className="mb-2 font-medium text-danger">
                {errors?.root?.message}
              </p>
            )}

            <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleLogin)}>
              <div className="flex flex-col gap-1">
                <label className="text-sm flex items-center gap-1">
                  Email: <span className="text-danger">*</span>
                </label>
                <Controller
                  name="identifier"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      label="Nama Pengguna / Email"
                      autoComplete="off"
                      variant="bordered"
                      isInvalid={errors.identifier !== undefined}
                      errorMessage={errors.identifier?.message}
                    />
                  )}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm flex items-center gap-1">
                  Password: <span className="text-danger">*</span>
                </label>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type={isVisible ? "text" : "password"}
                      label="Kata Sandi"
                      autoComplete="off"
                      variant="bordered"
                      isInvalid={errors.password !== undefined}
                      errorMessage={errors.password?.message}
                      endContent={
                        <>
                          <button
                            className="focus:outline-none"
                            type="button"
                            onClick={toggleVisibility}
                          >
                            {isVisible ? (
                              <FaEye className="pointer-events-none text-xl text-default-400" />
                            ) : (
                              <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                            )}
                          </button>
                        </>
                      }
                    />
                  )}
                />
              </div>

              <Button color="success" size="lg" type="submit" className="bg-teal-600">
                {
                  isPendingLogin ? (
                    <Spinner color="white" size="sm" />
                  ) : <p className="text-white">Masuk</p>
                }
              </Button>

              <p className="text-center text-sm mt-2">
                Apakah belum punya akun?{" "}
                <Link href="/auth/register" className="font-semibold text-teal-600">
                  Daftar disini
                </Link>
              </p>
            </form>
          </CardBody>
        </Card>

        <div className="mt-6 text-center text-sm text-default-500">
          <div className="flex justify-center items-center gap-1 mb-2">
            <span>Made with</span>
            <FaHeart className="text-blue-500" />
          </div>
          <p>Life at karir</p>
          <div className="flex justify-center gap-4 mt-4">
            <Link href="#" aria-label="Syarat dan ketentuan">Syarat dan ketentuan</Link>
            <Link href="#" aria-label="FAQ">FAQ</Link>
            <Link href="#" aria-label="Changelog">Changelog</Link>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <Link href="#" aria-label="Email">
              <FaHeart className="text-xl" />
            </Link>
            <Link href="#" aria-label="Instagram">
              <FaInstagram className="text-xl" />
            </Link>
            <Link href="#" aria-label="Twitter">
              <FaXTwitter className="text-xl" />
            </Link>
            <Link href="#" aria-label="Discord">
              <FaDiscord className="text-xl" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
