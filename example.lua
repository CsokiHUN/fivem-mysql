exports.mysql:query("SELECT * FROM users_2", {}, function(rows) end)

exports.mysql:query("SELECT * FROM users_2 WHERE firstname=?", { "Clark" }, function(rows) end)

exports.mysql:exec("UPDATE users_2 SET `group` = ?", { "asdasdasd" })
