"use client";

import { useState } from "react";

export default function About() {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div className="w-96 text-justify absolute bottom-44 right-8 ">
      {showAbout ? (
        <p className="italic bg-sky-300 rounded-lg border-2 p-2 border-gray-100 text-black">
          &ensp; Gramedia Asri Media adalah anak perusahaan Kompas Gramedia yang
          menyediakan jaringan toko buku dengan nama Toko Buku Gramedia di
          beberapa kota di Indonesia. Perusahaan ini didirikan pada tanggal 2
          Februari 1970 dengan diawali dari satu toko buku kecil berukuran 25m²
          di daerah Jakarta Barat dan sampai tahun 2002 telah berkembang menjadi
          lebih dari 50 toko yang tersebar di seluruh Indonesia. Selain
          menyediakan buku, Toko Buku Gramedia menyediakan berbagai produk lain
          seperti alat tulis, perlengkapan kantor, alat olahraga, alat musik,
          dll.
        </p>
      ) : (
        ""
      )}
      <button
        onClick={() => {
          setShowAbout(!showAbout);
        }}
        className="shadow-lg w-20 absolute bg-slate-400 text-white btn btn-circle right-0 -bottom-14"
      >
        {showAbout ? "X" : "About Gramedia"}
      </button>
    </div>
  );
}
