var express = require('express'),
    app     = express(),
    PouchDB = require('pouchdb'),
    cors = require('cors');

var allowCors = cors({
    origin: true,
    credentials: true
});
app.options("*", allowCors);
app.use(allowCors);

app.use('/db', require('express-pouchdb')(PouchDB));

app.listen(3032);
console.log('listening on port 3032');
