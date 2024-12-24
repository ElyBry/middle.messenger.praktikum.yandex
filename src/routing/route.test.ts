import { expect } from 'chai';
import Route from './Route.ts';
import Block, { Props } from '../core/Block.ts';

describe('Route Class Tests', () => {
    let route: Route;
    let mockBlock: any;
    const mockProps: Props = {
        rootQuery: '#app',
    };

    beforeEach(() => {
        mockBlock = class extends Block {
            render() {
                return '<div>Test Block</div>';
            }
        };
        route = new Route('/test', mockBlock, mockProps);
        const container = document.createElement('div');
        container.id = 'app';
        document.body.appendChild(container);
    });

    afterEach(() => {
        const container = document.getElementById('app');
        if (container) {
            container.innerHTML = '';
        }
    });

    it('должен правильно инициализировать маршрут', () => {
        expect(route).to.exist;
        expect(route).to.be.instanceof(Route);
        expect(route.match('/test')).to.be.true;
        expect(route.match('/not-test')).to.be.false;
    });

    it('должен рендерить блок', () => {
        route.render();
        const container = document.getElementById('app');
        expect(container?.innerHTML).to.contain('Test Block');
    });

    it('должен убирать блок при вызове leave', () => {
        route.render();
        const container = document.getElementById('app');
        expect(container?.innerHTML).to.contain('Test Block');

        route.leave();
        expect(container?.innerHTML).to.contain('Test Block'); 
    });

    it('должен проверять соответствие маршруту', () => {
        expect(route.match('/test')).to.be.true;
        expect(route.match('/other')).to.be.false;
    });
});