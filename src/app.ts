import './scss/app.scss';
import Handlebars from 'handlebars';

import * as Pages from './pages';
import * as Components from './components'

Object.entries(Components).forEach(([ name, template ]) => {
    Handlebars.registerPartial(name, template);
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
    const templatingFunction = Handlebars.compile(source);
    container.innerHTML = templatingFunction(context);
}
const pages: { [key: string]: [string, any?] } = {
    '404': [ Pages.Page404 ],
    '500': [ Pages.Page500 ],
    'signUp': [ Pages.signUp ],
    'signIn': [ Pages.signIn ],
    'profile': [ Pages.profile, {
        isEditing: false,
    }],
    'chats': [ Pages.chats, {
        chats: [
            {name: "Иван Иванов", avatar: "business-man-by-skyscraper.jpg", time: "now", isTyping: true, isOnline: true, lastMessage: "Привет!", active: true},
            {name: "Ванёк Иванов", avatar: "handsome-sensitive-red-head-man-smiling.jpg", time: "5h", isTyping: false, isOnline: true, lastMessage: "Пока!"},
            {name: "Евгения Смирнова", avatar: "young-woman-wearing-striped-shirt-eyeglasses.jpg", time: "15h", isTyping: true, isOnline: true, lastMessage: "Что нового?"},
            {name: "Имя Фамилия", avatar: "handsome-sensitive-red-head-man-smiling.jpg", time: "Fri", isTyping: false, isOnline: false, lastMessage: "Я так и знал!!!"},
            {name: "Имя Фамилия", avatar: "handsome-sensitive-red-head-man-smiling.jpg", time: "Sat", isTyping: false, isOnline: false, lastMessage: "Понял, спасибо"},
            {name: "Имя Фамилия", avatar: "handsome-sensitive-red-head-man-smiling.jpg", time: "Month", isTyping: false, isOnline: false, lastMessage: "Здравствуйте! Это очень большое и важное сообщение для проверки отображения, ведь если кто-то напишет это сообщение и оно заполнит весь экран, то будет очень плохо, на всякий случай уберём часть сообщения, вдруг бэкэндер этого не реализует)"},
            {name: "Имя Фамилия", avatar: "handsome-sensitive-red-head-man-smiling.jpg", time: "2 Month", isTyping: false, isOnline: false, lastMessage: ""},
            {name: "Иван Иванов", avatar: "business-man-by-skyscraper.jpg", time: "now", isTyping: true, isOnline: true, lastMessage: "Привет!"},
            {name: "Ванёк Иванов", avatar: "handsome-sensitive-red-head-man-smiling.jpg", time: "5h", isTyping: false, isOnline: true, lastMessage: "Пока!"},
            {name: "Евгения Смирнова", avatar: "young-woman-wearing-striped-shirt-eyeglasses.jpg", time: "15h", isTyping: true, isOnline: true, lastMessage: "Что нового?"},
            {name: "Имя Фамилия", avatar: "handsome-sensitive-red-head-man-smiling.jpg", time: "Fri", isTyping: false, isOnline: false, lastMessage: "Я так и знал!!!"},
            {name: "Имя Фамилия", avatar: "handsome-sensitive-red-head-man-smiling.jpg", time: "Sat", isTyping: false, isOnline: false, lastMessage: "Понял, спасибо"},
            {name: "Имя Фамилия", avatar: "handsome-sensitive-red-head-man-smiling.jpg", time: "Month", isTyping: false, isOnline: false, lastMessage: "Здравствуйте! Это очень большое и важное сообщение для проверки отображения, ведь если кто-то напишет это сообщение и оно заполнит весь экран, то будет очень плохо, на всякий случай уберём часть сообщения, вдруг бэкэндер этого не реализует)"},
            {name: "Имя Фамилия", avatar: "handsome-sensitive-red-head-man-smiling.jpg", time: "2 Month", isTyping: false, isOnline: false, lastMessage: ""},
        ],
        messages: [
            {name: "Иван Иванов", avatar: "business-man-by-skyscraper.jpg", time: "11:12", message: "Привет!"},
            {name: "Иван Иванов", avatar: "business-man-by-skyscraper.jpg", time: "11:13", message: "Как дела? Тут такое дело, нужна помощь с написанием большого сообщения, чтобы проверить как оно выглядит, не сможешь ли ты с этим помочь?"},
            {name: "Егор Ермаков", me: true, avatar: "handsome-sensitive-red-head-man-smiling.jpg", time: "11:14", message: "Привееет! Всё кул! Да, могу помочь"},
            {name: "Егор Ермаков", me: true, avatar: "handsome-sensitive-red-head-man-smiling.jpg", time: "11:14", message: "Смотри, можно воспользоваться рандомными буквами"},
            {name: "Егор Ермаков", me: true, avatar: "handsome-sensitive-red-head-man-smiling.jpg", time: "11:14", message: "А можно просто текст из Войны и Мир скопировать"},
            {name: "Егор Ермаков", me: true, avatar: "handsome-sensitive-red-head-man-smiling.jpg", time: "11:15", message: "Возможно этого хватит))"},
            {name: "Иван Иванов", avatar: "business-man-by-skyscraper.jpg", time: "11:16", message: "Прикольно! Я думаю, что текст из Войны и Мир будет выглядеть вполне солидно."},
            {name: "Егор Ермаков", me: true, avatar: "handsome-sensitive-red-head-man-smiling.jpg", time: "11:16", message: "Да, именно! Он очень объемный, так что идеально подойдет для такой цели."},
            {name: "Иван Иванов", avatar: "business-man-by-skyscraper.jpg", time: "11:17", message: "А ты уверен, что текст из книги не будет выглядеть слишком неуместно?"},
            {name: "Егор Ермаков", me: true, avatar: "handsome-sensitive-red-head-man-smiling.jpg", time: "11:17", message: "Ну, всё зависит от контекста. Если сообщение формальное, то лучше сам текст."},
            {name: "Егор Ермаков", me: true, avatar: "handsome-sensitive-red-head-man-smiling.jpg", time: "11:18", message: "А если неформальное, то можно использовать и рандомные буквы."},
            {name: "Иван Иванов", avatar: "business-man-by-skyscraper.jpg", time: "11:19", message: "Хорошо. Можешь дать пример, как это сделать?"},
            {name: "Егор Ермаков", me: true, avatar: "handsome-sensitive-red-head-man-smiling.jpg", time: "11:19", message: "Конечно! Например, можно написать: 'лджвабрашдлоф'. У него вообще нет смысла."},
            {name: "Иван Иванов", avatar: "business-man-by-skyscraper.jpg", time: "11:20", message: "Понял! Но можно ли немного модифицировать текст, чтобы он выглядел более естественно?"},
            {name: "Егор Ермаков", me: true, avatar: "handsome-sensitive-red-head-man-smiling.jpg", time: "11:21", message: "Да, конечно! Можно просто перемешать буквы из какого-то предложения."},
            {name: "Егор Ермаков", me: true, avatar: "handsome-sensitive-red-head-man-smiling.jpg", time: "11:22", message: "Например, 'наша прекрасная война' может стать 'ншра перекасная оина'."},
            {name: "Иван Иванов", avatar: "business-man-by-skyscraper.jpg", time: "11:23", message: "Это уже лучше! Нужно будет попробовать несколько вариантов."},
            {name: "Егор Ермаков", me: true, avatar: "handsome-sensitive-red-head-man-smiling.jpg", time: "11:24", message: "Да, и не забудь добавить немного эмодзи, это придаст живости!"},
            {name: "Иван Иванов", avatar: "business-man-by-skyscraper.jpg", time: "11:25", message: "Хорошая идея! Где ты обычно берёшь эмодзи?"},
            {name: "Егор Ермаков", me: true, avatar: "handsome-sensitive-red-head-man-smiling.jpg", time: "11:26", message: "Можно использовать специальные сайты или просто поискать в гугле 'эмодзи'."},
            {name: "Иван Иванов", avatar: "business-man-by-skyscraper.jpg", time: "11:27", message: "Здорово! У меня возник вопрос: если я использую текст из книги и кто-то заметит, будет ли это проблемой?"}
        ],
        openChat: true,
        addChat: false,
        openSettings: false,
        openAttach: false,
    }],
};

document.addEventListener('click', e => {
    const target = e.target as HTMLElement;
    const page = target.getAttribute('page');
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
