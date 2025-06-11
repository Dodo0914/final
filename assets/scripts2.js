// ========================================
// LOGIN.HTML 相關功能
// ========================================

// 密碼顯示/隱藏功能
function togglePassword(toggleEl, inputId) {
    const input = document.getElementById(inputId);
    const icon = toggleEl.querySelector('i');

    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = "password";
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// 存儲用戶數據的簡單陣列
let users = [];

// 表單切換功能
function showLogin() {
    hideAllForms();
    document.getElementById('loginForm').classList.add('active');
    clearMessages();
}

function showRegister() {
    hideAllForms();
    document.getElementById('registerForm').classList.add('active');
    clearMessages();
}

function showForgotPassword() {
    hideAllForms();
    document.getElementById('forgotForm').classList.add('active');
    clearMessages();
}

function hideAllForms() {
    const forms = document.querySelectorAll('.form');
    forms.forEach(form => form.classList.remove('active'));
}

function showMessage(message, isError = false) {
    const successEl = document.getElementById('successMessage');
    const errorEl = document.getElementById('errorMessage');
    
    if (isError) {
        errorEl.textContent = message;
        errorEl.style.display = 'block';
        successEl.style.display = 'none';
    } else {
        successEl.textContent = message;
        successEl.style.display = 'block';
        errorEl.style.display = 'none';
    }
}

function clearMessages() {
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('errorMessage').style.display = 'none';
}

// 初始化登入相關事件監聽器
function initializeLoginEvents() {
    // 登入處理
    const loginForm = document.getElementById('loginFormElement');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                showMessage('登入成功！歡迎回來 ' + user.name);
                setTimeout(() => {
                    alert('登入成功！將重定向到主頁面');
                    location.href = 'index.html';
                }, 1500);
            } else {
                showMessage('電子信箱或密碼錯誤，請重新輸入', true);
            }
        });
    }

    // 註冊處理
    const registerForm = document.getElementById('registerFormElement');
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const phone = document.getElementById('registerPhone').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            showMessage('密碼與確認密碼不一致', true);
            return;
        }

        if (users.find(u => u.email === email)) {
            showMessage('此電子信箱已被註冊', true);
            return;
        }

        users.push({
            name: name,
            email: email,
            phone: phone,
            password: password
        });

        showMessage('註冊成功！請登入您的帳號');

        setTimeout(() => {
            document.getElementById('registerFormElement').reset();
            showLogin();

            // ⭐ 自動填入登入表單
            document.getElementById('loginEmail').value = email;
            document.getElementById('loginPassword').value = password;
        }, 1500);
    });
}


    // 忘記密碼處理
    const forgotForm = document.getElementById('forgotFormElement');
    if (forgotForm) {
        forgotForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('forgotEmail').value;
            
            if (users.find(u => u.email === email)) {
                showMessage('密碼重設連結已發送至您的信箱');
                setTimeout(() => {
                    showLogin();
                }, 2000);
            } else {
                showMessage('找不到此電子信箱', true);
            }
        });
    }

    // 預設測試帳號
    users.push({
        name: '測試用戶',
        email: 'test@example.com',
        phone: '0912345678',
        password: '123456'
    });
}

// ========================================
// 登入功能
// ========================================

function login(email, password) {
    // 這裡應該是您的登入驗證邏輯
    // 模擬登入成功
    const user = {
        id: 1,
        name: '測試用戶',
        email: email,
        phone: '0912345678',
        loginTime: new Date().toISOString()
    };
    
    // 設定登入狀態
    AuthManager.setLoginState(user);
    
    alert('登入成功！');
    window.location.href = 'member.html';
}

function logout() {
    AuthManager.clearLoginState();
    alert('已成功登出');
    window.location.href = 'login.html';
}

// ========================================
// MEMBER.HTML 相關功能
// ========================================

