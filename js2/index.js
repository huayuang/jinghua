/**
 * Created by Administrator on 2017-04-12.
 */
$(function () {
    var product = new Product({
        title:"wwwww",
        oldPrice:399,
        newPrice:8,
        des:"fffe是粉色粉色发方法 ",
        count:399,
        imgSrc:[{big:"images/s11.jpg",small:"images/s11.jpg"},{big:"images/s12.jpg",small:"images/s12.jpg"},{big:"images/s13.jpg",small:"images/s13.jpg"},{big:"images/s11.jpg",small:"images/s11.jpg"},{big:"images/s12.jpg",small:"images/s12.jpg"}]
    });
    product.bindBasic();
    product.bindImg();

    var p1 = new Product({
        title:"aaa",
        oldPrice:399,
        newPrice:11,
        des:"fffe是粉色粉色发方法 ",
        count:399,
        imgSrc:[{big:"images/s11.jpg",small:"images/s11.jpg"},{big:"images/s12.jpg",small:"images/s12.jpg"},{big:"images/s13.jpg",small:"images/s13.jpg"},{big:"images/s11.jpg",small:"images/s11.jpg"},{big:"images/s12.jpg",small:"images/s12.jpg"}]
    });
    var p2 = new Product({
        title:"bbb",
        oldPrice:399,
        newPrice:12,
        des:"fffe是粉色粉色发方法 ",
        count:399,
        imgSrc:[{big:"images/s12.jpg",small:"images/s12.jpg"},{big:"images/s12.jpg",small:"images/s12.jpg"},{big:"images/s13.jpg",small:"images/s13.jpg"},{big:"images/s11.jpg",small:"images/s11.jpg"},{big:"images/s12.jpg",small:"images/s12.jpg"}]
    });
    var p3 = new Product({
        title:"ccc",
        oldPrice:399,
        newPrice:13,
        des:"fffe是粉色粉色发方法 ",
        count:399,
        imgSrc:[{big:"images/s13.jpg",small:"images/s13.jpg"},{big:"images/s12.jpg",small:"images/s12.jpg"},{big:"images/s13.jpg",small:"images/s13.jpg"},{big:"images/s11.jpg",small:"images/s11.jpg"},{big:"images/s12.jpg",small:"images/s12.jpg"}]
    });
    var p4 = new Product({
        title:"ccc",
        oldPrice:399,
        newPrice:13,
        des:"fffe是粉色粉色发方法 ",
        count:399,
        imgSrc:[{big:"images/s13.jpg",small:"images/s13.jpg"},{big:"images/s12.jpg",small:"images/s12.jpg"},{big:"images/s13.jpg",small:"images/s13.jpg"},{big:"images/s11.jpg",small:"images/s11.jpg"},{big:"images/s12.jpg",small:"images/s12.jpg"}]
    });
    var cart = new Cart({
        products:[p1,p2,p3,p4]
    });

    cart.bindBasic();
    var str = cart.bindProduct();
    document.querySelector(".shopping_cart").innerHTML = str;

    $("#btnaddcart").on("click" , function () {
        cart.products.push(p4);
        alert(cart.products.length);
        cart.bindBasic();
        var str = cart.bindProduct();
        document.querySelector(".shopping_cart").innerHTML = str;
        $(window).scrollTop(0);
    });
})