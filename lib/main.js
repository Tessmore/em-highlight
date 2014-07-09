
var _ = require('lodash');

/**
    Look for terms in text and return the orinal text with terms enclosed in
    <em class='highlight'>$TERM</em>
*/

exports.find = function(text, lookup) {
    text   = " " + text + " ";
    lookup = _lookup(lookup);

    for (var i in lookup) {
        var pattern = new RegExp( "([\\s\)\>]" + lookup[i] + "[\\s\(\<])", "gim");

        text = text.replace(
            pattern,
            lookup[i].replace(lookup[i], " <em class='highlight'>$1</em> ")
        );
    }

    return text.trim();
};

/**
    Look for terms in text and return a snippet around the text of the finding

    N = snippet_length
*/
exports.snippets = function(text, lookup, N) {
    lookup = _lookup(lookup);

    var results = [];
    var copy    = _copy(text);

    if (typeof N === 'undefined')
        N = 64;

    lookup = lookup.map(function(str) { return str.toLowerCase(); });

    for (var i in lookup) {
        var index   = 0;
        var current = copy;

        // Find all matches
        while ((index = current.indexOf(" " + lookup[i] + " ")) > -1) {
            var start = index - N < 0 ? 0 : index - N;
            var end   = index + lookup[i].length + N > text.length ? text.length : index + lookup[i].length + N;

            results.push(this.find(text.slice(start, end), lookup));

            // Check for another match
            current = current.slice(index + lookup[i].length);
        }
    }

    return _.uniq(results);
}

function _lookup(lookup) {
    // In case it is a single word
    if (typeof lookup === 'string')
        return [lookup];

    return lookup.sort(function(a, b) {
            return b.length - a.length;
    });
}

// Include checking the first / last word
// Remove special characters
function _copy(str) {
    return " " + str.toLowerCase().replace(/[^\w\s_-]/g, ' ') + " ";
}