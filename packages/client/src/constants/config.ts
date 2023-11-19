class Config {
  public basePath: string;

  constructor() {
    this.basePath = 'https://ya-praktikum.tech/api/v2';
  }

  public getPath(part: string, service: string) {
    return `${this.basePath}/${service}${part}`;
  }
}

const instance = new Config();
export { instance as Config };
