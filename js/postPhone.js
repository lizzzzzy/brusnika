// Post phone inputs.
function postPhone(event) {
  var $this = $(this);
  var $input = $this.children('.input');
  var $button = $this.children('.button');
  var values = {
    data: $input.val(),
    area: '',
    where: []
  };
  var $message = $this.children('.js-form-message');
  var type = {
    name: '',
    title: ''
  };
  // console.log('form init', $this);

  switch (true) {

    case this.classList.contains('js-excursion-form'):
      type.name = 'excursion';
      type.title = 'Заявка';
      break;

  }

	var obj = $input.parent().parent();

  if (!values.data || !validatePhone(values.data) || (type.name === 'galleryside' && values.area.length && values.where.length)) {
    $input.addClass('input--error');

    setTimeout(function () {
      $input.removeClass('input--error');
    }, 1000);
	if ($(obj).hasClass('js-hover')) {
			$(obj).addClass('input--error');
			setTimeout(function () {
				$(obj).removeClass('input--error');
			}, 1000);
		}
    event.preventDefault();
    return;
  }

  $this.addClass('mailing__form--sending');
  $button.attr('disabled', true);

  var url, data;
  if ($('#range').length) {
    url = 'mail-filter.php';
    data = {
      phone: values.data,
      params: filter.getParamsString()
    };
  } else if ($('#bh-form')) {
    url = 'mail-filter.php';
    data = {
      phone: values.data,
      params: 'Направление: ' + ((values.where.indexOf('simfhighway') !== -1) ? 'Cимферопольское шоссе ' : '') + ((values.where.indexOf('nrishhighway') !== -1) ? 'Новорижское шоссе' : '') + '. Площадь: ' + ((values.where.indexOf('less') !== -1) ? '140м² ' : '') + ((values.where.indexOf('more') !== -1) ? 'от 141м².' : '')
    };
  } else {
    url = 'mail.php';
    data = values.data;
  }

  $.post(url, {
    data: data
  }).fail(function (data) {
      alert('Форма не отправилась :−(\nПозвоните нам: +7 343 300-92-58');
      $this.removeClass('mailing__form--sending');
      $button.attr('disabled', false);
    })
    .done(function (data) {
      if (data === 'OK') {
        var currentMSKHour = new Date().getUTCHours() + 3;
        var message = '';

        carrotquest.track(type.title);
        carrotquest.identify({'$phone': values.data});

        switch (true) {
          case currentMSKHour >= 0 && currentMSKHour <= 8:
            message = 'Спасибо! Мы&nbsp;ещё не&nbsp;на&nbsp;работе, наберём между 9&nbsp;и&nbsp;10&nbsp;утра';
            break;

          case currentMSKHour >= 9 && currentMSKHour <= 20:
            message = 'Спасибо! Перезвоним в&nbsp;течение получаса';
            break;

          case currentMSKHour >= 21 && currentMSKHour <= 23:
            message = 'Спасибо! Мы&nbsp;уже сбежали по&nbsp;домам, перезвоним завтра между 9&nbsp;и&nbsp;10&nbsp;утра';
            break;

          default:
            message =  'Спасибо! Мы&nbsp;ещё не&nbsp;на&nbsp;работе, наберём между 9&nbsp;и&nbsp;10&nbsp;утра';
        }

          $message.html(message);
          $this.addClass('mailing__form--sent');
      } else {
        alert('Форма не отправилась :−(\nПозвоните нам: +7 343 300-92-58');
      }

      $this.removeClass('mailing__form--sending');
      $button.attr('disabled', false);
    });

  event.preventDefault();
}
