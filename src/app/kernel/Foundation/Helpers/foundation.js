module.exports = {

    /*
    |--------------------------------------------------------------------------
    | *env* Helper
    |--------------------------------------------------------------------------
    |
    | You can get env variable with clear *env* helper.
    |
    */

    env(name, defaultValue) {
        if (Object.prototype.hasOwnProperty.call(process.env, name))
            return process.env[ name ]
        else
            return defaultValue
    },

    /*
    |--------------------------------------------------------------------------
    | *config* Helper
    |--------------------------------------------------------------------------
    |
    | You can get env variable with clear *env* helper.
    |
    */

    /*
    |--------------------------------------------------------------------------
    | *loadPlugins* Helper
    |--------------------------------------------------------------------------
    |
    | You can initialize plugins with this helper.
    |
    */

    loadPlugins(mode) {
        const plugins = require(`../../../../config/plugins.js`)

        switch (mode) {
            case 'client':
                plugins.client.forEach(plugin => require(`../../../../plugins/client/${ plugin }.js`))
                break

            case 'server':
                plugins.server.forEach(plugin => require(`../../../../plugins/server/${ plugin }.js`))
                break

            default:
                plugins.full.forEach(plugin => require(`../../../../plugins/${ plugin }.js`))
        }
    },

}
