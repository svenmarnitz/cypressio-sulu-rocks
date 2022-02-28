import BasePage from './base.page';

export class AdminPage extends BasePage {
  constructor() {
    super();
    this.path = '/admin/';
  }

  get profileHeadline() {
    return cy.get('body').contains('Adam Ministrator');
  }

  get logout() {
    return cy.get('body').contains('Abmelden');
  }
}

export const adminPage = new AdminPage();
