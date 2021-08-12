local MYSQL_RESOURCE_NAME = "mysql"

function dbQuery(callback, queryString, args)
	if type(callback) == "string" then
		args = queryString
		queryString = callback
		callback = nil
	end

	if callback then
		return exports[MYSQL_RESOURCE_NAME]:query(queryString, args, callback)
	else
		local p = promise.new()

		exports[MYSQL_RESOURCE_NAME]:query(queryString, args, function(...)
			p:resolve(...)
		end)

		return Citizen.Await(p)
	end
end

function dbExec(...)
	return exports[MYSQL_RESOURCE_NAME]:exec(...)
end
