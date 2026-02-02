document.addEventListener('DOMContentLoaded', () => {
    renderCatalogFilters();
    renderCatalogGrid(plantsData);
    fillPlantSelect();
});

/* ===== Каталог ===== */

function renderCatalogFilters() {
    const filters = document.getElementById('catalog-filters');
    if (!filters) return;

    const categories = [
        { id: 'all', name: 'Все' },
        { id: 'trees', name: 'Деревья' },
        { id: 'grapes', name: 'Виноград' },
        { id: 'shrubs', name: 'Кустарники' },
        { id: 'vegetables', name: 'Овощи' }
    ];

    filters.innerHTML = categories.map(cat => `
        <button class="plant-filter-btn ${cat.id === 'all' ? 'active' : ''}"
                data-category="${cat.id}">
            ${cat.name}
        </button>
    `).join('');

    filters.addEventListener('click', e => {
        if (!e.target.dataset.category) return;

        document.querySelectorAll('.plant-filter-btn')
            .forEach(btn => btn.classList.remove('active'));

        e.target.classList.add('active');

        const category = e.target.dataset.category;
        const filtered = category === 'all'
            ? plantsData
            : plantsData.filter(p => p.category === category);

        renderCatalogGrid(filtered);
    });
}

function renderCatalogGrid(plants) {
    const grid = document.getElementById('catalog-grid');
    if (!grid) return;

    grid.innerHTML = plants.map(plant => `
        <div class="col-md-4 col-lg-3 mb-4">
            <div class="card h-100 text-center p-3 plant-card"
                 data-plant-id="${plant.id}">
                <div class="plant-icon-wrapper category-${plant.category}">
                    <i class="fas fa-seedling plant-icon"></i>
                </div>
                <h5 class="mt-3">${plant.name}</h5>
                <p class="text-muted small">${plant.description}</p>
            </div>
        </div>
    `).join('');

    // 👇 ВОТ ЭТОГО РАНЬШЕ НЕ БЫЛО
    document.querySelectorAll('.plant-card').forEach(card => {
        card.addEventListener('click', () => {
            const plantId = card.dataset.plantId;
            const select = document.getElementById('plantName');

            select.value = plantId;
            scrollToSection('diagnosis');
        });
    });
}


/* ===== Форма диагностики ===== */

function fillPlantSelect() {
    const select = document.getElementById('plantName');
    if (!select) return;

    select.innerHTML = `
        <option value="">Выберите растение...</option>
        ${plantsData.map(p =>
            `<option value="${p.id}">${p.name}</option>`
        ).join('')}
    `;
}
