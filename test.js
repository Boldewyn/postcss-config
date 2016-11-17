import test from 'ava';

import postcss from 'postcss';
var imp = require('postcss-import');

var plugin = require('./');


test('simple', t => {
  var data = postcss([ plugin() ]).process('foo:bar;qux:baz');
  t.same(data.root.config, {foo:'bar',qux:'baz'});
});

test('selector', t => {
  var data = postcss([ plugin() ]).process('a{foo:bar}');
  t.same(data.root.config, {a:{foo:'bar'}});
});

test('ignore comment', t => {
  var data = postcss([ plugin() ]).process('/* hello */ foo : bar /* world */');
  t.same(data.root.config, {foo:'bar'});
});

test('remove quotes', t => {
  var data = postcss([ plugin() ]).process('foo: "bar"; qux: \'baz\';');
  t.same(data.root.config, {foo:'bar',qux:'baz'});
});

test('respect :root', t => {
  var data = postcss([ plugin() ]).process('foo:bar;:root{foo:baz}');
  t.same(data.root.config, {foo:'baz'});
});

test('support multi-config', t => {
  var data = postcss([ plugin() ]).process('a,b{foo:bar}');
  t.same(data.root.config, {a:{foo:'bar'},b:{foo:'bar'}});
});

test('retain newlines', t => {
  var data = postcss([ plugin() ]).process('a{foo:bar \n baz}');
  t.same(data.root.config, {a:{foo:'bar \n baz'}});
  data = postcss([ plugin() ]).process('foo: \n bar');
  t.same(data.root.config, {foo:'bar'});
  data = postcss([ plugin() ]).process('foo:" \n bar"');
  t.same(data.root.config, {foo:' \n bar'});
});
