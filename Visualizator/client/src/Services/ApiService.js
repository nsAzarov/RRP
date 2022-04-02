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

  async getTicketSalesEvents() {
    return await this.getResource('/GetTicketSalesEvents');
  }

  async getCheckInEvents() {
    return await this.getResource('/GetCheckInEvents');
  }

  async getWaitingForLandingFlightEvents() {
    return await this.getResource('/GetWaitingForLandingFlightEvents');
  }

  async getLandingFlightEvents() {
    return await this.getResource('/GetLandingFlightEvents');
  }

  async getWaitingForTakeOffFlightEvents() {
    return await this.getResource('/GetWaitingForTakeOffFlightEvents');
  }

  async getTakingOffFlightEvents() {
    return await this.getResource('/GetTakingOffFlightEvents');
  }

  async changeMultiplicator(value) {
    return await this.sendPostRequest(
      '/ChangeMultiplicator',
      JSON.stringify({ value })
    );
  }
}
