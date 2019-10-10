import { sum, sub, mult, div, modulo} from './operaciones.js'

test('sumar 1050 + 3 + 5 + 5 es igual a 1063', () => {
    expect(sum(sum(1050,3), sum(5,5))).toBe(1063);
})

test('restar 100 - 50 es igual a 50', () => {
    expect(sub(100,50)).toBe(50);
})

test('multiplicar 8 * 7 * 2 es igual a 112', () => {
    expect(mult(mult(8,7),2)).toBe(112);
})

test('dividir 75 * 2 / 2 es igual a 75', () => {
    expect(div(mult(75,2),2)).toBe(75);
})

test('7 * 3 % 10 es igual a 1', () => {
    expect(modulo(mult(7,3),10)).toBe(1);
})