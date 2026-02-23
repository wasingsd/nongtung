# TikTok Video Pagination Fix - Bugfix Design

## Overview

The TikTok embed script (`https://www.tiktok.com/embed.js`) only initializes video embeds that are present in the DOM when the script loads. Videos that become visible later through scrolling (clips 4-5) are not initialized, making them unplayable. The fix requires re-initializing the TikTok embed script after the component mounts and whenever the DOM is ready, ensuring all embeds are properly initialized regardless of their initial visibility.

## Glossary

- **Bug_Condition (C)**: The condition that triggers the bug - when TikTok videos beyond the initially visible viewport (clips 4-5) are scrolled into view
- **Property (P)**: The desired behavior when scrolling to non-visible videos - all TikTok embeds should be playable with functional play buttons
- **Preservation**: Existing functionality for initially visible videos (clips 1-3), smooth scrolling, navigation controls, and script loading behavior that must remain unchanged
- **TikTokRTB**: The component in `src/components/TikTokRTB.tsx` that renders the horizontal scrollable carousel of TikTok video embeds
- **tiktok.embed()**: The global function provided by TikTok's embed script that initializes all `.tiktok-embed` blockquotes in the DOM
- **TIKTOK_CONTENT**: The array of 5 TikTok video/photo objects with IDs and types

## Bug Details

### Fault Condition

The bug manifests when a user scrolls to view TikTok videos that were not initially visible in the viewport (typically clips 4-5 in the carousel). The TikTok embed script loads once on component mount but only initializes embeds that are present and visible in the DOM at that moment, leaving later videos uninitialized.

**Formal Specification:**
```
FUNCTION isBugCondition(input)
  INPUT: input of type { videoIndex: number, isInitiallyVisible: boolean }
  OUTPUT: boolean
  
  RETURN input.videoIndex >= 3
         AND input.isInitiallyVisible == false
         AND userScrollsToVideo(input.videoIndex)
         AND NOT videoIsPlayable(input.videoIndex)
END FUNCTION
```

### Examples

- User loads the page → clips 1-3 are visible and playable → user scrolls right → clips 4-5 become visible but play buttons don't work (BUG)
- User loads the page on mobile → clip 1 is visible and playable → user scrolls to clip 4 → play button doesn't respond (BUG)
- User loads the page on desktop → clips 1-3 are visible and playable → user clicks right arrow twice → clip 5 is visible but cannot be played (BUG)
- User loads the page → all clips should be playable regardless of initial visibility (EXPECTED)

## Expected Behavior

### Preservation Requirements

**Unchanged Behaviors:**
- Initially visible TikTok videos (clips 1-3) must continue to display and play correctly
- The TikTok embed script must continue to load from the official TikTok CDN (`https://www.tiktok.com/embed.js`)
- Smooth scrolling behavior and navigation controls (left/right arrows) must continue to work
- Navigation arrow visibility logic based on scroll position must remain unchanged
- Scroll indicator dots on mobile must continue to display
- The component's visual styling, layout, and responsive behavior must remain unchanged

**Scope:**
All interactions that do NOT involve playing videos that were not initially visible should be completely unaffected by this fix. This includes:
- Mouse/touch scrolling through the carousel
- Clicking navigation arrows
- Viewing the initially visible videos
- Following the TikTok profile link
- Component mounting and unmounting behavior

## Hypothesized Root Cause

Based on the bug description and code analysis, the most likely issue is:

1. **Script Initialization Timing**: The TikTok embed script loads asynchronously via `script.async = true` in the `useEffect` hook. When the script loads and executes, it calls an internal initialization function that finds all `.tiktok-embed` blockquotes in the DOM and converts them into interactive embeds. However, this initialization happens only once when the script first loads.

2. **Missing Re-initialization**: After the initial script load, there is no mechanism to re-initialize embeds. The script doesn't automatically detect new embeds or embeds that become visible later. The global `window.tiktok.embed()` function needs to be called explicitly to re-process the DOM.

3. **Viewport Visibility Assumption**: TikTok's embed script likely assumes all embeds are visible when initialized. Videos outside the initial viewport are present in the DOM but may not be fully initialized by the script's automatic initialization.

4. **No Script Load Callback**: The current implementation doesn't wait for the script to load before attempting any initialization. There's no `script.onload` handler to ensure the script is ready and to trigger the `window.tiktok.embed()` function.

## Correctness Properties

Property 1: Fault Condition - Non-Visible Videos Are Playable

_For any_ TikTok video embed in the carousel that was not initially visible in the viewport (clips 4-5), the fixed component SHALL ensure the video is properly initialized and playable when scrolled into view, with a functional play button that triggers video playback.

**Validates: Requirements 2.1, 2.2**

Property 2: Preservation - Initially Visible Videos Continue Working

_For any_ TikTok video embed that is initially visible in the viewport (clips 1-3), the fixed component SHALL produce exactly the same behavior as the original component, preserving playback functionality, visual display, and interaction behavior.

**Validates: Requirements 3.1, 3.2, 3.3, 3.4**

## Fix Implementation

### Changes Required

Assuming our root cause analysis is correct:

**File**: `src/components/TikTokRTB.tsx`

