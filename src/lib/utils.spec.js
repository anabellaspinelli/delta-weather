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
        expect(getHue(10, 10.2)).toEqual(100)
        expect(getHue(3, 5)).toEqual(360)
        expect(getHue(5, 4)).toEqual(200)
    })
})
