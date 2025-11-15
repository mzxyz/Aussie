import { by, device, element, expect } from 'detox';

describe('Home Screen', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    // Navigate to Home tab before each test
    await element(by.id('tab-Home')).tap();
    await expect(element(by.id('screen-Home'))).toBeVisible();
  });

  it('should display Home screen on app launch', async () => {
    await expect(element(by.id('screen-Home'))).toBeVisible();
  });

  it('should display all Home screen elements', async () => {
    // Verify the screen container is visible
    await expect(element(by.id('screen-Home'))).toBeVisible();

    // Verify buttons are visible
    await expect(element(by.id('button-start-your-property-search'))).toBeVisible();
    await expect(element(by.id('button-add-property'))).toBeVisible();

    // Verify appointment cell is present (if it has a testID)
    // Note: AppointmentCell might need a testID added if you want to test it specifically
  });

  it('should have functional buttons', async () => {
    // Verify buttons exist and can be tapped
    const searchButton = element(by.id('button-start-your-property-search'));
    const addPropertyButton = element(by.id('button-add-property'));

    await expect(searchButton).toBeVisible();
    await expect(addPropertyButton).toBeVisible();

    // Tap buttons to verify they're interactive
    await searchButton.tap();
    await addPropertyButton.tap();

    // After tapping, screen should still be visible
    await expect(element(by.id('screen-Home'))).toBeVisible();
  });

  it('should navigate to Profile screen from header icon', async () => {
    // Verify we're on Home screen
    await expect(element(by.id('screen-Home'))).toBeVisible();

    // Tap the profile icon in the header
    await element(by.id('header-icon-person-outline')).tap();

    // Verify Profile screen is displayed
    await expect(element(by.id('screen-Profile'))).toBeVisible();
  });

  it('should maintain Home tab as active when returning from Profile', async () => {
    // Navigate to Profile
    await element(by.id('header-icon-person-outline')).tap();
    await expect(element(by.id('screen-Profile'))).toBeVisible();

    // Go back (using device back button or navigation)
    // For React Navigation, we can use the back gesture or navigate back
    await device.pressBack();

    // Should return to Home screen
    await expect(element(by.id('screen-Home'))).toBeVisible();
  });
});

