// http://kazupon.github.io/vue-i18n/en/messages.html

const requireLang = require.context('./locales', true, /\.json$/)

let messages = {}

for (const file of requireLang.keys()) {
    const path = file.replace(/(\.\/|\.json$)/g, '').split('/')

    path.reduce((o, s, i) => {
        if (o[s]) return o[s]

        o[s] = i + 1 === path.length ? requireLang(file) : {}

        return o[s]
    }, messages)
}

// Add languages supports in global variable
global.langs = Object.keys(messages)

export default messages
