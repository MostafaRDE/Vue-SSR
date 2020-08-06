module.exports = {

    /*
    |--------------------------------------------------------------------------
    | Application Name
    |--------------------------------------------------------------------------
    |
    | This value is the name of your application. This value is used when the
    | framework needs to place the application's name in a notification or
    | any other location as required by the application or its packages.
    |
    */

    name: global.env('APP_NAME', 'EServer'),

    /*
    |--------------------------------------------------------------------------
    | Compile directory path
    |--------------------------------------------------------------------------
    |
    | This directory path for compiled codes of your project.
    |
    */

    outputDir: global.env('APP_OUTPUT_DIR', './dist'),

    /*
    |--------------------------------------------------------------------------
    | Application URL
    |--------------------------------------------------------------------------
    |
    | This URL is used by the console to properly generate URLs when using
    | the project's tools. You should set this to the root of your application
    | so that it is used when running application.
    |
    */

    url: global.env('APP_URL', 'http://localhost'),

    assetUrl: global.env('ASSET_URL', null),

    /*
    |--------------------------------------------------------------------------
    | Application Timezone
    |--------------------------------------------------------------------------
    |
    | Here you may specify the default timezone for your application, which
    | will be used by the PHP date and date-time functions. We have gone
    | ahead and set this to a sensible default for you out of the box.
    |
    */

    timezone: global.env('TIMEZONE', 'UTC'),

    /*
    |--------------------------------------------------------------------------
    | Application Locale Configuration
    |--------------------------------------------------------------------------
    |
    | The application locale determines the default locale that will be used
    | by the translation *i18n* plugin. You are free to set this value to
    | any of the locales which will be supported by the application.
    |
    */

    locale: global.env('LOCALE', 'en'),

}
