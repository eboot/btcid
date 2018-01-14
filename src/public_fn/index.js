"use strict";

const curry = require("lodash/curry");
const ticker = require("./ticker");
const trades = require("./trades");
const depth = require("./depth");

const AVAILABLE_EXCHANGES = [
  { fn: "bitCoin", key: "btc_idr" },
  { fn: "bitCoinCash", key: "bch_idr" },
  { fn: "bitCoinGold", key: "btg_idr" },
  { fn: "ethereum", key: "eth_idr" },
  { fn: "ethereumClassic", key: "etc_idr" },
  { fn: "ignis", key: "ignis_idr" },
  { fn: "liteCoin", key: "ltc_idr" },
  { fn: "nxt", key: "nxt_idr" },
  { fn: "waves", key: "waves_idr" },
  { fn: "ripple", key: "xrp_idr" },
  { fn: "zCoin", key: "xzc_idr" },
  { fn: "stellarLumen", key: "str_idr" }
];

const getFunctions = request => {
  const fns = {};

  AVAILABLE_EXCHANGES.forEach(exc => {
    fns[exc.fn] = {
      ticker: curry(ticker)(request, exc.key),
      trades: curry(trades)(request, exc.key),
      depth: curry(depth)(request, exc.key)
    };
  });

  return fns;
};

module.exports = getFunctions;
