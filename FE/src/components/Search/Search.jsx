import SearchIcon from '../../assets/images/search.svg'

const Search = () => {
  return (
    <>
        <div className="search">
            <form className="form-search">
                <div className="search-input">
                    <img src={SearchIcon} alt="search-icon" className='icon'/>
                    <input type="text" placeholder="Tìm kiếm" />
                </div>

                <button type='submit'></button>
            </form>
        </div>
    </>
  )
}

export default Search