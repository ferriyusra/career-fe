import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";

interface PropTypes {
  status: 'success' | 'failed'
}
const Activation = (props: PropTypes) => {
  const router = useRouter();
  const { status } = props;

  return (
    <div className="flex w-screen flex-col items-center justify-center gap-10 p-4">
      <div className="flex flex-col items-center justify-center gap-10">
        <Image
          src="/images/general/logo.svg"
          alt="logo"
          width={180}
          height={180}
        />
        <Image
          src={
            status === "success"
              ? "/images/illustrations/success.svg"
              : "/images/illustrations/pending.svg"
          }
          alt="success"
          width={300}
          height={300}
        />
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold text-teal-500">
          {
            status === "success"
              ? "Berhasil Membuat Akun"
              : "Gagal Membuat Akun"
          }
        </h1>
        <p className="text-xl font-bold text-default-500">
          {
            status === "success"
              ? "Terima kasih telah mendafarkan akun di Berbagi Donasi"
              : "Aktivasi kode tidak valid"
          }

        </p>
        <Button
          className="mt-4 w-fit bg-teal-600"
          variant="bordered"
          color="success"
          onPress={() => router.push("/")}
        >
          <p className="text-white">Kembali ke beranda</p>
        </Button>
      </div>
    </div>
  );
};

export default Activation;
