module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',  // Add the NativeWind plugin
      ['module:react-native-dotenv'],  // Add the dotenv plugin
    ],
  };
};