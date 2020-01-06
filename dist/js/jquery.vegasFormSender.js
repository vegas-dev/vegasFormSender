/**
 * @name vegas form sender
 * @copyright by vegas s.
 * @date: 23.07.2018
 * @version  2.0
 *
 * Описание.
 * Программа для сборки данных с формы и отправки их на сервер через ajax,
 * упрощая обработку и выдачу результата...
 *
 * Инициализация: $('#какая-то форма').vegasFormSender();
 *
 */

(function( $ ) {
	
	$.fn.vegasFormSender = function(options) {
		
		options = $.extend({
			error: function() {},
			success: function() {},
			beforeSend: function() {},
			validate: function() {}
		}, arguments[0] || {});
		
		let $form = this;
		
		$form.each(function () {
			let form = $(this),
				action = options.action || form.attr('action') || location.href,
				method = options.method || form.attr('method') || 'get',
				fields = options.fields  ? options.fields : false,
				mask = form.find('input[data-mask]') || false,
				redirectSuccess = options.redirectSuccess || form.data('redirect-success') || false,
				redirectError = options.redirectError  || form.data('redirect-error') || false;
			
			if (fields && typeof fields == 'function') {
				fields = options.fields();
			}
			
			if (mask && typeof $.fn.inputmask !== 'undefined') {
				mask.each(function () {
					let type = $(this).data('mask'),
						params = {};
					
					if (type === 'phone') {
						params.mask = "8(999) 999-99-99";
					}
					
					$(this).inputmask(params);
				});
			} else if(typeof $.fn.inputmask === 'undefined' || !typeof $.fn.inputmask) {
				console.error('Plugin InputMask not installed');
			}
			
			let valid = true;
			
			form.on('submit', function () {
				
				let data = new FormData(this),
					$required = $(this).find('[data-validate]');
				
				if ($required.length) {
					let errors = required($required);
					
					options.validate.call(this, form, errors);
					
					if (errors.length) valid = false;
				}
				
				if (valid) {
					if (fields) {
						for(var name in fields) {
							if (typeof fields[name] === 'object') {
								for(let key in fields[name]) {
									let arr = Object .keys (fields[name][key]) .map (i => fields[name][key] [i]);
									data.append(name, arr);
								}
							} else {
								data.append(name, fields[name]);
							}
						}
					}
					
					$.ajax({
						url: action,
						method: method,
						data: data,
						cache: false,
						contentType: false,
						processData: false,
						beforeSend: function () {
							options.beforeSend.call(this, form);
						},
						success: function (data) {
							let obj = data;
							
							if (redirectSuccess) {
								window.location.href = redirectSuccess;
							} else {
								options.success.call(this, obj, form);
							}
						},
						error: function (jqXHR, exception) {
							let status = '',
								msg = '';
							
							if (jqXHR.status === 0) {
								msg = 'Not connect.\n Verify Network.';
							} else if (jqXHR.status == 404) {
								msg = 'Requested page not found. [404]';
							} else if (jqXHR.status == 422) {
								msg = 'Unprocessable Entity. [422]';
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
							} else {
								options.error.call(this, msg, form);
							}
						}
					});
				}
				
				return false;
			});
			
			function required($elements) {
				let errors = [];
				
				$elements.each(function () {
					let $el = $(this);
					
					if ($el.val() === '') {
						errors.push($el);
					}
				});
				
				return errors;
			}
		});
		
		return this;
	};
})(jQuery);