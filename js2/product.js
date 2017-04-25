/**
 * Created by Administrator on 2017-04-12.
 */
function Product(option){
    this._init(option);
}
Product.prototype = {
    _init: function (option) {
        this.title = option.title||"";
        this.oldPrice = option.oldPrice||0;
        this.newPrice = option.newPrice||0;
        this.des = option.des||"";
        this.count = option.count||399;
        this.imgSrc = option.imgSrc||[];
    },
    bindBasic: function () {
        var pname = document.querySelector("#pname");
        var buyCount = document.querySelector("#buyCount");
        var price = document.querySelector("#price");
        var groupPrice = document.querySelector("#groupPrice");
        var description = document.querySelector("#description");
        pname.innerHTML=this.title;
        buyCount.innerHTML=this.count;
        price.innerHTML=this.oldPrice;
        groupPrice.innerHTML=this.newPrice;
        description.innerHTML=this.des;
    },
    bindImg: function () {
        var etalage = document.querySelector("#etalage");
        var imgNew = this.imgSrc;
        var img = {sss:imgNew}
        var str = "";
            str += "{{each sss}}"
            str += "<li>";
            str += "<img class=etalage_thumb_image src='$value.big'/>";
            str += "<img class=etalage_source_image src='$value.small'/>";
            str += "</li>";
        str+="<div class=clearfix> </div>"
        str += "{{/each}}";

        //etalage.innerHTML=str;
        cast.artTemplate(str,img,"etalage");

        $('#etalage').etalage({
            thumb_image_width: 300,
            thumb_image_height: 400,

            show_hint: true,
            click_callback: function(image_anchor, instance_id){
                alert('Callback example:\nYou clicked on an image with the anchor: "'+image_anchor+'"\n(in Etalage instance: "'+instance_id+'")');
            }
        });
    }
}
