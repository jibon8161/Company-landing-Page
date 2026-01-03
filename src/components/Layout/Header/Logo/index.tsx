import { getImgPath } from "@/utils/image";
import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/" className="relative flex items-center">
      {/* Light logo */}
      <Image
        src={getImgPath("/images/logo/logo.svg")}
        alt="logo"
        width={200}
        height={50}
        quality={100}
        className="dark:hidden absolute p-2"
      />

      {/* Dark logo */}
      <Image
        src={getImgPath("/images/logo/logo-white.svg")}
        alt="logo"
        width={200}
        height={50}
        quality={100}
        className="hidden dark:block absolute p-2"
      />

      {/* Spacer to keep height consistent */}
      <div className="opacity-0 w-[150px] h-[50px]"></div>
    </Link>
  );
};

export default Logo;
