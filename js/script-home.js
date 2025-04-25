document.addEventListener('DOMContentLoaded', function () {
    // Carrossel de clientes
    const clientsTrack = document.querySelector('.clients-track');
    const prevButton = document.querySelector('.clients-carousel-container .prev');
    const nextButton = document.querySelector('.clients-carousel-container .next');

    if (clientsTrack && prevButton && nextButton) {
        const clientLogos = document.querySelectorAll('.client-logo');
        const logoWidth = clientLogos[0].offsetWidth + 31;
        const visibleLogos = Math.floor(clientsTrack.parentElement.offsetWidth / logoWidth);
        let position = 0;
        const maxPosition = clientLogos.length - visibleLogos;

        function updateCarouselPosition() {
            clientsTrack.style.transform = `translateX(${-position * logoWidth}px)`;
        }

        prevButton.addEventListener('click', function () {
            position = Math.max(0, position - 1);
            updateCarouselPosition();
        });

        nextButton.addEventListener('click', function () {
            position = Math.min(maxPosition, position + 1);
            updateCarouselPosition();
        });

        const autoSlideInterval = setInterval(() => {
            position = (position + 1) % (maxPosition + 1);
            updateCarouselPosition();
        }, 5000);

        const carouselContainer = document.querySelector('.clients-carousel-container');
        carouselContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        carouselContainer.addEventListener('mouseleave', () => setInterval(() => {
            position = (position + 1) % (maxPosition + 1);
            updateCarouselPosition();
        }, 5000));
    }

    // Modal de serviços
    const viewServiceButtons = document.querySelectorAll('.view-service');
    const modalServico = document.getElementById('modalServico');
    const closeModalServico = document.querySelector('.close-modal-servico');

    if (viewServiceButtons.length > 0 && modalServico && closeModalServico) {
        const servicosData = {
    servico1: {
        titulo: 'Projetos Arquitetônicos',
        descricao: 'Desenvolvimento completo de projetos arquitetônicos com foco em funcionalidade e normas técnicas.',
        itens: [
            'Residenciais, comerciais e industriais',
            'Projetos de acessibilidade e paisagismo',
            'Levantamento cadastral e AS BUILT',
            'Urbanismo e sinalização'
        ]
    },
    servico2: {
        titulo: 'Engenharia Estrutural e Instalações',
        descricao: 'Projetos técnicos para segurança, eficiência e conformidade de sistemas e estruturas.',
        itens: [
            'Projetos estruturais',
            'Elétrica e hidrossanitária',
            'Fotovoltaico, incêndio e acústica'
        ]
    },
    servico3: {
        titulo: 'Gerenciamento de Projetos',
        descricao: 'Supervisão e coordenação técnica de todas as etapas da obra.',
        itens: [
            'Compatibilização de disciplinas',
            'Acompanhamento de execução',
            'Controle de prazos e custos'
        ]
    },
    servico4: {
        titulo: 'Design de Interiores',
        descricao: 'Criação de espaços personalizados com conforto, identidade e funcionalidade.',
        itens: [
            'Mobiliário sob medida',
            'Iluminação, cores e texturas',
            'Maquetes, modelagens e renderizações'
        ]
    }
};

        viewServiceButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const servico = servicosData[id];

                if (servico) {
                    document.getElementById('servico-titulo').textContent = servico.titulo;
                    document.getElementById('servico-descricao').textContent = servico.descricao;
                    const lista = document.getElementById('servico-itens');
                    lista.innerHTML = '';
                    servico.itens.forEach(item => {
                        const li = document.createElement('li');
                        li.textContent = item;
                        lista.appendChild(li);
                    });
                    modalServico.style.display = 'block';
                }
            });
        });

        closeModalServico.addEventListener('click', () => {
            modalServico.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modalServico) modalServico.style.display = 'none';
        });
    }
});
