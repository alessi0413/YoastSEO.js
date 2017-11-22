var getWords = require( "../../stringProcessing/getWords.js" );

var regexFunction = require( "../../researches/passivevoice/matchParticiples" )();
var regularParticiples = regexFunction.regularParticiples;
var irregularParticiples = regexFunction.irregularParticiples;

var EnglishParticiple = require( "../english/EnglishParticiple.js" );
var FrenchParticiple = require( "../french/FrenchParticiple.js" );

var forEach = require( "lodash/forEach" );

/**
 * Creates participle objects for the participles found in a sentence part.
 *
 * @param {string} sentencePartText The sentence part to find participles in.
 * @param {array} auxiliaries The list of auxiliaries from the sentence part.
 * @param {string} language The language to find the participles for.
 * @returns {Array} The list with participle objects.
 */
module.exports = function( sentencePartText, auxiliaries, language ) {
	var words = getWords( sentencePartText );
	var foundParticiples = [];

	forEach( words, function( word ) {
		var type = "";
		if( regularParticiples( word, language ).length !== 0 ) {
			type = "regular";
		}
		if( irregularParticiples( word, language ).length !== 0 ) {
			type = "irregular";
		}
		if ( type !== "" ) {
			switch ( language ) {
				case "fr":
					foundParticiples.push( new FrenchParticiple( word, sentencePartText,
						{ auxiliaries: auxiliaries, type: type } ) );
					break;
				case "en":
				default:
					foundParticiples.push( new EnglishParticiple( word, sentencePartText,
						{ auxiliaries: auxiliaries, type: type } ) );
					break;
			}
		}
	} );
	return foundParticiples;
};
