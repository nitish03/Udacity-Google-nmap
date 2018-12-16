class Square  {
	static rootURL() {
		return "https://api.foursquare.com/v2";
	}
	static auth() {
		const keys = {
			client_id: "1MOFPSZVAUKPPKPUEQUNZJVBZRVKY4DO020P0LRVO2PBRVQ3",
			client_secret: "VQVZJ1JXPSAUUDKPBVDCZ2JYPRMNHWX2GFADXTZGIMDXRCE1",
			v: "20181024"
		}
		return Object.keys(keys).map(key => `${key}=${keys[key]}`).join("&");
	}
	static lists() {
		return {
			Accept: "application/Json"
		};
	}
	static urlBuild(urlPrams) {
		if(!urlPrams) {
			return "";
		}
		return Object.keys(urlPrams).map(key => `${key}=${urlPrams[key]}`).join("&");
	}
	static startFetch(endPoint, method, urlPrams) {
		let requestData = {
			method,
			headers: Square.lists()
		}
		return fetch(
			`${Square.rootURL()}${endPoint}?${Square.auth()}&${Square.urlBuild(urlPrams)}`,
			requestData)
			.then(res => res.json());
	}
}

export default class SquareAPI {
	static search(urlPrams) {
		return Square.startFetch("/venues/search", "GET", urlPrams);
	}
	static venueDetails(VENUE_ID) {
		return Square.startFetch(`/venues/${VENUE_ID}`, "GET");
	}
	static venuePhotos(VENUE_ID) {
		return Square.startFetch(`/venues/${VENUE_ID}/photos`, "GET");
	}
}