// ✅ 進入頁面時初始化 - 修正版
function initializeMemberPage() {
    console.log('正在初始化會員頁面...');
    
    if (!AuthManager.isLoggedIn()) {
        console.log('用戶未登入，重導向到登入頁面');
        if (!window.loginRedirected) {
            window.loginRedirected = true;
            alert('請先登入才能進入會員中心');
            window.location.href = 'login.html';
        }
        return;
    }
    
    const user = AuthManager.getLoginState();
    if (!user) {
        console.log('無法取得用戶資料');
        if (!window.loginRedirected) {
            window.loginRedirected = true;
            alert('登入狀態異常，請重新登入');
            AuthManager.clearLoginState();
            window.location.href = 'login.html';
        }
        return;
    }
    
    console.log('用戶已登入:', user);
    
    // 填入個人資料
    try {
        const nameField = document.getElementById('profileName');
        const emailField = document.getElementById('profileEmail');
        const phoneField = document.getElementById('profilePhone');
        
        if (nameField) nameField.value = user.name || '';
        if (emailField) emailField.value = user.email || '';
        if (phoneField) phoneField.value = user.phone || '';
        
        console.log('個人資料已填入');
    } catch (error) {
        console.error('填入個人資料時發生錯誤:', error);
    }
    
    // 初始化其他功能
    initializeStarRatings();
    initializeMemberEvents();
    showSection('profile'); // 預設顯示個人資料區
    
    console.log('會員頁面初始化完成');
}

// ✅ 切換頁面區域（個人資料、歷史紀錄、評論）
function showSection(sectionId) {
    console.log('切換到區域:', sectionId);
    
    const sections = document.querySelectorAll('.content-section');
    const buttons = document.querySelectorAll('.nav-btn');
    
    sections.forEach(section => section.classList.remove('active'));
    buttons.forEach(btn => btn.classList.remove('active'));
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        console.log('區域切換成功:', sectionId);
    } else {
        console.error('找不到目標區域:', sectionId);
    }
    
    // 設定按鈕 active
    const button = Array.from(buttons).find(btn => 
        btn.getAttribute('onclick')?.includes(sectionId) ||
        btn.getAttribute('data-section') === sectionId
    );
    if (button) {
        button.classList.add('active');
    }
}

// ✅ 星星評分系統
function initializeStarRatings() {
    const ratings = document.querySelectorAll('.rating');
    
    ratings.forEach(rating => {
        const stars = Array.from(rating.children).filter(child => 
            !child.classList.contains('rating-value')
        );
        const ratingValueElement = rating.querySelector('.rating-value');
        let ratingValue;
        let index = -1;
        
        if (ratingValueElement && ratingValueElement.textContent.includes('你打的分數是')) {
            const match = ratingValueElement.textContent.match(/\d+/);
            if (match) {
                const currentScore = parseInt(match[0]);
                index = currentScore - 1;
                ratingValue = currentScore;
            }
        } else if (ratingValueElement) {
            ratingValueElement.innerHTML = "請給分";
        }
        
        for (let i = 0; i < stars.length; i++) {
            stars[i].addEventListener("mouseover", function () {
                if (ratingValueElement) {
                    ratingValueElement.innerHTML = "正在打分數";
                }
                stars.forEach(star => star.classList.replace("fa-star", "fa-star-o"));
                for (let j = 0; j <= i; j++) {
                    stars[j].classList.replace("fa-star-o", "fa-star");
                }
            });
            
            stars[i].addEventListener("click", function () {
                ratingValue = i + 1;
                index = i;
                if (ratingValueElement) {
                    ratingValueElement.innerHTML = "你打的分數是 " + ratingValue;
                }
            });
        }
        
        rating.addEventListener("mouseleave", function () {
            stars.forEach(star => star.classList.replace("fa-star", "fa-star-o"));
            for (let j = 0; j <= index; j++) {
                stars[j].classList.replace("fa-star-o", "fa-star");
            }
            if (ratingValueElement) {
                ratingValueElement.innerHTML = index >= 0 ? 
                    "你打的分數是 " + (index + 1) : "請給分";
            }
        });
    });
}

// ✅ 表單提交處理
function initializeMemberEvents() {
    const profileForm = document.getElementById('profileForm');
    
    if (profileForm) {
        profileForm.addEventListener('submit', function (e) {
            e.preventDefault();
            
            const user = AuthManager.getLoginState();
            if (!user) {
                alert('登入狀態異常，請重新登入');
                window.location.href = 'login.html';
                return;
            }
            
            const formData = {
                name: document.getElementById('profileName')?.value || user.name,
                email: document.getElementById('profileEmail')?.value || user.email,
                phone: document.getElementById('profilePhone')?.value || user.phone,
                birthday: document.getElementById('profileBirthday')?.value,
                gender: document.getElementById('profileGender')?.value,
                address: document.getElementById('profileAddress')?.value
            };
            
            // 更新用戶資料
            const updatedUser = { ...user, ...formData };
            AuthManager.setLoginState(updatedUser);
            
            console.log('保存的資料:', formData);
            alert('個人資料已成功保存！');
        });
    }
}

// ========================================
// 頁面載入時自動執行
// ========================================

