import { by, device, element, expect } from 'detox';

describe('Tab Navigation', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should navigate to Home tab', async () => {
    await element(by.id('tab-Home')).tap();
    await expect(element(by.id('screen-Home'))).toBeVisible();
  });

  it('should navigate to Finances tab', async () => {
    await element(by.id('tab-Finances')).tap();
    await expect(element(by.id('screen-Finances'))).toBeVisible();
  });

  it('should navigate to Properties tab', async () => {
    await element(by.id('tab-Properties')).tap();
    await expect(element(by.id('screen-Properties'))).toBeVisible();
  });

  it('should navigate to Appointment tab', async () => {
    await element(by.id('tab-Appointment')).tap();
    await expect(element(by.id('screen-Appointment'))).toBeVisible();
  });

  it('should navigate to MyBroker tab', async () => {
    await element(by.id('tab-MyBroker')).tap();
    await expect(element(by.id('screen-MyBroker'))).toBeVisible();
  });

  it('should navigate through all tabs sequentially', async () => {
    // Start at Home
    await element(by.id('tab-Home')).tap();
    await expect(element(by.id('screen-Home'))).toBeVisible();

    // Navigate to Finances
    await element(by.id('tab-Finances')).tap();
    await expect(element(by.id('screen-Finances'))).toBeVisible();

    // Navigate to Properties
    await element(by.id('tab-Properties')).tap();
    await expect(element(by.id('screen-Properties'))).toBeVisible();

    // Navigate to Appointment
    await element(by.id('tab-Appointment')).tap();
    await expect(element(by.id('screen-Appointment'))).toBeVisible();

    // Navigate to MyBroker
    await element(by.id('tab-MyBroker')).tap();
    await expect(element(by.id('screen-MyBroker'))).toBeVisible();

    // Return to Home
    await element(by.id('tab-Home')).tap();
    await expect(element(by.id('screen-Home'))).toBeVisible();
  });
});

