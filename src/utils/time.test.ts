import { expect } from 'chai';
import formatTime from './time';

describe('Utils: time', () => {
    let currentDate: Date;

    beforeEach(() => {
        currentDate = new Date();
    });

    it('должен возвращать корректное время для сегодня в формате чата', () => {
        const dateString = currentDate.toISOString();
        const result = formatTime(dateString, true);
        const expected = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        expect(result).to.equal(expected);
    });

    it('должен возвращать корректную дату и время для сегодня в формате не-чата', () => {
        const dateString = currentDate.toISOString();
        const result = formatTime(dateString, false);
        const expected = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        expect(result).to.equal(expected);
    });

    it('должен возвращать корректный день недели для этой недели в формате чата', () => {
        const dateString = new Date(currentDate.setDate(currentDate.getDate() - 2)).toISOString();
        const result = formatTime(dateString, true);
        const expected = new Date(dateString).toLocaleDateString([], { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });
        expect(result).to.equal(expected);
    });

    it('должен возвращать корректный день недели для этой недели в формате не-чата', () => {
        const dateString = new Date(currentDate.setDate(currentDate.getDate() - 3)).toISOString();
        const result = formatTime(dateString, false);
        const expected = new Date(dateString).toLocaleDateString([], { day: 'numeric', month: 'long' });
        expect(result).to.equal(expected);
    });

    it('должен возвращать полную дату для прошлых дат, не входящих в эту неделю, в формате чата', () => {
        const dateString = new Date('2022-01-01').toISOString();
        const result = formatTime(dateString, true);
        const expected = new Date(dateString).toLocaleDateString([], { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });
        expect(result).to.equal(expected);
    });

    it('должен возвращать полную дату для прошлых дат, не входящих в эту неделю, в формате не-чата', () => {
        const dateString = new Date('2022-01-01').toISOString();
        const result = formatTime(dateString, false);
        const expected = new Date(dateString).toLocaleDateString([], { day: 'numeric', month: 'long' });
        expect(result).to.equal(expected);
    });

    it('должен возвращать корректное время для вчера в формате чата', () => {
        const dateString = new Date(currentDate.setDate(currentDate.getDate() - 1)).toISOString();
        const result = formatTime(dateString, true);
        const expected = new Date(dateString).toLocaleDateString([], { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });
        expect(result).to.equal(expected);
    });

    it('должен возвращать корректное время для вчера в формате не-чата', () => {
        const dateString = new Date(currentDate.setDate(currentDate.getDate() - 1)).toISOString();
        const result = formatTime(dateString, false);
        const expected = new Date(dateString).toLocaleDateString([], { weekday: 'long' });
        expect(result).to.equal(expected);
    });

    it('должен возвращать разные времена для разных дат в формате чата', () => {
        const dateString1 = new Date(currentDate.setDate(currentDate.getDate() - 2)).toISOString();
        const dateString2 = new Date(currentDate.setDate(currentDate.getDate() - 3)).toISOString();
        const result1 = formatTime(dateString1, true);
        const result2 = formatTime(dateString2, true);
        expect(result1).to.not.equal(result2);
    });

    it('должен возвращать разные времена для разных дат в формате не-чата', () => {
        const dateString1 = new Date(currentDate.setDate(currentDate.getDate() - 2)).toISOString();
        const dateString2 = new Date(currentDate.setDate(currentDate.getDate() - 3)).toISOString();
        const result1 = formatTime(dateString1, false);
        const result2 = formatTime(dateString2, false);
        expect(result1).to.not.equal(result2);
    });
});