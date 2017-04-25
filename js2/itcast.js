/**
 * Created by Administrator on 2017-04-13.
 */
function itcast(){}
itcast.prototype = {
    formatstring: function (str,date) {
        return str.replace(/@\((\w+)\)/g,function(match,key){
            return date[key];
        });
    },
    artTemplate: function (str, data,id) {
        var render = template.compile(str);
        var html = render(data);
        document.querySelector("#"+id).innerHTML = html;
    }
}
var cast = new itcast();