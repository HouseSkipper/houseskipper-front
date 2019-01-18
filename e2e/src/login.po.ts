import { browser, by, element } from 'protractor';


export class LoginPage
{

	navigateTo() {
		return browser.get('http://localhost:4200');
	}


	getLoginUsername() {
		return element(by.css('input[formcontrolname="username"]'));
	}

	getLoginPassword() {
		return element(by.css('input[formcontrolname="password"]'));
	}

	getLoginButton() {
		return element(by.id('submitButton'));
	}

	getLogoutButton() {
		return element(by.id('logout'));
	}


	hasDashboard() {
		return element(by.tagName('app-dashboard')).isPresent();
	}

}

