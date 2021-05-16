$(function () {
	let sandPrice1 = +$('.sand_price-1').text();
	let sandPrice2 = +$('.sand_price-2').text();
	let sandPrice3 = +$('.sand_price-3').text();
	let sandPrice = $('.pice_out span').text(sandPrice1);
	let sandPriceCurrent = sandPrice1;

	$('#delivery_place').change(function () {
		let sandVolume = +$('#sand_volume').val();
		let careerPlace = $('#delivery_place').val();
		if (careerPlace == 'Аксиньино-1') {
			sandPrice.text(sandPrice1 * sandVolume);
			sandPriceCurrent = sandPrice1;
		} else {
			sandPrice.text(sandPrice2 * sandVolume);
			sandPriceCurrent = sandPrice2;
		}
	});

	$('#sand_volume').bind("change paste keyup keydown", function () {
		let sandVolume = $('#sand_volume').val();
		sandVolume = +sandVolume;
		sandPrice.text(sandPriceCurrent * sandVolume);
	});

	$('#sand_volume-1').bind("change paste keyup keydown", function () {
		let sandVolume = $('#sand_volume-1').val();
		sandVolume = +sandVolume;
		sandPrice.text(sandPrice1 * sandVolume);
	});

	$('#sand_volume-2').bind("change paste keyup keydown", function () {
		let sandVolume = $('#sand_volume-2').val();
		sandVolume = +sandVolume;
		sandPrice.text(sandPrice2 * sandVolume);
	});

	$('#delivery_type').change(function () {
		let deliveryType = $('#delivery_type').val();
		let sandVolume = $('#sand_volume').val();
		sandVolume = +sandVolume;
		if (deliveryType == 'Доставка по адресу') {
			if (sandVolume < 20) {
				$('#sand_volume').val(20);
				$('#sand_volume').trigger('change');
				$('.delivery_minimal').css('display', 'block');
			}
			$('.adress_field').css('display', 'block');
		} else {
			$('.adress_field').css('display', 'none');
		}
	});

	$('#delivery_type-1').change(function () {
		let deliveryType = $('#delivery_type-1').val();
		let sandVolume = $('#sand_volume-1').val();
		sandVolume = +sandVolume;
		if (deliveryType == 'Доставка по адресу') {
			if (sandVolume < 20) {
				$('#sand_volume-1').val(20);
				$('#sand_volume-1').trigger('change');
				$('.delivery_minimal').css('display', 'block');
			}
			$('.adress_field').css('display', 'block');
		} else {
			$('.adress_field').css('display', 'none');
		}
	});

	$('#delivery_type-2').change(function () {
		let deliveryType = $('#delivery_type-2').val();
		let sandVolume = $('#sand_volume-2').val();
		sandVolume = +sandVolume;
		if (deliveryType == 'Доставка по адресу') {
			if (sandVolume < 20) {
				$('#sand_volume-2').val(20);
				$('#sand_volume-2').trigger('change');
				$('.delivery_minimal').css('display', 'block');
			}
			$('.adress_field').css('display', 'block');
		} else {
			$('.adress_field').css('display', 'none');
		}
	});

	// Кастомный селект
	$('.selectize').selectize({
		delimiter: ',',
		persist: false,
		scrollDuration: 300,
		create: false
	});
});