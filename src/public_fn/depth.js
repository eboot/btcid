"use strict";

const getDepth = (Request, endpointKey) => {
  return async () => await Request.get(`/${endpointKey}/depth`);
};
