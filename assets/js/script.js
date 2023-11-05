
/**
 * Reused
 */

const addListener = function(elems, type, callback) {
  if (elems.length > 1) {
    for (let i = 0; i < elems.length; i++) {
      elems[i].addEventListener(type, callback);
    }
  } else {
    elems.addEventListener(type, callback);
  }
}

const getEl = (selector) =>  document.querySelector(selector);
const getEls = (selector) =>  document.querySelectorAll(selector);


/**
 * populate Lightbox
 */
 
const productSlides = getEl(".product-slides");
const lightboxContainer = getEl(".lightbox-container");
lightboxContainer.appendChild(productSlides.cloneNode(true));
lightboxContainer.querySelector(".slider-container").removeAttribute("data-lightbox-toggler");


/**
 * Navbar
 */

const navbar = getEl(".navbar");
const navbarOverlay = getEl(".navbar-overlay");
const navTogglers = getEls("[data-nav-toggler]");

addListener(navTogglers, "click", () => {
  navbar.classList.toggle("active");
  navbarOverlay.classList.toggle("active");
});


/**
 * Lightbox
 */

const lightbox = getEl(".lightbox");
const lightboxOverlay = getEl(".lightbox-overlay");
const lightboxTogglers = getEls("[data-lightbox-toggler]");

addListener(lightboxTogglers, "click", () => {
  lightbox.classList.toggle("active");
  lightboxOverlay.classList.toggle("active");
})



/**
 * Slider
 */

const sliders = getEls(".slider");
const slideBtns = getEls(".slide-btn");
const thumbnails = getEls("[data-slider-thumbnail]");

const totalSlides = productSlides.querySelectorAll(".product-banner").length - 1
let sliderPos = 0

addListener([...slideBtns, ...thumbnails], "click", function() {
  if (this.classList.contains("prev")) {
    sliderPos--
  } else if (this.classList.contains("next")) {
    sliderPos++
  } else {
    sliderPos = +this.dataset.sliderThumbnail
  }
  
  if (sliderPos < 0)
    sliderPos = totalSlides;
  else if (sliderPos > totalSlides)
    sliderPos = 0;
  
  sliders.forEach(slider => slider.style.transform = `translateX(-${sliderPos}00%)`);
  thumbnails.forEach(thumbnail => {
    if (+thumbnail.dataset.sliderThumbnail === sliderPos) {
      thumbnail.classList.add("active");
    } else {
      thumbnail.classList.remove("active");
    }
  })
});



/**
 * Counters
 */

const counterBtns = getEls(".counter-btn");
const counterQty = getEl("[data-counter-qty]");
let qty = 0

addListener(counterBtns, "click", function() {
  if (this.classList.contains("plus")) {
    qty++
  } else if (qty > 0) {
    qty--
  }
  
  counterQty.textContent = qty
});



/**
 * Basket
 */

const cartBtn = getEl(".cart-btn");
const basketContainer = getEl(".basket-container");

addListener(cartBtn, "click", () => {
  basketContainer.classList.toggle("active");
});


/**
 * Add To Cart
 */

const addToCartBtn = getEl(".add-to-cart-btn");
const basketQty = getEl("[data-basket-qty]");
const total = getEl(".total");
const clearBasketBtn = getEl(".clear-basket-btn");

addListener(addToCartBtn, "click", () => {
  if (qty > 0) {
    basketContainer.classList.remove("empty");
    cartBtn.setAttribute("data-qty", qty);
    basketQty.textContent = qty
    total.textContent = `$${qty * 125}.00`
  } else {
    clearBasket()
  }
})


addListener(clearBasketBtn, "click", clearBasket);

function clearBasket() {
  qty = 0
  basketContainer.classList.add("empty");
  cartBtn.removeAttribute("data-qty");
  counterQty.textContent = 0
}