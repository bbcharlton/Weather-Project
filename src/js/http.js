export class Http {
	static async fetchData(url) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const HTTP = new XMLHttpRequest();
				HTTP.open('GET', url);
				HTTP.onreadystatechange = () => {
					if (HTTP.readyState == XMLHttpRequest.DONE && HTTP.status == 200) {
						const RESPONSE = JSON.parse(HTTP.responseText);
						resolve(RESPONSE);
					} else if (HTTP.readyState == XMLHttpRequest.DONE) {
						reject('Data unavailable!');
					}
				}
				HTTP.send();
			}, 1000); // <-- This isn't really necessary but it makes the loader spin for a second before the data appears.
		});
	}
}