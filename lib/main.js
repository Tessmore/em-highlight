
var _   = require('lodash');
var sbd = require('sbd');

/**
    Look for terms in text and return the orinal text with terms enclosed in
    <em class='highlight'>$TERM</em>
*/

exports.find = function(text, lookup) {
  // In case it is a single word
  if (typeof lookup === 'string') {
    lookup = [lookup];
  }

  // Make this the new lookup array
  // Longest matches first
  lookup = lookup.sort(function(a, b) {
    return b.length - a.length;
  });

  // Escape strings for regex
  lookup = lookup.map(function(str) {
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  });

  text = " " + text + " ";
  var pattern = new RegExp("(\\b)(" + lookup.join('|') + ")(\\b)", "gi");

  text = text.replace(
    pattern,
    "$1<em class='highlight'>$2</em>$3"
  );

  return text.trim();
};

/**
    Look for terms in text and return a snippet around the text of the finding
*/
exports.snippets = function(text, lookup) {
  // Add boundaries, so for-loop can skip if statements for prev/next
  var sentences = [""].concat(sbd.sentences(text), [""]);
  var results = [];

  for (var i=0, N=sentences.length; i<N; i++) {
    var findings = this.find(sentences[i], lookup);

    // If highlights are found
    if (findings.length > sentences[i].length) {

      var prev = sentences[i-1];
      var next = sentences[i+1];

      results.push(prev + findings + next);
    }
  }

  return _.uniq(results);
}
