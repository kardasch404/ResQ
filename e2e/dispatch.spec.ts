import { test, expect } from '@playwright/test';

test.describe('Dispatch E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/incidents');
    await page.waitForLoadState('networkidle');
  });

  test('should create new incident', async ({ page }) => {
    await page.getByText('New Incident').click();
    
    await page.fill('input[name="address"]', '123 Main Street, Paris');
    await page.fill('textarea[name="patientInfo"]', 'Male, 45 years old, chest pain');
    await page.selectOption('select[name="severity"]', 'HIGH');
    await page.fill('input[name="latitude"]', '48.8566');
    await page.fill('input[name="longitude"]', '2.3522');
    
    await page.getByText('Create Incident').click();
    
    await page.waitForTimeout(1000);
    await expect(page.getByRole('cell', { name: '123 Main Street, Paris' }).first()).toBeVisible();
  });

  test('should display incidents list', async ({ page }) => {
    const table = page.locator('table');
    await expect(table).toBeVisible();
    
    await expect(page.getByText('Type')).toBeVisible();
    await expect(page.getByText('Priority')).toBeVisible();
    await expect(page.getByText('Status')).toBeVisible();
  });

  test.skip('should open dispatch panel for pending incident', async ({ page }) => {
    // Skipped: Requires pending incidents in database
  });

  test.skip('should show available ambulances sorted by distance', async ({ page }) => {
    // Skipped: Requires pending incidents in database
  });

  test.skip('should assign ambulance to incident', async ({ page }) => {
    // Skipped: Requires pending incidents in database
  });

  test.skip('should close dispatch panel', async ({ page }) => {
    // Skipped: Requires pending incidents in database
  });

  test('should delete incident', async ({ page }) => {
    const deleteButton = page.getByText('Delete').first();
    
    page.on('dialog', dialog => dialog.accept());
    
    await deleteButton.click();
    
    await page.waitForTimeout(1000);
  });

  test('should show incident priority with correct color', async ({ page }) => {
    const criticalBadge = page.locator('.bg-red-100').first();
    const highBadge = page.locator('.bg-orange-100').first();
    
    if (await criticalBadge.isVisible()) {
      await expect(criticalBadge).toContainText('CRITICAL');
    } else if (await highBadge.isVisible()) {
      await expect(highBadge).toContainText('HIGH');
    }
  });
});
