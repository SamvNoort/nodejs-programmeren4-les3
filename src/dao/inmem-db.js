//
// Onze lokale 'in memory database'.
// We simuleren een asynchrone database met een array van objecten.
// De array bevat een aantal dummy records.
// De database heeft twee methoden: get en add.
// Opdracht: Voeg de overige methoden toe.
//
const database = {
    // het array met dummy records. Dit is de 'database'.
    _data: [
        {
            id: 0,
            firstName: 'Hendrik',
            lastName: 'van Dam',
            emailAddress: 'hvd@server.nl'
            // Hier de overige velden uit het functioneel ontwerp
        },
        {
            id: 1,
            firstName: 'Marieke',
            lastName: 'Jansen',
            emailAddress: 'm@server.nl'
            // Hier de overige velden uit het functioneel ontwerp
        }
    ],

    // Ieder nieuw item in db krijgt 'autoincrement' index.
    // Je moet die wel zelf toevoegen aan ieder nieuw item.
    _index: 2,
    _delayTime: 500,

    getAll(callback) {
        // Simuleer een asynchrone operatie
        setTimeout(() => {
            // Roep de callback aan, en retourneer de data
            callback(null, this._data)
        }, this._delayTime)
    },

    getById(id, callback) {
        // Simuleer een asynchrone operatie
        setTimeout(() => {
            if (id < 0 || id >= this._data.length) {
                callback({ message: `Error: id ${id} does not exist!` }, null)
            } else {
                callback(null, this._data[id])
            }
        }, this._delayTime)
    },

    add(item, callback) {
        // Simuleer een asynchrone operatie
        setTimeout(() => {

            if (this.isInDatabase(item.emailAdress)) {
                callback({message: 'Email already in use'}, null)
            }
            // Voeg een id toe en voeg het item toe aan de database
            item.id = this._index++
            // Voeg item toe aan de array
            this._data.push(item)

            // Roep de callback aan het einde van de operatie
            // met het toegevoegde item als argument, of null als er een fout is opgetreden
            callback(null, item)
        }, this._delayTime)
    },

    // Voeg zelf de overige database functionaliteit toe
    isInDatabase(email, callback) {
        // Simulate an asynchronous operation
        setTimeout(() => {
            const duplicate = this._data.some(item => item.emailAddress === email)
            callback(null, duplicate)
        }, this._delayTime)
    },

    update(id, updatedUser, callback) {
        setTimeout(() => {
            const index = this._data.findIndex(data => data.id === Number(id))
            if (index === -1) {
                callback({ status: 400, message: 'Error: User not found!' }, null)
                return;
            }

            const newEmail = updatedUser.emailAdress
            this.isInDatabase(newEmail, (error, duplicate) => {
                if (error) {
                    callback({ status: 500, message: 'Error while checking if email already is in the database!' }, null)
                    return;
                }
                if (duplicate) {
                    callback({ status: 404, message: 'Error: Email address already exists!' }, null)
                    return
                }

                this._data[index] = { ...this._data[index], ...updatedUser }
                callback(null, this._data[index])
            })
        }, this._delayTime)
    },

    delete(id, callback) {
        setTimeout(() => {
            const index = this._data.findIndex(data => data.id === Number(id));
            if (index === -1) {
                callback({ status:404, message: 'Error: User not found!' }, null)
                return
            }
            const deletedData = this._data.splice(index, 1)
            callback(null, deletedData[0])
        }, this._delayTime)
    }
}

module.exports = database
// module.exports = database.index;
