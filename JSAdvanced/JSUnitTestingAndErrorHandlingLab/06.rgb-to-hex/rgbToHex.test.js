const rgbToHexColor = require('./rgbToHex');
const assert = require("chai").assert;

describe('check rgbToHexColor functionality', () => {

    it('return black to hex', () => {
        assert.equal('#000000',rgbToHexColor(0, 0, 0));
    });

    it('return white to hex', () => {
        assert.equal('#FFFFFF',rgbToHexColor(255, 255, 255));
    });

    it('return blue to hex', () => {
        assert.equal('#0000FF',rgbToHexColor(0, 0, 255));
    });

    it('negative input values return undefined', () => {
        assert.isUndefined(rgbToHexColor(-1,0,0))
    });

    it('negative input values return undefined', () => {
        assert.isUndefined(rgbToHexColor(0,-1,0))
    });

    it('negative input values return undefined', () => {
        assert.isUndefined(rgbToHexColor(0,0,-1))
    });

    it('greater than 255 input values return undefined', () => {
        assert.isUndefined(rgbToHexColor(256,0,0))
    });

    it('greater than 255 input values return undefined', () => {
        assert.isUndefined(rgbToHexColor(0,256,0))
    });

    it('greater than 255 input values return undefined', () => {
        assert.isUndefined(rgbToHexColor(0,0,256))
    });

    it('invalid type input values return undefined', () => {
        assert.isUndefined(rgbToHexColor('a',0,0))
    });
    
    it('invalid type input values return undefined', () => {
        assert.isUndefined(rgbToHexColor(0,'a',0))
    });
    
    it('invalid type input values return undefined', () => {
        assert.isUndefined(rgbToHexColor(0,0,'a'))
    });
});
