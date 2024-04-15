
        //鼠标点击样式
        $(function () {
            var fontAll = [
                '加油',
                '努力',
                'c++',
                'html',
                'css',
                'js',
                'Jquery',
                'Dom',
                'java',
                'Node',
                'ES',
                'fight',
            ];
            var colorAll = [
                'red',
                'pink',
                'yellow',
                'blue',
                'aqua',
                'green',
                'gold',
                'brown',
                'grey',
                'orange',
            ];
            $(document).click(function (e) {
                var $span = $('<span>' + fontAll[Math.floor(Math.random() * fontAll.length)] + '</span>');
                $('body').append($span);
                $span.css('color', colorAll[Math.floor(Math.random() * colorAll.length)])
                var width = $span.width()
                var height = $span.height()
                var init = e.pageY - height / 2;
                $span.css({
                    left: e.pageX - width / 2 + 'px',
                    top: init + 'px'
                });
                $span.animate({
                    fontsize: 10 + 'px',
                    top: init - 150 + 'px',
                    opacity: 0.2
                }, 1000, function () {
                    $span.css('display', 'none');
                })
            });
        });
        //数码时钟上
        $(document).ready(function(){
    setInterval(function(){
        $("#clock").html("");
        var date=new Date();
        var month,dates,hours,min,seconds;
        month=(date.getMonth()+1);
        dates=date.getDate();
        hours=date.getHours();
        min=date.getMinutes();
        seconds=date.getSeconds();
        if(month<10){
            month="0"+month;
        }
        if(dates<10){
            dates="0"+dates;
        }
        if(hours<10){
            hours="0"+hours;
        }
        if(min<10){
            min="0"+min;
        }
        if(seconds<10){
            seconds="0"+seconds;
        }
        week=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
        var clocks=date.getFullYear()+"/"+month+"/"+dates+"/"+hours+":"+min+":"+seconds+" "+week[date.getDay()];
        $("#clock").append(clocks);
    },60)
})
//数码时钟下
$(document).ready(function(){
    setInterval(function(){
        $("p#clock2").html("");
        var date=new Date();
        var month,dates,hours,min,seconds;
        month=(date.getMonth()+1);
        dates=date.getDate();
        hours=date.getHours();
        min=date.getMinutes();
        seconds=date.getSeconds();
        if(month<10){
            month="0"+month;
        }
        if(dates<10){
            dates="0"+dates;
        }
        if(hours<10){
            hours="0"+hours;
        }
        if(min<10){
            min="0"+min;
        }
        if(seconds<10){
            seconds="0"+seconds;
        }
        week=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
        var clocks=hours+":"+min+":"+seconds+" ";
        $("p#clock2").append(clocks);
    },60)
})

//选项卡切换
$(function(){
    $('#nav2 h2').mouseover(function(e){
        $(this).attr('class','current').siblings().attr('class','');//选谁谁变为高亮显示，然后其他的变为空
        var myIndex=$(this).index();//选项卡标题的索引值等于下方内容的
        $('ul li').eq(myIndex).attr('class','current').siblings().attr('class','');
    });
})
//条条
$(document).ready(function() {
    setTimeout(function(){

        if(window.localStorage.getItem("stuName") !=null && window.localStorage.getItem("stuCode")){
            console.log("需要重新登录");
            window.localStorage.removeItem("stuName")
            window.localStorage.removeItem("stuCode")
            
            window.location.href = "login.html";
        }
        
    },120000)


    if(window.localStorage.getItem("stuName") == null){
        window.location.href = "login.html";
    }

    const divArray = $(".box");
    $(".box").each(function(index) {
        $(this).css("top", index * (window.innerHeight / 15) + "px"); // 修改这里，设置高度为屏幕高度的1/15px

    });
  
    for (let i= 0; i < divArray.length; i++) {
        const leftValue = (i * window.innerWidth) + "px"; 
        divArray.eq(i).css("left", leftValue);
    }

    
    function checkAndMove() {
        if (Array.isArray(divArray)) {
            if (divArray.every(function() { return parseFloat($(this).css("left")) === window.innerWidth - parseFloat($(this).css("width")); })) { // 修改这里，检查所有div的left值是否等于屏幕宽度减去它们自身的宽度，即检查它们是否已经到达了屏幕的最右边
                clearInterval(interval); 
            } else {   
                var nextIndex = Array.prototype.indexOf.call(divArray, this) + 1;
                if (nextIndex < divArray.length) {
                    var nextDiv = divArray[nextIndex];
                    nextDiv.css("left", parseFloat(nextDiv.css("left")) + window.innerWidth + "px"); 
                }
            }
        }
    }
    interval = setInterval(checkAndMove, 500); 

    $(".box").each(function(index) {
        if (index !== 0) {
        $(this).delay(index * 500).animate({
            width: "0",
            opacity: "0"
        }, 2000);
    }
    });
    var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    $("#div1").animate({
        opacity: "0",
        left: screenWidth + "px"
    }, 1000);
});
