const Search = ({ search, handleSearch }) => {
    return(
        <div>
        Find a country: <input
                  value={search}
                  onChange={handleSearch}
                />
      </div>
    )

}

export default Search