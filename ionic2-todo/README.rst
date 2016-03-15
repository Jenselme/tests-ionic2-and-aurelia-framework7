Requirements
============

- ionic2
- cordova
- typings


Setup
=====

- Install node dependencies: ``npm install``
- Install typings information: ``typings install``


Run in browser
==============

- Launch ``ionic serve`` to serve the application in a browser. It supports live
  reload. To rebuild the files when they are modified, launch in another
  terminal ``gulp watch``.


Run in emulator
===============

- Add platform: ``ionic platform add android``
- Launch ``ionic run android``
- Build for phone: ``ionic build android``
