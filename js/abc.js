// JavaScript Document
function Country(){
	this.countryForm = document.getElementById("countryForm");	
	this.parent = document.getElementById('showCountryList');
	var that = this;
	
	this.init = function(){
		that.countryForm.style.display = "none";
		
		var showDropDown = document.createElement("div");
		showDropDown.className = "country-block";
		showDropDown.innerHTML = "Change Country";
		that.parent.appendChild(showDropDown);
		
		var initialFlag = document.createElement("img");
		initialFlag.setAttribute("src",that.countryForm.children[0].children[0].getAttribute('label'));
		showDropDown.appendChild(initialFlag);
		
		that.parent.onclick = function(){
			if(that.parent.getElementsByTagName("ul").length>0){
				that.parent.removeChild(that.parent.getElementsByTagName("ul")[0]);
			}else{
				var countryUL = document.createElement("ul");
				countryUL.className = "country-list";
				that.parent.appendChild(countryUL);
				for(var i=0;i<that.countryForm.children[0].length; i++){
					var countryLI = document.createElement("li");
					countryUL.appendChild(countryLI);
					countryLI.innerHTML = that.countryForm.children[0].children[i].value;
					
					var flagImg = document.createElement("img");
					flagImg.setAttribute("src",that.countryForm.children[0].children[i].getAttribute('label'));
					countryLI.appendChild(flagImg);
				}
				for(var i=0; i<that.parent.getElementsByTagName("li").length; i++){
					that.parent.getElementsByTagName("li")[i].onclick = (function(pos){
					
							return function(){
								that.parent.removeChild(that.parent.getElementsByTagName("div")[0]);
		var showDropDown = document.createElement("div");
		showDropDown.className = "country-block";
		showDropDown.innerHTML = that.countryForm.children[0].children[pos].value;
		that.parent.appendChild(showDropDown);
		
		var countryFlag = document.createElement("img");
		countryFlag.setAttribute("src",that.countryForm.children[0].children[pos].getAttribute('label'));
		showDropDown.appendChild(countryFlag);
							}
						})(i);
					}
			}
		}
	}
}
var c = new Country();
c.init();