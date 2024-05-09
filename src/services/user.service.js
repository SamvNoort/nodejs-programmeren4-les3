const database = require('../dao/inmem-db')
const logger = require('../util/logger')

const userService = {
    create: (user, callback) => {
        logger.info('create user', user)
        database.add(user, (err, data) => {
            if (err) {
                logger.info(
                    'error creating user: ',
                    err.message || 'unknown error'
                )
                callback(err, null)
            } else {
                logger.trace(`User created with id ${data.id}.`)
                callback(null, {
                    message: `User created with id ${data.id}.`,
                    data: data
                })
            }
        })
    },

    getAll: (callback) => {
        logger.info('getAll')
        database.getAll((err, data) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, {
                    message: `Found ${data.length} users.`,
                    data: data
                })
            }
        })
    },

    update: (id, user, callback) => {
        logger.info('update')
        database.update(id, user, (err, data) => {
            if(err) {
                logger.trace(`Error while trying to update user with id ${data.id}.`)
                callback(err, null)
            } else {
                logger.trace(`User updated with id ${data.id}.`)
                callback(null, {
                    status: 200,
                    message: `User updated with id ${data.id}.`,
                    data: data
                })
            }
        })
    },

    delete: (id, callback) => {
        database.delete(id, (err, data) => {
            if (err) {
                logger.trace(`Error occured while trying to delete user with id ${id}`)
                callback(err, null)
            } else {
                logger.trace(``)
                callback(null, {
                    status: 200,
                    message: `User with id ${id} deleted`,
                    data: data
                })
            }
        })
    }
}

module.exports = userService
