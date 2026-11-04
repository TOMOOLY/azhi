# Contrast audit (preview)

Measured with check_contrast.py. AA: 4.5:1 normal text, 3:1 large text (≥24px or ≥18.66px bold) and UI boundaries/focus.

| Role | FG | BG | Ratio | AA normal | Where |
|---|---|---|---|---|---|
| Body text | #1f1f1f | #fafafa | 15.79:1 | pass | all pages, paper ground |
| Secondary text | #545454 | #fafafa | 7.26:1 | pass | meta, dates, card categories |
| Tertiary text | #6b6b6b | #fafafa | 5.11:1 | pass | inactive client names (large), pending years |
| Body text on sheet | #1f1f1f | #ffffff | 16.48:1 | pass | form, FAQ cards, facts |
| Secondary on sheet | #545454 | #ffffff | 7.57:1 | pass | FAQ answers, facts labels, form status |
| Placeholder on sheet | #6b6b6b | #ffffff | 5.33:1 | pass | form placeholders |
| Field boundary on sheet | #8c8c8c | #ffffff | 3.36:1 | FAIL | input underline (UI 3:1) |
| Secondary on tint | #545454 | #ebebeb | 6.35:1 | pass | pending-case note, journal row hover |
| Body on tint | #1f1f1f | #ebebeb | 13.83:1 | pass | journal row hover |
| On-dark text | #fafafa | #261d1d | 15.77:1 | pass | services, footer |
| On-dark secondary | #a8a29e | #261d1d | 6.53:1 | pass | service body/tags, footer labels, foot bar |
| Cover text | #fafafa | #000000 | 20.12:1 | pass | home cover, contact closer |
| Cover secondary | #a8a29e | #000000 | 8.33:1 | pass | cover location/clock line |
| Primary button | #fafafa | #1f1f1f | 15.79:1 | pass | 开始项目 on light grounds |
| Primary button hover | #fafafa | #000000 | 20.12:1 | pass | hover state |
| Primary button on dark | #000000 | #fafafa | 20.12:1 | pass | cover button, nav action over cover |
| Focus ring on paper | #1f1f1f | #fafafa | 15.79:1 | pass | 2px outline (UI 3:1) |
| Focus ring on dark | #fafafa | #261d1d | 15.77:1 | pass | 2px outline (UI 3:1) |
| Caption on lit photo (worst sampled) | #fafafa | #2a2228 | 14.82:1 | pass | contact closer caption over darkest scrimmed area |

Note: "Field boundary" is a non-text UI boundary, so its threshold is 3:1 (passes at 3.36:1); the AA-normal column does not apply to it.

## Failing pairs found in the original and fixed

| Original pair | Ratio | Where | Fix |
|---|---|---|---|
| #d6d6d6 on #fafafa | 1.39:1 | inactive names in “信任这些品牌” list | #6b6b6b (5.11:1) |
| #737373 on #261d1d | 3.47:1 | service tag lines on the dark services field | #a8a29e (6.53:1) |
| rgba(250,250,250,.42) ≈ #706f70 on #0d0a0c | 3.94:1 | contact light-footer copyright | light footer replaced by the shared footer (#a8a29e on #261d1d, 6.53:1) |
| #ebebeb field rules on #ffffff | 1.19:1 | contact form row lines | input underline #8c8c8c (3.36:1) |
| submit button at opacity .5 | n/a (translucent) | contact form, disabled until filled | button always solid; native validation instead of a disabled state |
