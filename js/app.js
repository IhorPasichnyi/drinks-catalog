// Крок 3: перевірка підключення файлу
console.log('app.js підключено');

// Крок 4: оголошення масива рецептів напоїв
const recipies = [
    { name: 'Класичний капучино', alcohol: false, timeMinutes: 3 },
    { name: 'Матча лате', alcohol: false, timeMinutes: 5 },
    { name: 'Ягідний смузі', alcohol: false, timeMinutes: 5 },
    { name: 'Безалкогольний Мохіто', alcohol: false, timeMinutes: 7 },
    { name: 'М\'ятно-лаймовий лимонад', alcohol: false, timeMinutes: 15 },
    { name: 'Піна колада', alcohol: true, timeMinutes: 15 }
]

// Крок 5: функція для фільтрації та виведення лише безалкогольних рецептів
function printNonAlcoholicRecipies(recipeList){
    console.log('--- Список безалкогольних напоїв ---');

    let count = 0;
    for (const recipe of recipeList){
        // Крок 6: перевірка, чи є напій безалкогольним (alcohol === false)
        if (!recipe.alcohol){
            count++;
            console.log(`${count}. ${recipe.name} (час приготування: ${recipe.timeMinutes} хв)`);
        }
    }
    console.log(`Всього знайдено безалкогольних напоїв: ${count}`);
}

// Виклик функції
printNonAlcoholicRecipies(recipies);

// Крок 7: стрілкова функція для перевірки, чи є рецепт швидким (<= 5 хвилин)
const isQuick = time => time <= 5;

// Перевірка роботи стрілкової функції
console.log('--- Перевірка функції isQuick ---');
for (const recipe of recipies){
    console.log(`Напій "${recipe.name}" (${recipe.timeMinutes} хв -> ${isQuick(recipe.timeMinutes) ? 'Швидко готується' : 'Потребує більше часу'})`);
}