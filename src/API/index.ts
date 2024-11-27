type APIMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';
type APIData = Record<string, unknown>;
type APIHeaders = Record<string, string>;

class API<T extends APIData = APIData> {
	private host = '/api/v1';
	private headers?: APIHeaders;

	private async request(path: string, method: APIMethods, data?: APIData) {
		return new Promise<T>((res, rej) => {
			fetch(this.host + '/' + path, {
				method,
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
					...this.headers
				},
				body: JSON.stringify(data)
			}).then(async (response) => {
				const text = await response.text();
				res(JSON.parse(text, this.replacer));
			}).catch(rej);
		});
	}

	private replacer(key: string, value: any) {
		if (key.slice(-2) === 'At') return new Date(value);
		return value;
	}

	public setHost(host: string) {
		this.host = host;
	}

	public setHeader(key: string, value: string) {
		this.headers = {
			...this.headers,
			[key]: value
		};
	}

	public async get(path: string, data?: APIData) {
		return this.request(path, 'GET', data);
	}

	public async post(path: string, data?: APIData) {
		return this.request(path, 'POST', data);
	}

	public async put(path: string, data?: APIData) {
		return this.request(path, 'PUT', data);
	}

	public async delete(path: string, data?: APIData) {
		return this.request(path, 'DELETE', data);
	}
}

export default API;