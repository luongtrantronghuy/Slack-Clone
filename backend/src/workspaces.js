const db = require('./db');

exports.getWorkspaces = async (req, res) => {
  const workspaces = await db.getWorkspaces(req.user.access, req.query.code);
  if (workspaces) {
    res.status(200).json(workspaces);
  } else {
    res.status(404).send();
  }
};
