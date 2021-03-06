/*jshint node:true es5:true laxcomma:true laxbreak:true*/
(function () {
  "use strict";

  var assert = require('assert')
    , fs = require('fs')
    , Storage = require('dom-storage')
    , dbPath = './db.json'
    ;

  function runTest(storage) {
    assert.strictEqual(0, Object.keys(storage).length);
    assert.strictEqual(0, storage.length);

    // can't make assuptions about key positioning
    storage.setItem('a', 1);
    assert.strictEqual(storage.key(0), 'a');

    storage.setItem('b', '2');
    assert.strictEqual(storage.getItem('a'), '1');
    assert.strictEqual(storage.getItem('b'), '2');
    assert.strictEqual(storage.length, 2);

    assert.strictEqual(storage['c'], undefined);
    assert.strictEqual(storage.getItem('c'), null);

    storage.setItem('c');
    assert.strictEqual(storage.getItem('c'), "undefined");
    assert.strictEqual(storage.length, 3);

    storage.removeItem('c');
    assert.strictEqual(storage.getItem('c'), null);
    assert.strictEqual(storage.length, 2);

    storage.clear();
    assert.strictEqual(storage.getItem('a'), null);
    assert.strictEqual(storage.getItem('b'), null);
    assert.strictEqual(storage.length, 0);
  }

  function runAll() {
    var localStorage = new Storage(dbPath)
      , sessionStorage = new Storage()
      ;

    runTest(sessionStorage);
    runTest(localStorage);

    localStorage.setItem('a', 1);
    setTimeout(function () {
      assert.deepEqual({ a: 1 }, JSON.parse(fs.readFileSync(dbPath)));
      console.log('All tests passed');
    }, 100);
  }

  fs.unlink(dbPath, runAll);
}());
