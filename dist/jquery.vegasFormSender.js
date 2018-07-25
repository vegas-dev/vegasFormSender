/**
 * @name vegas form sender
 * @copyright by vegas s.
 * @date: 23.07.2018
 * @version  1.0
 *
 * Описание.
 * Программа для сборки данных с формы и отправки их на сервер через ajax,
 * упрощая обработку и выдачу результата...
 *
 * Инструкции.
 * Инициализация: $('#какая-то форма').vegasFormSender();
 *
 * Параметры:
 * action: путь до обработчика, так же может быть указан непосредственно в форме.
 * method: метод отправки get или post, так же может быть указан непосредственно в форме.
 * fields: дополнительные параметры, указываются в ввиде объекта {ключ: значение},
 * либо этот объект возвращается через колбэк например:
 * fields: function() {
 * 		return {ключ: значение}
 * }
 * redirectError: перенаправление на страницу с фатальной ошибкой
 * redirectSuccess: перенаправление на страницу после успешного запроса
 *
 * Обработчики событий:
 * Плагин возвращает два события, об удачной отправке или о фатальной ошибке:
 * success: function (data) {
 * 		// ответ пришел от сервера
 * }
 * error: function (status) {
 * 		// ответ не пришел от сервера
 * }
 */
(function( $ ) {

	$.fn.vegasFormSender = function(options) {

		var options = $.extend({
			error: function() {},
			success: function() {}
		}, arguments[0] || {});

		var form = this,
			action = options.action || form.attr('action') || location.href,
			method = options.method || form.attr('method') || 'get',
			fields = options.fields  ? options.fields : false,
			redirectSuccess = options.redirectSuccess || form.data('redirect-success') || false,
			redirectError = options.redirectError  || form.data('redirect-error') || false;

			if (fields && typeof fields == 'function') {
				fields = options.fields();
			}

		form.on('submit', function () {

			var data = new FormData(this);

			if (fields) {
				for(var name in fields) {
					data.append(name, fields[name]);
				}
			}

			$.ajax({
				url: action,
				method: method,
				data: data,
				cache: false,
				contentType: false,
				processData: false,
				success: function (data) {
					var obj = $.parseJSON(data);

					if (redirectSuccess) {
						window.location.href = redirectSuccess;
					}

					options.success.call(this, obj);
				},
				error: function (jqXHR, exception) {
					var status = '';

					if (jqXHR.status === 0) {
						msg = 'Not connect.\n Verify Network.';
					} else if (jqXHR.status == 404) {
						msg = 'Requested page not found. [404]';
					}  else if (jqXHR.status == 405) {
						msg = 'Method Not Allowed. [405]';
					} else if (jqXHR.status == 500) {
						msg = 'Internal Server Error [500].';
					} else if (exception === 'parsererror') {
						msg = 'Requested JSON parse failed.';
					} else if (exception === 'timeout') {
						msg = 'Time out error.';
					} else if (exception === 'abort') {
						msg = 'Ajax request aborted.';
					} else {
						msg = 'Uncaught Error.\n' + jqXHR.responseText;
					}

					if (redirectError) {
						window.location.href = redirectError;
					}

					options.error.call(this, status);
				}
			});

			return false;
		});

		return this;

	};
})(jQuery);