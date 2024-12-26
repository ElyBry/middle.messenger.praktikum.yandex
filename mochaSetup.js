import {JSDOM} from 'jsdom';

const jsdom = new JSDOM('<!DOCTYPE html>');
jsdom.reconfigure({
    url: 'http://localhost:3000/home',
});

global.window = jsdom.window;
global.document = jsdom.window.document;
global.MouseEvent = jsdom.window.MouseEvent;
global.Node = jsdom.window.Node;
