---
name: Cyber League
colors:
  surface: '#0c1322'
  surface-dim: '#0c1322'
  surface-bright: '#323949'
  surface-container-lowest: '#070e1d'
  surface-container-low: '#141b2b'
  surface-container: '#191f2f'
  surface-container-high: '#232a3a'
  surface-container-highest: '#2e3545'
  on-surface: '#dce2f7'
  on-surface-variant: '#c2c6d6'
  inverse-surface: '#dce2f7'
  inverse-on-surface: '#293040'
  outline: '#8c909f'
  outline-variant: '#424754'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e6a'
  primary-container: '#4d8eff'
  on-primary-container: '#00285d'
  inverse-primary: '#005ac2'
  secondary: '#ddb7ff'
  on-secondary: '#490080'
  secondary-container: '#6f00be'
  on-secondary-container: '#d6a9ff'
  tertiary: '#00daf3'
  on-tertiary: '#00363d'
  tertiary-container: '#009fb2'
  on-tertiary-container: '#002f35'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#f0dbff'
  secondary-fixed-dim: '#ddb7ff'
  on-secondary-fixed: '#2c0051'
  on-secondary-fixed-variant: '#6900b3'
  tertiary-fixed: '#9cf0ff'
  tertiary-fixed-dim: '#00daf3'
  on-tertiary-fixed: '#001f24'
  on-tertiary-fixed-variant: '#004f58'
  background: '#0c1322'
  on-background: '#dce2f7'
  surface-variant: '#2e3545'
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: '0'
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: '0'
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: '0'
  label-lg:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.04em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.06em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system defines an elite, competitive, and gamified esports interface for cybersecurity professionals, ethical hackers, and capture-the-flag (CTF) competitors. The visual language bridges mission-critical SOC telemetry with the adrenaline of high-stakes competitive esports.

The aesthetic fuses **Dark Tactical Glassmorphism** with **Futuristic Cyber-HUD** paradigms. The overall atmosphere feels classified, high-tech, and precise, driven by pitch-dark environments, controlled neon luminescence, micro-grid line textures, and high-frequency data feedback. Every interaction communicates low-latency responsiveness, tactical clarity, and triumphant gamified progression without crossing into chaotic visual noise.

## Colors

The palette operates strictly within a calibrated dark-mode hierarchy designed to minimize eye strain during extended night operations while drawing immediate focus to competitive state shifts:

- **Canvas Deep Navy (`#0A0F1F`)**: The ground layer representing absolute terminal depth.
- **Surface Elevation Cards (`#111827`)**: Layered containment surfaces providing high structural contrast against the ground.
- **Electric Blue (`#3B82F6`) to Neon Purple (`#A855F7`)**: Used predominantly as an active gradient for primary actions, rank ascensions, and dominant interface drivers.
- **Neon Cyan (`#00E5FF`)**: High-priority interactive nodes, active telemetry, critical vectors, and player focus targets.
- **Emerald Green (`#22C55E`)**: Confirmed exploits, XP gain vectors, successful decrypts, and system stability.
- **Esports Tier System**:
  - Gold (`#FFD700`): Apex tier, elite bracket indicators, and mastery milestones.
  - Silver (`#C0C0C0`): Mid-bracket prestige nodes and veteran rank indicators.
  - Bronze (`#CD7F32`): Foundational division rank indicators.
- **Borders & Inactive Grids (`#2D3748`)**: Structural framework dividers that remain subtle until focused or hovered.

## Typography

The typographic hierarchy implements three distinct roles:

- **Headlines (Space Grotesk)**: Provides an angular, technological posture that establishes strong visual hierarchy for match lobbies, tournament titles, and scoreboard headers.
- **Body & Longform (Inter)**: Delivers neutral, crystal-clear readability for technical vulnerability writeups, CTF debriefs, and rule engines.
- **Labels, Telemetry & Code (JetBrains Mono)**: Encodes numerical metrics, XP counters, timestamps, hashes, terminal prompts, and rank acronyms in uppercase with tabular figures to avoid layout jitter during live-stream score ticking.

## Layout & Spacing

The layout is built around a 12-column fluid grid system geared for high-density competitive telemetry:

