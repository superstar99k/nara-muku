////////////////////////////////////////
//
// Initialize
//
////////////////////////////////////////

// Validate Color
// 配列で指定した順番にバリデートにひっかかった項目の色が変わる
var ary_color = Array(
	'#f19ec2',
	'#ffffff', 
	'#f19ec2', 
	'#ffffff'
	);
	
// 上記配列の色を切り替えるスピード
var changeTime = 70;



// アラートの吹き出しの位置調整
// 注意：
// html上でチェックボックスとラジオボタンにバリデートを行う際には、
// 0（上）は、グループの最初のinputタグに「onblur="Validator.check(this);"」を追記
// 1（下）は、グループの最後のinputタグに「onblur="Validator.check(this);"」を追記
var alertpos = 0;	// 0:上、1:下



////////////////////////////////////////
//
// Validate
//
////////////////////////////////////////
var Validator = {
   check: function(field, reg, extra) {
      var response;
      var rule = this.rule;
      rule.field = field;
      rule.value = field.value;
      rule.extra = extra;

      if(!reg || !reg.match(/^!/))
         response = rule.input();

      if(reg && !response && rule.value != '') {
         reg = reg.replace(/^!/, '');

         var mode = reg.split(/\s+/);
         for(var i = 0, m; m = mode[i]; i++) {
            m = m.replace(/([\d\-]+)?$/, '');
            response = rule[m](RegExp.$1);
            if(response) break;
         }
      }

//this.baloon.open(field, response);

      if(response)
         this.baloon.open(field, response);


   },

   submit: function(form) {
      this.allclose(form);
      var btns = new Array;

      for(var i = 0, f; f = form[i]; i++) {
         if(f.onblur){
            f.onblur();
				 }
         if(f.type == 'submit')
            btns.push(f);
      }

      for(var i = 0, f, z; f = form[i]; i++) {
         if(f._validbaloon && f._validbaloon.visible()) {
            while(z = btns.shift())
               this.baloon.open(z, this.rule.submit());
						f.focus();	// Add M.Yano 2010.03.15
						f.blur();	// Add M.Yano 2010.03.15
            return false;
         }
      }

      return true;
   },

   allclose: function(form) {
      for(var i = 0, f; f = form[i]; i++)
         if(f._validbaloon) f._validbaloon.close();
   }
};

Validator.baloon = {
   index: 0,
   open: function(field, msg) {
		 
      if(!field._validbaloon) {
         var obj = new this.element(field);

         obj.create();
         field._validbaloon = obj;

         if(field.type == 'radio' || field.type == 'checkbox') {
            for(var i = 0, e; e = field.form[field.name][i]; i++)
               addEvent(e, 'focus', function() { obj.close(); });
         }
      }

      field._validbaloon.show(msg);
   },

   element: function() {
      this.initialize.apply(this, arguments);
   }
};

Validator.baloon.element.prototype = {
   initialize: function(field) {
      this.parent = Validator.baloon;
      this.field = field;
   },

   create: function() {
      var field  = this.field;

      var box = document.createElement('div');
      //box.className = 'baloon';
box.className = 'alert';
//console.log(field);

//      var offset = Position.offset(field);
//      var top  = offset.y - 30;
//      var left = offset.x - 20 + field.offsetWidth;
//      box.style.top  = top +'px';
//      box.style.left = left+'px';

      var self = this;
//      addEvent(box, 'click', function() { self.toTop(); });

      var bindClose = function() { self.close(); };
//      var link = document.createElement('a');
//      link.appendChild(document.createTextNode('X'));
//      link.setAttribute('href', 'javascript:void(0);');
//      addEvent(link, 'click', bindClose);
      addEvent(field, 'focus', bindClose);

      var msg = document.createElement('span');
      //var div = document.createElement('div');
			//div.className = "alert";
//      div.appendChild(link);
      box.appendChild(msg);
      //box.appendChild(div);
//      document.body.appendChild(box);

if(alertpos==0) {
	if(field.type != 'radio' && field.type != 'checkbox') {
		field.parentNode.insertBefore(box,field);
	} else {
		field.parentNode.insertBefore(box,field.previousSibling);
	}
} else {
	if(field.type != 'radio' && field.type != 'checkbox') {
		field.parentNode.insertBefore(box,field.nextSibling);
	} else {
		field.parentNode.insertBefore(box,field.nextSibling.nextSibling);
	}
}

      this.box = box;
      this.msg = msg;
   },

   show: function(msg) {
      var field = this.field;
      this.msg.innerHTML  = msg;
			
			this.box.style.display = '';
      this.toTop();
			
if(!msg){
	this.box.style.color = '#99f';
	this.msg.innerHTML = "OK!!";
}     

      //if(field.type != 'radio' && field.type != 'checkbox') {

var ary_new_color = new Array();
for(var i=0;i<ary_color.length;i++){
	ary_new_color.push(ary_color[i]);
}

if(msg){										
         var colors = ary_new_color;
				 //var colors = new Array('#FF6666', '#FFAAAA', '#FF6666', '#FFAAAA');
         window.setTimeout(function() {
            if(colors.length > 0) {
               field.style.backgroundColor = colors.shift();
               window.setTimeout(arguments.callee, changeTime);
			   field.style.borderColor = "#f00";
			   field.style.borderWidth = "2px";
            }
         }, 10);
}
      //}
   },

   close: function() {
      this.box.style.display = 'none';
      this.field.style.backgroundColor = '';
	  this.field.style.borderColor = "";
	  this.field.style.borderWidth = "1px";
   },

   visible: function() {
      return (this.box.style.display == '');
   },

   toTop: function() {
//      this.box.style.zIndex = ++ this.parent.index;
   }
};

