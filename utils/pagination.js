const getPagination = (page, size) => {
  return { offset: (page - 1) * size, limit: size };
};

const getPaginatedDataFormat = (data, page, limit) => {
  return {
    totalCount: data.count,
    data: data.rows,
    totalPages: Math.ceil(data.count / limit),
    currentPage: page,
  };
};

module.exports = {
  getPaginatedDataFormat,
  getPagination,
};
