const excludedParams = ["perPage", "startPage", "minPrice", "maxPrice", "sort", "q"];

module.exports = function filterParser(filtersQueryString) {
  console.log('filtersQueryString in filterParser is');
  console.log(filtersQueryString);
  const mongooseQuery = {};

  if (filtersQueryString.minPrice || filtersQueryString.maxPrice) {
    mongooseQuery.price = {
      $gte: Number(filtersQueryString.minPrice),
      $lte: Number(filtersQueryString.maxPrice)
    };
  }

  return Object.keys(filtersQueryString).reduce(
    (mongooseQuery, filterParam) => {
      if (filtersQueryString[filterParam].includes(",")) {
        mongooseQuery[filterParam] = {
          $in: filtersQueryString[filterParam]
            .split(",")
            .map(item => decodeURI(item))
        };
      } else if (!excludedParams.includes(filterParam)) {
        mongooseQuery[filterParam] = decodeURI(filtersQueryString[filterParam]);
      }
      // console.log('mongooseQuery in filterParser is');
      // console.log(mongooseQuery);

      return mongooseQuery;
    },
    mongooseQuery
  );
};
