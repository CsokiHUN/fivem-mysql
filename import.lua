local MYSQL_RESOURCE_NAME = "cs_mysql"

function dbQuery(callback, queryString, args)
	if type(callback) ~= "string" then
		args = queryString
		queryString = callback
		callback = nil
	end

	return exports[MYSQL_RESOURCE_NAME]:query(queryString, args, callback)
end

function dbExec(queryString, args)
	return exports[MYSQL_RESOURCE_NAME]:exec(queryString, args)
end
