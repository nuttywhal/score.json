const Accidental = require('../source/enum/accidental');
const Letter = require('../source/enum/letter');
const Pitch = require('../source/pitch');

describe('Pitch Tests', function() {

    it('default constructor parameter should return invalid pitch', function() {
        var pitch = Object.create(Pitch).init();
        expect(pitch.validate().valid).toBe(false);
    });

    it('construct a valid C4 pitch', function() {
        var pitch = Object.create(Pitch).init({
            letter: Letter.C,
            accidental: Accidental.NATURAL,
            octave: 4
        });
        expect(pitch.validate().valid).toBe(true);
    });

    it('construct a pitch with an invalid accidental property', function() {
        var pitch = Object.create(Pitch).init({
            letter: Letter.G,
            accidental: '#',
            octave: 6
        });
        expect(pitch.validate().valid).toBe(false);
    });

    it('G#9 should be out of range', function() {
        var pitch = Object.create(Pitch).init({
            letter: Letter.G,
            accidental: Accidental.SHARP,
            octave: 9
        });
        expect(pitch.validate().valid).toBe(false);
    });

    it('Ab-2 should be out of range', function() {
        var pitch = Object.create(Pitch).init({
            letter: Letter.A,
            accidental: Accidental.FLAT,
            octave: -2
        });
        expect(pitch.validate().valid).toBe(false);
    });

    it('the MIDI value of G##2 should be 45', function() {
        var pitch = Object.create(Pitch).init({
            letter: Letter.G,
            accidental: Accidental.DOUBLE_SHARP,
            octave: 2
        });
        expect(pitch.validate().valid).toBe(true);
        expect(pitch.midi()).toBe(45);
    });

    it('the MIDI value of C4 (middle C) should be 60', function() {
        var pitch = Object.create(Pitch).init({
            letter: Letter.C,
            accidental: Accidental.NATURAL,
            octave: 4
        });
        expect(pitch.validate().valid).toBe(true);
        expect(pitch.midi()).toBe(60);
    });

    it('serialize an F#3 pitch', function() {
        var fSharp3= {
            letter: Letter.C,
            accidental: Accidental.SHARP,
            octave: 3
        };
        var pitch = Object.create(Pitch).init(fSharp3);
        var serializedPitch = JSON.stringify(pitch.serialize());
        expect(serializedPitch).toBe(JSON.stringify(fSharp3));
    });

});