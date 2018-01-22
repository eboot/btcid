"use strict";

const getTicker = (Request, endpointKey) => {
  return () => Request.get(`/${endpointKey}/ticker`);
};

module.exports = getTicker;
