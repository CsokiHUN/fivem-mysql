## MySQL JavaScript middleware for FiveM

#### This script is significantly faster than [mysql-async](https://github.com/brouznouf/fivem-mysql-async 'mysql-async') based on my testing.

# Install / Configure

##### 1. Set the connection datas in settings.json file

> for example:

```json
{
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "roleplay"
}
```

##### 2. Add this resource import.lua file to your resource

> _fxmanifest.lua_

```lua
server_script  '@mysql/import.lua'
```

# Functions

### dbQuery

**Arguments**

-   callback: function, returns mysql query result
-   queryString: string
-   args: table

```lua
dbQuery(callback, queryString, args)
```

**Example**

```lua
dbQuery(
	function(result)
	  print(#result) --print result table lenght
	end,
	"SELECT * FROM users WHERE identifier = ? LIMIT 1",
	{
		identifier,
	}
)
```

---

### dbExec

**Arguments:**

-   queryString: string
-   args: table

**Returns:**

boolean, (note: if it runs successfully it returns a true value)

```lua
dbExec(queryString, args)
```

**Example**

```lua
dbExec("INSERT INTO users SET name = ?", {
	GetPlayerName(player),
})
```
