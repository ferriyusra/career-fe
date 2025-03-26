import { Button, Card, CardBody, Checkbox, Input, Spinner } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import useRegister from "./useRegister";
import { FaEye, FaEyeSlash, FaHeart, FaInstagram, FaXTwitter, FaDiscord } from "react-icons/fa6";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";

const Register = () => {
  const {
    visiblePassword,
    handleVisiblePassword,
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
  } = useRegister();

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

            <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleRegister)}>
              <div className="flex flex-col gap-1">
                <label className="text-sm flex items-center gap-1">
                  Email: <span className="text-danger">*</span>
                </label>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: "Email wajib diisi" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="email"
                      placeholder="email@example.com"
                      autoComplete="off"
                      variant="bordered"
                      isInvalid={errors.email !== undefined}
                      errorMessage={errors.email?.message}
                    />
                  )}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm flex items-center gap-1">
                  Nama Lengkap: <span className="text-danger">*</span>
                </label>
                <Controller
                  name="fullName"
                  control={control}
                  rules={{ required: "Nama Lengkap wajib diisi" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      placeholder="budi"
                      autoComplete="off"
                      variant="bordered"
                      isInvalid={errors.fullName !== undefined}
                      errorMessage={errors.fullName?.message}
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
                      type={visiblePassword.password ? "text" : "password"}
                      placeholder="Password"
                      autoComplete="off"
                      variant="bordered"
                      isInvalid={errors.password !== undefined}
                      errorMessage={errors.password?.message}
                      endContent={
                        <>
                          <button
                            className="focus:outline-none"
                            type="button"
                            onClick={() => handleVisiblePassword("password")}
                          >
                            {visiblePassword.password ? (
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

              <div className="flex flex-col gap-1">
                <label className="text-sm flex items-center gap-1">
                  Konfirmasi Password: <span className="text-danger">*</span>
                </label>
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type={visiblePassword.confirmPassword ? "text" : "password"}
                      placeholder="Konfirmasi Password"
                      autoComplete="off"
                      variant="bordered"
                      isInvalid={errors.confirmPassword !== undefined}
                      errorMessage={errors.confirmPassword?.message}
                      endContent={
                        <>
                          <button
                            className="focus:outline-none"
                            type="button"
                            onClick={() =>
                              handleVisiblePassword("confirmPassword")
                            }
                          >
                            {visiblePassword.confirmPassword ? (
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
              <Button
                color="success"
                size="lg"
                type="submit"
                className="bg-teal-600 mt-4"
                isDisabled={isPendingRegister}
              >
                {isPendingRegister ? (
                  <Spinner color="white" size="sm" />
                ) : (
                  <p className="text-white">Daftar</p>
                )}
              </Button>

              <p className="text-center text-sm mt-2">
                Apakah sudah punya akun?{" "}
                <Link href="/auth/login" className="font-semibold text-teal-600">
                  Login disini
                </Link>
              </p>
            </form>
          </CardBody>
        </Card>

        <div className="mt-6 text-center text-sm text-default-500">
          <div className="flex justify-center items-center gap-1 mb-2">
            <span>Made with</span>
            <FaHeart className="text-blue-500" />
            <span>from SUB</span>
          </div>
          <p>PT Harta Tahta Cita Cita</p>
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

export default Register;
