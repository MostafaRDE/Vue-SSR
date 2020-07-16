const webpackBaseConfig = require('../app/builder/webpack.base.config')

// <editor-fold desc="Custom codes">

// NODE_ENV
let isDevelopment = process.env.NODE_ENV === 'development'


// <editor-fold desc="Rules">

webpackBaseConfig.module.rules.push(...[

    // Your rules
    // ...

])

// </editor-fold>


// <editor-fold desc="In Development Mode">

if (isDevelopment) {

    // Your custom codes
    // ...

}

// </editor-fold>

// <editor-fold desc="In Production Mode">

else {

    // Your custom codes
    // ...

}

// </editor-fold>


// Your custom codes
// ...


// </editor-fold>

module.exports = webpackBaseConfig
