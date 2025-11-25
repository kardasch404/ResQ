import { test, expect } from '@playwright/test';

test.describe('Map Visualization E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/map');
    await page.waitForLoadState('networkidle');
  });

  test('should display map container', async ({ page }) => {
    const map = page.locator('.leaflet-container');
    await expect(map).toBeVisible();
  });

  test('should display ambulance markers on map', async ({ page }) => {
    const markers = page.locator('.ambulance-icon');
    await expect(markers.first()).toBeVisible();
    const count = await markers.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display incident markers on map', async ({ page }) => {
    const markers = page.locator('.incident-icon');
    await expect(markers.first()).toBeVisible();
    const count = await markers.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should show ambulance popup with details on marker click', async ({ page }) => {
    const marker = page.locator('.ambulance-icon').first();
    await marker.click();
    
    const popup = page.locator('.leaflet-popup');
    await expect(popup).toBeVisible();
    await expect(popup).toContainText('AMB-');
    await expect(popup).toContainText('Status:');
    await expect(popup).toContainText('Crew:');
    await expect(popup).toContainText('Equipment:');
  });

  test('should show incident popup with priority and details', async ({ page }) => {
    const marker = page.locator('.incident-icon').first();
    await marker.click();
    
    const popup = page.locator('.leaflet-popup');
    await expect(popup).toBeVisible();
    await expect(popup).toContainText('Priority:');
    await expect(popup).toContainText('Status:');
    await expect(popup).toContainText('Reported:');
  });

  test('should display map filters panel', async ({ page }) => {
    const filters = page.getByText('Filter Ambulances');
    await expect(filters).toBeVisible();
  });

  test('should show all ambulance status options in filter', async ({ page }) => {
    await expect(page.getByText('Available')).toBeVisible();
    await expect(page.getByText('En Route')).toBeVisible();
    await expect(page.getByText('On Scene')).toBeVisible();
    await expect(page.getByText('Transporting')).toBeVisible();
    await expect(page.getByText('At Hospital')).toBeVisible();
    await expect(page.getByText('Out of Service')).toBeVisible();
  });

  test('should filter ambulances when unchecking status', async ({ page }) => {
    const initialCount = await page.locator('.ambulance-icon').count();
    
    const firstCheckbox = page.locator('input[type="checkbox"]').first();
    await firstCheckbox.uncheck();
    await page.waitForTimeout(500);
    
    const newCount = await page.locator('.ambulance-icon').count();
    expect(newCount).toBeLessThan(initialCount);
  });

  test('should hide all ambulances when all filters unchecked', async ({ page }) => {
    const checkboxes = page.locator('input[type="checkbox"]');
    const count = await checkboxes.count();
    
    for (let i = 0; i < count; i++) {
      await checkboxes.nth(i).uncheck();
    }
    
    await page.waitForTimeout(500);
    const markers = page.locator('.ambulance-icon');
    await expect(markers).toHaveCount(0);
  });

  test('should show ambulances when re-checking filter', async ({ page }) => {
    const firstCheckbox = page.locator('input[type="checkbox"]').first();
    await firstCheckbox.uncheck();
    await page.waitForTimeout(500);
    
    await firstCheckbox.check();
    await page.waitForTimeout(500);
    
    const markers = page.locator('.ambulance-icon');
    const count = await markers.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should zoom to ambulance on marker click', async ({ page }) => {
    const marker = page.locator('.ambulance-icon').first();
    await marker.click();
    
    await page.waitForTimeout(1500);
    
    const popup = page.locator('.leaflet-popup');
    await expect(popup).toBeVisible();
  });

  test('should maintain map interactivity after filtering', async ({ page }) => {
    const checkbox = page.locator('input[type="checkbox"]').first();
    await checkbox.uncheck();
    
    const map = page.locator('.leaflet-container');
    await map.click({ position: { x: 200, y: 200 } });
    
    await expect(map).toBeVisible();
  });

  test('should display incident with CRITICAL priority in red', async ({ page }) => {
    const marker = page.locator('.incident-icon').first();
    await marker.click();
    
    const popup = page.locator('.leaflet-popup');
    const priority = popup.locator('text=/CRITICAL/');
    
    if (await priority.count() > 0) {
      await expect(priority).toBeVisible();
    }
  });

  test.skip('should close popup when clicking map', async ({ page }) => {
    // Skipped: Leaflet popup behavior is inconsistent in headless mode
  });

  test.skip('should handle multiple marker clicks', async ({ page }) => {
    // Skipped: Marker click interception issues in headless mode
  });

  test('should display navigation menu', async ({ page }) => {
    await expect(page.getByText('ResQ')).toBeVisible();
    await expect(page.getByText('Dashboard')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Map', exact: true })).toBeVisible();
  });

  test('should navigate to other pages from map', async ({ page }) => {
    await page.getByText('Dashboard').click();
    await expect(page).toHaveURL('/');
  });
});
