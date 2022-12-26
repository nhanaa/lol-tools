import './SearchBar.css'

const SearchBar = ({searchKey, setSearchKey}) => {
  const handleChange = (e) => {
    e.preventDefault();
    setSearchKey(e.target.value);
  }

  return (
    <form action="">
      <input
        className="search-input"
        type="text"
        placeholder="Search..."
        onChange={handleChange}
        value={searchKey}
      />
    </form>
  );
}

export default SearchBar
;
