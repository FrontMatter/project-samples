---
title: ‘Spoof’ Tokens on Ethereum
tags:
  - Blockchain
  - Cryptocurrency
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
geolocation: 'Niseko, Hokkaido, Japan'
mathjax: false
share: false
copyright: true
categories:
  - Money_経済
img: /2022/0318/Money_経済/Spoof-Tokens-on-Ethereum/AdobeStock_160390960.svg
openGraph_img: /2022/0318/Money_経済/Spoof-Tokens-on-Ethereum/AdobeStock_160390960.png
excerpt: >-
  Fake or ‘spoof’ ERC-20 token transfers are not a new occurrence in Ethereum.
  However, wider adoption of the blockchain in the last year has caused a sharp
  uptick in these cases.
sourceUrl: 'https://medium.com/etherscan-blog/spoof-tokens-on-ethereum-c2ad882d9cf6'
sourceAuthor: Harith Kamarul
sourcePublishDate: 2022-03-10
date: 2022-03-18 10:21:54
updated: 2022-03-18 10:50:54
sourceAuthorImg: https://miro.medium.com/fit/c/176/176/2*R5aay0bWhvAMIw-a-aKkzA.jpeg
---
 ![Ethereum 'Spoof' Tokens](./Spoof-Tokens-on-Ethereum/1_RXlVHMo6jwRxl4nDE3TW4w.jpeg)

 Fake or ‘spoof’ ERC-20 token transfers are not a new occurrence in Ethereum. However, wider adoption of the blockchain in the last year has caused a sharp uptick in these cases. It was a common-enough question that we provided a short answer in our newsletter two months ago, but the increasing number and a recent high-profile case calls for a more in-depth look.

 {% link `No, 'Peaceful World' Token Is Not Ukraine's Secret Airdrop`, https://www.coindesk.com/markets/2022/03/03/could-this-peaceful-world-token-be-ukraines-secret-airdrop/, https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/6TDYP2H66FHJNAG2PT2G5GNSG4.jpg %}

 In this article, we go over:

 * What this ‘*spoofing*’ is
 * How to detect it
 * How to avoid it

 Imagine hearing rumors of an upcoming token airdrop from a much-hyped DeFi product. The consummate trader that you are, you scour the blockchain for any hints of this happening.

 Lo and behold, you notice that a token with name and symbol bearing close resemblance to this DeFi product is newly minted. What’s more, you see it sent to an address you’ve privately tagged as belonging to a well-connected whale/influencer.

 And then that address transfers it on. “This must be it!”, you proclaim. Wanting to frontrun others getting into this coin, you ape in buying a large chunk of the token from a just-created Uniswap V2 liquidity pool. An hour later, the LP gets drained of all ETH and you realize you’ve been played.

## What went wrong?

 ![None of these tokens were actually sent by the Ukraine Crypto Donation address.](./Spoof-Tokens-on-Ethereum/1_0oe2oFfcqQvEZWUOzH2rNA.png)

 ![Nor are these real OpenSea tokens being transferred by the OpenSea: Registry address.](./Spoof-Tokens-on-Ethereum/1_8TbIFQAwk5ocKBf8uj8jcw.png)

 The mistake you made was to believe that a token transfer with your trusted influencer listed as the From address was actually made by that address. This ‘spoofing’ tricks unsuspecting users by taking advantage of:

 * The ERC-20 standard design
 * Block explorers’ transparent data display

 The [ERC-20 standard](https://eips.ethereum.org/EIPS/eip-20) transfer and transferFrom functions can be modified to allow any arbitrary address to be the sender of tokens, as long as this is specified within the smart contract, resulting in a token being transferred from a different address than the one that initiated the transaction.

 Often the ‘spoofing’ token contracts are not verified on Etherscan precisely because it helps to obscure the contract’s inner workings.
 
 For ERC-20 token transfers, block explorers such as Etherscan display the address that a token is transferred from, not the initiator address. Data for block explorers are not censored by default due to their very nature.

 In most cases, the extent of damage is limited to bagholding a token with zero value. But more dangerous cases can exist, such as a token with revert error messages that point to a phishing website stealing user private keys. ERC-721 and ERC-1155 tokens (NFTs) may also suffer from the same issue.

 {% twitter https://twitter.com/etherscan/status/1442840990436368385 %}

## How might one detect this?
 The answer is fairly simple. For any of these token transfers, click on the exact transaction hash and inspect its details. The From address that initiated the transaction is clearly not the same From address for the token transfer.

 To dig deeper, look for the spoofed From address in the transaction input data or contract source code. It would typically be included in either location. If the contract is not verified, doing this becomes harder but it automatically makes the token that much more suspicious.

 ![Fake OpenSea token made to look as if it was transferred by OpenSea: Registry in this transaction.](./Spoof-Tokens-on-Ethereum/1_cM6KIoJa3MWILPNg3-Aixw.png)

 One key caveat. Not all token transfers initiated by a different address are necessarily fake or spoofing. A common example is dApps that send multiple token transfers in bulk. These usually have a Public Name Tag added by Team Etherscan — if there are any untagged, please [let us know](https://etherscan.io/contactus?id=5)!

 ![Transaction with bulk send of tokens.](./Spoof-Tokens-on-Ethereum/1_Olvbm1CvYB56LSVNO2bOBQ.png)

 A close cousin of spoofing is that of spam tokens. While these do not pretend to be sent by an influencer’s address, they are sent en masse to it and make reading the address’s token tabs a miserable experience.

 ![Sifting through Pranksy’s token transfers isn’t much fun… many of these token are also clearly fake!](./Spoof-Tokens-on-Ethereum/1_4uLPvjZ3_aJfhECPC5bKCQ.png)


## What can be done to avoid this?
 For the average user, there is no need to do anything as this problem is unlikely to affect you much. For the degens, it is wise to stop and ask yourself whether something is too good to be true. And then check the transaction details page.
 
 Etherscan does not censor data by default, but we are exploring ways to help alleviate this problem. The first such step will be to extend the capabilities of our [Token Ignore List](https://etherscan.io/mytokenignore). The feature will:

 1. Automatically hide token transfers in the ERC-20, ERC-721 and ERC-1155 tabs on top of hiding them in address balance and token holdings.
 2. Include a simple option for users to opt into ignoring all tokens that have been flagged as Suspicious or worse by Team Etherscan.

 We hope this feature extension will help protect users from getting spoofed and at the same time enjoy a cleaner user experience on the website.

 As always, happy to hear your feedback!

---

 For more on these ‘spoofing’ tokens, refer to:

 * https://blog.mycrypto.com/bad-actors-abusing-etherscan-to-trick-you
 * https://twitter.com/cryptocatvc/status/1498406376309235713