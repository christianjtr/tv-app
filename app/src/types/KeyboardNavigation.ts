export const NavigationKeysOptions = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'] as const;
export type NavigationKeys = (typeof NavigationKeysOptions)[number];
