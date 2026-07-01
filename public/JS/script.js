// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

// Flash messages background blur 

let mainPage = document.querySelector(".allCards");
let reviewPage = document.querySelector(".showDoc");
let signupPage = document.querySelector(".editBody");
let footer = document.querySelector(".footer");
let successMsg = document.querySelector(".successMsg");
let flashBtn = document.querySelector(".flashBtn");

if (successMsg) {
  if (mainPage) mainPage.classList.add("blurred");
  if (reviewPage) reviewPage.classList.add("blurred");
  if (signupPage) signupPage.classList.add("blurred");
  if (footer) footer.classList.add("blurred");
}

if (flashBtn) {
  flashBtn.addEventListener("click", () => {
    mainPage.classList.remove("blurred");
    reviewPage.classList.remove("blurred");
    signupPage.classList.remove("blurred");
    footer.classList.remove("blurred");
  });
}

// morePopups :

let morePopup = document.querySelector(".morePopup");
let moreIcon = document.querySelector(".moreIcon");

let midNavMore = document.querySelector(".midNavMore");
let midNavMorePopup = document.querySelector(".midNavMorePopup");

moreIcon?.addEventListener("click", (e) => {
  e.stopPropagation();
  morePopup.classList.toggle("showPopup");
});

// 2. Hide popup when clicking anywhere else on the page
  document.addEventListener("click", (e) => {
    // If the popup is currently visible
    if (morePopup.classList.contains("showPopup")) {
      
      // Check if the click happened OUTSIDE the popup box
      if (!morePopup.contains(e.target)) {
        morePopup.classList.remove("showPopup");
      }
    }
  });

midNavMore?.addEventListener("click", (e) => {
  e.stopPropagation();
  midNavMorePopup.classList.toggle("showPopup");
});

midNavMore?.addEventListener("click" , (e) => {
  if(midNavMorePopup.classList.contains("showPopup")) {
  if(!midNavMorePopup.contains(e.target) && e.target != midNavMore) {
    midNavMorePopup.classList.remove("showPopup");
  }
}
});

// Mobile panel :

document.addEventListener("DOMContentLoaded", () => {
  const mobileOptions = document.querySelectorAll(".explore, .wishlist, .logOrSignin");
  const currPath = window.location.pathname;

  mobileOptions.forEach(option => {
    // Find the 'stretched-link' anchor tag inside this specific option
    const link = option.querySelector(".stretched-link");

    if (link) {
      // window.location.origin handles 'http://localhost:port' automatically
      const linkPath = new URL(link.getAttribute('href'), window.location.origin).pathname;

      // Check if the current URL path matches the link's path
      if (currPath === linkPath) {
        option.classList.add('optionClicked');
      } else {
        option.classList.remove('optionClicked'); // Ensures others are cleared
      }
    }
  });
});

// Wishlist :

let heartIcons = document.querySelectorAll(".heart");

heartIcons.forEach(icon => {
  icon.addEventListener("click" , async (e) => {
    const id = e.target.dataset.id;

    const response = await fetch("/wishlist" , {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        listingId : id
      })
    });

    const data = await response.json();

    if(data.requireLogin){
      window.location.href = "/login";
      return;
    }

    if(data.success) {
      e.target.classList.toggle("redHeart");
      e.target.classList.toggle("fa-solid");
      e.target.classList.toggle("fa-regular");
    }
  });
});

// Dropbox category already selected in edit form :
document.addEventListener("DOMContentLoaded", () => {
  let categories = document.querySelector("#categories");
  
  if (categories) {
    let category = categories.dataset.category;
    if (category) {
      categories.value = category;
    }
  }
});