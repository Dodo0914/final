  // === 🔍 搜尋功能 ===
document.getElementById("search-icon").addEventListener("click", function () {
  const searchInput = document.getElementById("search-input");
  if (searchInput.style.display === "none" || searchInput.style.display === "") {
    searchInput.style.display = "block";
    searchInput.focus();
  } else {
    searchInput.style.display = "none";
  }
});

if (window.location.pathname.includes("index.html")) {
  // === 📸 輪播功能（首頁大圖輪播）===
  let slideIndex = 0;
  let myTimer = null;

  autoplay(true);

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function currentSlides(n) {
    showSlides(slideIndex = n);
  }

  function showSlides(n) {
    clearTimeout(myTimer);

    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");
    const track = document.getElementById("carousel-track");

    if (!track || slides.length === 0 || dots.length === 0) return; // 防止報錯

    if (n >= slides.length) {
      slideIndex = 0;
    }
    if (n < 0) {
      slideIndex = slides.length - 1;
    }

    // 移動輪播軌道
    track.style.transform = `translateX(-${slideIndex * 100}%)`;

    // 控制圓點
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.remove("active");
    }
    dots[slideIndex].classList.add("active");
  }

  function autoplay(isFirst) {
    if (!isFirst) {
      slideIndex++;
    }
    showSlides(slideIndex);
    myTimer = setTimeout(() => autoplay(false), 2500);
  }

  // === 🛒 熱銷商品滑動功能 ===
  let currentIndex = 0;
  const slider = document.getElementById("productSlider");
  const cards = document.querySelectorAll(".product-card");
  const cardWidth = 320; // 含 margin 寬度

  function updateSlider() {
    if (!slider) return;
    const offset = -currentIndex * cardWidth;
    slider.style.transform = `translateX(${offset}px)`;
  }

  function prevProduct() {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  }

  function nextProduct() {
    const maxIndex = cards.length - 3; // 顯示三張
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateSlider();
    }
  }
}

//聯絡我們
if (window.location.pathname.includes("communication.html")) {
  document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // 防止表單實際送出
    alert("已成功送出，謝謝您的聯絡！");
    this.reset();
  });
});
}
