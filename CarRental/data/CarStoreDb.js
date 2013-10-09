function() {
    document.addEventListener("deviceready", init, false);

    var app = {};

    app.db = null;

    app.openDb = function() {
        if (window.sqlitePlugin !== undefined) {
            app.db = window.sqlitePlugin.openDatabase("CarStoreDb");
        }
        else {
            app.db = window.openDatabase("CarStoreDb", "1.0", "Car Store", 200000);
        }
    }

    app.createTable = function() {
        app.db.transaction(function(tx) {
            tx.executeSql("CREATE TABLE IF NOT EXISTS Cars (id INTEGER PRIMARY KEY ASC, name TEXT, taken BIT )", []);
        });
    }

    app.insertRecord = function(t) {
        app.db.transaction(function(tx) {
            tx.executeSql("INSERT INTO Cars(name,taken VALUES (?,?)",
                          [t, 0],
                          app.onSuccess,
                          app.onError);
        });
    }

    app.onSuccess = function(tx, r) {
        console.log("Your SQLite query was successful!");
    }

    app.onError = function(tx, e) {
        console.log("SQLite Error: " + e.message);
    }

    app.updateRecord = function(id, t) {
        app.db.transaction(function(tx) {
            tx.executeSql("UPDATE Cars SET taken = ? WHERE id = ?",
                          [t, id],
                          app.onSuccess,
                          app.onError);
        });
    }

    app.selectAllRecords = function(fn) {
        app.db.transaction(function(tx) {
            tx.executeSql("SELECT * FROM Cars ORDER BY id", [],
                          fn,
                          app.onError);
        });
    }
    
    function init() {
        app.openDb();
        app.createTable();
        app.insertRecord("Opel");
        app.insertRecord("VW");
        app.insertRecord("Mercedes");
    }
}();