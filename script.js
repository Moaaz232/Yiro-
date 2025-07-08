// script.js

// زر الوضع الليلي
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

// تحميل الوضع الحالي من التخزين المحلي
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  themeIcon.textContent = "🌙";
}

// عند الضغط على زر التبديل
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  themeIcon.textContent = isDark ? "🌙" : "☀";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// تفعيل البرجر منيو
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
  burger.classList.toggle("open");
});

// تحميل المنتجات من ملف JSON
fetch("products.json")
  .then(res => res.json())
  .then(data => {
    const productList = document.getElementById("productList");
    data.forEach(product => {
      const box = document.createElement("div");
      box.className = "product";
      box.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <span>${product.price}</span>
      `;
      productList.appendChild(box);
    });
  })
  .catch(err => console.error("فشل تحميل المنتجات:", err));

// لودر البداية
window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.getElementById("loader");
    loader.classList.add("hidden");
  }, 1000); // ← مدة ظهور اللودر
});
document.getElementById("orderForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const product = document.getElementById("product").value;
  const notes = document.getElementById("notes").value;

  // رقم واتساب بتاعك (دولي بدون +)
  const yourNumber = "994404219034"; // ← عدله برقمك

  // بناء الرسالة
  const message = `👋 مرحبًا، طلب جديد:
Yiro store
 الاسم: ${name}
 رقم العميل: ${phone}
 المنتج: ${product}
 ملاحظات: ${notes}`;

  // تحويل الرسالة لرابط
  const whatsappURL = `https://wa.me/${yourNumber}?text=${encodeURIComponent(message)}`;

  // فتح رابط واتساب
  window.open(whatsappURL, "_blank");
});
// تشغيل فورم الطلب
document.getElementById("orderForm").addEventListener("submit", function (e) {
  e.preventDefault(); // يمنع تحديث الصفحة عند الإرسال

  const formData = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    product: document.getElementById("product").value,
    notes: document.getElementById("notes").value
  };

  fetch("https://script.google.com/macros/s/AKfycbzkPw9r9cWmZUaRLeQrCi_lbpq2bCn-5KYX-kgQ-Lyq26OnCUR5Og9G6BdxJT7lIKANZw/exec", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.text())
    .then(data => {
      alert("✅ تم إرسال الطلب بنجاح!");
      document.getElementById("orderForm").reset(); // تفريغ الفورم
    })
    .catch(err => {
      console.error("❌ حصل خطأ:", err);
      alert("❌ حصل خطأ أثناء الإرسال. حاول تاني.");
    });
});
