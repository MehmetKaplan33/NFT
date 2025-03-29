// DOM elementlerini seçelim
const menuBtn = document.querySelector('.header__bars');
const mobileMenu = document.querySelector('.mobile-menu');
const menuOverlay = document.querySelector('.menu-overlay');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu__navbar a');

// Menü durumunu takip etmek için değişken
let isMenuOpen = false;

// Menüyü aç/kapat fonksiyonu
function toggleMenu() {
  isMenuOpen = !isMenuOpen;
  
  mobileMenu.classList.toggle('active');
  menuOverlay.classList.toggle('active');
  
  // Menü açıkken body scroll'u engelle
  document.body.style.overflow = isMenuOpen ? 'hidden' : '';
}

// Event listeners
menuBtn.addEventListener('click', toggleMenu);
menuOverlay.addEventListener('click', toggleMenu);

// Menü linklerine tıklandığında menüyü kapat
mobileMenuLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (isMenuOpen) {
      toggleMenu();
    }
  });
});

// Ekran boyutu değiştiğinde menüyü kapat
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && isMenuOpen) { // md breakpoint
    toggleMenu();
  }
});


// Featured section Swiper initialization
document.addEventListener('DOMContentLoaded', function() {
  const swiper = new Swiper('.featuredSwiper', {
    // Enable loop mode
    loop: true,
    
    // Enable smooth transitions
    effect: 'slide',
    
    // Auto height configuration
    autoHeight: true,
    
    // Spacing between slides
    spaceBetween: 30,
    
    // Center active slide
    centeredSlides: true,
    
    // Auto play configuration
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
    // Pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    
    // Responsive breakpoints
    breakpoints: {
      // Mobile (320px and up)
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
        centeredSlides: true
      },
      // Tablet (768px and up)
      768: {
        slidesPerView: 2,
        spaceBetween: 25,
        centeredSlides: false
      },
      // Desktop (1024px and up)
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
        centeredSlides: false
      },
      // Large Desktop (1200px and up)
      1200: {
        slidesPerView: 4,
        spaceBetween: 35,
        centeredSlides: false
      }
    },
    
    // Enable grabbing cursor
    grabCursor: true,
    
    // Keyboard control
    keyboard: {
      enabled: true,
      onlyInViewport: true
    },
    
    // Accessibility
    a11y: {
      prevSlideMessage: 'Previous slide',
      nextSlideMessage: 'Next slide',
      firstSlideMessage: 'This is the first slide',
      lastSlideMessage: 'This is the last slide',
      paginationBulletMessage: 'Go to slide {{index}}'
    }
  });
  
  // Add hover effect pause/resume
  const swiperContainer = document.querySelector('.featuredSwiper');
  
  swiperContainer.addEventListener('mouseenter', () => {
    swiper.autoplay.stop();
  });
  
  swiperContainer.addEventListener('mouseleave', () => {
    swiper.autoplay.start();
  });
  
  // Handle visibility change to pause when tab is not active
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      swiper.autoplay.stop();
    } else {
      swiper.autoplay.start();
    }
  });
});

// Creator section Swiper initialization
document.addEventListener('DOMContentLoaded', function() {
  const creatorSwiper = new Swiper('.creatorSwiper', {
    // Enable loop mode
    loop: true,
    
    // Enable smooth transitions
    effect: 'slide',
    
    // Spacing between slides
    spaceBetween: 40,
    
    // Auto play configuration
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    
    // Navigation arrows
    navigation: {
      nextEl: '.creator-button-next',
      prevEl: '.creator-button-prev',
    },
    
    // Pagination
    pagination: {
      el: '.creator-pagination',
      clickable: true,
    },
    
    // Responsive breakpoints
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 40
      }
    },
    
    // Enable grabbing cursor
    grabCursor: true,
    
    // Add fade effect
    speed: 800,
    
    // Keyboard control
    keyboard: {
      enabled: true,
    },
    
    // Accessibility
    a11y: {
      prevSlideMessage: 'Previous creator',
      nextSlideMessage: 'Next creator',
      firstSlideMessage: 'This is the first creator',
      lastSlideMessage: 'This is the last creator',
      paginationBulletMessage: 'Go to creator {{index}}'
    }
  });
  
  // Add hover effect pause/resume
  const creatorContainer = document.querySelector('.creatorSwiper');
  
  creatorContainer.addEventListener('mouseenter', () => {
    creatorSwiper.autoplay.stop();
  });
  
  creatorContainer.addEventListener('mouseleave', () => {
    creatorSwiper.autoplay.start();
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Swiper initialization (önceki kodlar aynı kalacak)

  // Follow button functionality
  const followButtons = document.querySelectorAll('.follow-btn');
  
  // Get followed creators from localStorage if any
  const followedCreators = new Set(JSON.parse(localStorage.getItem('followedCreators') || '[]'));
  
  // Set initial state for buttons
  followButtons.forEach(btn => {
    const creatorId = btn.dataset.creator;
    if (followedCreators.has(creatorId)) {
      updateButtonState(btn, true);
    }
  });

  followButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const creatorId = this.dataset.creator;
      
      if (!this.classList.contains('followed')) {
        // Follow
        followedCreators.add(creatorId);
        updateButtonState(this, true);
        
        // Show follow notification
        showNotification('Creator followed successfully!', 'success');
      } else {
        // Unfollow
        followedCreators.delete(creatorId);
        updateButtonState(this, false);
        
        // Show unfollow notification
        showNotification('Creator unfollowed', 'info');
      }
      
      // Save to localStorage
      localStorage.setItem('followedCreators', JSON.stringify([...followedCreators]));
    });
  });

  function updateButtonState(button, isFollowed) {
    if (isFollowed) {
      button.classList.add('followed');
      button.textContent = '✓ Followed';
    } else {
      button.classList.remove('followed');
      button.textContent = '+ Follow';
    }
  }

  // Simple notification function
  function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 10px 20px;
      border-radius: 5px;
      background: ${type === 'success' ? 'rgba(75, 248, 162, 0.2)' : 'rgba(248, 75, 75, 0.2)'};
      border: 1px solid ${type === 'success' ? 'rgba(75, 248, 162, 0.4)' : 'rgba(248, 75, 75, 0.4)'};
      color: white;
      backdrop-filter: blur(5px);
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // Add CSS animations to head
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
});

