const gun = require('./Gun')
const user = gun.user()

const login = (alias, pass, remember) => {
  return new Promise(async (resolve, reject) => {
    if (!alias || !pass) return resolve({ success: false, message: 'Email or Passphrase cannot empty', data: null })

    try {
      user.auth(alias, pass, ack => {
        if (ack && ack.err) return resolve({ success: false, message: ack.err, data: null })

        ack.sea.email = alias
        return resolve({ success: true, message: 'Login user successfully', data: ack.sea })
      })
    } catch (error) {
      return reject(error)
    }
  })
}

const logout = () => {
  return new Promise(resolve => {
    user.leave()
    return resolve({ success: true, message: 'Logout successfully', data: null })
    // TODO: the gundb documentation for user.leave isn't very clear
    // user.leave({}, ack => {
    //   console.log('==ack', ack)
    //   return resolve({ success: true, message: 'Logout successfully', data: null })
    // })
  })
}

const create = (alias, pass) => {
  return new Promise((resolve, reject) => {
    if (!alias || !pass) return resolve({ success: false, message: 'Email or Passphrase cannot empty', data: null })

    try {
      user.create(alias, pass, ack => {
        if (ack && ack.err) return resolve({ success: false, message: ack.err, data: null })
        // const profile = { email: alias, pass }
        // user.get('profile').put(profile, ack => {
        //   console.log('==profile ack', ack)
        // })
        return resolve({ success: true, message: 'Create user successfully', data: ack.pub })
      })
    } catch (error) {
      return reject(error)
    }
  })
}

const getUserByPubKey = pubkey => {
  return new Promise((resolve, reject) => {
    if (!pubkey) return resolve({ success: false, message: 'Public key cannot empty', data: null })

    try {
      gun.user(pubkey).once(data => {
        return resolve(data)
      })
    } catch (error) {
      return reject(error)
    }
  })
}

const changePass = (alias, newPass) => {
  //https://gun.eco/docs/FAQ#how-can-i-change-a-user-password
}

const remove = (alias, pass, callback) => {
  return user.delete(alias, pass, callback)
}

module.exports = { create, login, logout, getUserByPubKey }
