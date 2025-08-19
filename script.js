// エラー検出とフォールバック機能
let jsWorking = false;
let animationFallbackTimer = null;

// JavaScript動作確認
function checkJavaScriptWorking() {
    jsWorking = true;
    // フォールバックタイマーをクリア
    if (animationFallbackTimer) {
        clearTimeout(animationFallbackTimer);
    }
}

// フォールバック機能：JavaScriptが動作しない場合の対策
function initializeFallback() {
    // 2秒後にJavaScriptが動作していない場合、強制的に要素を表示
    animationFallbackTimer = setTimeout(() => {
        if (!jsWorking) {
            console.warn('JavaScript animation fallback activated');
            const hiddenElements = document.querySelectorAll('.animate-on-scroll');
            hiddenElements.forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                el.style.transition = 'all 0.5s ease';
            });
        }
    }, 2000);
}

// ページ読み込み時にフォールバック初期化
initializeFallback();

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Enhanced Navbar scroll effect with improved performance and flicker prevention
let lastScrollY = 0;
let ticking = false;
let navbar = null;

// Initialize navbar reference when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    navbar = document.querySelector('.navbar');
    // 初期状態を設定してちらつきを防止
    if (navbar) {
        navbar.style.opacity = '1';
        navbar.style.visibility = 'visible';
        // 初期スクロール位置をチェック
        updateNavbar();
    }
});

function updateNavbar() {
    if (!navbar) return;
    
    const currentScrollY = window.pageYOffset;
    
    // スクロール位置に基づいて透明度を調整
    if (currentScrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollY = currentScrollY;
    ticking = false;
}

function requestNavbarUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
    }
}

// パッシブリスナーでパフォーマンス向上
window.addEventListener('scroll', requestNavbarUpdate, { passive: true });

// ページロード時にも実行
window.addEventListener('load', updateNavbar);

// Simple Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // 一度アニメーションが実行されたら監視を停止
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // JavaScript動作確認
    checkJavaScriptWorking();
    
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // ヒーローコンテンツはアニメーションなしで常に表示
    // （アニメーション処理を削除）
});

// Add click handlers for navigation links
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
});

// Simple hover effects for cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.activity-card, .details-card, .facility-card, .exhibitor-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '';
        });
    });
});

// Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});

// Simple loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

