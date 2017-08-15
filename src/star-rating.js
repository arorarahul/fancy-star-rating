(function(exports) {

	'use strict';

	function rating(obj) {
		checkValidity(obj);

		var ratings = [];

		(function init() {

			var i, div = document.createElement('div');
			div.classList.add('star-rating-container');

			for(i = 0; i < obj.maxRating; ++i) {
				var a = document.createElement('a');
				a.href = '#';
				var rateIndex = i + 1;
				a.setAttribute('data-index', i);
				a.classList.add('no-rate');
				if(i < obj.currentRating) {
					a.classList.add('rate-' + rateIndex);
				}
				div.appendChild(a);
				ratings.push(a);
				attachEvents(a);
			}

			obj.el.appendChild(div);

		})();

		function checkValidity(obj) {
			if(typeof obj === 'undefined'){
				throw Error('rating function requires valid parameters');
			}
			var currentRating = obj.currentRating,
				maxRating = obj.maxRating;
			if(!obj.el){ //regex to be used to check if its a valid element
				throw Error('no element present');
			}
			if(!maxRating){
				throw Error('no max rating present');
			}
			if(maxRating > 10){
				throw Error('max rating cannot be greater than 10');
			}
			currentRating = (!currentRating) ? 0 : currentRating;
			if(currentRating > maxRating){
				throw Error('current rating value is greater than max rating');
			}
			obj.showRating = (typeof obj.showRating === "boolean") ? obj.showRating : true;
			obj.stepSize = (!obj.stepSize) ? 1 : obj.stepSize;
		}

		var setRating = function (value, doCallback) {

			if (value && value < 0 || value > obj.maxRating) {
				return;
			}

			obj.currentRating = value || obj.currentRating;

			loopOn(ratings, function(item, index) {
				var rateIndex = index + 1;
				if(index < obj.currentRating) {
					item.classList.add('rate-' + rateIndex);
				}else {
					item.classList.remove('rate-' + rateIndex);
				}
			});

			if(doCallback) {
				getRating(obj.callback);
			}

		}

		var getRating = function(callback) {
			if(callback) {
				callback(obj.currentRating);
			}else {
				return obj.currentRating;
			}
		}

		var loopOn = function(arr, callback, expr) {
			if(expr === false) {
				return;
			}
			var i;
			for(i = 0; i < arr.length; ++i) {
				callback(arr[i], i);
			}
		}

		function mouseOver(elm) {
			var dataIndex = parseInt(elm.getAttribute('data-index'));
			elm.addEventListener('mouseover', function(e) {
				loopOn(ratings, function(item, index) {
					var rateIndex = index + 1;
					if(index  <= dataIndex) {
						item.classList.add('rate-' + rateIndex);
					} else {
						item.classList.remove('rate-' + rateIndex);
					}
				});
			});
		}

		function mouseClick(elm) {
			elm.addEventListener('click', function(e) {
				e.preventDefault();
				setRating(parseInt(elm.getAttribute('data-index')) + 1, true);
			});
		}

		function mouseOut(elm) {
			elm.addEventListener('mouseout', function(e) {
				if(ratings.indexOf(e.relatedTarget) === -1){
					setRating(null, false);
				}
			});
		}

		function attachEvents(elm) {
			mouseOver(elm);
			mouseClick(elm);
			mouseOut(elm);
		}

		return {
			setRating: setRating,
			getRating: getRating
		};

	}

	exports.rating = rating;

})(typeof window === 'undefined' ? module.exports : window);
