import Block from "./Block.ts";
import {expect} from "chai";
import sinon from 'sinon';
import {InputElement} from "../components";

describe("Block", () => {
    let PageComponent: any;
    beforeEach(() => {
        class Page extends Block {
            constructor(props: any) {
                super({
                    ...props,
                    InputTest: new InputElement({
                        name: "Test",
                    })
                });
            }
            render() {
                return `
                    <div>
                        <span id="test-text">{{text}}</span>
                        {{{ InputTest }}}
                    </div>
                `
            }
        }
        PageComponent = Page;
    })
    it('Должен создать компонент с состоянием из конструктора', () => {
        const text = 'Hello World';
        const pageComponent = new PageComponent({text});

        const spanText = pageComponent.element.querySelector('#test-text')?.innerHTML;
        expect(spanText).to.be.eq(text);
    });

    it('Должен изменить props для дочерних элементов', () => {
        const pageComponent = new PageComponent() as Block;
        const testValue = "Test value";
        const Input = pageComponent.children.InputTest as Block;
        pageComponent.setPropsForChildren(Input, {value: testValue});

        const factValue = Input.props.value;
        expect(factValue).to.be.eq(testValue);
    });

    it('Должен взять value из Input(getValue)', () => {
        const pageComponent = new PageComponent() as Block;
        const testValue = "Test value";
        const Input = pageComponent.children.InputTest as Block;
        pageComponent.setPropsForChildren(Input.children.Input, {value: testValue});

        const factValue = Input.getValue();
        expect(factValue).to.be.eq(testValue);
    });

    it('Должен поменять props, без рендера(setValue)', () => {
        const pageComponent = new PageComponent() as Block;
        const testValue = "Test value";
        const Input = pageComponent.children.InputTest as Block;
        Input.setValue(testValue);

        const factValue = Input.getValue();
        expect(factValue).to.be.eq(testValue);
    });

    it('Компонент должен иметь реактивное повдение', () => {
        const newValue = 'New value';

        const pageComponent = new PageComponent({text: "Hello"});

        pageComponent.setProps({text: newValue})
        const spanText = pageComponent.element?.querySelector('#test-text')?.innerHTML;

        expect(spanText).to.be.eq(newValue);
    });

    it('Компонент должен установить события на элемент', () => {
        const clickHandlerStub = sinon.stub();
        const pageComponent = new PageComponent({
            events: {
                click: clickHandlerStub
            }
        });

        const event = new MouseEvent('click');
        pageComponent.element?.dispatchEvent(event);

        expect(clickHandlerStub.calledOnce).to.be.true;
    });

    it('Компонент должен вызвать dispatchComponentDidMount метод', () => {
        const clock = sinon.useFakeTimers();
        const pageComponent = new PageComponent();

        const spyCDM = sinon.spy(pageComponent, 'componentDidMount');
        pageComponent.getContent();
        clock.next();

        setTimeout(() => {
            expect(spyCDM.calledOnce).to.be.true;
            spyCDM.restore();
        }, 0);
    });
})