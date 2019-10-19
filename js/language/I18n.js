import I18nJs, {getLanguages} from "react-native-i18n";
import en from './en'
import zh from './zh'

I18nJs.defaultLocale = 'zh'
I18nJs.fallbacks = true
I18nJs.translations = {
    zh,
    en
}

I18nJs.localeLanguage = () => {
    I18nJs.locale = zh
    return I18nJs.locale
}

export {I18nJs, getLanguages}