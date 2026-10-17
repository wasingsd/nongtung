// Google Analytics 4 (GA4) Tracking Utility for Nongtung Platform

declare global {
    interface Window {
        gtag?: (
            command: 'event' | 'config' | 'set' | 'js',
            targetIdOrAction: string | Date,
            params?: Record<string, any>
        ) => void;
        dataLayer?: any[];
    }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-B7MJ6ZFQ6S';

/**
 * Safely send an event to GA4
 */
export function sendGAEvent(eventName: string, params: Record<string, any> = {}) {
    if (typeof window === 'undefined' || !window.gtag) {
        if (process.env.NODE_ENV === 'development') {
            console.log(`[GA4 Event (mock)] ${eventName}:`, params);
        }
        return;
    }
    window.gtag('event', eventName, params);
}

/**
 * Track Lead Generation (e.g. LINE Official click, Phone call, Inquiry submission)
 */
export function trackLeadConversion(options: {
    channel: 'line' | 'phone' | 'quote' | 'facebook';
    locationName?: string;
    tripId?: string;
    tripTitle?: string;
    value?: number;
}) {
    sendGAEvent('generate_lead', {
        event_category: 'lead_conversion',
        lead_channel: options.channel,
        trip_id: options.tripId || '',
        trip_title: options.tripTitle || '',
        location: options.locationName || '',
        value: options.value || 0,
        currency: 'THB',
    });
}

/**
 * Track Trip or Article Views (GA4 standard view_item)
 */
export function trackViewItem(options: {
    itemId: string;
    itemName: string;
    itemCategory?: string;
    price?: number;
}) {
    sendGAEvent('view_item', {
        currency: 'THB',
        value: options.price || 0,
        items: [
            {
                item_id: options.itemId,
                item_name: options.itemName,
                item_category: options.itemCategory || 'Adventures & Trips',
                price: options.price || 0,
            },
        ],
    });
}

/**
 * Track Call To Action Clicks (CTA Buttons)
 */
export function trackCTAClick(ctaName: string, ctaTarget: string, meta?: Record<string, any>) {
    sendGAEvent('select_content', {
        content_type: 'cta_button',
        item_id: ctaName,
        cta_target: ctaTarget,
        ...meta,
    });
}

/**
 * Track Outbound Social Links (Facebook, LINE, TikTok)
 */
export function trackSocialClick(platform: 'facebook' | 'line' | 'tiktok' | 'instagram' | 'phone', url: string) {
    sendGAEvent('social_outbound_click', {
        platform,
        destination_url: url,
    });
}

/**
 * Track Itinerary Interactions (Viewing day photos, expanding accordion)
 */
export function trackItineraryInteraction(dayLabel: string, action: 'view_photos' | 'expand_day' | 'open_lightbox') {
    sendGAEvent('itinerary_interaction', {
        day: dayLabel,
        interaction_type: action,
    });
}
