// ===================================================
// Каталог рецептів напоїв — Варіант 15
// ===================================================

// Константа базового URL API TheCocktailDB
const API_BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

// Оголошення даних
let recipes = [
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

const drinksCountElement = document.querySelector('#drinks-count');
const loadingIndicator = document.querySelector('#loading-indicator');
const errorMessage = document.querySelector('#error-message');

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
        badge.classList.add('badge', recipe.badgeClass || 'badge--cocktails');
        badge.textContent = recipe.typeText || 'Коктейлі';;

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
        timeSpan.textContent = `⏱️ ${recipe.timeMinutes || 5} хв`;

        const dotSpan = document.createElement('span');
        dotSpan.textContent = '•';

        const diffSpan = document.createElement('span');
        diffSpan.textContent = `📊 ${recipe.difficulty || 'Легкий'}`;

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

        // Крок 7: додавання створеного елемента у відповідний контейнер категорії
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


// ==================================
// Практична робота №9
// ==================================


 // Крок 2: async-функція запиту до зовнішнього API TheCocktailDB (https://www.thecocktaildb.com/api/json/v1/1/search.php?s=)
async function loadCocktailsFromAPI(query = 'margarita') {
    // Крок 7: показуємо стан завантаження та ховаємо старі помилки
    if (loadingIndicator)
        loadingIndicator.style.display = 'block';

    if (errorMessage)
        errorMessage.style.display = 'none';

    try {
        // Крок 3: виконання fetch запит
        const response = await fetch(`${API_BASE_URL}${encodeURIComponent(query)}`);

        // Крок 4: перевірка HTTP-статусу (200-299)
        if (!response.ok) {
            throw new Error(`Сервер відповів помилкою із кодом: ${response.status}`);
        }

        // Крок 5: розбір JSON
        const data = await response.json();
        console.log('Отримані дані з TheCocktailDB API:', data);

        // drinks null, коли нічого не знайдено
        if (!data.drinks) {
            throw new Error('Рецептів за такою назвою не знайдено');
        }

        // Перетворення даних з API у структуру застосунку
        const apiRecipes = data.drinks.map(item => {
            const isNonAlcoholic = item.strAlcoholic === 'Non alcoholic';
            return {
                name: item.strDrink,
                category: 'cocktails', // Додавання у секцію коктейлів
                typeText: item.strAlcoholic || 'Коктейль',
                badgeClass: isNonAlcoholic ? 'badge--smoothies' : 'badge--cocktails',
                alcohol: !isNonAlcoholic,
                timeMinutes: Math.floor(Math.random() * 8) + 3, // Випадковий час для метаданих
                difficulty: 'Середній',
                description: item.strInstructions ? item.strInstructions.slice(0, 100) + '...' : 'Смачний рецепт напою.',
                imgSrc: item.strDrinkThumb
            };
        });

        // Оновлюємо головний масив recipes, щоб фільтрація з ЛР8 працювала коректно
        recipes = apiRecipes;

        // Крок 6: виведення нових даних у DOM через функцію рендеру
        renderDrinks(apiRecipes);

    } catch (error) {
        // Крок 8: повідомлення про помилку користувачу
        console.error('Помилка при завантаженні API:', error);
        
        if (errorMessage) {
            errorMessage.style.display = 'block';
            // Перевірка мережевої помилки
            if (error.name === 'TypeError' || error.message.includes('Failed to fetch')) {
                errorMessage.textContent = '⚠️ Не вдалося з\'єднатися з сервером. Перевірте підключення до Інтернету.';
            } else {
                errorMessage.textContent = `⚠️ ${error.message}`;
            }
        }
    } finally {
        // Крок 7: вимикання видимості стану завантаження незалежно від результату
        if (loadingIndicator)
            loadingIndicator.style.display = 'none';
    }
}

// Крок 10: прив'язка викликів до кнопок пошуку та "Оновити"
const fetchApiBtn = document.querySelector('#fetch-api-btn');
const refreshApiBtn = document.querySelector('#refresh-api-btn');
const apiSearchInput = document.querySelector('#api-search-input');

if (fetchApiBtn) {
    fetchApiBtn.addEventListener('click', () => {
        const query = apiSearchInput ? apiSearchInput.value.trim() : 'margarita';
        if (query)
            loadCocktailsFromAPI(query);
    });
}

if (refreshApiBtn) {
    refreshApiBtn.addEventListener('click', () => {
        const query = apiSearchInput ? apiSearchInput.value.trim() : 'margarita';
        loadCocktailsFromAPI(query);
    });
}


// ==================================
// Практична робота №8
// ==================================

const addRecipeForm = document.querySelector('#add-recipe-form');
const timeInput = document.querySelector('#recipe-time');

if (timeInput) {
    timeInput.addEventListener('input', () => {
        if (Number(timeInput.value) <= 0) {
            timeInput.setCustomValidity('Час приготування має бути більшим за 0 хв!');
        } else {
            timeInput.setCustomValidity('');
        }
    });
}

if (addRecipeForm) {
    addRecipeForm.addEventListener('submit', event => {
        event.preventDefault();

        const name = document.querySelector('#recipe-name').value.trim();
        const category = document.querySelector('#recipe-type').value;
        const timeMinutes = Number(timeInput.value);
        const alcohol = document.querySelector('#recipe-alcohol').checked;

        const metaInfo = categoryMeta[category] || { typeText: 'Напій', badgeClass: 'badge--coffee' };

        const newRecipe = {
            name: name,
            category: category,
            typeText: metaInfo.typeText,
            badgeClass: metaInfo.badgeClass,
            alcohol: alcohol,
            timeMinutes: timeMinutes,
            difficulty: 'Легкий',
            description: 'Свіжододаний домашній авторський рецепт.',
            imgSrc: 'assets/img/cappuccino.jpg'
        };

        recipes.push(newRecipe);
        renderDrinks(recipes);
        addRecipeForm.reset();
    });
}

const nonAlcoholicFilter = document.querySelector('#non-alcoholic-filter');
if (nonAlcoholicFilter) {
    nonAlcoholicFilter.addEventListener('change', () => {
        if (nonAlcoholicFilter.checked) {
            const nonAlcoholicOnly = recipes.filter(recipe => !recipe.alcohol);
            renderDrinks(nonAlcoholicOnly);
        } else {
            renderDrinks(recipes);
        }
    });
}