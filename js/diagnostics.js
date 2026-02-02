document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('diagnosisForm');
    if (!form) return;

    form.addEventListener('submit', handleDiagnosis);
});

function handleDiagnosis(e) {
    e.preventDefault();

    const plantId = document.getElementById('plantName').value;
    const season = document.getElementById('season').value;
    const symptomsText = document.getElementById('problem').value.toLowerCase();
    const methodType = document.querySelector('input[name="methodType"]:checked').value;

    const resultDiv = document.getElementById('diagnosisResult');
    resultDiv.innerHTML = '';

    if (!plantId || !season || !symptomsText) {
        resultDiv.innerHTML = `<div class="alert alert-warning">Заполните все поля</div>`;
        return;
    }

    // 1️⃣ ищем болезни по растению и сезону
    let possibleDiseases = diseasesData.filter(d =>
        d.affected_plants.includes(plantId) &&
        d.season.includes(season)
    );

    // 2️⃣ проверяем совпадения по симптомам
    possibleDiseases = possibleDiseases.map(d => {
        let score = 0;
        d.symptoms.toLowerCase().split(',').forEach(symptom => {
            if (symptomsText.includes(symptom.trim())) score++;
        });
        return { ...d, score };
    }).filter(d => d.score > 0);

    if (possibleDiseases.length === 0) {
        resultDiv.innerHTML = `
            <div class="alert alert-info">
                Не удалось точно определить проблему.
                Попробуйте описать симптомы подробнее.
            </div>`;
        return;
    }

    // 3️⃣ сортируем по релевантности
    possibleDiseases.sort((a, b) => b.score - a.score);

    // 4️⃣ подбираем лечение
    const disease = possibleDiseases[0];

    let treatments = treatmentsData.filter(t =>
        t.related_diseases.includes(disease.id)
    );

    if (methodType !== 'оба') {
        treatments = treatments.filter(t => t.method_type === methodType);
    }

    // 5️⃣ рендер результата
    resultDiv.innerHTML = `
        <div class="result-card fade-in">
            <h4 class="result-title">${disease.name}</h4>
            <p><strong>Симптомы:</strong> ${disease.symptoms}</p>

            ${treatments.map(t => `
                <div class="result-products mt-3">
                    <h6>${t.name} (${t.method_type})</h6>
                    <p>${t.description}</p>
                    <p><strong>Препараты:</strong> ${t.products}</p>
                    <p class="result-schedule">${t.treatment_schedule}</p>
                </div>
            `).join('')}
        </div>
    `;
}
