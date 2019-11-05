const Gun = require('gun')

const config = require('../../config')
const gun = Gun({ file: 'db', peers: config.db.peers })
// require('gun/sea')

module.exports = gun
