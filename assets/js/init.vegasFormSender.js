$(document).ready(function () {
	var $forms = $('[data-vgFormSender]'),
		init = typeof VEGASFORMSENDER_INIT !== 'undefined';

	if (init) {
		if (!VEGASFORMSENDER_INIT) {
			init = false;
		}
	} else {
		init = true;
	}
	
	if (init) {
		$forms.vegasFormSender({
			beforeSend: function (form, params) {
				AlertFormSender.Action.beforeSend(form, params);
			},
			success: function (data, form, params) {
				if (data.error) {
					AlertFormSender.Action.error(data.msg, form, params);
				} else {
					AlertFormSender.Action.success(data.msg, form, params);
				}
				
			},
			error: function (msg, form, params) {
				AlertFormSender.Action.error(msg, form, params);
			},
			validate: function (form, params, errors) {
				ValidateFormSender.init(errors, form, params);
			}
		});
	}

	$forms.each(function () {
		var $_form = $(this),
			$mask = $_form.find('input[data-mask]');
		
		if (typeof $.fn.inputmask !== 'undefined' && $mask.length) {
			$mask.each(function () {
				var $_self = $(this),
					type = $_self.data('mask'),
					inComplete = $_self.data('mask-complete') || false,
					focus = $_self.data('mask-focus') || false,
					params = {
						'clearIncomplete': inComplete
					};
				
				if (focus) {
					params.showMaskOnFocus = true;
					params.showMaskOnHover = false;
				}
				
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