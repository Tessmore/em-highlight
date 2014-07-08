EM Highlight
=========

Looks for given words or expressions in a text and highlights them with
`<em class='highlight'></em>`

# Usage

```javascript
var highlight = require('em-highlight');

var text   = "We cannot rule this rule out on other rules and there is no stopping.";
var lookup = [
    "rule",
    "rule out"
];

var result = highlight.find(text, lookup);

// "We cannot <em class='highlight'>rule</em> this <em class='highlight'><em class='highlight'>rule</em> out</em> on other <em class='highlight'>rule</em>s and there is no stopping."
```

# Notes

* Allows case insensitive matching.
* Not extensively tested with very large texts.
* Nested lookup terms will be "double" highlighted. You could use css `opacity` to display this.