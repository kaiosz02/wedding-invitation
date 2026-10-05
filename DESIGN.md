---
name: "Thiệp cưới"
description: "Paper wedding invitation faithful to the supplied ui_mau."
colors:
  burgundy: "#511419"
  cream: "#fff7eb"
  paper-text: "#ece4d8"
  muted: "#dbccbf"
  canvas: "#f0e8df"
  field: "#fffaf2"
  secondary-text: "#815658"
  button-hover: "#743139"
  focus: "#b97b44"
typography:
  display:
    fontFamily: "'Viaoda Libre', serif"
    fontSize: "clamp(38px, 11vw, 46px)"
    fontWeight: 400
    lineHeight: 1.1
  headline:
    fontFamily: "'Times New Roman', serif"
    fontSize: "20px"
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: ".03em"
  title:
    fontFamily: "'Viaoda Libre', serif"
    fontSize: "36px"
    fontWeight: 400
  body:
    fontFamily: "'Cormorant Garamond', 'Times New Roman', serif"
    fontSize: "17px"
    lineHeight: 1.5
  label:
    fontFamily: "'Cormorant Garamond', 'Times New Roman', serif"
    fontSize: "15px"
    fontWeight: 600
  script:
    fontFamily: "'The Nautigal', cursive"
    fontSize: "48px"
    lineHeight: 1
rounded:
  field: "5px"
  button: "6px"
  inset: "10px"
  red-paper: "13px"
  photograph: "15px"
  cream-button: "24px"
  circle: "50%"
spacing:
  field: "12px"
  button: "10px 24px"
  section: "44px 24px"
  red-paper: "36px 20px 40px"
  guestbook-paper: "12px 24px 24px"
  calendar: "20px 14px 22px"
  wish: "16px"
components:
  button-primary:
    backgroundColor: "{colors.burgundy}"
    textColor: "{colors.cream}"
    rounded: "{rounded.button}"
    padding: "{spacing.button}"
  button-primary-hover:
    backgroundColor: "{colors.button-hover}"
  button-cream:
    backgroundColor: "{colors.paper-text}"
    textColor: "{colors.burgundy}"
    rounded: "{rounded.cream-button}"
    padding: "{spacing.button}"
  input:
    backgroundColor: "{colors.field}"
    textColor: "{colors.burgundy}"
    rounded: "{rounded.field}"
    padding: "{spacing.field}"
  red-paper:
    backgroundColor: "{colors.burgundy}"
    textColor: "{colors.paper-text}"
    rounded: "{rounded.red-paper}"
    padding: "{spacing.red-paper}"
  calendar:
    backgroundColor: "{colors.paper-text}"
    textColor: "{colors.burgundy}"
    rounded: "{rounded.inset}"
    padding: "{spacing.calendar}"
  guestbook-paper:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.burgundy}"
    rounded: "{rounded.inset}"
    padding: "{spacing.guestbook-paper}"
  wish:
    textColor: "{colors.burgundy}"
    rounded: "{rounded.button}"
    padding: "{spacing.wish}"
---

# Design System: Thiệp cưới

## Overview

**Creative North Star: "The Paper Wedding Invitation"**

The supplied ui_mau is the visual authority. Burgundy paper, warm cream stock, formal serif lettering, floral cutouts and layered envelope imagery carry the invitation's intimate, ceremonial character.

The implemented system reads vertically on a phone. Cream sections alternate with inset burgundy panels; photographs and paper textures supply material depth. Preserve this established visual world when extending the page.

**Key Characteristics:**

- Warm cream stock and textured burgundy paper.
- Formal serif names with script ampersands.
- Centered invitation content and narrow, readable forms.
- Layered floral, envelope and photographic assets from ui_mau.

## Colors

The palette follows printed burgundy ink and warm paper; frontmatter contains the normative values.

### Primary

- **Burgundy:** body ink, event panels, actions and selected calendar date.
- **Button hover:** the lighter burgundy used on primary action hover.

### Neutral

- **Cream:** invitation stock and cream action hover.
- **Paper text:** light lettering on burgundy and the restored calendar inset.
- **Muted:** supporting event details on dark paper.
- **Canvas:** outer desktop background.
- **Field:** input stock; wishes use a translucent version of this surface.
- **Secondary text:** placeholders, form notes and calendar weekday labels.
- **Focus:** warm brown outline for keyboard focus.

**The Paper Contrast Rule.** Keep light lettering on burgundy panels and burgundy lettering on cream insets.

## Typography

Viaoda Libre supplies names and expressive section titles. Cormorant Garamond supplies body copy, forms and supporting details; Times New Roman supplies compact uppercase formal headings and the large day number. The Nautigal is reserved for ampersands.

The frontmatter records the mobile role defaults. Couple names enlarge to 58px from the desktop breakpoint; formal names use a separate responsive clamp and become 48px on desktop. RSVP uses a 32px display heading; guestbook and gift use the title role. Supporting details use the observed 12–16px range. Preserve these distinctions instead of applying a single heading style everywhere.

