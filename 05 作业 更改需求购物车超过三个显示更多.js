//页面特效
//弹出层
$(document).ready(function(c) {
    $('.alert-close').on('click', function(c){
        $('.message').fadeOut('slow', function(c){
            $('.message').remove();
        });
    });
});

$(document).ready(function(c) {
    $('.alert-close1').on('click', function(c){
        $('.message1').fadeOut('slow', function(c){
            $('.message1').remove();
        });
    });
});

$(document).ready(function(c) {
    $('.alert-close2').on('click', function(c){
        $('.message2').fadeOut('slow', function(c){
            $('.message2').remove();
        });
    });
});

//tab插件
$(document).ready(function () {
    $('#horizontalTab').easyResponsiveTabs({
        type: 'default', //Types: default, vertical, accordion
        width: 'auto', //auto or any width like 600px
        fit: true   // 100% fit in a container
    });
});

/*导航的关闭按钮*/
$(document).ready(function () {
    $('#activator').click(function(){
        $('#box').animate({'left':'0px'},500);
    });
    $('#boxclose').click(function(){
        $('#box').animate({'left':'-2300px'},500);
    });
});

$(document).ready(function(){

    //Hide (Collapse) the toggle containers on load
    $(".toggle_container").hide();

    //Switch the "Open" and "Close" state per click then slide up/down (depending on open/close state)
    $(".trigger").click(function(){
        $(this).toggleClass("active").next().slideToggle("slow");
        return false; //Prevent the browser jump to the link anchor
    });

});









//页面的业务逻辑


/*定义对象*/
//定义产品对象
function Product(){
    this.name='HM休闲服登山包'
    this.description='棒棒的，棒棒的，登山一流，服务一流，你好，我好，他也好，太棒了，一口气等上珠穆朗玛峰'
    this.normalPrice=144
    this.groupbuyPrice=120
    this.buySum=100;
    this.images=[
        {small:'../images/s11.jpg',big:'../images/s11.jpg'},
        {small:'../images/s12.jpg',big:'../images/s12.jpg'},
        {small:'../images/s13.jpg',big:'../images/s13.jpg'}
    ]
}
Product.prototype={
    /*普通购买*/
    buy:function(){},
    bindDOMImage:function(){
        var str=''
        for(var i= 0,len=this.images.length;i<len;i++) {
            str+='<li>'
            str+='<img class="etalage_thumb_image" src="'+ this.images[i].small+'" class="img-responsive" />'
            str+='<img class="etalage_source_image" src="'+ this.images[i].small+'" class="img-responsive" />'
            str+='</li>'
        }
        $('#etalage').html(str)

        /*jquery插件实现的幻灯片特效*/
        $('#etalage').etalage({
            thumb_image_width: 300,
            thumb_image_height: 400,

            show_hint: true,
            click_callback: function(image_anchor, instance_id){
                alert('Callback example:\nYou clicked on an image with the anchor: "'+image_anchor+'"\n(in Etalage instance: "'+instance_id+'")');
            }
        });
        // This is for the dropdown list example:
        $('.dropdownlist').change(function(){
            etalage_show( $(this).find('option:selected').attr('class') );
        });
    },
    bindDOMDetail:function(){
        /*绑定元素*/
        $('#pname').html(this.name)
        $('#description').html(this.description)
        $('#price').html(this.normalPrice)
        $('#groupPrice').html(this.groupbuyPrice)
        $('#buyCount').html(this.buySum)
    },
    /*团购*/
    groupBuy:function(){},
    /*添加到购物车*/
    addCart:function(){

    }
}

/*定义购物车对象*/
function Cart(){
    this.products=[]
    this.sum=3
    this.allPrice=2000
}
Cart.prototype={
    bindBasic:function(){
        //绑定
        $('.cartsum').html(this.getSum())
        $('#cartprice').html(this.getAllPrice())
    },
    //绑定产品列表,每次点击到购物车执行的方法
    bindList:function(){
        var str=''
        var sum=0;
        if(this.products.length){
            sum = this.products.length;
            if(sum>3){
                sum=3;
            }
        }
        for(var i= 0;i<sum;i++){
            str+='<div class="cart_box">'
            str+='<div class="message">'
            str+=' <div class="alert-close"> </div>'
            str+=' <div class="list_img"> <img src="'+this.products[i].images[0].small+'" class="img-responsive" alt=""/> </div>'
            str+=' <div class="list_desc"><h4><a href="#">'+this.products[i].name+'</a></h4><span class="actual">'+ this.products[i].groupbuyPrice+'</span></div>'
            str+=' <div class="clearfix"></div>'
            str+='  </div>'
            str+='   </div>'
        }
        if(sum>3){
            str+='<a>更多</a>'
        }
        $('.shopping_cart').html(str)

    },
    /*结算*/
    calcalate:function(){},
    /*获取产品个数*/
    getSum:function(){
        this.sum=this.products.length;
        return this.sum;
    },
    /*获取产品总价*/
    getAllPrice:function(){
        for(var i= 0,len=this.products.length;i<len;i++){
            this.allPrice+=this.products[i].groupbuyPrice;
        }
        return this.allPrice;
    }

}


$(document).ready(function(){

    /*开始编程*/
    /*产品相关*/
    /*实例化*/
    var product =  new Product()
    product.name='HM休闲服登山包33'
    product.description='棒棒的，棒棒的，登山一流，服务一流，你好，我好，他也好，太棒了，一口气等上珠穆朗玛峰'
    product.normalPrice=144
    product.groupbuyPrice=120
    product.buySum=100;
    product.images=[
        {small:'../images/s11.jpg',big:'../images/s11.jpg'},
        {small:'../images/s12.jpg',big:'../images/s12.jpg'},
        {small:'../images/s13.jpg',big:'../images/s13.jpg'}
    ]
    /*使用对象中的方法属性*/
    product.bindDOMDetail()
    product.bindDOMImage()

    /*绑定事件*/
    $('#btnaddcart').click(function(){
        /*购物车新增一个产品*/
        cart.products.push(product)
        ///*更新购物车 - 重新绑定购物车*/
        /*如果不封装，这里就可能产生代码重复*/
        cart.bindBasic()
        cart.bindList()
        $(window).scrollTop(0);
    });





    /*实例购物车*/
    var cart =  new Cart()
    cart.sum=3
    cart.allPrice=2000

    /*假设购物车中已经有三个产品*/
    cart.products.push(product)
    cart.products.push(product)
    cart.products.push(product)

    /*使用对象中的方法属性*/
    cart.bindBasic()
    cart.bindList()


});

