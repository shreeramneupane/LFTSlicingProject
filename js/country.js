var selecti = document.getElementById('goodify');
selecti.style.display = 'none';
var good = new Goodify();
good.init();
function Goodify(){
	
	var that=this;
	var isCreated = false;
	var isDropDown = false;
	this.selectedPart;
	this.ulDrop;
	var parent = document.getElementById('parent-goodify');
	this.init = function(){
		that.selectedPart = document.createElement('div');
		that.selectedPart.className='goodify';
		
		that.appendImgAndText(that.selectedPart,selecti.selectedIndex);
		
		parent.appendChild(that.selectedPart);
		that.selectedPart.onclick = isDropDown ? that.hideDropDown:that.showDropDown;
	}	
	
	this.showDropDown = function(){
		isDropDown = true;
		that.selectedPart.onclick = isDropDown ? that.hideDropDown:that.showDropDown;
		if(!isCreated){
			that.ulDrop = document.createElement('ul');
			that.ulDrop.className = 'ul-drop';	
			for(var i=0;i<selecti.children.length;i++){
				var lis =  document.createElement('li');
				that.appendImgAndText(lis,i,'Change Country');
				lis.onclick = (function(index){
					return function(){that.changeIndexPics(index);that.hideDropDown();};	
				})(i);
				
				that.ulDrop.appendChild(lis);
			}
			isCreated = true;
		}
		parent.appendChild(that.ulDrop);
	}
	this.hideDropDown = function(){
		isDropDown = false;
		that.selectedPart.onclick = isDropDown ? that.hideDropDown:that.showDropDown;
		
		parent.removeChild(that.ulDrop);
	}
	
	this.changeIndexPics = function(index){
		that.selectedPart.children[1].innerHTML = selecti.options[index].value;
		that.selectedPart.children[0].setAttribute('src',selecti.options[index].getAttribute('pics'));
		selecti.selectedIndex = index;
	}
	
	this.appendImgAndText = function(parent,index,text){
		var img = document.createElement('img');
		var source = selecti.options[index].getAttribute('pics');
		img.setAttribute('src', source);
		parent.appendChild(img);
		
		var toText = text == undefined ? 'Change Country': selecti.options[index].value;
		var span = document.createElement('span');
		span.innerHTML = toText;
		parent.appendChild(span);
	}
	
}// JavaScript Document