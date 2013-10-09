(function (global) {
    var mobileSkin = "",
        app = global.app = global.app || {};

    document.addEventListener("deviceready", function () {
        app.application = new kendo.mobile.Application(document.body, { layout: "tabstrip-layout" });
    }, false);

    app.changeSkin = function (e) {
        if (e.sender.element.text() === "Flat") {
            e.sender.element.text("Native");
            mobileSkin = "flat";
        }
        else {
            e.sender.element.text("Flat");
            mobileSkin = "";
        }

        app.application.skin(mobileSkin);
    };
    
    function getAllTheData() {
    var render = function (tx, rs) {
        // rs contains our SQLite recordset, at this point you can do anything with it
        // in this case we'll just loop through it and output the results to the console
        for (var i = 0; i < rs.rows.length; i++) {
            console.log(rs.rows.item(i));
        }
    }

    app.selectAllRecords(render);
}
    
})(window);