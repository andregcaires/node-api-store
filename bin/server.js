'use strict'

const app = require('../src/app');
const http = require('http');
const debug = require('debug')('nodestr:server');

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);

// handler para tratamento de erros
server.on('error', function(error) {
    console.log('Erro: '+ error);
});

server.on('listening', onListening);

console.log('API rodando na porta:' + port);


function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

function onListening() {
    const address = server.address();
    const bind = typeof address === 'string'
        ? 'pipe ' + address
        : 'port ' + address.port;
    
    debug('Listening on '+ bind);
}
