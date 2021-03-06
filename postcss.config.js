module.exports = {
  plugins: {
    'postcss-pxtorem': {
      // 设计稿 375:37.5
      // 设计稿：750:75
      // Vant 是基于 375
      rootValue ({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*'],
      // 配置不要转换的文件
      exclude: 'github-markdown'
    }

  }
}
// module.exports = {
//   plugins: {
//     'postcss-pxtorem': {
//       // 设计稿 375:37.5
//       // 设计稿：750:75
//       // Vant 是基于 375
//       rootValue: 37.5,
//       propList: ['*']
//     }
//   }
// }
