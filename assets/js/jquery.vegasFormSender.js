(function ($) {

	$.fn.vegasFormSender = function (options) {

		options = $.extend({
			error: function () {},
			success: function () {},
			beforeSend: function () {},
			validate: function () {}
		}, arguments[0] || {});

		var $form = this;

		$form.each(function () {
			var form = $(this),
				action = options.action || form.attr('action') || location.href,
				method = options.method || form.attr('method') || 'get',
				fields = options.fields ? options.fields : false,
				redirectSuccess = options.redirectSuccess || form.data('redirect-success') || false,
				redirectError = options.redirectError || form.data('redirect-error') || false,
				lang = options.lang || form.data('lang') || 'ru',
				jsonParse = options.jsonParse || form.data('json-parse') || false;

			if (fields && typeof fields == 'function') {
				fields = options.fields();
			}

			var params = {
				lang: lang
			};
			
			form.addClass('vg-form-sender');
			var $inputs = form.find('input, select, textarea');
			$inputs.each(function () {
				$(this).parent('div').addClass('vg-form-sender__selector');
			});

			form.on('submit', function () {

				var data = new FormData(this),
					$required = $(this).find('[data-validate]'),
					valid = true;

				if ($required.length) {
					var errors = required($required);

					options.validate.call(this, form, params, errors);

					if (errors.empty.length || errors.email.length || errors.password.length || errors.checkbox.length || errors.radio.length || errors.select.length) valid = false;
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
							options.beforeSend.call(this, form, params);
						},
						success: function (data) {
							var obj;

							if (jsonParse) {
								obj = JSON.parse(data);
							} else {
								obj = data;
							}

							if (redirectSuccess) {
								window.location.href = redirectSuccess;
							} else {
								options.success.call(this, obj, form, params);
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
							
							if (redirectError) {
								window.location.href = redirectError;
							} else {
								options.error.call(this, msg, form, params);
							}
						}
					});
				}

				return false;
			});

			function required($elements) {
				var errors = {
					'empty': [],
					'email': [],
					'password': [],
					'checkbox': [],
					'select': [],
					'radio': []
				};

				$elements.each(function () {
					var $el = $(this);

					if ($el.val() === '') {
						errors.empty.push($el);
					} else if($el.attr('type') === 'checkbox' && !$el.is(':checked')) {
						errors.checkbox.push($el);
					} else if($el.attr('type') === 'radio') {
						errors.radio.push($el);
					} else if($el[0].tagName === 'SELECT') {
						var multiple = $(this).attr('multiple');
						
						if (typeof multiple !== typeof undefined && multiple !== false) {
							if (!$el.find('option:selected').length) errors.select.push($el);
						} else {
							var option = $el.find('option:selected').attr('value');
							if (!option) errors.select.push($el);
						}
					} else {
						var type = $el.data('validate');
						
						if (type === 'email' && !validateEmail($el.val())) {
							errors.email.push($el);
						}
						
						if (type === 'password') {
							errors.password.push($el);
						}
					}
				});

				if (errors.password.length > 1) {
					var pass_arr = [];

					for (var i = 1; i <= errors.password.length; i++) {
						var $el = errors.password[i - 1];
						pass_arr.push($el.val());
					}

					pass_arr = pass_arr.filter(function(elem, pos,arr) {
						return arr.indexOf(elem) === pos;
					});

					if (pass_arr.length === 1) {
						errors.password = [];
					}
				}

				if (errors.radio.length) {
					var equal = [],
						$_el = [];
					
					$.each(errors.radio, function () {
						equal.push($(this).attr('name'))
					});
					
					equal = equal.filter(function(elem, pos,arr) {
						return arr.indexOf(elem) === pos;
					});

					$.each(equal, function (i, name) {
						$_el.push({
							name: name,
							self: []
						});

						$.each(errors.radio, function () {
							var n = $(this).attr('name');

							if ($_el[i].name === n) {
								$_el[i].self.push($(this))
							}
						});
					});

					$.each($_el, function (i) {
						var v = 0;

						$.each($_el[i].self, function (n) {
							var $_self = $(this);
							
							if (!$_self.is(':checked')) {
								v++;
							}
						});
						
						if ($_el[i].self.length !== v) {
							$_el[i].self = []
						}
					});

					errors.radio = [];
					$.each($_el, function (i) {
						$.each($_el[i].self, function () {
							errors.radio.push($(this));
						});
					});
				}
				
				return errors;
			}

			function validateEmail(email) {
				var pattern  = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				return pattern .test(String(email).toLowerCase());
			}
		});

		return this;
	};
})(jQuery);
