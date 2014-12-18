//LFT-Project JS DOcument 
function LightBox(){
	this.zoomIcon = document.getElementById("light-box-icon"); //accessing + icon
	this.parent = (document.getElementsByClassName("main-container")[0]); //accessed parent of lightbox
	var productImageLocation =  this.zoomIcon.parentNode.attributes.href.value;
	var that = this;
	this.init = function(){
		this.zoomIcon.onclick = function(){
			var productImageBackgroundDiv = document.createElement("div"); //creating background with opacity
			productImageBackgroundDiv.className = "light-box-background";
			that.parent.appendChild(productImageBackgroundDiv);
			
			var productImageDiv = document.createElement("div"); //creating div to place real image
			productImageDiv.className = "light-box";
			that.parent.appendChild(productImageDiv);
			
			var productImage = document.createElement("img");
			productImage.setAttribute("src",productImageLocation);
			(productImageDiv).appendChild(productImage); //appending image to div created
			
			var crossButton = document.createElement("div"); //creating X button
			crossButton.className="light-box-cross-button";
			that.parent.appendChild(crossButton);
			
			crossButton.onclick=function(){
				that.parent.removeChild(productImageBackgroundDiv);
				that.parent.removeChild(productImageDiv);
				that.parent.removeChild(crossButton);
			}
						
			return false;
		}
	}
}
var lb = new LightBox();
lb.init();