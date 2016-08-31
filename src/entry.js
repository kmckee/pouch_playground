require("./style.css");
require("./index.html");
const PouchDB = require("pouchdb");
window.PouchDB = require("pouchdb");
const dbname = 'dbname';
const db = new PouchDB(dbname);
window.db = db;

if(false) {
    db.put({
        _id: 'first@gmail.com',
        name: 'First',
        birthdate: new Date('10/19/1983')
    });
    db.put({
        _id: 'second@gmail.com',
        name: 'Second',
        birthdate: new Date('11/19/1983')
    });
    db.put({
        _id: 'third@gmail.com',
        name: 'Third',
        birthdate: new Date('12/19/1983')
    });
    db.put({
        _id: 'fourth@gmail.com',
        name: 'Fourth',
        birthdate: new Date('12/19/1983')
    });
    db.put({
        _id: 'fifth@gmail.com',
        name: 'Fifth',
        birthdate: new Date('12/25/1983')
    });

}

const designDoc = {
    _id: '_design/my_index',
    views: {
        by_name: {
            map: (function (doc) {
                if (doc.name && doc.name.startsWith('F')) {
                    emit();
                }
            }).toString()
        }
    }
};

db.get('_design/my_index')
.then((doc) => db.remove(doc))
.then(() => db.put(designDoc))
.then(console.log.bind(null, 'Saved design doc'))
.catch(console.log.bind(null, 'Error saving design doc'))
.then(() => db.query('my_index/by_name', { limit: 0 }))
.then(console.log.bind(null, 'Successfully initialized index'))
.catch(console.log.bind(null, 'error initializing index'))
.then(() => db.query('my_index/by_name'))
.then(function(result) {
    console.log('success!', result);
}).catch(console.log.bind(null, 'error querying the view'))
.then(function() {
    PouchDB.sync(dbname, `http://localhost:3032/db/${dbname}`);
});
