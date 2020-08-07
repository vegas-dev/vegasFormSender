window.ValidateFormSender = {
	phrases: {
		empty: 'Это обязательное поле',
		email: 'Вы ввели не верный email адрес',
		password: 'Введенные пароли не сопадают'
	},
	arrange: function (errors, form) {
		ValidateFormSender.removeError(form.find('.vg-form-sender__selector'));

		$.each(errors, function (i, arr) {
			if (arr.length) {
				$.each(arr, function (n) {
					var $self = arr[n],
						$selector = $self.closest('.vg-form-sender__selector');

					$selector.addClass('error');
					$selector.append('<p>' + ValidateFormSender.phrases[i] + '</p>');
					ValidateFormSender.setValue($self, $selector)
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