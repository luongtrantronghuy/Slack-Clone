const db = require('./db');

/**
 * Get all Channels and Workspace name that user have access to
 * @param {*} req
 * @param {*} res
 */
exports.getWorkspaces = async (req, res) => {
  const workspaces = await db.getWorkspaces(req.user.access, req.query.code, req.user.username);
  if (workspaces) {
    res.status(200).json(workspaces);
  } else {
    res.status(404).send();
  }
};
