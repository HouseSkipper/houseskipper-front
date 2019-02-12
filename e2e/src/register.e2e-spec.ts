import { browser, element, by } from 'protractor';

import { RegisterPage } from './register.po';


describe('HouseSkipper registration test', () => {
	let page: RegisterPage;

	beforeEach(() => {
		page = new RegisterPage();
	});


	it('First, only firstname should be asked and previous button is not present yet', () => {
		page.navigateTo();
		browser.waitForAngular();

		expect(page.getContinueButton().isDisplayed()).toBe(true);
		expect(page.getPreviousButton().isPresent()).toBe(false);

		expect(page.getFirstnameInput().isPresent()).toBe(true);
		expect(page.getLastnameInput().isPresent()).toBe(false);
		expect(page.getUserInput().isPresent()).toBe(false);
		expect(page.getPhoneInput().isPresent()).toBe(false);
		expect(page.getPasswordInput().isPresent()).toBe(false);
		expect(page.getPasswordConfirmInput().isPresent()).toBe(false);
		expect(page.getRoleInput().isPresent()).toBe(false);
		expect(page.getCodeInput().isPresent()).toBe(false);
	});

	it('Then only lastname should be asked and previous button is present and displayed', () => {
		page.getFirstnameInput().sendKeys("myFirstname");
		page.getContinueButton().click();
		browser.waitForAngular();

		expect(page.getContinueButton().isDisplayed()).toBe(true);
		expect(page.getPreviousButton().isDisplayed()).toBe(true);

		expect(page.getFirstnameInput().isPresent()).toBe(false);
		expect(page.getLastnameInput().isPresent()).toBe(true);
		expect(page.getUserInput().isPresent()).toBe(false);
		expect(page.getPhoneInput().isPresent()).toBe(false);
		expect(page.getPasswordInput().isPresent()).toBe(false);
		expect(page.getPasswordConfirmInput().isPresent()).toBe(false);
		expect(page.getRoleInput().isPresent()).toBe(false);
		expect(page.getCodeInput().isPresent()).toBe(false);
	});

	it('Then only email (aka username) should be asked and previous button is present and displayed', () => {
		page.getLastnameInput().sendKeys("myLastname");
		page.getContinueButton().click();
		browser.waitForAngular();

		expect(page.getContinueButton().isDisplayed()).toBe(true);
		expect(page.getPreviousButton().isDisplayed()).toBe(true);

		expect(page.getFirstnameInput().isPresent()).toBe(false);
		expect(page.getLastnameInput().isPresent()).toBe(false);
		expect(page.getUserInput().isPresent()).toBe(true);
		expect(page.getPhoneInput().isPresent()).toBe(false);
		expect(page.getPasswordInput().isPresent()).toBe(false);
		expect(page.getPasswordConfirmInput().isPresent()).toBe(false);
		expect(page.getRoleInput().isPresent()).toBe(false);
		expect(page.getCodeInput().isPresent()).toBe(false);
	});

	it('Submitting an invalid email does not enable to continue (error message)', () => {
		page.getUserInput().sendKeys("myEmail");
		page.getContinueButton().click();
		browser.waitForAngular();

		expect(page.getContinueButton().isDisplayed()).toBe(true);
		expect(page.getPreviousButton().isDisplayed()).toBe(true);

		expect(page.getFirstnameInput().isPresent()).toBe(false);
		expect(page.getLastnameInput().isPresent()).toBe(false);
		expect(page.getUserInput().isPresent()).toBe(true);
		expect(page.getPhoneInput().isPresent()).toBe(false);
		expect(page.getPasswordInput().isPresent()).toBe(false);
		expect(page.getPasswordConfirmInput().isPresent()).toBe(false);
		expect(page.getRoleInput().isPresent()).toBe(false);
		expect(page.getCodeInput().isPresent()).toBe(false);

		expect(element.all(by.tagName("mat-error")).first().isDisplayed()).toBe(true);
	});

	it('Then only phone number should be asked and previous button is present and displayed', () => {
		page.getUserInput().sendKeys("test@protractor.com");
		page.getContinueButton().click();
		browser.waitForAngular();

		expect(element(by.tagName("mat-error")).isPresent()).toBe(false);

		expect(page.getContinueButton().isDisplayed()).toBe(true);
		expect(page.getPreviousButton().isDisplayed()).toBe(true);

		expect(page.getFirstnameInput().isPresent()).toBe(false);
		expect(page.getLastnameInput().isPresent()).toBe(false);
		expect(page.getUserInput().isPresent()).toBe(false);
		expect(page.getPhoneInput().isPresent()).toBe(true);
		expect(page.getPasswordInput().isPresent()).toBe(false);
		expect(page.getPasswordConfirmInput().isPresent()).toBe(false);
		expect(page.getRoleInput().isPresent()).toBe(false);
		expect(page.getCodeInput().isPresent()).toBe(false);
	});

	it('Submitting an invalid phone number does not enable to continue (error message)', () => {
		page.getPhoneInput().sendKeys("01");
		page.getContinueButton().click();
		browser.waitForAngular();

		expect(page.getContinueButton().isDisplayed()).toBe(true);
		expect(page.getPreviousButton().isDisplayed()).toBe(true);

		expect(page.getFirstnameInput().isPresent()).toBe(false);
		expect(page.getLastnameInput().isPresent()).toBe(false);
		expect(page.getUserInput().isPresent()).toBe(false);
		expect(page.getPhoneInput().isPresent()).toBe(true);
		expect(page.getPasswordInput().isPresent()).toBe(false);
		expect(page.getPasswordConfirmInput().isPresent()).toBe(false);
		expect(page.getRoleInput().isPresent()).toBe(false);
		expect(page.getCodeInput().isPresent()).toBe(false);

		expect(element.all(by.tagName("mat-error")).first().isDisplayed()).toBe(true);
	});

	it('Then only password should be asked and previous button is present and displayed', () => {
		page.getPhoneInput().sendKeys("23456789");
		page.getContinueButton().click();
		browser.waitForAngular();

		expect(element(by.tagName("mat-error")).isPresent()).toBe(false);

		expect(page.getContinueButton().isDisplayed()).toBe(true);
		expect(page.getPreviousButton().isDisplayed()).toBe(true);

		expect(page.getFirstnameInput().isPresent()).toBe(false);
		expect(page.getLastnameInput().isPresent()).toBe(false);
		expect(page.getUserInput().isPresent()).toBe(false);
		expect(page.getPhoneInput().isPresent()).toBe(false);
		expect(page.getPasswordInput().isPresent()).toBe(true);
		expect(page.getPasswordConfirmInput().isPresent()).toBe(true);
		expect(page.getRoleInput().isPresent()).toBe(false);
		expect(page.getCodeInput().isPresent()).toBe(false);
	});

	it('Submitting an invalid password does not enable to continue (error message)', () => {
		page.getPasswordInput().sendKeys("myPassword");
		page.getPasswordConfirmInput().sendKeys("myPassword");
		page.getContinueButton().click();
		browser.waitForAngular();

		expect(page.getContinueButton().isDisplayed()).toBe(true);
		expect(page.getPreviousButton().isDisplayed()).toBe(true);

		expect(page.getFirstnameInput().isPresent()).toBe(false);
		expect(page.getLastnameInput().isPresent()).toBe(false);
		expect(page.getUserInput().isPresent()).toBe(false);
		expect(page.getPhoneInput().isPresent()).toBe(false);
		expect(page.getPasswordInput().isPresent()).toBe(true);
		expect(page.getPasswordConfirmInput().isPresent()).toBe(true);
		expect(page.getRoleInput().isPresent()).toBe(false);
		expect(page.getCodeInput().isPresent()).toBe(false);

		expect(element.all(by.tagName("mat-error")).first().isDisplayed()).toBe(true);
	});

	it('Then only role should be asked and previous button is present and displayed', () => {
		page.getPasswordInput().sendKeys("123*");
		page.getPasswordConfirmInput().sendKeys("123*");
		page.getContinueButton().click();
		browser.waitForAngular();

		expect(element(by.tagName("mat-error")).isPresent()).toBe(false);

		expect(page.getContinueButton().isDisplayed()).toBe(true);
		expect(page.getPreviousButton().isDisplayed()).toBe(true);

		expect(page.getFirstnameInput().isPresent()).toBe(false);
		expect(page.getLastnameInput().isPresent()).toBe(false);
		expect(page.getUserInput().isPresent()).toBe(false);
		expect(page.getPhoneInput().isPresent()).toBe(false);
		expect(page.getPasswordInput().isPresent()).toBe(false);
		expect(page.getPasswordConfirmInput().isPresent()).toBe(false);
		expect(page.getRoleInput().isPresent()).toBe(true);
		expect(page.getCodeInput().isPresent()).toBe(false);
	});

	it('Then only code should be asked and previous button is present and displayed', () => {
		page.getContinueButton().click();
		browser.waitForAngular();

		expect(page.getContinueButton().isDisplayed()).toBe(true);
		expect(page.getPreviousButton().isDisplayed()).toBe(true);

		expect(page.getFirstnameInput().isPresent()).toBe(false);
		expect(page.getLastnameInput().isPresent()).toBe(false);
		expect(page.getUserInput().isPresent()).toBe(false);
		expect(page.getPhoneInput().isPresent()).toBe(false);
		expect(page.getPasswordInput().isPresent()).toBe(false);
		expect(page.getPasswordConfirmInput().isPresent()).toBe(false);
		expect(page.getRoleInput().isPresent()).toBe(false);
		expect(page.getCodeInput().isPresent()).toBe(true);
	});

});
