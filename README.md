# BTCId

This is a simple node.js library to request data from [bitcoin.co.id](http://bitcoin.co.id). You are required to register as a member on bitcoin.co.id and get the **API Key** and **Secret Key** in order to use the private API.

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

## DOCS

This library follows API pattern and description on here [https://vip.bitcoin.co.id/downloads/BITCOINCOID-API-DOCUMENTATION.pdf](https://vip.bitcoin.co.id/downloads/BITCOINCOID-API-DOCUMENTATION.pdf) so if anything on documentation is updated this library may obsolete and need upgrade to sync with new version.

## LICENSE

MIT (yes you're free to use this)
