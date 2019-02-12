import { browser, element, by } from 'protractor';

import { CookiesPage } from './cookies-consent.po';


describe('HouseSkipper cookies consent test', () => {
	let page: CookiesPage;

	beforeEach(() => {
		page = new CookiesPage();
	});


	it('popup should not be present after clicking the acceptance button', () => {
		page.navigateTo();
		browser.waitForAngular();

    expect(page.getCookiesConsent().isDisplayed()).toBe(true);

    page.getAcceptButton().click();
		browser.waitForAngular();

    expect(page.getCookiesConsent().isPresent()).toBe(false);
	});

  it('popup should not be present after refreshing also', () => {
  		page.navigateTo();
  		browser.waitForAngular();

      expect(page.getCookiesConsent().isPresent()).toBe(false);
  	});

});
