(function () {
	const header = document.querySelector(".header");
	window.onscroll = () => {
		if (window.scrollY > 50) {
			header.classList.add("header_active");
		} else {
			header.classList.remove("header_active");
		}
	};
})();

/* Burger handler */

(function () {
	const burgerItem = document.querySelector(".burger");
	const menu = document.querySelector(".header__nav");
	const menuCloseItem = document.querySelector(".header__nav-close");
	burgerItem.addEventListener("click", () => {
		menu.classList.add("header__nav-active");
	});
	menuCloseItem.addEventListener("click", () => {
		menu.classList.remove("header__nav-active");
	});
})();

/* Scroll to anchors */

(function () {
	const smoothScroll = function (targetEl, duration) {
		/* Функция smoothScroll, которая делает скроллинг (когда страница плавно прокручивается вниз или вверх). Эта функция принимает два параметра: targetEl и duration. targetEl - это то место на странице, куда мы хотим прокрутиться (например, какая-то секция или блок), а duration - время, за которое произойдет прокрутка. */

		const headerElHeight = document.querySelector(".header").clientHeight;
		/* headerElHeight: Это высота шапки сайта (header). Мы находим ее с помощью document.querySelector('.menu').clientHeight. Это нужно для того, чтобы учесть высоту шапки при прокрутке к элементу, так чтобы он не оказался под шапкой. */

		let target = document.querySelector(targetEl);
		/* target: Это целевой элемент, к которому нужно прокрутиться. Мы находим его с помощью document.querySelector(targetEl). */

		let targetPosition = target.getBoundingClientRect().top - headerElHeight;
		/* targetPosition: Это расстояние от верхней части экрана до целевого элемента. Мы вычисляем это с помощью target.getBoundingClientRect().top, а также вычитаем высоту шапки (headerElHeight), чтобы учесть ее в прокрутке. */

		let startPosition = window.scrollY;
		/* startPosition: Это текущая позиция прокрутки страницы. Мы получаем ее с помощью window.pageYOffset. */

		let startTime = null;
		/* startTime: Это время начала анимации, инициализируется как null. */

		const ease = function (t, b, c, d) {
			/* Эта функция отвечает за плавность движения во время прокрутки. Она принимает четыре параметра: t, b, c, d. Здесь t - это время, b - начальное значение, c - изменение, d - длительность. */
			t /= d / 2;
			if (t < 1) return (c / 2) * t * t + b;
			t--;
			return (-c / 2) * (t * (t - 2) - 1) + b;
		};

		const animation = function (currentTime) {
			/* Эта функция управляет анимацией прокрутки. */

			if (startTime === null) startTime = currentTime;
			/* Если startTime равно null, оно инициализируется текущим временем. */

			const timeElapsed = currentTime - startTime;
			/* Вычисляем прошедшее время с момента начала анимации (timeElapsed) и получаем новую позицию для прокрутки с помощью функции ease. */

			const run = ease(timeElapsed, startPosition, targetPosition, duration);
			/* Получаем новую позицию для прокрутки с помощью функции ease. */

			window.scrollTo(0, run);
			/* Используем window.scrollTo(0, run) для плавной прокрутки страницы до новой позиции. */

			if (timeElapsed < duration) requestAnimationFrame(animation);
		};
		/* Если прошедшее время (timeElapsed) меньше чем общая длительность анимации (duration), мы вызываем requestAnimationFrame(animation), чтобы продолжить анимацию. */

		requestAnimationFrame(animation);
		/* Вызываем requestAnimationFrame(animation), чтобы запустить анимацию. */
	};

	const scrollTo = function () {
		/* Функция scrollTo просто находит все ссылки на странице, которые должны осуществлять скроллинг, и добавляет к ним обработчик события, чтобы при клике на них происходила плавная прокрутка к нужному месту. */

		const links = document.querySelectorAll(".js-scroll");
		links.forEach((each) => {
			each.addEventListener("click", function () {
				const currentTarget = this.getAttribute("href");
				smoothScroll(currentTarget, 1000);
			});
		});
	};
	scrollTo();
	/* Вызываем функцию scrollTo(), чтобы все это начало работать, как надо. */
})();
