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
        url: "https://sheets.googleapis.com/v4/spreadsheets/1uShSag-OAerOkvDI46EeD8vCj9goGhNtrymSLwKaddM/values/MC%20History!A2:C?key=" + API_KEY,
        async: false,
        success: function(res) {
            var rows1 = res.values;
            var rows = [];
            for(var c of rows1) {
                rows.splice(0, 0, c);
            }
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
                str += "</tr>";
            }
            $("#divMCOny").find("tbody").html(str);
        }
    });
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
            str += "</tr>";
        }
        $(".epgpTable").find("div[data-name='active']").find("tbody").html(str);
    })
})
$("#nameSearchInput").bind('input propertychange', function() {
    var searchArr = [];
    //console.log($(this).val());
    for(var c of store) {
        var boo = $("#dateSearchInput").val() == "" ? true : c[2].indexOf($("#dateSearchInput").val()) != -1;
        if(c[0].indexOf($(this).val()) != -1 && boo) {
            searchArr.push(c);
        }
    }
    if($(this).val() == "") {
        if($("#dateSearchInput").val() == "") {
            var str = "";
            for(var i = 0; i < store.length; i++) {
                str += "<tr>";
                var col = store[i];
                //var col = rows[i].split(",");
                for(var j = 0; j < col.length; j++) {
                    str += "<td>" + col[j] + "</td>";
                }
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
                str += "</tr>";
            }
            $(".epgpTable").find("div[data-name='active']").find("tbody").html(str);
        }
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
            str += "</tr>";
        }
        $(".epgpTable").find("div[data-name='active']").find("tbody").html(str);
    }
});
$("#dateSearchInput").bind('input propertychange', function() {
    var searchArr = [];
    //console.log($(this).val());
    for(var c of store) {
        var boo = $("#nameSearchInput").val() == "" ? true : c[0].indexOf($("#nameSearchInput").val()) != -1;
        if(c[2].indexOf($(this).val()) != -1 && boo) {
            searchArr.push(c);
        }
    }
    if($(this).val() == "") {
        if($("#nameSearchInput").val() == "") {
            var str = "";
            for(var i = 0; i < store.length; i++) {
                str += "<tr>";
                var col = store[i];
                //var col = rows[i].split(",");
                for(var j = 0; j < col.length; j++) {
                    str += "<td>" + col[j] + "</td>";
                }
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
                str += "</tr>";
            }
            $(".epgpTable").find("div[data-name='active']").find("tbody").html(str);
        }    
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
            str += "</tr>";
        }
        $(".epgpTable").find("div[data-name='active']").find("tbody").html(str);
    }
});