// The page the user lands on after opening the app and without a session
export const FirstRunPage = 'TutorialPage';

// The main page the user will see as they use the app over a long period of time.
// Change this if not using tabs
export const MainPage = 'TabsPage';

// The initial root pages for our tabs (remove if not using tabs)
export const Tab1Root = 'ListMasterPage';
export const Tab2Root = 'SearchPage';
export const Tab3Root = 'SettingsPage';

export * from './customer-dashboard/customer-dashboard';
export * from './driver-dashboard/driver-dashboard';
export * from './admin-dashboard/admin-dashboard';

export * from './admin-dashboard/admin-dashboard';
export * from './admin-search/admin-search';

export * from './customer-list-delivery/customer-list-delivery';
export * from './customer-search-delivery/customer-search-delivery';
export * from './driver-add-delivery/driver-add-delivery';
export * from './driver-edit-delivery/driver-edit-delivery';
export * from './driver-search-delivery/driver-search-delivery';
export * from './driver-list-delivery/driver-list-delivery';
export * from './profile/profile';
