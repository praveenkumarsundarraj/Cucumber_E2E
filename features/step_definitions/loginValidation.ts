import { Given, When, Then } from '@cucumber/cucumber'


Given('User is logged in with invalid credentials {string} and {string}', async function (userName, password) {
  await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await this.page.locator('#username').fill(userName);
  await this.page.locator('#password').fill(password);
  await this.page.locator('#signInBtn').click();

});


Then('Verify the error message validated',async function () {
  let errtxt = await this.page.locator('[style*=\'block\']').textContent();
  await this.expect(errtxt).toContain('Incorrect');
});


