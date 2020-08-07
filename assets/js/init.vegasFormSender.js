$(document).ready(function () {
	var $forms = $('[data-vgFormSender]');
	
	$forms.vegasFormSender({
		beforeSend: function (form, params) {
			AlertFormSender.Action.beforeSend(form, params);
		},
		success: function (data, form, params) {
			AlertFormSender.Action.success(data.msg, form, params);
		},
		error: function (msg, form, params) {
			AlertFormSender.Action.error(msg, form, params);
		},
		validate: function (form, params, errors) {
			ValidateFormSender.init(errors, form, params);
		}
	});

	$forms.each(function () {
		var $_form = $(this);
		var $inputs = $_form.find('input'),
			$mask = $_form.find('input[data-mask]');

		$_form.addClass('vg-form-sender');

		$inputs.each(function () {
			$(this).parent('div').addClass('vg-form-sender__selector');
		});
		
		if (typeof $.fn.inputmask !== 'undefined') {
			$mask.each(function () {
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