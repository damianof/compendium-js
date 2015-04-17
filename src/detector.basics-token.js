(function() {

    var cpd = compendium.compendium,
        lex = compendium.lexicon;

    // This detector runs on each token
    // and set basic properties (acronyms...)
    compendium.detect.addDetector('t', function(token, index, sentence) {
        var raw = token.raw,
            lc,
            l,
            i;


        // raw can be string or number
        if (typeof raw === 'string') {
            lc = raw.toLowerCase();
            l = lc.length;
         
            // Test abbreviation
            if (l > 1 && raw.indexOf('.') === l - 1 && (i = cpd.abbrs.indexOf(lc.slice(0, l - 1))) > -1) {
                token.is_abbr = true;
                token.norm = cpd.abbrs_rplt[i];
            // Test acronym
            } else if (raw.match(/^([a-z]{1}\.)+/gi)) {
                token.is_acronym = true;
            }
        }

        // Sentiment score
        if (lex.hasOwnProperty(token.norm)) {
            i = lex[token.norm];
            if (!i.condition || token.pos === i.condition) {
                token.sentiment = i.sentiment;
            }
        }
    });
}());