// 當頁面載入完成時自動初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('頁面載入完成，檢查當前頁面...');
    
    // 檢查當前頁面是否為會員中心
    if (window.location.pathname.includes('member.html') || 
        document.getElementById('profileForm')) {
        console.log('偵測到會員頁面，開始初始化...');
        initializeMemberPage();
    }
});

let loginRedirected = false;

// 頁面可見性變化時重新檢查登入狀態
document.addEventListener('visibilitychange', function() {
    if (!document.hidden && 
        (window.location.pathname.includes('member.html') || 
         document.getElementById('profileForm'))) {
        
        if (!AuthManager.isLoggedIn() && !loginRedirected) {
            loginRedirected = true;
            alert('登入狀態已過期，請重新登入');
            window.location.href = 'login.html';
        }
    }
});

// 除錯用函數
function checkLoginStatus() {
    console.log('=== 登入狀態檢查 ===');
    console.log('isLoggedIn:', AuthManager.isLoggedIn());
    console.log('loginState:', AuthManager.getLoginState());
    console.log('localStorage items:');
    console.log('- loggedInUser:', localStorage.getItem('loggedInUser'));
    console.log('- loginState:', localStorage.getItem('loginState'));
    console.log('- isLoggedIn:', localStorage.getItem('isLoggedIn'));
    console.log('sessionStorage items:');
    console.log('- currentUser:', sessionStorage.getItem('currentUser'));
}
// ========================================
// CART.HTML 相關功能
// ========================================

// ========================================
// CART.HTML 相關功能
// ========================================
let cartItems = [];

// 初始化購物車
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('cart');
  cartItems = saved ? JSON.parse(saved) : [
    { id: 1, name: '海鹽焦糖乳酪貝果', price: 50, quantity: 1, image: 'img1.jpg' },
    { id: 2, name: '無花果乳酪貝果', price: 60, quantity: 1, image: 'img2.jpg' }
  ];

  renderCart();
  bindQuantityInputs();
});

