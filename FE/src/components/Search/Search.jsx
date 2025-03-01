import { useSearchParams } from "react-router-dom";
import SearchIcon from "../../assets/images/search.svg";
import "./Search.css";
import { useRef } from "react";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchRef = useRef();

  const handleSearch = (e) => {
    e.preventDefault();

    setSearchParams({
      keyword: searchRef.current.value,
    });
  };

  return (
    <>
      <div className="search">
        <form className="form-search" onSubmit={handleSearch}>
          <div className="search-input">
            <img src={SearchIcon} alt="search-icon" className="search-icon" />
            <input type="text" placeholder="Tìm kiếm" ref={searchRef} />
          </div>

          <button type="submit" className="btn-search"></button>
        </form>
      </div>
    </>
  );
};

export default Search;
