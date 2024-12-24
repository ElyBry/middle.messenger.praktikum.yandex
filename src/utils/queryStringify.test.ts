import { expect } from 'chai';
import queryStringify from './queryStringify';

describe('Utils: queryStringify', () => {
    it('должен выбрасывать ошибку, если входные данные не объект', () => {
        // Игнорим, т.к типизация в queryStringify - object
        // @ts-ignore
        expect(() => queryStringify(null)).to.throw(Error, 'input must be an object');
        // @ts-ignore
        expect(() => queryStringify(123)).to.throw(Error, 'input must be an object');
        // @ts-ignore
        expect(() => queryStringify('string')).to.throw(Error, 'input must be an object');
    });

    it('должен корректно обрабатывать пустой объект', () => {
        expect(queryStringify({})).to.equal('');
    });

    it('должен преобразовывать простые пары ключ-значение в строку', () => {
        const result = queryStringify({ key: 'value' });
        expect(result).to.equal('key=value');
    });

    it('должен корректно обрабатывать вложенные объекты', () => {
        const result = queryStringify({ user: { name: 'John', age: 30 } });
        expect(result).to.equal('user[name]=John&user[age]=30');
    });

    it('должен корректно обрабатывать массивы', () => {
        const result = queryStringify({ items: ['apple', 'banana', 'cherry'] });
        expect(result).to.equal('items[0]=apple&items[1]=banana&items[2]=cherry');
    });

    it('должен обрабатывать сложные вложенные структуры', () => {
        const result = queryStringify({
            user: {
                name: 'Alice',
                hobbies: ['reading', 'traveling'],
            },
        });
        expect(result).to.equal('user[name]=Alice&user[hobbies][0]=reading&user[hobbies][1]=traveling');
    });

    it('должен корректно обрабатывать смешанные типы', () => {
        const result = queryStringify({
            user: { name: 'Bob', age: null },
            tags: ['developer', 'javascript']
        });
        expect(result).to.equal('user[name]=Bob&user[age]=null&tags[0]=developer&tags[1]=javascript');
    });

    it('должен обрабатывать сложные вложенные и массивы', () => {
        const result = queryStringify({
            articles: [
                { title: 'Article 1', content: 'First content' },
                { title: 'Article 2', content: 'Second content' }
            ]
        });
        expect(result).to.equal('articles[0][title]=Article 1&articles[0][content]=First content&articles[1][title]=Article 2&articles[1][content]=Second content');
    });

    it('должен обрабатывать данные с пустыми значениями', () => {
        const result = queryStringify({
            key1: '',
            key2: null,
            key3: undefined,
        });
        expect(result).to.equal('key1=&key2=null&key3=undefined');
    });

    it('должен работать с более глубокими уровнями вложенности', () => {
        const result = queryStringify({
            a: {
                b: {
                    c: {
                        d: 42
                    }
                },
                d: {
                    c: {
                        r: 53
                    }
                }
            }
        });
        expect(result).to.equal('a[b][c][d]=42&a[d][c][r]=53');
    });
});