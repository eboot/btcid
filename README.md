# BTCId

This is a simple implementation on Node.js library to request data from [bitcoin.co.id](http://bitcoin.co.id). You are required to register as a member on bitcoin.co.id and get the **API Key** and **Secret Key** in order to use this library, especially the private API.

## REQUIREMENTS

* NodeJs ver. 8 or later

## INSTALLATION

    npm i @slaveofcode/btcid --save

## HOW TO USE

    const btcid = require('btcid)

    const btcInst = btcid('myApiKey', 'mySecretKey')

    // public api section
    btcInst.bitCoin.trades().then(res => console.log(res))
    btcInst.stellarLumen.trades().then(res => console.log(res))

    // private api section
    btcInst.showInfo().then(res => console.log(res))

## FUNCTION DOCS

This library follows API pattern and description on here [https://vip.bitcoin.co.id/downloads/BITCOINCOID-API-DOCUMENTATION.pdf](https://vip.bitcoin.co.id/downloads/BITCOINCOID-API-DOCUMENTATION.pdf) so if anything on documentation is updated, this library may obsolete and need upgrade to sync with the new version.

The documentation of available function divided into 2 section, **Public** and **Private** section. The public section is not required to supply **Api Key** and **Secret Key** because they just available to you without any restriction. On private section, **Api Key** and **Secret Key** is required because some of actions and response data are related with your account.

Please check your **Trade API permission** on bitcoin.co.id, if some of permission was not enabled, this library may not works because un-granted permission prevent some actions such as withdrawing your coin.

### public function

`trade`, `depth` and `ticker` functions are available on all public exchanges api such as `bitcoin` and `stellarLumen`, the code below is the example of how you fetch it.

    // BTC/IDR

    const btcid = require('btcid)
    const btcInst = btcid('myApiKey', 'mySecretKey')

    // Get trades
    btcInst.bitcoin
      .trades()
      .then(res => {
        console.log(res)
        // [{ date: '1515931908',
        // price: '184499000',
        // amount: '0.00124928',
        // tid: '5580857',
        // type: 'buy' }, ... ]
      })

    // Get depth
    btcInst.bitcoin
      .depth()
      .then(res => {
        console.log(res)
        // {
        //  "buy": [
        //    [
        //      1381900,
        //      "0.38504088"
        //    ],
        //    [
        //      1380200,
        //      "128.30297275"
        //    ], ...
      })

    // Get ticker
    btcInst.bitcoin
      .ticker()
      .then(res => {
        console.log(res)
        // ticker:
        // { high: '213900000',
        // low: '180018000',
        // vol_btc: '905.70906859',
        // vol_idr: '179723835524',
        // last: '181598000',
        // buy: '181598000',
        // sell: '181599000',
        // server_time: 1515934133 }, ... ]
      })

| Market          | Function Name      | Function Child              |
| --------------- | ------------------ | --------------------------- |
| (IDR) BTC/IDR   | bitcoinIdr         | `ticker`, `trades`, `depth` |
| (IDR) BCH/IDR   | bitCoinCashIdr     | `ticker`, `trades`, `depth` |
| (IDR) BTG/IDR   | bitCoinGoldIdr     | `ticker`, `trades`, `depth` |
| (IDR) ETH/IDR   | ethereumIdr        | `ticker`, `trades`, `depth` |
| (IDR) ETC/IDR   | ethereumClassicIdr | `ticker`, `trades`, `depth` |
| (IDR) IGNIS/IDR | ignisIdr           | `ticker`, `trades`, `depth` |
| (IDR) LTC/IDR   | liteCoinIdr        | `ticker`, `trades`, `depth` |
| (IDR) NXT/IDR   | nxtIdr             | `ticker`, `trades`, `depth` |
| (IDR) WAVES/IDR | wavesIdr           | `ticker`, `trades`, `depth` |
| (IDR) XRP/IDR   | rippleIdr          | `ticker`, `trades`, `depth` |
| (IDR) XZC/IDR   | zCoinIdr           | `ticker`, `trades`, `depth` |
| (IDR) XLM/IDR   | stellarLumenIdr    | `ticker`, `trades`, `depth` |
| (BTC) BTS/BTC   | bitSharesBtc       | `ticker`, `trades`, `depth` |
| (BTC) XLM/BTC   | stellarLumenBtc    | `ticker`, `trades`, `depth` |
| (BTC) DASH/BTC  | dashBtc            | `ticker`, `trades`, `depth` |
| (BTC) DOGE/BTC  | dogeBtc            | `ticker`, `trades`, `depth` |
| (BTC) ETH/BTC   | ethereumBtc        | `ticker`, `trades`, `depth` |
| (BTC) LTC/BTC   | liteCoinBtc        | `ticker`, `trades`, `depth` |
| (BTC) NXT/BTC   | nxtBtc             | `ticker`, `trades`, `depth` |
| (BTC) NEM/BTC   | nemBtc             | `ticker`, `trades`, `depth` |
| (BTC) XRP/BTC   | rippleBtc          | `ticker`, `trades`, `depth` |

### private function

| Function Name      | API Methods (API Docs) | Parameter                                         | Example                                                                                                                         |
| ------------------ | ---------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| showInfo           | getInfo                | None                                              | `btcInst.showInfo().then(res => console.log(res.data))`                                                                         |
| transactionHistory | transHistory           | None                                              | `btcInst.transactionHistory().then(res => console.log(res.data))`                                                               |
| tradeHistory       | tradeHistory           | `pair name`, `start date`, `end date`, `config`   | `btcInst.tradeHistory('str_btc', '2017-12-12', '2018-01-01', {count: 1000}).then(res => console.log(JSON.stringify(res.data)))` |
| showOpenOrders     | openOrders             | `pair name` or None (all pairs)                   | `btcInst.showOpenOrders().then(res => console.log(JSON.stringify(res.data)))`                                                   |
| showOrderHistory   | orderHistory           | `pair name` or None (all pairs)                   | `btcInst.showOrderHistory().then(res => console.log(JSON.stringify(res.data)))`                                                 |
| getOrder           | getOrder               | `pair name`, `order id`                           | `btcInst.getOrder('str_idr', 4630225).then(res => console.log(JSON.stringify(res.data)))`                                       |
| cancelOrder        | cancelOrder            | `pair name`, `order id`, `type` (`buy` or `sell`) | `btcInst.cancelOrder('str_idr', 18, 'buy').then(res => console.log(JSON.stringify(res.data)))`                                  |
| trade              | trade                  | `pair name`, `type` (`buy` or `sell`), `price`    | `btcInst.trade('str_idr', 'buy', 7200).then(res => console.log(JSON.stringify(res.data)))`                                      |

Moreover you could see the source of these function at `src/private_fn/index.js`. Go ahead and open an issue if you found a bug.

## LICENSE

MIT (yes you're free to use this)