**Function**: `TikTokRTB` (the main component function)

**Specific Changes**:
1. **Add Script Load Callback**: Add an `onload` event handler to the script element that calls `window.tiktok.embed()` after the script loads
   - This ensures the TikTok embed function is available before we try to use it
   - The callback should check if `window.tiktok?.embed` exists before calling

2. **Call Embed Initialization**: After the script loads, explicitly call `window.tiktok.embed()` to initialize all embeds
   - This function scans the entire DOM for `.tiktok-embed` blockquotes and initializes them
   - Should be called in the script's `onload` handler

3. **Add TypeScript Type Declaration**: Add a type declaration for the `window.tiktok` global to avoid TypeScript errors
   - Declare `window.tiktok` with an `embed()` method

4. **Optional: Add Timeout Fallback**: Consider adding a small timeout fallback in case the script loads before the `onload` handler is attached
   - Use `setTimeout` to call `window.tiktok?.embed()` after a short delay (e.g., 100ms)
   - This handles edge cases where the script might be cached and load synchronously

5. **Maintain Cleanup Logic**: Keep the existing cleanup logic that removes the script on unmount
   - This prevents memory leaks and duplicate scripts

## Testing Strategy

### Validation Approach

The testing strategy follows a two-phase approach: first, surface counterexamples that demonstrate the bug on unfixed code, then verify the fix works correctly and preserves existing behavior.

### Exploratory Fault Condition Checking

**Goal**: Surface counterexamples that demonstrate the bug BEFORE implementing the fix. Confirm or refute the root cause analysis. If we refute, we will need to re-hypothesize.

**Test Plan**: Write tests that simulate the component mounting, script loading, and user scrolling to non-visible videos. Run these tests on the UNFIXED code to observe failures and understand the root cause.

**Test Cases**:
1. **Non-Visible Video Initialization Test**: Mount component, wait for script load, check if clip 5's blockquote has been transformed into an interactive embed (will fail on unfixed code)
2. **Script Load Timing Test**: Verify that `window.tiktok.embed()` is called after script loads (will fail on unfixed code - function not called)
3. **DOM Query Test**: Check if all 5 `.tiktok-embed` blockquotes exist in DOM after mount (should pass - they're all rendered)
4. **Embed Transformation Test**: Check if all 5 embeds have been transformed by TikTok script (will fail on unfixed code - only visible ones transformed)

**Expected Counterexamples**:
- Clips 4-5 remain as plain blockquotes without TikTok's interactive player UI
- `window.tiktok.embed()` is never explicitly called in the component
- Possible causes: missing script load callback, no explicit embed initialization call, timing issues

### Fix Checking

**Goal**: Verify that for all inputs where the bug condition holds, the fixed function produces the expected behavior.

**Pseudocode:**
```
FOR ALL videoIndex WHERE videoIndex >= 3 AND NOT isInitiallyVisible(videoIndex) DO
  result := renderAndScrollToVideo(videoIndex)
  ASSERT videoIsPlayable(result.video)
  ASSERT videoHasPlayButton(result.video)
END FOR
```

### Preservation Checking

**Goal**: Verify that for all inputs where the bug condition does NOT hold, the fixed function produces the same result as the original function.

**Pseudocode:**
```
FOR ALL videoIndex WHERE videoIndex < 3 OR isInitiallyVisible(videoIndex) DO
  ASSERT originalComponent(videoIndex).behavior = fixedComponent(videoIndex).behavior
END FOR
```

**Testing Approach**: Property-based testing is recommended for preservation checking because:
- It generates many test cases automatically across the input domain
- It catches edge cases that manual unit tests might miss
- It provides strong guarantees that behavior is unchanged for all non-buggy inputs

**Test Plan**: Observe behavior on UNFIXED code first for initially visible videos and navigation, then write property-based tests capturing that behavior.

**Test Cases**:
1. **Initially Visible Videos Preservation**: Observe that clips 1-3 play correctly on unfixed code, then write test to verify this continues after fix
2. **Navigation Controls Preservation**: Observe that left/right arrows work correctly on unfixed code, then write test to verify this continues after fix
3. **Scroll Behavior Preservation**: Observe that smooth scrolling works correctly on unfixed code, then write test to verify this continues after fix
4. **Script Loading Preservation**: Observe that script loads from TikTok CDN on unfixed code, then write test to verify this continues after fix

### Unit Tests

- Test that TikTok embed script is loaded on component mount
- Test that `window.tiktok.embed()` is called after script loads
- Test that all 5 video embeds are present in the DOM
- Test that script cleanup occurs on component unmount
- Test that navigation buttons appear/disappear based on scroll position

### Property-Based Tests

- Generate random scroll positions and verify all videos at those positions are playable
- Generate random viewport sizes and verify videos are initialized correctly regardless of initial visibility
- Test that script loading and initialization work across many different timing scenarios

### Integration Tests

- Test full user flow: load page → scroll to clip 5 → click play button → video plays
- Test navigation flow: load page → click right arrow multiple times → all videos are playable
- Test mobile flow: load page on mobile viewport → swipe through all videos → all are playable
- Test that visual feedback (play button, video player UI) appears correctly for all videos
