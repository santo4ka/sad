function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[.,!?]/g, '')
    .trim();
}

function diagnosePlant({ plantId, month, problemText }) {
  const text = normalizeText(problemText);

  const results = diseasesData
    .filter(disease =>
      disease.affected_plants.includes(plantId) &&
      disease.season.includes(month)
    )
    .map(disease => {
      let score = 0;

      disease.symptoms.forEach(symptom => {
        if (text.includes(symptom)) {
          score++;
        }
      });

      return {
        disease,
        score,
        maxScore: disease.symptoms.length
      };
    })
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3); // топ-3

  return results.map(r => ({
    ...r,
    probability: Math.round((r.score / r.maxScore) * 100)
  }));
}
