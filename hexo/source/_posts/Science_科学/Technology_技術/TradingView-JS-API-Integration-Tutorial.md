---
title: TradingView JavaScript API Integration Tutorial
tags:
  - Blockchain
  - Cryptocurrency
  - Javascript
  - Gist
categories:
  - Science_科学
  - Technology_技術
sticky: 999
comments: true
lang: en
draft: published
type: HEXO/post
sitemap: true
toc: true
tocOpen: true
indexing: true
display_tag_onHome: true
recommendedSection: false
donate: false
geolocation: Chiba, Japan
mathjax: false
share: false
copyright: true
sourceUrl: https://medium.com/@jonchurch/tradingview-js-api-integration-tutorial-introduction-5e4809d9ef36
sourceAuthor: Jon CHURCH
sourceAuthorImg: https://miro.medium.com/fit/c/96/96/1*mMoQzenwQ3z5qGpUl67f2A.jpeg
img: /2022/0415/Science_科学/Technology_技術/TradingView-JS-API-Integration-Tutorial/AdobeStock_286819467.png
openGraph_img: /2022/0415/Science_科学/Technology_技術/TradingView-JS-API-Integration-Tutorial/AdobeStock_286819467.png
date: 2022-04-15 19:21:51
updated: 2022-04-15 23:04:00
sourcePublishDate: 2018-06-08
excerpt: >-
  TradingView is the most popular tool for Crypto charting, many exchanges and sites integrate their free Charting Library to provide a powerful interface that traders are familiar with.
