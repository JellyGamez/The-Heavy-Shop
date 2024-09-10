export default {
	scrollBehavior() {
		const nuxtApp = useNuxtApp()
		return new Promise(async (resolve) => {
			nuxtApp.hook("page:finish", async () => {
				resolve({
					top: 0,
					left: 0,
					behavior: 'smooth'
				})
			})
		})
	}
}
