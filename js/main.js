// Валидация имейла
function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

function validatePhone(phone) {
	var re = /\+7\s\d{3}\s\d{3}\-\d{2}\-\d{2}/;
	return re.test(phone);
}

function checkFill(input, button) {
	var $this = $(input);
	var inputValue = $this.val();
	var submitButton = button;
	if (!inputValue || !validatePhone(inputValue)) {
		submitButton.addClass('disabled');
	} else {
		submitButton.removeClass('disabled');
	}
}

function checkInput(e) {
	var $input = $(e.target);
	var inputValue = input.val();
	var obj = $(this).parent().parent();
	console.log(obj);
	if (!inputValue || !validatePhone(inputValue)) {
		$input.addClass('input--error');
		setTimeout(function () {
			$input.removeClass('input--error');
		}, 10000);
		if ($(obj).hasClass('js-hover')) {
			$(obj).addClass('input--error');
			setTimeout(function () {
				$(obj).removeClass('input--error');
			}, 10000);
		}
		return false;
	}
}

function main() {
	var submitButton = $('.js-excursion-button');
	var submitButtonWrap = $('.js-excursion-button-wrap');
	var excursionInput = $('.js-excursion-input');
	var form = $('.js-excursion-form');

	checkFill(excursionInput, submitButton);
	$('.js-excursion-input').on('keyup keydown change', function (e) {
		checkFill($(this), submitButton);
	});

	// Запрет ввода нечисловых значений в инпут телефона
	$('.js-excursion-input').mask('+7 000 000-00-00');
	$('.js-excursion-input').on('focus', function () {
		var $this = $(this);
		if ($this.val() === '') {
			$this.val('+7 ');
		}
		return true;
	});

	excursionInput.on('blur', function () {
		var $this = $(this);
		if ($this.val() === '+7 ') {
			$this.val('');
		}
	});

	$('.js-excursion-form').submit(postPhone);
}

// Post phone inputs.
function postPhone(event) {
	var $this = $(this);
	var $input = $this.children('.input');
	var $button = $this.children('.button');
	var values = {
		data: $input.val(),
		area: '',
		where: []
	};
	var $message = $this.children('.js-form-message');
	var type = {
		name: '',
		title: ''
	};
	// console.log('form init', $this);

	switch (true) {

		case this.classList.contains('js-excursion-form'):
			type.name = 'excursion';
			type.title = 'Заявка';
			break;

	}

	var obj = $input.parent().parent();

	if (!values.data || !validatePhone(values.data) || (type.name === 'galleryside' && values.area.length && values.where.length)) {
		$input.addClass('input--error');

		setTimeout(function () {
			$input.removeClass('input--error');
		}, 1000);
		event.preventDefault();
		return;
	}

	$this.addClass('mailing__form--sending');
	$button.attr('disabled', true);

	var url, data;
	if($('body').hasClass('tumen')){
			url = 'mail-tumen.php';
	}
		if($('body').hasClass('ekat')){
			url = 'mail-ekat.php';
	}
	if($('body').hasClass('surgut')){
			url = 'mail-surgut.php';
	}
		if($('body').hasClass('novosib')){
			url = 'mail-novosib.php';
	}
		data = values.data;

	$.post(url, {
			data: data
		}).fail(function (data) {
			alert('Форма не отправилась :−(\nПозвоните нам: +7 343 300-92-58');
			$this.removeClass('mailing__form--sending');
			$button.attr('disabled', false);
		})
		.done(function (data) {
			if (data === 'OK') {
				var currentMSKHour = new Date().getUTCHours() + 3;
				var message = '';

				switch (true) {
					case currentMSKHour >= 0 && currentMSKHour <= 8:
						message = 'Спасибо! Мы&nbsp;ещё не&nbsp;на&nbsp;работе, наберём между 9&nbsp;и&nbsp;10&nbsp;утра';
						break;

					case currentMSKHour >= 9 && currentMSKHour <= 19:
						message = 'Спасибо! Перезвоним в&nbsp;течение получаса';
						break;

					case currentMSKHour >= 20 && currentMSKHour <= 23:
						message = 'Спасибо! Мы&nbsp;уже сбежали по&nbsp;домам, перезвоним завтра между 9&nbsp;и&nbsp;10&nbsp;утра';
						break;

					default:
						message = 'Спасибо! Мы&nbsp;ещё не&nbsp;на&nbsp;работе, наберём между 9&nbsp;и&nbsp;10&nbsp;утра';
				}

				$message.html(message);
				$this.addClass('mailing__form--sent');
			} else {
				alert('Форма не отправилась :−(\nПозвоните нам: +7 343 300-92-58');
			}

			$this.removeClass('mailing__form--sending');
			$button.attr('disabled', false);
		});

	event.preventDefault();
}


