//https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/filter
if (!Array.prototype.filter){
	Array.prototype.filter = function(fun /*, thisp */){
		"use strict";

	if (this === null){
		throw new TypeError();
	}

	var t = Object(this),
		len = t.length >>> 0;

	if (typeof fun != "function"){
		throw new TypeError();
	}

	var res = [],
		thisp = arguments[1],
		val;

	for (var i = 0; i < len; i++){
		if (i in t){
			val = t[i]; // in case fun mutates this
			if (fun.call(thisp, val, i, t)){
				res.push(val);
			}
		}
	}

	return res;
	};
}


//https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/forEach
if ( !Array.prototype.forEach ) {
	Array.prototype.forEach = function forEach( callback, thisArg ) {
		var T, k;

		if ( this === null ) {
			throw new TypeError( "this is null or not defined" );
		}

		// 1. Let O be the result of calling ToObject passing the |this| value as the argument.
		var O = Object(this);

		// 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
		// 3. Let len be ToUint32(lenValue).
		var len = O.length >>> 0; // Hack to convert O.length to a UInt32

		// 4. If IsCallable(callback) is false, throw a TypeError exception.
		// See: http://es5.github.com/#x9.11
		if ( {}.toString.call(callback) !== "[object Function]" ) {
			throw new TypeError( callback + " is not a function" );
		}

		// 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
		if ( thisArg ) {
			T = thisArg;
		}

		// 6. Let k be 0
		k = 0;

		// 7. Repeat, while k < len
		while( k < len ) {
			var kValue;
			// a. Let Pk be ToString(k).
			//   This is implicit for LHS operands of the in operator
			// b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
			//   This step can be combined with c
			// c. If kPresent is true, then
			if ( Object.prototype.hasOwnProperty.call(O, k) ) {

				// i. Let kValue be the result of calling the Get internal method of O with argument Pk.
				kValue = O[ k ];

				// ii. Call the Call internal method of callback with T as the this value and
				// argument list containing kValue, k, and O.
				callback.call( T, kValue, k, O );
			}
			// d. Increase k by 1.
			k++;
		}
		// 8. return undefined
	};
}

//https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/indexOf
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
        "use strict";
        if (this == null) {
            throw new TypeError();
        }
        var t = Object(this);
        var len = t.length >>> 0;
        if (len === 0) {
            return -1;
        }
        var n = 0;
        if (arguments.length > 1) {
            n = Number(arguments[1]);
            if (n != n) { // shortcut for verifying if it's NaN
                n = 0;
            } else if (n != 0 && n != Infinity && n != -Infinity) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
        }
        if (n >= len) {
            return -1;
        }
        var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
        for (; k < len; k++) {
            if (k in t && t[k] === searchElement) {
                return k;
            }
        }
        return -1;
    }
}

// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.com/#x15.4.4.19
if (!Array.prototype.map) {
  Array.prototype.map = function(callback, thisArg) {

    var T, A, k;

    if (this == null) {
      throw new TypeError(" this is null or not defined");
    }

    // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if (thisArg) {
      T = thisArg;
    }

    // 6. Let A be a new array created as if by the expression new Array(len) where Array is
    // the standard built-in constructor with that name and len is the value of len.
    A = new Array(len);

    // 7. Let k be 0
    k = 0;

    // 8. Repeat, while k < len
    while(k < len) {

      var kValue, mappedValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
        kValue = O[ k ];

        // ii. Let mappedValue be the result of calling the Call internal method of callback
        // with T as the this value and argument list containing kValue, k, and O.
        mappedValue = callback.call(T, kValue, k, O);

        // iii. Call the DefineOwnProperty internal method of A with arguments
        // Pk, Property Descriptor {Value: mappedValue, : true, Enumerable: true, Configurable: true},
        // and false.

        // In browsers that support Object.defineProperty, use the following:
        // Object.defineProperty(A, Pk, { value: mappedValue, writable: true, enumerable: true, configurable: true });

        // For best browser support, use the following:
        A[ k ] = mappedValue;
      }
      // d. Increase k by 1.
      k++;
    }

    // 9. return A
    return A;
  };
}


/**
 * jQuery plugin for getting position of cursor in textarea
 * @license under dfyw (do the fuck you want)
 * @author leChantaux (@leChantaux)
 */

