import { expect } from 'chai';
import addMessage from './addMessage.ts';
import { MessageResponse } from '../api/type.ts';

describe('Тесты функции addMessage', () => {

    it('должен добавлять одно новое сообщение в пустой массив', () => {
        const messages: Array<MessageResponse> = [];
        const newMessage: MessageResponse = { chat_id: 1, content: 'Hello', file: null, id: 1, is_read: false, time: '2023-10-10T10:00:00Z', type: 'text', user_id: 1 };
        const result = addMessage(messages, newMessage);
        expect(result).to.eql([newMessage]);
    });

    it('должен добавлять одно новое сообщение в существующий массив', () => {
        const messages: Array<MessageResponse> = [
            { chat_id: 1, content: 'World', file: null, id: 2, is_read: false, time: '2023-10-10T10:01:00Z', type: 'text', user_id: 2 },
        ];
        const newMessage: MessageResponse = { chat_id: 1, content: 'Hello', file: null, id: 1, is_read: false, time: '2023-10-10T10:00:00Z', type: 'text', user_id: 1 };
        const result = addMessage(messages, newMessage);
        expect(result).to.eql([newMessage, ...messages]);
    });

    it('должен добавлять несколько сообщений', () => {
        const messages: Array<MessageResponse> = [
            { chat_id: 1, content: 'World', file: null, id: 2, is_read: false, time: '2023-10-10T10:01:00Z', type: 'text', user_id: 2 },
            { chat_id: 2, content: 'Foo', file: null, id: 3, is_read: false, time: '2023-10-10T10:02:00Z', type: 'text', user_id: 3 },
        ];
        const newMessage: MessageResponse = { chat_id: 1, content: 'Hello', file: null, id: 1, is_read: false, time: '2023-10-10T10:00:00Z', type: 'text', user_id: 1 };
        const result = addMessage(messages, newMessage);
        expect(result).to.eql([newMessage, ...messages]);
    });

    it('должен сохранять порядок сообщений при добавлении', () => {
        const messages: Array<MessageResponse> = [
            { chat_id: 1, content: 'World', file: null, id: 2, is_read: false, time: '2023-10-10T10:01:00Z', type: 'text', user_id: 2 },
            { chat_id: 2, content: 'Foo', file: null, id: 3, is_read: false, time: '2023-10-10T10:02:00Z', type: 'text', user_id: 3 },
        ];
        const newMessage: MessageResponse = { chat_id: 1, content: 'Hello', file: null, id: 1, is_read: false, time: '2023-10-10T10:00:00Z', type: 'text', user_id: 1 };
        const result = addMessage(messages, newMessage);
        expect(result[0]).to.equal(newMessage);
        expect(result[1]).to.equal(messages[0]);
        expect(result[2]).to.equal(messages[1]);
    });

    it('должен обрабатывать сообщение с пустым содержимым', () => {
        const messages: Array<MessageResponse> = [];
        const newMessage: MessageResponse = { chat_id: 1, content: '', file: null, id: 1, is_read: false, time: '2023-10-10T10:00:00Z', type: 'text', user_id: 1 };
        const result = addMessage(messages, newMessage);
        expect(result).to.eql([newMessage]);
    });

    it('должен возвращать новый массив и не изменять исходные', () => {
        const messages: Array<MessageResponse> = [
            { chat_id: 1, content: 'World', file: null, id: 2, is_read: false, time: '2023-10-10T10:01:00Z', type: 'text', user_id: 2 },
        ];
        const newMessage: MessageResponse = { chat_id: 1, content: 'Hello', file: null, id: 1, is_read: false, time: '2023-10-10T10:00:00Z', type: 'text', user_id: 1 };
        const result = addMessage(messages, newMessage);
        expect(result).to.not.equal(messages);
        expect(result.length).to.equal(messages.length + 1);
    });
});
