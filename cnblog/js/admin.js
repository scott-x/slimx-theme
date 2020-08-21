var storage = window.localStorage
var setting = storage.getItem("setting")
setting = JSON.parse(setting)

var admin_name = setting.admin_name
var avator = setting.avator
var nickname = setting.nickname

$(".header .title").html(admin_name)
$(".header .avator").html(`
    <img src="${avator}" alt=""> <span>${nickname}</span><span class="iconfont icon-paixu-shengxu1" style="positon:relative;top:-8px;"></span>
`)

//logout
$(".icon-paixu-shengxu1").click(function(){
    var display = $(".logout")[0].style.display
    if (!display) {
        display = "none"
    }
    $(".logout")[0].style.display=display =="none"?"block":"none"
    $(".logout .exit").click(function(){
        //exit
        $.get("/api/blog/logout",{},function(data){
            $(".logout")[0].style.display="none"
            setTimeout(function(){
                window.location.href ="/login"
            },200)
        })
    })
})
