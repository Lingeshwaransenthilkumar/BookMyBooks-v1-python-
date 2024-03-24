document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.cart-button');
  const cartItems = document.querySelector('.cart-items');
  const cartLength=document.getElementById("cart-length");
  let cartTotal = 0;
  const cartData = JSON.parse(sessionStorage.getItem('cartData')) || [];

  if(sessionStorage.getItem('cartData')){
    cartData=JSON.parse(sessionStorage.getItem('cartData'));
    updateCartItems();
    calculateTotalPrice();
    updateCartLength();
  }
  
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const product = button.getAttribute('data-product');
      const price = parseFloat(button.getAttribute('data-price'));
      const image = button.getAttribute('data-image'); // Add this line to get the image URL


      // Find the index of the product in the cart
      const index = cartData.findIndex(item => item.product === product);

      // Check if the item is already in the cart
      if (index !== -1) {
        cartData[index].quantity++;
        cartData[index].totalPrice += price;
      } else {
        cartData.push({
          product: product,
          quantity: 1,
          totalPrice: price,
          image:image
        });
      }


      // Update the cart items list and the total price
      updateCartItems();
      calculateTotalPrice();
      updateCartLength();

      sessionStorage.setItem('cartData',JSON.stringify(cartData));
    });
  });


  //cart length
  function updateCartLength(deletedQuantity){
    const cartLengthElement=document.getElementById('cart-length');
    const totalQuantity=cartData.reduce((total,item)=>total+item.quantity,0);
    cartLengthElement.textContent=Math.max(0,totalQuantity);

  }
  // Function to update the cart items list in the UI
  function updateCartItems() {
    cartItems.innerHTML = '';
    cartData.forEach(item => {
      cartItems.innerHTML += `
        <li>
        <img class="cart-image" src="${item.image}" alt="${item.product}">
          ${item.product} - Quantity: ${item.quantity} - Total Price: Rs.${item.totalPrice.toFixed(2)}
          <button class="delete-item btn btn-danger"style="font-size:15px; border-radius:20px; margin-bottom:10px;margin-left:5px;" data-product="${item.product}">Delete</button>         
          <button class="increase-quantity btn btn-success"style="font-size:20px;border-radius:30px;margin-bottom:10px;" data-product="${item.product}">+</button>
          <button class="decrease-quantity btn btn-danger"style="font-size:20px;border-radius:30px;margin-bottom:10px;" data-product="${item.product}">-</button>
        </li>
      `;
    });

  }

  // Function to calculate the total price of all items in the cart
  function calculateTotalPrice() {
    cartTotal = cartData.reduce((total, item) => total + item.totalPrice, 0);
    document.querySelector('.cart-total').textContent = `Rs.${cartTotal.toFixed(2)}`;
  }

  // Event delegation to handle delete, increase, and decrease quantity buttons
  cartItems.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('delete-item')) {
      const product = target.getAttribute('data-product');
      deleteCartItem(product);
    } else if (target.classList.contains('increase-quantity')) {
      const product = target.getAttribute('data-product');
      increaseCartItemQuantity(product);
    } else if (target.classList.contains('decrease-quantity')) {
      const product = target.getAttribute('data-product');
      decreaseCartItemQuantity(product);
    }
  });

  // Function to handle deleting an item from the cart
  function deleteCartItem(product) {
    const index = cartData.findIndex(item => item.product === product);
    if (index !== -1) {
      cartTotal -= cartData[index].totalPrice;
      const deletedQuantity=cartData[index].quantity;
      cartData.splice(index, 1);
      updateCartItems();
      calculateTotalPrice();
      updateCartLength(deletedQuantity);

      sessionStorage.setItem('cartData', JSON.stringify(cartData));

    }

  }

  // Function to handle increasing the quantity of an item in the cart
  function increaseCartItemQuantity(product) {
    const index = cartData.findIndex(item => item.product === product);
    if (index !== -1) {
      const price = parseFloat(cartData[index].totalPrice / cartData[index].quantity); // Calculate the original price
      cartData[index].quantity++;
      cartData[index].totalPrice += price;
      updateCartItems();
      calculateTotalPrice();

      sessionStorage.setItem('cartData', JSON.stringify(cartData));

    }
  }

  // Function to handle decreasing the quantity of an item in the cart
  function decreaseCartItemQuantity(product) {
    const index = cartData.findIndex(item => item.product === product);
    if (index !== -1) {
      if (cartData[index].quantity > 1) {
        const price = parseFloat(cartData[index].totalPrice / cartData[index].quantity); // Calculate the original price
        cartData[index].quantity--;
        cartData[index].totalPrice -= price;
      } else {
        deleteCartItem(product);
      }
      updateCartItems();
      calculateTotalPrice();
      sessionStorage.setItem('cartData', JSON.stringify(cartData));

    }
  }
});

document.addEventListener('DOMContentLoaded', function () {
  var booksSlider = new Swiper(".books-slider", {
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 9500,
      disableOnInteraction: false,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      }
    }
  });
