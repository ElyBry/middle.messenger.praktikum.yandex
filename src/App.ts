import './scss/app.scss';
import Handlebars from 'handlebars';

import * as Pages from './pages';
import * as Components from './components'

import Router from "./routing/Router.ts";
import { CONSTS } from "./CONSTS.ts";

import Store, { StoreEvents } from "./store/Store.ts";
import {checkLoginUser} from "./services/auth.ts";

interface Template<T> {
    (context: T): string;
}

Object.entries(Components).forEach(([ name, template ]) => {
    Handlebars.registerPartial(name, template as unknown as Template<any>);
});

Handlebars.registerHelper('isEqual', (v1,v2,options) => {
    if (v1 == v2) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
})

window.store = new Store({
    isLoading: false,
    signInError: '',
    signUpError: '',
    changeProfileError: '',
    user: {},
    tokenChat: '',
});

window.store.on(StoreEvents.Updated, (prevState, newState) => {
    console.log(prevState, newState);
});

window.router = new Router(CONSTS.APP_ROOT);
const check = await checkLoginUser();
window.router.use(CONSTS.signIn, Pages.SignIn)
    .use(CONSTS.signUp, Pages.SignUp)
    .use(CONSTS.settings, Pages.Settings)
    .use(CONSTS.messenger, Pages.Messenger)
    .use(CONSTS.servError, Pages.Page500)
    .use('*', Pages.Page404)
    .start()
if (!check) {
    window.router.go(CONSTS.signIn);
}