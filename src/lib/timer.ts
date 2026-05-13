/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function getNextMarketRateExpiry(lastUpdate?: string) {
  if (!lastUpdate) return null;

  const updateDate = new Date(lastUpdate);
  const expiry = new Date(updateDate);
  
  // Set to next day 9:00 AM
  expiry.setDate(expiry.getDate() + 1);
  expiry.setHours(9, 0, 0, 0);
  
  return expiry;
}

export function isPriceExpired(lastUpdate?: string) {
  const expiry = getNextMarketRateExpiry(lastUpdate);
  if (!expiry) return false;
  
  return new Date() > expiry;
}

export function formatTimeLeft(ms: number) {
  if (ms < 0) return "00:00:00";
  
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  return [hours, minutes, seconds]
    .map(v => v.toString().padStart(2, '0'))
    .join(':');
}