- **Breakpoints**: Mobile (under 768px, 4-column), Tablet (768px - 1199px, 8-column), Desktop (1200px+, 12-column).
- **HUD Shell**: Fixed viewport frame with a 64px persistent tactical command header and optional collapsible mission sidebar (280px).
- **Rhythm**: Consistent 8px baseline rhythm across all content containers.
- **Reflow Rules**: On smaller screens, side-by-side terminal logs and real-time network graphs wrap into a stacked tabbed view to preserve minimum legible widths for monospaced metrics.

## Elevation & Depth

Visual hierarchy is maintained through tactical glassmorphism and luminescence rather than heavy drop shadows:

- **Base Canvas**: Solid `#0A0F1F` with a faint 24px micro-grid background pattern (`rgba(45, 55, 72, 0.25)`).
- **Surface Level 1 (Panels & Cards)**: `rgba(17, 24, 39, 0.75)` backdrop fill paired with `backdrop-filter: blur(12px)` and a 1px border of `#2D3748`.
- **Surface Level 2 (Floating Modals & Overlays)**: `rgba(17, 24, 39, 0.90)` backdrop fill, `backdrop-filter: blur(20px)`, and a 1px border of `rgba(59, 130, 246, 0.3)`.
- **Active State Glow**: Focused cards, active terminals, and high-rank cards use targeted outer glows:
  - Electric/Cyan: `0 0 16px rgba(0, 229, 255, 0.35)`
  - XP Gain/Success: `0 0 16px rgba(34, 197, 94, 0.35)`
  - Gold Tier: `0 0 20px rgba(255, 215, 0, 0.3)`

## Shapes

The design uses tight, controlled corners (0.25rem base) with strategic 45-degree chamfers on tactical HUD panels, badges, and primary tournament entry nodes. 

This creates a sharp, military-spec command terminal feeling while preserving modern interface ergonomics. Full pills are restricted exclusively to live status indicators and compact numerical counter pills.

## Components

### Buttons
- **Primary Action (Deploy / Submit Flag)**: Linear gradient background from `#3B82F6` to `#A855F7`, white high-contrast text, 0.25rem border-radius, with an inset top-edge highlight (`1px solid rgba(255, 255, 255, 0.2)`). Hover initiates a neon cyan edge bloom and a +2px vertical lift.
- **Tactical Secondary**: Background `rgba(17, 24, 39, 0.8)`, border `1px solid #2D3748`, text `#00E5FF`. Hover transitions the border to `#00E5FF` with a subtle diffuse shadow.
- **Ghost/Destructive**: Transparent background, border `1px solid rgba(239, 68, 68, 0.4)`, text `#EF4444`.

### Cards & HUD Panels
- Constructed with `#111827` at 80% opacity and `backdrop-filter: blur(12px)`.
- Borders use a crisp 1px `#2D3748`. Active player or high-priority mission cards swap the top border for a 2px `#00E5FF` or `#A855F7` linear accent line.

### Inputs & Terminal Fields
- Background `rgba(10, 15, 31, 0.8)`, border `1px solid #2D3748`, text color `#FFFFFF`. 
- Focus triggers border color `#00E5FF` accompanied by a localized box-shadow `0 0 8px rgba(0, 229, 255, 0.3)`.
- Monospace font (`JetBrains Mono`) for CTF submission inputs with an active cyan block caret.

### Checkboxes & Radios
- Square forms for checkboxes (roundedness: 2px) and diamonds for radios.
- Inactive state: `#111827` fill with `#2D3748` border.
- Selected state: `#3B82F6` fill with an inner checkmark or diamond pip in `#00E5FF`.

### Chips & Badges
- **XP Counters**: Monospaced `#22C55E` text inside a `rgba(34, 197, 94, 0.12)` pill with a `1px solid rgba(34, 197, 94, 0.3)` border.
- **Division Tags (Gold/Silver/Bronze)**: Metallic tinted backgrounds (e.g., Gold: `rgba(255, 215, 0, 0.15)`) with respective solid colored borders (`#FFD700`, `#C0C0C0`, `#CD7F32`) and chamfered corners.

### Lists & Leaderboards
- Alternating subtle zebra striping (`#111827` against `rgba(17, 24, 39, 0.4)`).
- Hovering a row applies a full-width left border accent (3px in `#00E5FF`) and background tint (`rgba(59, 130, 246, 0.08)`).
- Tabular numeric alignment throughout all rank and score positions.