(function ($, window, undefined) {
	// Create the defaults once
	var elementFactory = function (element, value) {
		element.text(value.val);
	};

	var pluginName = 'sew',
		document = window.document,
		defaults = {
			token: '@',
			elementFactory: elementFactory,
			values: [],
			unique: false,
			repeat: true
		};

	function Plugin(element, options) {
		this.element = element;
		this.$element = $(element);
		this.$itemList = $(Plugin.MENU_TEMPLATE);

		this.options = $.extend({}, defaults, options);
		this.reset();

		this._defaults = defaults;
		this._name = pluginName;

		/**
		* Without spaces
		**/
		//this.expression = new RegExp('(?:^|\\b|\\s)' + this.options.token + '([\\w.]*)$');

		/**
		* With spaces
		**/
		this.expression = new RegExp('(?:^|\\b|\\s)' + this.options.token + '([\\w.]* ?[\\w.]*)$');
		this.cleanupHandle = null;
		this.mentions = [];

		this.init();
	}

	Plugin.MENU_TEMPLATE = "<div class='-sew-list-container' style='display: none; position: absolute;'><ul class='-sew-list'></ul></div>";

	Plugin.ITEM_TEMPLATE = '<li class="-sew-list-item"></li>';

	Plugin.KEYS = [40, 38, 13, 27, 9];

	Plugin.prototype.init = function () {
		if(!this.options.values) {
			return;
		}
		//this.filtered = this.getValues();
		this.filtered = [];
		this.$element.bind('keyup', $.proxy(this.onKeyUp, this))
				.bind('keydown', $.proxy(this.onKeyDown, this))
				.bind('focus', $.proxy(this.preRender, this))
				.bind('blur', $.proxy(this.remove, this));
				//.bind('focus', $.proxy(this.renderElements, this, this.filtered))
	};

	Plugin.prototype.reset = function () {
		if(this.options.unique && typeof this.options.values != 'function') {
			this.options.values = Plugin.getUniqueElements(this.options.values);
		}

		this.index = 0;
		this.matched = false;
		this.dontFilter = false;
		this.lastFilter = undefined;
		this.$selected = null;

		//this.filtered = this.getValues().slice(0);
	};

	Plugin.prototype.next = function () {
		this.index = (this.index + 1) % this.filtered.length;
		this.hightlightItem();
	};

	Plugin.prototype.prev = function () {
		this.index = (this.index + this.filtered.length - 1) % this.filtered.length;
		this.hightlightItem();
	};

	Plugin.prototype.select = function () {
		this.replace(this.filtered[this.index].val);
		this.$element.trigger('mention-selected',this.filtered[this.index]);
		this.mentions.push(this.filtered[this.index]);
		this.hideList();
	};

	Plugin.prototype.remove = function () {
		this.$itemList.fadeOut('slow');

		this.cleanupHandle = window.setTimeout($.proxy(function () {
			this.$itemList.remove();
			this.$itemListUL = null;
		}, this), 500);
	};

	Plugin.prototype.replace = function (replacement) {
		var startpos = this.$element.getCursorPosition(),
			separator = startpos === 1 ? '' : ' ',
			fullStuff = this.getText(),
			val = fullStuff.substring(0, startpos),
			posfix = fullStuff.substring(startpos, fullStuff.length),
			separator2 = posfix.match(/^\s/) ? '' : ' ',
			finalFight;


		val = val.replace(this.expression, separator + this.options.token + replacement);
		finalFight = val + separator2 + posfix;
		this.setText(finalFight);
		this.$element.setCursorPosition(val.length + 1);
	};

	Plugin.prototype.hightlightItem = function () {
		this.$selected && this.$selected.removeClass("selected");

		var container = this.$itemListUL,
			element = this.filtered[this.index].element.addClass("selected"),
			scrollPosition = element.position().top;
			this.$selected = element;

		container.scrollTop(container.scrollTop() + scrollPosition);
	};

	Plugin.prototype.preRender = function(){
		$("body").append(this.$itemList);
		this.$itemListUL = this.$itemList.find('ul').empty();
		this.$selected = null;

	}

	Plugin.prototype.renderElements = function (values) {
		var container = this.$itemListUL,
			i, e, count, fn;

		if(!container){
			this.preRender();
			container = this.$itemListUL;
		}
		if(values){
			fn = function (e, i) {
				var $item = $(Plugin.ITEM_TEMPLATE);
				this.options.elementFactory($item, e);
				e.element = $item.appendTo(container).bind('click', $.proxy(this.onItemClick, this, e)).bind('mouseover', $.proxy(this.onItemHover, this, i));
			}
			count = values.length;
			for(i=0; i<count; i+=1){
				e = values[i];
				fn.call(this,e,i);
			}
		}

		this.index = 0;
		this.hightlightItem();
	};

	Plugin.prototype.displayList = function () {

		var element = this.$element,
			offset = this.$element.offset(),
			pos = element.getCaretPosition();

		this.$itemList.css({
			left: offset.left + pos.left,
			top: offset.top + pos.top + 15
		});
		this.$element.trigger('menu_show');
		this.filtered.length && this.$itemList.show();
	};

	Plugin.prototype.hideList = function () {
		var that = this;
		this.$itemList.hide();
		this.reset();
		setTimeout(function(){
			that.$element.trigger('menu_hide');
		},500)
	};

	Plugin.prototype.getValues = function(val){
		if(typeof this.options.values == 'function'){
			return this.options.values(val);
		}else{
			return this.options.values;
		}
	}

	Plugin.prototype.filterList = function (val) {
		if(val == this.lastFilter){
			return;
		}

		this.lastFilter = val;
		this.$itemList.find(".-sew-list-item").remove();

		var values = this.getValues(val),
			vals;

		if(typeof this.options.filter == 'function'){
			vals = this.filtered = this.options.filter.call(this,values,val);
		}else{
			vals = this.filtered = values.filter($.proxy(function (e) {
				var exp = new RegExp('\\W*' + this.options.token + e.val + '(\\W|$)');
				if(!this.options.repeat && this.getText().match(exp)) {
					return false;
				}

				return	val === "" ||  e.val.toLowerCase().indexOf(val.toLowerCase()) >= 0 || (e.meta || "").toLowerCase().indexOf(val.toLowerCase()) >= 0;
			}, this));
		}

		if(vals.length) {
			this.renderElements(vals);
			this.$itemList.show();
		} else {
			this.hideList();
		}
	};

	Plugin.getUniqueElements = function (elements) {
		var target = [];

		elements.forEach(function (e) {
			var hasElement = target.map(function (j) { return j.val; }).indexOf(e.val) >= 0;
			if(hasElement){
				return;
			}
			target.push(e);
		});

		return target;
	};

	Plugin.prototype.getText = function () {
		return(this.$element.val() || this.$element.text());
	};

	Plugin.prototype.setText = function (text) {
		if(this.$element.prop('tagName').match(/input|textarea/i)) {
			this.$element.val(text);
		} else {
			// poors man sanitization
			text = $("<span>").text(text).html().replace(/\s/g, '&nbsp');
			this.$element.html(text);
		}
	};

	Plugin.prototype.onKeyUp = function (e) {
		var startpos = this.$element.getCursorPosition();
			val = this.getText().substring(0, startpos),
			matches = val.match(this.expression);

		if(!matches && this.matched) {
			this.matched = false;
			this.dontFilter = false;
			this.hideList();
			return;
		}

		if(matches && !this.matched) {
			this.displayList();
			this.lastFilter = "\n";
			this.matched = true;
		}

		if(matches && !this.dontFilter) {
			this.filterList(matches[1]);
		}
	};

	Plugin.prototype.onKeyDown = function (e) {
		var listVisible = this.$itemList.is(":visible");
		if(!listVisible || (Plugin.KEYS.indexOf(e.keyCode) < 0)){
			return;
		}

		switch(e.keyCode) {
		case 9:
		case 13:
			this.select();
			break;
		case 40:
			this.next();
			break;
		case 38:
			this.prev();
			break;
		case 27:
			this.$itemList.hide();
			this.dontFilter = true;
			break;
		}

		e.preventDefault();
	};

	Plugin.prototype.onItemClick = function (element, e) {
		if(this.cleanupHandle){
			window.clearTimeout(this.cleanupHandle);
		}
		this.select();
	};

	Plugin.prototype.onItemHover = function (index, e) {
		this.index = index;
		this.hightlightItem();
	};

	Plugin.prototype.getMentions = function(callback){
		var  that = this,
			target = [],
			txt = this.getText(),
			men = this.mentions.filter(function(el){
				var exp = new RegExp('\\W*' + that.options.token + el.val + '(\\W|$)');
				return txt.match(exp);
			});

			men.forEach(function (e) {
				var hasElement = target.map(function (j) { return j.val; }).indexOf(e.val) >= 0;
				if(hasElement){
					return;
				}
				delete e.element;
				target.push(e);
			});
		callback.call(this,target)
	}

	Plugin.prototype.setMentions = function(mentions){
		this.mentions = mentions;
	}

	Plugin.prototype.addMention = function(mention){
		this.mentions.push(mention);
	}

	$.fn[pluginName] = function(option){
		var args = arguments;
		return this.each(function () {
			var $this = $(this)
				, data = $this.data(pluginName)
				, options = typeof option == 'object' && option
			if (!data){$this.data(pluginName, (data = new Plugin(this, options)));}
			if (typeof option == 'string') { return data[option].apply($(this).data(pluginName),Array.prototype.slice.call( args, 1 ))}
		})
	}


}(jQuery, window));
