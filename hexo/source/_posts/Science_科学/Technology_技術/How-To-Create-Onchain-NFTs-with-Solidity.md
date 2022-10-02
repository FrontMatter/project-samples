---
title: How To Create On-chain NFTs with Solidity
tags:
  - Blockchain
  - Cryptocurrency
  - NFT
  - Gist
  - YouTube
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
geolocation: 'Chiba, Japan'
mathjax: false
share: false
copyright: true
categories:
  - Science_科学
  - Technology_技術
img: >-
  /2022/0331/Science_科学/Technology_技術/How-To-Create-Onchain-NFTs-with-Solidity/AdobeStock_462930458.svg
openGraph_img: >-
  /2022/0331/Science_科学/Technology_技術/How-To-Create-Onchain-NFTs-with-Solidity/AdobeStock_462930458.png
date: 2022-03-31 21:30:39
updated: 2022-03-31 21:19:39
excerpt: >-
  Create a smart contract that will allow users to enter text at the time of mint, generate SVG data that includes our user input, encode this into Base64, and add this into our metadata that is also base64 encoded.
sourceUrl: https://medium.com/coinmonks/how-to-create-on-chain-nfts-with-solidity-1e20ff9dd87e
sourceAuthor: Parker Ferguson
sourceAuthorImg: https://miro.medium.com/fit/c/176/176/1*n-0vuXjaWzfFlRfltDrQzw.png
sourcePublishDate: 2021-12-27
---
 *Incorporating user content into an NFT at mint*

 ![Source: https://2muchcoffee.com/blog/how-to-build-an-opensea-like-nft-marketplace/](./How-To-Create-Onchain-NFTs-with-Solidity/NFT_MarketPlace.png)

 Having been some time since I’ve written anything blockchain or NFT related I figured an update was in order.

 At the time of writing this my first NFT article, [Creating Generative Art NFTs with Python and Solidity](https://betterprogramming.pub/creating-generative-art-nfts-with-python-solidity-a95eaeea515e), has over 50k views; many of which resulted individuals, companies and dev teams reaching out for blockchain development or consultation services. Thanks to readers sharing these articles I’ve had the opportunity to work on a number of interesting projects — today I’d like to share the details of one such project in particular. The client request in this case, to develop an entirely on-chain NFT with the additional capability of adding user content at time of mint.


## Off-chain NFTs
 This begs the question, aren’t all NFTs on-chain? Well, anyone who has worked on an NFT project on the Ethereum blockchain can tell you there are real limitations with regard to on-chain data storage; this is prohibitively expensive and most NFT projects store both image and metadata files off-chain. Typically the only data we see stored “on-chain” is an immutable hash to our metadata (our tokenURI) — The easiest way to describe this hash is a link to our actual NFT, the difference here being that a hash is dependant on the data from which it is created; alter the source, and the hash is no longer valid, hence it is immutable. To keep things ‘decentralized’ off chain storage solutions like IPFS and Arweve do the ‘heavy lifting’ with respect to decentralized NFT data storage by leveraging a ‘community’ of nodes around the world — anyone can run an IPFS node just as anyone can run a blockchain miner or consensus node.

 Now, you may be familiar with ‘on-chain’ projects like Loot, so how is this done? Can we actually store proper visual media on-chain?

 Well the answer is yes but it requires a few things, namely Base64 encoding and the SVG image type. Both allow us to deal in textual data rather than the typical memory ‘heavy’ visual data like PNG or JPEG. This means we need to do two things:
 1. Base64 encode our json metatdata
 2. Encode ‘instructions’ for image render in the SVG format

 Lucky for us browsers can understand both formats and browser based marketplaces like OpenSea can render our NFT in the same way it would a link to an IPFS storage hash however, instead of ‘getting & caching’ the image, the browser renders the image for us.
 
 As usual the code to achieve this can be found and forked [here](https://github.com/Park-City-Utah/onChainNFT); [Remix](https://remix.ethereum.org/) will be the easiest way to test your code<sup>**</sup>.

 LFG.


## Base64 encoding
 One way to we can achieve on-chain metadata storage and avoid the requirement for any tool such as IPFS is to base64 encode it and store it directly in our NFT token data. You may be familiar with the TokenURI function that returns to us, and OpenSea, the hash to our metadata.. well in our case tokenURI will return the actual metadata, in an encoded format; this is no longer a ‘link’ but the metadata itself.

 As I said we will be leveraging an existing `Base64.sol` library from GitHub, you can find that repo [here](https://github.com/Brechtpd/base64/blob/main/base64.sol). You can import from github or simply clone/copy the code and import this file from the same directory you pasted this in.

 A note on **encoding** in Base64, encoding is not a form of data compression therefor we are not reducing the size of our data we are simply storing it in a format that our browser can **decode**. Our metadata is NOT prohibitively large, which is the case of our NFT image. You can see an example of this below:

 ![](./How-To-Create-Onchain-NFTs-with-Solidity/base64encoder.io.png)

 In our example code we leverage the function ‘BuildMetaData’ which takes a tokenId (the id of our NFT) and returns a base64 encoded json text string with everything OpenSea needs to render our NFT with its Name, Description, Attributres, and very importantly, our Image. It also leverages the BuildImage function that I will explain below.

 The following is a sample of our metadata:

 {% gist 4c5043360915be6d7b67340cf124e5b1 onChainMetadata.json %}

 Typically our ‘image’ value would look something like this:
 
 {% gist b06efbd4392c7bf0a8c244a83c23e3dd offChainMetaImage.json %}

 So whats up with our Image value? This looks like it is also Base64 encoded… Well, you are right our Image value is 1 — SVG and 2 — the SVG is also Base64 encoded; this means our SVG text has been encoded just like our json (text) data.

 You will notice that we append something to our encoded json and it looks like this:

{% noteblock base %}
 data:application/json;base64,
{% endnoteblock %}

 This simply describes what the data is, and therefore how the recipient, or recipients browser can DECODE it accordingly.


## ABI Encoding
 You likely noticed that we also perform ABI encoding throughout our project code. ABI encoding or Application Binary Interface in our case will simply allows us to concatenate multiple lines of text. “This”, “is”, “my”, “code” will cause errors if it is not encoded into a single string.


## SVG files
 So what is SVG and why does it matter to us? [SVG or scalable vector graphics](https://www.w3schools.com/graphics/svg_intro.asp) essentially allows us to store images in a xml type format, or as text; text that can be stored on-chain. Rather than store large image data, we **describe** our intend image in text and encode this in a way our browser, and OpenSea, can render for us. We can set all kinds of features of our image including size, color and even text that can be rendered for us.

 Think about it this way, if I want to send you a simple image I can either email or text you a high resolution PNG, or you could simply describe it in a few words and let your recipient render or generate it for you. If date or the transmission of data is expensive we can make a ‘trade off’ by reducing that cost via increasing the cost, as effort, by the recipient.

 The following text description is likely much less data intensive to relay, then a high def PNG. As long as the recipient has the tools to easily render this we have just dramatically reduced the cost in terms of data storage or transmission:

{% noteblock base %}
500x500 size blue background with white text saying ‘Hello World’
{% endnoteblock %}

 Our sample code describes the parameters for our SVG in the function BuildImage.

 There are many great online tools and templates for SVG generation, I encourage you to find some tooling that helps make your idea a SVG reality.

 One thing I will advise is to make sure you use percentages for layout, as with app development ‘hard coding’ values can cause us problems when we increase or reduce the size of of the screen on which we render. 1000 pixels for a starting point of our text may be fine, until we reduce the screen size of our device below 1000x1000, in this case we would be better suites to have set this to 80%.

 Our SVG, before ABI and Base64 encoding:

 {% gist ded281e0e23d3bff6632a8e09cfdb215 SVG.txt %}

 The output of our SVG BuildImage can be seen here:

 ![](./How-To-Create-Onchain-NFTs-with-Solidity/SVG_BuildImage.png)

 You will once again notice that we have appended details with regard to the data:

{% noteblock base %}
data:image/svg+xml;base64
{% endnoteblock %}


## User Input
 One of the more interesting features of our smart contract is the ability for user to contribute to the final NFT by inputing some text data into the mint function. This user input is saved as a ‘memory string’ and later added to our SVG data dynamically via the BuildImage function.
 
 I have limited the size of the text input and added an error for this restriction but otherwise the user has full range on what they might add. This is immutable and will live on the blockchain forever— this may cause some to want to restrict certain words but in accordance with the democratized nature of the blockchain technology, I have placed no further limitations or censorship.

 Our mint function achieves this feature simply by adding a string expectation on the function:

 {% gist 4377a4713081d9b8457ccf9e3ee5594c mint.sol %}


## Interacting with our NFT & Smart Contract
 If you are using a tool such as Remix you can simply alter the code provided, upload this to Remix, compile and deploy to test.

 Being that our mint function expect user input string data, you will be able to add text and then leverage our tokenURI function to see what is produced, this is the same tokenURI function that marketplaces like OpenSea will leverage to retrieve OR resolve our NFT data and image.

 ![](./How-To-Create-Onchain-NFTs-with-Solidity/tokenURI.png)

 So what do we do with this? To render this in your browser you will want to copy everything AFTER ‘string’ (we don’t need this) and paste this in our browser. The result of pasting this into our browser will look like this:

 ![Metadata details from our TokenURI function, pasted into our local browser](./How-To-Create-Onchain-NFTs-with-Solidity/Metadata_details.png)

 Further, we can see our image by copying the “image” value, the part we want to copy is highlighted here:

 ![](./How-To-Create-Onchain-NFTs-with-Solidity/image_value.png)

 And the result can be seen here:

 ![Image data pasted into our local browser](./How-To-Create-Onchain-NFTs-with-Solidity/img_in_browser.png)


## Our NFT
 With that, we have created a smart contract that will allow users to enter text at the time of mint, generate SVG data that includes our user input, encode this into Base64, and add this into our metadata that is also base64 encoded. The result, an on-chain NFT that will render in marketplaces like OpenSea as such:

 ![Our NFT image](./How-To-Create-Onchain-NFTs-with-Solidity/Our-NFT-image.png)


## **A note on Remix
 If you choose to test your code on Remix you may find you run into a timeout error when you attempt to run tokenURI — this is due to the limitations of the online JVM and can be solved by simply switching your ‘Environment’ setting to ‘Injected web3’. I personally use the Rinkeby test net with my Metamask browser wallet. You will need Rinkeby testnet Eth for gas from a [Rinkeby faucet](https://remix.ethereum.org).

 ![](./How-To-Create-Onchain-NFTs-with-Solidity/Rinkeby-faucet.png)

 Rinkeby is a great way to test and successful mint will actually mean you can view your NFTs on the [Rinkeby OpenSea instance](https://remix.ethereum.org), essentially a clone of OpenSea.

 Happy testing!


## Video
For an extremely detailed walkthrough of very similar code, although without user input functionality at the mint, please check out the following youtube [video](https://www.youtube.com/watch?v=UBGXFV1TQxc) and follow [HashLips NFT](https://www.youtube.com/channel/UC1LV4_VQGBJHTJjEWUmy8nA)'s channel where you will find all kinds of excellent NFT content.

### How to create on-chain NFTs (1:31:06 hours)
 Today I will show you the process of creating NFTs purely on-chain. This is a simple yet powerful example. With this knowledge, you will be able to extend on this and create creative solutions for on-chain SVG NFTs. Hope you enjoy the video.

 {% ghcard HashLips %}

{% youtuber video UBGXFV1TQxc %}

    start: 0,
    allowfullscreen: 1,
    autoplay: 0,
    hl: en,
    cc_lang_pref: en,
    cc_load_policy: 1,
    color: white,
    controls: 1,
    disablekb: 0,
    enablejsapi: 1,
    fs: 0,
    iv_load_policy: 3,
    loop: 0,
    modestbranding: 1,
    playsinline: 0,
    privacy_mode: yes,
    rel: 0,
    showinfo: 0,
    origin: blog.richiebartlett.com,
    widget_referrer: blog.richiebartlett.com
{% endyoutuber %}

---
RELATED:
 {% link How to convert your digital art into NFTs and sell it, https://cointelegraph.com/news/how-to-convert-your-digital-art-into-nfts-and-sell-it, https://images.cointelegraph.com/images/717_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjItMDMvZWI5NGFhN2YtY2RhNy00YTEyLWJiNzctYmE5NGFmNDZhMzk4LmpwZw==.jpg %}