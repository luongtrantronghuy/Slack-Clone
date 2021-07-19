-- Index Your Tables Here --
CREATE INDEX channel_idx ON channels(channel);
CREATE INDEX user_idx ON users(info);
CREATE INDEX workspace_idx ON workspaces(title);
CREATE INDEX channelAccess_idx ON channelAccess(title);