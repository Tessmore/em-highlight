/*jshint node:true, laxcomma:true */
/*global describe:true, it:true */
"use strict";

var assert    = require('assert');
var highlight = require('../lib/main');

describe('Dont find the word', function () {
    describe('Empty lookup', function () {
        var lookup = "";
        var text   = "Hello this is my first rule.";
        var result = highlight.find(text, lookup);

        it('Should not find anything to highlight', function () {
            assert.equal(text, "Hello this is my first rule.");
        });
    });

    describe('Empty text', function () {
        var lookup = "rule";
        var text   = "";
        var result = highlight.find(text, lookup);

        it('Should not find anything to highlight', function () {
            assert.equal(text, "");
        });
    });

    describe('One sentence', function () {
        var lookup = "sentence";
        var text   = "Hello this is my first rule.";
        var result = highlight.find(text, lookup);

        it('Should not find anything to highlight', function () {
            assert.equal(result, "Hello this is my first rule.");
        });
    });
});

describe('Find single word', function () {
    describe('Only one sentence', function () {
        var lookup = "sentence";
        var text   = "sentence";
        var result = highlight.find(text, lookup);

        it('Should find', function () {
            assert.equal(result, "<em class='highlight'> sentence </em>");
        });
    });

    describe('Case insensitive in lookup', function () {
        var lookup = "Sentence";
        var text   = "sentence";
        var result = highlight.find(text, lookup);

        it('Should find', function () {
            assert.equal(result, "<em class='highlight'> sentence </em>");
        });
    });

    describe('Case insensitive in text', function () {
        var lookup = "sentence";
        var text   = "Sentence";
        var result = highlight.find(text, lookup);

        it('Should find', function () {
            assert.equal(result, "<em class='highlight'> Sentence </em>");
        });
    });

    describe('Multiple occurences', function () {
        var lookup = "rule";
        var text   = "We cannot rule this rule out on other rules and there is no stopping.";
        var result = highlight.find(text, lookup);

        it('Should find', function () {
            assert.equal(result, "We cannot <em class='highlight'> rule </em> this <em class='highlight'> rule </em> out on other rules and there is no stopping.");
        });
    });

});

describe('Find multiple words', function () {
    describe('Sentences with code words', function () {
        var lookup = [
            "this",
            "that"
        ];

        var text   = "The sentence should include this and there is an island over there with that man and a tree";
        var result = highlight.find(text, lookup);

        it('Should find', function () {
            assert.equal(result, "The sentence should include <em class='highlight'> this </em> and there is an island over there with <em class='highlight'> that </em> man and a tree");
        });
    });
});

describe('Find expressions', function () {
    describe('Sentences', function () {
        var lookup = [
            "there is an island",
            "that man"
        ];

        var text   = "The sentence should include this and there is an island over there with that man and a tree";
        var result = highlight.find(text, lookup);

        it('Should find', function () {
            assert.equal(result, "The sentence should include this and <em class='highlight'> there is an island </em> over there with <em class='highlight'> that man </em> and a tree");
        });
    });

    describe('Sentences with sub-expressions', function () {
        var lookup = [
            "there is",
            "an island",
            "there is an island"
        ];

        var text   = "The sentence should include this and there is an island over there with that man and a tree";
        var result = highlight.find(text, lookup);

        console.log(result);

        it('Should find', function () {
            assert.equal(result, "The sentence should include this and <em class='highlight'> <em class='highlight'> there is </em> <em class='highlight'> an island </em> </em> over there with that man and a tree");
        });
    });

});
