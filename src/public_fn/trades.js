"use strict";

const getTrades = (Request, endpointKey) => {
  return () => Request.get(`/${endpointKey}/trades`);
};

module.exports = getTrades;
