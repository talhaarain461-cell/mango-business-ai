/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function getNextMarketRateExpiry(lastUpdate?: string) {
  if (!lastUpdate) return null;

  const updateDate = new Date(lastUpdate);
  const expiry = new Date(updateDate);
  
 // Expiry is ALWAYS the next day at 9:00 AM relative to the update time
  expiry.setDate(expiry.getDate() + 1);
  expiry.setHours(9, 0, 0, 0);
  
  return expiry;
}

export function isPriceExpired(lastUpdate?: string) {
  const expiry = getNextMarketRateExpiry(lastUpdate);
 if (!expiry) return true; // If no update date, treat as expired
  
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
