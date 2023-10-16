import { createI18n } from 'vue-i18n';
import pluralRules from './rules/pluralization';

const messages = {
  en: {
    welcome_view: {
      login_heading: 'Login',
      signup_heading: 'Signup',
      login_link_text: 'Sign up',
      signup_link_text: 'Log in',
      login_prompt: 'No account yet?',
      signup_prompt: 'Already registered?',
      instead: 'instead'
    },
    not_found_view: {
      heading: 'Error 404. Page not found',
      link: 'Go back'
    },
    login_form: {
      error: 'Incorrect login credentials',
      button: 'Log in',
      email_placeholder: 'Email',
      password_placeholder: 'Password'
    },
    signup_form: {
      error: 'Could not complete the signup',
      button: 'Sign up',
      display_name_placeholder: 'Display name',
      email_placeholder: 'Email',
      password_placeholder: 'Password'
    },
    new_chat_form: {
      error: 'Could not send the message',
      placeholder: 'Type a message and hit enter to send...'
    },
    navbar: {
      greetings: 'Hey there',
      logged_in_as: 'Currently logged in as',
      button: 'Log out',
      num_participants: 'no one has written anything yet 😔 | {n} user is participating in the conversation | {n} users is participating in the conversation'
    },
    chat_window: {
      error: 'Could not fetch data',
      ago: 'ago'
    }
  },
  ru: {
    welcome_view: {
      login_heading: 'Вход',
      signup_heading: 'Регистрация',
      login_link_text: 'Зарегистрируйтесь',
      signup_link_text: 'Войдите',
      login_prompt: 'Еще нет аккаунта?',
      signup_prompt: 'Уже зарегистрированы?',
      instead: ''
    },
    not_found_view: {
      heading: 'Ошибка 404. Страница не найдена',
      button: 'Назад'
    },
    login_form: {
      error: 'Логин и/или пароль введены неправильно',
      button: 'Войти',
      email_placeholder: 'Электронная почта',
      password_placeholder: 'Пароль'
    },
    signup_form: {
      error: 'Не удалось зарегистрироваться',
      button: 'Зарегистрироваться',
      display_name_placeholder: 'Отображаемое имя',
      email_placeholder: 'Электронная почта',
      password_placeholder: 'Пароль'
    },
    new_chat_form: {
      error: 'Не удалось отправить сообщение',
      placeholder: 'Введите сообщение и нажмите enter...'
    },
    navbar: {
      greetings: 'Привет, ',
      logged_in_as: 'Вы вошли в систему как',
      button: 'Выйти',
      num_participants: 'пока никто ничего не написал 😔 | В беседе участвует {n} пользователь | В беседе участвуют {n} пользователя | В беседе участвует {n} пользователей'
    },
    chat_window: {
      error: 'Не удалось получить данные',
      ago: 'назад'
    }
  }
};

export default createI18n({
  locale: import.meta.env.VITE_DEFAULT_LOCALE,
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
  legacy: false,
  globalInjection: true,
  messages,
  pluralRules
});