Validator.rule = {
   msg: null,

   submit: function() {
      return this.msg.submit;
   },

   input: function() {
      if(this.field.type == 'radio' || this.field.type == 'checkbox') {
         for(var i = 0, e; e = this.field.form[this.field.name][i]; i++)
            if(e.checked) return;
         return this.msg.noselect;
      } else if(this.value.replace(/\s+/g, "") == '')
         return (this.field.type == 'select-one') ? this.msg.noselect : this.msg.noinput;
   },

   mail: function() {
      if(!this.value.match(/^[\x01-\x7F]+@((([-a-z0-9]+\.)*[a-z]+)|(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))$/))
         return this.msg.mail;
   },
	 
	 tel: function() {	// ▼Add M.Yano 2010.03.15 
      if(!this.value.match(/^[0-9-]{6,10}$|^[0-9-]{12}|^\d{3}-\d{4}-\d{4}$|^\d{11}$/))
         return this.msg.tel;
   },	// ▲Add M.Yano 2010.03.15 

   equal: function() {
      if(this.field.form[this.extra].value && this.value != this.field.form[this.extra].value)
         return this.msg.unequal;
   },

   alphabet: function() {
      if(!this.value.match(/^[a-zA-Z\-\d]+$/))
         return this.msg.alphabet;
   },

   kana: function() {
		 // ▼Add M.Yano 2010.03.15 
		 if(!this.value.match(/^[\u30A1-\u30F6\u30FC\uFF01\u201D\uFF03\uFF04\uFF05\uFF06\u2019\uFF08\uFF09\uFF1D\u301C\uFF5C\u300E\uFF40\u300F\uFF0A\uFF0B\uFF3F\uFF1F\uFF1E\uFF1C\uFF20\u300C\u300D\uFF0F\u3002\u3001\uFF0E\uFFE5\uFF1A\uFF1B\u3000 ]*$/))
         return this.msg.kana;
      /*for(var i = 0;i < this.value.length;i++) {
         if(this.value.charAt(i) == ' ' || this.value.charAt(i) == '\u3000') continue;
				 
         if(this.value.charAt(i) < '\u30A1' || this.value.charAt(i) > '\u30F6')
            return this.msg.kana;
      }*/
			// ▲Add M.Yano 2010.03.15 
   },
   
   //半角カナ、機種依存文字チェック
   kishu: function() {
	  //var search_txt = "[①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡㍻〝〟№㏍℡㊤㊥㊦㊧㊨㈱㈲㈹㍾㍽㍼]";
     var search_txt = "[\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473\u2160\u2161\u2162\u2163\u2164\u2165\u2166\u2167\u2168\u2169\u3349\u3314\u3322\u334D\u3318\u3327\u3303\u3336\u3351\u3357\u330D\u3326\u3323\u332B\u334A\u333B\u3316\u3305\u3333\u334E\u3315\u3339\u3342\u339C\u339D\u339E\u338E\u338F\u33C4\u33A1\u337B\u301D\u301F\u2116\u33CD\u2121\u32A4\u32A5\u32A6\u32A7\u32A8\u3231\u3232\u3239\u337E\u337D\u337C\u2776\u2777\u2778\u2779\u277A\u277B\u277C\u277D\u277E\u2488\u2489\u248A\u248B\u248C\u248D\u248E\u248F\u2490\u2474\u2475\u2476\u2477\u2478\u2479\u247A\u247B\u247C\u247D\u247E\u247F\u2480\u2481\u2482\u2483\u2484\u2485\u2486\u2487\u2160\u2161\u2162\u2163\u2164\u2165\u2166\u2167\u2168\u2169\u2170\u2171\u2172\u2173\u2174\u2175\u2176\u2177\u2178\u2179\u2116\u33CD\u2121\u213B\u322A\u322B\u322C\u322E\u322F\u3230\u3237\u3300\u331E\u332A\u3331\u3347\u337F\u339C\u339F\u339D\u33A0\u33A4\u33A1\u33A5\u339E\u33A2\u338E\u338F\u33C4\u3396\u3397\u2113\u3398\u33B3\u33B2\u33B1\u33B0\u2109\u33D4\u33CB\u3390\u3385\u3386\u3387\u3020\u260E\uFE0E\u3004\u2664\u2667\u2661\u2662\u2660\uFE0E\u2663\uFE0E\u2665\u2666\uFE0E\u21E8\u21E6\u21E9\u21E7\u27A1\uFE0E\u2B05\uFE0E\u2B06\uFE0E\u2B07\uFE0E\u261E\u261C\u261D\uFE0E\u261F\u21C6\u21C4\u21C5\u3094\u30F4\u222E\u221F\u2211\u22BF\u249C\u249D\u249E\u249F\u24A0\u24A1\u24A2\u24A3\u24A4\u24A5\u24A6\u24A7\u24A8\u24A9\u24AA\u24AB\u24AC\u24AD\u24AE\u24AF\u24B0\u24B1\u24B2\u24B3\u24B4\u24B5]";
      if(this.value.match(/[｡-ﾟ]+/) || this.value.match(search_txt))
         return this.msg.kishu;
   },
	 
	 zenkaku: function() {
      //if(this.value.match(/^[ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦｧｨｩｪｫｯﾝﾞﾟa-zA-Z0-9]*$/)){
			//if(this.value.match(/^[\uFF71\uFF72\uFF73\uFF74\uFF75\uFF76\uFF77\uFF78\uFF79\uFF7A\uFF7B\uFF7C\uFF7D\uFF7E\uFF7F\uFF80\uFF81\uFF82\uFF83\uFF84\uFF85\uFF86\uFF87\uFF88\uFF89\uFF8A\uFF8B\uFF8C\uFF8D\uFF8E\uFF8F\uFF90\uFF91\uFF92\uFF93\uFF94\uFF95\uFF96\uFF97\uFF98\uFF99\uFF9A\uFF9B\uFF9C\uFF66\uFF67\uFF68\uFF69\uFF6A\uFF6B\uFF6F\uFF9D\uFF9E\uFF9Fa-zA-Z0-9 ]*$/)){
			if(!this.value.match(/^[^\uFF71\uFF72\uFF73\uFF74\uFF75\uFF76\uFF77\uFF78\uFF79\uFF7A\uFF7B\uFF7C\uFF7D\uFF7E\uFF7F\uFF80\uFF81\uFF82\uFF83\uFF84\uFF85\uFF86\uFF87\uFF88\uFF89\uFF8A\uFF8B\uFF8C\uFF8D\uFF8E\uFF8F\uFF90\uFF91\uFF92\uFF93\uFF94\uFF95\uFF96\uFF97\uFF98\uFF99\uFF9A\uFF9B\uFF9C\uFF66\uFF67\uFF68\uFF69\uFF6A\uFF6B\uFF6F\uFF9D\uFF9E\uFF9F -~｡-ﾟ]*$/)){
				//if(this.value.match(/[ｱ-ﾝ-~｡-]/)){
         return this.msg.zenkaku;
				//}
			}
   },

   count: function(arg) {
      return this._range(arg, this.value.length, this.msg.count);
   },

   num: function(arg) {
      if(!this.value.match(/^[0-9 -]+$/))
         return this.msg.num.nonumber;

      return this._range(arg, parseInt(this.value), this.msg.num);
   },

   check: function(arg) {
      var value = 0;
      for(var i = 0, e; e = this.field.form[this.field.name][i]; i++)
         if(e.checked) value += 1;

      return this._range(arg, value, this.msg.check);
   },

   _range: function(range, value, msg) {
      if(!range) return;

      var result = '';
      var c = (" "+range).split(/\-/);
      var min = parseInt(c[0]) || 0;
      var max = parseInt(c[1]) || 0;

      if(value != min && /^\d+$/.test(range))
         result = msg.unequal;
      else if(min == 0 && value > max)
         result = msg.too_big;
      else if(max == 0 && value < min)
         result = msg.too_small;
      else if(min > 0 && max > 0 && (value < min || value > max))
         result = msg.outofrange;

      return result.replace(/%1/g, min).replace(/%2/g, max);
   }
};

