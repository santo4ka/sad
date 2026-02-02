// База данных растений
const plantsData = [
    // --- ПЛОДОВЫЕ ДЕРЕВЬЯ ---
    { id: 'apple', name: 'Яблоня', category: 'trees', description: 'Самое популярное плодовое дерево. Сорта: Антоновка, Белый налив, Мельба.' },
    { id: 'pear', name: 'Груша', category: 'trees', description: 'Дерево с сладкими плодами. Сорта: Конференция, Дюшес, Чижовская.' },
    { id: 'plum', name: 'Слива', category: 'trees', description: 'Косточковая культура. Сорта: Венгерка, Ренклод.' },
    { id: 'cherry', name: 'Вишня', category: 'trees', description: 'Популярная косточковая культура для варенья и компотов.' },
    { id: 'sweet_cherry', name: 'Черешня', category: 'trees', description: 'Сладкая "сестра" вишни, созревает рано.' },
    { id: 'apricot', name: 'Абрикос', category: 'trees', description: 'Теплолюбивое дерево с оранжевыми плодами.' },
    { id: 'peach', name: 'Персик', category: 'trees', description: 'Требовательное к теплу дерево с бархатистыми плодами.' },
    { id: 'cherry_plum', name: 'Алыча', category: 'trees', description: 'Неприхотливая родственница сливы.' },

    // --- ВИНОГРАД (Отдельно) ---
    { id: 'grape_table', name: 'Виноград столовый', category: 'grapes', description: 'Сорта для еды: Аркадия, Лора, Кишмиш.' },
    { id: 'grape_wine', name: 'Виноград технический', category: 'grapes', description: 'Сорта для вина и сока: Изабелла, Каберне, Шардоне.' },

    // --- КУСТАРНИКИ ---
    { id: 'currant_black', name: 'Смородина черная', category: 'shrubs', description: 'Лидер по содержанию витамина С.' },
    { id: 'currant_red', name: 'Смородина красная', category: 'shrubs', description: 'Урожайный кустарник для желе и морсов.' },
    { id: 'gooseberry', name: 'Крыжовник', category: 'shrubs', description: 'Колючий кустарник, "северный виноград".' },
    { id: 'raspberry', name: 'Малина', category: 'shrubs', description: 'Полукустарник с сладкими ягодами. Есть ремонтантные сорта.' },
    { id: 'blackberry', name: 'Ежевика', category: 'shrubs', description: 'Родственница малины с черными ягодами.' },
    { id: 'honeysuckle', name: 'Жимолость', category: 'shrubs', description: 'Самая ранняя ягода в саду, синяя и полезная.' },
    { id: 'sea_buckthorn', name: 'Облепиха', category: 'shrubs', description: 'Двудомное растение с оранжевыми целебными ягодами.' },
    // Клубнику часто ищут тут, хоть это и трава
    { id: 'strawberry', name: 'Клубника (Земляника)', category: 'shrubs', description: 'Самая популярная ягода на грядках.' }, 

    // --- ОВОЩНЫЕ КУЛЬТУРЫ ---
    { id: 'tomato', name: 'Томат', category: 'vegetables', description: 'Главный овощ теплиц и открытого грунта.' },
    { id: 'cucumber', name: 'Огурец', category: 'vegetables', description: 'Влаголюбивая культура, требует частого полива.' },
    { id: 'pepper', name: 'Перец сладкий', category: 'vegetables', description: 'Теплолюбивая культура, богатая витаминами.' },
    { id: 'potato', name: 'Картофель', category: 'vegetables', description: 'Основная продовольственная культура ("второй хлеб").' },
    { id: 'carrot', name: 'Морковь', category: 'vegetables', description: 'Корнеплод, источник каротина.' },
    { id: 'beet', name: 'Свекла', category: 'vegetables', description: 'Неприхотливый корнеплод для борща и салатов.' },
    { id: 'onion', name: 'Лук репчатый', category: 'vegetables', description: 'Обязательная культура на любом огороде.' },
    { id: 'garlic', name: 'Чеснок', category: 'vegetables', description: 'Озимый и яровой, природный антибиотик.' },
    { id: 'cabbage', name: 'Капуста', category: 'vegetables', description: 'Белокочанная, цветная, брокколи.' },
    { id: 'zucchini', name: 'Кабачок', category: 'vegetables', description: 'Самый урожайный и неприхотливый овощ.' },
    { id: 'eggplant', name: 'Баклажан', category: 'vegetables', description: 'Требователен к теплу и защите от жуков.' },
    { id: 'pumpkin', name: 'Тыква', category: 'vegetables', description: 'Королева осеннего огорода.' },
    { id: 'radish', name: 'Редис', category: 'vegetables', description: 'Самый ранний весенний овощ.' },
    { id: 'greens', name: 'Зелень', category: 'vegetables', description: 'Укроп, петрушка, салаты, базилик.' }
];


