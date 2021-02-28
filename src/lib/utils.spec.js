import { getDelta, getHue } from './utils'

describe('getDelta', () => {
    test('returns the delta between provided numbers', () => {
        expect(getDelta(2, 3)).toEqual(1)
        expect(getDelta(3, 2)).toEqual(-1)
        expect(getDelta(1, 1.2)).toEqual(0)
    })
})

describe('getHue', () => {
    test('returns the correct hue for the provided number', () => {
        expect(getHue(true, true)).toEqual(100)
        expect(getHue(false, true)).toEqual(360)
        expect(getHue(true, false)).toEqual(200)
    })
})
