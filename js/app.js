// ===================================================
// Каталог рецептів напоїв — Варіант 15
// ===================================================

// Оголошення даних
const recipes = [
    { 
        name: 'Класичний капучино', 
        category: 'coffee', 
        typeText: 'Кава',
        badgeClass: 'badge--coffee', 
        alcohol: false, 
        timeMinutes: 3, 
        difficulty: 'Середній',
        description: 'Ідеальний баланс еспресо та ніжнішої збитої молочної пінки.',
        imgSrc: 'assets/img/cappuccino.jpg' 
    },
    { 
        name: 'Матча лате', 
        category: 'tea', 
        typeText: 'Чай',
        badgeClass: 'badge--tea', 
        alcohol: false, 
        timeMinutes: 5, 
        difficulty: 'Легкий',
        description: 'Японський зелений чай із шовковистим молоком.',
        imgSrc: 'assets/img/matcha.jpg' 
    },
    { 
        name: 'Ягідний смузі', 
        category: 'smoothies', 
        typeText: 'Смузі та фреші',
        badgeClass: 'badge--smoothies', 
        alcohol: false, 
        timeMinutes: 5, 
        difficulty: 'Легкий',
        description: 'Густий вітамінний напій на основі свіжих лісових ягід та банана.',
        imgSrc: 'assets/img/berry-smoothie.jpg' 
    },
    { 
        name: 'Безалкогольний Мохіто', 
        category: 'cocktails', 
        typeText: 'Коктейлі',
        badgeClass: 'badge--cocktails', 
        alcohol: false, 
        timeMinutes: 7, 
        difficulty: 'Легкий',
        description: 'Освіжаючий класичний коктейль з лаймом, м\'ятою та содовою.',
        imgSrc: 'assets/img/mojito.jpg' 
    },
    { 
        name: 'Піна колада', 
        category: 'cocktails', 
        typeText: 'Коктейлі',
        badgeClass: 'badge--cocktails', 
        alcohol: true, 
        timeMinutes: 10, 
        difficulty: 'Легкий',
        description: 'Тропічний солодкий коктейль з ананасовим соком, кокосовим молоком та ромом.',
        imgSrc: 'assets/img/pina-colada.jpg' 
    },
    { 
        name: 'М\'ятно-лаймовий лимонад', 
        category: 'lemonades', 
        typeText: 'Лимонади',
        badgeClass: 'badge--lemonades', 
        alcohol: false, 
        timeMinutes: 15, 
        difficulty: 'Легкий',
        description: 'Домашній освіжаючий лимонад із листям свіжої м\'яти.',
        imgSrc: 'assets/img/mint-lime-lemonade.jpg' 
    }
];

// Крок 3: вибір контейнерів категорій у script.js за допомогою querySelector
const categoryContainers = {
    coffee: document.querySelector('#coffee-list'),
    tea: document.querySelector('#tea-list'),
    smoothies: document.querySelector('#smoothies-list'),
    cocktails: document.querySelector('#cocktails-list'),
    lemonades: document.querySelector('#lemonades-list')
};

// Вибір підсумкового елемента
const drinksCountElement = document.querySelector('#drinks-count');

// Карта допоміжних назв категорій для відображення
const categoryMeta = {
    coffee: { typeText: 'Кава', badgeClass: 'badge--coffee' },
    tea: { typeText: 'Чай', badgeClass: 'badge--tea' },
    smoothies: { typeText: 'Смузі та фреші', badgeClass: 'badge--smoothies' },
    cocktails: { typeText: 'Коктейлі', badgeClass: 'badge--cocktails' },
    lemonades: { typeText: 'Лимонади', badgeClass: 'badge--lemonades' }
};

