export default {
	scrollBehavior() {
		return new Promise((resolve) => {
			resolve({
				top: 0,
				left: 0,
				behavior: 'smooth'
			})
		})
	}
}
