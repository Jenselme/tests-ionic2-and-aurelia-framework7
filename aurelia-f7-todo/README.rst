Requiremts
==========

- cordova
- webpack
- webpack-dev-server


Setup
=====

- Install node dependencies: ``npm install``


Run in browser
==============

- Launch ``npm run dev`` to launch the webpack debug server (with live reload).


Build for android
=================

- Add platform: ``cordova platform add browser``
- Add platform: ``cordova platform add android``
- Run on browser (with cordova for debug): ``cardova run browser``
- Build for phone: ``cordova build android``
