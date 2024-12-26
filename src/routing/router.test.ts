import { expect } from 'chai';
import Router, {RouteBlock} from './Router';
import Block from '../core/Block';
import sinon from "sinon";
import {withRouter} from "./WithRouter.ts";

describe('Router', () => {
    let router: Router;
    let mockBlock: RouteBlock;

    beforeEach(() => {
        const container = document.createElement('div');
        container.id = 'app';
        document.body.appendChild(container);
        router = new Router('#app');
        class TestBlock extends Block {
            render() {
                return 'test';
            }
        }
        mockBlock = withRouter(TestBlock);
    });

    it('должен правильно добавлять маршруты', () => {
        router.use('/home', mockBlock);
        router.use('/home1', mockBlock);
        router.use('/home2', mockBlock);
        router.use('/home3', mockBlock);
        expect(router.routes.length).to.equal(4);
    });

    it('должен обрабатывать переход по маршруту', () => {
        router.use('/home', mockBlock)
            .use('/anotherHome', mockBlock)
        router.start();
        router.go('/anotherHome');
        expect(router.currentRoute).to.equal(router.getRoute('/anotherHome'));
    });

    it('должен возвращать ошибку, если маршрут не найден', () => {
        expect(() => router._onRoute('/nonexistent')).to.throw(Error, 'Route /nonexistent не найден');
    });

    it('должен переходить на предыдущую, а потом на следующую страницу', () => {
        router.use('/home', mockBlock);
        router.use('/about', mockBlock);
        router.start();

        router.go('/home');
        router.go('/about');
        router.go('/home');

        const forwardSpy = sinon.spy(router, 'forward');
        router.back();
        router.forward();

        expect(forwardSpy.calledOnce).to.be.true;
        expect(router.currentRoute).to.equal(router.getRoute('/home'));
    });
});
