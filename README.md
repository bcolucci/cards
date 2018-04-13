# Deck of Cards

I've decided to use functional programing style to build the application. Because the goal is to show my skills, I didn't use any library for the core (for the API I've used Express & Cie).

I've used some functional programing concepts like: composition, higher-order function, tail call optimization in recurcive functions, referential transparency and simple memoïzation.

All the code respect the single responsibility principle and I've tried as much as possible to use dependency injection.

Also, in 99% of the code, data are immutable. I really think that the code does not contain any major side effect.

Okay, it's probably not 100% functional but it's a good try!

## Model

The Card model is very simple:

```javascript
{
  suit: Number,
  value: Number,
  code: String,
  str: String
}
```

e.g.:

```javascript
{
  suit: 1,
  value: 7,
  code: '1f0b7',
  str: '🂷'
}
```

* **suit**: The card suit, a number between 0 and 3. From the source:

```javascript
const suits = { spade: 0, heart: 1, diamond: 2, club: 3 }
```

* **value**: The card value, between 1 (Ace) and 14 (King) :
* **code**: The hexadecimal code for the unicode representation of the card ;
* **str**: The unicode representation of the card.

The Deck model is simply:

```javascript
{ id: Number, cards: Array[Card] }
```

## Total size

The core and the API have a total size less than **900 kB**. Mainly because of Express, the core is only **9 kB**...

## Execution time

With the core lib, it's possible to create and shuffle **around 751 decks per second**.

    1 decks in 2 ms
    10 decks in 3 ms
    100 decks in 28 ms
    1000 decks in 133 ms
    10000 decks in 1328 ms
    50000 decks in 6656 ms

I have an linear execution time, approximatly **f(x) = 0.133x**

![executio time](/execution-time.png)

## API endpoints

Method | URL | Description |
-------|-----|-------------|
GET | /ping | Ping the API |
POST | /deck | Creates a new Deck |
GET | /deck | Returns all the decks |
GET | /deck/**:id** | Returns decks[id] |
PUT | /deck/**:id**/shuffle | Shuffles and returns decks[id] |
PUT | /deck/**:id**/deal | Deals and returns a decks[id] card |

## How to start the API

    $ npm start

**Please refer to the "Curl call" section.**

## How to build in local

    $ npm install && npm run webpack

## How to run tests

    $ npm test

## How to use the core

Please refer to the tests for a better comprehension.

```javascript
const deck = newDeck()
const shuffledDeck = u.shuffler()(deck)
u.compose(u.log, deckStr)(shuffledDeck)

const dealCard = u.shifter(shuffledDeck)
const dealAndLog = u.compose(u.log, attr('elem'), dealCard)
dealAndLog()
dealAndLog()
dealAndLog()
```

## Test report

There are 42 tests (unit && integration). 
This is the coverage report, please consider the fact that most of the uncovered lines are some very basic expressions (composition, recursive call etc...):

    $ node_modules/.bin/nyc report

File               |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
-------------------|----------|----------|----------|----------|-------------------|
All files          |    96.98 |    76.81 |    93.68 |    98.48 |                   |
src               |    96.09 |    74.07 |     90.2 |    98.77 |                   |
  core.js          |      100 |      100 |      100 |      100 |                   |
  utils.js         |    95.19 |    70.83 |    89.36 |    98.31 |                92 |
src/api           |       95 |      100 |       50 |      100 |                   |
  app.js           |       95 |      100 |       50 |      100 |                   |
src/api/deck      |    96.72 |    83.33 |      100 |    96.15 |                   |
  arrRepository.js |      100 |    83.33 |      100 |      100 |                16 |
  router.js        |    93.55 |    83.33 |      100 |    92.31 |             14,15 |
  service.js       |      100 |      100 |      100 |      100 |                   |
test              |      100 |      100 |      100 |      100 |                   |
  api.js           |      100 |      100 |      100 |      100 |                   |

## Curl call

Let's make some manual calls.

```bash
$ curl -XGET http://localhost:3000/ping 
pong
```

```bash
$ curl -XGET http://localhost:3000/deck 
[]
```

```bash
$ curl -XPOST http://localhost:3000/deck
{"id":0,"cards":[{"suit":0,"value":1,"code":"1f0a1","str":"🂡"},{"suit":0,"value":2,"code":"1f0a2","str":"🂢"},{"suit":0,"value":3,"code":"1f0a3","str":"🂣"},{"suit":0,"value":4,"code":"1f0a4","str":"🂤"},{"suit":0,"value":5,"code":"1f0a5","str":"🂥"},{"suit":0,"value":6,"code":"1f0a6","str":"🂦"},{"suit":0,"value":7,"code":"1f0a7","str":"🂧"},{"suit":0,"value":8,"code":"1f0a8","str":"🂨"},{"suit":0,"value":9,"code":"1f0a9","str":"🂩"},{"suit":0,"value":10,"code":"1f0aa","str":"🂪"},{"suit":0,"value":11,"code":"1f0ab","str":"🂫"},{"suit":0,"value":13,"code":"1f0ad","str":"🂭"},{"suit":0,"value":14,"code":"1f0ae","str":"🂮"},{"suit":1,"value":1,"code":"1f0b1","str":"🂱"},{"suit":1,"value":2,"code":"1f0b2","str":"🂲"},{"suit":1,"value":3,"code":"1f0b3","str":"🂳"},{"suit":1,"value":4,"code":"1f0b4","str":"🂴"},{"suit":1,"value":5,"code":"1f0b5","str":"🂵"},{"suit":1,"value":6,"code":"1f0b6","str":"🂶"},{"suit":1,"value":7,"code":"1f0b7","str":"🂷"},{"suit":1,"value":8,"code":"1f0b8","str":"🂸"},{"suit":1,"value":9,"code":"1f0b9","str":"🂹"},{"suit":1,"value":10,"code":"1f0ba","str":"🂺"},{"suit":1,"value":11,"code":"1f0bb","str":"🂻"},{"suit":1,"value":13,"code":"1f0bd","str":"🂽"},{"suit":1,"value":14,"code":"1f0be","str":"🂾"},{"suit":2,"value":1,"code":"1f0c1","str":"🃁"},{"suit":2,"value":2,"code":"1f0c2","str":"🃂"},{"suit":2,"value":3,"code":"1f0c3","str":"🃃"},{"suit":2,"value":4,"code":"1f0c4","str":"🃄"},{"suit":2,"value":5,"code":"1f0c5","str":"🃅"},{"suit":2,"value":6,"code":"1f0c6","str":"🃆"},{"suit":2,"value":7,"code":"1f0c7","str":"🃇"},{"suit":2,"value":8,"code":"1f0c8","str":"🃈"},{"suit":2,"value":9,"code":"1f0c9","str":"🃉"},{"suit":2,"value":10,"code":"1f0ca","str":"🃊"},{"suit":2,"value":11,"code":"1f0cb","str":"🃋"},{"suit":2,"value":13,"code":"1f0cd","str":"🃍"},{"suit":2,"value":14,"code":"1f0ce","str":"🃎"},{"suit":3,"value":1,"code":"1f0d1","str":"🃑"},{"suit":3,"value":2,"code":"1f0d2","str":"🃒"},{"suit":3,"value":3,"code":"1f0d3","str":"🃓"},{"suit":3,"value":4,"code":"1f0d4","str":"🃔"},{"suit":3,"value":5,"code":"1f0d5","str":"🃕"},{"suit":3,"value":6,"code":"1f0d6","str":"🃖"},{"suit":3,"value":7,"code":"1f0d7","str":"🃗"},{"suit":3,"value":8,"code":"1f0d8","str":"🃘"},{"suit":3,"value":9,"code":"1f0d9","str":"🃙"},{"suit":3,"value":10,"code":"1f0da","str":"🃚"},{"suit":3,"value":11,"code":"1f0db","str":"🃛"},{"suit":3,"value":13,"code":"1f0dd","str":"🃝"},{"suit":3,"value":14,"code":"1f0de","str":"🃞"}]}
```

Let's shuffle that deck:

```bash
$ curl -XPUT http://localhost:3000/deck/0/shuffle 
{"id":0,"cards":[{"suit":0,"value":1,"code":"1f0a1","str":"🂡"},{"suit":3,"value":3,"code":"1f0d3","str":"🃓"},{"suit":1,"value":7,"code":"1f0b7","str":"🂷"},{"suit":3,"value":14,"code":"1f0de","str":"🃞"},{"suit":0,"value":5,"code":"1f0a5","str":"🂥"},{"suit":1,"value":3,"code":"1f0b3","str":"🂳"},{"suit":0,"value":13,"code":"1f0ad","str":"🂭"},{"suit":3,"value":1,"code":"1f0d1","str":"🃑"},{"suit":2,"value":3,"code":"1f0c3","str":"🃃"},{"suit":2,"value":8,"code":"1f0c8","str":"🃈"},{"suit":2,"value":10,"code":"1f0ca","str":"🃊"},{"suit":3,"value":13,"code":"1f0dd","str":"🃝"},{"suit":0,"value":3,"code":"1f0a3","str":"🂣"},{"suit":3,"value":5,"code":"1f0d5","str":"🃕"},{"suit":3,"value":4,"code":"1f0d4","str":"🃔"},{"suit":3,"value":10,"code":"1f0da","str":"🃚"},{"suit":2,"value":2,"code":"1f0c2","str":"🃂"},{"suit":2,"value":5,"code":"1f0c5","str":"🃅"},{"suit":0,"value":9,"code":"1f0a9","str":"🂩"},{"suit":0,"value":4,"code":"1f0a4","str":"🂤"},{"suit":0,"value":2,"code":"1f0a2","str":"🂢"},{"suit":3,"value":6,"code":"1f0d6","str":"🃖"},{"suit":1,"value":9,"code":"1f0b9","str":"🂹"},{"suit":2,"value":4,"code":"1f0c4","str":"🃄"},{"suit":1,"value":6,"code":"1f0b6","str":"🂶"},{"suit":1,"value":11,"code":"1f0bb","str":"🂻"},{"suit":2,"value":14,"code":"1f0ce","str":"🃎"},{"suit":0,"value":14,"code":"1f0ae","str":"🂮"},{"suit":1,"value":1,"code":"1f0b1","str":"🂱"},{"suit":1,"value":8,"code":"1f0b8","str":"🂸"},{"suit":3,"value":7,"code":"1f0d7","str":"🃗"},{"suit":0,"value":10,"code":"1f0aa","str":"🂪"},{"suit":2,"value":11,"code":"1f0cb","str":"🃋"},{"suit":1,"value":10,"code":"1f0ba","str":"🂺"},{"suit":0,"value":8,"code":"1f0a8","str":"🂨"},{"suit":2,"value":7,"code":"1f0c7","str":"🃇"},{"suit":0,"value":11,"code":"1f0ab","str":"🂫"},{"suit":1,"value":13,"code":"1f0bd","str":"🂽"},{"suit":2,"value":9,"code":"1f0c9","str":"🃉"},{"suit":0,"value":6,"code":"1f0a6","str":"🂦"},{"suit":1,"value":5,"code":"1f0b5","str":"🂵"},{"suit":1,"value":2,"code":"1f0b2","str":"🂲"},{"suit":2,"value":6,"code":"1f0c6","str":"🃆"},{"suit":2,"value":13,"code":"1f0cd","str":"🃍"},{"suit":3,"value":11,"code":"1f0db","str":"🃛"},{"suit":3,"value":8,"code":"1f0d8","str":"🃘"},{"suit":3,"value":2,"code":"1f0d2","str":"🃒"},{"suit":1,"value":14,"code":"1f0be","str":"🂾"},{"suit":2,"value":1,"code":"1f0c1","str":"🃁"},{"suit":1,"value":4,"code":"1f0b4","str":"🂴"},{"suit":0,"value":7,"code":"1f0a7","str":"🂧"},{"suit":3,"value":9,"code":"1f0d9","str":"🃙"}]}
```

Let's deal some cards:

```bash
$ curl -XPUT http://localhost:3000/deck/0/deal 
{"suit":0,"value":1,"code":"1f0a1","str":"🂡"}
```

I repeat the deal step many times to check that there are less cards:

```bash
$ curl -XGET http://localhost:3000/deck/0 
{"id":0,"cards":[{"suit":0,"value":11,"code":"1f0ab","str":"🂫"},{"suit":1,"value":13,"code":"1f0bd","str":"🂽"},{"suit":2,"value":9,"code":"1f0c9","str":"🃉"},{"suit":0,"value":6,"code":"1f0a6","str":"🂦"},{"suit":1,"value":5,"code":"1f0b5","str":"🂵"},{"suit":1,"value":2,"code":"1f0b2","str":"🂲"},{"suit":2,"value":6,"code":"1f0c6","str":"🃆"},{"suit":2,"value":13,"code":"1f0cd","str":"🃍"},{"suit":3,"value":11,"code":"1f0db","str":"🃛"},{"suit":3,"value":8,"code":"1f0d8","str":"🃘"},{"suit":3,"value":2,"code":"1f0d2","str":"🃒"},{"suit":1,"value":14,"code":"1f0be","str":"🂾"},{"suit":2,"value":1,"code":"1f0c1","str":"🃁"},{"suit":1,"value":4,"code":"1f0b4","str":"🂴"},{"suit":0,"value":7,"code":"1f0a7","str":"🂧"},{"suit":3,"value":9,"code":"1f0d9","str":"🃙"}]}
```
