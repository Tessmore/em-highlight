
var _   = require('lodash');
var sbd = require('sbd');

/**
    Look for terms in text and return the orinal text with terms enclosed in
    <em class='highlight'>$TERM</em>
*/

exports.find = function(text, lookup) {
  // In case it is a single word
  if (typeof lookup === 'string') {
    var newLookup = lookup
      .trim()
      .toLowerCase()
      .replace( /\s+/g, ' ')
      .split(' ');

    // Add original
    newLookup.push(lookup);

    // Make this the new lookup array
    lookup = newLookup.sort(function(a, b) {
      return b.length - a.length;
    });
  }

  text = " " + text + " ";
  var pattern = new RegExp("(" + lookup.join('|') + ")", "gim");

  text = text.replace(
    pattern,
    "<em class='highlight'>$1</em>"
  );

  return text.trim();
};

/**
    Look for terms in text and return a snippet around the text of the finding
*/
exports.snippets = function(text, lookup) {
  var sentences = sbd.sentences(text);
  var results   = [];

  for (var s in sentences) {
    var copy     = _copy(sentences[s]);
    var findings = this.find(copy, lookup);

    // If highlights are found
    if (findings.length > copy.length) {
      results.push(findings);
    }
  }

  return _.uniq(results);
}

// Include checking the first / last word
// Remove special characters
function _copy(str) {
    return " " + str.toLowerCase() + " ";
}