// 渲染購物車列表
function renderCart() {
  const container = document.getElementById('cart-product-list');
  if (!container) return;

  if (cartItems.length === 0) {
    container.innerHTML = '<p>您的購物車是空的。</p>';
    updateSummary(0, 0);
    return;
  }

  container.innerHTML = cartItems.map(item => `
    <div class="cart-item d-flex justify-content-between align-items-center mb-3">
      <div class="item-details d-flex align-items-center">
        <div class="item-img me-3">
          <img src="${item.image || ''}" alt="${item.name}" width="80" />
        </div>
        <div class="item-info" data-price="${item.price}">${item.name} - $${item.price}</div>
      </div>
      <div class="item-qty">
        <input type="number" min="0" value="${item.quantity}" data-item-id="${item.id}" class="form-control w-75" />
      </div>
      <div class="item-subtotal">$${item.price * item.quantity}</div>
    </div>
  `).join('');

  updateSummary(
    cartItems.reduce((sum, item) => sum + item.quantity, 0),
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  bindQuantityInputs();
}

// 綁定數量 input 事件
function bindQuantityInputs() {
  const inputs = document.querySelectorAll('input[data-item-id]');
  inputs.forEach(input => {
    input.onchange = (e) => {
      const id = +e.target.dataset.itemId;
      let val = parseInt(e.target.value);

      if (isNaN(val) || val < 0) {
        alert('數量必須是大於或等於 0 的整數');
        e.target.value = getQuantityById(id);
        return;
      }

      if (val === 0) {
        if (confirm('數量為 0，是否要從購物車中刪除此商品？')) {
          removeCartItem(id);
        } else {
          e.target.value = getQuantityById(id);
        }
        return;
      }

      updateQuantity(id, val);
    };

    // 可選：即時更新（輸入時更新）
    input.oninput = (e) => {
      const id = +e.target.dataset.itemId;
      let val = parseInt(e.target.value);
      if (!isNaN(val) && val > 0) {
        updateQuantity(id, val);
      }
    };
  });
}

// 依 id 取得商品目前數量
function getQuantityById(id) {
  const item = cartItems.find(i => i.id === id);
  return item ? item.quantity : 1;
}

// 更新商品數量
function updateQuantity(id, newQty) {
  const item = cartItems.find(i => i.id === id);
  if (!item) return;

  item.quantity = newQty;

  // 重新渲染購物車
  renderCart();
  saveCartToStorage();
}

// 從購物車移除商品
function removeCartItem(id) {
  cartItems = cartItems.filter(i => i.id !== id);
  renderCart();
  saveCartToStorage();
}

// 更新總數和總價顯示
function updateSummary(totalQty, totalPrice) {
  const countEl = document.getElementById('item-count');
  const priceEl = document.querySelector('.total-price');

  if (countEl) countEl.textContent = totalQty;
  if (priceEl) priceEl.textContent = `$${totalPrice}`;
}

// 存到 localStorage
function saveCartToStorage() {
  localStorage.setItem('cart', JSON.stringify(cartItems));
}


function initializeCartEvents() {
  // 步驟條高亮設定
  const currentStep = 1;
  document.querySelectorAll('.step').forEach((step, idx) => {
    if (idx + 1 < currentStep) step.classList.add('completed');
    else if (idx + 1 === currentStep) step.classList.add('active');
  });
}

// ========================================
// FILLINFO.HTML 相關功能
// ========================================

function initializeFillInfoPage() {
  // 步驟條高亮設定
  const currentStep = 2;
  document.querySelectorAll('.step').forEach((step, idx) => {
    if (idx + 1 < currentStep) step.classList.add('completed');
    else if (idx + 1 === currentStep) step.classList.add('active');
  });

  // 載入購物車資料（來自 localStorage）
  const orderSummaryDiv = document.getElementById('order-summary');
  if (orderSummaryDiv) {
    orderSummaryDiv.innerHTML = ""; // 清空現有內容
    const shippingFee = 225;
    let subtotal = 0;

    const savedCart = localStorage.getItem("cart");
    const cartItems = savedCart ? JSON.parse(savedCart) : [];

    if (cartItems.length === 0) {
      orderSummaryDiv.innerHTML = "<p>您的購物車是空的。</p>";
    } else {
      cartItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'd-flex justify-content-between mb-2';
        itemDiv.innerHTML = `
          <span>${item.name} × ${item.quantity}</span>
          <span>$${item.price * item.quantity}</span>
        `;
        orderSummaryDiv.appendChild(itemDiv);
        subtotal += item.price * item.quantity;
      });

      // 小計
      const subtotalDiv = document.createElement('div');
      subtotalDiv.className = 'summary-subtotal';
      subtotalDiv.innerHTML = `<strong>小計</strong><strong>$${subtotal}</strong>`;
      orderSummaryDiv.appendChild(subtotalDiv);

      // 運費
      const shippingDiv = document.createElement('div');
      shippingDiv.className = 'd-flex justify-content-between';
      shippingDiv.innerHTML = `<strong>運費</strong><strong>$${shippingFee}</strong>`;
      orderSummaryDiv.appendChild(shippingDiv);

      // 總計
      const totalDiv = document.createElement('div');
      totalDiv.className = 'summary-total';
      totalDiv.innerHTML = `<strong>總計</strong><strong>$${subtotal + shippingFee}</strong>`;
      orderSummaryDiv.appendChild(totalDiv);
    }
  }

  // 表單載入與自動填值
  const form = document.getElementById('info-form');
  if (form) {
    const formElements = form.elements;

    for (let i = 0; i < formElements.length; i++) {
      const input = formElements[i];
      if (input.name && sessionStorage.getItem(input.name)) {
        if (input.type === 'radio') {
          if (input.value === sessionStorage.getItem(input.name)) {
            input.checked = true;
          }
        } else {
          input.value = sessionStorage.getItem(input.name);
        }
      }
    }

    // 即時儲存
    form.addEventListener('input', (e) => {
      const input = e.target;
      if (input.name) {
        if (input.type === 'radio') {
          if (input.checked) {
            sessionStorage.setItem(input.name, input.value);
          }
        } else {
          sessionStorage.setItem(input.name, input.value);
        }
      }
    });

    // 表單提交處理
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const requiredFields = ['fullname', 'phone', 'email', 'address'];
      let valid = true;

      requiredFields.forEach(name => {
        const input = form.elements[name];
        if (!input.value.trim()) {
          input.classList.add('is-invalid');
          valid = false;
        } else {
          input.classList.remove('is-invalid');
        }
      });

      if (!valid) {
        alert('請完整填寫必填欄位');
        return;
      }

      // 儲存所有欄位至 sessionStorage
      for (let i = 0; i < formElements.length; i++) {
        const input = formElements[i];
        if (input.name) {
          if (input.type === 'radio') {
            if (input.checked) {
              sessionStorage.setItem(input.name, input.value);
            }
          } else {
            sessionStorage.setItem(input.name, input.value);
          }
        }
      }

      // 前往付款頁面
      window.location.href = "payment.html";
    });
  }
}


