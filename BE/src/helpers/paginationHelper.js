const paginationHelper = (query, total) => {
  const pagination = {
    limitItem: 10,
    skipItem: 0
  }

  if (query.page) {
    pagination.skipItem = (parseInt(query.page) - 1) * pagination.limitItem
  }

  return pagination
}

export default paginationHelper