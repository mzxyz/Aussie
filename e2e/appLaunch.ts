import { by, device, element, expect } from 'detox';

describe('App Launch and Basic UI', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should launch app successfully', async () => {
    await expect(element(by.id('screen-Home'))).toBeVisible();
  });

  it('should display tab bar', async () => {
    await expect(element(by.id('tab-bar'))).toBeVisible();
  });

  it('should display all 5 tabs', async () => {
    await expect(element(by.id('tab-Home'))).toBeVisible();
    await expect(element(by.id('tab-Finances'))).toBeVisible();
    await expect(element(by.id('tab-Properties'))).toBeVisible();
    await expect(element(by.id('tab-Appointment'))).toBeVisible();
    await expect(element(by.id('tab-MyBroker'))).toBeVisible();
  });

  it('should show Home screen by default', async () => {
    await expect(element(by.id('screen-Home'))).toBeVisible();
  });
});

