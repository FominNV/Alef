init();

function init() {  
  // header hide/show for scrolling
  let scrollData = 0;
  document.onscroll = () => {
    scrollData > scrollY ? header.classList.remove('hide') : header.classList.add('hide');
    if (scrollY == 0) {
      header.classList.remove('hide')
    }
    return scrollData = scrollY;
  }
  // -----------
  
  // burger menu open/close
  let openBurger = false;
  burger_btn.onclick = showBurger;
  burger.onclick = showBurger;

  function showBurger(e) {
    if (e.target == burger || e.target == burger_btn_icon || e.target == burger_exit_text) {
      openBurger = !openBurger;
      openBurger ? burger_btn_icon.src = './icons/menu-close.svg' : burger_btn_icon.src = './icons/menu-open.svg';
      openBurger ? burger.style.top = '0' : burger.style.top = '-100%';
      openBurger ? burger.style.opacity = 100 : burger.style.opacity = 0;
    }    
  }
  // -----------

  // set active image of product
  let images = document.querySelectorAll('.product__images_item');
  Array.from(images).map(el => el.onclick = (() => setProductImage(el)));

  function setProductImage(elem) {
    product_image.src = elem.src;
  }
  // -----------

  // set quantity of goods
  quantity_up.onclick = () => quantity_inp.value = +quantity_inp.value + 1;
  quantity_down.onclick = (() => {
    if (+quantity_inp.value >= 1) {
      quantity_inp.value = +quantity_inp.value - 1;
    }
  });
  // -----------

  // add goods to cart or to favirite
  let favorite = false;
  btn_add_cart.onclick = () => addHandler(btn_add_cart);
  btn_add_like.onclick = () => addHandler(btn_add_like);

  function addHandler(elem) {
    if (elem === btn_add_cart) {
      if (+quantity_inp.value !== 0) {
        showModalGoods(`Добавлено в корзину "${product_name.innerHTML}" в количестве ${quantity_inp.value} единиц(ы).`);
      }
    }

    if (elem === btn_add_like) {
      favorite = !favorite;
      favorite ? like_icon.src = "./icons/heart-fill.svg" : like_icon.src = "./icons/heart.svg";
      favorite ? showModalGoods(`Товар "${product_name.innerHTML}" добавлен в избранное.`)
              : showModalGoods(`Товар "${product_name.innerHTML}" удаленлен из избранного.`);
    }
  }

  function showModalGoods(text) {
    modal_text.textContent = text;
    modal_goods.style.top = '50px';
    modal_goods.style.opacity = 100;
    setTimeout(() => {
      modal_goods.style.top = '-60px';
      modal_goods.style.opacity = 0;
    }, 3000);
  }
  // -----------

  // check E-mail
  form_clear.onclick = (e) => {
    e.preventDefault();
    form_inp.value = '';
  };

  form_btn.onclick = ((e) => {
    e.preventDefault();

    if ( form_inp.value.trim() ) {
      let regExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

      if ( !form_inp.value.trim().match(regExp) ) {
        hideModalEmail(form_confirm);
        showModalEmail(form_danger, `Некорректный E-mail: "${form_inp.value.trim()}"!`)
      }

      if ( form_inp.value.trim().match(regExp) ) {
        hideModalEmail(form_danger);
        showModalEmail(form_confirm, `Подписка для "${form_inp.value.trim()}" оформлена.`);

        setTimeout(() => hideModalEmail(form_comfirm), 3000);
      }
    } else {
      hideModalEmail(form_confirm);
      showModalEmail(form_danger, `Заполните поле!`);
    } 
  })

  function showModalEmail(elem, text) {
    elem.textContent = text;
    elem.style.top = '-30px';
    elem.style.opacity = 100;
  }

  function hideModalEmail(elem) {
    elem.style.top = '-300px';
    elem.style.opacity = 0;
  }
  // -----------
}