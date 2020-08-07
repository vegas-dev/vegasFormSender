window.ValidateFormSender = {
	error: 'error',
	arrange: function (errors, form) {
		form.find('.vg-form-sender__selector').removeClass(ValidateFormSender.error);
		
		$.each(errors, function (i, arr) {
			if (arr.length) {
				$.each(arr, function (n) {
					var $self = arr[n],
						$selector = $self.closest('.vg-form-sender__selector');

					$selector.addClass(ValidateFormSender.error);
				});
			}
		});
	},

	setValue: function ($self) {
		$self.on('change', function () {
			$(this).removeClass('error').next('p').hide();
			
			return false;
		});
	}
};