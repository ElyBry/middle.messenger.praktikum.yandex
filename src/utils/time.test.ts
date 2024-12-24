import { expect } from 'chai';
import formatTime from './time';

describe('Utils: time', () => {

    it('должна вернуть время, когда дата совпадает с сегодняшним днем', () => {
        const dateString = new Date().toISOString();
        const result = formatTime(dateString, true);
        const expected = new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        expect(result).to.equal(expected);
    });

    it('должна вернуть дату в формате "день месяц год", если дата раньше начала недели', () => {
        const pastDateString = new Date(new Date().setDate(new Date().getDate() - 8)).toISOString();
        const result = formatTime(pastDateString);
        const expected = new Date(pastDateString).toLocaleDateString([], { day: 'numeric', month: 'long', year: 'numeric' });

        expect(result).to.equal(expected);
    });

    it('должна вернуть день недели, если дата в текущей неделе и не сегодня', () => {
        const weekDateString = new Date(new Date().setDate(new Date().getDate() - 2)).toISOString();
        const result = formatTime(weekDateString);
        const expected = new Date(weekDateString).toLocaleDateString([], { weekday: 'long' });

        expect(result).to.equal(expected);
    });

    it('должна вернуть дату и время, если дата в текущей неделе и сегодня не является текущей датой (isChat = true)', () => {
        const weekDateString = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString();
        const result = formatTime(weekDateString, true);
        const expected = new Date(weekDateString).toLocaleDateString([], { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });

        expect(result).to.equal(expected);
    });

    it('должна вернуть дату в формате "день месяц", если дата в предыдущей неделе и не сегодня', () => {
        const pastWeekDateString = new Date(new Date().setDate(new Date().getDate() - 10)).toISOString();
        const result = formatTime(pastWeekDateString);
        const expected = new Date(pastWeekDateString).toLocaleDateString([], { day: 'numeric', month: 'long', year: 'numeric' });

        expect(result).to.equal(expected);
    });
});
