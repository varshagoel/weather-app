/***************************************************************************************************
 * Load `zone.js/testing` to patch async operations for tests.
 */
import 'zone.js/testing';
import 'zone.js';         // ✅ Import base Zone.js

import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// Initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);
