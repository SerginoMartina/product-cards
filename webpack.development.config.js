module.exports = {
    mode: 'development',
    devtool: 'eval',
    cache: true,
    
    performance: {
    hints: false
    },

    output: {
    pathinfo: true
    },

    optimization: {
    moduleIds: 'named',
    chunkIds: 'named',
    mangleExports: false,
    nodeEnv: 'development',
    flagIncludedChunks: false,
    occurrenceOrder: false,
    concatenateModules: false,
    splitChunks: {
        hidePathInfo: false,
        minSize: 10000,
        maxAsyncRequests: Infinity,
        maxInitialRequests: Infinity,
    },
    emitOnErrors: true,
    checkWasmTypes: false,
    minimize: false,
    removeAvailableModules: false
    },
    plugins: [
    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
    ]
}