// hiding componenets on hovering sidebars
  var leftOffcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasWithBackdrop'));
  var rightOffcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasRight'));

  // Add event listeners for the Bootstrap offcanvas events
  leftOffcanvas._element.addEventListener('show.bs.offcanvas', function (event) {
    if (event.target === leftOffcanvas._element) {
      hideBooksSlider();
    }
  });

  leftOffcanvas._element.addEventListener('hidden.bs.offcanvas', function (event) {
    if (event.target === leftOffcanvas._element) {
      showBooksSlider();
    }
  });

  rightOffcanvas._element.addEventListener('show.bs.offcanvas', function (event) {
    if (event.target === rightOffcanvas._element) {
      hideBooksSlider();
    }
  });

  rightOffcanvas._element.addEventListener('hidden.bs.offcanvas', function (event) {
    if (event.target === rightOffcanvas._element) {
      showBooksSlider();
    }
  });
});

function hideBooksSlider() {
  var booksSlider = document.querySelector('.home');
  var features = document.querySelector('.features');
  booksSlider.style.visibility = 'hidden';
  booksSlider.style.opacity = '0';
  features.style.visibility='hidden';
  features.style.opacity='0';
}

function showBooksSlider() {
  var booksSlider = document.querySelector('.home');
  var features = document.querySelector('.features');
  booksSlider.style.visibility = 'visible';
  booksSlider.style.opacity = '1';
  features.style.visibility = 'visible';
  features.style.opacity = '1';
}


//! featured swiper
var swiperFeatures = new Swiper(".featured__swiper", {
    loop: true,
    spaceBetween:16,
    grabCursor:true,
    slidesPerView:'auto',
    centeredSlides:'auto',
    navigation:{
      nextEl:'.swiper-button-next',
      prevEl:'.swiper-button-prev',

    },
    breakpoints: {
      1150:{
        slidesPerView:4,
        centeredSlides:false,
      }
    }
  });









//! scroll reveal animation
window.onload = function () {
  // Your ScrollReveal initialization and animations here
  const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    reset:true,
  });
  
  sr.reveal('.prod-section,.featured,.faq, .reviews, #foot_tit,.list-group, .copyrights h3');
  //sr.reveal('.books-slider', { delay: 600 })
  sr.reveal('.left',{origin:'left',interval:100})
  sr.reveal('.top',{origin:'top',interval:100})
  sr.reveal('.bottom',{origin:'bottom',interval:100})
  sr.reveal('.right',{origin:'right',interval:100})
  sr.reveal('.reviews', { interval: 100 })
  sr.reveal('.discount__data', { origin: 'left' });
  sr.reveal('.discount__images', { origin: 'right' });
};

// animation button for add top cart
/*
const cartBtn=document.querySelector(".cart-button");
cartBtn.addEventListener('click',()=>{
    cartBtn.classList.add('clicked');

    //optional
    setTimeout(()=>{
        cartBtn.classList.remove('clicked');

    },3000);
})
*/
// Get all cart buttons
const cartButtons = document.querySelectorAll(".cart-button");

// Add click event listener to each button
cartButtons.forEach((cartBtn) => {
  cartBtn.addEventListener("click", () => {
    // Remove clicked class from all buttons
    cartButtons.forEach(btn => {
      btn.classList.remove("clicked");
    });

    // Add clicked class to the clicked button
    cartBtn.classList.add("clicked");

    // Optional: Remove clicked class after 3 seconds
    setTimeout(() => {
      cartBtn.classList.remove("clicked");
    }, 3000);
  });
});

const readButtons = document.querySelectorAll(".read_more");

// Add click event listener to each button
readButtons.forEach((readBtn) => {
  readBtn.addEventListener("click", () => {
    // Remove clicked class from all buttons
    readButtons.forEach(btn => {
      btn.classList.remove("clicked");
    });

    // Add clicked class to the clicked button
    readBtn.classList.add("clicked");

    // Optional: Remove clicked class after 3 seconds
    setTimeout(() => {
      readBtn.classList.remove("clicked");
    }, 3000);
  });
});


//! making paybutton visible when total is greater than 0
function checkTotal() {
  var totalAmount = parseFloat(document.getElementById('totalAmount').innerText.slice(3)); // Extract the numeric part of the total

  var payButton = document.getElementById('payButton');

  if (totalAmount > 0) {
      // Enable the "Pay" button
      payButton.removeAttribute('disabled');
      payButton.style.cursor = 'pointer';
      payButton.style.background="green";
      payButton.style.color="white";
      return true; // Allow the form submission
  } else {
      // Disable the "Pay" button and change cursor style
      payButton.setAttribute('disabled', 'disabled');
      payButton.style.cursor = 'not-allowed';
      payButton.style.background="hsl(230,50%,90%)";
      payButton.style.color="black";
      return false; // Prevent the form submission
  }
}
