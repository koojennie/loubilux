import Image from "next/image";

export default function Profile() {
  return (
    <div className="user text-center pb-50 pe-30">
      <Image
        src="/img/user-loubilux.svg"
        alt="user"
        width={90}
        height={90}
        className={`img-fluid mb-20`}
      />
      <h2 className="fw-bold text-xl color-palette-1 m-0">Jennie Koo</h2>
      <p className="color-palette-2 m-0">jenniekoo@gmail.com</p>
    </div>
  );
}
