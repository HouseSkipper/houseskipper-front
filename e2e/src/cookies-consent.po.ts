import { browser, element, by } from 'protractor';


export class CookiesPage
{

	navigateTo () {
		browser.get('http://localhost:4200');
		browser.waitForAngular();
	}


  getCookiesConsent () {
    return element(by.id("cookiesConsent"));
  }

  getAcceptButton () {
    return this.getCookiesConsent().element(by.tagName("button"));
  }

}
