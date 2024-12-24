import { expect } from 'chai';
import merge from './merge.ts';

describe('Utils: merge', () => {
    it('должен объединять два простых объекта', () => {
        const objA = { a: 1, b: 2 };
        const objB = { b: 3, c: 4 };
        const result = merge(objA, objB);
        expect(result).to.eql({ a: 1, b: 3, c: 4 });
    });

    it('должен объединять вложенные объекты', () => {
        const objA = { a: { x: 1, y: 2 }, b: 2 };
        const objB = { a: { y: 3, z: 4 }, c: 4 };
        const result = merge(objA, objB);
        expect(result).to.eql({ a: { x: 1, y: 3, z: 4 }, b: 2, c: 4 });
    });

    it('должен учитывать различные типы значений', () => {
        const objA = { a: 1, b: { x: 1 } };
        const objB = { b: [2, 3], c: 4 };
        const result = merge(objA, objB);
        expect(result).to.eql({ a: 1, "b": {0: 2, 1: 3, x: 1}, c: 4 });
    });

    it('должен корректно обрабатывать null значения', () => {
        const objA = { a: null, b: 1 };
        const objB = { a: { x: 1 } };
        const result = merge(objA, objB);
        expect(result).to.eql({ a: { x: 1 }, b: 1 });
    });

    it('должен возвращать новый объект, не изменяя исходные', () => {
        const objA = { a: 1 };
        const objB = { b: 2 };
        const result = merge(objA, objB);
        expect(result).to.not.equal(objA);
        expect(result).to.not.equal(objB);
    });
});
