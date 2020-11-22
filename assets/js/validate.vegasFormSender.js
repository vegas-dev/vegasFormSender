window.ValidateFormSender = {
	init: function (errors, form, params) {
		ValidateFormSender.removeError(form.find('.vg-form-sender__selector'));

		$.each(errors, function (i, arr) {
			if (arr.length) {
				$.each(arr, function (n) {
					let $self = arr[n],
						$selector = $self.closest('.vg-form-sender__selector');

					$selector.addClass('error');

					let $p = $selector.find('p');
					if ($p.length === 0) {
						$selector.append('<p>' + LangFormSender[params.lang].validate[i] + '</p>');
					}

					ValidateFormSender.setValue($self, $selector);
				});
			}
		});
	},

	setValue: function ($self, $selector) {
		$self.on('change', function () {
			ValidateFormSender.removeError($selector);

			return false;
		});
	},
	
	removeError: function($selector) {
		$selector.removeClass('error');
		$selector.find('p').remove();
	}
};