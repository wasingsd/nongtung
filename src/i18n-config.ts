export const i18n = {
    defaultLocale: 'th',
    locales: ['en', 'th', 'zh'],
} as const;

export type Locale = (typeof i18n)['locales'][number];
