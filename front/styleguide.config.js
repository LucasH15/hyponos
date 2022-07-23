const webpack = require('webpack')
const path = require('path')
const { version } = require('./package')
const webpackCommonConfig = require('./craco.config')

module.exports = {
    dangerouslyUpdateWebpackConfig(config) {
        config.module.rules.push({
            test: /.\.md$/,
            type: "javascript/auto"
        });
        config.plugins.push(
            new webpack.NormalModuleReplacementPlugin(
                /react-styleguidist\/lib\/loaders\/utils\/client\/requireInRuntime$/,
                "react-styleguidist/lib/loaders/utils/client/requireInRuntime"
            )
        );
        config.plugins.push(
            new webpack.NormalModuleReplacementPlugin(
                /react-styleguidist\/lib\/loaders\/utils\/client\/evalInContext$/,
                "react-styleguidist/lib/loaders/utils/client/evalInContext"
            )
        );
        return config;
    },
    version,
    moduleAliases: {
        ...webpackCommonConfig.webpack.alias
    },
    ignore: [
        '**/__tests__/**',
        '**/*.test.{js,jsx,ts,tsx}',
        '**/*.spec.{js,jsx,ts,tsx}',
        '**/*.d.ts',
        '**/components/**/index.{js,jsx,ts,tsx}'
    ],
    styleguideComponents: {
        Wrapper: path.join(__dirname, 'src/styleguidist/MuiThemeWrapper.tsx')
    },
    propsParser: require('react-docgen-typescript').withCustomConfig(
        './tsconfig.json',
        {
            "compilerOptions": { "noEmit": false },
        }
    ).parse,
    assetsDir: 'public/'
}
