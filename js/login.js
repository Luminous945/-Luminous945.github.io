
function onFucus() {
    var account = $("#account").val();
    if (account === "") {
        alert("请输入学号");
    }
}

function onBlur() {
    var password = $("#password").val();
    if (password === "") {
        alert("请输入密码");
    }
}

$(document).ready(function() {

    //星空
    const starsCount = 800; //星星数量
    const distance = 800;//间距
    const parentStarts = $("#stars");
    for (let i = 0; i < starsCount; i++) {
        const childStart = $("<div></div>");
        childStart.addClass('star');
        parentStarts.append(childStart);
    }
    for (let i = 0; i < starsCount; i++) {
        const item = parentStarts.children().eq(i);
        const speed = 0.2 + Math.random();
        const thisDistance = distance + Math.random() * 300;
        item.css({
            'transform-origin': `0 0 ${thisDistance}px`,
            'transform': `translate3d(0,0,-${thisDistance}px) rotateY(${Math.random() * 360}deg) rotateX(${Math.random() * -50}deg) scale(${speed},${speed})`
        });
    }
    //时间
    function updateTime() {
        var now = new Date();
        var year = now.getFullYear().toString().padStart(4, '0');
        var month = (now.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，所以需要加1
        var day = now.getDate().toString().padStart(2, '0');
        $('#time').text(year + '/' + month + '/' + day);
      }
      updateTime(); // 初始化时间
      setInterval(updateTime, 1000); // 每隔1秒更新一次时间

      //登录切换

      $("#loginBtn").click(function() {
        var isAccount = $("#account").val() !== "";
        var isPassword = $("#password").val() !== "";




        if (isAccount && isPassword) {
            $(".item button").css("opacity", "0");
            const parser = new UAParser();
    
            // 解析浏览器信息
            const browserInfo = parser.getBrowser();
            const browserName = browserInfo.name;


            if (browserName === "Edge") {
                console.log("使用了IE浏览器");
            } else if (browserName === "Firefox") {
                console.log("使用了火狐浏览器");
            } else if (browserName === "Google") {
                console.log("使用了谷歌浏览器");
            } else {
                browserName = 1;
            }

            if (browserName !== 1) {

                var person =  {
                    stuCode :  $("#account").val(),
                    password : $("#password").val()
                }
                axios.post("/stuLogin/" + browserName , person).then((res) => {
                    const stuCode = window.localStorage.getItem("ComProof")
                    if (res.data.code === 202391) {

                        if(res.data.data.id === Number(stuCode) || window.localStorage.getItem("ComProof") === "1"){
                            localStorage.setItem(
                            "stuName",
                            res.data.data.stuName
                            ),
                            localStorage.setItem(
                            "stuCode",
                            res.data.data.stuCode
                            )
                            localStorage.setItem(
                                "ComProof",
                                res.data.data.id
                            ),
                            window.location.href = "main.html";
                        }else{
                            axios.get("/stuLogin/" + res.data.data.stuName).then(res =>{
                                alert("不允许一台设备登录两个账号!");
                            })
                        }
                    } else if (res.data.code === 202390) {
                        alert("登录失败!学号或者密码错误!");
                        $(".item button").css("opacity", "1");
                    } else if (res.data.code === 202366) {
                        alert(res.data.data);
                        $(".item button").css("opacity", "1");
                    }
                });
                
                
               
            } else {
                alert("请使用要求的浏览器登录!");
                $(".item button").css("opacity", "0");
            }
        } else {
            if (!isAccount) {
                alert("请输入学号");
            }

            if (!isPassword) {
                alert("请输入密码");
            }
        }
    });


    const divArray = $(".box");
    $(".box").each(function(index) {
        $(this).css("top", index * (window.innerHeight / 15) + "px"); // 修改这里，设置高度为当前索引乘以屏幕高度的十分之一px

    });
    // 设置初始的left值
    for (let i= 0; i < divArray.length; i++) {
        const leftValue = (i * window.innerWidth) + "px"; // 修改这里，使每个div的移动距离等于屏幕宽度除以9（即每个div占屏幕宽度的十分之一）
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

    $("#header .box").each(function(index) {
        if (index !== 0) {
        $(this).delay(index * 500).animate({
            width: "0",
            opacity: "0"
        }, 2000);
    }
    });
    var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    $("#header #div1").animate({
        opacity: "0",
        left: screenWidth + "px"
    }, 1000);
});
function onFucus() {
    let owl = document.getElementById('owl')
    owl.classList.add("owl-close")
}

function onBlur() {
    let owl = document.getElementById('owl')
    owl.classList.remove("owl-close")

}

