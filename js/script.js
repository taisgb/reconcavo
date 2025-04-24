document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const menuMobile = document.querySelector('.menu-mobile');
    const menu = document.querySelector('.menu');
    
    if (menuMobile) {
        menuMobile.addEventListener('click', function() {
            menu.classList.toggle('active');
        });
    }
    
    // Clients Carousel
    const clientsTrack = document.querySelector('.clients-track');
    const prevButton = document.querySelector('.clients-carousel-container .prev');
    const nextButton = document.querySelector('.clients-carousel-container .next');
    
    if (clientsTrack && prevButton && nextButton) {
        const clientLogos = document.querySelectorAll('.client-logo');
        const logoWidth = clientLogos[0].offsetWidth + 40; // width + margin
        const visibleLogos = Math.floor(clientsTrack.parentElement.offsetWidth / logoWidth);
        let position = 0;
        const maxPosition = clientLogos.length - visibleLogos;
        
        // Função para atualizar a posição do carrossel
        function updateCarouselPosition() {
            clientsTrack.style.transform = `translateX(${-position * logoWidth}px)`;
        }
        
        // Botão anterior
        prevButton.addEventListener('click', function() {
            position = Math.max(0, position - 1);
            updateCarouselPosition();
        });
        
        // Botão próximo
        nextButton.addEventListener('click', function() {
            position = Math.min(maxPosition, position + 1);
            updateCarouselPosition();
        });
        
        // Auto slide a cada 5 segundos
        function autoSlide() {
            position = (position + 1) % (maxPosition + 1);
            updateCarouselPosition();
        }
        
        // Iniciar auto slide
        const autoSlideInterval = setInterval(autoSlide, 5000);
        
        // Parar auto slide quando o mouse estiver sobre o carrossel
        const carouselContainer = document.querySelector('.clients-carousel-container');
        carouselContainer.addEventListener('mouseenter', function() {
            clearInterval(autoSlideInterval);
        });
        
        // Reiniciar auto slide quando o mouse sair do carrossel
        carouselContainer.addEventListener('mouseleave', function() {
            clearInterval(autoSlideInterval);
            setInterval(autoSlide, 5000);
        });
        
        // Atualizar visibilidade dos botões de navegação
        function updateNavButtons() {
            prevButton.style.opacity = position === 0 ? '0.5' : '1';
            nextButton.style.opacity = position === maxPosition ? '0.5' : '1';
        }
        
        // Atualizar botões inicialmente
        updateNavButtons();
        
        // Atualizar botões quando a posição mudar
        prevButton.addEventListener('click', updateNavButtons);
        nextButton.addEventListener('click', updateNavButtons);
    }
    
    // Projetos Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                this.classList.add('active');
                
                projectItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Project Modal
    const viewProjectButtons = document.querySelectorAll('.view-project');
    const projectModal = document.getElementById('projectModal');
    const closeModal = document.querySelector('.close-modal');
    
    // Dados dos projetos (simulando um banco de dados)
    const projectsData = {
        projeto1: {
            title: 'SESI',
            category: 'Institucional',
            description: 'Serviços de arquitetura prestados sob demanda para o Sistema FIEPE, incluindo intervenções nas unidades do SESI Caruaru - Escola de Referência, SESI Goiana e na Casa da Indústria, com reforma do térreo ao 4º pavimento.',
            details: [
              { label: 'Cliente', value: 'SESI-PE / Sistema FIEPE' },
              { label: 'Localização', value: 'Pernambuco, PE' },
              { label: 'Área', value: 'Intervenções em múltiplas unidades' },
              { label: 'Ano', value: '2024' },
              { label: 'Serviços', value: 'Projeto Arquitetônico, Reforma Institucional' }
            ],
            images: [
                './img/projetos/sesi/sala_reuniao.webp',
                './img/projetos/sesi/modal2.webp',
                './img/projetos/sesi/modal3.webp',
                './img/projetos/sesi/modal4.webp'
            ]
        },
        projeto2: {
            title: 'Prefeitura de Araraquara - SP',
            category: 'Pública',
            description: 'Prestação de serviços técnicos especializados em arquitetura e engenharia para apoio à Secretaria Municipal de Desenvolvimento Urbano, com elaboração e revisão de projetos prediais e urbanos, incluindo equipamentos e infraestrutura externa do município.',
            details: [
              { label: 'Cliente', value: 'Prefeitura Municipal de Araraquara / SP' },
              { label: 'Localização', value: 'Araraquara, SP' },
              { label: 'Área', value: 'Projetos diversos em áreas públicas e urbanas' },
              { label: 'Ano', value: '2024' },
              { label: 'Serviços', value: 'Projetos Arquitetônicos, Urbanos e Prediais, Apoio Técnico à Gestão' }
            ],
            images: [
                './img/projetos/araraquara/modal3.webp',
                './img/projetos/araraquara/modal2.webp',
                './img/projetos/araraquara/modal1.webp',
                './img/projetos/araraquara/modal4.webp'
            ]
        },
        projeto3: {
            title: 'SESC ES – Colatina',
            category: 'Institucional',
            description: 'Projeto de reforma e revitalização do Centro de Atividades do SESC Colatina, abrangendo fachada, escola, biblioteca, laboratórios, auditório, academia e áreas administrativas.',
            details: [
              { label: 'Cliente', value: 'SESC Espírito Santo' },
              { label: 'Localização', value: 'Colatina, ES' },
              { label: 'Área', value: 'Centro educacional e de atividades completo' },
              { label: 'Ano', value: '2024' },
              { label: 'Serviços', value: 'Projeto Arquitetônico de Reforma e Revitalização Institucional' }
            ],
            images: [
                './img/projetos/sesc_colatina/modal1.webp',
                './img/projetos/sesc_colatina/modal2.webp',
                './img/projetos/sesc_colatina/modal3.webp',
                './img/projetos/sesc_colatina/modal4.webp'
            ]
        },
        projeto4: {
            title: 'Delegacia da Polícia Federal – Oiapoque/AP',
            category: 'Obra Pública',
            description: 'Elaboração de projetos básicos e executivos para a nova Delegacia da Polícia Federal em Oiapoque/AP, incluindo guarita, estande de tiro, canil, academia e áreas administrativas e operacionais.',
            details: [
              { label: 'Cliente', value: 'DPF/AP – Departamento de Polícia Federal' },
              { label: 'Localização', value: 'Oiapoque, AP' },
              { label: 'Área', value: 'Equipamento de segurança pública federal com múltiplas áreas funcionais' },
              { label: 'Ano', value: '2024' },
              { label: 'Serviços', value: 'Projetos Básicos e Executivos Arquitetônicos e Complementares' }
            ],
            images: [
                './img/projetos/De_Oiapoque/modal1.webp',
                './img/projetos/De_Oiapoque/modal2.webp',
                './img/projetos/De_Oiapoque/modal3.webp',
                './img/projetos/De_Oiapoque/modal4.webp'
            ]
        },
        projeto5: {
            title: 'Câmara Municipal de Buritis – MG',
            category: 'Obra Pública',
            description: 'Elaboração de projetos arquitetônicos completos, incluindo interiores e complementares, para o prédio institucional da Câmara Municipal de Buritis e seu respectivo plenário.',
            details: [
                { label: 'Cliente', value: 'Câmara Municipal de Buritis / MG' },
                { label: 'Localização', value: 'Buritis, MG' },
                { label: 'Área', value: 'Edificação institucional com plenário e áreas administrativas' },
                { label: 'Ano', value: '2024' },
                { label: 'Serviços', value: 'Projeto Arquitetônico, Interiores e Complementares' }
            ],
            images: [
                './img/projetos/buritis/modal1.webp',
                './img/projetos/buritis/modal2.webp',
                './img/projetos/buritis/modal3.webp',
                './img/projetos/buritis/modal4.webp'
            ]
        },
        projeto6: {
            title: 'CREMEB – Delegacias Regionais',
            category: 'Institucional',
            description: 'Projeto e execução de adequação de layout e design de interiores para diversas Delegacias Regionais do CREMEB, com foco em funcionalidade, atendimento e identidade visual institucional.',
            details: [
              { label: 'Cliente', value: 'CREMEB – Conselho Regional de Medicina da Bahia' },
              { label: 'Localização', value: 'Diversas cidades da Bahia' },
              { label: 'Área', value: 'Delegacias Regionais – Norte, Sul, Centro e Extremos do Estado' },
              { label: 'Ano', value: '2024' },
              { label: 'Serviços', value: 'Layout, Design de Interiores, Execução e Padronização Institucional' }
            ],
            images: [
                './img/projetos/cremeb/modal1.webp',
                './img/projetos/cremeb/modal2.webp',
                './img/projetos/cremeb/modal3.webp',
                './img/projetos/cremeb/modal4.webp'
            ]
        },
        projeto7: {
            title: 'Escritório Moderno',
            category: 'Design de Interiores',
            description: 'Design de interiores para escritório corporativo. O projeto valoriza a colaboração entre equipes, com espaços abertos e áreas de reunião informais. A identidade visual da empresa foi incorporada ao design dos ambientes.',
            details: [
                { label: 'Cliente', value: 'Empresa Tech' },
                { label: 'Localização', value: 'Salvador, BA' },
                { label: 'Área', value: '500m²' },
                { label: 'Ano', value: '2022' },
                { label: 'Serviços', value: 'Design de Interiores, Consultoria em Acústica' }
            ],
            images: [
                'projeto7.jpg',
                'projeto7-2.jpg',
                'projeto7-3.jpg',
                'projeto7-4.jpg'
            ]
        },
        projeto8: {
            title: 'Fábrica Sustentável',
            category: 'Projeto Industrial',
            description: 'Projeto de fábrica com foco em sustentabilidade. O complexo utiliza energia solar, sistema de reuso de água e materiais de baixo impacto ambiental. O layout foi otimizado para reduzir desperdícios e aumentar a produtividade.',
            details: [
                { label: 'Cliente', value: 'Indústria Verde' },
                { label: 'Localização', value: 'Simões Filho, BA' },
                { label: 'Área', value: '8000m²' },
                { label: 'Ano', value: '2020' },
                { label: 'Serviços', value: 'Projeto Arquitetônico, Consultoria em Sustentabilidade Industrial' }
            ],
            images: [
                'projeto8.jpg',
                'projeto8-2.jpg',
                'projeto8-3.jpg',
                'projeto8-4.jpg'
            ]
        }
    };
    
    if (viewProjectButtons.length > 0) {
        viewProjectButtons.forEach(button => {
            button.addEventListener('click', function() {
                const projectId = this.getAttribute('data-id');
                const project = projectsData[projectId];
                
                if (project) {
                    // Preencher o modal com os dados do projeto
                    document.getElementById('modal-title').textContent = project.title;
                    document.getElementById('modal-category').textContent = project.category;
                    document.getElementById('modal-description').textContent = project.description;
                    
                    // Preencher os detalhes
                    const detailsList = document.getElementById('modal-details');
                    detailsList.innerHTML = '';
                    
                    project.details.forEach(detail => {
                        const li = document.createElement('li');
                        li.innerHTML = `<strong>${detail.label}:</strong> ${detail.value}`;
                        detailsList.appendChild(li);
                    });
                    
                    // Preencher a galeria
                    const mainImage = document.getElementById('main-image');
                    mainImage.src = project.images[0];
                    mainImage.alt = project.title;
                    
                    const galleryThumbs = document.getElementById('gallery-thumbs');
                    galleryThumbs.innerHTML = '';
                    
                    project.images.forEach((image, index) => {
                        const thumb = document.createElement('div');
                        thumb.className = index === 0 ? 'gallery-thumb active' : 'gallery-thumb';
                        thumb.innerHTML = `<img src="${image}" alt="${project.title} - Imagem ${index + 1}">`;
                        
                        thumb.addEventListener('click', function() {
                            mainImage.src = image;
                            
                            document.querySelectorAll('.gallery-thumb').forEach(t => {
                                t.classList.remove('active');
                            });
                            
                            this.classList.add('active');
                        });
                        
                        galleryThumbs.appendChild(thumb);
                    });
                    
                    // Navegação da galeria
                    const prevButton = document.querySelector('.gallery-nav.prev');
                    const nextButton = document.querySelector('.gallery-nav.next');
                    let currentImageIndex = 0;
                    
                    prevButton.addEventListener('click', function() {
                        currentImageIndex = (currentImageIndex - 1 + project.images.length) % project.images.length;
                        mainImage.src = project.images[currentImageIndex];
                        
                        document.querySelectorAll('.gallery-thumb').forEach((thumb, index) => {
                            thumb.classList.toggle('active', index === currentImageIndex);
                        });
                    });
                    
                    nextButton.addEventListener('click', function() {
                        currentImageIndex = (currentImageIndex + 1) % project.images.length;
                        mainImage.src = project.images[currentImageIndex];
                        
                        document.querySelectorAll('.gallery-thumb').forEach((thumb, index) => {
                            thumb.classList.toggle('active', index === currentImageIndex);
                        });
                    });
                    
                    // Exibir o modal
                    projectModal.style.display = 'block';
                }
            });
        });
        
        // Fechar o modal
        closeModal.addEventListener('click', function() {
            projectModal.style.display = 'none';
        });
        
        // Fechar o modal ao clicar fora do conteúdo
        window.addEventListener('click', function(event) {
            if (event.target === projectModal) {
                projectModal.style.display = 'none';
            }
        });
    }   

    
    // Formulário de contato
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Simulação de envio do formulário
            const formData = new FormData(contactForm);
            const formValues = {};
            
            formData.forEach((value, key) => {
                formValues[key] = value;
            });
            
            // Aqui você pode adicionar a lógica para enviar os dados para um servidor
            console.log('Dados do formulário:', formValues);
            
            // Feedback para o usuário
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            
            // Limpar o formulário
            contactForm.reset();
        });
    }
});
    const viewServiceButtons = document.querySelectorAll('.view-service');
    const modalServico = document.getElementById('modalServico');
    const closeModalServico = document.querySelector('.close-modal-servico');

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

        window.addEventListener('click', e => {
        if (e.target === modalServico) modalServico.style.display = 'none';
        });
