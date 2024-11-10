export const prefetchImage = (url: string) => {
	if (!url) return
	if ("requestIdleCallback" in window) {
		requestIdleCallback(() => {
			const img = new Image()
			img.src = url
		})
	} else {
		const img = new Image()
		img.src = url
	}
}
