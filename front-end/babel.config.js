const presets = ['@babel/preset-react'];
  const plugins = [
      '@babel/plugin-transform-template-literals',
      '@babel/plugin-transform-arrow-functions',
      'macros'
  ];
  
module.exports = { presets, plugins };