"use strict";

const Axios = require("axios");
const publicExchange = require("./public_fn");
const privateFunction = require("./private_fn");

const PUBLIC_API = "https://vip.bitcoin.co.id/api";
const PRIVATE_API = "https://vip.bitcoin.co.id/tapi";

const REQUEST_TIMEOUT = 20000;

const btid = (apiKey = null, secretKey = null) => {
  const fns = {};

  const requestPub = Axios.create({
    validateStatus: null,
    baseURL: PUBLIC_API,
    timeout: REQUEST_TIMEOUT
  });
  const publicFns = publicExchange(requestPub);

  Object.assign(fns, publicFns);

  if (apiKey && secretKey) {
    const requestPvt = Axios.create({
      validateStatus: null,
      baseURL: PRIVATE_API,
      timeout: REQUEST_TIMEOUT,
      headers: {
        Key: apiKey
      }
    });

    const publicFns = privateFunction(requestPvt, secretKey);
    Object.assign(fns, publicFns);
  }

  return fns;
};

module.exports = btid;
