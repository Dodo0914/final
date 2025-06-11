document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-tab");

      tabButtons.forEach(b => b.classList.remove("active"));
      tabContents.forEach(c => c.classList.remove("active"));

      btn.classList.add("active");
      document.getElementById(target).classList.add("active");
    });
  });
  

  // 數量控制邏輯
  const quantityInput = document.getElementById('quantity');
  const increaseBtn = document.querySelector('.increase');
  const decreaseBtn = document.querySelector('.decrease');

  //商品數量加減
  increaseBtn.addEventListener('click', () => {
    quantityInput.value = parseInt(quantityInput.value) + 1;
  });

  decreaseBtn.addEventListener('click', () => {
    const current = parseInt(quantityInput.value);
    if (current > 1) {
      quantityInput.value = current - 1;
    }
  });

  document.querySelector('.scroll-btn.left').addEventListener('click', () => {
  document.getElementById('recommend-scroll').scrollBy({ left: -300, behavior: 'smooth' });
  });

  document.querySelector('.scroll-btn.right').addEventListener('click', () => {
  document.getElementById('recommend-scroll').scrollBy({ left: 300, behavior: 'smooth' });
  });

  const mainImageScroll = document.getElementById("mainImageScroll");
  const mainSlides = document.querySelectorAll(".main-slide");
  const thumbnails = document.querySelectorAll(".thumbnail");

  thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    

    thumbnails.forEach(t => t.classList.remove("active"));
    thumbnail.classList.add("active");
    });
  });

  const addToCartBtn = document.querySelector(".product-actions .btn-orange:nth-child(1)");
  const buyNowBtn = document.querySelector(".product-actions .btn-orange:nth-child(2)");
  const productTitle = document.querySelector(".product-title");
  const priceText = document.querySelector(".price");
  const mainImage = document.querySelector(".product-img img") || { src: 'image/default.png' }; // fallback 圖片

  if (addToCartBtn && buyNowBtn) {
    // 加入購物車
    addToCartBtn.addEventListener("click", () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");

      const existing = cart.find(item => item.name === productTitle.textContent);
      const price = parseInt(priceText.textContent.replace(/\D/g, "")); // 取出價格中的數字
      const quantity = parseInt(quantityInput.value);

      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.push({
          id: Date.now(), // 可以根據實際產品 id 改成固定值
          name: productTitle.textContent,
          price,
          quantity,
          image: mainImage.src
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert("已加入購物車！");
    });

    // 直接購買
    buyNowBtn.addEventListener("click", () => {
      const price = parseInt(priceText.textContent.replace(/\D/g, ""));
      const quantity = parseInt(quantityInput.value);

      const cartItem = [{
        id: Date.now(),
        name: productTitle.textContent,
        price,
        quantity,
        image: mainImage.src
      }];

      // 存入 sessionStorage 作為單次結帳
      sessionStorage.setItem("cartData", JSON.stringify(cartItem));

      // 跳轉到填寫資料頁面
      window.location.href = "fillinfo.html";
    });
  }



  //id跳轉 把資訊全部加入進裡面
  const recommendProducts = [
  {
    id: 101,
    name: '藍莓雪酪減醣貝果',
    price: 80,
    image: 'image/bagel01.png',
    images: ['image/bagel01.png', 'image/blueberry-1.png', 'image/blueberry-2.png'],
    description: '這是藍莓雪酪貝果的詳細介紹。',
    fullDescription: `每口吃得到飽滿藍莓果粒拌入香醇乳酪，尾韻淡淡奶香，清甜微酸、味蕾自然解膩選用野生藍莓果乾，不經榨汁、不濃縮，保留果實天然風味；慢火熬製果醬，搭配乳酪完美融合。`,
    introImage: 'image/blueberry-intro.png',
    storageImage: 'image/keep.png',
    nutrition: [
    { name: "熱量", perServing: "316.5 大卡" },
    { name: "蛋白質", perServing: "9.0 公克" },
    { name: "脂肪", perServing: "6.5 公克" },
    { name: "飽和脂肪", perServing: "3.3 公克" },
    { name: "反式脂肪", perServing: "0 公克" },
    { name: "碳水化合物", perServing: "55.5 公克" },
    { name: "糖", perServing: "6.4 公克" },
    { name: "膳食纖維", perServing: "2.5 公克" },
    { name: "鈉", perServing: "533 毫克" }
    ],
    reviews: [
      { name: "小芸", date: "2025-06-01", rating: 5, text: "果乾很多，吃得到藍莓香氣，口感超棒！" },
      { name: "Leo", date: "2025-06-02", rating: 4, text: "甜度剛好，健康又好吃。" },
      { name: "Kelly", date: "2025-06-02", rating: 5, text: "減糖但完全不輸一般貝果，回購100次！" },
      { name: "Vincent", date: "2025-06-03", rating: 5, text: "朋友推薦來買，果然沒失望。" },
      { name: "阿昇", date: "2025-06-04", rating: 4, text: "冷藏後稍硬，但回烤後超香。" },
      { name: "Winnie", date: "2025-06-04", rating: 5, text: "藍莓味濃又不膩，吃完心情超好～" },
      { name: "小哈", date: "2025-06-05", rating: 5, text: "真材實料！健康控會喜歡。" },
      { name: "沛沛", date: "2025-06-05", rating: 4, text: "稍微貴了一點，但品質有到位。" },
      { name: "Ariel", date: "2025-06-06", rating: 5, text: "我媽超愛，買來孝親超有面子～" },
      { name: "Max", date: "2025-06-06", rating: 4, text: "不是那種重甜路線，很適合減糖族。" }
    ]
  },
  {
    id: 102,
    name: '重乳酪起司減醣貝果',
    price: 85,
    image: 'image/bagel02.png',
    images: ['image/bagel02.png', 'image/bagel02-1.png', 'image/bagel02-2.png'],
    description: '這是重乳酪起司減醣貝果的詳細介紹。',
    fullDescription: `一口咬下，雙重起司的鹹香在嘴裡層層交融——選用切達起司的濃郁鹹香 搭配高登起司的醇厚奶香，打造香濃不膩的起司體驗。`,
    introImage: 'image/bagel02-intro.png',
    storageImage: 'image/keep.png',
    nutrition: [
    { name: "熱量", perServing: "356.3 大卡" },
    { name: "蛋白質", perServing: "15.3 公克" },
    { name: "脂肪", perServing: "11.6 公克" },
    { name: "飽和脂肪", perServing: "6.8 公克" },
    { name: "反式脂肪", perServing: "0.1 公克" },
    { name: "碳水化合物", perServing: "47.7 公克" },
    { name: "糖", perServing: "1.8 公克" },
    { name: "膳食纖維", perServing: "3.4 公克" },
    { name: "鈉", perServing: "690 毫克" }
    ],
    reviews: [
      { name: "小熊", date: "2025-06-01", rating: 5, text: "吃過最好吃的貝果！起司超多～" },
      { name: "Ivy", date: "2025-06-02", rating: 4, text: "包裝很可愛，吃起來也不錯。" },
      { name: "俊宇", date: "2025-06-03", rating: 5, text: "味道非常天然，沒有添加物的感覺 👍" },
      { name: "Emily", date: "2025-06-03", rating: 4, text: "很香，但略乾。" },
      { name: "阿凱", date: "2025-06-04", rating: 5, text: "女友超愛！買來當情人節禮物剛剛好。" },
      { name: "Nina", date: "2025-06-05", rating: 5, text: "超療癒～吃完心情變好🥰" },
      { name: "阿良", date: "2025-06-05", rating: 4, text: "價格略高，但吃得出用心。" },
      { name: "Sandy", date: "2025-06-06", rating: 5, text: "一吃就回購！超推！" },
      { name: "Eric", date: "2025-06-06", rating: 5, text: "品質穩定，服務也不錯～" },
      { name: "Tina", date: "2025-06-06", rating: 5, text: "推薦！會介紹朋友來買 😍" }
    ]
  },
  {
    id: 103,
    name: '藍莓優格丁減醣貝果',
    price: 85,
    image: 'image/bagel03.png',
    images: ['image/bagel03.png', 'image/bagel03-1.png', 'image/bagel03-2.png'],
    description: '這是藍莓優格丁減醣貝果的詳細介紹。',
    fullDescription: `嚴選天然無添加食材，濃縮每一口莓果精華，結合純淨有機藍莓果乾與清爽優格乳酪丁，吃得到真實果香與奶香的完美交織。`,
    introImage: 'image/bagel03-intro.png',
    storageImage: 'image/keep.png',
    nutrition: [
    { name: "熱量", perServing: "319 大卡" },
    { name: "蛋白質", perServing: "10.8 公克" },
    { name: "脂肪", perServing: "6.1 公克" },
    { name: "飽和脂肪", perServing: "3 公克" },
    { name: "反式脂肪", perServing: "0 公克" },
    { name: "碳水化合物", perServing: "55.2 公克" },
    { name: "糖", perServing: "7.2 公克" },
    { name: "膳食纖維", perServing: "1.2 公克" },
    { name: "鈉", perServing: "575 毫克" }
    ],
    reviews: [
      { name: "小美", date: "2025-05-01", rating: 5, text: "超好吃！會回購～" },
      { name: "阿強", date: "2025-05-03", rating: 5, text: "有點甜，但不錯吃" },
      { name: "Yuki", date: "2025-05-04", rating: 5, text: "包裝仔細，送禮很有面子！" },
      { name: "Jason", date: "2025-05-05", rating: 3, text: "普通，沒有特別驚艷。" },
      { name: "芊芊", date: "2025-05-06", rating: 4, text: "口感不錯，甜度剛剛好。" },
      { name: "阿寶", date: "2025-05-07", rating: 4, text: "可能不是我的菜，有點乾。" },
      { name: "Leo", date: "2025-05-08", rating: 5, text: "超出預期！搭配咖啡完美～" },
      { name: "欣怡", date: "2025-05-08", rating: 5, text: "咬下去有驚喜，果乾很多～" },
      { name: "Lulu", date: "2025-05-09", rating: 4, text: "配送速度很快，值得推薦！" },
      { name: "Kiki", date: "2025-05-11", rating: 4, text: "味道普通，但還是會支持。" }
    ]
  },
  {
    id: 104,
    name: '東方美人茶花生減醣貝果',
    price: 85,
    image: 'image/bagel04.png',
    images: ['image/bagel04.png', 'image/bagel04-1.png', 'image/bagel04-2.png'],
    description: '這是東方美人茶香花生減醣貝果的詳細介紹。',
    fullDescription: `嚴選徐耀良茶園東方美人茶與新竹在地福源花生醬，捨棄茶精與防腐劑，融入手摘茶葉與古法熬製花生原豆，入口清雅茶香，尾韻綿密花生香，濃而不膩、層次豐富。`,
    introImage: 'image/bagel04-intro.png',
    storageImage: 'image/keep.png',
    nutrition: [
    { name: "熱量", perServing: "414 大卡" },
    { name: "蛋白質", perServing: "16.5 公克" },
    { name: "脂肪", perServing: "15 公克" },
    { name: "飽和脂肪", perServing: "3.2 公克" },
    { name: "反式脂肪", perServing: "0 公克" },
    { name: "碳水化合物", perServing: "53.2 公克" },
    { name: "糖", perServing: "4.4 公克" },
    { name: "膳食纖維", perServing: "3.2 公克" },
    { name: "鈉", perServing: "550 毫克" }
    ],
    reviews: [
      { name: "小芸", date: "2025-06-01", rating: 5, text: "茶香很高雅，後味的花生超驚艷！" },
      { name: "豪哥", date: "2025-06-02", rating: 4, text: "第一次吃這種組合，很新奇，不錯吃。" },
      { name: "Eva", date: "2025-06-03", rating: 5, text: "吃起來好溫潤的味道，完全不膩～" },
      { name: "Kevin", date: "2025-06-04", rating: 5, text: "花生超香，吃完嘴巴還是回甘的茶味。" },
      { name: "阿全", date: "2025-06-05", rating: 5, text: "老媽說這個是她吃過最順口的貝果。" }
    ]
  },
  {
    id: 105,
    name: '玫瑰洛神乳酪減醣貝果',
    price: 90,
    image: 'image/bagel05.png',
    images: ['image/bagel05.png', 'image/bagel05-1.png', 'image/bagel05-2.png'],
    description: '這是玫瑰洛神乳酪減醣貝果的詳細介紹。',
    fullDescription: `清香脆甜洛神花，，口感甜蜜雙重享受，使用台東紅寶石洛神花及南投清淨無毒新鮮玫瑰花，帶給你靜寧優雅的享受。`,
    introImage: 'image/bagel05-intro.png',
    storageImage: 'image/keep.png',
    nutrition: [
    { name: "熱量", perServing: "299.5 大卡" },
    { name: "蛋白質", perServing: "8.8 公克" },
    { name: "脂肪", perServing: "7.5 公克" },
    { name: "飽和脂肪", perServing: "4 公克" },
    { name: "反式脂肪", perServing: "0 公克" },
    { name: "碳水化合物", perServing: "49.3 公克" },
    { name: "糖", perServing: "5.9 公克" },
    { name: "膳食纖維", perServing: "3.4 公克" },
    { name: "鈉", perServing: "430 毫克" }
    ],
    reviews: [
      { name: "小雅", date: "2025-06-01", rating: 5, text: "玫瑰香氣超療癒，搭乳酪意外的搭！" },
      { name: "Nick", date: "2025-06-02", rating: 4, text: "口感軟綿，有點酸甜味我很喜歡。" },
      { name: "Jessica", date: "2025-06-03", rating: 5, text: "洛神花的酸香太迷人了，少女心大爆發💓" },
      { name: "Ben", date: "2025-06-04", rating: 5, text: "減糖但不減風味，超值得！" },
      { name: "阿珍", date: "2025-06-05", rating: 5, text: "洛神和乳酪居然這麼搭，百吃不膩！" }
    ]
  },
  {
    id: 106,
    name: '奶油香蒜減醣貝果',
    price: 75,
    image: 'image/bagel06.png',
    images: ['image/bagel06.png', 'image/bagel06-1.png', 'image/bagel06-2.png'],
    description: '這是奶油香蒜減醣貝果的詳細介紹。',
    fullDescription: `精選義式巴西里搭配新鮮香蒜，製成風味濃郁的醬料，包覆於貝果之中。每一口都散發迷人蒜香，香氣四溢，層次豐富，令人一吃驚豔、回味無窮。`,
    introImage: 'image/bagel06-intro.png',
    storageImage: 'image/keep.png',
    nutrition: [
    { name: "熱量", perServing: "358.8 大卡" },
    { name: "蛋白質", perServing: "8.4 公克" },
    { name: "脂肪", perServing: "15.2 公克" },
    { name: "飽和脂肪", perServing: "8.4 公克" },
    { name: "反式脂肪", perServing: "0.4 公克" },
    { name: "碳水化合物", perServing: "47.2 公克" },
    { name: "糖", perServing: "1.1 公克" },
    { name: "膳食纖維", perServing: "3.2 公克" },
    { name: "鈉", perServing: "452 毫克" }
    ],
    reviews: [
      { name: "小芳", date: "2025-05-10", rating: 5, text: "一打開包裝香氣撲鼻！蒜味濃郁又不嗆，超級愛❤️" },
      { name: "志豪", date: "2025-05-11", rating: 4, text: "蒜香迷人，咀嚼起來有嚼勁，烤過之後更讚～" },
      { name: "Annie", date: "2025-05-12", rating: 5, text: "搭配濃湯真的完美，吃一個就超滿足！" },
      { name: "Kevin", date: "2025-05-13", rating: 4, text: "香蒜味剛好，低醣又好吃，會再回購！" },
      { name: "Yaya", date: "2025-05-14", rating: 5, text: "超喜歡這款！烤一烤香氣超級誘人～" },
      { name: "阿昇", date: "2025-05-14", rating: 4, text: "口感紮實，蒜香很自然，完全不像是減醣產品！" },
      { name: "Emily", date: "2025-05-15", rating: 5, text: "一口接一口停不下來，蒜味控的天堂！" }
    ]
  },
  {
    id: 107,
    name: '抹茶紅豆乳酪減醣貝果',
    price: 85,
    image: 'image/bagel07.png',
    images: ['image/bagel07.png', 'image/bagel07-1.png', 'image/bagel07-2.png'],
    description: '這是抹茶紅豆乳酪減醣貝果的詳細介紹。',
    fullDescription: `融合日本愛知縣西尾抹茶的清新茶韻與屏東萬丹紅豆的細緻香甜，打造出層次豐富的雙重風味貝果。外皮酥香、內餡綿密，口口都是舌尖的優雅旅程。`,
    introImage: 'image/bagel07-intro.png',
    storageImage: 'image/keep.png',
    nutrition: [
    { name: "熱量", perServing: "344.2 大卡" },
    { name: "蛋白質", perServing: "13.5 公克" },
    { name: "脂肪", perServing: "7.8 公克" },
    { name: "飽和脂肪", perServing: "5.6 公克" },
    { name: "反式脂肪", perServing: "0 公克" },
    { name: "碳水化合物", perServing: "54.6 公克" },
    { name: "糖", perServing: "6.8 公克" },
    { name: "膳食纖維", perServing: "2.9 公克" },
    { name: "鈉", perServing: "527 毫克" }
    ],
    reviews: [
      { name: "小雅", date: "2025-06-10", rating: 5, text: "抹茶味很道地，紅豆香甜不膩，高雅又療癒！" },
      { name: "Leo", date: "2025-06-11", rating: 4, text: "茶香明顯，但紅豆甜度對我來說剛好。" },
      { name: "Winnie", date: "2025-06-11", rating: 5, text: "嘴巴充滿日式風味，一吃就愛上！" },
      { name: "阿宏", date: "2025-06-12", rating: 4, text: "冷藏回烤後口感更好，香氣也釋放得更足。" },
      { name: "Emily", date: "2025-06-12", rating: 5, text: "紅豆粒粒分明，抹茶香回甘超療癒！" },
      { name: "俊宇", date: "2025-06-13", rating: 5, text: "完美結合傳統與創新，會回購！" },
      { name: "小芸", date: "2025-06-13", rating: 4, text: "貝果偏紮實，口感有嚼勁，不錯。" },
      { name: "Nina", date: "2025-06-14", rating: 5, text: "一吃上癮，忍不住連吃了兩個！" },
      { name: "阿婷", date: "2025-06-14", rating: 4, text: "甜度OK，適合當早餐一起享用紅茶。" },
      { name: "小龍", date: "2025-06-15", rating: 5, text: "抹茶控的天堂！香氣濃郁，口感超舒適。" },
      { name: "Grace", date: "2025-06-15", rating: 4, text: "整體很棒，但希望可以更多紅豆。" },
      { name: "Vincent", date: "2025-06-16", rating: 5, text: "精緻味道與健康理念兼具，非常推薦！" },
      { name: "阿凱", date: "2025-06-16", rating: 5, text: "超療癒！拿來做下午茶剛好。" },
      { name: "Jessie", date: "2025-06-17", rating: 4, text: "口感濕潤不乾，有回購意願。" },
      { name: "Sam", date: "2025-06-17", rating: 5, text: "質感和味道都很符合期待！" },
      { name: "Lulu", date: "2025-06-18", rating: 5, text: "送朋友也很有質感，大家都說好吃！" },
      { name: "阿良", date: "2025-06-18", rating: 4, text: "若能加入芝麻就更完美了 XD" },
      { name: "Ivy", date: "2025-06-19", rating: 5, text: "家人一致好評，茶香醇厚又不會甜膩。" },
      { name: "Eric", date: "2025-06-19", rating: 4, text: "整體好吃，但紅豆口感稍微硬些。" },
      { name: "Mia", date: "2025-06-20", rating: 5, text: "這是目前吃過最棒的抹茶紅豆貝果！" }
    ]
  },
  {
    id: 108,
    name: '紫心地瓜減醣貝果',
    price: 85,
    image: 'image/bagel08.jpg',
    images: ['image/bagel08.jpg', 'image/bagel08-1.png', 'image/bagel08-2.png'],
    description: '這是紫心地瓜減醣貝果的詳細介紹。',
    fullDescription: `嚴選新北健康三寶「台農66號紅心地瓜」，無添加色素與香料，紫心甘薯自然上色、紅地瓜丁綿密香甜。富含纖維，香濃飽足，全素可食。每一口都是天然的地瓜香，東方乳酸菌級的美味享受！`,
    introImage: 'image/bagel08-intro.png',
    storageImage: 'image/keep.png',
    nutrition: [
    { name: "熱量", perServing: "235 大卡" },
    { name: "蛋白質", perServing: "6.5 公克" },
    { name: "脂肪", perServing: "2.6 公克" },
    { name: "飽和脂肪", perServing: "0.4 公克" },
    { name: "反式脂肪", perServing: "0 公克" },
    { name: "碳水化合物", perServing: "46.2 公克" },
    { name: "糖", perServing: "8.5 公克" },
    { name: "膳食纖維", perServing: "2.6 公克" },
    { name: "鈉", perServing: "343 毫克" }
    ],
    reviews: [
      { name: "小惠", date: "2025-06-06", rating: 5, text: "地瓜丁超多，吃起來很綿密，不用抹醬就很好吃！" },
      { name: "阿哲", date: "2025-06-06", rating: 4, text: "天然地瓜香，不會太甜，口感很棒～" },
      { name: "Winnie", date: "2025-06-05", rating: 5, text: "吃得出真材實料，當早餐超飽足！" },
      { name: "Tina", date: "2025-06-05", rating: 5, text: "完全是地瓜控的天堂，還是全素的超加分💚" },
      { name: "Ben", date: "2025-06-04", rating: 4, text: "比想像中扎實，建議烤過更好吃～" }
    ]
  },
  {
    id: 109,
    name: '蜜香無花果乳酪減醣貝果',
    price: 90,
    image: 'image/bagel09.jpg',
    images: ['image/bagel09.jpg', 'image/bagel09-1.png', 'image/bagel09-2.png'],
    description: '這是蜜香無花果乳酪減醣貝果的詳細介紹。',
    fullDescription: `嚴選土耳其有機無花果、英國唐寧茶與凱薩格蘭地奶油乳酪，結合濃郁奶香與果香風味。內餡綿密滑順、甜而不膩，讓每一口都散發高雅英式氣息，精緻感滿分！`,
    introImage: 'image/bagel09-intro.png',
    storageImage: 'image/keep.png',
    nutrition: [
    { name: "熱量", perServing: "333.7 大卡" },
    { name: "蛋白質", perServing: "9.3 公克" },
    { name: "脂肪", perServing: "8.7 公克" },
    { name: "飽和脂肪", perServing: "4.5 公克" },
    { name: "反式脂肪", perServing: "0 公克" },
    { name: "碳水化合物", perServing: "54.5 公克" },
    { name: "糖", perServing: "5.3 公克" },
    { name: "膳食纖維", perServing: "3.6 公克" },
    { name: "鈉", perServing: "464 毫克" }
    ],
    reviews: [
      { name: "小語", date: "2025-06-10", rating: 5, text: "無花果甜度剛好，搭配乳酪滑順不膩，入口有種英式下午茶的奢華感！" },
      { name: "阿文", date: "2025-06-11", rating: 4, text: "乳酪香濃但不膩口，無花果果粒很有口感，是很用心的組合！" },
      { name: "Jessie", date: "2025-06-12", rating: 5, text: "第一次吃到減醣貝果還能這麼享受，滑順又甜蜜，完全不輸進口款～" },
      { name: "Leo", date: "2025-06-12", rating: 4, text: "香氣十足，但覺得無花果可以再多一些，下次會回購！" },
      { name: "Emily", date: "2025-06-13", rating: 5, text: "質感高雅，適合作為送禮或早午餐，朋友都說很好吃！" },
      { name: "阿昇", date: "2025-06-13", rating: 4, text: "貝果本身略有嚼勁，搭配滑順餡料非常融洽。" },
      { name: "小芸", date: "2025-06-14", rating: 5, text: "土耳其無花果真的有差，果香豐富、天然不甜膩，超推薦！" },
      { name: "Kevin", date: "2025-06-14", rating: 5, text: "冷藏回烤後香味全開，乳酪香 + 果香超幸福。" },
      { name: "Nina", date: "2025-06-15", rating: 4, text: "口感細緻，但對我而言甜度略高，給 4 顆星 😊" },
      { name: "Sam", date: "2025-06-15", rating: 5, text: "包裝精美，自己吃或送禮都很有質感，一吃就愛上！" },
      { name: "Grace", date: "2025-06-16", rating: 5, text: "吃完不油膩、完全不覺得是在減醣，真的讓人驚喜的好味道！" }
    ]
  },
  {
    id: 110,
    name: '海鹽焦糖乳酪減醣貝果',
    price: 90,
    image: 'image/bagel10.jpg',
    images: ['image/bagel10.jpg', 'image/bagel10-1.png', 'image/bagel10-2.png'],
    description: '這是海鹽焦糖乳酪減醣貝果的詳細介紹。',
    fullDescription: `焦糖奶香霸氣登場，卻柔順不膩，甜度恰到好處，入口即化的幸福感，每一口都帶來爆棚的滿足感與法式優雅！`,
    introImage: 'image/bagel10-intro.png',
    storageImage: 'image/keep.png',
    nutrition: [
    { name: "熱量", perServing: "334.2 大卡" },
    { name: "蛋白質", perServing: "8.8 公克" },
    { name: "脂肪", perServing: "10.8 公克" },
    { name: "飽和脂肪", perServing: "5.5 公克" },
    { name: "反式脂肪", perServing: "0 公克" },
    { name: "碳水化合物", perServing: "50.5 公克" },
    { name: "糖", perServing: "3.3 公克" },
    { name: "膳食纖維", perServing: "3.4 公克" },
    { name: "鈉", perServing: "614 毫克" }
    ],
    reviews: [
      { name: "心怡", date: "2025-06-20", rating: 5, text: "焦糖香氣濃厚卻不甜膩，搭配乳酪完美平衡，好吃到停不下來！" },
      { name: "阿光", date: "2025-06-21", rating: 4, text: "質感十足的貝果，焦糖與乳酪的搭配很新穎，下次還想再買。" },
      { name: "Cindy", date: "2025-06-22", rating: 5, text: "法式風味旗艦款，幸福感爆棚，送人自用兩相宜！" },
      { name: "Leo", date: "2025-06-22", rating: 4, text: "甜度恰好但覺得餅皮稍硬，回烤後完美！" },
      { name: "小蓉", date: "2025-06-23", rating: 5, text: "優雅又濃郁的組合，一吃就愛上，下午茶的幸福滋味。" },
      { name: "阿翔", date: "2025-06-23", rating: 5, text: "焦糖乳酪的處理太細膩，會推薦給高要求的貝果控！" },
      { name: "Mia", date: "2025-06-24", rating: 4, text: "包裝好看，口味一流，整體而言十分滿意～" },
      { name: "Jason", date: "2025-06-24", rating: 5, text: "質感穩定，味道層次豐富，焦糖與乳酪根本天作之合！" }
    ]
  },
  {
    id: 111,
    name: '繽紛草莓甜甜圈',
    price: 55,
    image: 'image/donut01.png',
    images: ['image/donut01.png'],
    description: '這是繽紛草莓甜甜圈的詳細介紹。',
    fullDescription: `以香氣襲人的百香果糖霜為基底，加上迷你棉花糖與脆口彩米，一口咬下驚喜綻放，就像參加一場夏日的歡樂派對，同時滿足視覺和味覺雙重享受！絕對是收服大小朋友味蕾的超人氣甜甜圈。`,
    storageImage: 'image/keep01.jpg',
    nutrition: [
    { name: "熱量", perServing: "337.6 大卡" },
    { name: "蛋白質", perServing: "2.6 公克" },
    { name: "脂肪", perServing: "22.8 公克" },
    { name: "碳水化合物", perServing: "30.6 公克" },
    { name: "鈉", perServing: "83.9 毫克" }
    ],
    reviews: [
      { name: "小安", date: "2025-06-01", rating: 5, text: "草莓味超香甜！粉嫩外型超適合拍照📸" },
      { name: "Emily", date: "2025-06-02", rating: 4, text: "甜度剛好，草莓控絕對會喜歡～" },
      { name: "阿姨", date: "2025-06-02", rating: 5, text: "孫子一口氣吃了兩個，說比便利商店的還好吃！" },
      { name: "Nina", date: "2025-06-03", rating: 5, text: "色香味俱全，少女心直接大噴發❤️" },
      { name: "Leo", date: "2025-06-04", rating: 4, text: "甜中帶酸不膩口，搭咖啡剛剛好～" },
      { name: "Yuki", date: "2025-06-04", rating: 5, text: "很有質感的草莓香氣，不是人工味，超加分！" },
      { name: "阿吉", date: "2025-06-05", rating: 4, text: "微甜口感適中，吃完不口渴👍" },
      { name: "Jessie", date: "2025-06-06", rating: 5, text: "配茶吃太療癒，打開包裝就心情好～" },
      { name: "小熊", date: "2025-06-06", rating: 5, text: "草莓醬不會太多但味道超濃，好吃不甜膩！" },
      { name: "阿豪", date: "2025-06-07", rating: 5, text: "味道超級天然，連男生都覺得好吃👏" }
    ]
  },
  {
    id: 112,
    name: '檸檬甜星',
    price: 60,
    image: 'image/donut02.png',
    images: ['image/donut02.png'],
    description: '這是的檸檬甜星詳細介紹。',
    fullDescription: `清香酸甜的檸檬糖霜疊加檸檬巧克力，一次品嚐多層次檸檬風味；再撒上繽紛星星糖片，如夏夜星空般閃耀，帶來滿滿的清涼感與好心情！`,
    introImage: 'image/donut-intro.png',
    storageImage: 'image/keep01.jpg',
    nutrition: [
    { name: "熱量", perServing: "230.4 大卡" },
    { name: "蛋白質", perServing: "3.1 公克" },
    { name: "脂肪", perServing: "12.3 公克" },
    { name: "碳水化合物", perServing: "26.8 公克" },
    { name: "糖", perServing: "11.4 公克" },
    { name: "鈉", perServing: "74.8 毫克" }
    ],
    reviews: [
      { name: "阿明", date: "2025-06-01", rating: 5, text: "檸檬香氣十足，一口咬下超清爽🍋" },
      { name: "Joyce", date: "2025-06-02", rating: 4, text: "甜度適中，酸酸甜甜很有層次！" },
      { name: "Kevin", date: "2025-06-02", rating: 5, text: "吃起來完全不膩口，很適合當下午茶～" },
      { name: "小文", date: "2025-06-03", rating: 4, text: "外皮微酥內軟，檸檬糖霜太加分了！" },
      { name: "Eva", date: "2025-06-03", rating: 5, text: "咬下去有種檸檬塔的錯覺，好吃又有創意！" },
      { name: "阿良", date: "2025-06-04", rating: 4, text: "吃完嘴巴留香，超有夏天的感覺" },
      { name: "Lulu", date: "2025-06-04", rating: 5, text: "超清爽甜甜圈！朋友也都說讚❤️" },
      { name: "Winnie", date: "2025-06-05", rating: 5, text: "減糖版本也不會影響風味，太強了！" },
      { name: "阿婷", date: "2025-06-05", rating: 4, text: "酸酸甜甜超開胃，會回購！" },
      { name: "Max", date: "2025-06-06", rating: 5, text: "像檸檬蛋糕的味道，但更輕盈，太滿意了～" }
    ]
  },
  {
    id: 113,
    name: '杏仁白巧克力甜甜圈',
    price: 50,
    image: 'image/donut03.png',
    images: ['image/donut03.png'],
    description: '這是杏仁白巧克力甜甜圈的詳細介紹。',
    fullDescription: `白巧克力覆蓋著甜甜圈，撒滿香酥杏仁片，特殊美式口感，瞬間滿足欲望無窮味蕾！`,
    storageImage: 'image/keep01.jpg',
    nutrition: [
    { name: "熱量", perServing: "363.5 大卡" },
    { name: "蛋白質", perServing: "4.3 公克" },
    { name: "脂肪", perServing: "28.1 公克" },
    { name: "碳水化合物", perServing: "23.4 公克" },
    { name: "鈉", perServing: "98.8 毫克" }
    ],
    reviews: [
    { name: "小艾", date: "2025-06-01", rating: 5, text: "白巧克力超香，再搭杏仁脆片，好吃到停不下來！" },
    { name: "志豪", date: "2025-06-02", rating: 4, text: "甜而不膩，杏仁香氣帶點層次～" },
    { name: "Yuki", date: "2025-06-02", rating: 5, text: "口感鬆軟，白巧克力融化的感覺太棒了！" },
    { name: "阿明", date: "2025-06-03", rating: 5, text: "會回購！包裝精美，送禮也很有質感。" },
    { name: "小佳", date: "2025-06-03", rating: 4, text: "奶香濃郁，但甜度對我來說剛剛好。" },
    { name: "Leo", date: "2025-06-04", rating: 5, text: "杏仁脆片的口感和白巧克力太搭，超療癒！" },
    { name: "Mia", date: "2025-06-04", rating: 5, text: "吃一口就融化，少女心噴發💕" },
    { name: "阿芳", date: "2025-06-05", rating: 4, text: "甜甜的下午茶首選，好幸福～" },
    { name: "Jason", date: "2025-06-05", rating: 4, text: "不會太甜膩，杏仁味道剛剛好。" },
    { name: "Grace", date: "2025-06-06", rating: 5, text: "用料講究，甜甜圈質感立刻提升！" }
    ]
  },
  {
    id: 114,
    name: '抹茶甜甜圈',
    price: 45,
    image: 'image/donut04.png',
    images: ['image/donut04.png'],
    description: '這是抹茶甜甜圈的詳細介紹。',
    fullDescription: `獨特抹茶巧克力，造就少見絕妙滋味，嚐一口讓味覺披上清爽禪風！`,
    storageImage: 'image/keep01.jpg',
    nutrition: [
    { name: "熱量", perServing: "274 大卡" },
    { name: "蛋白質", perServing: "3.3 公克" },
    { name: "脂肪", perServing: "18.3 公克" },
    { name: "碳水化合物", perServing: "24.4 公克" },
    { name: "鈉", perServing: "127 毫克" }
    ],
    reviews: [
      { name: "小雅", date: "2025-06-01", rating: 5, text: "抹茶香氣濃郁又回甘，紅豆餡超加分！" },
      { name: "Eric", date: "2025-06-02", rating: 4, text: "抹茶偏苦，配紅豆很調和～" },
      { name: "Annie", date: "2025-06-02", rating: 5, text: "帶點日式風味，很高級！" },
      { name: "俊宇", date: "2025-06-03", rating: 5, text: "茶香明顯，卻不苦，柔和又細緻。" },
      { name: "Winnie", date: "2025-06-03", rating: 4, text: "冷了也好吃，口感扎實，有嚼勁。" },
      { name: "阿宏", date: "2025-06-04", rating: 5, text: "甜而不膩的抹茶控必吃款！" },
      { name: "小芳", date: "2025-06-04", rating: 4, text: "質感很細膩，比一般抹茶甜甜圈更棒～" },
      { name: "Tina", date: "2025-06-05", rating: 5, text: "每口都是滿滿抹茶滋味，超療癒！" },
      { name: "Ben", date: "2025-06-05", rating: 5, text: "紅豆甜度剛好，搭配抹茶好平衡～" },
      { name: "Jessie", date: "2025-06-06", rating: 4, text: "吃完一個不夠，忍不住想再買第二個！" }
    ]
  },
  {
    id: 115,
    name: '百香果派對',
    price: 60,
    image: 'image/donut05.jpg',
    images: ['image/donut05.jpg'],
    description: '這是的百香果派對詳細介紹。',
    fullDescription: `以香氣襲人的百香果糖霜為基底，加上迷你棉花糖與脆口彩米，一口咬下驚喜綻放，就像參加一場夏日的歡樂派對，同時滿足視覺和味覺雙重享受！絕對是收服大小朋友味蕾的超人氣甜甜圈。`,
    introImage: 'image/donut-intro.png',
    storageImage: 'image/keep01.jpg',
    nutrition: [
    { name: "熱量", perServing: "223.4 大卡" },
    { name: "蛋白質", perServing: "3.4 公克" },
    { name: "脂肪", perServing: "11.5 公克" },
    { name: "碳水化合物", perServing: "26.5 公克" },
    { name: "糖", perServing: "13.4 公克" },
    { name: "鈉", perServing: "95.8 毫克" }
    ],
    reviews: [
      { name: "小潔", date: "2025-06-01", rating: 5, text: "百香果香氣濃郁，酸酸甜甜好清爽！" },
      { name: "Darren", date: "2025-06-02", rating: 4, text: "跟一般甜甜圈完全不同，很有夏天感～" },
      { name: "Emily", date: "2025-06-02", rating: 5, text: "外脆內軟加上果香爆棚，完美✨" },
      { name: "阿豪", date: "2025-06-03", rating: 4, text: "酸度剛好，吃完完全不膩口" },
      { name: "Nina", date: "2025-06-03", rating: 5, text: "百香果控必吃！！每口都是果香❤️" },
      { name: "Winnie", date: "2025-06-04", rating: 5, text: "吃起來像在喝百香果冰沙！太讚了" },
      { name: "Jason", date: "2025-06-04", rating: 4, text: "不甜膩又有層次感，還會再買！" },
      { name: "阿婷", date: "2025-06-05", rating: 5, text: "果香＋酥脆感，超級療癒的一款" },
      { name: "Yuki", date: "2025-06-05", rating: 5, text: "減糖也這麼好吃，百香果味真實不假！" },
      { name: "Leo", date: "2025-06-06", rating: 4, text: "清爽又爽口，吃一整個也不膩" }
    ]
  },
  {
    id: 116,
    name: '可可餅乾甜甜圈',
    price: 55,
    image: 'image/donut06.jpg',
    images: ['image/donut06.jpg'],
    description: '這是可可餅乾甜甜圈的詳細介紹。',
    fullDescription: `香濃白巧克力覆蓋著甜甜圈，撒滿酥脆巧克力餅乾碎片，歡樂雙重口感令人欲罷不能！`,
    storageImage: 'image/keep01.jpg',
    nutrition: [
    { name: "熱量", perServing: "307 大卡" },
    { name: "蛋白質", perServing: "3.7 公克" },
    { name: "脂肪", perServing: "21 公克" },
    { name: "碳水化合物", perServing: "27 公克" },
    { name: "鈉", perServing: "156 毫克" }
    ],
    reviews: [
      { name: "小雅", date: "2025-06-10", rating: 5, text: "可可味道濃厚又不苦，加上餅乾碎超有層次！" },
      { name: "阿豪", date: "2025-06-11", rating: 4, text: "餅乾口感脆脆，巧妙中和甜度。" },
      { name: "Cindy", date: "2025-06-11", rating: 5, text: "每一口都像在吃巧克力棒，超療癒！" },
      { name: "志明", date: "2025-06-12", rating: 4, text: "甜而不膩，適合下午茶搭配黑咖啡。" },
      { name: "Yuki", date: "2025-06-13", rating: 5, text: "小朋友超愛，簡直成為家庭最愛！" },
      { name: "阿芳", date: "2025-06-13", rating: 5, text: "外酥內軟，餅乾香氣層層爆發～" },
      { name: "Kevin", date: "2025-06-14", rating: 4, text: "可可甜度剛好，不會過於甜膩。" },
      { name: "Emma", date: "2025-06-14", rating: 5, text: "辦公室熱銷款，大家一致好評！" },
      { name: "Jason", date: "2025-06-15", rating: 4, text: "配冰奶茶剛剛好，完美組合。" },
      { name: "Grace", date: "2025-06-15", rating: 5, text: "餅乾碎讓口感更豐富，好吃到不想分享！" }
    ]
  },
  {
    id: 117,
    name: '巧克力夾心甜甜圈',
    price: 50,
    image: 'image/donut07.jpg',
    images: ['image/donut07.jpg'],
    description: '這是巧克力夾心甜甜圈的詳細介紹。',
    fullDescription: `巧克力控絕不能錯過的命定款！甜甜圈中灌入濃郁巧克力，一口咬下享受奢侈的雙重巧克力滋味！`,
    storageImage: 'image/keep01.jpg',
    nutrition: [
    { name: "熱量", perServing: "273.1 大卡" },
    { name: "蛋白質", perServing: "3.8 公克" },
    { name: "脂肪", perServing: "15.5 公克" },
    { name: "碳水化合物", perServing: "29.6 公克" },
    { name: "鈉", perServing: "94 毫克" }
    ],
    reviews: [
      { name: "小美", date: "2025-06-10", rating: 5, text: "夾心濃郁巧克力爆漿，一咬就幸福！" },
      { name: "阿強", date: "2025-06-11", rating: 4, text: "甜度稍高，不過巧克力控會愛。" },
      { name: "Leo", date: "2025-06-12", rating: 5, text: "濃香不膩，孩子們都說想再買！" },
      { name: "Winnie", date: "2025-06-12", rating: 5, text: "質感十足，夾心超厚實～" },
      { name: "Emily", date: "2025-06-13", rating: 4, text: "甜甜甜，但搭配黑咖啡剛剛好。" },
      { name: "小哈", date: "2025-06-13", rating: 5, text: "一口咬下滿滿巧克力，超療癒！" },
      { name: "Max", date: "2025-06-14", rating: 4, text: "外皮酥香，裡面軟嫩又濕潤。" },
      { name: "Sandy", date: "2025-06-14", rating: 5, text: "超適合下午茶，是我的心頭好！" },
    ]
  },
  {
    id: 118,
    name: '花生糖霜甜甜圈',
    price: 50,
    image: 'image/donut08.jpg',
    images: ['image/donut08.jpg'],
    description: '這是花生糖霜甜甜圈的詳細介紹。',
    fullDescription: `香濃花生醬和特製糖霜厚厚覆蓋在甜甜圈表層，飾以黑巧克力線條，絕配滋味令花生迷愛不釋口！`,
    storageImage: 'image/keep01.jpg',
    nutrition: [
    { name: "熱量", perServing: "335 大卡" },
    { name: "蛋白質", perServing: "5.37 公克" },
    { name: "脂肪", perServing: "20.1 公克" },
    { name: "碳水化合物", perServing: "33.1 公克" },
    { name: "鈉", perServing: "175 毫克" }
    ],
    reviews: [
      { name: "阿成", date: "2025-06-10", rating: 5, text: "花生香超濃，糖霜不會太甜，吃了會想念！" },
      { name: "小宜", date: "2025-06-11", rating: 4, text: "濃濃台式風味，回憶童年味道。" },
      { name: "Winnie", date: "2025-06-14", rating: 4, text: "質感甜甜圈，推薦微烤後更好吃！" },
      { name: "Grace", date: "2025-06-14", rating: 5, text: "鹹甜平衡得剛好，讓人一口接一口！" },
      { name: "Jason", date: "2025-06-15", rating: 4, text: "香氣自然，整體不錯。" },
      { name: "Ivy", date: "2025-06-15", rating: 5, text: "辦公室下午茶首選，超級推～" }
    ]
  },
  {
    id: 119,
    name: '草莓糖霜甜甜圈',
    price: 50,
    image: 'image/donut09.jpg',
    images: ['image/donut09.jpg'],
    description: '這是花生糖霜甜甜圈的詳細介紹。',
    fullDescription: `甜美草莓巧克力披覆於原味糖霜甜甜圈，佐以珍珠糖點綴於外層，多層次口感讓幸福融化口中！`,
    storageImage: 'image/keep01.jpg',
    nutrition: [
    { name: "熱量", perServing: "272 大卡" },
    { name: "蛋白質", perServing: "3.12 公克" },
    { name: "脂肪", perServing: "15 公克" },
    { name: "碳水化合物", perServing: "31.2 公克" },
    { name: "鈉", perServing: "120 毫克" }
    ],
    reviews: [
      { name: "小美", date: "2025-06-10", rating: 5, text: "粉嫩可愛又香甜，少女心大爆發！" },
      { name: "阿豪", date: "2025-06-11", rating: 4, text: "外表美，內餡也紮實，喜歡草莓味！" },
      { name: "Kelly", date: "2025-06-12", rating: 5, text: "酸甜草莓糖霜搭配甜甜圈剛剛好～" },
      { name: "Leo", date: "2025-06-12", rating: 4, text: "糖霜甜但不膩，小朋友也很愛。" },
      { name: "Winnie", date: "2025-06-13", rating: 5, text: "超適合拍照打卡，味道也不馬虎！" },
      { name: "阿婷", date: "2025-06-13", rating: 4, text: "冷藏吃起來很清爽，草莓香很自然。" },
      { name: "Emily", date: "2025-06-14", rating: 5, text: "送禮自用兩相宜！顏值與實力兼具！" },
      { name: "Sam", date: "2025-06-14", rating: 5, text: "粉紅色外表＋自然草莓香氣，超讚！" },
      { name: "小傑", date: "2025-06-15", rating: 4, text: "偏甜但很順口，搭茶剛剛好。" },
      { name: "Lulu", date: "2025-06-15", rating: 5, text: "少女夢幻款，每次吃心情都好！" }
    ]
  },
  {
    id: 120,
    name: '葡萄香檳浪花',
    price: 60,
    image: 'image/donut10.jpg',
    images: ['image/donut10.jpg'],
    description: '這是的葡萄香檳浪花詳細介紹。',
    fullDescription: `濃郁葡萄巧克力搭配微酸香檳糖霜，完美融合成豐盈不膩口的夢幻滋味。點綴些許跳跳糖，宛如細緻浪花在舌尖悄然跳躍，帶來如同夏日海邊戲水般的清新愉悅與甜蜜驚喜！`,
    introImage: 'image/donut-intro.png',
    storageImage: 'image/keep01.jpg',
    nutrition: [
    { name: "熱量", perServing: "275.9 大卡" },
    { name: "蛋白質", perServing: "3.2 公克" },
    { name: "脂肪", perServing: "16.5 公克" },
    { name: "碳水化合物", perServing: "28.5 公克" },
    { name: "糖", perServing: "14 公克" },
    { name: "鈉", perServing: "91.4 毫克" }
    ],
    reviews: [
      { name: "小美", date: "2025-06-01", rating: 5, text: "葡萄香氣很自然，還有淡淡的香檳氣泡感，好夢幻！" },
      { name: "Eric", date: "2025-06-02", rating: 4, text: "味道不會太甜，吃起來很優雅～" },
      { name: "Annie", date: "2025-06-02", rating: 5, text: "葡萄果醬味超濃郁，搭配甜甜圈口感太棒了！" },
      { name: "俊宇", date: "2025-06-03", rating: 5, text: "有種微微氣泡感的清爽感，超特別！" },
      { name: "Winnie", date: "2025-06-03", rating: 4, text: "吃起來像在下午茶派對，香氣很舒服" },
      { name: "阿良", date: "2025-06-04", rating: 5, text: "有點像葡萄汽水但不甜膩，好喜歡～" },
      { name: "Kelly", date: "2025-06-04", rating: 5, text: "質感很高的一款甜甜圈！送禮超有面子" },
      { name: "阿芳", date: "2025-06-05", rating: 4, text: "香氣自然，味道清新，吃完不會膩" },
      { name: "Leo", date: "2025-06-05", rating: 5, text: "吃完有種優雅放鬆的感覺，好療癒～" },
      { name: "Jessica", date: "2025-06-06", rating: 5, text: "香檳＋葡萄太有創意，馬上回購！" }
    ]
  },
  {
    id: 121,
    name: '原味糖霜甜甜圈6入',
    price: 220,
    image: 'image/gift01.png',
    images: ['image/gift01.png'],
    description: '這是的葡萄香檳浪花詳細介紹。',
    fullDescription: `最受歡迎的經典滋味！趁熱嚐一口，體驗薄脆糖霜隨著香軟甜甜圈在唇齒間化開的難忘感動！`,
    storageImage: 'image/keep01.jpg',
    nutrition: [
    { name: "熱量", perServing: "244 大卡" },
    { name: "蛋白質", perServing: "2.8 公克" },
    { name: "脂肪", perServing: "15 公克" },
    { name: "碳水化合物", perServing: "24 公克" },
    { name: "鈉", perServing: "112 毫克" }
    ],
    reviews: [
      { name: "小芸", date: "2025-06-01", rating: 5, text: "糖霜香甜不膩，外酥內軟，每次吃都超滿足！" },
      { name: "Ben", date: "2025-06-02", rating: 5, text: "微波10秒後超好吃，像剛出爐一樣香軟～" },
      { name: "Tina", date: "2025-06-03", rating: 4, text: "甜度剛好，配拿鐵超對味，下午茶首選。" },
      { name: "阿智", date: "2025-06-04", rating: 5, text: "糖霜有淡淡的香草味，搭配鬆軟口感很療癒～" },
      { name: "Cathy", date: "2025-06-04", rating: 4, text: "吃起來不會膩，整體非常經典又有質感。" },
      { name: "大雄", date: "2025-06-05", rating: 5, text: "每次回購都穩穩表現，冷凍保存也方便。" },
      { name: "小柔", date: "2025-06-05", rating: 5, text: "小孩也超愛，甜而不膩是家裡常備甜點❤️" },
      { name: "Ivy", date: "2025-06-06", rating: 5, text: "回烤後外脆內軟超驚艷，會一直回購！" }
    ]
  },
  {
    id: 122,
    name: '綜合甜甜圈6入',
    price: 260,
    image: 'image/gift02.png',
    images: ['image/gift02.png'],
    description: '這是綜合甜甜圈6入的詳細介紹。',
    fullDescription: `不論是原味糖霜的經典、香檳葡萄的創新，還是香濃可可、抹茶、檸檬糖霜與季節限定口味，這一盒都幫你一次打包！(口味為隨機)`,
    storageImage: 'image/keep01.jpg',
    nutrition: [
    { name: "熱量", perServing: " ??? 大卡" },
    { name: "蛋白質", perServing: "??? 公克" },
    { name: "脂肪", perServing: "??? 公克" },
    { name: "碳水化合物", perServing: "??? 公克" },
    { name: "鈉", perServing: "??? 毫克" }
    ],
    reviews: [
      { name: "Maggie", date: "2025-06-01", rating: 5, text: "一次能吃到6種口味超開心！每種都好吃又有驚喜感～" },
      { name: "Chris", date: "2025-06-02", rating: 4, text: "很適合當下午茶或與朋友分享，一盒解決選擇困難症。" },
      { name: "小凱", date: "2025-06-03", rating: 5, text: "CP值超高，一次滿足所有口味慾望，太超值了！" },
      { name: "Yuki", date: "2025-06-04", rating: 5, text: "多口味不重複，每次都像在開盲盒，好吃又好玩～" },
      { name: "Ray", date: "2025-06-04", rating: 5, text: "每個甜甜圈都品質很穩，沒有雷，非常推薦入門款！" },
      { name: "Amber", date: "2025-06-05", rating: 4, text: "送禮也很有面子，看起來繽紛又高級。" },
      { name: "小青", date: "2025-06-06", rating: 5, text: "吃不膩又多變，冷凍後加熱依然超好吃～" },
      { name: "Wesley", date: "2025-06-06", rating: 5, text: "喜歡多種口味的我超愛這盒，甜而不膩剛剛好！" }
    ]
  },
  {
    id: 123,
    name: '原味糖霜甜甜圈12入',
    price: 220,
    image: 'image/gift03.png',
    images: ['image/gift03.png'],
    description: '這是的葡萄香檳浪花詳細介紹。',
    fullDescription: `最受歡迎的經典滋味！趁熱嚐一口，體驗薄脆糖霜隨著香軟甜甜圈在唇齒間化開的難忘感動！`,
    storageImage: 'image/keep01.jpg',
    nutrition: [
    { name: "熱量", perServing: "244 大卡" },
    { name: "蛋白質", perServing: "2.8 公克" },
    { name: "脂肪", perServing: "15 公克" },
    { name: "碳水化合物", perServing: "24 公克" },
    { name: "鈉", perServing: "112 毫克" }
    ],
    reviews: [
      { name: "小芸", date: "2025-06-01", rating: 5, text: "糖霜香甜不膩，外酥內軟，每次吃都超滿足！" },
      { name: "Ben", date: "2025-06-02", rating: 5, text: "微波10秒後超好吃，像剛出爐一樣香軟～" },
      { name: "Tina", date: "2025-06-03", rating: 4, text: "甜度剛好，配拿鐵超對味，下午茶首選。" },
      { name: "阿智", date: "2025-06-04", rating: 5, text: "糖霜有淡淡的香草味，搭配鬆軟口感很療癒～" },
      { name: "Cathy", date: "2025-06-04", rating: 4, text: "吃起來不會膩，整體非常經典又有質感。" },
      { name: "大雄", date: "2025-06-05", rating: 5, text: "每次回購都穩穩表現，冷凍保存也方便。" },
      { name: "小柔", date: "2025-06-05", rating: 5, text: "小孩也超愛，甜而不膩是家裡常備甜點❤️" },
      { name: "Ivy", date: "2025-06-06", rating: 5, text: "回烤後外脆內軟超驚艷，會一直回購！" }
    ]
  },
  {
    id: 124,
    name: '綜合甜甜圈12入',
    price: 460,
    image: 'image/gift04.png',
    images: ['image/gift04.png'],
    description: '這是綜合甜甜圈6入的詳細介紹。',
    fullDescription: `不論是原味糖霜的經典、香檳葡萄的創新，還是香濃可可、抹茶、檸檬糖霜與季節限定口味，這一盒都幫你一次打包！(口味為隨機)`,
    storageImage: 'image/keep01.jpg',
    nutrition: [
    { name: "熱量", perServing: " ??? 大卡" },
    { name: "蛋白質", perServing: "??? 公克" },
    { name: "脂肪", perServing: "??? 公克" },
    { name: "碳水化合物", perServing: "??? 公克" },
    { name: "鈉", perServing: "??? 毫克" }
    ],
    reviews: [
      { name: "Tina", date: "2025-06-07", rating: 5, text: "每種口味都超讚，完全沒有踩雷，已經二刷！" },
      { name: "Ben", date: "2025-06-08", rating: 4, text: "口味變化多，吃起來有驚喜感，值得推薦～" },
      { name: "Sophia", date: "2025-06-08", rating: 5, text: "甜而不膩，每顆都像精品甜點，超有質感。" },
      { name: "小哲", date: "2025-06-09", rating: 5, text: "買這盒真的很划算，一次滿足全家人不同口味！" },
      { name: "Irene", date: "2025-06-09", rating: 5, text: "顏值+口感都超高，當伴手禮也好有誠意！" },
      { name: "Victor", date: "2025-06-09", rating: 4, text: "平日配咖啡超對味，吃完立刻想再訂一盒～" },
      { name: "Judy", date: "2025-06-09", rating: 5, text: "微波後外酥內軟，香味爆棚，好吃到不想分人！" },
      { name: "小恩", date: "2025-06-09", rating: 5, text: "想吃什麼口味都有，簡直是甜點控的福音😍" },
      { name: "Jason", date: "2025-06-09", rating: 5, text: "口味組合搭得很棒，每個都有特色，不會單調。" },
      { name: "Eva", date: "2025-06-09", rating: 5, text: "質感包裝加上好吃甜甜圈，送人自用都超適合！" }
    ]
  },
  ];

  const recommendScroll = document.getElementById('recommend-scroll');

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  shuffleArray(recommendProducts); // ⭐ 將推薦產品順序隨機化
    
  // 建立 IntersectionObserver
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  // 只取前 10 個推薦產品
  recommendProducts.slice(0, 10).forEach(product => {
    const a = document.createElement('a');
    a.className = 'recommend-item';
    a.href = `${window.location.pathname}?id=${product.id}`;
    a.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <p class="name">${product.name}</p>
      <p class="price">$${product.price}</p>
    `;
    recommendScroll.appendChild(a);
    observer.observe(a);
  });

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  function loadProduct(product) {
  document.querySelector(".product-title").textContent = product.name;
  document.querySelector(".price").textContent = `價格：$${product.price} / 份`;
  document.querySelector(".product-description").textContent = product.fullDescription || product.description || "尚無產品描述";

  //產品評論
  const reviewsSection = document.querySelector(".review-list");
  reviewsSection.innerHTML = "";

  if (product.reviews && product.reviews.length) {
    product.reviews.forEach(r => {
      reviewsSection.innerHTML += `
        <div class="review">
          <div class="avatar">👤</div>
          <div class="content">
            <div class="name-date"><strong>${r.name}</strong> <span class="date">${r.date}</span></div>
            <div class="stars">${"⭐".repeat(r.rating)}</div>
            <div class="text">${r.text}</div>
          </div>
        </div>
      `;
    });
  } else {
    reviewsSection.innerHTML = "<p>尚無評論</p>";
  }
  // 計算統計
  const starStats = [0, 0, 0, 0, 0];
  let totalRating = 0;

  product.reviews?.forEach(r => {
    const rating = r.rating;
    starStats[rating - 1]++;
    totalRating += rating;
  });

  const reviewCount = product.reviews?.length || 0;
  const avgScore = reviewCount ? (totalRating / reviewCount).toFixed(1) : 0;

  // 更新 HTML
  document.querySelector(".review-count").textContent = reviewCount;
  document.querySelector(".score").textContent = `${avgScore} 分`;
  document.querySelector(".average-stars").textContent = "⭐".repeat(Math.round(avgScore));

  // 🟡 同步更新上方產品資訊區的星星與評價數
  document.querySelector(".top-stars").textContent = "⭐".repeat(Math.round(avgScore));
  document.querySelector(".top-score").textContent = avgScore;
  document.querySelector(".top-count").textContent = reviewCount;

  for (let i = 5; i >= 1; i--) {
    const percent = reviewCount ? Math.round((starStats[i - 1] / reviewCount) * 100) : 0;
    document.querySelector(`.bar-${i}`).style.width = `${percent}%`;
    document.querySelector(`.percent-${i}`).textContent = `${percent}%`;
  }


  const introContent = document.getElementById("intro");
  introContent.innerHTML = ""; // 清空原本內容
  let hasIntro = false;

  // ➕ 加入介紹圖片
  if (product.introImage) {
    const introImg = document.createElement("img");
    introImg.src = product.introImage;
    introImg.alt = `${product.name} 介紹圖`;
    introImg.style.width = "100%";
    introImg.style.maxWidth = "500px";
    introImg.style.borderRadius = "10px";
    introImg.style.display = "block";
    introImg.style.margin = "20px auto";
    introContent.appendChild(introImg);
    hasIntro = true;
  }

  if (product.storageImage) {
    const storageImg = document.createElement("img");
    storageImg.src = product.storageImage;
    storageImg.alt = "保存方式";
    storageImg.style.width = "100%";
    storageImg.style.maxWidth = "500px";
    storageImg.style.display = "block";
    storageImg.style.margin = "20px auto";
    storageImg.style.borderRadius = "10px";
    introContent.appendChild(storageImg);
    hasIntro = true;
  }


  // 🧪 沒有內容才顯示 fallback
  if (!hasIntro) {
    introContent.innerHTML = `<p>📦 目前尚無產品介紹內容。</p>`;
  }
  
  const mainImageBox = document.getElementById("mainImageScroll");
  mainImageBox.innerHTML = ""; // 清空
  const mainImage = document.createElement("img");
  mainImage.className = "main-slide";
  mainImageBox.appendChild(mainImage); // 放進主圖容器

  const thumbnailList = document.querySelector(".thumbnail-list");
  thumbnailList.innerHTML = "";

  (product.images || [product.image]).forEach((src, i) => {
    const thumb = document.createElement("img");
    thumb.src = src;
    thumb.alt = `縮圖${i + 1}`;
    thumb.className = "thumbnail" + (i === 0 ? " active" : "");

    // 第 0 張預設主圖
    if (i === 0) {
      mainImage.src = src;
    }

    thumb.addEventListener("click", () => {
      mainImage.src = src;

      thumbnailList.querySelectorAll("img").forEach(img => img.classList.remove("active"));
      thumb.classList.add("active");
    });

    thumbnailList.appendChild(thumb);
  });

  //加入最愛功能（建議放在 loadProduct 裡）
  const favBtn = document.querySelector(".favorite-btn");
  const productId = new URLSearchParams(window.location.search).get("id");

  if (favBtn && productId) {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]").map(String);

    // 預先標記
    if (favorites.includes(productId)) {
      favBtn.classList.add("active");
    }

    favBtn.addEventListener("click", () => {
      let updatedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]").map(String);

      if (favBtn.classList.toggle("active")) {
        // 加入
        if (!updatedFavorites.includes(productId)) {
          updatedFavorites.push(productId);
        }
      } else {
        // 移除
        updatedFavorites = updatedFavorites.filter(id => id !== productId);
      }

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    });
  }



  const nutritionTableBody = document.querySelector(".nutrition-table tbody");
    if (nutritionTableBody) {
      nutritionTableBody.innerHTML = "";
      if (product.nutrition?.length) {
        product.nutrition.forEach(row => {
          const tr = document.createElement("tr");
          tr.innerHTML = `<td>${row.name}</td><td>${row.per100g || row.perServing}</td>`;
          nutritionTableBody.appendChild(tr);
        });
      } else {
        nutritionTableBody.innerHTML = `<tr><td colspan="3">尚無營養資訊</td></tr>`;
      }
    }
  }

  if (productId) {
  const product = recommendProducts.find(p => p.id == productId);
    if (product) {
      loadProduct(product);  // 使用我們剛剛重構的函式
    } else {
      alert("找不到這個商品，將顯示預設內容");
    }
  }
  
});
