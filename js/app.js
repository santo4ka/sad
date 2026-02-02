document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    populatePlantSelect(); // New function to populate select from data
});

// Настройка обработчиков событий
function setupEventListeners() {
    const form = document.getElementById('diagnosisForm');
    if (form) {
        form.addEventListener('submit', handleDiagnosisSubmit);
    }
}

// Заполнение выпадающего списка растений из базы данных
function populatePlantSelect() {
    const select = document.getElementById('plantName');
    if (!select) return;

    // Очистить текущие опции кроме первой
    while (select.options.length > 1) {
        select.remove(1);
    }

    // Сортировка растений по имени
    const sortedPlants = [...plantsData].sort((a, b) => a.name.localeCompare(b.name));

    sortedPlants.forEach(plant => {
        const option = document.createElement('option');
        option.value = plant.id;
        option.textContent = plant.name;
        select.appendChild(option);
    });
}

// Обработка отправки формы диагностики
function handleDiagnosisSubmit(event) {
    event.preventDefault();
    
    const formData = {
        plantId: document.getElementById('plantName').value,
        season: document.getElementById('season').value,
        problem: document.getElementById('problem').value.toLowerCase(),
        methodType: document.querySelector('input[name="methodType"]:checked').value
    };
    
    // Валидация
    if (!formData.plantId || !formData.season || !formData.problem) {
        alert('Пожалуйста, заполните все обязательные поля');
        return;
    }
    
    // Поиск подходящих болезней и вредителей
    const matches = findMatches(formData);
    
    if (matches.length === 0) {
        showNoResults(formData);
        return;
    }
    
    // Отображение результатов
    displayResults(matches, formData);
    
    // Прокрутка к результатам
    scrollToSection('results');
}

// Поиск совпадений по симптомам и сезону
function findMatches(formData) {
    const matches = [];
    
    // Найдем растение по ID
    const plant = plantsData.find(p => p.id === formData.plantId);
    if (!plant) return matches;
    
    // Поиск болезней и вредителей, подходящих по критериям
    diseasesData.forEach(disease => {
        // Проверяем, поражает ли эта болезнь наше растение
        if (!disease.affected_plants.includes(plant.id)) return;
        
        // Проверяем сезон
        if (!disease.season.includes(formData.season)) return;
        
        // Проверяем совпадение по симптомам (упрощенный поиск)
        const symptomsMatch = checkSymptomsMatch(disease.symptoms.toLowerCase(), formData.problem);
        
        if (symptomsMatch.match) {
            // Находим подходящие методы лечения
            const treatments = findTreatments(disease.id, formData.methodType);
            
            matches.push({
                disease: disease,
                plant: plant,
                treatments: treatments,
                confidence: symptomsMatch.confidence
            });
        }
    });
    
    // Сортируем по уверенности совпадения
    matches.sort((a, b) => b.confidence - a.confidence);
    
    return matches;
}

// Проверка совпадения симптомов
function checkSymptomsMatch(diseaseSymptoms, userDescription) {
    const keywords = extractKeywords(userDescription);
    const symptomsWords = diseaseSymptoms.split(/\s+/);
    
    let matches = 0;
    keywords.forEach(keyword => {
        if (symptomsWords.some(word => word.includes(keyword) || keyword.includes(word))) {
            matches++;
        }
    });
    
    // Если ключевых слов нет, считаем совпадение 0
    // Если есть, но нет совпадений - тоже 0
    const confidence = keywords.length > 0 ? matches / keywords.length : 0;
    
    // Снизим порог для демонстрации, или сделаем "всегда true" если описание слишком короткое
    // Но лучше оставить как есть.
    
    return {
        match: confidence > 0.1, // Совпадение хотя бы одного слова достаточно для мягкого поиска
        confidence: confidence
    };
}

// Извлечение ключевых слов из описания
function extractKeywords(description) {
    const stopWords = ['на', 'и', 'с', 'по', 'явление', 'появление', 'есть', 'стали', 'очень', 'сильно', 'как', 'что', 'где'];
    const words = description.split(/\s+/)
        .filter(word => word.length > 2 && !stopWords.includes(word))
        .map(word => word.replace(/[.,!?]/g, ''));
    
    return [...new Set(words)]; // Уникальные слова
}

// Поиск методов лечения
function findTreatments(diseaseId, methodType) {
    return treatmentsData.filter(treatment => {
        const hasDisease = treatment.related_diseases.includes(diseaseId);
        const hasMethodType = methodType === 'оба' || treatment.method_type === methodType;
        return hasDisease && hasMethodType;
    });
}

