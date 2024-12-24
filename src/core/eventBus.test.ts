import EventBus from "./EventBus";
import {expect} from "chai";

describe('EventBus', () => {
    let eventBus: any;

    beforeEach(() => {
        eventBus = new EventBus<string>();
    });

    it('должен добавлять слушателя события', () => {
        const callback = () => {};
        eventBus.on('testEvent', callback);
        expect(eventBus.listeners['testEvent']).to.include(callback);
    });

    it('должен удалять слушателя события', () => {
        const callback = () => {};
        eventBus.on('testEvent', callback);
        eventBus.off('testEvent', callback);
        expect(eventBus.listeners['testEvent']).to.not.include(callback);
    });

    it('должен выбрасывать ошибку при удалении несуществующего события', () => {
        const callback = () => {};
        expect(() => eventBus.off('nonexistentEvent', callback)).to.throw(Error, 'Нет события: nonexistentEvent');
    });

    it('должен вызывать слушателей при эмитировании события', () => {
        let called = false;
        const callback = () => { called = true; };
        eventBus.on('testEvent', callback);
        eventBus.emit('testEvent');
        expect(called).to.be.true;
    });

    it('должен передавать аргументы в слушателей', () => {
        const callback = (arg1: number, arg2: string) => {
            expect(arg1).to.equal(42);
            expect(arg2).to.equal('Hello');
        };
        eventBus.on('testEvent', callback);
        eventBus.emit('testEvent', 42, 'Hello');
    });
});