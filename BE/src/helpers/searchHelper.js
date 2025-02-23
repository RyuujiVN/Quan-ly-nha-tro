const searchHelper = (query) => {
  const search = {
    keyword: query.keyword
  }

  if(search.keyword) {
    const regex = new RegExp(search.keyword, "i")
    search.regex = regex
  }
  
  return search
}

export default searchHelper