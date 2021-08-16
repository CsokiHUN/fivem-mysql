local MYSQL_RESOURCE_NAME = "mysql"

function dbQuery(callback, queryString, ...)
	if type(callback) == "string" then
		args = queryString
		queryString = callback
		callback = nil
	end

	local args = { ... }
	if type(args[1]) == "table" then
		args = args[1]
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

function dbExec(queryString, ...)
	local args = { ... }
	if type(args[1]) == "table" then
		args = args[1]
	end

	return exports[MYSQL_RESOURCE_NAME]:exec(queryString, args)
end
