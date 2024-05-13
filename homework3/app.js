const productList = document.querySelector('.product-list');
const reviewContainer = document.getElementById('review-container');
const productNameInput = document.getElementById('product-name');
const productNameDisplay = document.getElementById('product-name-display');

// Функция для добавления отзыва
function addReview() {
	const productName = productNameInput.value.trim();
	const reviewText = document.getElementById('review-text').value.trim();

	if (productName && reviewText) {
		const reviews = JSON.parse(localStorage.getItem('reviews')) || {};
		const productReviews = reviews[productName] || [];
		productReviews.push(reviewText);
		reviews[productName] = productReviews;
		localStorage.setItem('reviews', JSON.stringify(reviews));

		productNameInput.value = '';
		document.getElementById('review-text').value = '';

		renderProductList();
	}
}

// Функция для отображения списка продуктов
function renderProductList() {
	const reviews = JSON.parse(localStorage.getItem('reviews')) || {};
	const productNames = Object.keys(reviews);

	productList.innerHTML = '';

	productNames.forEach(productName => {
		const listItem = document.createElement('li');
		listItem.classList.add('product-item');

		const productNameSpan = document.createElement('span');
		productNameSpan.textContent = productName;
		productNameSpan.addEventListener('click', () => {
			showReviews(productName);
			productNameInput.value = productName;
			productNameDisplay.textContent = "Отзывы о продукте " + productName; // Отображение названия продукта над списком отзывов
		});
		listItem.appendChild(productNameSpan);

		const deleteButton = document.createElement('button');
		deleteButton.classList.add('delete-button');
		deleteButton.textContent = 'Удалить продукт';
		deleteButton.addEventListener('click', () => deleteProduct(productName));
		listItem.appendChild(deleteButton);

		productList.appendChild(listItem);
	});
}

// Функция для отображения отзывов
function showReviews(productName) {
	const reviews = JSON.parse(localStorage.getItem('reviews')) || {};
	const productReviews = reviews[productName] || [];

	reviewContainer.innerHTML = '';

	productReviews.forEach((review, index) => {
		const reviewItem = document.createElement('div');
		reviewItem.classList.add('review-item');
		reviewItem.textContent = review;

		const deleteButton = document.createElement('button');
		deleteButton.classList.add('delete-button');
		deleteButton.textContent = 'Delete Review';
		deleteButton.addEventListener('click', () => deleteReview(productName, index));

		reviewItem.appendChild(deleteButton);
		reviewContainer.appendChild(reviewItem);
	});
}

// 	Функция для удаления отзыва
function deleteReview(productName, index) {
	const reviews = JSON.parse(localStorage.getItem('reviews')) || {};
	const productReviews = reviews[productName] || [];

	productReviews.splice(index, 1);
	reviews[productName] = productReviews;
	localStorage.setItem('reviews', JSON.stringify(reviews));

	showReviews(productName);
}

// Функция для удаления продукта
function deleteProduct(productName) {
	const reviews = JSON.parse(localStorage.getItem('reviews')) || {};
	delete reviews[productName];
	localStorage.setItem('reviews', JSON.stringify(reviews));


	renderProductList();
	reviewContainer.innerHTML = '';
	productNameDisplay.textContent = ''; // Очистка названия продукта над списком отзывов
	productNameInput.value = ''; // Очистка поля ввода названия продукта
}

renderProductList();