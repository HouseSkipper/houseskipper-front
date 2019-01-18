import { browser } from 'protractor';

import { LoginPage } from './login.po';


describe('HouseSkipper test', () => {
	let page: LoginPage;

	beforeEach(() => {
		page = new LoginPage();
	});


	it('login !', () => {
		page.navigateTo();
		page.getLoginUsername().sendKeys("test@test.com");
		page.getLoginPassword().sendKeys("Test123*");
		page.getLoginButton().click();
		browser.waitForAngular();
		expect(page.hasDashboard()).toBe(true);
	});
});

