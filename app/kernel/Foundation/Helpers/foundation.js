/*
|--------------------------------------------------------------------------
| *env* Helper
|--------------------------------------------------------------------------
|
| You can get env variable with clear *env* helper.
|
*/

function env(name, defaultValue) {
    if (Object.prototype.hasOwnProperty.call(process.env, name))
        return process.env[ name ]
    else
        return defaultValue
}

module.exports = {
    env,
}
