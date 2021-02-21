window.AlertFormSender = {
  Svg: {
    error: '<svg viewbox="0 0 500 500" class="am_Error_Icon"><path class="am_SVG_circle" d="m444.34693,114.07007a236.95276,236.95276 0 0 1 44.1553,137.73747c0,129.97005 -106.94772,236.96443 -236.91777,236.96443s-236.91777,-106.94772 -236.91777,-236.91777s106.94772,-236.96443 236.91777,-236.96443a236.99941,236.99941 0 0 1 168.72548,70.59483"></path><line class="am_SVG_error1" y2="390" x2="390" y1="110" x1="110"></line><line class="am_SVG_error2" y2="390" x2="110" y1="110" x1="390"></line></svg>',
    success: '<svg viewbox="0 0 500 500" class="am_Success_Icon"><path class="am_SVG_circle" d="m443.0136,114.07007a236.95276,236.95276 0 0 1 44.1553,137.73747c0,129.97005 -106.94772,236.96443 -236.91777,236.96443s-236.91777,-106.94772 -236.91777,-236.91777s106.94772,-236.96443 236.91777,-236.96443a236.99941,236.99941 0 0 1 168.72548,70.59483"></path><polyline class="am_SVG_check" points="104.4892349243164,309.2001647949219 195.57406616210938,402.9600524902344 418.9292297363281,85.03718566894531 "></polyline></svg>',
    cross: '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 224.512 224.512" style="enable-background:new 0 0 224.512 224.512;" xml:space="preserve"><g><polygon style="fill:#010002;" points="224.507,6.997 217.521,0 112.256,105.258 6.998,0 0.005,6.997 105.263,112.254 0.005,217.512 6.998,224.512 112.256,119.24 217.521,224.512 224.507,217.512 119.249,112.254 "/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'
  },
  boot_version: 4,
  modal: function (alert) {
    let svg, dismiss;

    if (alert === 'success') {
      svg = AlertFormSender.Svg.success;
    } else {
      svg = AlertFormSender.Svg.error;
    }

    if (AlertFormSender.boot_version > 4) {
      dismiss = 'data-bs-dismiss="modal"';
    } else {
      dismiss = 'data-dismiss="modal"';
    }

    let modal = '<div class="modal fade vg-form-sender__modal" id="modal-' + alert + '" tabindex="-1" role="dialog" aria-labelledby="modal-' + alert + '" aria-hidden="true">' + '    <div class="modal-dialog" role="document">' + '        <div class="modal-content">' + '            <button type="button" class="modal-close" ' + dismiss + ' aria-label="Close">' + AlertFormSender.Svg.cross + '</button>' + '            ' + '            <div class="vg-form-sender__modal--alert vg-form-sender__modal--alert-' + alert + '">' + svg + '                <div class="title"></div>' + '                <div class="msg"></div>' + '            </div>' + '        </div>' + '    </div>' + '</div>';
    $('body').append(modal);
    return false;
  },
  block: function (alert, form) {
    let svg;

    if (alert === 'success') {
      svg = AlertFormSender.Svg.success;
    } else {
      svg = AlertFormSender.Svg.error;
    }

    let block = '<div class="vg-form-sender__block ' + alert + '">' + '<div class="icon">' + svg + '</div>' + '<div class="content">' + '   <div class="title"></div>' + '   <div class="msg"></div>' + '</div>' + '</div>';
    form.after(block);
  },
  Action: {
    draw: function (form) {
      let elCompare = form.data('compare') || 'modal';
      AlertFormSender.boot_version = form.data('bootstrap-version') || 5;

      if (elCompare === 'modal') {
        AlertFormSender.modal('success');
        AlertFormSender.modal('error');
      } else if (elCompare === 'block') {
        $('body').find('.vg-form-sender__block').remove();
        AlertFormSender.block('success', form);
        AlertFormSender.block('error', form);
      }
    },
    success: function (msg, form, params) {
      this.draw(form);
      this.btn(form, false, params);
      this.compare(msg, form, params, 'success');
    },
    error: function (msg, form, params) {
      this.draw(form);
      this.btn(form, false, params);
      this.compare(msg, form, params, 'error');
    },
    beforeSend: function (form, params) {
      this.btn(form, true, params);
    },
    btn: function (form, disabled, params) {
      let $btn = form.find('[type=submit]'),
          text;

      if (disabled) {
        text = $btn.data('text-send') || LangFormSender[params.lang].alert.text_send;
      } else {
        text = $btn.data('btn-text') || LangFormSender[params.lang].alert.btn_text;
      }

      $btn.attr('disabled', disabled).find('span').text(text);
    },
    compare: function (msg, form, params, alert) {
      let $btn = form.find('[type=submit]'),
          elCompare = form.data('compare') || 'modal',
          title;

      if (alert === 'success') {
        title = $btn.data('success-text') || LangFormSender[params.lang].alert.success_title;
      } else {
        title = $btn.data('error-text') || LangFormSender[params.lang].alert.error_title;
      }

      if (elCompare === 'modal') {
        let $modal = $('#modal-' + alert);
        $('.modal').modal('hide');
        AlertFormSender.text(msg, title, $modal);
        $modal.modal('show');
      } else if (elCompare === 'block') {
        let $block = $('.vg-form-sender__block.' + alert);
        $block.addClass('show');
        AlertFormSender.text(msg, title, $block);
      }
    }
  },
  text: function (msg, title, $element) {
    $element.find('.msg').html(msg);
    $element.find('.title').html(title);
  }
};
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
(function ($) {
  $.fn.vegasFormSender = function (options) {
    options = $.extend({
      error: function () {},
      success: function () {},
      beforeSend: function () {},
      validate: function () {}
    }, arguments[0] || {});
    return this.each(function () {
      let $form = $(this),
          settings = {
        'action': options.action || $form.attr('action') || location.href,
        'method': options.method || $form.attr('method') || 'get',
        'fields': options.fields ? options.fields : false,
        'jsonParse': options.jsonParse || $form.data('json-parse') || false,
        'lang': options.lang || $form.data('lang') || 'ru',
        'redirectSuccess': options.redirectSuccess || $form.data('redirect-success') || false,
        'redirectError': options.redirectError || $form.data('redirect-error') || false
      };

      if (settings.fields && typeof settings.fields == 'function') {
        settings.fields = options.fields();
      }

      let params = {
        lang: settings.lang
      };
      $form.addClass('vg-form-sender');
      let $inputs = $form.find('input, select, textarea');
      $inputs.each(function () {
        $(this).parent('div').addClass('vg-form-sender__selector');
      });
      $form.on('submit', function () {
        let data = new FormData(this),
            $required = $(this).find('[data-validate]'),
            valid = true;

        if ($required.length) {
          let errors = required($required);
          options.validate.call(this, $form, params, errors);
          if (errors.empty.length || errors.email.length || errors.password.length || errors.checkbox.length || errors.radio.length || errors.select.length) valid = false;
        }

        if (valid) {
          if (settings.fields) {
            for (let name in settings.fields) {
              if (typeof settings.fields[name] === 'object') {
                for (let key in settings.fields[name]) {
                  let arr = Object.keys(settings.fields[name][key]).map(function (i) {
                    return settings.fields[name][key][i];
                  });
                  data.append(name, arr);
                }
              } else {
                data.append(name, settings.fields[name]);
              }
            }
          }

          $.ajax({
            url: settings.action,
            method: settings.method,
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function () {
              options.beforeSend.call(this, $form, params);
              $form.trigger('before-send');
            },
            success: function (data) {
              let obj;
              $form.trigger('submit-success');

              if (settings.jsonParse) {
                obj = JSON.parse(data);
              } else {
                obj = data;
              }

              if (settings.redirectSuccess) {
                window.location.href = settings.redirectSuccess;
              } else {
                options.success.call(this, obj, $form, params);
              }
            },
            error: function (jqXHR, exception) {
              let json = JSON.parse(jqXHR.responseText);
              let msg;
              $form.trigger('submit-error');

              if (json.errors) {
                msg = json.errors[Object.keys(json.errors)[0]][0];
              } else {
                msg = json.message || json.msg;
              }

              if (settings.redirectError) {
                window.location.href = settings.redirectError;
              } else {
                options.error.call(this, msg, $form, params);
              }
            }
          });
        }

        return false;
      });
    });

    function required($elements) {
      let errors = {
        'empty': [],
        'email': [],
        'password': [],
        'checkbox': [],
        'select': [],
        'radio': []
      };
      $elements.each(function () {
        let $el = $(this);

        if ($el.val() === '') {
          errors.empty.push($el);
        } else if ($el.attr('type') === 'checkbox' && !$el.is(':checked')) {
          errors.checkbox.push($el);
        } else if ($el.attr('type') === 'radio') {
          errors.radio.push($el);
        } else if ($el[0].tagName === 'SELECT') {
          let multiple = $(this).attr('multiple');

          if (typeof multiple !== typeof undefined && multiple !== false) {
            if (!$el.find('option:selected').length) errors.select.push($el);
          } else {
            let option = $el.find('option:selected').attr('value');
            if (!option) errors.select.push($el);
          }
        } else {
          let type = $el.data('validate');

          if (type === 'email' && !validateEmail($el.val())) {
            errors.email.push($el);
          }

          if (type === 'password') {
            errors.password.push($el);
          }
        }
      });

      if (errors.password.length > 1) {
        let pass_arr = [];

        for (let i = 1; i <= errors.password.length; i++) {
          let $el = errors.password[i - 1];
          pass_arr.push($el.val());
        }

        pass_arr = pass_arr.filter(function (elem, pos, arr) {
          return arr.indexOf(elem) === pos;
        });

        if (pass_arr.length === 1) {
          errors.password = [];
        }
      }

      if (errors.radio.length) {
        let equal = [],
            $_el = [];
        $.each(errors.radio, function () {
          equal.push($(this).attr('name'));
        });
        equal = equal.filter(function (elem, pos, arr) {
          return arr.indexOf(elem) === pos;
        });
        $.each(equal, function (i, name) {
          $_el.push({
            name: name,
            self: []
          });
          $.each(errors.radio, function () {
            let n = $(this).attr('name');

            if ($_el[i].name === n) {
              $_el[i].self.push($(this));
            }
          });
        });
        $.each($_el, function (i) {
          let v = 0;
          $.each($_el[i].self, function (n) {
            let $_self = $(this);

            if (!$_self.is(':checked')) {
              v++;
            }
          });

          if ($_el[i].self.length !== v) {
            $_el[i].self = [];
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
      let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(String(email).toLowerCase());
    }
  };
})(jQuery);
window.LangFormSender = {
  ru: {
    alert: {
      success_title: 'Успешно!',
      success_msg: 'Ваше письмо успешно отправлено!',
      error_title: 'Ошибка!',
      text_send: 'Отправляем...',
      btn_text: 'Отправить'
    },
    validate: {
      empty: 'Это обязательное поле',
      email: 'Вы ввели не верный email адрес',
      password: 'Введенные пароли не совпадают',
      checkbox: 'Чтобы продлолжить, установите этот флажок',
      radio: 'Выберите один из вариантов',
      select: 'Выберите вариант из списка'
    }
  },
  en: {
    alert: {
      success_title: 'Success!',
      success_msg: 'Your email has been successfully sent!',
      error_title: 'Error!',
      text_send: 'We send...',
      btn_text: 'Send message'
    },
    validate: {
      empty: 'This is a required field',
      email: 'You entered an invalid email address',
      password: 'The passwords entered do not match',
      checkbox: 'Check this box to continue',
      radio: 'Choose one of the options',
      select: 'Choose an option from the list'
    }
  }
};
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
  removeError: function ($selector) {
    $selector.removeClass('error');
    $selector.find('p').remove();
  }
};