// === Болезни и вредители ===
const diseasesData = [
  {
    id: 'scab',
    name: 'Парша',
    type: 'болезнь',
    symptoms: [
      'темные пятна',
      'черные пятна',
      'пятна на листьях',
      'пятна на плодах',
      'трещины на плодах'
    ],
    season: ['апрель', 'май', 'июнь'],
    affected_plants: ['apple', 'pear']
  },
  {
    id: 'aphid',
    name: 'Тля',
    type: 'вредитель',
    symptoms: [
      'листья скручиваются',
      'скручивание листьев',
      'липкий налет',
      'мелкие насекомые'
    ],
    season: ['май', 'июнь', 'июль'],
    affected_plants: ['apple', 'plum', 'cherry', 'currant_black', 'cucumber', 'pepper']
  },
  {
    id: 'powdery_mildew',
    name: 'Мучнистая роса',
    type: 'болезнь',
    symptoms: [
      'белый налет',
      'мучнистый налет',
      'белый порошок',
      'побелели листья'
    ],
    season: ['июнь', 'июль', 'август'],
    affected_plants: ['gooseberry', 'currant_black', 'cucumber', 'zucchini', 'apple']
  },
  {
    id: 'blight',
    name: 'Фитофтора',
    type: 'болезнь',
    symptoms: [
      'бурые пятна',
      'коричневые пятна',
      'гниль плодов',
      'почернение листьев'
    ],
    season: ['июль', 'август'],
    affected_plants: ['tomato', 'potato']
  },
  {
    id: 'spider_mite',
    name: 'Паутинный клещ',
    type: 'вредитель',
    symptoms: [
      'паутинка',
      'мелкие светлые точки',
      'листья светлеют',
      'сухие листья'
    ],
    season: ['июнь', 'июль', 'август'],
    affected_plants: ['cucumber', 'eggplant', 'pepper']
  }
];


// База данных методов лечения
const treatmentsData = [
    {
        id: 'fungicide_universal',
        name: 'Фунгицидная обработка',
        method_type: 'химический',
        description: 'Обработка препаратами против грибковых инфекций.',
        products: 'Скор, Хорус, Топаз, Бордоская жидкость',
        related_diseases: ['scab', 'blight', 'powdery_mildew', 'moniliosis'],
        treatment_schedule: 'Весной до цветения, сразу после цветения и при появлении признаков.'
    },
    {
        id: 'insecticide_universal',
        name: 'Инсектицидная обработка',
        method_type: 'химический',
        description: 'Борьба с насекомыми-вредителями.',
        products: 'Актара, Искра, Фуфанон, Корадо',
        related_diseases: ['aphid', 'colorado_beetle'],
        treatment_schedule: 'При появлении вредителей.'
    },
    {
        id: 'acaricide',
        name: 'Обработка от клещей',
        method_type: 'химический',
        description: 'Специальные препараты против клещей (акарициды).',
        products: 'Фитоверм, Антиклещ, Клещевит',
        related_diseases: ['spider_mite'],
        treatment_schedule: 'При обнаружении вредителя, повтор через 5-7 дней.'
    },
    {
        id: 'bio_protection',
        name: 'Биозащита',
        method_type: 'биологический',
        description: 'Безопасные бактериальные препараты.',
        products: 'Фитоспорин-М, Трихоцермин, Гамаир',
        related_diseases: ['scab', 'blight', 'powdery_mildew', 'moniliosis'],
        treatment_schedule: 'Каждые 10-14 дней для профилактики.'
    },
    {
        id: 'folk_remedies',
        name: 'Народные средства',
        method_type: 'биологический',
        description: 'Использование подручных средств.',
        products: 'Мыльный раствор, настой золы, настой чеснока',
        related_diseases: ['aphid', 'powdery_mildew'],
        treatment_schedule: 'Регулярно при малом количестве вредителей.'
    }
];
