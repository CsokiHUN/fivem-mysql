local MYSQL_RESOURCE_NAME = "mysql"

function dbQuery(callback, queryString, args)
	if type(callback) == "string" then
		args = queryString
		queryString = callback
		callback = nil
	end

	return exports[MYSQL_RESOURCE_NAME]:query(queryString, args, callback)
end

function dbExec(...)
	return exports[MYSQL_RESOURCE_NAME]:exec(...)
end
