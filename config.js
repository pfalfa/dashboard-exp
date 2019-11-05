module.exports = {
  app: {
    port: 3000,
    storeName: 'pfalfa',
    secretKey: process.env.SECRET_KEY || 'secret-key',
  },
  db: {
    peers: ['http://18.136.211.116:8778/gun'],
  },
}
