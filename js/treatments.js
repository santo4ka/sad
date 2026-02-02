function getTreatmentsForDisease(diseaseId, methodType = 'оба') {
  return treatmentsData.filter(t =>
    t.related_diseases.includes(diseaseId) &&
    (methodType === 'оба' || t.method_type === methodType)
  );
}
