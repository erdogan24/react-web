import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translations: {
                'Sign up': 'Sign Up',
                'Password mismatch': 'Password mismatch',
                Username: 'Username',
                'Display Name': 'Display Name',
                Password: 'Password',
                'Password Repeat': 'Password Repeat',
                Login: 'Login',

            }
        },
        tr: {
            translations: {
                'Sign Up': 'Kayıt Ol',
                'Password mismatch': 'Aynı şifreyi giriniz',
                'Username': 'Kullanıcı Adı',
                'Display Name': 'Görünen Ad',
                'Password': 'Şifre',
                'Password Repeat': 'Şifre Tekrarı',
                Login: 'Sisteme gir',

            }
        }
    },
    fallbackLng: 'en',
    ns: ['translations'],
    defaultNS: ' translations',
    keySeperator: false,
    interpolation: {
        escapeValue: false,
        formatSeparator: ','

    }, react: {
        wait: true
    }

});

export default i18n;
