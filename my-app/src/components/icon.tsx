import Image from "next/image";

export default function Icon() {
  return (
    <Image
      className="ml-16"
      src="/gramedia-icon-2.png"
      width={200}
      height={500}
      alt="Gramedia icon"
    />
  );
}

export function Eye() {
  return (
    <Image
      className="absolute top-4 right-5"
      src="/eye.svg"
      width={20}
      height={20}
      alt="Eye icon"
    />
  );
}

export function EyeOff() {
  return (
    <Image
      className="absolute top-4 right-5"
      src="/eye-off.svg"
      width={20}
      height={20}
      alt="Eye-off icon"
    />
  );
}

export function Help() {
  return (
    <Image
      className=""
      src="/help-circle.svg"
      width={15}
      height={20}
      alt="help icon"
    />
  );
}

export function Cart() {
  return (
    <Image
      className="mr-2"
      src="/shopping-bag.svg"
      width={30}
      height={20}
      alt="Shopping bag icon"
    />
  );
}

export function CartHover() {
  return (
    <Image
      className="mr-2"
      src="/shopping-bag-hover.svg"
      width={30}
      height={20}
      alt="Shopping bag hover icon"
    />
  );
}

export function Search() {
  return (
    <Image
      className="mr-20"
      src="/search.svg"
      width={25}
      height={20}
      alt="Search icon"
    />
  );
}

export function ChevronDown() {
  return (
    <Image
      className="mr-20"
      src="/chevron-down.svg"
      width={20}
      height={20}
      alt="Chevron icon"
    />
  );
}

export function IconInstagram() {
  return (
    <Image
      className=""
      src="/instagram.svg"
      width={35}
      height={20}
      alt="Instagram icon"
    />
  );
}

export function IconTwitter() {
  return (
    <Image
      className=""
      src="/twitter.svg"
      width={35}
      height={20}
      alt="Twitter icon"
    />
  );
}

export function IconFacebook() {
  return (
    <Image
      className="mr-20"
      src="/facebook.svg"
      width={35}
      height={20}
      alt="Facebook icon"
    />
  );
}
export function IconLinkedin() {
  return (
    <Image
      className="mr-20"
      src="/linkedin.svg"
      width={35}
      height={20}
      alt="Facebook icon"
    />
  );
}

export function Trash() {
  return (
    <Image
      className=""
      src="/trash-2.svg"
      width={20}
      height={20}
      alt="Trash icon"
    />
  );
}
