// =================== Arman's Interactive JS ===================

// Helper selector
const $ = (selector, ctx = document) => ctx.querySelector(selector);
const $$ = (selector, ctx = document) => [...ctx.querySelectorAll(selector)];

// =================== Dynamic Year ===================
document.addEventListener("DOMContentLoaded", () => {
  const footer = $("footer");
  if (footer) {
    const year = new Date().getFullYear();
    if (!footer.textContent.includes(year)) {
      footer.innerHTML += `<br>© ${year} Arman. All rights reserved.`;
    }
  }

  // Add fade-in animation class to sections
  $$("section").forEach((sec) => {
    sec.style.opacity = "0";
    sec.style.transform = "translateY(40px)";
    sec.style.transition = "all 0.8s ease-out";
  });
});

// =================== Scroll Animations ===================
const sections = $$("section");
const revealOnScroll = () => {
  sections.forEach((sec) => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      sec.style.opacity = "1";
      sec.style.transform = "translateY(0)";
    }
  });
};
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// =================== Form Validation ===================
const form = $("form");
if (form) {
  const nameField = $("#name");
  const emailField = $("#email");
  const msgField = $("#message");

  const showError = (el, msg) => {
    let err = el.nextElementSibling;
    if (!err || !err.classList.contains("error")) {
      err = document.createElement("div");
      err.className = "error";
      err.style.color = "#d32f2f";
      err.style.fontSize = "0.9rem";
      el.insertAdjacentElement("afterend", err);
    }
    err.textContent = msg;
    el.style.borderColor = "#d32f2f";
    el.style.boxShadow = "0 0 6px rgba(211,47,47,0.5)";
  };

  const clearError = (el) => {
    const err = el.nextElementSibling;
    if (err && err.classList.contains("error")) err.textContent = "";
    el.style.borderColor = "#39ff14";
    el.style.boxShadow = "0 0 6px rgba(57,255,20,0.5)";
  };

  const validateName = () => {
    if (!nameField.value.trim()) {
      showError(nameField, "Name is required");
      return false;
    }
    clearError(nameField);
    return true;
  };

  const validateEmail = () => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailField.value.trim() || !re.test(emailField.value)) {
      showError(emailField, "Enter a valid email");
      return false;
    }
    clearError(emailField);
    return true;
  };

  const validateMsg = () => {
    if (msgField.value.trim().length < 10) {
      showError(msgField, "Message must be at least 10 characters");
      return false;
    }
    clearError(msgField);
    return true;
  };

  [nameField, emailField, msgField].forEach((el) => {
    el?.addEventListener("input", () => {
      if (el === nameField) validateName();
      if (el === emailField) validateEmail();
      if (el === msgField) validateMsg();
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const valid =
      validateName() & validateEmail() & validateMsg();

    if (valid) {
      showToast("✅ Message sent successfully!");
      form.reset();
    } else {
      showToast("⚠️ Please fix the errors!");
    }
  });
}

// =================== Toast Notification ===================
function showToast(msg) {
  let toast = $("#toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.background = "#1a237e";
    toast.style.color = "#fff";
    toast.style.padding = "12px 18px";
    toast.style.borderRadius = "10px";
    toast.style.boxShadow = "0 4px 12px rgba(0,0,0,.2)";
    toast.style.fontFamily = "Poppins, sans-serif";
    toast.style.zIndex = "9999";
    toast.style.transition = "all 0.5s ease";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = "1";
  toast.style.transform = "translateX(-50%) scale(1)";
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) scale(0.9)";
  }, 2200);
}

// =================== Smooth Scroll for Anchor Links ===================
$$('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = $(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// =================== Mobile Menu (if header nav exists) ===================
const nav = $("nav");
if (nav) {
  const toggle = document.createElement("button");
  toggle.textContent = "☰";
  toggle.style.cssText =
    "background:#1a237e;color:#fff;border:none;font-size:1.5rem;padding:8px 12px;border-radius:8px;margin-top:8px;cursor:pointer;transition:transform 0.3s ease;";
  nav.insertAdjacentElement("beforebegin", toggle);

  toggle.addEventListener("mouseenter", () => {
    toggle.style.transform = "scale(1.1)";
  });
  toggle.addEventListener("mouseleave", () => {
    toggle.style.transform = "scale(1)";
  });

  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    if (nav.classList.contains("open")) {
      nav.style.display = "block";
      nav.style.animation = "fadeIn 0.5s ease";
    } else {
      nav.style.display = "none";
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 600) {
      nav.style.display = "block";
    } else if (!nav.classList.contains("open")) {
      nav.style.display = "none";
    }
  });
}

// =================== Extra Hover Animations ===================
document.addEventListener("DOMContentLoaded", () => {
  $$("a, button").forEach((el) => {
    el.style.transition = "all 0.3s ease";
    el.addEventListener("mouseenter", () => {
      el.style.transform = "scale(1.05)";
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "scale(1)";
    });
  });

  $$("img").forEach((img) => {
    img.style.transition = "transform 0.4s ease";
    img.addEventListener("mouseenter", () => {
      img.style.transform = "scale(1.08) rotate(1deg)";
    });
    img.addEventListener("mouseleave", () => {
      img.style.transform = "scale(1) rotate(0deg)";
    });
  });
});
