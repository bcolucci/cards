'use strict'

import { createHash } from 'crypto'

// some aliases
/* istanbul ignore next */
export const log = console.log.bind(console)
/* istanbul ignore next */
export const codeStr = String.fromCodePoint.bind(String)
/* istanbul ignore next */
export const trunc = Math.trunc.bind(Math)

/* istanbul ignore next */
export const randInt = max => Math.floor(Math.random() * max)

/* istanbul ignore next */
export const randIntGen = max => () => randInt(max)

// some little functional shortcuts
export const fixed = value => () => value
export const attr = name => obj => obj[name]
export const map = fn => arr => arr.map(fn)
export const filter = fn => arr => arr.filter(fn)
export const join = char => arr => arr.join(char)
export const keys = obj => Object.keys(obj)
export const len = arr => arr.length
export const first = arr => arr[0]
export const tail = arr => arr.slice(1)
export const pick = arr => idx => arr[idx]
export const toHex = num => num.toString(16)
export const toInt = base => str => parseInt(str, base)
export const is = expected => value => value === expected
export const add = n => x => x + n
export const prefix = p => str => join('')([p, str])
export const append = (arr, v) => [...arr, v]
export const apply = fn => (...args) => fn(...args)

export const hexToInt = toInt(16)

// returns a composition function
export const compose = (...fns) =>
  (...initial) =>
    first(fns.reduceRight((result, fn) => [fn(...result)], initial))

// returns a function that negates fn
export const negate = fn => (...args) => !(apply(fn)(...args))

export const isNot = compose(negate, is)

// returns a function that randomly permut two values into the array
// does not alterate the initial array
export const randPermutor = (initialArr, forceOne = true) => {
  const randIdx = randIntGen(len(initialArr))
  return function permut(arr = initialArr) {
    const [i, j] = [randIdx(), randIdx()]
    if (i === j && forceOne) {
      return permut(arr)
    }
    const tmp = arr[i]
    const perm = [...arr]
    perm[i] = perm[j]
    perm[j] = tmp
    return perm
  }
}

// returns a function that shuffles an array by making permutations
// does not alterate the initial array
export const shuffler = (nbPermutations = null, forcePermut = true) => arr => {
  const enough = is(nbPermutations || arr.length * 2)
  const permut = randPermutor(arr, forcePermut)
  const recur = (shuffled = []) =>
    (perms = 0) => enough(perms) ? shuffled : recur(permut(shuffled))(add(1)(perms))
  return recur([...arr])()
}

// returns a function that shift a value from an array
// does not alterate the initial array
export const shifter = arr => {
  let rest = [...arr]
  const next = () => {
    const elem = first(rest)
    rest = tail(rest)
    return { elem, rest: [...rest] }
  }
  return () => rest.length ? next()
    : { elem: null, rest: [] }
}

// returns a simple hasher
export const hasher = (algo = 'md5', format = 'hex') =>
  data => createHash(algo).update(data).digest(format)

// optimizes execution time for functions
// with only one parameter (ariety)
// I've made the choice to not memoize by default all basic functions
// I leave the choice to the developer
export const memoize = fn => {
  const mem = {}
  const hash = hasher()
  const keyOf = arg => typeof arg !== 'object' ? arg
    : hash(JSON.stringify(arg))
  return arg => {
    const key = keyOf(arg)
    if (!mem[key]) {
      mem[key] = fn(arg)
    }
    return mem[key]
  }
}