$(function () {
	var $body = $('html,body');

	$('.js-add-feedback-link').click(function () {
		$body.animate({
			scrollTop: $('#call').offset().top - 350 + 'px'
		}, 600, function () {
			$('#call').focus();
		});

	});
	main();
});

// jQuery Mask Plugin v1.14.0
// github.com/igorescobar/jQuery-Mask-Plugin
(function(b){"function"===typeof define&&define.amd?define(["jquery"],b):"object"===typeof exports?module.exports=b(require("jquery")):b(jQuery||Zepto)})(function(b){var y=function(a,e,d){var c={invalid:[],getCaret:function(){try{var r,b=0,e=a.get(0),d=document.selection,f=e.selectionStart;if(d&&-1===navigator.appVersion.indexOf("MSIE 10"))r=d.createRange(),r.moveStart("character",-c.val().length),b=r.text.length;else if(f||"0"===f)b=f;return b}catch(g){}},setCaret:function(r){try{if(a.is(":focus")){var c,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             b=a.get(0);b.setSelectionRange?(b.focus(),b.setSelectionRange(r,r)):(c=b.createTextRange(),c.collapse(!0),c.moveEnd("character",r),c.moveStart("character",r),c.select())}}catch(e){}},events:function(){a.on("keydown.mask",function(c){a.data("mask-keycode",c.keyCode||c.which)}).on(b.jMaskGlobals.useInput?"input.mask":"keyup.mask",c.behaviour).on("paste.mask drop.mask",function(){setTimeout(function(){a.keydown().keyup()},100)}).on("change.mask",function(){a.data("changed",!0)}).on("blur.mask",function(){n===
c.val()||a.data("changed")||a.trigger("change");a.data("changed",!1)}).on("blur.mask",function(){n=c.val()}).on("focus.mask",function(a){!0===d.selectOnFocus&&b(a.target).select()}).on("focusout.mask",function(){d.clearIfNotMatch&&!p.test(c.val())&&c.val("")})},getRegexMask:function(){for(var a=[],c,b,d,f,l=0;l<e.length;l++)(c=g.translation[e.charAt(l)])?(b=c.pattern.toString().replace(/.{1}$|^.{1}/g,""),d=c.optional,(c=c.recursive)?(a.push(e.charAt(l)),f={digit:e.charAt(l),pattern:b}):a.push(d||
c?b+"?":b)):a.push(e.charAt(l).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"));a=a.join("");f&&(a=a.replace(new RegExp("("+f.digit+"(.*"+f.digit+")?)"),"($1)?").replace(new RegExp(f.digit,"g"),f.pattern));return new RegExp(a)},destroyEvents:function(){a.off("input keydown keyup paste drop blur focusout ".split(" ").join(".mask "))},val:function(c){var b=a.is("input")?"val":"text";if(0<arguments.length){if(a[b]()!==c)a[b](c);b=a}else b=a[b]();return b},getMCharsBeforeCount:function(a,c){for(var b=0,d=0,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             f=e.length;d<f&&d<a;d++)g.translation[e.charAt(d)]||(a=c?a+1:a,b++);return b},caretPos:function(a,b,d,h){return g.translation[e.charAt(Math.min(a-1,e.length-1))]?Math.min(a+d-b-h,d):c.caretPos(a+1,b,d,h)},behaviour:function(d){d=d||window.event;c.invalid=[];var e=a.data("mask-keycode");if(-1===b.inArray(e,g.byPassKeys)){var m=c.getCaret(),h=c.val().length,f=c.getMasked(),l=f.length,k=c.getMCharsBeforeCount(l-1)-c.getMCharsBeforeCount(h-1),n=m<h;c.val(f);n&&(8!==e&&46!==e&&(m=c.caretPos(m,h,l,k)),
  c.setCaret(m));return c.callbacks(d)}},getMasked:function(a,b){var m=[],h=void 0===b?c.val():b+"",f=0,l=e.length,k=0,n=h.length,q=1,p="push",u=-1,t,w;d.reverse?(p="unshift",q=-1,t=0,f=l-1,k=n-1,w=function(){return-1<f&&-1<k}):(t=l-1,w=function(){return f<l&&k<n});for(;w();){var x=e.charAt(f),v=h.charAt(k),s=g.translation[x];if(s)v.match(s.pattern)?(m[p](v),s.recursive&&(-1===u?u=f:f===t&&(f=u-q),t===u&&(f-=q)),f+=q):s.optional?(f+=q,k-=q):s.fallback?(m[p](s.fallback),f+=q,k-=q):c.invalid.push({p:k,
  v:v,e:s.pattern}),k+=q;else{if(!a)m[p](x);v===x&&(k+=q);f+=q}}h=e.charAt(t);l!==n+1||g.translation[h]||m.push(h);return m.join("")},callbacks:function(b){var g=c.val(),m=g!==n,h=[g,b,a,d],f=function(a,b,c){"function"===typeof d[a]&&b&&d[a].apply(this,c)};f("onChange",!0===m,h);f("onKeyPress",!0===m,h);f("onComplete",g.length===e.length,h);f("onInvalid",0<c.invalid.length,[g,b,a,c.invalid,d])}};a=b(a);var g=this,n=c.val(),p;e="function"===typeof e?e(c.val(),void 0,a,d):e;g.mask=e;g.options=d;g.remove=
  function(){var b=c.getCaret();c.destroyEvents();c.val(g.getCleanVal());c.setCaret(b-c.getMCharsBeforeCount(b));return a};g.getCleanVal=function(){return c.getMasked(!0)};g.getMaskedVal=function(a){return c.getMasked(!1,a)};g.init=function(e){e=e||!1;d=d||{};g.clearIfNotMatch=b.jMaskGlobals.clearIfNotMatch;g.byPassKeys=b.jMaskGlobals.byPassKeys;g.translation=b.extend({},b.jMaskGlobals.translation,d.translation);g=b.extend(!0,{},g,d);p=c.getRegexMask();!1===e?(d.placeholder&&a.attr("placeholder",d.placeholder),
a.data("mask")&&a.attr("autocomplete","off"),c.destroyEvents(),c.events(),e=c.getCaret(),c.val(c.getMasked()),c.setCaret(e+c.getMCharsBeforeCount(e,!0))):(c.events(),c.val(c.getMasked()))};g.init(!a.is("input"))};b.maskWatchers={};var A=function(){var a=b(this),e={},d=a.attr("data-mask");a.attr("data-mask-reverse")&&(e.reverse=!0);a.attr("data-mask-clearifnotmatch")&&(e.clearIfNotMatch=!0);"true"===a.attr("data-mask-selectonfocus")&&(e.selectOnFocus=!0);if(z(a,d,e))return a.data("mask",new y(this,
  d,e))},z=function(a,e,d){d=d||{};var c=b(a).data("mask"),g=JSON.stringify;a=b(a).val()||b(a).text();try{return"function"===typeof e&&(e=e(a)),"object"!==typeof c||g(c.options)!==g(d)||c.mask!==e}catch(n){}};b.fn.mask=function(a,e){e=e||{};var d=this.selector,c=b.jMaskGlobals,g=c.watchInterval,c=e.watchInputs||c.watchInputs,n=function(){if(z(this,a,e))return b(this).data("mask",new y(this,a,e))};b(this).each(n);d&&""!==d&&c&&(clearInterval(b.maskWatchers[d]),b.maskWatchers[d]=setInterval(function(){b(document).find(d).each(n)},
  g));return this};b.fn.masked=function(a){return this.data("mask").getMaskedVal(a)};b.fn.unmask=function(){clearInterval(b.maskWatchers[this.selector]);delete b.maskWatchers[this.selector];return this.each(function(){var a=b(this).data("mask");a&&a.remove().removeData("mask")})};b.fn.cleanVal=function(){return this.data("mask").getCleanVal()};b.applyDataMask=function(a){a=a||b.jMaskGlobals.maskElements;(a instanceof b?a:b(a)).filter(b.jMaskGlobals.dataMaskAttr).each(A)};var p={maskElements:"input,td,span,div",
  dataMaskAttr:"*[data-mask]",dataMask:!0,watchInterval:300,watchInputs:!0,useInput:function(a){var b=document.createElement("div"),d;a="on"+a;d=a in b;d||(b.setAttribute(a,"return;"),d="function"===typeof b[a]);return d}("input"),watchDataMask:!1,byPassKeys:[9,16,17,18,36,37,38,39,40,91],translation:{0:{pattern:/\d/},9:{pattern:/\d/,optional:!0},"#":{pattern:/\d/,recursive:!0},A:{pattern:/[a-zA-Z0-9]/},S:{pattern:/[a-zA-Z]/}}};b.jMaskGlobals=b.jMaskGlobals||{};p=b.jMaskGlobals=b.extend(!0,{},p,b.jMaskGlobals);
  p.dataMask&&b.applyDataMask();setInterval(function(){b.jMaskGlobals.watchDataMask&&b.applyDataMask()},p.watchInterval)});


