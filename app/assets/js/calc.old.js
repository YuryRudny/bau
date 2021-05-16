$(function () {
  let sandPrice1 = 195;
  let sandPrice2 = 225;
  let sandPrice = $('.pice_out span');
  
  
  $('#sand_type').change(function () {
    let sandType = $('#sand_type').val();
    let sandVolume = $('#sand_volume').val();
    sandVolume = +sandVolume;
    if (sandType == 'Песок карьерный') {
      sandPrice.text(sandPrice1 * sandVolume)
    } else {
      sandPrice.text(sandPrice2 * sandVolume)
    }
  })
  
  $('#sand_volume').bind("change paste keyup keydown", function () {
    let sandChouse = $('#sand_type').val();
    let sandVolume = $('#sand_volume').val();
    sandVolume = +sandVolume;
    if (sandChouse == 'Песок карьерный') {
      sandPrice.text(sandPrice1 * sandVolume)
    } else {
      sandPrice.text(sandPrice2 * sandVolume)
    }
  })
  
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
      $('.quarry_chouse_field').css('display', 'none');
      $('.adress_field').css('display', 'block');
  
    } else {
      $('.quarry_chouse_field').css('display', 'block');
      $('.adress_field').css('display', 'none');
    }
  })
  
  // Кастомный селект
  $('.selectize').selectize({
    delimiter: ',',
    persist: false,
    scrollDuration: 300,
    create: false
  });
});