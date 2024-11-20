
const checkLogin = (value: string):{errorMessage: string} => {
    const validPattern = /^[a-zA-Z0-9_-]+$/;
    const onlyDigitsPattern = /^\d+$/;

    if (value.length < 3) {
        return {errorMessage: 'Минимальная длина логина 3 символа'};
    } if (value.length > 20) {
        return {errorMessage: 'Максимальная длина логина 20 символов'};
    } if (!validPattern.test(value)) {
        return {errorMessage: 'Логин может содержать только латиницу, цифры, дефис и нижнее подчеркивание'};
    } if (onlyDigitsPattern.test(value)) {
        return {errorMessage: 'Логин не может состоять только из цифр'};
    }

    return {errorMessage: ''};

}

const checkEmail = (value: string):{errorMessage: string} => {
    const validPattern = /^[\w-.]+@([\w-]+\.)+[a-zA-Z]{2,}$/i;
    if (value.length < 3) {
        return { errorMessage: 'Минимальная длина почты 3 символа' };
    } if (!validPattern.test(value)) {
        return { errorMessage: 'Введите корректный адрес электронной почты' };
    }

    return { errorMessage: '' };

}

const checkFirstSecondNames = (value: string):{errorMessage: string} => {
    const validPattern = /^[A-ZА-Я][a-zа-яёA-ZА-Яё-]*$/;
    if (value.length === 0) {
        return {errorMessage: 'Поле обязательно для заполнения'};
    } if (!validPattern.test(value)) {
        return {errorMessage: 'Имя должно начинаться с заглавной буквы и содержать только буквы, дефис'};
    }

    return {errorMessage: ''};
}

const checkPhone = (value: string):{errorMessage: string} => {
    const validPattern = /^\+?[0-9]+$/;
    if (value.length < 10) {
        return {errorMessage: 'Минимальная длина номера 10 символа'};
    } else if (value.length > 15) {
        return {errorMessage: 'Максимальная длина номера 15 символов'};
    } else if (!validPattern.test(value)) {
        return {errorMessage: 'Телефон должен состоять только из цифр и может начинаться с плюса'};
    }

    return {errorMessage: ''};
}

const checkPassword = (value: string, confirm?: string):{errorMessage: string} => {
    if (value.length < 8) {
        return {errorMessage: 'Минимальная длина пароля 8 символов'};
    } if (value.length > 40) {
        return {errorMessage: 'Максимальная длина пароля 40 символов'};
    } if (!/[A-Z]/.test(value)) {
        return { errorMessage: 'Пароль должен содержать хотя бы одну заглавную букву' };
    } if (!/\d/.test(value)) {
        return { errorMessage: 'Пароль должен содержать хотя бы одну цифру' };
    } if (confirm && value !== confirm) {
        return { errorMessage: 'Пароли не совпадают' };
    }

    return {errorMessage: ''};
}
const checkMessage = (value: string):{errorMessage: string} => {
    if (value.length == 0) {
        return {errorMessage: 'Сообщение не должно быть пустым'}
    }

    return {errorMessage: ''};
}

export default {checkLogin, checkEmail, checkFirstSecondNames, checkPhone, checkPassword, checkMessage};
