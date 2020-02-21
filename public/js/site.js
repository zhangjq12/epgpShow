var CLIENT_ID = '146326029241-q2dst2sg04ngo4b2da9v260imdpkss6s.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDfzFOGffCh_EeFbUhbB-t7PhO92vlUK1k';

var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

var store = [];
var storeMC = [];
var storeBWL = [];
var storeTAQ = [];
var storeNAXX = [];
var arr = [];

/*function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {

        console.log(1);
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

        gapi.auth2.getAuthInstance().signIn();
        console.log(2);
        //listMC();
        //console.log(3);
    }, function(error) {
        console.log("error");
    });
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        console.log("good");
        listMC();
    } else {
        console.log("made");
        gapi.auth2.getAuthInstance().signIn();
    }
}

function listMC() {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1uShSag-OAerOkvDI46EeD8vCj9goGhNtrymSLwKaddM',
        range: 'MC EPGP!A2:D',
    }).then(function(response) {
        var range = response.result;
        if (range.values.length > 0) {
            var str = "";
            for (i = 0; i < range.values.length; i++) {
                var row = range.values[i];
                str += "<tr>";
                for(var j = 0; j < row.length; j++) {
                    str += "<td>" + row[j] + "</td>";
                }
                var rp = parseFloat(row[2])/parseFloat(row[3]);
                str += "<td>" + rp.toString() + "</td>"
                str += "</tr>";
            }
            $("#divMCOny").find("tbody").html(str);
        } else {
            console.log("no data");
        }
    }, function(response) {
        console.log("error");
    });
}*/


