$(function () {
  $(".first_word").html(function (index, text) {
    return text.replace(/^(\w+|[[а-яА-ЯёЁ]+)/, "<span>$1</span>");
  });

  const verticalSliderSelector = document.querySelector(
    ".vertical-slider .swiper-container"
  );

  if (verticalSliderSelector) {
    const verticalSlider = new Swiper(verticalSliderSelector, {
      loop: true,
      speed: 1200,
      slidesPerView: 1,
      slideToClickedSlide: true,
      spaceBetween: 20,
      autoplay: {
        delay: 3000,
      },
      disableOnInteraction: false,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        768: {
          direction: "vertical",
          slidesPerView: 2,
        },
      },
    });
  }

  $(".event__time").html(function (index, text) {
    return text.replace(/^(\w+|[[а-яА-ЯёЁ]+)/, "<span>$1</span>");
  });

  $(".accordion__text").not().hide();
  $(".accordion__open").click(function () {
    var findArticle = $(this).next();
    var findWrapper = $(this).closest(".accordion__wrapper");
    if (findArticle.is(":visible")) {
      findArticle.slideUp("fast");
      $(".accordion__open i")
        .removeClass("icon-up-dir")
        .addClass("icon-down-dir");
    } else {
      findWrapper.find(".accordion__text").slideUp("fast");
      findArticle.slideDown("fast");
      $(".accordion__open i")
        .removeClass("icon-up-dir")
        .addClass("icon-down-dir");
      $(this).find("i").removeClass("icon-down-dir").addClass("icon-up-dir");
    }
  });

  $(".popapOpen-main").click(function () {
    popapOpen(".hidden_block-main");
  });

  $(".popapClose").click(function () {
    $("body").removeClass("popapOpen");
    $(".hidden_block").removeClass("active");
    $(".main-body").removeClass("active");
    $(this).parents(".main-body").find("form").trigger("reset");
  });

  $(".popapOpen").click(function () {
    popapOpen(".hidden_block-callback");
  });

  $(".popapOpen-product").click(function () {
    popapOpen(".hidden_block-product");
  });
  let sandPrice = $(".pice_out span").text();
  let sandPrice1 = +$(".sand_price-1").text();
  let sandPrice2 = +$(".sand_price-2").text();

  $(".popapOpen-product-1").click(function () {
    popapOpen(".hidden_block-product-1");
    sandPrice = $(".pice_out span").text(sandPrice1);
  });
  $(".popapOpen-product-2").click(function () {
    popapOpen(".hidden_block-product-2");
    sandPrice = $(".pice_out span").text(sandPrice2);
  });

  $(".popapClose-product-1").click(function () {
    sandPrice = $(".pice_out span").text(sandPrice1);
  });
  $(".popapClose-product-2").click(function () {
    sandPrice = $(".pice_out span").text(sandPrice2);
  });

  function popapOpen(popap) {
    $("body").addClass("popapOpen");
    $(popap).addClass("active");
    $(".main-body").addClass("active");
  }

  $(".map_scroll_btn").on("click", "a", function (event) {
    event.preventDefault();
    var id = $(this).attr("href"),
      top = $(id).offset().top;
    $("body,html").animate(
      {
        scrollTop: top,
      },
      1500
    );
  });

  $("ul.sand_tabs__header").on("click", "li:not(.active)", function () {
    $(this)
      .addClass("active")
      .siblings()
      .removeClass("active")
      .closest("div.sand_tabs")
      .find("div.sand_tabs__content")
      .removeClass("active")
      .eq($(this).index())
      .addClass("active");
  });

  $("ul.tabs__header").on("click", "li:not(.active)", function () {
    let wrapper = document.querySelector(".tabs--animation__wrapper");

    if (!wrapper.classList.contains("animate")) {
      $(this)
        .addClass("active")
        .siblings()
        .removeClass("active")
        .closest("div.tabs")
        .find("div.tabs__content")
        .addClass("animation-out")
        .eq($(this).index())
        .removeClass("animation-out")
        .addClass("animation-in");
      wrapper.classList.add("animate");
      setTimeout(function () {
        const tabs = document.querySelectorAll(".tabs__header .btn-text");
        const contents = document.querySelectorAll(
          ".tabs--animation__wrapper .tabs__content"
        );

        contents.forEach(function (item) {
          item.classList.remove("active");
        });

        tabs.forEach((item, index) => {
          if (item.classList.contains("active")) {
            contents[index].classList.add("active");
          }
        });

        let height = wrapper.querySelector(
          ".tabs__content.active .row"
        ).offsetHeight;
        wrapper.style.height = height + "px";
      }, 400);
    }

    setTimeout(function () {
      wrapper.classList.remove("animate");
      document
        .querySelectorAll(".tabs--animation__wrapper .tabs__content")
        .forEach(function (item) {
          item.classList.remove("animation-in");
          item.classList.remove("animation-out");
        });
    }, 900);
  });

  $(".click_phone").click(function () {
    ym(54371932, "reachGoal", "click_phone ");
    return true;
  });

  $(".copy_phone").bind("copy", function () {
    ym(54371932, "reachGoal", "copy_phone");
    return true;
  });
  $(".copy_mail").bind("copy", function () {
    ym(54371932, "reachGoal", "copy_email");
    return true;
  });

  $(".hidden_block ").mouseup(function (e) {
    // событие клика по веб-документу
    var div = $("form"); // тут указываем ID элемента
    if (
      !div.is(e.target) && // если клик был не по нашему блоку
      div.has(e.target).length === 0
    ) {
      // и не по его дочерним элементам
      $("body").removeClass("popapOpen");
      $(".hidden_block").removeClass("active");
      $(".main-body").removeClass("active");
      $(this).parents(".main-body").find("form").trigger("reset");
    }
  });
});

$(document).keydown(function (eventObject) {
  if (eventObject.which == 27) {
    $("body").removeClass("popapOpen");
    $(".hidden_block").removeClass("active");
    $(".main-body").removeClass("active");
    $(this).parents(".main-body").find("form").trigger("reset");
  }
});
