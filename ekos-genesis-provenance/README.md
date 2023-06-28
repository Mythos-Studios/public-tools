
# Ekos Genesis Art Collection

### Overview
We wanted the community to feel comfortable that the distribution of the Ekos Genesis Art Collection NFTs was fair and provably random.  To do this, we took the following steps:

1) We created the base collection metadata.
2) We shuffled the metadata using an algorithm that can be recreated and published the proof on-chain before the auction started.
3) We took deposits during the auction, tracking the amount and order.
4) After the auction ended, we walked through the shuffled list, and distributed all the assets (and deposit residuals), in order, according to deposit amount and time, based on the clearing price.

You can see a more detailed explanation on how we did this below.

### Provably Random Process

#### Step One:  Gather All Metadata
For the data processing requirements, we built a large JSON file containing all of the metadata for the entire collection of 995 NFTs.  You can see this individual metadata, all of them alphabetically sorted, in the `./metadata-all-unshuffled.json` file.

#### Step Two:  Publicly Determine Random Seed
After getting everything ready, we decided to choose the block hash of the Ethereum block closest to start of the hour we were running the algorithm.  In this case, it was block `17095218` on April 21 @ 2:00pm PST.  You can see the block hash we used here:  https://etherscan.io/block/17095218

The block hash random seed we used for the shuffle:  `0xc913a04189010d86149cc7c5c9fd5ae23b174ee44857594a4dd3698dc70b560f`

You can see the code setting the random seed in the `./seed.js` file.

#### Step Three:  Shuffle the Metadata
During the hour of Ethereum block 17095218, we used the `seedrandom` Node library in the `check-provenance.js` script to shuffle the sorted array using our block hash as the seed, producing the contents of the file, `./shuffled-final.json`.

#### Step Four:  Hash the Shuffled Metadata
We then obtained the SHA256 hash of `e707250940efbbe96c6c822a54a66630a7e4ff70684ca2c2bb2eeac601d5c542` from that file.

```
$:  shasum -a 256 ./shuffled-final.json
e707250940efbbe96c6c822a54a66630a7e4ff70684ca2c2bb2eeac601d5c542  ./shuffled-final.json
```

#### Step Five:  Publish Shuffled Hash
That hash was then written into the Ethereum blockchain as provenance on April 21, 2023 at 2:54pm.  You can see the transaction here:  https://etherscan.io/tx/0x67c01de282a770c992acaac96611efe3f50e0799ece0bba9f5ae0f9f773775c8

#### Step Six: The Auction Completed
During the auction for the Ekos Genesis Art Collection, we took ETH deposits, in-order, and escrowed the funds to avoid high ETH gas prices.  When the auction completed, all of the NFTs were distributed to the wallets that participated in the auction in the order in which they deposited.  You can read more about the entire auction in depth in our FAQs here: https://www.ekos.io/faq

Once it was time to distribute the tokens, we batch-sent the NFTs and the deposit residuals, in-order from the final leaderboard finish, and walkied through the shuffled list, all from a single transaction here: 
https://etherscan.io/tx/0x88aeb9bb8ac54b47a438f74c7d8ecf21928cd77a88e89956e8e9d1754fa4a5de

### Recreating the Proof of Random
You can download and run this tool to recreate the provenance hash we pushed on-chain back in April of 2023.

Clone our public tools repo:
```
$: git clone git@github.com:Mythos-Studios/public-tools.git
```

Go to the provenance tool directory:
```
$: cd ekos-genesis-provenance
```

Install the dependencies:
```
$: npm install
```

Run the node script:
```
$: node check-provenance.js
```

Validate that the provenance hash matches the one on-chain:
```
$: shasum -a 256 ./shuffled-final.json
```
