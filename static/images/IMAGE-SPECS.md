# Bamboo Theme Image Specifications

## Required Images

You need to create **4 PNG images** with transparency for the bamboo theme:

### 1. Bamboo Shadows (Light Mode)
**Filename:** `bamboo-light.png`
**Location:** `/static/images/bamboo-light.png`

**Specifications:**
- Format: PNG with transparency
- Dimensions: 400-600px wide, 1000-1500px tall (or aspect ratio to fit full page height)
- Style: Watercolor bamboo stalks and leaves
- Colors: Green tones (#4a6b3a, #6a8b5a, #3a5b2a) - bamboo greens
- Background: Transparent
- Placement: Will appear on the right side of the page
- Opacity: Will be set to 30% via CSS
- Design notes:
  - Vertical bamboo stalks with nodes
  - Leaves scattered throughout
  - Watercolor/ink wash aesthetic
  - Fade at edges for soft integration
  - Should suggest Chinese brush painting style

### 2. Bamboo Shadows (Dark Mode)
**Filename:** `bamboo-dark.png`
**Location:** `/static/images/bamboo-dark.png`

**Specifications:**
- Format: PNG with transparency
- Dimensions: Same as light mode (400-600px × 1000-1500px)
- Style: Same bamboo design as light mode
- Colors: Lighter, muted greens (#7a9b6a, #8aab7a) for visibility on dark background
- Background: Transparent
- Opacity: Will be set to 25% via CSS
- Design notes: Same as light mode but adjusted colors for dark background

### 3. Seal Stamp (Light Mode)
**Filename:** `stamp-light.png`
**Location:** `/static/images/stamp-light.png`

**Specifications:**
- Format: PNG with transparency
- Dimensions: 80-100px square
- Style: Traditional Chinese seal/chop stamp
- Design: Chinese characters "三体" (Santi/Three Body)
- Colors: 
  - Red seal color: #c83030 or similar traditional red
  - Background: Can include cream/paper texture (#fdfcf7) or transparent
- Border: Traditional square or slightly irregular seal border
- Design notes:
  - Characters in seal script style if possible
  - Can be vertical orientation
  - Weathered/stamped texture is good
  - Should look like an official chop stamp

### 4. Seal Stamp (Dark Mode)
**Filename:** `stamp-dark.png`
**Location:** `/static/images/stamp-dark.png`

**Specifications:**
- Format: PNG with transparency
- Dimensions: 80-100px square
- Style: Same as light mode
- Colors: Slightly brighter red (#d85050) for visibility on dark background
- Background: Dark paper texture (#252820) or transparent
- Design notes: Same as light mode but color-adjusted for dark backgrounds

## CSS Integration

The images are already integrated in the bamboo theme CSS:

```scss
// Bamboo background
.theme-bamboo::after {
  background-image: url('/images/bamboo-light.png');  // Light mode
  background-image: url('/images/bamboo-dark.png');   // Dark mode
}

// Stamp
.theme-bamboo .site-credits::before {
  background-image: url('/images/stamp-light.png');   // Light mode
  background-image: url('/images/stamp-dark.png');    // Dark mode
}
```

## Placement Preview

**Bamboo:** Fixed position on the right side of the page, full height
**Stamp:** Positioned above the "Built with Hugo" footer text

## Design Tips

1. **Bamboo:** 
   - Use soft, watercolor-like edges
   - Vary the opacity within the image for depth
   - Leave plenty of transparency around edges
   - Consider asymmetric composition

2. **Stamp:**
   - Traditional Chinese seal stamps are usually square
   - Red ink on cream/white paper is traditional
   - Can add slight texture/grain for authenticity
   - The characters 三体 should be prominent and legible

## Testing

After adding the images, view the site in both light and dark modes to ensure:
- Colors work well with the cream/dark backgrounds
- Opacity levels are appropriate
- Images don't obstruct text readability
- Mobile sizes still look good (images scale down automatically)
