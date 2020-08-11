/**
 * Vue index
 *
 * @library
 *
 * http://kazupon.github.io/vue-i18n/en/
 */

// Lib imports
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from './loader.js'

Vue.use(VueI18n)

const dateTimeFormats = {
    en: {
        short: {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        },
        long: {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            weekday: 'short',
            hour: 'numeric',
            minute: 'numeric',
        },
        shortMonth: {
            month: 'short',
        },
        monthDay: {
            weekday: 'short',
            day: 'numeric',
            month: 'long',
        },
        day: {
            day: 'numeric',
        },
        dayName: {
            weekday: 'short',
        },
        dayNameLong: {
            weekday: 'long',
        },
        hourMinute: {
            hour: 'numeric',
            minute: 'numeric',
        },
    },
}

const numberFormats = {
    en: {
        currency: {
            style: 'currency',
            currency: 'USD',
        },
    },
}

const index = new VueI18n({
    locale: global.env('LOCALE', 'en'),
    fallbackLocale: global.env('FALLBACK_LOCALE', 'en'),
    messages,
    dateTimeFormats,
    numberFormats,
})

export default index
