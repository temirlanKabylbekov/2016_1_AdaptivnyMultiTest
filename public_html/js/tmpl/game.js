define(function () { return function (__fest_context){"use strict";var __fest_self=this,__fest_buf="",__fest_chunks=[],__fest_chunk,__fest_attrs=[],__fest_select,__fest_if,__fest_iterator,__fest_to,__fest_fn,__fest_html="",__fest_blocks={},__fest_params,__fest_element,__fest_debug_file="",__fest_debug_line="",__fest_debug_block="",__fest_htmlchars=/[&<>"]/g,__fest_htmlchars_test=/[&<>"]/,__fest_short_tags = {"area":true,"base":true,"br":true,"col":true,"command":true,"embed":true,"hr":true,"img":true,"input":true,"keygen":true,"link":true,"meta":true,"param":true,"source":true,"wbr":true},__fest_element_stack = [],__fest_htmlhash={"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"},__fest_jschars=/[\\'"\/\n\r\t\b\f<>]/g,__fest_jschars_test=/[\\'"\/\n\r\t\b\f<>]/,__fest_jshash={"\"":"\\\"","\\":"\\\\","/":"\\/","\n":"\\n","\r":"\\r","\t":"\\t","\b":"\\b","\f":"\\f","'":"\\'","<":"\\u003C",">":"\\u003E"},___fest_log_error;if(typeof __fest_error === "undefined"){___fest_log_error = (typeof console !== "undefined" && console.error) ? function(){return Function.prototype.apply.call(console.error, console, arguments)} : function(){};}else{___fest_log_error=__fest_error};function __fest_log_error(msg){___fest_log_error(msg+"\nin block \""+__fest_debug_block+"\" at line: "+__fest_debug_line+"\nfile: "+__fest_debug_file)}function __fest_replaceHTML(chr){return __fest_htmlhash[chr]}function __fest_replaceJS(chr){return __fest_jshash[chr]}function __fest_extend(dest, src){for(var i in src)if(src.hasOwnProperty(i))dest[i]=src[i];}function __fest_param(fn){fn.param=true;return fn}function __fest_call(fn, params,cp){if(cp)for(var i in params)if(typeof params[i]=="function"&&params[i].param)params[i]=params[i]();return fn.call(__fest_self,params)}function __fest_escapeJS(s){if (typeof s==="string") {if (__fest_jschars_test.test(s))return s.replace(__fest_jschars,__fest_replaceJS);} else if (typeof s==="undefined")return "";return s;}function __fest_escapeHTML(s){if (typeof s==="string") {if (__fest_htmlchars_test.test(s))return s.replace(__fest_htmlchars,__fest_replaceHTML);} else if (typeof s==="undefined")return "";return s;}var json=__fest_context;__fest_buf+=("<div class=\"preloader\"><div class=\"preloader__stripe\"><div class=\"preloader__round\"><img class=\"preloader__logo\" src=\"static\/compressed\/snake_logo.png\"/></div></div><h2 class=\"preloader__text\">Поиск соперника</h2><div class=\"preloader__left-curtain\"></div><div class=\"preloader__right-curtain\"></div></div><div class=\"main-game\"><div class=\"main-game__main-area main main_game\"><canvas class=\"main-game__canvas\" id=\"gameCanvas\" width=\"490\" height=\"490\"></canvas></div><a class=\"main-game__btn btn  js-btn\" href=\"#main\">Quit</a></div><div class=\"bs-modal modal fade js-modal-no-enemy\" role=\"dialog\" aria-hidden=\"true\"><div class=\"bs-modal__area modal-dialog\"><div class=\"bs-modal__content modal-content\"><div class=\"bs-modal__header modal-header\"><button type=\"button\" class=\"bs-modal__btn-close close\" data-dismiss=\"modal\">x</button><h4 class=\"bs-modal__title modal-title\">Соперник не найден</h4></div><div class=\"bs-modal__text modal-body\"><p>К сожалению сейчас нет свободных игроков. Загляните попозже или сыграйте в одиночную игру</p></div><div class=\"bs-modal__footer modal-footer\"><button class=\"bs-modal__btn-close btn btn-default\" type=\"button\" data-dismiss=\"modal\">Закрыть</button><a class=\"bs-modal__btn btn btn-default\" href=\"#main\">Вернуться в главное меню</a></div></div></div></div><div class=\"bs-modal modal fade js-modal-no-response-from-server\" role=\"dialog\" aria-hidden=\"true\"><div class=\"bs-modal__area modal-dialog\"><div class=\"bs-modal__content modal-content\"><div class=\"bs-modal__header modal-header\"><button type=\"button\" class=\"bs-modal__btn-close close\" data-dismiss=\"modal\">x</button><h4 class=\"bs-modal__title modal-title\">Сервер не отвечает</h4></div><div class=\"bs-modal__text modal-body\"><p>По каким-то причинам сервер сейчас недоступен. Проверьте соединение с интернетом, сыграйте в одиночную игру и подождите пока мы решим проблему</p></div><div class=\"bs-modal__footer modal-footer\"><a class=\"bs-modal__btn btn btn-default\" href=\"#singleGame\">Одиночная игра</a><a class=\"bs-modal__btn btn btn-default\" href=\"#main\">В главное меню</a></div></div></div></div>");__fest_to=__fest_chunks.length;if (__fest_to) {__fest_iterator = 0;for (;__fest_iterator<__fest_to;__fest_iterator++) {__fest_chunk=__fest_chunks[__fest_iterator];if (typeof __fest_chunk==="string") {__fest_html+=__fest_chunk;} else {__fest_fn=__fest_blocks[__fest_chunk.name];if (__fest_fn) __fest_html+=__fest_call(__fest_fn,__fest_chunk.params,__fest_chunk.cp);}}return __fest_html+__fest_buf;} else {return __fest_buf;}} ; });