// Задание 1
// Используя Symbol.iterator, создайте объект "Музыкальная коллекция",
// который можно итерировать.Каждая итерация должна возвращать следующий альбом из коллекции.

// Создайте объект musicCollection, который содержит массив альбомов и
// имеет свойство - символ Symbol.iterator.Каждый альбом имеет следующую структуру:

// {
// 	title: "Название альбома",
// 		artist: "Исполнитель",
// 			year: "Год выпуска"
// }

// Реализуйте кастомный итератор для объекта musicCollection.Итератор должен
// перебирать альбомы по порядку.
// Используйте цикл for...of для перебора альбомов в музыкальной коллекции
// и вывода их на консоль в формате: Название альбома - Исполнитель(Год выпуска)

const musicCollection = {
	[Symbol.iterator]() {
		const albums = [
			{
				title: "The Dark Side of the Moon",
				artist: "Pink Floyd",
				year: 1973
			},
			{
				title: "Wish You Were Here",
				artist: "Pink Floyd",
				year: 1975
			},
			{
				title: "Animals",
				artist: "Pink Floyd",
				year: 1979
			},
			{
				title: "Meddle",
				artist: "Pink Floyd",
				year: 1978
			}
		];
		let index = 0;
		return {
			next() {
				if (index < albums.length) {
					return {
						value: albums[index++],
						done: false
					};
				} else {
					return {
						done: true
					};
				}
			}
		};
	}
};

for (const album of musicCollection) {
	console.log(`${album.title} - ${album.artist}(${album.year})`);
}