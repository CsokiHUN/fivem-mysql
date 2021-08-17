local MYSQL_RESOURCE_NAME = "mysql"

function dbQuery(callback, queryString, ...)
	local args = { ... }

	if type(callback) == "string" then
		args = { queryString, table.unpack(args) }
		queryString = callback
		callback = nil
	end

	args = type(args[1]) == "table" and args[1] or args

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
	args = type(args[1]) == "table" and args[1] or args

	return exports[MYSQL_RESOURCE_NAME]:exec(queryString, args)
end
