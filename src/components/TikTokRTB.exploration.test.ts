import { describe, it, expect } from 'vitest';
import { test } from '@fast-check/vitest';
import * as fc from 'fast-check';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Bug Condition Exploration Test for TikTok Video Pagination Fix
 * 
 * **Validates: Requirements 2.1, 2.2**
 * 
 * **CRITICAL**: This test MUST FAIL on unfixed code - failure confirms the bug exists
 * **DO NOT attempt to fix the test or the code when it fails**
 * 
 * This test verifies the fault condition: TikTok videos that are not initially visible
 * (clips 4-5, videoIndex >= 3) cannot be played because the TikTok embed script only
 * initializes videos visible at mount time.
 * 
 * Expected outcome on UNFIXED code:
 * - Test FAILS because window.tiktok.embed() is never explicitly called
 * - Test FAILS because there's no script onload handler
 * - This failure PROVES the bug exists
 * 
 * Expected outcome on FIXED code:
 * - Test PASSES, confirming the embed initialization is properly implemented
 */
describe('Bug Condition Exploration: Non-Visible Videos Are Playable', () => {
  const componentPath = path.join(process.cwd(), 'src/components/TikTokRTB.tsx');
  
  /**
   * Property 1: Fault Condition - Non-Visible Videos Are Playable
   * 
   * For clips 4-5 (videoIndex >= 3) that are not initially visible, verify that:
   * 1. The component has a mechanism to call window.tiktok.embed()
   * 2. The component has a script onload handler to ensure proper initialization
   * 3. All TikTok embeds are initialized, not just initially visible ones
   * 
   * This test scopes to the concrete failing cases: videoIndex >= 3 AND isInitiallyVisible == false
   */
  test.prop([
    fc.record({
      videoIndex: fc.integer({ min: 3, max: 4 }), // Clips 4-5 (0-indexed: 3-4)
      isInitiallyVisible: fc.constant(false)
    })
  ])(
    'Property 1: Component initializes TikTok embeds for non-visible videos (clips 4-5)',
    async (input) => {
      // Verify the component file exists
      expect(fs.existsSync(componentPath)).toBe(true);
      
      const componentContent = fs.readFileSync(componentPath, 'utf-8');
      
      // Verify all 5 TikTok embeds are rendered in the component
      // Count occurrences of .tiktok-embed class
      const embedMatches = componentContent.match(/className="tiktok-embed"/g);
      expect(embedMatches).toBeTruthy();
      
      // Verify TIKTOK_CONTENT array has 5 items
      const contentArrayMatch = componentContent.match(/const TIKTOK_CONTENT = \[([\s\S]*?)\];/);
      expect(contentArrayMatch).toBeTruthy();
      if (contentArrayMatch) {
        const contentItems = contentArrayMatch[1].split(/\{[^}]+\}/g).filter(s => s.trim());
        // Should have 5 items (6 splits including empty strings)
        expect(contentItems.length).toBeGreaterThanOrEqual(4);
      }
      
      // CRITICAL CHECKS - These will FAIL on unfixed code:
      
      // 1. Check if window.tiktok.embed() is called
      const hasEmbedCall = componentContent.includes('window.tiktok') && 
                          componentContent.includes('.embed()');
      
      // 2. Check if there's a script onload handler
      const hasOnloadHandler = componentContent.includes('script.onload') ||
                              componentContent.includes('script.addEventListener(\'load\'');
      
      // 3. Check if there's a TypeScript declaration for window.tiktok
      const hasTypeDeclaration = componentContent.includes('window.tiktok') &&
                                (componentContent.includes('declare') || 
                                 componentContent.includes('Window') ||
                                 componentContent.includes('interface'));
      
      // On UNFIXED code: These assertions will FAIL
      // On FIXED code: These assertions will PASS
      expect(hasEmbedCall).toBe(true);
      expect(hasOnloadHandler).toBe(true);
      
      // Additional verification: Check that the fix properly handles the bug condition
      // For videoIndex >= 3 (clips 4-5), the component should have initialization logic
      if (input.videoIndex >= 3 && !input.isInitiallyVisible) {
        // The fix should ensure window.tiktok.embed() is called after script loads
        // This will initialize ALL embeds, including non-visible ones
        expect(hasEmbedCall && hasOnloadHandler).toBe(true);
      }
    }
  );
  
  it('verifies TikTok embed script is loaded from official CDN', () => {
    const componentContent = fs.readFileSync(componentPath, 'utf-8');
    
    // Verify the script source is correct
    expect(componentContent).toContain('https://www.tiktok.com/embed.js');
    
    // Verify the script is loaded asynchronously
    expect(componentContent).toContain('script.async = true');
  });
  
  it('verifies all 5 TikTok content items are defined', () => {
    const componentContent = fs.readFileSync(componentPath, 'utf-8');
    
    // Verify TIKTOK_CONTENT array exists
    expect(componentContent).toContain('const TIKTOK_CONTENT');
    
    // Verify specific video IDs are present (clips 4-5)
    expect(componentContent).toContain('7381118220578606342'); // Clip 4
    expect(componentContent).toContain('7382537203567578374'); // Clip 5
  });
  
  it('verifies component renders blockquotes with tiktok-embed class', () => {
    const componentContent = fs.readFileSync(componentPath, 'utf-8');
    
    // Verify blockquote elements with tiktok-embed class are rendered
    expect(componentContent).toContain('blockquote');
    expect(componentContent).toContain('tiktok-embed');
    
    // Verify data-video-id attribute is set
    expect(componentContent).toContain('data-video-id');
  });
  
  it('documents expected counterexamples on unfixed code', () => {
    const componentContent = fs.readFileSync(componentPath, 'utf-8');
    
    // Document the expected failures on unfixed code:
    const hasEmbedCall = componentContent.includes('window.tiktok') && 
                        componentContent.includes('.embed()');
    const hasOnloadHandler = componentContent.includes('script.onload') ||
                            componentContent.includes('script.addEventListener(\'load\'');
    
    // These checks document what's missing in the unfixed code:
    // - No explicit call to window.tiktok.embed()
    // - No script onload handler to ensure proper initialization timing
    // - Only initially visible videos are initialized by TikTok's automatic script
    
    if (!hasEmbedCall) {
      console.log('COUNTEREXAMPLE: window.tiktok.embed() is not explicitly called');
    }
    
    if (!hasOnloadHandler) {
      console.log('COUNTEREXAMPLE: No script onload handler found');
    }
    
    // On unfixed code, these will be false, confirming the bug exists
    // On fixed code, these will be true, confirming the fix works
    expect(hasEmbedCall).toBe(true);
    expect(hasOnloadHandler).toBe(true);
  });
});
