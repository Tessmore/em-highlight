/*jshint node:true, laxcomma:true */
/*global describe:true, it:true */
"use strict";

var assert    = require('assert');
var highlight = require('../lib/main');

describe('Snippets', function () {
    describe('Find no snippet', function () {
        var lookup = [
            "that person"
        ];

        var text   = "The sentence should include this and there is an island over there with that man and a tree";
        var result = highlight.snippets(text, lookup);

        it('Should not find', function () {
            assert.equal(result.length, 0);
        });
    });

    describe('Find single snippet', function () {
        var lookup = [
            "that man"
        ];

        var text   = "The sentence should include this and there is an island over there with that man and a tree";
        var result = highlight.snippets(text, lookup);

        it('Should find', function () {
            assert.equal(result.length, 1);
        });
    });

    describe('Find multiple snippets', function () {
        var lookup = [
            "that man",
            "over there",
            "a tree"
        ];

        var text   = "The sentence has that man included in this sentence. An island over there with a tree";
        var result = highlight.snippets(text, lookup);

        it('Should find', function () {
            assert.equal(result.length, 2);
        });
    });

    describe('Find multiple similar snippets', function () {
        var lookup = "rule";
        var text   = "The rules show that a rule can rule out any rule of order.";
        var result = highlight.snippets(text, lookup);

        it('Should find', function () {
            assert.equal(result.length, 1);
        });
    });

    describe('Find multiple similar snippets', function () {
        var lookup = ["rule", "rule out"];
        var text   = "The people rule out that a rule can rule out any rule of order.";
        var result = highlight.snippets(text, lookup);

        it('Should find', function () {
            assert.equal(result.length, 1);
        });
    });
});