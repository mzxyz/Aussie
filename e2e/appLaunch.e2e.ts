import { by, device, element, expect } from 'detox';

describe('App Launch and Basic UI', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should launch app successfully with Home screen by default', async () => {
    await expect(element(by.id('screen-Home'))).toBeVisible();
  });

  it('should navigate to each tab and show correct screen', async () => {
    const tabs = [
      { name: 'Home', deepLink: 'aussie://home', screenId: 'screen-Home' },
      { name: 'Finances', deepLink: 'aussie://finances', screenId: 'screen-Finances' },
      {
        name: 'Properties',
        deepLink: 'aussie://properties',
        screenId: 'screen-Properties',
      },
      {
        name: 'Appointment',
        deepLink: 'aussie://appointment',
        screenId: 'screen-Appointment',
      },
      { name: 'MyBroker', deepLink: 'aussie://broker', screenId: 'screen-MyBroker' },
    ];

    await expect(element(by.id('screen-Home'))).toBeVisible();

    // Navigate to each tab using deep links and verify the correct screen appears
    for (const tab of tabs) {
      await device.openURL({ url: tab.deepLink });
      await expect(element(by.id(tab.screenId))).toBeVisible();
    }
  });
});
