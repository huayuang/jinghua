/**
 * Created by Administrator on 2017-04-14.
 */
(function(w){
function Qi(){}
Qi.prototype = {
    //复杂单个或者多个构造函数及其函数对象实例的属性或者方法到新的对象
    extend:function(){
        var len = arguments.length;
        if(len===0){
            return
        }else if(len===1){
            return arguments[0];
        }else{
            var target = arguments[0];
            for(var i = 1;i<len;i++){
                for(var k in arguments[i]){
                    target[k] = arguments[i][k];
                }
            }
            return target;
        }
        },

    //查询location参数
    queryHerf: function () {
        var json = {};
        var sub = window.location.search.substring(1);
        var sp = sub.split("&");
        for(var i = 0,len = sp.length;i<len;i++){
           var index = sp[i].indexOf("=");
           if(index<0)continue;
           var key = sp[i].substring(0,index);
           var value = sp[i].substring(index+1);
           json[key] = value;
        }
        return json;
    }
}


//框架的实例对象
var qi = new Qi();

//选择器框架
qi.extend(qi,{
    //class属性选择器
    $class: function (name,id) {
        var dom = document;
        if(typeof id === "object"){
            dom = id;
        }else{
            if(id){
                dom= document.getElementById(id);
            }
        }
       var arr = [];
       if(dom.getElementsByClassName){
           arr = dom.getElementsByClassName(name);
       }else{
           var all = dom.getElementsByTagName("*");
           for(var i = 0,len=all.length;i<len;i++){
               if(all[i].className === name){
                   arr.push(all[i]);
               }
           }
       }
        return arr;
    },
    //id属性选择器
    $id: function (name) {
        return document.getElementById(name);
    },
    //缩小搜索范围
    $tag: function (name,id) {
        var $id = document;
        if(typeof id === "object"){
            $id = id;
        }else{
            if(id){
                $id = document.getElementById(id);
            }
        }
        return $id.getElementsByTagName(name);
    },
    //多种样式选择器
    $dom: function (content) {
        var split = content.split(",");
        var arr = [];
        for(var i in split){
            var s = split[i].charAt(0);
            if(s==="."){
                var classArr = Array.prototype.slice.call(this.$class(split[i].slice(1)));
                arr = arr.concat(classArr);
            }else if(s==="#"){
                var dom2 = this.$id(split[i].slice(1));
                arr.push(dom2);
            }else{
                var tagArr = Array.prototype.slice.call(this.$tag(split[i]));
                arr = arr.concat(tagArr);
            }
        }
        return arr;
    },
    //后代选择器
    $afterNodes: function (content) {
        var split = content.split(" ");
        var context = [];
        var result = [];
        for(var i in split){
            var s = split[i].charAt(0);
            var ts = split[i].slice(1);
            if(s==="#"){
                var dom1 = qi.$id(ts);
                context = [dom1];
            }else if(s==="."){
                result = [];
                if(context.length>0){
                    for(var j in context){
                        var dom2 = qi.$class(ts,context[j]);
                        result = pushArray(dom2,result);
                        context = result;
                    }
                }
                else{
                    var dom2 = qi.$class(ts);
                    if(dom2.length==0)return[];
                    result = pushArray(dom2,result);
                    context = result;
                }

            }else{
                result = [];
                if(context.length>0){
                for(var f in context) {
                    alert(context.length + "qq")
                    var dom3 = qi.$tag(split[i], context[f]);
                    result = pushArray(dom3, result);
                    context = result;
                }
                }else{
                    var dom3 = qi.$tag(split[i]);
                    if(dom3.length==0)return[];
                    result = pushArray(dom3,result);
                    context = result;
                }
            }
        }
        function pushArray(domArr,resultArr){
            for(var q = 0;q<domArr.length;q++){
                resultArr.push(domArr[q]);
            }
            return resultArr;
        }
        return context;
    }

})

//字符串框架
qi.extend(qi,{
    //去除前后空格
    trim: function (str) {
        return str.replace(/^(\s*)|(\s*)$/g,"");
    },
    //产生指定范围随机数
    random:function(start,end){
        return Math.floor(Math.random()*(end-start+1)+start);
    },
    //数据绑定到html模块化 str模块化字符串  data后台json对象
    formatString: function (str,data) {
        return str.replace(/@\((\w+)\)/g, function (match,key) {
            return typeof data[key] === 'undefined'?"":data[key];
        });
    },
})

//事件框架
qi.extend(qi,{
    //on绑定事件
    on: function (id,type,fn) {
        var ele = Object.prototype.toString.call(id)==="[object String]"?document.getElementById(id):id;
        if(ele.addEventListener){
            ele.addEventListener(type,fn,false);
        }else if(ele.attachEvent){
            //兼容ie
            ele.attachEvent("on"+type,fn);
        }
    },
    //移除事件
    un: function (id,type,fn) {
        var ele = document.getElementById(id);
        if(ele.removeEventListener){
            ele.removeEventListener(type,fn);
        }else if(ele.detachEvent){
            //兼容ie
            ele.detachEvent(type,fn);
        }
    },
    //hover事件
    hover: function (id,fn1,fn2) {
        if (fn1)this.on(id, "mouseover", fn1);
        if (fn2)this.on(id, "mouseout", fn2);
    },
    //mouseout事件
    mouseout: function (id,fn) {
        this.on(id,"mouseout",fn);
    },
    //mouseover事件
    mouseover: function (id,fn) {
        this.on(id,"mouseover",fn);
    },
    //click事件
    click: function (id,fn) {
        this.on(id,"click",fn);
    },
    //event兼容方式获取
    getEvent: function (e) {
        return e||window.event;
    },
    //target兼容方式获取
    getTarget: function (e) {
        var event = this.getEvent(e);
        return event.target||event.srcElement;
    },
    //阻止冒泡
    stopPropagation: function (e) {
        var event = this.getEvent();
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble = true;
        }
    },
    //阻止默认行为
    preventDefault: function (e) {
        var event = this.getEvent();
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
    }
});

//样式设置框架
qi.extend(qi,{
    setStyle: function (dom,key,value) {
        dom = typeof dom ==="string"?document.querySelector(dom):dom;
        dom.style[key] = value;
    },
    getStyle: function (dom,key) {
        dom = typeof dom ==="string"?document.querySelector(dom):dom;
        if(dom.currentStyle){
           return dom.currentStyle[key];
        }else{
            return window.getComputedStyle(dom)[key];
        }
    },
    css: function (dom,key,value) {
        dom = Array.prototype.slice.call(dom);
        if(dom instanceof Array){
            if(value){
                for(var i=0;i<dom.length;i++){
                    qi.setStyle(dom[i],key,value);
                }
            }else{
                qi.getStyle(dom,key);
            }
        }else{
            if(!value){
               qi.getStyle(dom,key);
            }else{
               qi.setStyle(dom,key,value);
            }
        }
    }
});

//属性框架
qi.extend(qi,{
    attr: function (dom,key,value) {
        var $2 = document.querySelector(dom);
        if(value){
            for(var i = 0;i<$2.length;i++){
                $2[i].setAttribute(key,value);
            }
        }else{
            return $2[0].getAttribute(key);
        }
    }
})

//html5本地存储框架

//封装json框架

qi.extend(qi,{
    //将json转换成字符串
    sjson:function (json) {
        return JSON.stringify(json);
    },
    //将字符串转成json
    json:function (str) {
        return eval(str);
    }
})

//缓存框架 - 内存篇
qi.cache = {
    data:[],
    get:function(key){
        console.log('111')
        var value = null;
        console.log(this.data)
        for(var i= 0,len=this.data.length;i<len; i++){
            var item = this.data[i]
            if (key == item.key) {
                value = item.value;
            }
        }
        console.log('get'+value)
        return value;
    },
    add:function(key,value){
        var json= { key: key, value: value};
        this.data.push(json);
    },
    delete:function(key){
        var status = false;
        for(var i= 0,len=this.data.length;i<len; i++){
            var item = this.data[i]
            // 循环数组元素
            if (item.key.trim() == key) {
                this.data.splice(i, 1);//开始位置,删除个数
                status = true;
                break;
            }
        }
        return status;
    },
    update:function(key,value){
        var status = false;
        // 循环数组元素
        for(var i= 0,len=this.data.length;i<len; i++){
            var item = this.data[i]
            if (item.key.trim() === key.trim()) {
                item.value = value.trim();
                status = true;
                break;
            }
        }
        return status;
    },
    isExist:function(key){
        for(var i= 0,len=this.data.length;i<len; i++){
            var item = this.data[i]
            if (key === item.key) {
                return true;
            }else{
                return false;
            }
        }
    }
}

//cookie框架
qi.cookie = {
    //设置coolie
    setCookie: function (name,value,days,path){
        var name = escape(name);
        var value = escape(value);
        var expires = new Date();
        expires.setTime(expires.getTime() + days*24*60*60*1000);
        path = path == "" ? "" : ";path=" + path;
        _expires = (typeof hours) == "string" ? "" : ";expires=" + expires.toUTCString();
        document.cookie = name + "=" + value + _expires + path;
    },
    //获取cookie值
    getCookie:function (name){
        var name = escape(name);
        //读cookie属性，这将返回文档的所有cookie
        var allcookies = document.cookie;

        //查找名为name的cookie的开始位置
        name += "=";
        var pos = allcookies.indexOf(name);
        //如果找到了具有该名字的cookie，那么提取并使用它的值
        if (pos != -1){                                             //如果pos值为-1则说明搜索"version="失败
            var start = pos + name.length;                  //cookie值开始的位置
            var end = allcookies.indexOf(";",start);        //从cookie值开始的位置起搜索第一个";"的位置,即cookie值结尾的位置
            if (end == -1) end = allcookies.length;        //如果end值为-1说明cookie列表里只有一个cookie
            var value = allcookies.substring(start,end);  //提取cookie的值
            return unescape(value);                           //对它解码
        }
        else return "";                                             //搜索失败，返回空字符串
    },
    //删除cookie
    deleteCookie:function (name,path){
        var name = escape(name);
        var expires = new Date(0);
        path = path == "" ? "" : ";path=" + path;
        document.cookie = name + "="+ ";expires=" + expires.toUTCString() + path;
    }
}

//本地存储框架
qi.store = (function () {
    var api               = {},
        win               = window,
        doc               = win.document,
        localStorageName  = 'localStorage',
        globalStorageName = 'globalStorage',
        storage;

    api.set    = function (key, value) {};
    api.get    = function (key)        {};
    api.remove = function (key)        {};
    api.clear  = function ()           {};

    if (localStorageName in win && win[localStorageName]) {
        storage    = win[localStorageName];
        api.set    = function (key, val) { storage.setItem(key, val) };
        api.get    = function (key)      { return storage.getItem(key) };
        api.remove = function (key)      { storage.removeItem(key) };
        api.clear  = function ()         { storage.clear() };

    } else if (globalStorageName in win && win[globalStorageName]) {
        storage    = win[globalStorageName][win.location.hostname];
        api.set    = function (key, val) { storage[key] = val };
        api.get    = function (key)      { return storage[key] && storage[key].value };
        api.remove = function (key)      { delete storage[key] };
        api.clear  = function ()         { for (var key in storage ) { delete storage[key] } };

    } else if (doc.documentElement.addBehavior) {
        function getStorage() {
            if (storage) { return storage }
            storage = doc.body.appendChild(doc.createElement('div'));
            storage.style.display = 'none';
            // See http://msdn.microsoft.com/en-us/library/ms531081(v=VS.85).aspx
            // and http://msdn.microsoft.com/en-us/library/ms531424(v=VS.85).aspx
            storage.addBehavior('#default#userData');
            storage.load(localStorageName);
            return storage;
        }
        api.set = function (key, val) {
            var storage = getStorage();
            storage.setAttribute(key, val);
            storage.save(localStorageName);
        };
        api.get = function (key) {
            var storage = getStorage();
            return storage.getAttribute(key);
        };
        api.remove = function (key) {
            var storage = getStorage();
            storage.removeAttribute(key);
            storage.save(localStorageName);
        }
        api.clear = function () {
            var storage = getStorage();
            var attributes = storage.XMLDocument.documentElement.attributes;;
            storage.load(localStorageName);
            for (var i=0, attr; attr = attributes[i]; i++) {
                storage.removeAttribute(attr.name);
            }
            storage.save(localStorageName);
        }
    }
    return api;
})();
    w.qi = qi;
})(window)
