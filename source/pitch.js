const Accidental = require('./enum/accidental');
const Letter = require('./enum/letter');

var Pitch = {
    init: function({ letter = undefined,
                     accidental = undefined,
                     octave = undefined } = {}) {
        this.letter = letter;
        this.accidental = accidental;
        this.octave = octave;
        return this;
    },

    midi: function() {
        const octave = (this.octave + 1) * 12;
        return octave + this.letter + this.accidental;
    },

    serialize: function() {
        return {
            letter: this.letter,
            accidental: this.accidental,
            octave: this.octave
        };
    },

    validate: function(object = this) {
        if (!(Object.values(Letter).includes(object.letter))) {
            return {
                valid: false,
                error: `invalid 'letter' property (${object.letter})`
            };
        }

        if (!(Object.values(Accidental).includes(object.accidental))) {
            return {
                valid: false,
                error: `invalid 'accidental' property (${object.accidental})`
            };
        }

        if (object.octave < -1 || object.octave > 9) {
            return {
                valid: false,
                error: `invalid 'octave' propert (${object.octave})`
            }
        }

        if (object.midi() < 0 || object.midi() > 127) {
            return {
                valid: false,
                error: `pitch is out of range: ${object.midi()}`
            };
        }
        
        return { valid: true };
    }
};

module.exports = Pitch;