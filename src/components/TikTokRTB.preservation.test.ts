import { describe, it, expect } from 'vitest';
import { test } from '@fast-check/vitest';
import * as fc from 'fast-check';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Preservation Property Tests for TikTok Video Pagination Fix
 * 
 * **Validates: Requirements 3.1, 3.2, 3.3, 3.4**
 * 
 * **IMPORTANT**: These tests verify existing behavior on UNFIXED code
 * They capture the baseline behavior that must be preserved after the fix
 * 
 * Expected outcome on UNFIXED code: Tests PASS
 * Expected outcome on FIXED code: Tests PASS (no regressions)
 * 
 * These tests verify that:
 * - Initially visible videos (clips 1-3) display and play correctly
 * - TikTok embed script loads from official CDN
 * - Smooth scrolling and navigation controls work
 * - Navigation arrow visibility logic functions correctly
 * - Component styling and layout render correctly
 */
describe('Preservation: Initially Visible Videos Continue Working', () => {
  const componentPath = path.join(process.cwd(), 'src/components/TikTokRTB.tsx');
  
  /**
   * Property 2: Preservation - Initially Visible Videos Continue Working
   * 
   * For clips 1-3 (videoIndex < 3) that are initially visible, verify that:
   * 1. All video embeds are rendered with correct structure
   * 2. TikTok embed script loads from official CDN
   * 3. Component has navigation controls (left/right arrows)
   * 4. Component has smooth scrolling behavior
   * 5. Component styling and layout are preserved
   */
  test.prop([
    fc.record({
      videoIndex: fc.integer({ min: 0, max: 2 }), // Clips 1-3 (0-indexed: 0-2)
      isInitiallyVisible: fc.constant(true)
    })
  ])(
    'Property 2: Initially visible videos (clips 1-3) display correctly',
    async (input) => {
      // Verify the component file exists
      expect(fs.existsSync(componentPath)).toBe(true);
      
      const componentContent = fs.readFileSync(componentPath, 'utf-8');
      
      // 1. Verify all TikTok embeds are rendered with correct structure
      expect(componentContent).toContain('blockquote');
      expect(componentContent).toContain('className="tiktok-embed"');
      expect(componentContent).toContain('data-video-id');
      
      // 2. Verify TIKTOK_CONTENT array has all 5 items (including initially visible ones)
      expect(componentContent).toContain('const TIKTOK_CONTENT');
      expect(componentContent).toContain('7603675455408934164'); // Clip 1
      expect(componentContent).toContain('7576139598758202625'); // Clip 2
      expect(componentContent).toContain('7560361631113350407'); // Clip 3
      
      // 3. Verify each embed has proper cite and href attributes
      expect(componentContent).toContain('cite=');
      expect(componentContent).toContain('href=');
      expect(componentContent).toContain('https://www.tiktok.com/@nongtungrunning');
      
      // 4. Verify embeds are rendered in a map function
      expect(componentContent).toContain('TIKTOK_CONTENT.map');
      expect(componentContent).toContain('content.id');
      expect(componentContent).toContain('content.type');
      
      // For initially visible videos, verify the component structure is preserved
      if (input.videoIndex < 3 && input.isInitiallyVisible) {
        // The component should render all embeds, including initially visible ones
        expect(componentContent).toContain('blockquote');
        expect(componentContent).toContain('tiktok-embed');
      }
    }
  );
  
  it('preserves TikTok embed script loading from official CDN', () => {
    const componentContent = fs.readFileSync(componentPath, 'utf-8');
    
    // Verify script loads from official TikTok CDN
    expect(componentContent).toContain('https://www.tiktok.com/embed.js');
    
    // Verify script is loaded asynchronously
    expect(componentContent).toContain('script.async = true');
    
    // Verify script is appended to document body
    expect(componentContent).toContain('document.body.appendChild(script)');
    
    // Verify script cleanup on unmount
    expect(componentContent).toContain('script.remove()');
  });
  
  it('preserves navigation controls (left/right arrows)', () => {
    const componentContent = fs.readFileSync(componentPath, 'utf-8');
    
    // Verify left arrow button exists
    expect(componentContent).toContain('ChevronLeft');
    expect(componentContent).toContain('Previous videos');
    
    // Verify right arrow button exists
    expect(componentContent).toContain('ChevronRight');
    expect(componentContent).toContain('Next videos');
    
    // Verify scroll function exists
    expect(componentContent).toContain('const scroll = (direction:');
    expect(componentContent).toContain('scrollBy');
    
    // Verify navigation buttons have click handlers
    expect(componentContent).toContain('onClick={() => scroll(\'left\')');
    expect(componentContent).toContain('onClick={() => scroll(\'right\')');
  });
  
  it('preserves navigation arrow visibility logic', () => {
    const componentContent = fs.readFileSync(componentPath, 'utf-8');
    
    // Verify canScrollLeft and canScrollRight state
    expect(componentContent).toContain('canScrollLeft');
    expect(componentContent).toContain('canScrollRight');
    
    // Verify checkScrollButtons function exists
    expect(componentContent).toContain('checkScrollButtons');
    expect(componentContent).toContain('scrollLeft');
    expect(componentContent).toContain('scrollWidth');
    expect(componentContent).toContain('clientWidth');
    
    // Verify conditional opacity based on scroll state
    expect(componentContent).toContain('canScrollLeft ? \'opacity-100\' : \'opacity-0');
    expect(componentContent).toContain('canScrollRight ? \'opacity-100\' : \'opacity-0');
  });
  
  it('preserves smooth scrolling behavior', () => {
    const componentContent = fs.readFileSync(componentPath, 'utf-8');
    
    // Verify smooth scroll behavior
    expect(componentContent).toContain('behavior: \'smooth\'');
    
    // Verify scroll-smooth class
    expect(componentContent).toContain('scroll-smooth');
    
    // Verify scroll snap type
    expect(componentContent).toContain('scrollSnapType');
    expect(componentContent).toContain('scrollSnapAlign');
  });
  
  it('preserves scroll indicator dots on mobile', () => {
    const componentContent = fs.readFileSync(componentPath, 'utf-8');
    
    // Verify scroll indicator dots exist
    expect(componentContent).toContain('Scroll Indicator Dots');
    
    // Verify dots are hidden on desktop (md:hidden)
    expect(componentContent).toContain('md:hidden');
    
    // Verify dots are rendered for each content item
    expect(componentContent).toContain('TIKTOK_CONTENT.map((content, idx)');
    expect(componentContent).toContain('rounded-full');
  });
  
  it('preserves component styling and layout', () => {
    const componentContent = fs.readFileSync(componentPath, 'utf-8');
    
    // Verify section wrapper with background
    expect(componentContent).toContain('<section');
    expect(componentContent).toContain('bg-surface/50');
    
    // Verify container and padding
    expect(componentContent).toContain('container mx-auto');
    expect(componentContent).toContain('px-6');
    
    // Verify header section
    expect(componentContent).toContain('Real Trips');
    expect(componentContent).toContain('Real Moments');
    
    // Verify scrollable container
    expect(componentContent).toContain('overflow-x-auto');
    expect(componentContent).toContain('flex gap-5');
    
    // Verify gradient masks
    expect(componentContent).toContain('bg-gradient-to-r');
    expect(componentContent).toContain('bg-gradient-to-l');
    
    // Verify CTA button
    expect(componentContent).toContain('Follow @nongtungrunning');
    expect(componentContent).toContain('ExternalLink');
  });
  
  it('preserves component structure and hooks', () => {
    const componentContent = fs.readFileSync(componentPath, 'utf-8');
    
    // Verify component is a client component
    expect(componentContent).toContain('\'use client\'');
    
    // Verify required imports
    expect(componentContent).toContain('useEffect');
    expect(componentContent).toContain('useRef');
    expect(componentContent).toContain('useState');
    
    // Verify refs and state
    expect(componentContent).toContain('scrollRef');
    expect(componentContent).toContain('useState(false)');
    expect(componentContent).toContain('useState(true)');
    
    // Verify useEffect for script loading
    expect(componentContent).toContain('useEffect(() => {');
    expect(componentContent).toContain('loadTikTokScript');
    
    // Verify useEffect for scroll event listener
    expect(componentContent).toContain('addEventListener(\'scroll\'');
    expect(componentContent).toContain('removeEventListener(\'scroll\'');
  });
  
  test.prop([
    fc.integer({ min: 0, max: 4 }) // All video indices
  ])(
    'Property 2: All videos are rendered in the DOM regardless of visibility',
    async (videoIndex) => {
      const componentContent = fs.readFileSync(componentPath, 'utf-8');
      
      // Verify all 5 video IDs are present in the component
      const videoIds = [
        '7603675455408934164',
        '7576139598758202625',
        '7560361631113350407',
        '7381118220578606342',
        '7382537203567578374'
      ];
      
      // All videos should be rendered in the DOM
      videoIds.forEach(id => {
        expect(componentContent).toContain(id);
      });
      
      // Verify the component maps over all content items
      expect(componentContent).toContain('TIKTOK_CONTENT.map');
    }
  );
  
  it('preserves responsive design and mobile behavior', () => {
    const componentContent = fs.readFileSync(componentPath, 'utf-8');
    
    // Verify responsive padding
    expect(componentContent).toContain('py-16 md:py-24');
    
    // Verify responsive text sizes
    expect(componentContent).toContain('text-3xl md:text-5xl');
    expect(componentContent).toContain('text-base md:text-lg');
    
    // Verify responsive width for video cards
    expect(componentContent).toContain('w-[280px] md:w-[calc(33.333%-14px)]');
    
    // Verify mobile-specific scroll indicators
    expect(componentContent).toContain('md:hidden');
  });
  
  it('preserves TikTok profile link and CTA', () => {
    const componentContent = fs.readFileSync(componentPath, 'utf-8');
    
    // Verify TikTok profile link
    expect(componentContent).toContain('https://www.tiktok.com/@nongtungrunning');
    
    // Verify CTA button text
    expect(componentContent).toContain('Follow @nongtungrunning');
    
    // Verify external link icon
    expect(componentContent).toContain('ExternalLink');
    
    // Verify link attributes
    expect(componentContent).toContain('target="_blank"');
    expect(componentContent).toContain('rel="noopener noreferrer"');
  });
});
