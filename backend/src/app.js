const express = require('express');
const cors = require('cors');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const OpenApiValidator = require('express-openapi-validator');

const auth = require('./auth');
const channels = require('./channels');
const user = require('./user');
const workspaces = require('./workspaces');
const dms = require('./dms');
const message = require('./message');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const apiSpec = path.join(__dirname, '../api/openapi.yaml');

const apidoc = yaml.load(fs.readFileSync(apiSpec, 'utf8'));
app.use('/v0/api-docs', swaggerUi.serve, swaggerUi.setup(apidoc));

app.post('/authenticate', auth.authenticate);

app.use(
    OpenApiValidator.middleware({
      apiSpec: apiSpec,
      validateRequests: true,
      validateResponses: true,
    }),
);

// Your routes go here
app.get('/v0/channels', auth.check, channels.getAll);
app.get('/v0/channels/:channel:thread', auth.check, channels.getMessage);
app.post('/v0/channels/:channel:thread', auth.check, channels.sendMessage);
app.get('/v0/user', auth.check, user.getUser);
app.get('/v0/workspaces', auth.check, workspaces.getWorkspaces);
app.get('/v0/dm/:username', auth.check, dms.getDM);
app.post('/v0/dm/:username:thread', auth.check, dms.sendDM);
app.get('/v0/message', auth.check, message.findMessage);

app.use((err, req, res, next) => {
  res.status(err.status).json({
    message: err.message,
    errors: err.errors,
    status: err.status,
  });
});

module.exports = app;
