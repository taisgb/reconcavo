document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.project-item').forEach(item => {
      const categoryAttr = item.getAttribute('data-category');
      if (!categoryAttr) return;
  
      const categories = categoryAttr.split(' ');
      const badgeContainer = document.createElement('div');
      badgeContainer.className = 'project-badges fixed';
  
      categories.forEach(cat => {
        const span = document.createElement('span');
        span.className = `badge ${cat}`;
        span.textContent = formatarBadge(cat);
        badgeContainer.appendChild(span);
      });
  
      const imageContainer = item.querySelector('.project-image');
      if (imageContainer) {
        imageContainer.insertBefore(badgeContainer, imageContainer.firstChild);
      }
    });
  });
  
  function formatarBadge(cat) {
    const nomesPersonalizados = {
      institucional: 'Institucional/Administrativo',
      residencial: 'Residencial',
      hotelaria: 'Hotelaria',
      urbanismo: 'Urbanismo',
      esportes: 'Esportes',
      lazer: 'Cultura/Lazer',
      paisagismo: 'Paisagismo',
      clinica: 'Clínicas/Saúde',
      educacional: 'Educacional'
    };
    return nomesPersonalizados[cat] || cat.charAt(0).toUpperCase() + cat.slice(1);
  }
  