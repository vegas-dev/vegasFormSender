$(document).ready(function () {
	var $forms = $('[data-vgFormSender]');

	$forms.vegasFormSender({
		beforeSend: function (form) {
			AlertFormSender.Action.beforeSend(form);
		},
		success: function (data, form) {
			AlertFormSender.Action.success(data.msg, form);
		},
		error: function (msg, form) {
			AlertFormSender.Action.error(msg, form);
		},
		validate: function (form, errors) {
			ValidateFormVegas.init(errors, form);
		}
	});

	$forms.each(function () {
		var $_form = $(this);
		var $inputs = $_form.find('input[data-mask]');
		
		if (typeof $.fn.inputmask !== 'undefined') {
			$inputs.each(function () {
				var $_self = $(this),
					type = $_self.data('mask'),
					inComplete = $_self.data('mask-complete') || false,
					params = {
						'clearIncomplete': inComplete
					};
				
				if(type !== '' && type !== 'undefined') {
					if (type === 'phone') {
						params.mask = "+79999999999";
					} else if(type === 'birthday') {
						params.mask = "99.99.9999";
					} else {
						params.mask = type;
					}
					
					$_self.inputmask(params);
				}
			});
		} else {
			console.error('Plugin InputMask not installed');
		}
	});
});