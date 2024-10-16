import { Search } from "lucide-react";

const SearchBar = ({
  searchValue,
  setSearchValue,
}: {
  searchValue: string;
  setSearchValue: (value: string) => void;
}) => (
  <div className="sticky top-0 z-10 bg-gray-100 px-4 py-4">
    <div className="flex items-center rounded-lg bg-gray-300 p-2">
      <Search className="mr-2 text-gray-400" size={20} />
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="搜尋"
        className="w-full bg-transparent text-center focus:outline-none"
      />
    </div>
  </div>
);

export default SearchBar;
