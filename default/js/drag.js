//https://juejin.im/post/5d9c6d8f6fb9a04e23576415

//get container_avator
var container_avator = document.getElementById("avator")

//拖进
container_avator.addEventListener(
  "dragenter",
  function(e) {
    e.preventDefault();
  },
  false
);

//拖离
container_avator.addEventListener(
  "dragleave",
  function(e) {
    dragleaveHandler(e);
  },
  false
);

//拖来拖去 , 一定要注意dragover事件一定要清除默认事件
//不然会无法触发后面的drop事件
container_avator.addEventListener(
  "dragover",
  function(e) {
    e.preventDefault();
  },
  false
);

//扔
container_avator.addEventListener(
  "drop",
  function(e) {
    dropHandlerAvator(e);
  },
  false
);

var dropHandlerAvator = function(e) {
  //将本地图片拖拽到页面中后要进行的处理都在这
  e.preventDefault(); //获取文件列表

  var fileList = e.dataTransfer.files;

  //检测是否是拖拽文件到页面的操作
  if (fileList.length == 0) {
    return;
  }

  //检测文件是不是图片
  if (fileList[0].type.indexOf("image") === -1) {
    return;
  }

  //实例化file reader对象
  var reader = new FileReader();
  
  reader.onload = function(e) {
      while(container_avator.hasChildNodes()){
        container_avator.removeChild(container_avator.firstChild); 
      }
      var img = document.createElement("img");
      img.src = this.result;
      img.style.width="96px"
      img.style.height="96px"
      container_avator.appendChild(img);
      
    // temp[0].src = this.result;
  };
  reader.readAsDataURL(fileList[0]);
};

/*
当完成以上操作后，相信你可以成功的完成了拖拽图片预览的操作。当你查看 img 标签时会发现，img的src属性是一个超长的文件二进制数据，
当你需要很多这种的img元素时，建议将展示区域脱离文档流，让其绝对定位减少页面的 reflow 

既然已经获取到拖拽到web页面中的图片数据了，下一步就是将其发送到服务器端。
*/

function dragleaveHandler(e){

}

//get container_textarea
var container_textarea = document.getElementById("mkd")

//拖进
container_textarea.addEventListener(
  "dragenter",
  function(e) {
    e.preventDefault();
  },
  false
);

//拖离
container_textarea.addEventListener(
  "dragleave",
  function(e) {
    dragleaveHandler(e);
  },
  false
);

//拖来拖去 , 一定要注意dragover事件一定要清除默认事件
//不然会无法触发后面的drop事件
container_textarea.addEventListener(
  "dragover",
  function(e) {
    e.preventDefault();
  },
  false
);

//扔
container_textarea.addEventListener(
  "drop",
  function(e) {
    dropHandlerTextarea(e);
  },
  false
);

var dropHandlerTextarea = function(e) {
  //将本地图片拖拽到页面中后要进行的处理都在这
  e.preventDefault(); //获取文件列表

  var fileList = e.dataTransfer.files;

  //检测是否是拖拽文件到页面的操作
  if (fileList.length == 0) {
    return;
  }

  //检测文件是不是图片
  if (fileList[0].type.indexOf("image") === -1) {
    return;
  }

  //实例化file reader对象
  var reader = new FileReader();
  
  reader.onload = function(e) {
     console.log("droped")
     var base64 = this.result
     upload(base64,"/api/upload_image")
    // temp[0].src = this.result;
  };
  reader.readAsDataURL(fileList[0]);
};

/*
当完成以上操作后，相信你可以成功的完成了拖拽图片预览的操作。当你查看 img 标签时会发现，img的src属性是一个超长的文件二进制数据，
当你需要很多这种的img元素时，建议将展示区域脱离文档流，让其绝对定位减少页面的 reflow 
既然已经获取到拖拽到web页面中的图片数据了，下一步就是将其发送到服务器端。
*/
function upload(base64,api) {
  $.ajax({
    url:api,
    cache:false,
    type:"post",
    data:{
      base64:base64
    },
    dataType: "json",
    success: function(data) {
      container_textarea.value += "\n![]("+data.src+")"
      console.log(data)
    },
    //失败回调
        error: function(XMLHttpRequest, textStatus, errorThrown){
            //查看错误信息
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        }
  })
}