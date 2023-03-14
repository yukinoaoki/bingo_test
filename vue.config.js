module.exports = {
	transpileDependencies: ["vuetify"],
	// publicPath: ",/",
	configureWebpack: {
		performance: {
			maxAssetSize: 1000000,
			maxEntrypointSize: 1000000,
		},
	},

	publicPath: process.env.NODE_ENV === "production" ? "/aoki_bingo_test" : "/",
};
