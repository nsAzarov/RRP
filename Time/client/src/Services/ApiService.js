export class ApiService {
  async getResource(url) {
    const res = await fetch(`${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  }
  async sendPostRequest(url, body) {
    const res = await fetch(`${url}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body
    });
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  }

  async getTime() {
    return await this.sendPostRequest(
      '/Time',
      JSON.stringify({ from: 'client' })
    );
  }

  async changeMultiplicator(value) {
    return await this.sendPostRequest(
      '/ChangeMultiplicator',
      JSON.stringify({ value })
    );
  }
}
