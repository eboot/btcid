"use strict";

const curry = require("lodash/curry");
const ticker = require("./ticker");
const trades = require("./trades");
const depth = require("./depth");

const AVAILABLE_EXCHANGES = [
  { fn: "bitCoinIdr", key: "btc_idr" },
  { fn: "bitCoinCashIdr", key: "bch_idr" },
  { fn: "bitCoinGoldIdr", key: "btg_idr" },
  { fn: "ethereumIdr", key: "eth_idr" },
  { fn: "ethereumClassicIdr", key: "etc_idr" },
  { fn: "ignisIdr", key: "ignis_idr" },
  { fn: "liteCoinIdr", key: "ltc_idr" },
  { fn: "nxtIdr", key: "nxt_idr" },
  { fn: "wavesIdr", key: "waves_idr" },
  { fn: "rippleIdr", key: "xrp_idr" },
  { fn: "zCoinIdr", key: "xzc_idr" },
  { fn: "stellarLumenIdr", key: "str_idr" },
  { fn: "bitSharesBtc", key: "bts_btc" },
  { fn: "dashBtc", key: "drk_btc" },
  { fn: "dogeBtc", key: "doge_btc" },
  { fn: "ethereumBtc", key: "eth_btc" },
  { fn: "liteCoinBtc", key: "ltc_btc" },
  { fn: "nxtBtc", key: "nxt_btc" },
  { fn: "stellarLumenBtc", key: "str_btc" },
  { fn: "nemBtc", key: "nem_btc" },
  { fn: "rippleBtc", key: "xrp_btc" }
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
