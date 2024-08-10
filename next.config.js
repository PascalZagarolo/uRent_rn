const { withExpo } = require('@expo/next-adapter');

module.exports = withExpo({
  // transpilePackages is a Next.js +13.1 feature.
  // older versions can use next-transpile-modules
  transpilePackages: [
    'react-native',
    'expo',
    // Add more React Native/Expo packages here...
  ],
});const { withExpo } = require('@expo/next-adapter');

module.exports = withExpo({
  // transpilePackages is a Next.js +13.1 feature.
  // older versions can use next-transpile-modules
  transpilePackages: [
    'react-native',
    'expo',
    // Add more React Native/Expo packages here...
  ],
});