---
 [TradingView](http://www.tradingview.com) is the most popular tool for Crypto Charting, many exchanges and sites integrate their free [Charting Library](https://www.tradingview.com/HTML5-stock-forex-bitcoin-charting-library/) to provide a powerful charting interface that traders are familiar with.

 However, the process of getting up and running with the charting library is confusing and poorly documented. This is evidenced by the large number of similar issues submitted to the project.

 **My goal with this tutorial series is to show you how I went about setting this up myself, using CryptoCompare as a free source of price data.**

## Before you begin
 The charting library, although available for free for both commercial and public use, is a private github project which you must apply for access to.

 In the tutorial, I do not provide you with the charting library files, because their license agreement prohibits me from doing so... 😭

 **To actually implement this tutorial yourself, you will need to [apply for access](https://www.tradingview.com/HTML5-stock-forex-bitcoin-charting-library/) to the Charting Library, and then copy it into the `/public/` directory within the project.**

 In the meantime, feel free to follow along to learn about what is involved. Sadly, even the documentation is only available to those who have access to the Charting Library github repo. You will see a 404 if you’re not authorized

## Where’s the Code?
 You can checkout the repo for all steps of this tutorial here:

 {% ghcard lorezyra/tradingview-js-api-tutorial %}


## Setup the chart
{% noteblock info %}
**Disclaimer:** The TradingView charting library is a free, but private project on Github that you must [apply](https://www.tradingview.com/HTML5-stock-forex-bitcoin-charting-library/) for access to. The license agreement I believe bars me from distributing it to you, so to complete this guide fully you will need to apply for access to download the charting library.
{% endnoteblock %}

 To run this part of the tutorial locally (assuming you have access to the charting library) clone the repo available below. Then copy the charting library folder into the `/public/` directory in the "part1" folder. Run `npm install` and then `npm start` to fire up the development server.

 TradingView allows you to use their Charting Library on your own site, with your own source of data.

 There are two ways to get your Data into TradingView, the UDF API and the JS API. The JS API gives you the most control over your data, and in my opinion is much more flexible. Plus it’s *Javascript*!

 You can implement the data connection almost however you want, but actual implementation details are *really fuzzy*. The purpose of this tutorial is to show you a working example of using your own data source with TradingView’s charts to create a basic static chart.

{% noteblock info %}
TradingView **DOES NOT** provide you with this source of data, and assumes you have implemented your own source. 
This tutorial relies on [CryptoCompare’s historic price API](https://min-api.cryptocompare.com/documentation?key=Historical&cat=dataHistohour) as a data source for convenience.
{% endnoteblock %}

 This guide builds off the React Javascript TradingView Example available [here](https://github.com/tradingview/charting-library-examples).


### Overview
 When the chart widget is first loaded, it will call the JS API method `resolveSymbol` with the symbolName for the default pair. In our example `Coinbase:BTC/USD` is the default pair. You are expected to pass a `symbolInfo` object to the `onSymbolResolved` callback passed into the `resolveSymbol` function by the charting library.

 The whole integration is composed of several parts:
 * TV Widget Constructor — takes widget options object, pass in the datafeed,  the default symbol pair to display, user options, chart load/save options
 * Datafeed — Interface between the JS API and your backend
 * JS API — Function signatures required by TV to display your data
 * History Provider — OHLCV bar API
 * Realtime Provider — Update latest candle in realtime, start new candles
 * Symbol Store — List of available symbols


### Widget Constructor
 Widget constructor options configures the TradingView Chart widget, and affects which features are enabled when the chart first loads, as well as what options can be set by the user.

 Here we set options like the User ID, style settings, language, the symbol pair to load, public path to the charting library, and pass in our JS API Datafeed implementation.

{% noteblock info %}
The docs for the widget constructor options are [available here](https://github.com/tradingview/charting_library/wiki/Widget-Constructor), this will *404* if you haven’t applied for access to the Charting Library
{% endnoteblock %}

 Here is the constructor options we are starting with:

```javascript
const widgetOptions = {
   debug: false,
   symbol: 'Coinbase:BTC/USD',
   datafeed: Datafeed, // our datafeed object
   interval: '15',
   container_id: 'tv_chart_container',
   library_path: '/charting_library/',
   locale: getLanguageFromURL() || 'en',
   disabled_features: ['use_localstorage_for_settings'],
   enabled_features: [],
   client_id: 'test',
   user_id: 'public_user_id',
   fullscreen: false,
   autosize: true,
   overrides: {
    "paneProperties.background": "#131722",
    "paneProperties.vertGridProperties.color": "#363c4e",
    "paneProperties.horzGridProperties.color": "#363c4e",
    "symbolWatermarkProperties.transparency": 90,
    "scalesProperties.textColor" : "#AAA",
    "mainSeriesProperties.candleStyle.wickUpColor": '#336854',
    "mainSeriesProperties.candleStyle.wickDownColor": '#7f323f',
   }
  };
```

 This configures the widget to show us `Coinbase:BTC/USD` with candle intervals of 15 minutes, and sets some other customizations (disabled features, default settings to override, what language to use, etc).

 Once loaded, you shouldn’t need to change any of these options, but the [widget exposes methods](https://github.com/tradingview/charting_library/wiki/Widget-Methods) that can be used to change some settings dynamically. (changing symbols can be done through the symbol search which we will implement in part 3 of the tutorial)

 I’ve set my charts up to default to dark mode by setting the `overrides."painProperties.background": “#131722”` .


### JS API Datafeed Integration
 Now that we have the widget configured and styled how we like, let’s look at how we are connecting our chart data to the TradingView Charting Library’s JS API.

 **The JS API is really an Object you supply to the TradingView Widget, which exposes the functions that TradingView will call, and in most cases you are expected to pass data to the Callbacks within those functions to get your data working with tradingview.**

 For example’s sake, we are using [CryptoCompare](https://min-api.cryptocompare.com/)’s historic chart data[^1] and their websocket API to get realtime price updates.

[^1]: Relying on a 3rd party service to provide your chart data in production is less than optimal. For example, CryptoCompare limits minute data to only 7 days in the past. Fine for our tutorial, but this prevents us charting minute data beyond 7 days into the past. Also, you are limited by CryptoCompare’s API rate limits and all downtime they may experience.

 **Tradingview will call the methods you provide** as needed to fill the current chart with data, as well as other lifecycle methods which you must implement.

 **Below is the entire JS API object signature that Tradingview expects you to pass to the widget.** Some methods are optional, [see the docs for more info](https://github.com/tradingview/charting_library/wiki/JS-Api).

```javascript
{
/* mandatory methods for realtime chart */
onReady: cb => {},
// only need searchSymbols when search is enabled
searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {},
resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {},
getBars: (symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) => {},
subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {},
unsubscribeBars: subscriberUID => {},

/* optional methods */
getServerTime: cb => {},
calculateHistoryDepth: (resolution, resolutionBack, intervalBack) => {},
getMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {},
getTimeScaleMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {}
}
```

 When the chart first loads, the JS API flow goes like this:
 1. **onReady** gets called, pass [datafeed configuration options](https://github.com/tradingview/charting_library/wiki/JS-Api#onreadycallback) to `cb`
 2. **resolveSymbol** gets called, pass [symbolInfo object](https://github.com/tradingview/charting_library/wiki/Symbology) to `onSymbolResolvedCallback`
 3. **getBars** is called, pass array of ohlcv objects with UTC time in milliseconds to `onHistoryCallback`


#### onReady
```javascript
const config = {
  supported_resolutions: ["1", "3", "5", "15", "30", "60", "120",   "240", "D"]
}
onReady: cb => {
 console.log('=====onReady running') 
  setTimeout(() => cb(config), 0)
 }
```

 **onReady** is called immediately after the chart widget initializes, and we must pass the datafeed config options into the `onReady` `cb` function. The charting library wants this to be executed asynchronously, and suggests wrapping in setTimeout with delay of 0 to force this behavior.

 Right now we are only specifying [one of the options](https://github.com/tradingview/charting_library/wiki/JS-Api#onreadycallback) possible, `supported_resolutions` which tells the charting library which interval choices our datafeed supports for bars. These will be shown to the user, and can be overridden per symbol pair later in `resolveSymbol` . The list we supplied translates to:

 `1 minute, 3 minute, 15 minute, 30 minute, 1 hour, 2 hour, 4 hour, 1 day`

  Later in the tutorial we will add options to our Datafeed config, as we implement search and realtime charts.

#### resolveSymbol
 Once the datafeed is configured, the charting library will call `resolveSymbol` with the `symbol` property from the widget config object. We are given only a string value, and must return a [symbolInfo object](https://github.com/tradingview/charting_library/wiki/Symbology) that represents the corresponding symbol.

```javascript
resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
  var split_data = symbolName.split(/[:/]/)
  
  var symbol_stub = {
   name: symbolName,
   description: '',
   type: 'crypto',
   session: '24x7',
   timezone: 'America/New_York',
   ticker: symbolName,
   minmov: 1,
   pricescale: 100000000,
   has_intraday: true,
   intraday_multipliers: ['1', '60'],
   supported_resolution:  ["1", "3", "5", "15", "30", "60", "120",   "240", "D"],
   volume_precision: 8,
   data_status: 'streaming',
  }
if (split_data[2].match(/USD|EUR|JPY|AUD|GBP|KRW|CNY/)) {
   symbol_stub.pricescale = 100
  }
  
  setTimeout(function() {
   onSymbolResolvedCallback(symbol_stub)
  }, 0)
}
```

 This is where you configure the individual pair, set the number of decimal places to display, how much it moves per tick (for crypto it’s almost always going to be 1), and **very important and easy to screw up**, the `intraday_multipliers` ! Because crypto is traded nonstop, we set the session to "24x7" . Timezone is supposed to be the timezone of the exchange this symbol is traded on, not very important with 24 hour sessions.

 All the documentation for [symbolInfo is here](https://github.com/tradingview/charting_library/wiki/Symbology), make sure to familiarize yourself with it.

 `intraday_multipliers` and `has_intraday` control showing bar intervals below 1 day. Now here is where I made lots of mistakes: Tradingview can build some bars for you. For example, let’s pretend our historic data API can only give us data for 1 minute intervals, meaning if we request the past 24 hours of data, we will get 1440 data points, the number of minutes in 24 hours. But what if we want to display 15 minute bars? You can tell tradingview that the our `intraday_multiplier` is `‘1’` and only pass it 1 minute bars. The charting library will build the 15 minute bars for you, and display them on the chart.

 We are doing the same for hour bars, telling tradingview we can supply 60 minute bars, and that it should build out our 2 hour and 4 hour bars itself from our 60 minute bars.

 **Ticker** is also very important. If set, then the charting library will use ticker internally to refer to this unique pair (ticker value will be sent to resolveSymbol in place of the name field). The name field is what will be displayed to users. I set both `name` and `ticker` to the same value to make my life easier, and because the names I am using include all the information I need to identify the symbol: exchange, to symbol, and from symbol (e.g. Coinbase:BTC/USD)

 **Pricescale** is a little interesting, because different pairs can use different decimal precision. For example, BTC/USD is measured to two decimal places, so `pricescale = 100` but for say TRX/BTC (0.00000771 BTC at time of writing), we measure it to satoshi’s, 8 decimal places. So for TRX/BTC `pricescale = 100000000` but for TRX/USD ($0.059432 at time of writing), we are going to 6 decimal places and `pricescale = 1000000`.

 **It is important to understand how `symbolInfo` affects your chart, so do check out [the docs](https://github.com/tradingview/charting_library/wiki/Symbology).**


#### getBars
 Now on to the fun part! Getting chart data from our API source and handing it off to TradingView.

```javascript
getBars: function(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {

  historyProvider.getBars(symbolInfo, resolution, from, to, firstDataRequest)
  .then(bars => {
   if (bars.length) {
    onHistoryCallback(bars, {noData: false})
   } else {
    onHistoryCallback(bars, {noData: true})
   }
  }).catch(err => {
   console.log({err})
   onErrorCallback(err)
  })
}

//...

/* historyProvider.js */
var rp = require('request-promise').defaults({json: true})
    getBars: function(symbolInfo, resolution, from, to, first, limit) {
  var split_symbol = symbolInfo.name.split(/[:/]/)
   
  const url = resolution === 'D' ? '/data/histoday' : resolution >= 60 ? '/data/histohour' : '/data/histominute'
   const qs = {
     e: split_symbol[0], // Coinbase
     fsym: split_symbol[1], // BTC
     tsym: split_symbol[2], // USD
     toTs:  to ? to : '',
     limit: 2000, 
    }
return rp({
                url: `${api_root}${url}`,
                qs,
            })
            .then(data => {
    if (data.Response && data.Response === 'Error') {
     console.log('CryptoCompare API error:',data.Message)
     return []
    }
    if (data.Data.length) {
     var bars = data.Data.map(el => {
      return {
       time: el.time * 1000, //TradingView requires bar time in ms
       low: el.low,
       high: el.high,
       open: el.open,
       close: el.close,
       volume: el.volumefrom 
      }
     })
     return bars
    } else {
     return []
    }
   })
}
```

### Okay, let’s break all that code down!
 Tradingview calls `getBars` and passes in the symbolInfo object we passed to the `resolveSymbol` resolve callback, resolution (do we need 1 minute bars? 60 minute bars? 1 day?), to and from timestamps, and a boolean marking if this is the first data request for this symbol.

 From there, we are calling `historyProvider.getBars` which is code we have written to retrieve historic ohlcv data from [Cryptocompare’s historic price API](https://min-api.cryptocompare.com/). We must pass an array of bar data to getBar’s `onHistoryCallback` , that array could look like this for 1 minute bar data:

```javascript
[
  //...
  {
    time: 1528322340000, //bar time must be in milliseconds
    open: 7678.85,
    high: 7702.55,
    low: 7656.98,
    close: 7658.25,
    volume: 0.9834
  },
  //...
]
```

 So our `historyProvider` file is responsible for actually making the request to CryptoCompare to get the appropriate data. To make the request with CrytoCompare we need to know the *to* symbol, *from* symbol, and the specific *exchange* we want data from.

 **Because we have chosen to put all the relevant information into the symbol name (Coinbase:BTC/USD), we are able to extract those parameters from the `symbolInfo.name` string.**

 TradingView also passes the `resolution` to `getBars`, which will inform what API endpoint we request from CryptoCompare, the minute, hour, or day historic data endpoint.

 Because of the limits of CryptoCompare’s API (we are only able to get 2000 records at a time) we may be passing an incomplete set of the data TradingView has requested. No worries! getBars will be called again, with new *to* and *from* timestamps, until all the data it needs to fill the visible part of the chart is obtained.


### Hooray for Static Charts!
 I hope this has helped you. This process overwhelmed me at first, which is why I’m trying to share my experience... this is a confusing process.

 You are likely thinking “Okay great, but static charts don’t help me much...” Next, we implement real-time updates to the chart. It’s important to grasp the concepts outlined here first and get familiar with TradingView’s documentation.



## Realtime Chart Updates
 ![Photo by Toine Garnier on Unsplash](./TradingView-JS-API-Integration-Tutorial/fast_car.jpeg)

 This example will use CryptoCompare’s trade level websocket connection to get price updates as they happen.

 {% link `TradingView Charting Library and React Integration Example`, https://tv-tut-part2.glitch.me, /2022/0414/Money_経済/Research-Crypto-Node-Projects-for-Passive-Income/TradingView.png %}

 The JS API methods that allow us to update the chart in realtime are:
 * `subscribeBars` — subscribe to updates for a symbol
 * `unsubscribeBars` — unsubscribe to updates for a symbol

 Essentially what we need to do is update the most recent candle on our chart, whether that is a 1 minute bar, or a 1 day bar, the process is pretty much the same.

 We have to keep a record of the last bar on the chart, update it with new price data (did the open, high, low, close, or volume for that period change?), and provide a new bar if we have entered a new period.

{% noteblock info %}
If you are providing TV with 1min bars, and letting it build 5min, 15min, etc, bars from that, you will actually be updating 1min bars. Don’t worry though, TV will specify the resolution it needs when it calls `subscribeBars` !
{% endnoteblock %}

 First, let’s take a look at these new JS API methods we will be working with.

### subscribeBars
 This method will be called by the charting library after `resolveSymbol` is called, assuming we were able to successfully resolve the symbol. If you’re not familiar with `resolveSymbol` check out part 1 of this guide.


```javascript
subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {
  
},
```

 The Library will pass these arguments to subscribeBars:

 * `symbolInfo` — `Object` sybolInfo object `resolveBars` , bar
 * `resolution` — `String` resolution of the bars to provide to TV
 * `onRealtimeCallback` — `Function` pass our updated bar into this callback to update the chart
 * `subscribeUID` — `String` unique id for this symbol pair and resolution representing the subscription, based on ticker value + resolution
 * `onResetCacheNeededCallback` — `Function` callback to tell the chart to request the historic static chart data again

 In terms of implementation, subscribeBars is called by the library when the chart symbol or resolution is changed, or whenever the chart needs to subscribe to a new symbol.

 When subscribe bars is called, we need to create a record of the subscription, including the onRealtimeCallback function, so you can call the onRealtimeCallback function with new data received from your realtime data source.

 The JS API is a JS object you pass to the library, which must contain the functions defined by TradingView. These functions are called by the library as needed, you cannot call them yourself, only their callbacks.

 What you’re supposed to do is keep a reference to the subscription, and the callbacks passed into the subscribeBars function. To to update the chart, we pass our updated bar into `realtimeUpdateCallback` .


### So let’s see this in action!
 Assume we have two files, `api/index.js` where the JS API lives, and `api/stream.js` with our realtime update code:

```javascript
// api/index.js
import stream from './stream'
//...
subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {
  stream.subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback)
 },
//...
```

 Keep in mind that a lot of the above deals with specifics of the data source I’m working with, CryptoCompare’s Socket.io websocket channels.

 We need to know a few things which are not provided by the library, we need to know the lastBar we have on the chart, and its values. We need to have a reference to the onRealtimeUpdateCB for the specific chart.

 The parts which are specific to TradingView are the following:
 * Create a record of subscriptions, so we can store a reference to the `updateCB` and pass data to the right chart
 * Updating `lastBar` or creating a new bar based on updates from our datasource
 * Passing the updated/new bar into the `updateCB` provided to us when TradingView calls `subscribeBars`

 From the TradingView library’s perspective, it’s as simple as that. But implementing this flow with your own datasource can be as simple or complicated as your system makes it.



### TV REQS
 Realtime updates are implemented by updating the most recent bar (the currently “open” bar) on the chart. You need to supply the library with the updated version of that bar, as realtime price data comes in.

 The JS API provides two functions to manage this. `susbcribeBars` and `unsubscribeBars` .

 When the chart loads a symbol, or the resolution for the current chart is changed, TV will ask to subscribe to realtime updates for that bar by calling subscribeBars with the symbol and resolution it wants to subscribe to.

```javascript
subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {
  console.log('=====subscribeBars runnning')
}

unsubscribeBars
```
TV will call the subscribeBars function to initiate the realtime subscription for whatever symbol the chart is displaying. In order to pass update data to the chart, you will call the `onRealtimeCallback` passed to you in `subscribeBars` .

{% noteblock info %}
TV calls `subscribeBars` once, and you will need to keep a reference to the `onRealtimeCallback` function to call whenever you need to update the chart for that subscription.
{% endnoteblock %}

 So you are responsible for:
 * Connecting to the realtime data source
 * Managing subscriptions TV informs you about through the subscribeBars and unsubscribeBars methods of the JS API.
 * Keeping track of the most recent bar on the chart
 * Massaging your data to TV format

 The TV bar format is an object that looks like this:

```javascript
{
time: 1528322340000, //bar time must be in milliseconds
open: 7678.85,
high: 7702.55,
low: 7656.98,
close: 7658.25, //close for open bars is the most recent price
volume: 0.9834
}
```

 It’s important to understand the difference between TV’s requirements, and your own data implementation. You can get the data however you please, so long as you supply it to the TV library in the proper format.

 Below is my own example of implementing [CryptoCompare](https://www.cryptocompare.com/api/#-api-web-socket-)’s socket.io trade data websocket.

 **This is just part of a full JS API implementation**, we are exporting two methods from this file, which will be called from our JS API object we pass to TV.

{% gist 9ba520c959c525bbf20320932f108eb0 stream.js %}

 Again, your specific data source implementation will likely look different than mine, unless you’re using CryptoCompare as well!

 The general steps are:
 * Provide a subscribe/unsubscribeBars function to TV through the JS API
 * Make a record of the subscription, hold onto the realtimeUpdateCallback , uid, and resolution passed to you by TV. You also need the lastBar on the chart. My historyProvider is responsible for keeping track of that initially.
 * Subscribe to appropriate channel with your data source
 * On data from the data source, update the lastBar reference you have (or create a new bar, if the lastBar has closed since last data received) with the new trade data
 * Pass that updated bar into the realtimeCallback for the appropriate subscription.
 * Handle unsubscribing

 Let’s breakdown some of what I’m doing to implement CryptoCompare’s specific realtime data to work with this. This is specific to TV only in that I’m massaging the data I have available to the format they specify.

 * Subscribing to channel for trade level updates for the Pair/Exchange specified. Cryptocompare handles many many exchanges, and all the pairs listed there, which is why I built these components into the Symbol Name, e.g, Coinbase:BTC/USD gives me the information I need to subscribe to the correct channel with CryptoCompare
 * On subscription to a channel, listen to the “snapshot” that is sent from CryptoCompare, this is the last few minutes worth of trades from the channel, which allows me to update with price changes that happened between retrieving the historical data, and the moment we connect to the websocket. These updates are sent just like all future updates will be, so I didn’t have to do anything beyond ignore the outdated updates which were older than the lastBar on the chart.
 * I’m pruning each update’s timestamp to the buckets we are using as the trade resolution, this is necessary in order to update the last bar, and determine when we need to open a new bar.
 * Update the lastBar in our subscription record. Record the new high, low, open volume, and close price. Close price will always be the last price update you got. For open bars, “close” is the current price.
 * Send the updated bar to updateCB for the proper subscription.



 Hopefully this has helped answer some questions for you about realtime updates for Trading View Charting Library!



 **That’s all for now!**
 

## References
1. https://www.tradingview.com/rest-api-spec/#tag/Market-Data
2. https://www.tradingview.com/widget/single-ticker/
3. https://github.com/CryptoMF/frostybot-js

