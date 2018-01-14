"use strict";

const _ = require("lodash");
const moment = require("moment");
const crypto = require("crypto");

const TYPE_BUY = "buy";
const TYPE_SELL = "sell";

const generateNonce = () => {
  const timeNumber = new Date().getTime();
  return timeNumber + 10;
};

const generateSignHeader = (secretKey, params = {}) => {
  return crypto
    .createHmac("sha512", secretKey)
    .update(new Buffer(params))
    .digest("hex")
    .toString();
};

const fetchData = (Request, secretKey, method, payload = {}) => {
  const params = {
    method,
    nonce: generateNonce()
  };

  if (Object.keys(payload).length > 0) {
    Object.assign(params, payload);
  }

  const signKey = generateSignHeader(secretKey, params);
  return Request.post("/", params, {
    headers: {
      Sign: signKey
    }
  });
};

const AVAILABLE_FUNCTIONS = {
  showInfo(secretKey, Request) {
    return () => fetchData(Request, secretKey, "getInfo");
  },
  transactionHistory(secretKey, Request) {
    return () => fetchData(Request, secretKey, "transHistory");
  },
  trade(secretKey, Request) {
    return (pair, type, price) => {
      const payload = {
        pair,
        type,
        price
      };

      if (idr !== null) Object.assign(payload, { idr });
      if (btc !== null) Object.assign(payload, { btc });

      return fetchData(Request, secretKey, "trade", payload);
    };
  },
  tradeBitcoin(secretKey, Request) {
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
  tradeHistory(secretKey, Request) {
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
  showOpenOrders(secretKey, Request) {
    return (pair = null) => {
      const payload = {};

      if (!_.isNil(pair)) Object.assign(payload, { pair });

      return fetchData(Request, secretKey, "openOrders", payload);
    };
  },
  showOrderHistory(secretKey, Request) {
    return (pair, startIdx = 0, count = 1000) =>
      fetchData(Request, secretKey, "orderHistory", {
        from: startIdx,
        count
      });
  },
  getOrder(secretKey, Request) {
    return (pair, orderId) =>
      fetchData(Request, secretKey, "orderHistory", {
        pair,
        order_id: orderId
      });
  },
  cancelOrder(secretKey, Request) {
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

  for (const [key, fn] of AVAILABLE_FUNCTIONS) {
    fns[key] = curry(fn)(request, secretKey);
  }

  return fns;
};

module.exports = getFunctions;
