function my$(element){
	return document.getElementById(element)
}
// 图片动画效果
$("#container-left>li").mouseenter(function(){
	$("#container-left>li").css("border","").css("box-shadow","")
	$(this).css("box-shadow","4px 4px 4px grey")
}).mouseleave(function(){
	$("#container-left>li").css("border","").css("box-shadow","")
})
$("#imgshow").children().find("img").mouseenter(function(){
	$("#imgshow").children().find("img").css("opacity",0.3)
	$(this).css("opacity","1")
	
})
$("#imgshow").children().mouseleave(function(){
	$("#imgshow").children().find("img").css("opacity",1)
})
$("#imgshow").children().find("li").click(function(){
	$(this).hide(300)
})
var audio= document.getElementsByTagName("audio")
var play=document.getElementsByClassName("glyphicon glyphicon-headphones")
for (var i=0;i<play.length;i++){
	var list=play[i]
	list.index=i
	list.onclick=function(){
		for(var j=0;j<audio.length;j++){
			audio[j].style.display="none"
			
		}
		var c=this.index
		audio[c].style.display="block"
		if (audio[c].paused){ 
		for(var j=0;j<audio.length;j++){
			audio[j].load();
			audio[j].pause();
            audio[c].play();
        } 
        }else{
            audio[c].pause();
        }
	}
	
}
var json={
	"left":500,
	"font-size":26
}
var json1={
	"left":1000,
	"font-size":11
}
var json3={
	"left":500,
	"font-size":27
}
animate(my$("move-font"),json,function(){
	animate(my$("move-font"),json1,function(){
		animate(my$("move-font"),json3)
	});
})
var left=my$("pic").children[0]
var mid=my$("pic").children[1]
var right=my$("pic").children[2]
var pos={
	"left":140,
	"width":400,
	"height":400,
	"opacity":0.3
}
var pos1={
	"right":140,
	"width":400,
	"height":400,
	"opacity":0.3
}
var pos2={
	"right":340,
}
var pos3={
	"left":340,
}
var pos4={
	"opacity":1
}
var pos5={
	"opacity":0
}
var pos6={
	"left":0,
	"width":300,
	"height":300,
	"opacity":1
}
var pos7={
	"right":0,
	"width":300,
	"height":300,
	"opacity":1
}
my$("move-font").onclick=function(){
	animate(left,pos,function(){animate(left,pos3,function(){animate(left,pos4,function(){left.children[0].classList.add("bor");
	animate(left,pos6);})})});
	animate(right,pos1,function(){animate(right,pos2,function(){animate(right,pos5,function(){right.children[0].classList.add("bor")
	animate(right,pos7);
	setTimeout(function(){animate(mid,{"opacity":1},function(){animate(mid,{"opacity":0.1},function(){animate(mid,
		{"opacity":0.3})})})},1000)
})})})
}
// $("#mid").mouseenter(function(){
// 	console.log("1")
// 	$("#mid").css("opacity",1)
// })

//动画函数封装
function animate(element,json,fn){
	clearInterval(element.timeId);
	element.timeId=setInterval(function(){
		var flag=true;//默认，假设，全部到达;
		for(var attr in json){
			// 判断这个属性是不是opacity
			// 判断这个属性是不是Zindex
			if(attr=="opacity"){
				var current=getStyle(element,attr)*100
				var target=json[attr]*100
				var step=(target-current)/10;
				step=step>0?Math.ceil(step):Math.floor(step);
				current+=step;
				element.style[attr]=current/100;
			}else if (attr=="zIndex"){
				element.style[attr]=json[attr];
			}else{
				var current=parseInt(getStyle(element,attr))
				var target=json[attr]
				var step=(target-current)/10;
				step=step>0?Math.ceil(step):Math.floor(step);
				current+=step;
				element.style[attr]=current+"px";
			}
			if(current!=target){
				flag=false;
			}
		}
		if(flag){
				clearInterval(element.timeId)
				if(fn){
					fn();
				}
			}
		// console.log("目标"+target+"当前"+current )
	}, 50);
}
function getStyle(element,attr){
	return window.getComputedStyle?window.getComputedStyle(element, null)[attr]:element.currentStyle[attr];
}