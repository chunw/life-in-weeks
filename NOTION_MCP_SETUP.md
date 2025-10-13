# Notion MCP Setup Learning

## Issue
Notion MCP server was not recognized by Claude Code after initial configuration.

## Root Cause
Claude Code requires a full restart to load newly configured MCP servers. The MCP configuration is only read at startup.

## Solution
**Quit Claude Code completely and reopen** (not just reload/refresh the window).

## Technical Details

### Configuration Location
MCP servers are configured in Claude Code's settings (typically in user configuration).

### Available Notion MCP Functions
After successful setup, the following tools become available:
- `mcp__notion__API-get-user` - Retrieve a user
- `mcp__notion__API-get-users` - List all users
- `mcp__notion__API-get-self` - Retrieve bot user
- `mcp__notion__API-post-database-query` - Query databases
- `mcp__notion__API-post-search` - Search by title
- `mcp__notion__API-get-block-children` - Retrieve block children
- `mcp__notion__API-patch-block-children` - Append block children
- `mcp__notion__API-retrieve-a-block` - Retrieve a block
- `mcp__notion__API-update-a-block` - Update a block
- `mcp__notion__API-delete-a-block` - Delete a block
- `mcp__notion__API-retrieve-a-page` - Retrieve page details
- `mcp__notion__API-patch-page` - Update page properties
- `mcp__notion__API-post-page` - Create a page
- `mcp__notion__API-create-a-database` - Create a database
- `mcp__notion__API-update-a-database` - Update a database
- `mcp__notion__API-retrieve-a-database` - Retrieve a database
- `mcp__notion__API-retrieve-a-page-property` - Retrieve page property
- `mcp__notion__API-retrieve-a-comment` - Retrieve comments
- `mcp__notion__API-create-a-comment` - Create comment

## Key Takeaway
**MCP servers require a full Claude Code restart to be recognized.** Configuration changes are not hot-reloaded.

## Verification
After restart, confirm MCP tools are available by checking that function names starting with `mcp__notion__` appear in the available tools list.

---
*Date: 2025-10-12*