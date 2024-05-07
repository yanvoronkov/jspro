// Задание 1
// Представьте, что у вас есть класс для управления библиотекой. В этом классе будет
// приватное свойство для хранения списка книг, а также методы для добавления книги,
// удаления книги и получения информации о наличии книги.

// Класс должен содержать приватное свойство #books, которое инициализируется пустым
// массивом и представляет собой список книг в библиотеке.

// Реализуйте геттер allBooks, который возвращает текущий список книг.

// Реализуйте метод addBook(title), который позволяет добавлять книгу в список.Если
// книга с таким названием уже существует в списке, выбросьте ошибку с соответствующим сообщением.

// Реализуйте метод removeBook(title), который позволит удалять книгу из списка по названию.
// Если книги с таким названием нет в списке, выбросьте ошибку с соответствующим сообщением.

// Реализуйте метод hasBook(title), который будет проверять наличие книги в библиотеке и
// возвращать true или false в зависимости от того, есть ли такая книга в списке или нет.

// Реализуйте конструктор, который принимает начальный список книг(массив) в качестве
// аргумента. Убедитесь, что предоставленный массив не содержит дубликатов; в противном случае выбрасывайте ошибку.

// class Library {

// 	#books = [];
// 	constructor(books) {
// 		this.#books = [...new Set(books)];
// 	}

// 	get allBooks() {
// 		return this.#books;
// 	}


// 	addBook(title) {
// 		if (this.#books.includes(title)) {
// 			throw new Error('Книга с таким названием уже существует');
// 		}
// 		this.#books.push(title);
// 	}

// 	removeBook(title) {
// 		if (!this.#books.includes(title)) {
// 			throw new Error('Книга с таким названием не существует');
// 		}
// 		this.#books = this.#books.filter(book => book !== title);
// 	}


// 	hasBook(title) {
// 		return this.#books.includes(title);
// 	}
// }


// const library = new Library(['Война и мир', 'Три мушкетера', 'Приключения Шерлока Холмса', 'Властелин Колец', 'Война и мир']);

// console.log(library.allBooks.join(',\n'));
// library.addBook('Золотой камень');
// console.log(library.allBooks.join(',\n'));
// library.removeBook('Властелин Колец');
// console.log(library.allBooks.join(',\n'));
// library.hasBook('Три мушкетера') ? console.log('Книга есть в библиотеке') : console.log('Книги нет в библиотеке');


// Задание 2
// Вы разрабатываете систему отзывов для вашего веб - сайта. Пользователи могут оставлять
// отзывы, но чтобы исключить слишком короткие или слишком длинные сообщения, вы решаете
// установить некоторые ограничения.

// Создайте HTML - структуру с текстовым полем для ввода отзыва, кнопкой для отправки и контейнером,
// где будут отображаться отзывы.

// Напишите функцию, которая будет добавлять отзыв в контейнер с отзывами. Однако, если
// длина введенного отзыва менее 50 или более 500 символов, функция должна генерировать исключение.

// При добавлении отзыва, он должен отображаться на странице под предыдущими отзывами, а не заменять их.

// const initialData = [
// 	{
// 		product: "Apple iPhone 13",
// 		reviews: [
// 			{
// 				id: "1",
// 				text: "Отличный телефон! Батарея держится долго.",
// 			},
// 			{
// 				id: "2",
// 				text: "Камера супер, фото выглядят просто потрясающе.",
// 			},
// 		],
// 	},
// 	{
// 		product: "Samsung Galaxy Z Fold 3",
// 		reviews: [
// 			{
// 				id: "3",
// 				text: "Интересный дизайн, но дорогой.",
// 			},
// 		],
// 	},
// 	{
// 		product: "Sony PlayStation 5",
// 		reviews: [
// 			{
// 				id: "4",
// 				text: "Люблю играть на PS5, графика на высоте.",
// 			},
// 		],
// 	},
// ];

// Вы можете использовать этот массив initialData для начальной загрузки данных при запуске вашего приложения.

const initialData = [
	{
		product: "Apple iPhone 13",
		reviews: [
			{
				id: "1",
				text: "Отличный телефон! Батарея держится долго.",
			},
			{
				id: "2",
				text: "Камера супер, фото выглядят просто потрясающе.",
			},
		],
	},
	{
		product: "Samsung Galaxy Z Fold 3",
		reviews: [
			{
				id: "3",
				text: "Интересный дизайн, но дорогой.",
			},
		],
	},
	{
		product: "Sony PlayStation 5",
		reviews: [
			{
				id: "4",
				text: "Люблю играть на PS5, графика на высоте.",
			},
		],
	},
];

document.getElementById("productSelect").addEventListener("change", filterReviews);
document.getElementById("addReview").addEventListener("click", addReview);

function filterReviews() {
	const selectedProduct = document.getElementById("productSelect").value;
	const reviewList = document.getElementById("reviewList");

	if (selectedProduct) {
		const filteredReviews = initialData
			.find((product) => product.product === selectedProduct)
			.reviews.map((review) => `<p class="review">${review.text}</p>`);

		reviewList.innerHTML = filteredReviews.join("");
	} else {
		reviewList.innerHTML = "";
	}
}

function addReview() {
	const reviewInput = document.getElementById("reviewInput");
	const selectedProduct = document.getElementById("productSelect").value;
	const reviewText = reviewInput.value.trim();

	if (selectedProduct && reviewText.length >= 5 && reviewText.length <= 500) {
		const newReview = {
			id: Date.now(),
			text: reviewText,
		};

		const productIndex = initialData.findIndex((product) => product.product === selectedProduct);
		initialData[productIndex].reviews.push(newReview);

		reviewInput.value = "";
		filterReviews();
	} else if (!selectedProduct) {
		alert("Please select a product.");
	} else if (reviewText.length < 5 || reviewText.length > 500) {
		alert("Review must be between 5 and 500 characters.");
	}
}

const productSelect = document.getElementById("productSelect");
initialData.forEach((product) => {
	const option = document.createElement("option");
	option.value = product.product;
	option.textContent = product.product;
	productSelect.appendChild(option);
});