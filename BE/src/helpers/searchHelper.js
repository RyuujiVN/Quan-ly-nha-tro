const searchHelper = (query) => {
  const search = {
    keyword: query.keyword
  }

  if (search.keyword) {
    search.keyword = search.keyword.trim();
    const regex = new RegExp(search.keyword, "i")
    search.regex = regex
  }

  return search
}

export default searchHelper