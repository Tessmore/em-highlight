
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
  lookup = lookup.sort(function(a, b) {
    return b.length - a.length;
  });

  text = " " + text + " ";
  var pattern = new RegExp("([ :;/,\\[\\(])(" + lookup.join('|') + ")([ -.,;%?!\\]\\)])", "gi");

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
  var sentences = sbd.sentences(text);
  var results   = [];

  for (var s in sentences) {
    var findings = this.find(sentences[s], lookup);

    // If highlights are found
    if (findings.length > sentences[s].length) {
      results.push(findings);
    }
  }

  return _.uniq(results);
}
