// Small interactive helpers for the portfolio
document.addEventListener('DOMContentLoaded', ()=>{
  // set year
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  if(navToggle && nav){
    navToggle.addEventListener('click', ()=> nav.classList.toggle('show'))
  }

  // theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    // Check local storage or match system preferences
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (!savedTheme && window.matchMedia('(prefers-color-scheme: light)').matches) {
      document.documentElement.setAttribute('data-theme', 'light');
    }

    themeToggle.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      if (isLight) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('portfolio-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('portfolio-theme', 'light');
      }
    });
  }

  // feedback form (demo only)
  const feedbackForm = document.getElementById('feedback-form');
  const feedbackStatus = document.getElementById('feedback-form-status');
  if(feedbackForm){
    feedbackForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const data = new FormData(feedbackForm);
      const name = data.get('name');
      // Simulate send
      feedbackStatus.textContent = 'Sending…';
      setTimeout(()=>{
        feedbackStatus.textContent = `Thanks for your feedback, ${name || 'there'}!`;
        feedbackForm.reset();
      }, 800);
    })
  }

  // smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
      }
    })
  })

  // Certificate PDF Modal Logic
  const modal = document.getElementById('certificate-modal');
  const iframe = document.getElementById('pdf-viewer-iframe');
  const modalTitle = document.getElementById('modal-title');
  const closeBtn = document.getElementById('modal-close-btn');
  const downloadLink = document.getElementById('modal-download-link');
  const cards = document.querySelectorAll('.certificate-card');

  if (modal && iframe && modalTitle && closeBtn && downloadLink) {
    const openModal = (pdfUrl, title) => {
      iframe.src = pdfUrl;
      modalTitle.textContent = title;
      downloadLink.href = pdfUrl;
      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      iframe.src = '';
    };

    cards.forEach(card => {
      card.addEventListener('click', () => {
        const pdf = card.getAttribute('data-pdf');
        const title = card.getAttribute('data-title');
        openModal(pdf, title);
      });
    });

    closeBtn.addEventListener('click', closeModal);

    // Close when clicking backdrop
    modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
      }
    });
  }

  // close mobile menu when nav link is clicked
  if (nav && navToggle) {
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('show');
      });
    });
  }
});