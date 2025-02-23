import SearchIcon from '../../assets/images/search.svg'
import './Search.css'

const Search = () => {
  return (
    <>
        <div className="search">
            <form className="form-search">
                <div className="search-input">
                    <img src={SearchIcon} alt="search-icon" className='search-icon'/>
                    <input type="text" placeholder="Tìm kiếm" />
                </div>

                <button type='submit' className='btn-search'></button>
            </form>
        </div>
    </>
  )
}

export default Search