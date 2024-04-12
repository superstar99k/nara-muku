/* (c) KiKiNote */

// COOKIE¤Ë»ÈÍÑ¤¹¤Eey¡ÊÅ¬Åö¤ÊÊ¸»úÎó¡Ë
var key = 'SetFormData';

// COOKIE¤Ø½ñ¤­¹ş¤ß
function SetCookie() {
	var p = new Array();
	var d1 = document.getElementsByTagName('input');
	for (var i = 0; i < d1.length; i++) {
		if (d1[i].checked) p.push(d1[i].id + '&Chkd');
		if (d1[i].type == 'text') p.push(d1[i].id + '&' + escape(d1[i].value));
		if (d1[i].type == 'tel') p.push(d1[i].id + '&' + escape(d1[i].value));
		if (d1[i].type == 'email') p.push(d1[i].id + '&' + escape(d1[i].value));
	}
	var d2 = document.getElementsByTagName('select');
	for (var i = 0; i < d2.length; i++) {
		var s = new Array();
		for ( var n = 0; n < d2[i].options.length; n++) {
			p.push(d2[i].id + '&' + d2[i].options[n].selected + '&' + n);
		}
	}
	var d3 = document.getElementsByTagName('textarea');
	for (var i = 0; i < d3.length; i++) {
		p.push(d3[i].id + '&' + escape(d3[i].value));
	}
	var ssl = (document.location.protocol == 'https:') ? ';secure' : '';
	document.cookie = key + '=' + p.join('|') + '|_EOD;' + ExpDate(60) + ssl;
}

// COOKIE¤ÎÍ­¸ú´EÂ¤ò¼èÆÀ
function ExpDate(t) {
	exp = new Date();
	exp.setTime(exp.getTime() + 1000 * t);
	return 'expires=' + exp.toGMTString();
}

// COOKIE¤Î¥Ç¡¼¥¿¤ò¸µ¤ËÌá¤¹
function SetParam() {
	if (document.cookie) {
		var k = key + '=';
		var p = new Array();
		var c = document.cookie;
		var st = c.indexOf(k, 0);
		var ed = c.indexOf('|_EOD', 0);
		var d = c.substring(st + k.length, ed);
		p = d.split('|');
		for (var i = 0; i < p.length; i++) {
			v = p[i].split('&');
			if (v[1] == 'Chkd') document.getElementById(v[0]).checked = true;
			else if (v[1] == 'true') document.getElementById(v[0]).options[v[2]].selected = true;
			else if (v[1] == 'false') document.getElementById(v[0]).options[v[2]].selected = false;
			else if (v[1]) document.getElementById(v[0]).value = unescape(v[1]);
		}
		//document.getElementById('agreecheck').checked = false;
		DelCookie();
	}
}

// COOKIE¾ÃµE
function DelCookie() {
	document.cookie = key + '=;' + ExpDate(-1);
}

// ¥Ú¡¼¥¸ÆÉ¤ß¹ş¤ß¤ÈÁ÷¿®»ş¤Î½èÍı
window.onload = SetParam;
window.onsubmit = SetCookie;