// FAQ acordion
document.querySelectorAll('.faq__accordion').forEach(accordion => {
  const heading = accordion.querySelector('.faq__heading');
  const content = accordion.querySelector('.faq__content');
  
  // Ripple efekti için fonksiyon
  const createRipple = (e) => {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    
    const rect = accordion.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    accordion.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 1000);
  };

  heading.addEventListener('click', (e) => {
    e.stopPropagation();
    
    // Animasyon sırasında yeni tıklamaları engelle
    if (accordion.classList.contains('animating')) return;
    
    // Animasyon durumunu işaretle
    accordion.classList.add('animating');
    
    const wasActive = accordion.classList.contains('active');
    
    // Açık olan accordion'u kapat
    if (!wasActive) {
      // İçerik yüksekliğini hesapla
      content.style.display = 'block';
      const contentHeight = content.scrollHeight;
      content.style.display = '';
      
      // Animasyonu başlat
      accordion.classList.add('active');
      content.style.height = contentHeight + 'px';
      
      createRipple(e);
      
      // Animasyon bitiminde temizlik
      setTimeout(() => {
        content.style.height = 'auto';
        accordion.classList.remove('animating');
      }, 300);
    } else {
      // Kapatma animasyonu
      content.style.height = content.scrollHeight + 'px';
      
      setTimeout(() => {
        content.style.height = '0';
        accordion.classList.remove('active');
        
        setTimeout(() => {
          accordion.classList.remove('animating');
        }, 300);
      }, 0);
    }
  });
  
  // Klavye erişilebilirliği
  heading.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      heading.click();
    }
  });
  
  // Her accordion için tabindex ekle
  heading.setAttribute('tabindex', '0');
});

// Sayfa yüklendiğinde tüm içerikleri gizle
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.faq__content').forEach(content => {
    content.style.height = '0';
  });
});

// DOM yüklendiğinde çalışacak
document.addEventListener('DOMContentLoaded', function() {
    // Isotope grid inicializasyonu
    var $grid = $('.grid-box').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows'
    });

    // Filter butonlarını seç
    const filterButtons = document.querySelectorAll('.collections__filter');

    // Her filter butonuna click event listener ekle
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Tıklanan butonun data-filter değerini al
            const filterValue = this.getAttribute('data-filter');
            
            // Isotope ile filtreleme yap
            $grid.isotope({ filter: filterValue });
            
            // Aktif class'ını yönet
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // Sayfa yüklendiğinde "All" filtresini aktif et
    document.querySelector('.collections__filter[data-filter="*"]').click();
});

// Resimlerin yüklenmesi tamamlandığında grid'i yeniden düzenle
window.addEventListener('load', function() {
    $('.grid-box').isotope('layout');
});

// İlk olarak, Isotope'u başlatmak için doğru container ve item selector'ları kullanmalıyız
document.addEventListener('DOMContentLoaded', function() {
  // ImagesLoaded ile resimlerin yüklenmesini bekleyelim
  imagesLoaded('#portfolio', function() {
    // Isotope initialization
    var $grid = $('#portfolio').isotope({
      itemSelector: '.collections__box',
      layoutMode: 'fitRows',
      fitRows: {
        gutter: 15 // Bu değeri collections__box-container'daki gap değerine göre ayarlayın
      }
    });

    // Filter butonlarına tıklama eventi
    $('.collections__filter').on('click', function() {
      var filterValue = $(this).attr('data-filter');
      
      // Aktif class'ı yönetimi
      $('.collections__filter').removeClass('active');
      $(this).addClass('active');
      
      // Filtreleme işlemi
      $grid.isotope({ filter: filterValue });
    });
  });

  // Sayfa yüklendiğinde "All" filtresini aktif et
  $('.collections__filter[data-filter="*"]').click();
});

// Resize eventi için yeniden layout
window.addEventListener('resize', function() {
  $('#portfolio').isotope('layout');
});