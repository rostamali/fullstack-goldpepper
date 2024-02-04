document.addEventListener('DOMContentLoaded', function () {
	const header = document.getElementById('header');
	const headerHeight = 50;

	window.addEventListener('scroll', function () {
		const scrolled = window.scrollY > headerHeight;
		if (scrolled) {
			header.classList.add('sticky');
		} else {
			header.classList.remove('sticky');
		}
	});
});