**The Script Accent Rule.** Use The Nautigal for the existing ampersand accents; retain serif typography for readable content and controls.

## Layout

The invitation is a centered, single-column sheet with a maximum width of 900px. Event paper panels occupy 88% of the sheet, capped at 420px on mobile and 560px from 768px. Standard sections use the frontmatter section spacing; desktop vertical section padding becomes 54px.

Body content is centered, while forms and wishes align left. Forms cap at 360px, wishes at 400px, and the cream calendar at 320px. Family details remain a two-column grid. Album height grows from 340px to 520px on desktop; screens narrower than 360px use 300px and tighter panel spacing. Preserve the vertical reading order and allow names and messages to wrap.

## Elevation & Depth

Depth is material: multiplied paper textures, translucent castle backgrounds, floral cutouts, a rotated portrait and overlapping envelope layers. Soft offset shadows belong to these physical objects rather than every section. Burgundy panels use `4px 4px 10px #0004`; guestbook paper uses `4px 6px 10px #51141926`; album photos use `0 12px 24px #51141926`. The desktop sheet gains a faint ambient shadow.

Decorations float gently; album changes use the custom easing recorded in the sidecar. Reduced-motion preferences disable animations and transitions and remove smooth scrolling.

## Shapes

Paper panels have softly rounded corners. Inputs and standard actions have smaller radii; the cream RSVP action is a pill. Photos and venue imagery have broader rounding. Calendar selection, dress swatches and the music control are circular. Thin burgundy or pale-paper borders define fields, wishes and date separators without changing the printed-paper character.

## Components

### Buttons

The fixed music control sits at the lower right with safe-area spacing. Its cream record icon rotates during playback and displays a diagonal mute stroke while paused. The button has a stateful accessible label and pressed state; reduced motion stops rotation. Playback begins only after the visitor opens the invitation or presses the control.

Primary buttons are burgundy with cream lettering, the frontmatter padding, and a minimum height of 46px. Hover shifts to the recorded lighter burgundy. The cream RSVP action reverses the colors, has pill corners and a maximum width of 270px. The calendar download action is a restrained underlined text button. Keyboard focus uses a 2px warm brown outline offset by 5px; disabled buttons reduce opacity and use a wait cursor.

### Cards / Containers

Burgundy event panels retain texture, light text, soft corners and material shadow. The calendar is a cream inset inside the reception panel, with a burgundy circular selected date and ruled weekday labels. Guestbook form paper is a single cream panel with a multiplied paper texture at 0.4 opacity, a soft shadow and a floral decoration; wishes are separate translucent cream cards with thin borders and small corners.

### Inputs / Fields

Inputs, selects and textareas use warm pale stock, burgundy text, a translucent burgundy border, 12px padding and a minimum height of 46px. Field type is 16px. Labels sit above fields in a semibold serif. Textareas resize vertically. Preserve the shared keyboard-focus treatment and visible form status text.

### Album and Envelope

The cover combines a tilted bordered portrait, floral cutout and two envelope layers. The album uses rounded photographic cards, a perspective stage and soft shadows. Arrow controls provide generous 44px targets; enlarged images open against a dark full-viewport backdrop.

### Opening Screen

Before opening, the card arrives over 800ms and floats upward by 7px on a six-second cycle. Flowers sway by 1.5 degrees, the heart seal gives a subtle double beat and the button carries an occasional light sweep. These loops pause in background tabs, stop when the card launches and are disabled under reduced-motion preferences. The launch samples the card's current transform to preserve continuity.

The initial screen follows the supplied reference image: a deep burgundy gradient field with sparse drifting heart SVGs and a centered cream invitation card (500px wide, at least 350px high). Mirrored floral cutouts flank configured names, with a round heart seal, a small divider, reception date and the greeting above a burgundy pill button. The card shrinks within 16px side margins on phones. Clicking “Mở thiệp” launches the card upward over 850ms while 36 mobile or 48 desktop hearts burst from its center. After a 200ms pause, the cover and main page crossfade over 1100ms. The sequence uses the Web Animations API and removes particles and animation handles at completion. Main content remains hidden and inert until opening; scrolling and focus become available after the transition. Reduced motion skips the transition and heart animation. The card reappears on each page load.

## Do's and Don'ts

### Do:

- **Do** preserve ui_mau's paper textures, floral assets, envelope composition and established palette.
- **Do** keep the calendar inset and guestbook form/cards light against the surrounding paper.
- **Do** retain readable serif form text, visible keyboard focus and reduced-motion behavior.

### Don't:

- **Don't** replace the supplied visual world with a new aesthetic or a generic dashboard layout.
- **Don't** flatten the envelope and photographic layers into unrelated decorative cards.
- **Don't** extend script typography into body copy or form controls.
