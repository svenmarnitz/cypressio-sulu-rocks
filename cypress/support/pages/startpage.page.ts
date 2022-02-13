import BasePage from './base.page';

export class StartpageClass extends BasePage {
  constructor() {
    super();
    this.path = '/en';
  }
}

export const startpageClass = new StartpageClass();
