export function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[\u2013\u2014]/g, '-') // Replace en-dash and em-dash with -
        .replace(/[^a-z0-9\u0E00-\u0E7F-]+/g, '') // Remove all non-word chars (allow Thai characters and hyphens)
        .replace(/--+/g, '-')           // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}
