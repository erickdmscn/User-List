module.exports = {
  devServer: {
    proxy: 'http://localhost:3000',  // Proxy para o backend
    port: 8080  // Porta do frontend
  }
};