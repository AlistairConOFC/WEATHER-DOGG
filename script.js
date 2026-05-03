// ==================== 1. ПОГОДА (Open-Meteo) ====================
const weatherDiv = document.getElementById('weatherContent');
const refreshWeatherBtn = document.getElementById('refreshWeatherBtn');

// Координаты (Москва) – замените на свои
const lat = 55.7558;
const lon = 37.6176;

async function fetchWeather() {
    try {
        weatherDiv.innerHTML = `<div style="text-align: center;">⏳ Обновление погоды...</div>`;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (!data.current_weather) throw new Error('Нет данных');

        const current = data.current_weather;
        const temp = current.temperature;
        const wind = current.windspeed;
        const weatherCode = current.weathercode;

        const description = getWeatherDesc(weatherCode);
        weatherDiv.innerHTML = `
            <div class="weather-temp">${temp}°C</div>
            <div class="weather-desc">${description}</div>
            <div class="weather-details">
                🌬️ Ветер: ${wind} км/ч<br>
                📍 Координаты: ${lat}, ${lon}<br>
                🕒 ${new Date().toLocaleTimeString()}
            </div>
        `;
    } catch (error) {
        console.error('Ошибка погоды:', error);
        weatherDiv.innerHTML = `<div class="error-msg">❌ Ошибка загрузки погоды</div>`;
    }
}

function getWeatherDesc(code) {
    const map = {
        0: "☀️ Ясно", 1: "🌤️ Малооблачно", 2: "⛅ Облачно",
        3: "☁️ Пасмурно", 45: "🌫️ Туман", 61: "🌦️ Дождь", 71: "❄️ Снег"
    };
    return map[code] || "🌡️ Умеренно";
}

// ==================== 2. СЛУЧАЙНАЯ СОБАКА (Dog CEO) ====================
const dogDiv = document.getElementById('dogContent');
const newDogBtn = document.getElementById('newDogBtn');

async function fetchRandomDog() {
    try {
        dogDiv.innerHTML = `<div style="text-align: center;">🐕 Ищем собаку...</div>`;
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (data.status !== 'success') throw new Error('API вернул ошибку');
        dogDiv.innerHTML = `
            <img class="animal-img" src="${data.message}" alt="Случайная собака">
            <p>✨ Новая картинка!</p>
            <small>🕒 ${new Date().toLocaleTimeString()}</small>
        `;
    } catch (error) {
        console.error('Ошибка собаки:', error);
        dogDiv.innerHTML = `<div class="error-msg">🐾 Не удалось загрузить фото</div>`;
    }
}

// ==================== 3. СЛУЧАЙНАЯ КОШКА (The Cat API) ====================
const catDiv = document.getElementById('catContent');
const newCatBtn = document.getElementById('newCatBtn');

async function fetchRandomCat() {
    try {
        catDiv.innerHTML = `<div style="text-align: center;">🐱 Ищем кошку...</div>`;
        // Используем бесплатный эндпоинт без ключа
        const response = await fetch('https://api.thecatapi.com/v1/images/search');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (!data || data.length === 0) throw new Error('Нет данных');
        const imageUrl = data[0].url;
        catDiv.innerHTML = `
            <img class="animal-img" src="${imageUrl}" alt="Случайная кошка">
            <p>✨ Мяу! Новая кошечка</p>
            <small>🕒 ${new Date().toLocaleTimeString()}</small>
        `;
    } catch (error) {
        console.error('Ошибка кошки:', error);
        catDiv.innerHTML = `<div class="error-msg">🐈 Не удалось загрузить фото кошки</div>`;
    }
}

// ==================== ЗАПУСК И АВТООБНОВЛЕНИЕ ====================
fetchWeather();
fetchRandomDog();
fetchRandomCat();

refreshWeatherBtn.addEventListener('click', fetchWeather);
newDogBtn.addEventListener('click', fetchRandomDog);
newCatBtn.addEventListener('click', fetchRandomCat);

// Автообновление погоды каждые 30 секунд
setInterval(fetchWeather, 30000);
