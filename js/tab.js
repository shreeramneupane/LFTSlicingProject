// Tab Javascript Document
function Tab() {
	this.tabs = ((document.getElementsByClassName("tab-block")[0]).children[0]).children;
	var that = this;

	this.init = function() {
		for (var i = 0; i < that.tabs.length; i++) {
			that.tabs[i].onclick = (function(pos) {
				return function() {
					var clickedTab = that.tabs[pos];
					if (clickedTab.className == "") { //if clicked tab doesn't have active class only condition are fired
						for (var j = 0; j < that.tabs.length; j++) {
							if (that.tabs[j].className == "active") {
								that.tabs[j].className = "";
								that.tabs[j].style.marginRight = "1px";
								that.tabs[j].style.marginLeft = "0px";
							}
						}
						clickedTab.className = "active";
						if (pos == that.tabs.length - 1) { //applied for last child of tab
							clickedTab.style.marginLeft = "2px";
						} else if (pos != 0) { //applied for middle child of tab
							clickedTab.style.marginLeft = "2px";
							clickedTab.style.marginRight = "3px";
						} else { //applied for first child of tab
							clickedTab.style.marginLeft = "1px";
							clickedTab.style.marginRight = "3px";
						}
					}
					return false;
				}
			})(i);
		}
	}
}
var t = new Tab();
t.init();