// Отображение результатов
function displayResults(matches, formData) {
    const resultsContainer = document.getElementById('resultsContainer');
    const resultsSection = document.getElementById('results');
    
    resultsContainer.innerHTML = '';
    
    matches.forEach(match => {
        match.treatments.forEach(treatment => {
            const resultCard = createResultCard(match, treatment, formData);
            resultsContainer.appendChild(resultCard);
        });
    });
    
    resultsSection.style.display = 'block';
    resultsSection.classList.add('fade-in');
}

// Создание карточки результата
function createResultCard(match, treatment, formData) {
    const card = document.createElement('div');
    card.className = 'col-lg-6 mb-4';
    
    const methodClass = treatment.method_type === 'химический' ? 'chemical' : 'biological';
    const methodIcon = treatment.method_type === 'химический' ? 'fa-flask' : 'fa-leaf';
    
    // Используем классы из CSS для цветов, не инлайн стили где возможно
    const iconColor = treatment.method_type === 'химический' ? '#dc3545' : '#20c997';
    const badgeType = treatment.method_type === 'химический' ? 'danger' : 'success';

    card.innerHTML = `
        <div class="card h-100 result-card ${methodClass}">
            <div class="card-body">
                <div class="text-center mb-3">
                    <i class="fas ${methodIcon} result-icon" style="color: ${iconColor}; font-size: 2rem; margin-bottom: 15px;"></i>
                    <h5 class="card-title result-title">${treatment.name}</h5>
                    <span class="badge bg-${badgeType}">
                        ${treatment.method_type.toUpperCase()}
                    </span>
                </div>
                
                <div class="mb-3">
                    <strong>Проблема:</strong>
                    <p class="mb-1">${match.disease.name}</p>
                    <small class="text-muted">${match.disease.symptoms}</small>
                </div>
                
                <div class="mb-3">
                    <strong>Растение:</strong> ${match.plant.name}
                </div>
                
                <div class="result-products mb-3">
                    <strong>Рекомендуемые препараты:</strong>
                    <p class="mb-0">${treatment.products}</p>
                </div>
                
                <div class="result-schedule mb-3">
                    <strong>Схема обработки:</strong>
                    <p class="mb-0">${treatment.treatment_schedule}</p>
                </div>
                
                <div class="mb-3">
                    <strong>Описание метода:</strong>
                    <p>${treatment.description}</p>
                </div>
                
                <button class="btn btn-outline-success btn-sm" onclick="showTreatmentDetails('${treatment.id}')">
                    <i class="fas fa-info-circle"></i> Подробнее
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Отображение отсутствия результатов
function showNoResults(formData) {
    const resultsContainer = document.getElementById('resultsContainer');
    const resultsSection = document.getElementById('results');
    
    resultsContainer.innerHTML = `
        <div class="col-12">
            <div class="card text-center">
                <div class="card-body">
                    <i class="fas fa-search-minus fa-3x text-warning mb-3"></i>
                    <h5 class="card-title">Точный диагноз не определен</h5>
                    <p class="card-text">
                        К сожалению, по вашему описанию не удалось точно определить проблему. 
                        Рекомендуем обратиться к специалисту или попробовать более подробно описать симптомы.
                    </p>
                    <div class="alert alert-info">
                        <strong>Полезные советы для описания:</strong>
                        <ul class="text-start mt-2">
                            <li>Укажите цвет пятен или налета</li>
                            <li>Опишите местоположение проблемы (листья, стебли, плоды)</li>
                            <li>Добавьте информацию о скорости распространения</li>
                            <li>Упомяните необычные погодные условия</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    resultsSection.style.display = 'block';
    resultsSection.classList.add('fade-in');
}

// Показ детальной информации о лечении
function showTreatmentDetails(treatmentId) {
    const treatment = treatmentsData.find(t => t.id === treatmentId);
    if (!treatment) return;
    
    const modalTitle = document.getElementById('treatmentModalTitle');
    const modalBody = document.getElementById('treatmentModalBody');
    
    modalTitle.textContent = treatment.name;
    modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-12">
                <h6>Описание метода:</h6>
                <p>${treatment.description}</p>
                
                <h6>Рекомендуемые препараты:</h6>
                <p>${treatment.products}</p>
                
                <h6>Схема обработки:</h6>
                <p>${treatment.treatment_schedule}</p>
                
                <div class="alert alert-${treatment.method_type === 'химический' ? 'danger' : 'success'}">
                    <strong>Тип метода:</strong> ${treatment.method_type.toUpperCase()}
                    <br>
                    <small>
                        ${treatment.method_type === 'химический' 
                            ? 'Химические препараты обеспечивают быстрый эффект, но требуют соблюдения мер предосторожности' 
                            : 'Биологические методы безопасны для окружающей среды и полезных насекомых'
                        }
                    </small>
                </div>
            </div>
        </div>
    `;
    
    const modal = new bootstrap.Modal(document.getElementById('treatmentModal'));
    modal.show();
}

// Прокрутка к секции
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}
