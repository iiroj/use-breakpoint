# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [3.0.1](https://github.com/iiroj/use-breakpoint/compare/v3.0.0...v3.0.1) (2022-01-07)


### Bug Fixes

* use explicit extensions in import paths ([185bc75](https://github.com/iiroj/use-breakpoint/commit/185bc75364605dfbbc43dbbb22f75f2e40c9b4cf))

## [3.0.0](https://github.com/iiroj/use-breakpoint/compare/v2.0.3...v3.0.0) (2021-11-27)


### ⚠ BREAKING CHANGES

* `use-breakpoint` is now a pure ESM module,
and might need transpilation (eg. with babel) when used in older
CommonJS-based projects.

### build

* use only TSC to build ESM distribution ([2f5e381](https://github.com/iiroj/use-breakpoint/commit/2f5e3814efcbc091dde7fec15da7113624a63bb4))

### [2.0.3](https://github.com/iiroj/use-breakpoint/compare/v2.0.2...v2.0.3) (2021-11-27)

### [2.0.2](https://github.com/iiroj/use-breakpoint/compare/v2.0.1...v2.0.2) (2021-08-30)


### Bug Fixes

* use useEffect without DOM to suppress unnecessary warning ([05311fd](https://github.com/iiroj/use-breakpoint/commit/05311fd816b6667ff4dcf41ae03facb7045e09ec))

### [2.0.1](https://github.com/iiroj/use-breakpoint/compare/v2.0.0...v2.0.1) (2021-05-27)


### Bug Fixes

* useLayoutEffect instead of useEffect ([#9](https://github.com/iiroj/use-breakpoint/issues/9)) ([e35d66e](https://github.com/iiroj/use-breakpoint/commit/e35d66eafaa041ef04522996e9e4fe354b1a59c1))

## [2.0.0](https://github.com/iiroj/use-breakpoint/compare/v1.1.7...v2.0.0) (2021-04-15)


### ⚠ BREAKING CHANGES

* Previously this hook returned `undefined`
when the default value was not set and the real breakpoint
couldn't be found (like during SSR).

Now it returns an object
`{ breakpoint: undefined, minWidth: undefined, maxWidth: undefined }`
to make isomorphic usage easier.

This might require changes to existing code.

### Features

* allow returning the real breakpoint instead of default on the first client render ([972c5bc](https://github.com/iiroj/use-breakpoint/commit/972c5bc903f9eda7679e45ba883c99e5b1767a89))
* directly return correct initial breakpoint when default not set ([2f25717](https://github.com/iiroj/use-breakpoint/commit/2f25717a88b04d9c54ab0521fff0b19173c03c6b))


### Bug Fixes

* always return an object for easier usage ([76b4e4a](https://github.com/iiroj/use-breakpoint/commit/76b4e4a657ee0319a91c1a5321eae99d8c194003))
* bump package-lock.json version ([f80b97c](https://github.com/iiroj/use-breakpoint/commit/f80b97ce3afafa06c301b95943f5e52e95ced7b7))
* correct typeof check in useDebugValue ([0c4114c](https://github.com/iiroj/use-breakpoint/commit/0c4114c4c3f0ca335b593890620315588182e75d))
* return null instead of undefined ([2136384](https://github.com/iiroj/use-breakpoint/commit/2136384dde683b856cbdb4dcba93eaf1127a0a98))
* return null instead of undefined maxWidth where appropriate ([f5d5543](https://github.com/iiroj/use-breakpoint/commit/f5d5543eb66465d0af5168e7ae0250a1b6d2fff2))
* returned maxWidth does not overlap next breakpoint's minWidth ([75c0d85](https://github.com/iiroj/use-breakpoint/commit/75c0d852cb1e96f13f8afc208269a9b26ac1d2ba))
* use matchMedia listener callback argument ([a01c890](https://github.com/iiroj/use-breakpoint/commit/a01c890257d03453bb325254a1fd96e4c538f1ff))

### [1.1.7](https://github.com/iiroj/use-breakpoint/compare/v1.1.6...v1.1.7) (2021-04-10)

### [1.1.6](https://github.com/iiroj/use-breakpoint/compare/v1.1.5...v1.1.6) (2021-02-19)

### [1.1.5](https://github.com/iiroj/use-breakpoint/compare/v1.1.4...v1.1.5) (2020-12-24)


### Bug Fixes

* **deps:** update dependencies ([2d50781](https://github.com/iiroj/use-breakpoint/commit/2d50781fd225f394326858d150f2915d0b6cadce))

### [1.1.4](https://github.com/iiroj/use-breakpoint/compare/v1.1.2...v1.1.4) (2020-10-26)


### Bug Fixes

* actually update the breakpoint ([5c6ae5c](https://github.com/iiroj/use-breakpoint/commit/5c6ae5ce1d4e449a8adfac00cd1109e250da74d6))
* **tsc:** work around tsc errors after update ([de6cfae](https://github.com/iiroj/use-breakpoint/commit/de6cfae89e68d12d127d8e5e1bc50ca5cbe0f8c3))
* no need to set useState setter as dependency ([80117f0](https://github.com/iiroj/use-breakpoint/commit/80117f071ed965f4238b3ad3f2c26fb7e8c3bb8d))

### [1.1.3](https://github.com/iiroj/use-breakpoint/compare/v1.1.2...v1.1.3) (2020-10-26)


### Bug Fixes

* **tsc:** work around tsc errors after update ([de6cfae](https://github.com/iiroj/use-breakpoint/commit/de6cfae89e68d12d127d8e5e1bc50ca5cbe0f8c3))
* no need to set useState setter as dependency ([80117f0](https://github.com/iiroj/use-breakpoint/commit/80117f071ed965f4238b3ad3f2c26fb7e8c3bb8d))

### [1.1.2](https://github.com/iiroj/use-breakpoint/compare/v1.1.1...v1.1.2) (2020-05-04)


### Bug Fixes

* do not use .mjs extension for module field ([995c2ca](https://github.com/iiroj/use-breakpoint/commit/995c2ca938a2d85968f24b100af90fa704086a54))
* replace tslint with eslint and fix errors ([5b9d1bf](https://github.com/iiroj/use-breakpoint/commit/5b9d1bfbeadec58fa0927af7be87dea02cf84372))
* unsubscribe from window.matchMedia when unmounting ([b0ce1b0](https://github.com/iiroj/use-breakpoint/commit/b0ce1b0ce79ce57a54064b8050e93b53d67c1a3d))
* update storybook config ([f71801b](https://github.com/iiroj/use-breakpoint/commit/f71801b8ca7e697186b021cbf8da88da02fba9ba))

### [1.1.1](https://github.com/iiroj/use-breakpoint/compare/v1.1.0...v1.1.1) (2020-03-14)

## [1.1.0](https://github.com/iiroj/use-breakpoint/compare/v1.0.31...v1.1.0) (2019-12-30)


### Features

* use mjs extension for esm module ([31bc908](https://github.com/iiroj/use-breakpoint/commit/31bc9080d9c2c34c3526fa5ae7322006f29bfd6c))

### [1.0.31](https://github.com/iiroj/use-breakpoint/compare/v1.0.30...v1.0.31) (2019-12-01)

### [1.0.30](https://github.com/iiroj/use-breakpoint/compare/v1.0.29...v1.0.30) (2019-10-26)

### [1.0.29](https://github.com/iiroj/use-breakpoint/compare/v1.0.28...v1.0.29) (2019-09-23)

### [1.0.28](https://github.com/iiroj/use-breakpoint/compare/v1.0.27...v1.0.28) (2019-09-23)

### [1.0.27](https://github.com/iiroj/use-breakpoint/compare/v1.0.26...v1.0.27) (2019-09-22)

### [1.0.26](https://github.com/iiroj/use-breakpoint/compare/v1.0.25...v1.0.26) (2019-09-22)

### [1.0.25](https://github.com/iiroj/use-breakpoint/compare/v1.0.24...v1.0.25) (2019-09-22)

### [1.0.24](https://github.com/iiroj/use-breakpoint/compare/v1.0.23...v1.0.24) (2019-09-22)

### [1.0.23](https://github.com/iiroj/use-breakpoint/compare/v1.0.22...v1.0.23) (2019-09-22)

### [1.0.22](https://github.com/iiroj/use-breakpoint/compare/v1.0.21...v1.0.22) (2019-09-22)

### [1.0.21](https://github.com/iiroj/use-breakpoint/compare/v1.0.20...v1.0.21) (2019-09-22)

### [1.0.20](https://github.com/iiroj/use-breakpoint/compare/v1.0.19...v1.0.20) (2019-09-22)


### Bug Fixes

* issues with typecheck ([289c12d](https://github.com/iiroj/use-breakpoint/commit/289c12d))

### [1.0.19](https://github.com/iiroj/use-breakpoint/compare/v1.0.18...v1.0.19) (2019-07-23)



### [1.0.18](https://github.com/iiroj/use-breakpoint/compare/v1.0.17...v1.0.18) (2019-07-11)



### [1.0.17](https://github.com/iiroj/use-breakpoint/compare/v1.0.16...v1.0.17) (2019-07-07)


### Build System

* add husky, commitlint and lint-staged ([263d94c](https://github.com/iiroj/use-breakpoint/commit/263d94c))



### [1.0.16](https://github.com/iiroj/use-breakpoint/compare/v1.0.15...v1.0.16) (2019-07-06)



### [1.0.15](https://github.com/iiroj/use-breakpoint/compare/v1.0.14...v1.0.15) (2019-06-02)



### [1.0.14](https://github.com/iiroj/use-breakpoint/compare/v1.0.13...v1.0.14) (2019-05-13)



## [1.0.13](https://github.com/iiroj/use-breakpoint/compare/v1.0.12...v1.0.13) (2019-04-28)



## [1.0.12](https://github.com/iiroj/use-breakpoint/compare/v1.0.11...v1.0.12) (2019-04-28)



## [1.0.11](https://github.com/iiroj/use-breakpoint/compare/v1.0.10...v1.0.11) (2019-04-17)



## [1.0.10](https://github.com/iiroj/use-breakpoint/compare/v1.0.9...v1.0.10) (2019-03-27)



## [1.0.9](https://github.com/iiroj/use-breakpoint/compare/v1.0.8...v1.0.9) (2019-03-17)



## [1.0.8](https://github.com/iiroj/use-breakpoint/compare/v1.0.7...v1.0.8) (2019-03-02)



# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.0.7](https://github.com/iiroj/use-breakpoint/compare/v1.0.6...v1.0.7) (2019-02-28)



# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.0.6](https://github.com/iiroj/use-breakpoint/compare/v1.0.5...v1.0.6) (2019-02-28)



# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.0.5](https://github.com/iiroj/use-breakpoint/compare/v1.0.4...v1.0.5) (2019-02-28)



# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.0.4](https://github.com/iiroj/use-breakpoint/compare/v1.0.3...v1.0.4) (2019-02-28)



# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.0.3](https://github.com/iiroj/use-breakpoint/compare/v1.0.2...v1.0.3) (2019-02-28)



# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.0.2](https://github.com/iiroj/use-breakpoint/compare/v1.0.1...v1.0.2) (2019-02-27)



# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.0.1](https://github.com/iiroj/use-breakpoint/compare/v1.0.0...v1.0.1) (2019-02-27)


### Bug Fixes

* **storybook:** resolve TypeScript files before JavaScript, install missing devDependency ([5cf9739](https://github.com/iiroj/use-breakpoint/commit/5cf9739))
* recreate media query listeners if config changes ([1c03a6a](https://github.com/iiroj/use-breakpoint/commit/1c03a6a))



# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

# 1.0.0 (2019-02-27)


### Features

* initial release ([a8ea4cf](https://github.com/iiroj/use-breakpoint/commit/a8ea4cf))
