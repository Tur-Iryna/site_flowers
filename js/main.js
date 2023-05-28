$(function () {




  let count = $('.catalog-content').length,
    start = 8,
    show = 4;

  $('.catalog-content').addClass('none');
  $('.catalog-content:lt(' + start + ')').removeClass('none');

  $('.catalog__btn').on('click', function (e) {
    e.preventDefault();

    start = (start + show >= count) ? start + show : count;
    $('.catalog-content:lt(' + start + ')').removeClass('none');
    if ($('.catalog-content:not(.none)').length == count) {
      $('.catalog__btn').remove();

    }
  })



  $('.modal__btn').on('click', function (e) {
    e.preventDefault();
    $('.modal__btn').removeClass('modal__btn--active');
    $(this).addClass('modal__btn--active');
    $('.modal__btn-content__box').removeClass('modal__btn-content--active');
    $($(this).attr('href')).addClass('modal__btn-content--active');

  });




  $(".slider").slick({
    arrows: false,
    dots: true,
    autoplay: true,
  });

  $(".bestsellers__slider").slick({
    dots: false,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 4,
    nextArrow: '<button class="slick-arrow slick-next"><img src="images/icons/arrow-next.svg" alt="стрілка вліво"></button>',
    prevArrow: '<button class="slick-arrow slick-prev"><img src="images/icons/arrow-prev.svg" alt="стрілка направо"></button>',
    responsive: [
      {
        breakpoint: 1120,
        settings: {
          slidesToShow: 2,

        }

      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 1,

        }
      },
      {
        breakpoint: 460,
        settings: {
          slidesToShow: 1,
          arrows: false,
          dots: true,
        }
      }

    ]


  });

  $(".reviews__slider").slick({
    dots: true,
    autoplay: true,
    autoplaySpeed: 2000,
    variableWidth: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  });




  $(function () {
    $('.menu__btn').on('click', function () {
      $('.menu__list').toggleClass('menu--active');
    });

  });
});



let isScrolling = false;

$(window).on("DOMMouseScroll mousewheel", function (e) {

  if (!isScrolling) {
    isScrolling = true;

    let delta = parseInt(e.originalEvent.wheelDelta || -e.originalEvent.detail);

    if (delta >= 0) {
      isScrolling = false;

      $('.connect__hidden').removeClass('connect__hidden');

    } else {

      if ($(window).scrollTop() > 1000) {
        $('.connect').addClass('connect__hidden');
      }

      isScrolling = false;

    }
  }

});




let modal = document.getElementById("modal-user");
let button = document.getElementById("modal-button");
let close = document.getElementsByClassName("modal__close")[0];


button.onclick = function () {
  modal.style.display = "block";
}

close.onclick = function () {
  modal.style.display = "none";
}


window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}





let countWishlist = 0;
const wishlistButtons = document.querySelectorAll(".catalog-box__wishlist");

wishlistButtons.forEach(button => {
  button.addEventListener("click", function () {
    let cartWishlist = document.querySelector(".user-nav__num");

    setTimeout(function () {
      countWishlist++;
      cartWishlist.textContent = countWishlist;
    }, 1000);
  });
});



let cartCounter = 0;
const cartButtons = document.querySelectorAll(".catalog-box__btn");

cartButtons.forEach(button => {
  button.addEventListener("click", function () {
    let cartNum = document.querySelector(".user-nav__num-cart");

    setTimeout(function () {
      cartCounter++;
      cartNum.textContent = cartCounter;
    }, 1000);
  });
});








const cartWrapper = document.querySelector('.cart__wrapper')

