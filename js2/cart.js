/**
 * Created by Administrator on 2017-04-12.
 */
function Cart(option){
    this._init(option);
}

Cart.prototype = {
    _init: function (option) {
        this.num = option.num||0;
        this.count = option.count||0;
        this.products = option.products||[];
        //Object.defineProperty(this,"num",{value:8,writable:false});
        Object.defineProperty(this,"num",
            {
            get: function () {
                return num+10;
            },
            set: function (value) {
                if(value>20){
                    alert("dale")
                }else {
                    num = value;
                }
            }
        });
    },
    getSum: function () {
        return this.products.length;
    },
    getCount: function () {
        var count = 0;
        this.products.forEach(function (item,index) {
            count += item.newPrice;
        });
        return count;
    },
    bindBasic: function () {
        this.num = 15;
        var cartprice = document.querySelector("#cartprice");
        $(".cartsum").html(this.getSum());
        $(cartprice).html(this.getCount());

    },
    bindProduct: function () {
        var str = "";
        for(var i = 0;i<this.products.length;i++){
            str += "<div class='cart_box'>";
            str += "<div class='message'>";
            str += "<div class='alert-close'> </div>";
            str += "<div class='list_img'><img src="+this.products[i].imgSrc[0].small+" class='img-responsive' alt=''></div>";
            str += "<div class='list_desc'><h4><a href='#'>"+this.products[i].title+"</a></h4>1 x<span class='actual'>";
            str += ""+this.products[i].newPrice+"</span></div>";
            str += "<div class='clearfix'></div>";
            str += "</div>";
            str += "</div>";
        }
        return str;
    }
}