import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n } from './i18n-config'

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    // Ignore specific paths that shouldn't be localized
    if (
        pathname.startsWith('/api') ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('/adminnongtung') ||
        pathname.includes('.')
    ) {
        return
    }

    // Check if pathname already has a locale
    const pathnameHasLocale = i18n.locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnameHasLocale) return

    // Redirect to default locale
    const locale = i18n.defaultLocale

    const newUrl = new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url)
    return NextResponse.redirect(newUrl)
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|adminnongtung).*)'],
}