window.addEventListener('click', function (event) {




  let openModalBtn = document.querySelector('.user-nav__cart');
  let modal = document.querySelector('.cart-modal');


  openModalBtn.addEventListener('click', function () {
    modal.classList.add('show');
  });


  let closeModalBtn = document.querySelector('.cart__close-img');
  closeModalBtn.addEventListener('click', function () {
    modal.classList.remove('show');
  });



  if (event.target.hasAttribute('data-cart')) {

    const card = event.target.closest('.catalog-box__info');
    const productInfo = {
      id: card.dataset.id,
      imgSrc: card.querySelector('.catalog-box__img').getAttribute('src'),
      title: card.querySelector('.catalog-box__title').innerText,
      price: card.querySelector('.catalog-box__price').innerText,
      delete: 'images/icons/delete.png'
    };
    const cartItemHTML = ` <div class="cart__item" data-id="${productInfo.id}">
                    <div class="cart__item-top">
                      <div class="cart__item-img">
                        <img class="cart__item-image" src="${productInfo.imgSrc}" alt="">
                      </div>
                      <div class="cart__item-box">
                        <div class="cart__item-desc">
                          <h5 class="cart__item-title">${productInfo.title}</h5>
                          <h5 class="cart__item-price">${productInfo.price}</h5>
                        </div>
                        <div class="cart__item-delete">
                          <img class="cart__delete-img" src="${productInfo.delete}" alt="">
                        </div>
                      </div>
                      <div class="cart-counter">
                        <div class="cart-counter__control" data-action="minus">-</div>
                        <div class="cart-counter__current" data-counter="action">1</div>
                        <div class="cart-counter__control" data-action="plus">+</div>
                      </div>
                    </div>
                  </div>`;

    cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML);

    CartStatus();
    CartCalcPrice();
  }



  document.querySelector('.user-nav__cart').addEventListener('click', function () {
    document.querySelector('.cart-modal').classList.toggle('cart-show');
  });

  document.querySelector('.cart__close').addEventListener('click', function (e) {
    e.preventDefault();
    var cartModal = this.closest('.cart-modal');
    cartModal.classList.remove('cart-show');
  });


  const deleteButtons = document.querySelectorAll('.cart__delete-img');


  deleteButtons.forEach(button => {
    button.addEventListener('click', function (event) {
      event.preventDefault();

      const cartItem = this.closest('.cart__item');

      if (cartItem) {
        cartItem.remove();

        const remainingItems = document.querySelectorAll('.cart__item');
        const itemCountElement = document.querySelector('.user-nav__num-cart');

        if (itemCountElement) {
          itemCountElement.textContent = remainingItems.length;
        }
        CartStatus();
      }
    });

  });

  function CartStatus() {
    const cartWrapper = document.querySelector('.cart__wrapper');
    const cartEmpty = document.querySelector('[data-cart-empty]');
    const orderForm = document.querySelector('.cart__summary');
    const carttitle = document.querySelector('.cart__title');

    if (cartWrapper.children.length > 0) {
      cartEmpty.classList.add('cart__none')
      orderForm.classList.remove('cart-none');
      carttitle.classList.remove('cart-none');
    } else {
      cartEmpty.classList.remove('cart__none');
      orderForm.classList.add('cart-none');
      carttitle.classList.add('cart-none');
    }
  }



  const cartContainer = document.querySelector('.cart__wrapper');
  const cartItems = document.querySelectorAll('.cart__item');
  if (cartItems.length > 1) {
    cartContainer.style.overflowY = 'scroll';
  } else {
    cartContainer.style.overflowY = 'hidden';
  }


})


function CartCalcPrice() {
  const cartWrapper = document.querySelector('.cart__wrapper');
  const cartItems = document.querySelectorAll('.cart__item');

  const totalPriceEl = document.querySelector('.cart__summary-price');
  let totalPrice = 0;

  cartItems.forEach(function (item) {

    const amountEl = item.querySelector('[data-counter]');
    const priceEl = item.querySelector('.cart__item-price');
    const currentPrice = parseInt(amountEl.innerText) * parseInt(priceEl.innerText);
    totalPrice += currentPrice;
  });

  totalPriceEl.innerText = totalPrice;

};




window.addEventListener('click', function (event) {

  let counter;

  if (event.target.dataset.action === "plus" || event.target.dataset.action === "minus") {
    const cartCounter = event.target.closest('.cart-counter');
    counter = cartCounter.querySelector('[data-counter]');
  }



  if (event.target.dataset.action === "plus") {
    counter.innerText = ++counter.innerText;
  };

  if (event.target.dataset.action === "minus") {
    if (parseInt(counter.innerText) > 1) {
      counter.innerText = --counter.innerText;
    } else if (event.target.closest('.cart__wrapper') && parseInt(counter.innerText) === 1) {
      event.target.closest('.cart__item').remove();
      CartStatus();
      CartCalcPrice();
    }

  }

  if (event.target.hasAttribute('data-action') && event.target.closest('.cart__wrapper')) {
    CartCalcPrice();
  }








});



window.addEventListener('DOMContentLoaded', function () {
  let wishlistContainer = document.querySelector('.user-nav__wishlist');
  let modalWishlist = document.querySelector('.wishlist-modal');
  let closeModalBtn = document.querySelector('.wishlist__close-img');

  wishlistContainer.addEventListener('click', function (event) {
    if (event.target === wishlistContainer || event.target.closest('.user-nav__link')) {
      modalWishlist.classList.add('open');
    }
  });

  closeModalBtn.addEventListener('click', function () {
    modalWishlist.classList.remove('open');
  });


  let wishlistIcons = document.querySelectorAll('.catalog-box__wishlist');
  let wishlistWrapper = document.querySelector('.wishlist__wrapper');


  wishlistIcons.forEach(function (wishlistIcon) {
    wishlistIcon.addEventListener('click', function () {
      let title = this.parentElement.querySelector('.catalog-box__title').textContent;
      let price = this.parentElement.querySelector('.catalog-box__price').textContent;
      let imageSrc = this.parentElement.querySelector('.catalog-box__img').getAttribute('src');

      let item = document.createElement('div');
      item.classList.add('wishlist-item');
      item.innerHTML = `
        <img class="wishlist-item__image" src="${imageSrc}" alt="${title}">
        <div class="wishlist-item__info">
          <h6 class="wishlist-item__title">${title}</h6>
          <span class="wishlist-item__price">${price}</span>
        </div>
        <button data-cart type="button" class="wishlist-item__btn">В кошик</button>
      `;


      wishlistWrapper.appendChild(item);

      let addToCartBtn = item.querySelector('.wishlist-item__btn');


      addToCartBtn.addEventListener('click', function () {

      });


    });
  });




});





$(".menu").on("click", "a", function (e) {
  e.preventDefault();
  var id = $(this).attr('href'),
    top = $(id).offset().top;
  $('body,html').animate({ scrollTop: top }, 1500);
});


AOS.init()












