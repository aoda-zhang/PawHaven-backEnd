import { join } from 'node:path'
import i18n from 'i18n'

i18n.configure({
    locales: ['en', 'zh'], // List of supported languages
    directory: join(__dirname, '../i18n'), // Path to translation files
    defaultLocale: 'en', // Default language
    autoReload: true, // Automatically reload translation files on changes
    updateFiles: false, // Prevents automatic creation of missing translation files
    syncFiles: false, // Disables synchronization of locale files
    cookie: 'locale' // Name of the language cookie
})

export default i18n
