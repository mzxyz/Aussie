module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ios.js', '.android.js', '.js', '.jsx', '.ts', '.tsx', '.json'],
        alias: {
          screens: './src/screens',
          components: './src/components',
          navigation: './src/navigation',
          utils: './src/utils',
          types: './src/types',
          hooks: './src/hooks',
          stores: './src/stores',
          theme: './src/theme',
          api: './src/api',
        },
      },
    ],
  ],
};
