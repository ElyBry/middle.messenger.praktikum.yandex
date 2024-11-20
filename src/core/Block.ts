import EventBus from "./EventBus";
import Handlebars from "handlebars";
import { nanoid } from "nanoid";

interface Props {
    [key: string]: any;
}

interface Children {
    [key: string]: Block;
}

export default class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    } as const;

    private _element: HTMLElement | null = null;
    private _id = nanoid(6);
    props: Props;
    children: Children;
    name: string;
    eventBus;

    constructor(propsWithChildren: Props & { children?: Children} = {}) {
        const eventBus = new EventBus();
        const {props, children} = this._getChildrenAndProps(propsWithChildren);
        this.props = this._makePropsProxy({ ...props });
        this.children = children;
        this.name = ''

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);

        eventBus.emit(Block.EVENTS.INIT);
    }

    _addEvents() {
        const {events = {}} = this.props;

        Object.keys(events).forEach(eventName => {
            this._element!.addEventListener(eventName, events[eventName]);
        })
    }

    _registerEvents(eventBus: EventBus<any>) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _init() {
        this.init();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    init() {
    }

    _componentDidMount() {
        this.componentDidMount();

        Object.values(this.children).forEach(child => {
            child.dispatchComponentDidMount();
        });
    }

    componentDidMount() {}

    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidUpdate(oldProps: Props, newProps: Props) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    }

    componentDidUpdate(oldProps?: Props, newProps?: Props): boolean {
        return oldProps !== newProps;
    }

    _getChildrenAndProps(propsAndChildren: Props) {
        const children: Children = {};
        const props: Props = {};

        const processValue = (value: any, key: string) => {
            if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    if (item instanceof Block) {
                        children[`${key}_${index}`] = item;
                    } else {
                        props[`${key}_${index}`] = item;
                    }
                });
            } else if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        };

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            processValue(value, key);
        });

        return { children, props };
    }

    setProps = (nextProps: {}) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    private _render() {
        const propsAndStubs = { ...this.props };

        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id="${child._id}"></div>`
        });

        const fragment  = this._createDocumentElement('template') as HTMLTemplateElement;

        fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);
        const newElement = fragment.content.firstElementChild as HTMLElement;

        Object.values(this.children).forEach(child => {
            const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
            if (typeof child.getContent == 'function') {
                const childContent = child.getContent();
                stub?.replaceWith(childContent || '');
            } else {
                console.error(`Для ${child} getContent() не является функцией`);
            }
        });

        if (this._element) {
            this._element.replaceWith(newElement);
        }

        this._element = newElement;

        this._addEvents();
    }

    render() {}

    getContent(): HTMLElement | null {
        if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            setTimeout(() => {
                if (
                    this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
                ) {
                    this.dispatchComponentDidMount();
                }
            }, 100);
        }

        return this._element;
    }

    _makePropsProxy(props: Record<string, any>) {
        const self = this;

        return new Proxy(props, {
            get(target, prop: string) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target, prop: string, value) {
                const oldTarget = {...target}
                target[prop] = value;

                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error("Нет доступа");
            }
        });
    }

    _createDocumentElement(tagName: string) {
        return document.createElement(tagName);
    }

    show() {
        this.getContent()!.style.display = "block";
    }

    hide() {
        this.getContent()!.style.display = "none";
    }
}