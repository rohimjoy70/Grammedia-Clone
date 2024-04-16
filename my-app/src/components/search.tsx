import { Search } from "./icon";

export default function SearchForm() {
  return (
    <form className="relative w-96" action="">
      <input
        className="border-none bg-gray-100 p-2 w-full rounded-xl"
        type="text"
        name="search"
        id=""
        placeholder="Cari Produk, Judul Buku, Penulis . . ."
      />
      <div className="absolute -right-16 top-2">
        <Search />
      </div>
    </form>
  );
}
