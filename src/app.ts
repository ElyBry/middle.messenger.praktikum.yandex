import './scss/app.scss';
import Handlebars from 'handlebars';

import * as Pages from './pages';
import * as Components from './components'

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

function navigate(page: string) {
    const [ source, context ] = pages[page];
    const container = document.getElementById('app')!;

    if (source instanceof Object) {
        const page = new source(context);
        container.innerHTML = '';
        container.append(page.getContent());
        page.dispatchComponentDidMount();
        return;
    }

    container.innerHTML = Handlebars.compile(source)(context);
}
const pages:Record<string, any> = {
    '404': [ Pages.Page404 ],
    '500': [ Pages.Page500 ],
    'signIn': [ Pages.SignIn ],
    'signUp': [ Pages.SignUp ],
    'profile': [ Pages.Profile ],
    'chats': [ Pages.chats ],
}


document.addEventListener('click', e => {
    const target = e.target as HTMLElement;
    const pageElement = target.closest('[page]');
    const page = pageElement?.getAttribute('page');
    if (page) {
        navigate(page);

        e.preventDefault();
        e.stopImmediatePropagation();
    }
});

const firstPage = window.location.pathname.replace('/','');
if (firstPage && firstPage in pages) {
    navigate(firstPage);
} else {
    const defPage = '404';
    navigate(defPage);
}
