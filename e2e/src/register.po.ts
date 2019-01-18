import { browser, by, element } from 'protractor';


export class RegisterPage
{

	navigateTo() {
		browser.get('http://localhost:4200');
		this.getRegisterButton().click();
		browser.waitForAngular();
	}


	getRegisterButton() {
		return element(by.id('createButton'));
	}
	
	getFirstnameInput() {
		return element(by.css('input[formcontrolname="firstname"]'));
	}
	
	getLastnameInput() {
		return element(by.css('input[formcontrolname="lastname"]'));
	}
	
	getContinueButton() {
		return element(by.id('continueButton'));
	}

}

