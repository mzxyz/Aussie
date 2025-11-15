import { by, device, element, expect } from 'detox';

describe('Screen Content and Interactions', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  describe('Home Screen', () => {
    it('should display Home screen content', async () => {
      await expect(element(by.id('screen-Home'))).toBeVisible();
      await expect(element(by.id('button-start-your-property-search'))).toBeVisible();
      await expect(element(by.id('button-add-property'))).toBeVisible();
    });

    it('should navigate to Profile screen from Home', async () => {
      await expect(element(by.id('screen-Home'))).toBeVisible();
      await element(by.id('header-icon-person-outline')).tap();
      await expect(element(by.id('screen-Profile'))).toBeVisible();
    });
  });

  describe('Profile Screen', () => {
    beforeEach(async () => {
      // Navigate to Profile from Home
      await element(by.id('tab-Home')).tap();
      await element(by.id('header-icon-person-outline')).tap();
    });

    it('should display Profile screen content', async () => {
      await expect(element(by.id('screen-Profile'))).toBeVisible();
    });
  });

  describe('Finances Screen', () => {
    beforeEach(async () => {
      await element(by.id('tab-Finances')).tap();
    });

    it('should display Finances screen content', async () => {
      await expect(element(by.id('screen-Finances'))).toBeVisible();
      await expect(element(by.id('button-add-home-loan-details'))).toBeVisible();
      await expect(element(by.id('button-add-property'))).toBeVisible();
    });
  });

  describe('Properties Screen', () => {
    beforeEach(async () => {
      await element(by.id('tab-Properties')).tap();
    });

    it('should display Properties screen content', async () => {
      await expect(element(by.id('screen-Properties'))).toBeVisible();
    });
  });

  describe('Appointment Screen', () => {
    beforeEach(async () => {
      await element(by.id('tab-Appointment')).tap();
    });

    it('should display Appointment screen content', async () => {
      await expect(element(by.id('screen-Appointment'))).toBeVisible();
      await expect(
        element(by.id('button-book-an-appointment-with-soula')),
      ).toBeVisible();
    });
  });

  describe('MyBroker Screen', () => {
    beforeEach(async () => {
      await element(by.id('tab-MyBroker')).tap();
    });

    it('should display MyBroker screen content', async () => {
      await expect(element(by.id('screen-MyBroker'))).toBeVisible();
    });
  });
});

