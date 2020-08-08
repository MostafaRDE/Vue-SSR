export default function ({ i18n }) {
    return function beforeEach(to, from, next) {

        // <-- Checking language support -->
        // <editor-fold desc="Checking language support">

        // Get full path to go
        let path = to.fullPath

        // If first character is forward slash
        if (path[0] === '/')
            // Then remove it with "substr" method from path
            path = path.substr(1)

        // Check path if has any slash or not from first and save index in "firstSlash" variable
        let firstSlash = path.indexOf('/')
        // Check "firstSlash" bigger than 0
        if (firstSlash >= 0)
            // Then remove characters before slash and save result path to path (override it)
            path = path.substr(firstSlash)
        else
            // Else path equals to empty string
            path = ''

        // Check lang site (with parameter from going route)
        // If lang supported by site then go to execute another codes else fix language part of path to "en" language
        // switch (to.params.lang) {
        //     // Supported language by site
        //     case 'en':
        //         // Set site locale (site language)
        //         i18n.locale = to.params.lang
        //         return next()
        //     case 'af':
        //     case 'ar':
        //     case 'fa':
        //         // Set site locale (site language)
        //         i18n.locale = to.params.lang
        //         return next()
        //
        //     // Redirect to fix language part of path route
        //     default:
        //         return next(`/${process.env.LOCALE}${path}`)
        // }

        return next()

        // </editor-fold>
        // <-- / Checking language support -->
    }

}
