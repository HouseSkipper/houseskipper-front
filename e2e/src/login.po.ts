import { browser, by, element } from 'protractor';


export class LoginPage
{

	navigateTo() {
		return browser.get('http://localhost:4200');
	}


	getLoginUsername() {
		return element(by.id('mat-input-0'));
	}

	getLoginPassword() {
		return element(by.id('mat-input-1'));
	}

	getLoginButton() {
		return element(by.id('submitButton'));
	}

	getRegisterButton() {
		return element(by.id('createButton'));
	}


	hasDashboard() {
		return element(by.tagName('app-dashboard')).isPresent();
	}

}

