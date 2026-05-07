import { companies } from '../data/companies';
import type { Company } from '../data/companies';

/**
 * Simulates a real API call to fetch companies.
 * Includes artificial delay and a small chance to fail to demonstrate error handling.
 */
export const fetchCompanies = (): Promise<Company[]> => {
  return new Promise((resolve, reject) => {
    const delay = 1000; // Simulate network latency
    const shouldFail = Math.random() < 0.01; // 1% chance of failure for demo purposes

    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Failed to fetch data from the server. Please check your connection.'));
      } else {
        resolve(companies);
      }
    }, delay);
  });
};
