import { browser } from 'protractor';

import { RegisterPage } from './register.po';


describe('HouseSkipper registration test', () => {
	let page: RegisterPage;

	beforeEach(() => {
		page = new RegisterPage();
	});


	it('only firstname should be asked', () => {
		page.navigateTo();
		expect(page.getFirstnameInput().isDisplayed()).toBe(true);
		expect(page.getLastnameInput().isPresent()).toBe(false);
		expect(page.getContinueButton().isDisplayed()).toBe(true);
	});

});

