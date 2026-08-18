# Ibtihel & Mahdi — Dynamic Virtual Invitation

## Structure

```text
ibtihel_mahdi_invitation/
├── index.html
├── invitation.html
├── styles.css
├── script.js
└── assets/
    ├── invitation-desktop.png
    └── invitation-mobile.png
```

## Add your images

Put your two generated images in `assets/` using exactly:

- `invitation-desktop.png` — 1920×1080
- `invitation-mobile.png` — portrait/mobile artwork

The same responsive image system is used on the cover and the inside page.

## Change the invitation

Open `script.js` and edit only:

```js
const INVITATION = {
  bride: "ابتهال",
  groom: "مهدي",
  initials: "I & M",
  familyOne: "أنور سلمان",
  familyTwo: "الحبيب سعيدي",
  date: "السبت 26 سبتمبر 2026",
  time: "انطلاقاً من الساعة الثامنة ليلاً (20:00)",
  venue: "يُحدد لاحقاً"
};
```

## Flow

`index.html` → click "اضغط لفتح الدعوة" → `invitation.html`

The opening is a real second HTML page, so it behaves like entering the inside of the envelope.

## Theme

The UI palette is based on the supplied artwork:

- ivory / warm paper
- champagne gold
- copper / bronze wax
- muted sage green
- soft blush

No framework or build process is required.


## Wax stamp

The CSS monogram circles have been replaced by:

`assets/stamp.png`

The transparent PNG is used directly, so the original bronze wax texture and engraved `I & M` are preserved.

## Music

Add your song as:

`assets/music.mp3`

The song starts when the inside invitation page opens (subject to the browser's autoplay policy). A floating bronze play/pause button appears at the bottom-right corner.

If autoplay is blocked, tap the button once to start the music.
