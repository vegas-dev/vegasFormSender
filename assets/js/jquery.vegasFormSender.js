(function ($) {

	$.fn.vegasFormSender = function (options) {

		options = $.extend({
			error: function () {
			},
			success: function () {
			},
			beforeSend: function () {
			},
			validate: function () {
			}
		}, arguments[0] || {});

		var $form = this;

		$form.each(function () {
			var form = $(this),
				action = options.action || form.attr('action') || location.href,
				method = options.method || form.attr('method') || 'get',
				fields = options.fields ? options.fields : false,
				redirectSuccess = options.redirectSuccess || form.data('redirect-success') || false,
				redirectError = options.redirectError || form.data('redirect-error') || false;

			if (fields && typeof fields == 'function') {
				fields = options.fields();
			}

			var valid = true;

			form.on('submit', function () {

				var data = new FormData(this),
					$required = $(this).find('[data-validate]');

				if ($required.length) {
					var errors = required($required);

					options.validate.call(this, form, errors);

					if (errors.length) valid = false;
				}

				if (valid) {
					if (fields) {
						for (var name in fields) {
							if (typeof fields[name] === 'object') {
								for (var key in fields[name]) {
									var arr = Object.keys(fields[name][key]).map(function (i) {
										return fields[name][key][i];
									});
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
							var obj = data;

							if (redirectSuccess) {
								window.location.href = redirectSuccess;
							} else {
								options.success.call(this, obj, form);
							}
						},
						error: function (jqXHR, exception) {
							var json = JSON.parse(jqXHR.responseText);
							var msg;

							if (json.errors) {
								msg = json.errors[Object.keys(json.errors)[0]][0];
							} else {
								msg = json.message || json.msg;
							}

							options.error.call(this, msg, form);
						}
					});
				}

				return false;
			});

			function required($elements) {
				var errors = [];

				$elements.each(function () {
					var $el = $(this);

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
