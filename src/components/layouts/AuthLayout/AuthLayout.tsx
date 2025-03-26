import PageHead from "@/components/commons/PageHead"
import { ReactNode } from "react";

interface PropTypes {
  children: ReactNode;
  title?: string;
}

const AuthLayout = (props: PropTypes) => {
  const { children, title } = props;
  return (
    <div className="flex-1 flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <PageHead title={title} />
      <section className="w-full max-w-screen-3xl 3xl:container p-6">{children}</section>
    </div>
  )
}

export default AuthLayout;