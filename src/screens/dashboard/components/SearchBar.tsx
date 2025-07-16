interface Props {
  search: string;
  setSearch: (value: string) => void;
}

const SearchBar = ({ search, setSearch }: Props) => {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search users by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full  px-4 py-2 bg-background-secondary text-white border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-purple-500"
      />
    </div>
  );
};

export default SearchBar;