// Крок 4: функція рендеру списку даних у DOM
function renderDrinks(recipeList) {
    // Очищення вмісту всіх контейнерів
    Object.values(categoryContainers).forEach(container => {
        if (container) container.innerHTML = '';
    });

    // Лічильник для підсумку
    let nonAlcoholicCount = 0;

    // Цикл перебору елементів масиву (for...of / forEach)
    recipeList.forEach(recipe => {
        // Крок 5: створення тегу <article> та вкладених елементів
        const card = document.createElement('article');
        card.classList.add('recipe-card');

        // Створення обгортки зображення
        const imgWrapper = document.createElement('div');
        imgWrapper.classList.add('card-image-wrapper');

        // Створення бейджа категорії
        const badge = document.createElement('span');
        badge.classList.add('badge', recipe.badgeClass);
        badge.textContent = recipe.typeText;

        const img = document.createElement('img');
        img.src = recipe.imgSrc;
        
        // Крок 6: встановлення атрибута img.alt
        img.setAttribute('alt', `Напій ${recipe.name}`);

        imgWrapper.append(badge, img);

        // Контент картки
        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');

        // Крок 5: поле h3 name
        const title = document.createElement('h3');
        title.textContent = recipe.name;

        // Поле метаінформації (час та складність)
        const meta = document.createElement('div');
        meta.classList.add('recipe-meta');

        const timeSpan = document.createElement('span');
        timeSpan.textContent = `⏱️ ${recipe.timeMinutes} хв`;

        const dotSpan = document.createElement('span');
        dotSpan.textContent = '•';

        const diffSpan = document.createElement('span');
        diffSpan.textContent = `📊 ${recipe.difficulty}`;

        meta.append(timeSpan, dotSpan, diffSpan);

        // Крок 5: поле p (опис рецепта)
        const descParagraph = document.createElement('p');
        descParagraph.textContent = recipe.description;

        cardContent.append(title, meta, descParagraph);
        card.append(imgWrapper, cardContent);

        // Крок 6: встановлення дата-атрибута data-time
        card.dataset.time = `${recipe.timeMinutes} хв`;

        // Крок 6: додавання класу non-alcoholic, якщо безалкогольний напій
        if (!recipe.alcohol) {
            card.classList.add('non-alcoholic');
            nonAlcoholicCount++;
        }

        // КРОК 7: додавання створеного елемента у відповідний контейнер категорії
        const targetContainer = categoryContainers[recipe.category];
        if (targetContainer) {
            targetContainer.append(card);
        }
    });

    // Крок 9: оновлення підсумкового елемента поза списком
    if (drinksCountElement) {
        drinksCountElement.textContent = `Безалкогольних рецептів: ${nonAlcoholicCount}`;
    }
}

// Крок 8: виклик функції рендеру при завантаженні сторінки
renderDrinks(recipes);


// =========================
// Практична робота №8
// =========================

// Крок 2: вибір форми у script.js
const addRecipeForm = document.querySelector('#add-recipe-form');
const timeInput = document.querySelector('#recipe-time');

// Крок 8: додаткова валідація на подію input для поля timeMinutes
timeInput.addEventListener('input', () => {
    const value = Number(timeInput.value);
    if (value <= 0) {
        // Повідомлення про помилку
        timeInput.setCustomValidity('Час приготування має бути більшим за 0!');
    } else {
        timeInput.setCustomValidity('');
    }
});

// Додавання слухача події submit на форму
addRecipeForm.addEventListener('submit', event => {
    // Крок 3: скасування стандартного перезавантаження сторінки
    event.preventDefault();

    // Крок 4: зчитування значень полів форми
    const name = document.querySelector('#recipe-name').value.trim();
    const category = document.querySelector('#recipe-type').value;
    const timeMinutes = Number(document.querySelector('#recipe-time').value);
    const alcohol = document.querySelector('#recipe-alcohol').checked;

    // Отримання метаінформації про категорію
    const metaInfo = categoryMeta[category] || { typeText: 'Напій', badgeClass: 'badge--coffee' };

    // Крок 5: збирання нового об'єкта та додавання його в масив
    const newRecipe = {
        name: name,
        category: category,
        typeText: metaInfo.typeText,
        badgeClass: metaInfo.badgeClass,
        alcohol: alcohol,
        timeMinutes: timeMinutes,
        difficulty: 'Легкий',
        description: 'Свіжододаний домашній рецепт.',
        imgSrc: 'assets/img/cappuccino.jpg'
    };

    recipes.push(newRecipe);

    // Крок 6: повторне перемальовування списку з оновленим масивом
    renderDrinks(recipes);

    // Крок 7: очищення форми після успішного додавання
    addRecipeForm.reset();
});

// Крок 9: друга подія варіанта — фільтрація

// Вибір чекбокса «Лише безалкогольні»
const nonAlcoholicFilter = document.querySelector('#non-alcoholic-filter');

nonAlcoholicFilter.addEventListener('change', () => {
    if (nonAlcoholicFilter.checked) {
        // Фільтрація масиву, яка залишає лише безалкогольні рецепти
        const filtered = recipes.filter(recipe => !recipe.alcohol);
        renderDrinks(filtered);
    } else {
        // Показуємо повний список рецептів
        renderDrinks(recipes);
    }
});