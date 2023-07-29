# HEXN

A CLI tool to mess with bytes. Powered by React and Typescript.

## Install

```bash
$ npm install --global hexn
$ yarn global add hexn
```

## CLI

```
$ hexn --help

  Usage
    $ hexn

  Options
    --file  File to edit

  Examples
    $ hexn --file=./example.bin
```

## Changelog

### 0.3.0
- Added error handling (currently just on save)
- Buffer management changes to improve performance
### 0.4.0
- Adds search functionality
- Highlights ascii character corresponding to cursor
### 0.5.0
- Theme can now be selected in a more intuitive way
