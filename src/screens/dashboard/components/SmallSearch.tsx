interface Props {
  search: string;
  setSearch: (value: string) => void;
}

const SmallSearchBar = ({ search, setSearch }: Props) => {
  return (
    <div className="">
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-46  px-4 py-1 bg-background-secondary text-white border border-gray-700 rounded-full focus:outline-none focus:ring focus:border-purple-500"
      />
    </div>
  );
};

export default SmallSearchBar;
