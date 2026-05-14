/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function getNextMarketRateExpiry(lastUpdate?: string) {
  if (!lastUpdate) return null;

  const updateDate = new Date(lastUpdate);
  const expiry = new Date(updateDate);

  // Set expiry to 9:00 AM of the same day
  expiry.setHours(9, 0, 0, 0);

  // If 9 AM has already passed, set expiry to next day 9:00 AM
  if (expiry <= updateDate) {
    expiry.setDate(expiry.getDate() + 1);
  }

  return expiry;
}

export function isPriceExpired(lastUpdate?: string) {
  const expiry = getNextMarketRateExpiry(lastUpdate);
  if (!expiry) return true;
  return new Date() > expiry;
}

export function getTimeParts(ms: number) {
  if (ms <= 0) return { h: "00", m: "00", s: "00" };
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return {
    h: hours.toString().padStart(2, '0'),
    m: minutes.toString().padStart(2, '0'),
    s: seconds.toString().padStart(2, '0')
  };
}