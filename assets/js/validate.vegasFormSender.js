window.ValidateFormSender = {
	class_error: 'vg-fs-error',
	arrange: function (errors, form) {
		form.find('input').parent('div').removeClass(ValidateFormSender.class_error);
		
		$.each(errors, function (i, arr) {
			if (arr.length) {
				$.each(arr, function (n) {
					var $self = arr[n],
						$selector = $self.parent('div');

					$selector.addClass(ValidateFormSender.class_error);
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