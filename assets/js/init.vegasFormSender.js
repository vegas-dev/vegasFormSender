$(document).ready(function () {
	let $forms = $('[data-vgformsender]'),
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
});