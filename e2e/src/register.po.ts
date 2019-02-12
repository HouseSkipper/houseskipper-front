import { browser, element, by } from 'protractor';


export class RegisterPage
{

	navigateTo () {
		browser.get('http://localhost:4200');
		element(by.id('createButton')).click();
		browser.waitForAngular();
	}


	getContinueButton () {
		return element(by.id("continueButton"));
	}

	getPreviousButton () {
		return element(by.id("previousButton"));
	}


	getInput (name) {
		return element(by.css('input[formControlName="' + name + '"]'));
	}

	getFirstnameInput () {
		return this.getInput("firstname");
	}

	getLastnameInput () {
		return this.getInput("lastname");
	}

	getUserInput () {
		return this.getInput("username");
	}

	getPhoneInput () {
		return this.getInput("telephone");
	}

	getPasswordInput () {
		return this.getInput("password");
	}

	getPasswordConfirmInput () {
		return this.getInput("confirmPassword");
	}

	getRoleInput () {
		return element(by.css('mat-select[formControlName="role"]'));
	}

	getCodeInput () {
		return this.getInput("code");
	}

}
