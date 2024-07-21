//Импортируем модули
import express from 'express';
import Joi from 'joi';

//Инициализируем приложение
const app = express();

// Включаем обработку JSON
app.use(express.json());

// Инициализируем объект курсов
const courses = [
	{
		id: 1,
		name: 'Курс по Node.js',
		description:
			'В этом курсе мы будем изучать платформу с открытым исходным кодом для работы с языком JavaScript, построенная на движке Chrome V8. Благодаря ей разработчики пишут серверный код для веб-приложений и динамических веб-страниц, а также программ командной строки. Эту платформу называют Node.js.',
	},
	{
		id: 2,
		name: 'Курс по Git и GitHub',
		description:
			'Git — это развитая система контроля версий с активной поддержкой и открытым исходным кодом, которую используют тысячи разработчиков по всему миру.',
	},
	{
		id: 3,
		name: 'Фронтенд с нуля',
		description:
			'Погрузитесь в мир веб-разработки, освоив основные инструменты работы: HTML, CSS, JavaScript. Научитесь работать с дизайн-макетами и адаптивной версткой, сверстаете свои первые страницы и поймете, как строить карьерный трек в ИТ.',
	},
	{
		id: 4,
		name: 'DevOps с нуля',
		description:
			'Научитесь использовать инструменты и методы DevOps для автоматизации тестирования, сборки и развертывания кода, управления инфраструктурой и ускорения процесса доставки продуктов в продакшн. Станьте желанным специалистом в IT-индустрии и претендуйте на работу с высокой заработной платой.',
	},
	{
		id: 5,
		name: 'Реляционные БД. SQL',
		description:
			'Изучите все этапы проектирования, администрирования, резервирования и масштабирования БД.',
	},
];

// Функция для валидации курса
const validateCourse = course => {
	// Схема валидации
	const schema = Joi.object({
		name: Joi.string().min(3).required(),
	});

	// Возвращаем результат валидации
	return schema.validate(course);
};

// Обработчик главного пути
app.get('/', (request, response) => {
	// Отправляем ответ
	response.send(
		'Это простое API для получения информации о курсах. Список эндпоинтов: /api/courses – для получения списка курсов; /api/courses/:id – для получения конкретного курса.'
	);
});

// Обработчик для получения списка курсов
app.get('/api/courses', (request, response) => {
	// Отправляем ответ
	response.send(courses);
});

// Обработчик для создания нового курса
app.post('/api/courses', (request, response) => {
	// Валидация курса
	const { error } = validateCourse(request.body);
	// Если есть ошибка валидации, возвращаем ошибку
	if (error) {
		return response.status(400).send(error.details[0].message);
	}

	// Если нет ошибок, создаем курс
	const course = {
		id: courses.length + 1,
		name: request.body.name,
	};
	// Добавляем курс в объект
	courses.push(course);
	// Отправляем ответ
	response.send(course);
});

// Обработчик для получения конкретного курса по его ID
app.get('/api/courses/:id', (request, response) => {
	// Поиск курса по ID
	const course = courses.find(
		course => course.id === parseInt(request.params.id)
	);
	// Если курс не найден, возвращаем ошибку
	if (!course) {
		return response.status(404).send('Курс с таким ID не найден.');
	}
	// Если курс найден, возвращаем курс
	response.send(course);
});

// Обработчик для обновления информации о курсе
app.put('/api/courses/:id', (request, response) => {
	// Поиск курса по ID
	let course = courses.find(
		course => course.id === parseInt(request.params.id)
	);
	// Если курс не найден, возвращаем ошибку
	if (!course) {
		return response.status(404).send('Курс с таким ID не найден.');
	}
	// Валидация курса
	const { error } = validateCourse(request.body);
	// Если есть ошибка валидации, возвращаем ошибку
	if (error) {
		return response.status(400).send(error.details[0].message);
	}
	// Если нет ошибок, обновляем информацию о курсе
	course.name = request.body.name;
	// Отправляем ответ
	response.send(course);
});

// Обработчик для удаления курса
app.delete('/api/courses/:id', (request, response) => {
	// Поиск курса по ID
	const course = courses.find(
		course => course.id === parseInt(request.params.id)
	);
	// Если курс не найден, возвращаем ошибку
	if (!course) {
		return response.status(404).send('Курс с таким ID не найден.');
	}

	// Удаляем курс
	const index = courses.indexOf(course);
	// splice - удаляет элементы из массива
	courses.splice(index, 1);
	// Отправляем ответ
	response.send(course);
});

// Указываем порт
const port = process.env.PORT || 3000;

// Запускаем сервер
app.listen(port, () => {
	console.log(`Сервер запущен. Ссылка на API: http://localhost:${port}...`);
});