// ========================================
// PAYMENT.HTML 相關功能
// ========================================
function initializePaymentPage() {
    // 步驟條高亮設定
    const currentStep = 3;
    document.querySelectorAll('.step').forEach((step, idx) => {
        if (idx + 1 < currentStep) step.classList.add('completed');
        else if (idx + 1 === currentStep) step.classList.add('active');
    });

    // 顯示訂單摘要
    const orderSummaryDiv = document.getElementById('order-summary');
    if (orderSummaryDiv) {
        const savedCart = localStorage.getItem('cart');
        const cartItems = savedCart ? JSON.parse(savedCart) : [];
        const shippingFee = 225;
        let subtotal = 0;

        orderSummaryDiv.innerHTML = '';

        if (cartItems.length === 0) {
            orderSummaryDiv.innerHTML = "<p>購物車是空的。</p>";
        } else {
            cartItems.forEach(item => {
                const itemRow = document.createElement('div');
                itemRow.className = 'd-flex justify-content-between mb-2';
                itemRow.innerHTML = `
                    <span>${item.name} × ${item.quantity}</span>
                    <span>$${item.price * item.quantity}</span>
                `;
                orderSummaryDiv.appendChild(itemRow);
                subtotal += item.price * item.quantity;
            });

            // 小計、運費與總計
            orderSummaryDiv.innerHTML += `
                <div class="d-flex justify-content-between"><strong>小計</strong><strong>$${subtotal}</strong></div>
                <div class="d-flex justify-content-between"><strong>運費</strong><strong>$${shippingFee}</strong></div>
                <div class="summary-total d-flex justify-content-between"><strong>總計</strong><strong>$${subtotal + shippingFee}</strong></div>
            `;
        }
    }

    // 顯示收件人資訊
    const userInfoDiv = document.getElementById('user-info-summary');
    if (userInfoDiv) {
        const fields = ['fullname', 'phone', 'email', 'address', 'payment-method'];
        userInfoDiv.innerHTML = fields.map(name => {
            const value = sessionStorage.getItem(name) || '（未填）';
            const label = getFieldLabel(name);
            return `<p><strong>${label}：</strong> ${value}</p>`;
        }).join('');
    }

    // 付款表單送出處理
    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function (e) {
            e.preventDefault(); // 防止表單提交刷新頁面

            alert('付款完成！感謝您的訂購！');

            // 清除所有購物車與表單資料
            localStorage.removeItem('cart');
            sessionStorage.clear();

            // 跳轉到感謝頁
            location.href = 'thank-you.html';
        });
    }
}

// 對應欄位標籤顯示
function getFieldLabel(name) {
    switch (name) {
        case 'fullname': return '收件人姓名';
        case 'phone': return '電話';
        case 'email': return 'Email';
        case 'address': return '地址';
        case 'payment-method': return '付款方式';
        default: return name;
    }
}

// thank-you.js

function initializeThankYouPage() {
    const currentStep = 4; // 第四步：完成
    document.querySelectorAll('.step').forEach((step, idx) => {
        if (idx + 1 < currentStep) step.classList.add('completed');
        else if (idx + 1 === currentStep) step.classList.add('active');
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    switch(currentPage) {
        case 'login.html':
        case 'index.html':
            initializeLoginEvents();
            break;
        case 'member.html':
            initializeMemberPage();
            initializeMemberEvents();
            break;
        case 'cart.html':
            initializeCartEvents();
            initializeCartStepProgress();
            break;
        case 'fillinfo.html':
            initializeFillInfoPage();
            break;
        case 'payment.html':
            initializePaymentPage();
            break;
        case 'thank-you.html':
            initializeThankYouPage();
            break;
        default:
            console.log('頁面已載入:', currentPage);
    }
});


// ========================================
// 主要初始化函數
// ========================================

// 頁面載入完畢後的初始化
document.addEventListener('DOMContentLoaded', function() {
    // 根據當前頁面初始化對應功能
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch(currentPage) {
        case 'login.html':
        case 'index.html':
            initializeLoginEvents();
            break;
            
        case 'member.html':
            initializeMemberPage();
            initializeMemberEvents();
            break;
            
        case 'cart.html':
            initializeCartEvents();
            break;
            
        case 'fillinfo.html':
            initializeFillInfoPage();
            break;
            
        case 'payment.html':
            initializePaymentPage();
            break;
            
        default:
            // 通用初始化，如果需要的話
            console.log('頁面已載入:', currentPage);
            break;
    }
});

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



