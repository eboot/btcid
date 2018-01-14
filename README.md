# BTCId

This is a simple implementation on Node.js library to request data from [bitcoin.co.id](http://bitcoin.co.id). You are required to register as a member on bitcoin.co.id and get the **API Key** and **Secret Key** in order to use this library, especially the private API.

## REQUIREMENTS

* NodeJs ver. `8` or later

## INSTALLATION

    npm i btcid --save

## HOW TO USE

    const btcid = require('btcid)

    const btcInst = btcid('myApiKey', 'mySecretKey')

    // private api section
    btcInst.bitCoin.trades().then(res => console.log(res))
    btcInst.stellarLumen.trades().then(res => console.log(res))

    // private api section
    btcInst.showInfo().then(res => console.log(res))

## FUNCTION DOCS

This library follows API pattern and description on here [https://vip.bitcoin.co.id/downloads/BITCOINCOID-API-DOCUMENTATION.pdf](https://vip.bitcoin.co.id/downloads/BITCOINCOID-API-DOCUMENTATION.pdf) so if anything on documentation is updated this library may obsolete and need upgrade to sync with the new version.

The documentation of available function divided into 2 section, **Public** and **Private** section. The public section is not required to pass **Api Key** and **Secret Key** because they just available to you without any restriction. On private section, **Api Key** and **Secret Key** is required because some of actions and response data are related with registered account.

Please check your **Trade API permission** on bitcoin.co.id, if some of permission was not enabled, this library may not works because un-granted permission prevent some actions such as withdrawing your coin.

### public function

`trade`, `depth` and `ticker` functions are available on all public exchanges api such as `bitcoin` and `stellarLumen`, code below is the example how you fetch it.

    // BTC/IDR

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
        // [{
        // "date":"1515933928",
        // "price":"181123000",
        // "amount":"0.00002752",
        // "tid":"5581818",
        // "type":"buy"}, ... ]
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

| Markets       | Function Name | Function Child              |
| ------------- | ------------- | --------------------------- |
| (IDR) BTC/IDR | bitcoin       | `ticker`, `trades`, `depth` |

## LICENSE

MIT (yes you're free to use this)
