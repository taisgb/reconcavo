# 🌐 Site Institucional — Recôncavo Engenharia e Arquitetura

Este projeto é um site institucional desenvolvido em HTML, CSS e JavaScript, com foco na apresentação de serviços, diferenciais técnicos e um portfólio de projetos com filtro dinâmico e modal interativo.

---

## ✨ Funcionalidades

- Layout 100% responsivo
- Seção de serviços com modal de detalhes
- Página de projetos com filtros por categoria
- Modal individual com galeria de imagens por projeto
- Lazy loading de imagens para melhor performance
- Organização visual por badges coloridas (filtros temáticos)
- Estilo visual baseado nas cores da marca (azul escuro e dourado)

---

## 🧱 Tecnologias utilizadas

- HTML5 + CSS3
- JavaScript (vanilla)
- Font Awesome (ícones)
- WebP (formato de imagem leve)
- CSS Grid e Flexbox
- Lazy loading nativo (`loading="lazy"`)

---

## 📁 Estrutura de diretórios

```
/
├── index.html
├── sobre.html
├── projetos.html
├── contato.html
├── style.css
├── script.js
├── script-projetos.js
├── projectsData.js (opcional, para modularização)
└── img/
    └── projetos/
        └── nome-do-projeto/
            ├── capa.webp
            ├── modal1.webp
            └── thumb1.webp
```

---

## 🖼 Organização dos projetos

Cada projeto é estruturado dentro do objeto `projectsData` contendo:

```js
projeto1: {
  title: 'Nome do Projeto',
  category: 'institucional educacional',
  description: 'Descrição resumida.',
  details: [
    { label: 'Cliente', value: 'Nome da instituição' },
    { label: 'Localização', value: 'Cidade, UF' },
    { label: 'Ano', value: '2023' }
  ],
  images: [
    './img/projetos/nome-do-projeto/modal1.webp',
    ...
  ]
}
```

---

## 🧠 Notas para manutenção

- Sempre usar `.webp` nas imagens
- Incluir `loading="lazy"` em todas as imagens não visíveis inicialmente
- Categorias devem corresponder ao `data-category` dos filtros
- Adicionar novos projetos tanto no HTML (`projetos.html`) quanto no `projectsData`

---

## 📦 Status

🔧 Projeto em desenvolvimento.  
🌟 Versão parcial enviada para validação do cliente.

---

## 👩‍💻 Desenvolvido por

**Taís Guimarães** 
