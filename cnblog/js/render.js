$(function(){
    var url = window.location.href
    var id = url.split("?id=")[1]
    var storage = window.localStorage
    //init setting
    function init() {
        var setting=storage.getItem("setting")
        if (!setting){
            $.get("/api/blog/get_setting",{},function(data){
                setting = data.setting 
                storage.setItem("setting",JSON.stringify(data.setting));
            })
        }else {
            setting=JSON.parse(setting)
        }
        
        var github_url = setting.github
        var last = github_url.lastIndexOf("/")
        var github_name = github_url.substring(last+1)
        //render dom
        $(".copyright .info").html(`<p>Copyright © 2020 <a href="${github_url}">${github_name}</a>. All rights reserved.</p>`)
        
    }
    init()
    // console.log(id)
    $.get("/api/post",{id:id},function(result){
        // console.log(result)
        var blog = result.blog

        if (blog.title!=""){
            var create_time=blog.create_time.split(" ")[0]
            $(".blog_content .blog_left .content .title").append(blog.title)
            var dom_time = `<span class="btn_tag" > 发表于 ${create_time}</span>`
            $(".blog_content .blog_left .content .minfo").append(dom_time)
            $(".blog_content .blog_left .content .mkd").append(blog.content)
            $('pre').addClass("line-numbers").css("white-space", "pre-wrap");
            $('table').addClass('table').addClass('table-bordered').addClass('table-hover').addClass('table-striped')
            var sc = document.createElement("script")
            sc.setAttribute("src","/statics/js/prism.js")
            document.body.appendChild(sc)
            
            render()
        }else {
            $(".blog_content .blog_left").html(`<img src="/uploads/no-data.png" style="width:678px" alt=""/>`)
        }
        
    })
    
    $.get("/api/popular",{},function(result){
        var dom = "<div class='title'>随机推荐</div>"
        var articles = result.articles
        for (var i = 0; i < articles.length; i++) {
            dom += `
                <div class="item">
                    <img src="${articles[i].cover}" style="width:15px;height:15px;display:inline-block;position:relative;top:2px;">
                    <p class="des" style="display:inline;line-heigh:19px;">
                        <a href="/detail?id=${articles[i].bid}" style="color:#565656;">${articles[i].title}</a>
                    </p>
                </div>
            `
        }
        $(".blog_right .popular").html(dom)    
    })

    function render() {
        //previous
        $.get("/api/post/previous",{bid:id},function(result){
            if (result.title!=""){
                $(".blog .previous span").append(`上一篇：<a href="/detail?id=${result.id}">${result.title}</a>`)
            }
            
        })

        //next   /post/next
        $.get("/api/post/next",{bid:id},function(result){
            if (result.title!=""){
                $(".blog .next span").append(`下一篇：<a href="/detail?id=${result.id}">${result.title}</a>`)
            }
            
        })

        $.get("/api/tag/showTags",{"front_bid":id},function(result){
            var tags = result.tags
            var dom =""

            if (tags.length>0) {
                for (var i = 0; i < tags.length; i++) {
                    var name = tags[i].name
                    var color = tags[i].color
                    dom += `<a href="/posts?tid=${tags[i].id}"><button style="background:${color};color:#fff;border:none;" class="btn_tag">${name}</button></a>`
                }
            }
            $(".blog_content .blog_left .content .minfo").append(dom)
        })
    }
})