// 文字化けを防ぐためescape文字で登録
// http://www.shuwasystem.co.jp/books/gremon/escape.html
Validator.lang = {
   ja: {
      noselect:   '\u9078\u629E\u304C\u5FC5\u8981\u3067\u3059\u3002',
      noinput:    '\u672A\u5165\u529B\u3067\u3059\u3002',
      unequal:    '\u5165\u529B\u304C\u63C3\u3063\u3066\u3044\u307E\u305B\u3093\u3002',
   
      submit:     '\u5165\u529B\u30A8\u30E9\u30FC\u304C\u3042\u308A\u307E\u3059\u3002',
      mail:       '\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u306E\u5F62\u5F0F\u304C\u6B63\u3057\u304F\u3042\u308A\u307E\u305B\u3093\u3002',
			tel:       '\u96FB\u8A71\u756A\u53F7\u306E\u5F62\u5F0F\u304C\u6B63\u3057\u304F\u3042\u308A\u307E\u305B\u3093\u3002',
      alphabet:   '\u30A2\u30EB\u30D5\u30A1\u30D9\u30C3\u30C8\u3001\u6570\u5B57\u3001' +
                     '- \u4EE5\u5916\u306F\u5165\u529B\u51FA\u6765\u307E\u305B\u3093\u3002',
      kana:       '\u5168\u89D2\u30AB\u30BF\u30AB\u30CA\u3067\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002',
	  kishu:       '\u534A\u89D2\u30AB\u30BF\u30AB\u30CA\u307E\u305F\u306F\u6A5F\u7A2E\u4F9D\u5B58\u6587\u5B57\u304C\u542B\u307E\u308C\u3066\u3044\u307E\u3059\u3002',
			zenkaku:    '\u5168\u89D2\u3067\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002',
   
      count: {
         unequal:    '%1'+'\u6587\u5B57\u3067\u5165\u529B\u3057\u3066\u4E0B\u3055\u3044\u3002',
         too_big:    '%2'+'\u6587\u5B57\u4EE5\u5185\u3067\u5165\u529B\u3057\u3066\u4E0B\u3055\u3044\u3002',
         too_small:  '%1'+'\u6587\u5B57\u4EE5\u4E0A\u5165\u529B\u3057\u3066\u4E0B\u3055\u3044\u3002',
         outofrange: '%1'+'\u304B\u3089'+'%2'+'\u6587\u5B57\u306E\u9593\u3067\u5165\u529B\u3057\u3066\u4E0B\u3055\u3044\u3002'
      },
   
      num: {
         nonumber:   '\u534A\u89D2\u6570\u5B57\u3067\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002',
         unequal:    '%1'+'\u3068\u5165\u529B\u3057\u3066\u4E0B\u3055\u3044\u3002',
         too_big:    '%2'+'\u4EE5\u4E0B\u306E\u5024\u3092\u5165\u529B\u3057\u3066\u4E0B\u3055\u3044\u3002',
         too_small:  '%1'+'\u4EE5\u4E0A\u306E\u5024\u3092\u5165\u529B\u3057\u3066\u4E0B\u3055\u3044\u3002',
         outofrange: '%1'+'\u304B\u3089'+'%2'+'\u306E\u9593\u3067\u5165\u529B\u3057\u3066\u4E0B\u3055\u3044\u3002'
      },
   
      check: {
         unequal:    '\u30C1\u30A7\u30C3\u30AF\u306F'+'%1'+'\u500B\u3057\u3066\u4E0B\u3055\u3044\u3002',
         too_big:    '\u30C1\u30A7\u30C3\u30AF\u306F'+'%2'+'\u500B\u307E\u3067\u3067\u3059\u3002',
         too_small:  '\u30C1\u30A7\u30C3\u30AF\u306F'+'%1'+'\u500B\u4EE5\u4E0A\u3057\u3066\u4E0B\u3055\u3044\u3002',
         outofrange: '\u30C1\u30A7\u30C3\u30AF\u306F'+'%1'+'\u500B\u304B\u3089'+'%2'+'\u500B\u307E\u3067\u3067\u3059\u3002'
      }
   }
};

Validator.rule.msg = Validator.lang.ja;









////////////////////////////////////////
//
// Util
//
////////////////////////////////////////


var addEvent = (window.addEventListener) ?
   (function(elm, type, event) {
      elm.addEventListener(type, event, false);
   }) : (window.attachEvent) ?
   (function(elm, type, event) {
      elm.attachEvent('on'+type, event);
   }) :
   (function(elm, type, event) {
      elm['on'+type] = event;
   }) ;

var Position = {
   offset: function(elm) {
      var pos = {};
      pos.x = this.getOffset('Left', elm);
      pos.y = this.getOffset('Top', elm);
      return pos;
   },

   getOffset: function(prop, el) {
      if(!el.offsetParent || el.offsetParent.tagName.toLowerCase() == "body")
         return el['offset'+prop];
      else
         return el['offset'+prop]+ this.getOffset(prop, el.offsetParent);
   }
};













