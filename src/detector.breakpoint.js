(function() {

	// Flag breakpoints at the token level
    compendium.detect.addDetector('t', function(token, index, sentence) {
        var raw = token.raw,
            pos = token.pos;

        if (pos === ',') {
            token.profile.breakpoint = true;
        }
    });
}());