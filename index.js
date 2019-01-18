const express = require('express');
const morgan = require('morgan');

const projectsRouter = require('./routers/projectsRouter.js');
const actionsRouter = require('./routers/actionsRouter.js');

const server = express();

server.use(express.json());
server.use(morgan('short'));

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);


server.listen(6000, () => console.log('server up on 6000'));