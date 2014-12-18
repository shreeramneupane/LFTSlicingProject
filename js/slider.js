//Slider JS document
function Slider() {
	this.sliderWidth = 1010;
	this.slider = document.getElementsByClassName("slider")[0];
	this.listSlider = this.slider.getElementsByTagName("ul")[0];
	this.marginCount = 0;
	this.desc;
	var that = this;
	// this.descPos=-1020;
	this.init = function() {
		sliderAnimation = new Animator();
		descAnimation = new Animator(this);
		that.putButtons();
		that.autoAnimation();
	}
	this.putButtons = function() {
		// puts left and right buttons in sliders and call onclick actions
		this.left = document.createElement("img");
		this.left.src = "images/left-inactive.png";
		this.left.id = "left-arrow";
		this.left.onclick = that.moveLeft;
		that.slider.appendChild(this.left);
		this.right = document.createElement("img");
		this.right.src = "images/right-active.png";
		this.right.id = "right-arrow";
		this.right.onclick = that.moveRight;
		that.slider.appendChild(this.right);
		that.putDescription();
	}
	this.putDescription = function() {
		that.desc = document.createElement("span");
		that.desc.className = "description";
		that.desc.style.width = "1010px";
		that.desc.style.marginLeft = "0px";
		that.slider.appendChild(that.desc);
	}

	this.moveLeft = function() {
		clearInterval(autoInterval);
		sliderAnimation.stop();
		that.marginCount += that.sliderWidth;
		sliderAnimation.animate(that.listSlider, {
			marginLeft: that.sliderWidth
		}, 2000, function() {
			console.log('done');
		});
		descAnimation.animateDescription(that.desc, {
			marginLeft: 1010
		}, 2000, function() {
			console.log('done');
		});
	}
	this.moveRight = function() {
		clearInterval(autoInterval);
		// autoInterval=setInterval(that.moveRight, 4000);//clears auto interval and sets it again
		sliderAnimation.stop();
		that.marginCount -= that.sliderWidth;
		sliderAnimation.animate(that.listSlider, {
			marginLeft: -that.sliderWidth
		}, 2000, function() {
			console.log('done');
		});
		descAnimation.animateDescription(that.desc, {
			marginLeft: -1010
		}, 2000, function() {
			console.log('done');
		});
	}
	this.autoAnimation = function() {
		autoInterval = setInterval(that.moveRight, 100);
	}
}
var s = new Slider();
s.init();

function Animator(slide) {
	var frequency = 50;
	var counter = 0;
	var currentLeftMargin = 0;
	this.element;
	this.properties;
	this.duration;
	this.callback;
	this.leftMargin;
	this.sliderCount;
	var index = 0;
	var that = this;
	this.animate = function(el, properties, duration, callback) {
		that.element = el;
		that.sliderCount = that.element.getElementsByTagName("li").length;
		that.properties = properties;
		// that.leftMargin = that.properties.marginLeft.split("px")[0];
		that.leftMargin = that.properties.marginLeft;
		that.duration = duration;
		that.callback = callback;
		if (currentLeftMargin == 0) { //check for left limit
			if (that.leftMargin != 1010) {
				// if it isn't asked to move left from leftmost
				that.intervalId = setInterval(that.move, frequency);
			}
		} else if (currentLeftMargin == (-1010 * (that.sliderCount - 1))) { //check for right limit
			if (that.leftMargin != -1010) {
				// if it isn't asked to move right from rightmost
				that.intervalId = setInterval(that.move, frequency);
			}
		} else { //animate for middle range values
			that.intervalId = setInterval(that.move, frequency);
		}
	}
	this.animateDescription = function(el, properties, duration, callback) {
		that.element = el;
		that.properties = properties;
		that.leftMargin = that.properties.marginLeft;
		that.duration = duration;
		that.callback = callback;
		if (that.element.hasChildNodes()) {
			that.element.removeChild(that.element.getElementsByTagName("p")[0]);
		}
		var sliderNumber = (Math.abs(currentLeftMargin) / 1010) + 1;
		if (that.leftMargin == 1010) {
			if (sliderNumber != 1) { //check leftmost slider
				currentLeftMargin = 1010;
				that.intervalId = setInterval(that.slideDesc, frequency);
			}
		}
		if (that.leftMargin == -1010) {
			if (sliderNumber != 5) { //check rightmost
				currentLeftMargin = -1010;
				that.intervalId = setInterval(that.slideDesc, frequency);
			}
		}

	}
	this.animateDescText = function(el, properties, duration, callback) {
		that.element = el;
		that.properties = properties;
		that.leftMargin = that.properties.marginLeft;
		that.duration = duration;
		that.callback = callback;
		if (that.leftMargin == 1010) {
			currentLeftMargin = 1332;
			that.intervalId = setInterval(that.slideText, frequency);
		}
		if (that.leftMargin == -1010) {
			currentLeftMargin = -680;
			that.intervalId = setInterval(that.slideText, frequency / 10);
		}

	}

	this.move = function() {
		counter++;
		var val = currentLeftMargin + (that.leftMargin / (that.duration / frequency) * counter);
		that.element.style.marginLeft = val + "px";
		if (counter >= that.duration / frequency) {
			currentLeftMargin += that.leftMargin;
			clearInterval(that.intervalId);
			counter = 0;
		}

	}
	this.slideDesc = function() {
		counter++;
		var textMargin = currentLeftMargin;
		var val = currentLeftMargin - (that.leftMargin / (that.duration / frequency) * counter);
		that.element.style.marginLeft = val + "px";
		if (counter >= that.duration / frequency) {
			currentLeftMargin += that.leftMargin;
			clearInterval(that.intervalId);
			counter = 0;
			that.element.innerHTML = "<p>" + slide.listSlider.getElementsByTagName('li')[(Math.abs(currentLeftMargin) / 1010)].getElementsByTagName('img')[0].getAttribute('title') + '</p>';
			that.animateDescText(that.element.getElementsByTagName("p")[0], {
				marginLeft: -textMargin
			}, 2000, function() {
				console.log('done');
			});
		}

	}
	this.slideText = function() {
		counter++;
		var val = currentLeftMargin - (that.leftMargin / (that.duration / frequency) * counter);
		that.element.style.marginLeft = val + "px";
		if (counter >= that.duration / frequency) {
			currentLeftMargin += that.leftMargin;
			clearInterval(that.intervalId);
			counter = 0;
		}
	}
	this.stop = function() {
		if (this.properties) {
			//if double clicked in the middle,margin value is reset to currently sliding
			that.element.style.marginLeft = that.leftMargin;
		}
		counter = 0;
		clearInterval(that.intervalId);
	}
}