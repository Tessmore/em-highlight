
exports.find = function(text, lookup) {
    // In case it is a single word
    if (typeof lookup === 'string') {
        lookup = [lookup];
    }

    for (var i in lookup) {
        var pattern = new RegExp( "(" + lookup[i] + ")", "gim");

        text = text.replace(
            pattern,
            lookup[i].replace(lookup[i], "<em class='highlight'>$1</em>")
        );
    }

    return text;
};