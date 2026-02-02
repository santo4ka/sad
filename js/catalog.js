document.addEventListener('DOMContentLoaded', function() {
    initCatalog();
});

function initCatalog() {
    const catalogContainer = document.getElementById('catalog-container');
    if (!catalogContainer) return;

    // Отрисовка кнопок фильтров
    renderFilters();
    
    // Отрисовка первой категории по умолчанию
    filterPlants('trees');
}

function renderFilters() {
    const filtersContainer = document.getElementById('catalog-filters');
    if (!filtersContainer) return;

    const categories = [
        { id: 'trees', name: 'Плодовые деревья', icon: 'fa-tree' },
        { id: 'grapes', name: 'Виноград', icon: 'fa-wine-glass-alt' },
        { id: 'shrubs', name: 'Кустарники', icon: 'fa-leaf' },
        { id: 'vegetables', name: 'Овощные культуры', icon: 'fa-carrot' }
    ];

    filtersContainer.innerHTML = '';

    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = `btn plant-filter-btn ${cat.id === 'trees' ? 'active' : ''}`;
        btn.setAttribute('data-category', cat.id);
        btn.innerHTML = `<i class="fas ${cat.icon}"></i> ${cat.name}`;
        
        btn.addEventListener('click', () => {
            // Удалить активный класс у всех
            document.querySelectorAll('.plant-filter-btn').forEach(b => b.classList.remove('active'));
            // Добавить активный класс текущей
            btn.classList.add('active');
            // Фильтровать
            filterPlants(cat.id);
        });

        filtersContainer.appendChild(btn);
    });
}

function filterPlants(category) {
    const grid = document.getElementById('catalog-grid');
    if (!grid) return;

    grid.innerHTML = '';
    
    // Эффект исчезновения (опционально)
    grid.style.opacity = '0';
    
    setTimeout(() => {
        const filtered = plantsData.filter(plant => plant.category === category);

        if (filtered.length === 0) {
            grid.innerHTML = '<div class="col-12 text-center"><p class="text-muted">В этой категории пока нет растений.</p></div>';
        } else {
            filtered.forEach(plant => {
                const card = createPlantCard(plant);
                grid.appendChild(card);
            });
        }
        
        // Появление
        grid.style.opacity = '1';
    }, 200);
}

function createPlantCard(plant) {
    const col = document.createElement('div');
    col.className = 'col-lg-3 col-md-4 col-sm-6 mb-4 fade-in';

    // Выбор иконки в зависимости от категории
    let icon = 'fa-seedling';
    let categoryClass = `category-${plant.category}`;
    
    if (plant.category === 'trees') icon = 'fa-tree';
    if (plant.category === 'grapes') icon = 'fa-wine-bottle'; // fa-grapes is pro, use wine-bottle or similar
    if (plant.category === 'vegetables') icon = 'fa-carrot';
    if (plant.category === 'shrubs') icon = 'fa-spa';

    // Специальные иконки для конкретных растений если нужно, но оставим общие
    if (plant.id.includes('apple')) icon = 'fa-apple-alt';
    if (plant.id.includes('lemon')) icon = 'fa-lemon';

    col.innerHTML = `
        <div class="card h-100 text-center p-3">
            <div class="plant-icon-wrapper ${categoryClass}">
                <i class="fas ${icon} plant-icon"></i>
            </div>
            <div class="card-body p-2">
                <h5 class="card-title fw-bold text-dark">${plant.name}</h5>
                <p class="card-text small text-muted">${plant.description}</p>
            </div>
            <div class="card-footer bg-transparent border-0">
                <button class="btn btn-sm btn-outline-success w-100" onclick="startDiagnosis('${plant.id}')">
                    <i class="fas fa-stethoscope"></i> Диагностика
                </button>
            </div>
        </div>
    `;

    return col;
}

// Функция быстрого перехода к диагностике
function startDiagnosis(plantId) {
    const select = document.getElementById('plantName');
    if (select) {
        select.value = plantId;
        scrollToSection('diagnosis');
        
        // Визуально подсветить поле
        select.classList.add('border-success');
        setTimeout(() => select.classList.remove('border-success'), 1500);
    }
}
