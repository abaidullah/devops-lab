var db = require('../../config/database.js');
exports.index = function(req, res) {
    var query =  "SELECT * FROM staff" ;
    var conditions = [ "firstname","lastname" , "wage" ];
    if("fields" in req.query)
    {
        query = query.replace("*", req.query["fields"]);
    }
    for ( var index in conditions) {
        if (conditions[index]  in req.query) {
            if (query.indexOf( "WHERE" ) <  0  ) {
                query +=  " WHERE";
            }  else {
                query +=  " AND";
            }
            query +=  " " + conditions[index] +  "='" +
                req.query[conditions[index]] +  "'" ;
        }
    }

    // sorting
    if( "sort" in req.query){
        var sort = req.query[ "sort" ].split( "," );
        query +=  " ORDER BY" ;
        for ( var index  in sort) {
            var direction = sort[index].substr( 0  ,  1  );
            var field = sort[index].substr( 1  );
            query+=  " " + field;
            if (direction ==  "-")
                query +=  " DESC," ;
            else
                query +=  " ASC," ;
        }
        query = query.slice( 0  ,  -1 );
    }
    // limit offset on query
    if ( "limit" in req.query) {
        query +=  " LIMIT " + req.query[ "limit" ];
        if ( "offset" in req.query) {
            query += " OFFSET " + req.query[ "offset" ];
        }
    }
    db.query(query,  function (err, result, fields) {
        if(err) throw err;
        res.send( JSON.stringify(result));
    });
};
exports.show = function(req, res) {
    var id = req.params.id;
    var query = "SELECT * FROM `staff` WHERE id=" + id;
    if("fields" in req.query)
    {
        query = query.replace("*", req.query["fields"]);
    }
    db.query(query, function(err, result, fields) {
        if(err) throw err;
        if (result.length >  0  ) {
            res.send(JSON.stringify(result));
        }
        else{
            res.send( "Access denied" );
        }
    });
};

exports.create = function(req, res) {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var wage = req.body.wage;
    var query =  "INSERT INTO `staff` (`firstname`, `lastname`, `wage`) VALUES ('"+firstname+"','" + lastname +  "',"+wage+")";
    db.query(query,  function (err, result, fields) {
        if (err) throw err;
        res.send( JSON.stringify( "Success" ));
    });
};

//
exports.delete = function(req, res) {
    var id = req.params.id;
    var query =  "DELETE FROM `staff` WHERE id=" + id;
    db.query(query,  function (err, result, fields) {
        if (err)  throw err;
        res.send(JSON.stringify( "Success" ));
    });
};
//
exports.delete_all = function(req, res) {
    var query =  "DELETE FROM `staff`" ;
    db.query(query,  function (err, result, fields) {
        if(err)  throw err;
        res.send(JSON.stringify( "Success" ));
    });
};

//
exports.update = function(req, res) {
    var id = req.params.id;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var wage = req.body.wage;
    var updates="";
    if(firstname)
    {updates +=" "+"`firstname`='"+firstname+"' ,"}
    if(lastname)
    {updates +=" "+"`lastname`='"+lastname+"' ,"}
    if(wage)
    {updates +=" "+"`wage`="+wage+" ,"}
    updates=updates.substr(0, updates.length-1);
    var query =  "UPDATE `staff` SET "+updates+" WHERE ID="+id;
    db.query(query,  function (err, result, fields) {
        if (err) throw err;
        res.send( JSON.stringify( "Success" ));
    });
};
