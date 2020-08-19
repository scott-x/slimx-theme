(function(global){
	var Modal = function(el,options) {
		this.el = typeof el === "string" ? document.querySelector(el) : el;
		var default_options = {
			show_btn1: true,
			show_btn2: true,
			title:"this is the title",
			btn1_value: "cancel",
			btn2_value: "confirm",
			func1: function () {
				console.log("func1")
			},
			func2:function() {
				console.log("func2")
			}
		};

		if (options) {
			for (var key in options) {
				default_options[key] = options[key]
			}
		}
		
		this.options = default_options
		this.init()
		this.go()
	}
	
	Modal.prototype = {
		init: function(){
			if (!this.options.show_btn1){
				this.el.querySelector("#btn1").style.display="none"
			}
			if (!this.options.show_btn2){
				this.el.querySelector("#btn2").style.display="none"
			}
			this.el.querySelector("#btn1").setAttribute("value",this.options.btn1_value)
			this.el.querySelector("#btn2").setAttribute("value",this.options.btn2_value)
			this.el.querySelector(".modal-header").querySelector(".title").innerHTML=this.options.title
		},
		go: function() {
			this.closeBtnClick()
			this.btn1Click()
			this.btn2Click()
		},
		btn2Click: function() {
			let btn2 = this.el.querySelector("#btn2")
			var that = this
			btn2.onclick = function () {
				 if (that.options.func2) {
				  	that.options.func2()
				  }
				 that.el.style.display = "none"
			}
		},
		btn1Click: function() {
			let btn1 = this.el.querySelector("#btn1")
			var that = this
			btn1.onclick = function() {
				 if (that.options.func1) {
				  	that.options.func1()
				  }
				  that.el.style.display = "none"
			}
		},
		closeBtnClick: function() {
			let closeBtn = this.el.querySelector(".close-btn")
			var that = this
			closeBtn.onclick = function () {
				 that.el.style.display = "none"
			}
		}
	};
	if (typeof module !== "undefined" && module.exports) {
		module.exports = Modal
	}
	if (typeof define === "function") {
		define(function() {
			return Modal
		})
	}
	global.Modal = Modal 
})(this)