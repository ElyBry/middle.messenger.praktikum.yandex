import { expect } from 'chai';
import isEqual from './isEqual';

describe('Utils: isEqual', () => {
    it('должен возвращать true для одинаковых простых объектов', () => {
        const objA = { name: 'Alice', age: 30 };
        const objB = { name: 'Alice', age: 30 };
        expect(isEqual(objA, objB)).to.be.true;
    });

    it('должен возвращать false для объектов с разными свойствами', () => {
        const objA = { name: 'Alice', age: 30 };
        const objB = { name: 'Alice', age: 25 };
        expect(isEqual(objA, objB)).to.be.false;
    });

    it('должен возвращать false для объектов с разными количествами свойств', () => {
        const objA = { name: 'Alice', age: 30 };
        const objB = { name: 'Alice' };
        expect(isEqual(objA, objB)).to.be.false;
    });

    it('должен возвращать true для одинаковых вложенных объектов', () => {
        const objA = { user: { name: 'Alice', age: 30 } };
        const objB = { user: { name: 'Alice', age: 30 } };
        expect(isEqual(objA, objB)).to.be.true;
    });

    it('должен возвращать false для разных вложенных объектов', () => {
        const objA = { user: { name: 'Alice', age: 30 } };
        const objB = { user: { name: 'Bob', age: 30 } };
        expect(isEqual(objA, objB)).to.be.false;
    });

    it('должен возвращать false для объектов с разными типами значений', () => {
        const objA = { name: 'Alice', age: 30 };
        const objB = { name: 'Alice', age: '30' }; // Возраст как строка
        expect(isEqual(objA, objB)).to.be.false;
    });

    it('должен возвращать true для одинаковых массивов', () => {
        const objA = { items: [1, 2, 3] };
        const objB = { items: [1, 2, 3] };
        expect(isEqual(objA, objB)).to.be.true;
    });

    it('должен возвращать false для массивов с разными элементами', () => {
        const objA = { items: [1, 2, 3] };
        const objB = { items: [1, 2, 4] };
        expect(isEqual(objA, objB)).to.be.false;
    });

    it('должен корректно обрабатывать null', () => {
        const objA = { key: null };
        const objB = { key: null };
        expect(isEqual(objA, objB)).to.be.true;
    });

    it('должен возвращать false для null и не-null', () => {
        const objA = { key: null };
        const objB = { key: 0 }; // Разные значения
        expect(isEqual(objA, objB)).to.be.false;
    });
});
