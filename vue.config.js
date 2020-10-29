module.exports = {
  transpileDependencies: ['vuetify'],
  devServer: {
    proxy: 'http://ec2-3-21-103-10.us-east-2.compute.amazonaws.com:8000'
  }
}
