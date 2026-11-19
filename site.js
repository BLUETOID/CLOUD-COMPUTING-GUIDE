// Cloud Computing Study Guide - Interactive Site Scripts
document.addEventListener('DOMContentLoaded', () => {
  // 1. Reading Progress Bar
  const progressBar = document.getElementById('reading-progress');
  // 2. Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0 && progressBar) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }

    if (backToTopBtn) {
      if (window.scrollY > 320) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 3. Question Filter, Search & Expand/Collapse All (Short & Long Answer Pages)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('questionSearch');
  const toggleAllBtn = document.getElementById('toggleAllBtn');
  const questions = document.querySelectorAll('.question');
  const noResults = document.getElementById('noResults');

  if (questions.length > 0) {
    let activeFilter = 'all';

    function applyFilters() {
      const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
      let visibleCount = 0;

      questions.forEach((q) => {
        const year = q.dataset.year || '';
        const marks = q.dataset.marks || '';
        const unit = q.dataset.unit || '';
        const text = q.textContent.toLowerCase();

        let matchesFilter = true;
        if (activeFilter !== 'all') {
          if (activeFilter === '2023' || activeFilter === '2024' || activeFilter === '2025') {
            matchesFilter = year === activeFilter;
          } else if (activeFilter === 'm10' || activeFilter === 'm7' || activeFilter === 'm2') {
            matchesFilter = ('m' + marks) === activeFilter;
          } else if (activeFilter.startsWith('unit')) {
            matchesFilter = unit === activeFilter;
          }
        }

        const matchesSearch = !query || text.includes(query);
        const show = matchesFilter && matchesSearch;
        q.style.display = show ? '' : 'none';
        if (show) visibleCount++;
      });

      // Hide empty paper sections when filtering
      document.querySelectorAll('.paper-section').forEach((sec) => {
        const visibleInSec = sec.querySelectorAll('.question:not([style*="display: none"])').length;
        sec.style.display = visibleInSec > 0 ? '' : 'none';
      });

      if (noResults) {
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    }

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.dataset.filter || 'all';
        applyFilters();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', applyFilters);
    }

    if (toggleAllBtn) {
      let expanded = false;
      toggleAllBtn.addEventListener('click', () => {
        expanded = !expanded;
        document.querySelectorAll('.question:not([style*="display: none"]) .answer-toggle').forEach((d) => {
          d.open = expanded;
        });
        toggleAllBtn.textContent = expanded ? 'Collapse All Answers' : 'Expand All Answers';
      });
    }
  }
});