$(document).on('click','th',function(){
    var table = $(this).parent().parent().parent();
    var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()));
    this.asc = !this.asc;
    if (!this.asc){rows = rows.reverse();}
    table.children('tbody').empty().html(rows);
});
function comparer(index) {
    return function(a, b) {
        var valA = getCellValue(a, index), valB = getCellValue(b, index);
        return $.isNumeric(valA) && $.isNumeric(valB) ?
            valA - valB : valA.localeCompare(valB);
    };
}
function getCellValue(row, index){
    return $(row).children('td').eq(index).text();
}
$(document).ready(function() {
    $("#divMCOny").attr("data-name", "active");
    $("#divBWL").attr("data-name", "none");
    $("#divTAQ").attr("data-name", "none");
    $("#divNAXX").attr("data-name", "none");
    $.ajax({
        type: "get",
        url: "https://sheets.googleapis.com/v4/spreadsheets/1uShSag-OAerOkvDI46EeD8vCj9goGhNtrymSLwKaddM/values/MC%20EPGP!A2:D?key=" + API_KEY,
        async: false,
        success: function(res) {
            var rows = res.values;
            storeMC = rows;
            for(var c of storeMC) {
                store.push(c);
            }
            var str = "";
            for(var i = 0; i < rows.length; i++) {
                str += "<tr>";
                var col = rows[i];
                //var col = rows[i].split(",");
                for(var j = 0; j < col.length; j++) {
                    str += "<td>" + col[j] + "</td>";
                }
                var rp = parseFloat(col[2])/parseFloat(col[3]);
                str += "<td>" + rp.toFixed(2).toString() + "</td>"
                str += "</tr>";
            }
            $("#divMCOny").find("tbody").html(str);
        }
    });
    /*$.get("https://sheets.googleapis.com/v4/spreadsheets/1uShSag-OAerOkvDI46EeD8vCj9goGhNtrymSLwKaddM/values/MC%20EPGP!A1:D?key=" + API_KEY, function(res) {
        //var rows = res.split(/\n/);
        var rows = res.values;
        var str = "";
        for(var i = 1; i < rows.length; i++) {
            str += "<tr>";
            var col = rows[i];
            //var col = rows[i].split(",");
            for(var j = 0; j < col.length; j++) {
                str += "<td>" + col[j] + "</td>";
            }
            var rp = parseFloat(col[2])/parseFloat(col[3]);
            str += "<td>" + rp.toString() + "</td>"
            str += "</tr>";
        }
        $("#divMCOny").find("tbody").html(str);
    });*/
    //console.log(store);
});
$("#dungeon").find("a").each(function() {
    $(this).click(function() {
        if($(this).attr("id") == "navMCOny") {
            store = [];
            for(var c of storeMC) {
                store.push(c);
            }
            arr = [];
            $("#divMCOny").attr("data-name", "active");
            $("#divBWL").attr("data-name", "none");
            $("#divTAQ").attr("data-name", "none");
            $("#divNAXX").attr("data-name", "none");
            $("#classSearch").find("a").each(function() { $(this).attr("class", "nav-item nav-link")});
            $("#nameSearchInput").val("");
        }
        else
        if($(this).attr("id") == "navBWL") {
            store = [];
            for(var c of storeBWL) {
                store.push(c);
            }
            arr = [];
            $("#divMCOny").attr("data-name", "none");
            $("#divBWL").attr("data-name", "active");
            $("#divTAQ").attr("data-name", "none");
            $("#divNAXX").attr("data-name", "none");
            $("#classSearch").find("a").each(function() { $(this).attr("class", "nav-item nav-link")});
            $("#nameSearchInput").val("");
        }
        else
        if($(this).attr("id") == "navTAQ") {
            store = [];
            for(var c of storeTAQ) {
                store.push(c);
            }
            arr = [];
            $("#divMCOny").attr("data-name", "none");
            $("#divBWL").attr("data-name", "none");
            $("#divTAQ").attr("data-name", "active");
            $("#divNAXX").attr("data-name", "none");
            $("#classSearch").find("a").each(function() { $(this).attr("class", "nav-item nav-link")});
            $("#nameSearchInput").val("");
        }
        else
        if($(this).attr("id") == "navNAXX") {
            store = [];
            for(var c of storeNAXX) {
                store.push(c);
            }
            arr = [];
            $("#divMCOny").attr("data-name", "none");
            $("#divBWL").attr("data-name", "none");
            $("#divTAQ").attr("data-name", "none");
            $("#divNAXX").attr("data-name", "active");
            $("#classSearch").find("a").each(function() { $(this).attr("class", "nav-item nav-link")});
            $("#nameSearchInput").val("");
        }
        var str = "";
        for(var i = 0; i < store.length; i++) {
            str += "<tr>";
            var col = store[i];
            //var col = rows[i].split(",");
            for(var j = 0; j < col.length; j++) {
                str += "<td>" + col[j] + "</td>";
            }
            var rp = parseFloat(col[2])/parseFloat(col[3]);
            str += "<td>" + rp.toFixed(2).toString() + "</td>"
            str += "</tr>";
        }
        $(".epgpTable").find("div[data-name='active']").find("tbody").html(str);
    })
})
$("#classSearch").find("a").each(function() {
    $(this).click(function() {
        if($(this).attr("class") == "nav-item nav-link active") {
            $(this).attr("class", "nav-item nav-link");
            var name = $(this).attr("id");
            var ind = 0;
            while(ind < arr.length) {
                if(arr[ind][1] == name) {
                    arr.splice(ind, 1);
                    ind --;
                }
                ind ++;
            }
            if(arr.length > 0) {
                var str = "";
                for(var i = 0; i < arr.length; i++) {
                    str += "<tr>";
                    var col = arr[i];
                    //var col = rows[i].split(",");
                    for(var j = 0; j < col.length; j++) {
                        str += "<td>" + col[j] + "</td>";
                    }
                    var rp = parseFloat(col[2])/parseFloat(col[3]);
                    str += "<td>" + rp.toFixed(2).toString() + "</td>"
                    str += "</tr>";
                }
                $(".epgpTable").find("div[data-name='active']").find("tbody").html(str);
            }
            else {
                var str = "";
                for(var i = 0; i < store.length; i++) {
                    str += "<tr>";
                    var col = store[i];
                    //var col = rows[i].split(",");
                    for(var j = 0; j < col.length; j++) {
                        str += "<td>" + col[j] + "</td>";
                    }
                    var rp = parseFloat(col[2])/parseFloat(col[3]);
                    str += "<td>" + rp.toFixed(2).toString() + "</td>"
                    str += "</tr>";
                }
                $(".epgpTable").find("div[data-name='active']").find("tbody").html(str);
            }
        }
        else {
            $(this).attr("class", "nav-item nav-link active");
            var name = $(this).attr("id");
            for(var c of store) {
                if(c[1] == name) {
                    arr.push(c);
                }
            }
            var str = "";
            for(var i = 0; i < arr.length; i++) {
                str += "<tr>";
                var col = arr[i];
                //var col = rows[i].split(",");
                for(var j = 0; j < col.length; j++) {
                    str += "<td>" + col[j] + "</td>";
                }
                var rp = parseFloat(col[2])/parseFloat(col[3]);
                str += "<td>" + rp.toFixed(2).toString() + "</td>"
                str += "</tr>";
            }
            $(".epgpTable").find("div[data-name='active']").find("tbody").html(str);
        }
    });
});
$("#nameSearchInput").bind('input propertychange', function() {
    var searchArr = [];
    //console.log($(this).val());
    for(var c of store) {
        if(c[0].indexOf($(this).val()) != -1) {
            searchArr.push(c);
        }
        /*var str = "";
        var value = $(this).val();
        for(var char of c[0]) {
            str += char;
        }
        var i = 0;
        var j = 0;
        var t = true;
        while(i < value.length) {
            //console.log(str.indexOf(value[i]));
            if(str.indexOf(value[i]) == -1) {
                i = value.length;
                t = false;
            }
            else {
                str = str.substr(str.indexOf(value[i]), str.length - str.indexOf(value[i]));
            }
            i++;
        }
        if(t) {
            searchArr.push(c);
        }*/
        //console.log(searchArr);
    }
    if($(this).val() == "") {
        var str = "";
        for(var i = 0; i < store.length; i++) {
            str += "<tr>";
            var col = store[i];
            //var col = rows[i].split(",");
            for(var j = 0; j < col.length; j++) {
                str += "<td>" + col[j] + "</td>";
            }
            var rp = parseFloat(col[2])/parseFloat(col[3]);
            str += "<td>" + rp.toFixed(2).toString() + "</td>"
            str += "</tr>";
        }
        $(".epgpTable").find("div[data-name='active']").find("tbody").html(str);
    }
    else {
        var str = "";
        for(var i = 0; i < searchArr.length; i++) {
            str += "<tr>";
            var col = searchArr[i];
            //var col = rows[i].split(",");
            for(var j = 0; j < col.length; j++) {
                str += "<td>" + col[j] + "</td>";
            }
            var rp = parseFloat(col[2])/parseFloat(col[3]);
            str += "<td>" + rp.toFixed(2).toString() + "</td>"
            str += "</tr>";
        }
        $(".epgpTable").find("div[data-name='active']").find("tbody").html(str);
    }
});