"use strict";

const FormData = require("form-data");
const querystring = require("querystring");
const _ = require("lodash");
const moment = require("moment");
const crypto = require("crypto");

const TYPE_BUY = "buy";
const TYPE_SELL = "sell";

const generateNonce = () => {
  const timeNumber = new Date().getTime();
  return timeNumber + 10;
};

const generateSignHeader = (secretKey, params = {}) =>
  crypto
    .createHmac("sha512", secretKey)
    .update(new Buffer(querystring.stringify(params)))
    .digest("hex")
    .toString();

const fetchData = (Request, secretKey, method, payload = {}) => {
  const data = {
    method,
    nonce: generateNonce()
  };

  if (Object.keys(payload).length > 0) Object.assign(data, payload);

  const signKey = generateSignHeader(secretKey, data);

  const formData = new FormData();
  for (const [key, val] of Object.entries(data)) {
    formData.append(key, val);
  }

  const headers = {
    Sign: signKey
  };

  Object.assign(headers, formData.getHeaders());

  return Request.post("/", formData, {
    headers
  });
};

const AVAILABLE_FUNCTIONS = {
  showInfo(Request, secretKey) {
    return () => fetchData(Request, secretKey, "getInfo");
  },
  transactionHistory(Request, secretKey) {
    return () => fetchData(Request, secretKey, "transHistory");
  },
  trade(Request, secretKey) {
    return (pair, type, price) => {
      const payload = {
        pair,
        type,
        price
      };

      return fetchData(Request, secretKey, "trade", payload);
    };
  },
  tradeBitcoin(Request, secretKey) {
    return (pair, type, price, btcIdrPrice) => {
      const payload = {
        pair,
        type,
        price
      };

      if (type === TYPE_BUY) Object.assign(payload, { idr: btcIdrPrice });
      if (type === TYPE_SELL) Object.assign(payload, { btc: btcIdrPrice });

      return fetchData(Request, secretKey, "trade", payload);
    };
  },
  tradeHistory(Request, secretKey) {
    return (pair, start = null, end = null, payload = {}) => {
      const defaultPayload = {
        pair,
        count: 1000,
        order: "desc"
      };

      if (_.isNil(start)) {
        const lastSevenDays = moment().subtract(7, "days");
        Object.assign(defaultPayload, { since: lastSevenDays.unix() });
      }

      if (_.isString(start) || _.isDate(start))
        Object.assign(defaultPayload, { since: moment(start).unix() });

      if (_.isNil(end)) {
        const now = moment();
        Object.assign(defaultPayload, { end: now.unix() });
      }

      if (_.isString(end) || _.isDate(end))
        Object.assign(defaultPayload, { end: moment(end).unix() });

      if (Object.keys(payload).length > 0)
        Object.assign(defaultPayload, payload);

      return fetchData(Request, secretKey, "tradeHistory", defaultPayload);
    };
  },
  showOpenOrders(Request, secretKey) {
    return (pair = null) => {
      const payload = {};

      if (!_.isNil(pair)) Object.assign(payload, { pair });

      return fetchData(Request, secretKey, "openOrders", payload);
    };
  },
  showOrderHistory(Request, secretKey) {
    return (pair, startIdx = 0, count = 1000) =>
      fetchData(Request, secretKey, "orderHistory", {
        from: startIdx,
        count
      });
  },
  getOrder(Request, secretKey) {
    return (pair, orderId) =>
      fetchData(Request, secretKey, "orderHistory", {
        pair,
        order_id: orderId
      });
  },
  cancelOrder(Request, secretKey) {
    return (pair, orderId, type) =>
      fetchData(Request, secretKey, "orderHistory", {
        pair,
        order_id: orderId,
        type
      });
  }
};

const getFunctions = (request, secretKey) => {
  const fns = {};

  for (const [key, fn] of Object.entries(AVAILABLE_FUNCTIONS)) {
    fns[key] = _.curry(fn)(request, secretKey);
  }

  return fns;
};

module.exports = getFunctions;
