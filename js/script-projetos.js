document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function () {
                const filter = this.getAttribute('data-filter');

                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                projectItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category').includes(filter)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }   
     

    const viewProjectButtons = document.querySelectorAll('.view-project');
    const projectModal = document.getElementById('projectModal');
    const closeModal = document.querySelector('.close-modal');

    if (viewProjectButtons.length > 0 && projectModal && closeModal) {
        const projectsData = { /* ... dados dos projetos ... */ };

        viewProjectButtons.forEach(button => {
            button.addEventListener('click', function () {
                const projectId = this.getAttribute('data-id');
                const project = projectsData[projectId];

                if (project) {
                    document.getElementById('modal-title').textContent = project.title;
                    document.getElementById('modal-category').textContent = project.category;
                    document.getElementById('modal-description').textContent = project.description;

                    const detailsList = document.getElementById('modal-details');
                    detailsList.innerHTML = '';
                    project.details.forEach(detail => {
                        const li = document.createElement('li');
                        li.innerHTML = `<strong>${detail.label}:</strong> ${detail.value}`;
                        detailsList.appendChild(li);
                    });

                    const mainImage = document.getElementById('main-image');
                    mainImage.src = project.images[0];
                    mainImage.alt = project.title;

                    const galleryThumbs = document.getElementById('gallery-thumbs');
                    galleryThumbs.innerHTML = '';
                    project.images.forEach((image, index) => {
                        const thumb = document.createElement('div');
                        thumb.className = index === 0 ? 'gallery-thumb active' : 'gallery-thumb';
                        thumb.innerHTML = `<img src="${image}" alt="${project.title} - Imagem ${index + 1}">`;

                        thumb.addEventListener('click', function () {
                            mainImage.src = image;
                            document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
                            this.classList.add('active');
                        });
                        galleryThumbs.appendChild(thumb);
                    });

                    let currentImageIndex = 0;
                    const prevButton = document.querySelector('.gallery-nav.prev');
                    const nextButton = document.querySelector('.gallery-nav.next');

                    prevButton.addEventListener('click', function () {
                        currentImageIndex = (currentImageIndex - 1 + project.images.length) % project.images.length;
                        mainImage.src = project.images[currentImageIndex];
                        document.querySelectorAll('.gallery-thumb').forEach((thumb, index) => {
                            thumb.classList.toggle('active', index === currentImageIndex);
                        });
                    });

                    nextButton.addEventListener('click', function () {
                        currentImageIndex = (currentImageIndex + 1) % project.images.length;
                        mainImage.src = project.images[currentImageIndex];
                        document.querySelectorAll('.gallery-thumb').forEach((thumb, index) => {
                            thumb.classList.toggle('active', index === currentImageIndex);
                        });
                    });

                    projectModal.style.display = 'block';
                }
            });
        });

        closeModal.addEventListener('click', function () {
            projectModal.style.display = 'none';
        });

        window.addEventListener('click', function (event) {
            if (event.target === projectModal) {
                projectModal.style.display = 'none';
            }
        });
    }

      //Botão ver mais - load

      const loadMoreButton = document.getElementById('load-more');
      let visibleCount = 8;

      function showProjects(count) {
          let shown = 0;
          let hiddenStillAvailable = false;

          const currentFilter = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all';

          projectItems.forEach(item => {
              const categories = item.getAttribute('data-category');
              const matchesFilter = currentFilter === 'all' || categories.includes(currentFilter);

              if (matchesFilter) {
                  if (shown < count) {
                      item.style.display = 'block';
                      shown++;
                  } else {
                      item.style.display = 'none';
                      hiddenStillAvailable = true;
                  }
              } else {
                  item.style.display = 'none';
              }
          });

          loadMoreButton.style.display = hiddenStillAvailable ? 'inline-block' : 'none';
      }

      // Inicializa
      showProjects(visibleCount);

      // Clique no botão
      if (loadMoreButton) {
          loadMoreButton.addEventListener('click', () => {
              visibleCount += 8;
              showProjects(visibleCount);
          });
      }

      // Quando muda o filtro
      filterButtons.forEach(button => {
          button.addEventListener('click', () => {
              visibleCount = 8;
              showProjects(visibleCount);
          });
      });


    // Dados dos projetos (simulando um banco de dados)
    const projectsData = {
        projeto1: {
            title: 'Casa da Indústria – SESI PE',
            category: 'Institucional/Administrativo',
            description: 'Reforma completa do térreo ao 4º pavimento da sede da Casa da Indústria em Recife..',
            details: [
            { label: 'Cliente', value: 'SESI-PE / Sistema FIEPE' },
            { label: 'Localização', value: 'Pernambuco' },            
            { label: 'Ano', value: '2022' }            
            ],
            images: [
                './img/projetos/sesi/modal1.webp',
                './img/projetos/sesi/modal2.webp',
                './img/projetos/sesi/modal3.webp',
                './img/projetos/sesi/modal4.webp'
            ]
        },
        projeto2: {
            title: 'Prefeitura de Araraquara - SP (Ginásio)',
            category: 'Esportes',
            description: 'Prestação de serviços técnicos especializados em arquitetura e engenharia para apoio à Secretaria Municipal de Desenvolvimento Urbano, com elaboração e revisão de projetos prediais e urbanos, incluindo equipamentos e infraestrutura externa do município.',
            details: [
            { label: 'Cliente', value: 'Prefeitura Municipal de Araraquara / SP' },
            { label: 'Localização', value: 'Araraquara, SP' },            
            { label: 'Ano', value: '2023' }           
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
            category: 'Esportes',
            description: 'Projeto de reforma e revitalização do Centro de Atividades do SESC Colatina, abrangendo fachada, escola, biblioteca, laboratórios, auditório, academia e áreas administrativas.',
            details: [
            { label: 'Cliente', value: 'SESC Espírito Santo' },
            { label: 'Localização', value: 'Colatina, ES' },            
            { label: 'Ano', value: '2023' }           
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
            category: 'Institucional/Administrativo',
            description: 'Elaboração de projetos básicos e executivos para a nova Delegacia da Polícia Federal em Oiapoque/AP, incluindo guarita, estande de tiro, canil, academia e áreas administrativas e operacionais.',
            details: [
            { label: 'Cliente', value: 'DPF/AP – Departamento de Polícia Federal' },
            { label: 'Localização', value: 'Oiapoque, AP' },            
            { label: 'Ano', value: '2021/2022' }           
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
                { label: 'Ano', value: '2021' }        
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
            { label: 'Ano', value: '2023' }
            ],
            images: [
                './img/projetos/cremeb/modal1.webp',
                './img/projetos/cremeb/modal2.webp',
                './img/projetos/cremeb/modal3.webp',
                './img/projetos/cremeb/modal4.webp'
            ]
        },
        projeto7: {
            title: 'SENAR/GO – Sede',
            category: 'Institucional/Administrativo',
            description: 'Contratação de empresa especializada na elaboração de projetos de arquitetura e engenharia para retrofit da sede do SENAR/AR-GO.',
            details: [
              { label: 'Cliente', value: 'SENAR/GO' },
              { label: 'Localização', value: 'Goiás' },
              { label: 'Ano', value: '2023' },
            ],
            images: [
                './img/projetos/senar_sede/modal1.webp',
                './img/projetos/senar_sede/modal2.webp',
                './img/projetos/senar_sede/modal3.webp',
                './img/projetos/senar_sede/modal4.webp'
            ]
          },
          
          projeto8: {
            title: 'TRF1/BA – Justiça Federal',
            category: 'Institucional/Administrativo',
            description: 'Prestação de serviços técnicos especializados em arquitetura e engenharia para a reforma e adequação da sede da Justiça Federal em Salvador/BA.',
            details: [
              { label: 'Cliente', value: 'Justiça Federal – TRF1/BA' },
              { label: 'Localização', value: 'Salvador, BA' },
              { label: 'Ano', value: '2022' },
            ],
            images: [
                './img/projetos/tr/modal1.webp',
                './img/projetos/tr/modal2.webp',
                './img/projetos/tr/modal3.webp',
                './img/projetos/tr/modal4.webp'
            ]
          },
          
          projeto9: {
            title: 'SisPrev – Teófilo Otoni',
            category: 'Institucional/Administrativo',
            description: 'Elaboração de projetos para adequação da sede da autarquia previdenciária municipal.',
            details: [
              { label: 'Cliente', value: 'Sisprev – Prefeitura de Teófilo Otoni' },
              { label: 'Localização', value: 'Teófilo Otoni, MG' },
              { label: 'Ano', value: '2022' },
            ],
            images: [
                './img/projetos/sisprev/modal1.webp',
                './img/projetos/sisprev/modal2.webp',
                './img/projetos/sisprev/modal3.webp',
                './img/projetos/sisprev/modal4.webp'
            ]
          },

          projeto10: {
            title: 'UFF – Agência de Inovação AGIR/UFF',
            category: 'Educacional, Institucional/Administrativo',
            description: 'Projeto de arquitetura e interiores para reforma e readequação da Agência de Inovação AGIR/UFF.',
            details: [
              { label: 'Cliente', value: 'Universidade Federal Fluminense' },
              { label: 'Localização', value: 'Niterói, RJ' },
              { label: 'Ano', value: '2023' },
            ],
            images: [
                './img/projetos/uff/modal1.webp',
                './img/projetos/uff/modal2.webp',
                './img/projetos/uff/modal3.webp',
                './img/projetos/uff/modal4.webp'
            ]
          },
      
           projeto11: {
            title: 'Consultório Médico',
            category: 'Clínicas/Saúde',
            description: 'Projeto de interiores e layout funcional para consultório de atendimento clínico.',
            details: [
              { label: 'Cliente', value: 'Profissional da área de saúde' },
              { label: 'Localização', value: 'Não especificado' },
              { label: 'Ano', value: '2023' },
            ],
            images: [
                './img/projetos/consultorio/modal1.webp',
                './img/projetos/consultorio/modal2.webp',
                './img/projetos/consultorio/modal3.webp',
                './img/projetos/consultorio/modal4.webp'
            ]
          }, 
      
          projeto12: {
            title: 'Clínica de Psicologia',
            category: 'Clínicas/Saúde',
            description: 'Reforma de interiores com foco em conforto, acolhimento e funcionalidade.',
            details: [
              { label: 'Cliente', value: 'Clínica particular' },
              { label: 'Localização', value: '' },
              { label: 'Ano', value: '2023' },
            ],
            images: [
                './img/projetos/psi/modal1.webp',
                './img/projetos/psi/modal2.webp',
                './img/projetos/psi/modal3.webp',
                './img/projetos/psi/modal4.webp'
            ]
          },
      
          projeto13: {
            title: 'Sala de Musicoterapia',
            category: 'Clínicas/Saúde',
            description: 'Projeto de sala terapêutica com adequações acústicas e sensoriais.',
            details: [
              { label: 'Cliente', value: 'Instituição de saúde ou educacional' },
              { label: 'Localização', value: '-' },
              { label: 'Ano', value: '2023' },
            ],
            images: [
                './img/projetos/musicoterapia/modal1.webp',
                './img/projetos/musicoterapia/modal2.webp',
                './img/projetos/musicoterapia/modal3.webp',
                './img/projetos/musicoterapia/modal4.webp'
            ]
          },
      
          projeto14: {
            title: 'Projeto de Interiores – Cozinha',
            category: 'Residencial, Interiores',
            description: 'Projeto de cozinha funcional com integração a ambientes sociais.',
            details: [
              { label: 'Cliente', value: 'Cliente residencial' },
              { label: 'Localização', value: '-' },
              { label: 'Ano', value: '2023' },
            ],
            images: [
                './img/projetos/cozinha/modal1.webp',
                './img/projetos/cozinha/modal2.webp',
                './img/projetos/cozinha/modal3.webp',
                './img/projetos/cozinha/modal4.webp'
            ]
          },
      
          projeto15: {
            title: 'UNESP – São José do Rio Preto',
            category: 'Educacional, Cultura/Lazer',
            description: 'Projeto de moradia estudantil e espaço expositivo (museu) na UNESP – campus de São José do Rio Preto.',
            details: [
              { label: 'Cliente', value: 'UNESP' },
              { label: 'Localização', value: 'São José do Rio Preto, SP' },
              { label: 'Ano', value: '2023' },
            ],
            images: [
                './img/projetos/unesp/modal1.webp',
                './img/projetos/unesp/modal2.webp',
                './img/projetos/unesp/modal3.webp',
                './img/projetos/unesp/modal4.webp'
            ]
          },
      
          projeto16: {
            title: 'Prefeitura de Ibitinga / SP',
            category: 'Institucional/Administrativo',
            description: 'Projeto para adequação e reforma de estrutura pública em Ibitinga, SP.',
            details: [
              { label: 'Cliente', value: 'Prefeitura Municipal de Ibitinga' },
              { label: 'Localização', value: 'Ibitinga, SP' },
              { label: 'Ano', value: '2023' },
            ],
            images: [
                './img/projetos/ibitinga/modal1.webp',
                './img/projetos/ibitinga/modal2.webp',
                './img/projetos/ibitinga/modal3.webp',
                './img/projetos/ibitinga/modal4.webp'
            ]
          },
      
          projeto17: {
            title: 'Prefeitura de Presidente Epitácio/SP',
            category: 'Paisagismo, Urbanismo',
            description: 'Projeto paisagístico com modelagem 3D para áreas públicas do município.',
            details: [
              { label: 'Cliente', value: 'Prefeitura Municipal de Presidente Epitácio' },
              { label: 'Localização', value: 'Presidente Epitácio, SP' },
              { label: 'Ano', value: '2023' },
            ],
            images: [
                './img/projetos/epitacio/modal1.webp',
                './img/projetos/epitacio/modal2.webp',
                './img/projetos/epitacio/modal3.webp',
                './img/projetos/epitacio/modal4.webp'
            ]
          },
      
          projeto18: {
            title: 'CREF 13 / BA',
            category: 'Institucional/Administrativo',
            description: 'Projeto técnico e de interiores para sede regional do CREF 13 na Bahia.',
            details: [
              { label: 'Cliente', value: 'CREF 13 / BA' },
              { label: 'Localização', value: 'Bahia' },
              { label: 'Ano', value: '2023' },
            ],
            images: [
                './img/projetos/cref13/modal1.webp',
                './img/projetos/cref13/modal2.webp',
                './img/projetos/cref13/modal3.webp',
                './img/projetos/cref13/modal4.webp'
            ]
          },
      
          projeto19: {
            title: 'Prefeitura de Indianópolis / PR',
            category: 'Institucional/Administrativo',
            description: 'Projetos técnicos e arquitetônicos diversos para o município de Indianópolis.',
            details: [
              { label: 'Cliente', value: 'Prefeitura de Indianópolis' },
              { label: 'Localização', value: 'Indianópolis, PR' },
              { label: 'Ano', value: '2023' },
            ],
            images: [
                './img/projetos/indianopolis/modal1.webp',
                './img/projetos/indianopolis/modal2.webp',
                './img/projetos/indianopolis/modal3.webp',
                './img/projetos/indianopolis/modal4.webp'
            ]
          },
      
          projeto20: {
            title: 'Câmara dos Vereadores de Antônio Carlos / SC',
            category: 'Institucional/Administrativo',
            description: 'Elaboração de projeto arquitetônico e reforma da Câmara Municipal de Antônio Carlos.',
            details: [
              { label: 'Cliente', value: 'Câmara Municipal de Antônio Carlos' },
              { label: 'Localização', value: 'Antônio Carlos, SC' },
              { label: 'Ano', value: '2023' },
            ],
            images: [
                './img/projetos/acm/modal1.webp',
                './img/projetos/acm/modal2.webp',
                './img/projetos/acm/modal3.webp',
                './img/projetos/acm/modal4.webp'
            ]
          },
      
          projeto21: {
            title: 'Superintendência Regional do Trabalho do RS',
            category: 'Institucional/Administrativo',
            description: 'Projeto de reforma da sede da Superintendência Regional do Trabalho no Rio Grande do Sul.',
            details: [
              { label: 'Cliente', value: 'Superintendência Regional do Trabalho do RS' },
              { label: 'Localização', value: 'Rio Grande do Sul' },
              { label: 'Ano', value: '2023' },
            ],
            images: [
                './img/projetos/srt/modal1.webp',
                './img/projetos/srt/modal2.webp',
                './img/projetos/srt/modal3.webp',
                './img/projetos/srt/modal4.webp'
            ]
          },

          projeto22: {
            title: 'Prefeitura de Pilar do Sul / SP',
            category: 'institucional',
            description: 'Projeto de arquitetura e engenharia para adequações em prédios públicos do município de Pilar do Sul.',
            details: [
              { label: 'Cliente', value: 'Prefeitura Municipal de Pilar do Sul' },
              { label: 'Localização', value: 'Pilar do Sul, SP' },
              { label: 'Ano', value: '2023' },
            ],
            images: [
                './img/projetos/pilar/modal1.webp',
                './img/projetos/pilar/modal2.webp',
                './img/projetos/pilar/modal3.webp',
                './img/projetos/pilar/modal4.webp'
            ]
          },
          
          projeto23: {
            title: 'Prefeitura de São Ludgero / SC',
            category: 'institucional',
            description: 'Projetos técnicos para atendimento das demandas públicas da prefeitura de São Ludgero.',
            details: [
              { label: 'Cliente', value: 'Prefeitura de São Ludgero' },
              { label: 'Localização', value: 'São Ludgero, SC' },
              { label: 'Ano', value: '2023' },
            ],
            images: [
                './img/projetos/ludgero/modal1.webp',
                './img/projetos/ludgero/modal2.webp',
                './img/projetos/ludgero/modal3.webp',
                './img/projetos/ludgero/modal4.webp']
          },
          
          projeto24: {
            title: 'CREF 12 / PE',
            category: 'institucional',
            description: 'Projetos arquitetônicos para adequações administrativas do CREF 12 em Pernambuco.',
            details: [
              { label: 'Cliente', value: 'CREF 12 – Conselho Regional de Educação Física' },
              { label: 'Localização', value: 'Pernambuco' },
              { label: 'Ano', value: '2023' },
            ],
            images: [
                './img/projetos/cref12/modal1.webp',
                './img/projetos/cref12/modal2.webp',
                './img/projetos/cref12/modal3.webp',
                './img/projetos/cref12/modal4.webp'
            ]
          },
          
          projeto25: {
            title: 'Polícia Militar de SP – Choque',
            category: 'institucional lazer',
            description: 'Projeto de reforma no mezanino do batalhão de polícia de choque, com espaço de convivência e lazer para os oficiais.',
            details: [
              { label: 'Cliente', value: 'Polícia Militar de São Paulo' },
              { label: 'Localização', value: 'São Paulo, SP' },
              { label: 'Ano', value: '2022' },
            ],
            images: [
                './img/projetos/pmsp/modal1.webp',
                './img/projetos/pmsp/modal2.webp',
                './img/projetos/pmsp/modal3.webp',
                './img/projetos/pmsp/modal4.webp'
            ]
          },      
          
          
          projeto26: {
            title: 'CMBH – Câmara Municipal de Belo Horizonte',
            category: 'institucional',
            description: 'Projetos técnicos para reforma e modernização do Palácio Francisco Bicalho, sede da Câmara de Belo Horizonte.',
            details: [
              { label: 'Cliente', value: 'Câmara Municipal de Belo Horizonte' },
              { label: 'Localização', value: 'Belo Horizonte, MG' },
              { label: 'Ano', value: '2023' },
            ],
            images: [
                './img/projetos/cmbh/modal1.webp',
                './img/projetos/cmbh/modal2.webp',
                './img/projetos/cmbh/modal3.webp',
                './img/projetos/cmbh/modal4.webp'
            ]
          },
          
          projeto27: {
            title: 'SIE / SC – Secretaria de Infraestrutura e Mobilidade',
            category: 'urbanismo',
            description: 'Projeto de revitalização urbana para áreas externas com foco em acessibilidade e paisagismo técnico.',
            details: [
              { label: 'Cliente', value: 'Secretaria de Infraestrutura e Mobilidade de SC' },
              { label: 'Localização', value: 'Santa Catarina' },
              { label: 'Ano', value: '2022' },
            ],
            images: [
                './img/projetos/sie/modal1.webp',
                './img/projetos/sie/modal2.webp',
                './img/projetos/sie/modal3.webp',
                './img/projetos/sie/modal4.webp'
            ]
          },
          
          projeto28: {
            title: 'SESC Pantanal / MT',
            category: 'hotelaria',
            description: 'Projeto de reforma no bloco de serviços do SESC Pantanal, incluindo vestiários e área de reciclagem.',
            details: [
              { label: 'Cliente', value: 'SESC – Pantanal' },
              { label: 'Localização', value: 'Mato Grosso' },
              { label: 'Ano', value: '2022' },
            ],
            images: [
                './img/projetos/sesc_mt/modal1.webp',
                './img/projetos/sesc_mt/modal2.webp',
                './img/projetos/sesc_mt/modal3.webp',
                './img/projetos/sesc_mt/modal4.webp'
            ]
          },
          
          projeto29: {
            title: 'SESC PA – Altamira',
            category: 'educacional hotelaria',
            description: 'Projeto de reforma da Unidade Operacional do SESC Altamira, com foco em ambientes escolares e de hospedagem.',
            details: [
              { label: 'Cliente', value: 'SESC Pará' },
              { label: 'Localização', value: 'Altamira, PA' },
              { label: 'Ano', value: '2022' },
            ],
            images: [
                './img/projetos/sesc_pa/modal1.webp',
                './img/projetos/sesc_pa/modal2.webp',
                './img/projetos/sesc_pa/modal3.webp',
                './img/projetos/sesc_pa/modal4.webp'
            ]
          },
          
          projeto30: {
            title: 'SECEC / RJ – Cinema na Cidade Mendes',
            category: 'lazer',
            description: 'Projeto arquitetônico e de interiores para instalação de cinema público na cidade de Mendes/RJ.',
            details: [
              { label: 'Cliente', value: 'Secretaria de Estado de Cultura e Economia Criativa do RJ' },
              { label: 'Localização', value: 'Mendes, RJ' },
              { label: 'Ano', value: '2023' },
            ],
            images: [
                './img/projetos/secec/modal1.webp',
                './img/projetos/secec/modal2.webp',
                './img/projetos/secec/modal3.webp',
                './img/projetos/secec/modal4.webp'
            ]
          },          

          projeto31: {
            title: 'Prefeitura de Araraquara - SP (Palco)',
            category: 'lazer',
            description: 'Prestação de serviços técnicos especializados em arquitetura e engenharia para apoio à Secretaria Municipal de Desenvolvimento Urbano, com elaboração e revisão de projetos prediais e urbanos, incluindo equipamentos e infraestrutura externa do município.',
            details: [
            { label: 'Cliente', value: 'Prefeitura Municipal de Araraquara / SP' },
            { label: 'Localização', value: 'Araraquara, SP' },            
            { label: 'Ano', value: '2023' }           
            ],
            images: [
                './img/projetos/araraquara_palco/modal3.webp',
                './img/projetos/araraquara_palco/modal2.webp',
                './img/projetos/araraquara_palco/modal1.webp',
                './img/projetos/araraquara_palco/modal4.webp'
            ]
        },

        projeto32: {
            title: 'SESI – Caruaru',
            category: 'Institucional/Administrativo, Educacional',
            description: 'Intervenções na unidade SESI Caruaru - Escola de Referência, com adequações de espaços escolares e administrativos.',
            details: [
            { label: 'Cliente', value: 'SESI-PE / Sistema FIEPE' },
            { label: 'Localização', value: 'Pernambuco' },            
            { label: 'Ano', value: '2022' }            
            ],
            images: [
                './img/projetos/sesi_caruaru/modal1.webp',
                './img/projetos/sesi_caruaru/modal2.webp',
                './img/projetos/sesi_caruaru/modal3.webp',
                './img/projetos/sesi_caruaru/modal4.webp'
            ]
        },

        projeto33: {
          title: 'SESI – Goiana',
          category: 'Educacional',
          description: 'Serviços de reforma e modernização na unidade do SESI Goiana.',
          details: [
              { label: 'Cliente', value: 'SESI-GO / Sistema FIEPE' },
              { label: 'Localização', value: 'Goiana, GO' },            
              { label: 'Ano', value: '2022' }            
          ],
          images: [
              './img/projetos/sesi_goiania/modal1.webp',
              './img/projetos/sesi_goiania/modal2.webp',
              './img/projetos/sesi_goiania/modal3.webp',
              './img/projetos/sesi_goiania/modal4.webp'
          ]
      },

        projeto34: {
        title: 'SESC Colatina – Educacional',
        category: 'Educacional',
        description: 'Projeto de reforma de biblioteca, laboratórios e ambientes escolares no SESC Colatina.',
        details: [
            { label: 'Cliente', value: 'SESC Espírito Santo' },
            { label: 'Localização', value: 'Colatina, ES' },            
            { label: 'Ano', value: '2023' }           
        ],
        images: [
            './img/projetos/sesc_colatina_educacional/modal1.webp',
            './img/projetos/sesc_colatina_educacional/modal2.webp',
            './img/projetos/sesc_colatina_educacional/modal3.webp',
            './img/projetos/sesc_colatina_educacional/modal4.webp'
        ]
      },

      projeto36: {
        title: 'SESI – Gama',
        category: 'Educacional',
        description: 'Projeto de fachada para a unidade SESI localizada em Gama, Distrito Federal.',
        details: [
          { label: 'Cliente', value: 'SESI-DF' },
          { label: 'Localização', value: 'Gama, DF' },
          { label: 'Ano', value: '2023' }
        ],
        images: [
          './img/projetos/sesi_gama/modal1.webp',
          './img/projetos/sesi_gama/modal2.webp'          
        ]
      },
      




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
                    mainImage.loading = 'lazy';
                    
                    const galleryThumbs = document.getElementById('gallery-thumbs');
                    galleryThumbs.innerHTML = '';
                    
                    project.images.forEach((image, index) => {
                        const thumb = document.createElement('div');
                        thumb.className = index === 0 ? 'gallery-thumb active' : 'gallery-thumb';
                        thumb.innerHTML = `<img src="${image}" alt="${project.title} - Imagem ${index + 1}" loading="lazy">`;
                        
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
});

    
    