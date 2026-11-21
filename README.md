# AK Physio & Rehab Clinic — website

One-page marketing site for **AK Physio & Rehab Clinic**, Thudiyalur, Coimbatore.
*Movement is Medicine.* It uses the same stack and conventions as the Neotechmate site.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out (deployable to Azure Static Web Apps, like Neotechmate)
```

## Sections

| Section | What it does |
|---|---|
| Hero | "Movement is Medicine." with a recovery dial cycling Pain Relief → Mobility → Strength → Performance |
| Marquee | The conditions treated |
| Specialties | Spine Care · Joint & Limb Care · Sports & Rehabilitation |
| Where does it hurt? | Interactive body map: tap a point to see the condition and how it's treated |
| Rehab gym | The integrated gym and the progressive-loading path from treatment table to gym floor |
| Journey | Assess → Relieve → Restore → Strengthen, with a line that fills as you scroll |
| Why us / FAQ | The clinic's commitments to patients, and general first-visit questions |
| Book & visit | Booking form that opens WhatsApp with the message filled in, plus a map, address and both phone numbers |

Light theme (clinic teal) by default, plus a dark "gym floor" theme (charcoal and lime) on the toggle.
On phones, a Call / Chat / Book bar stays at the bottom of the screen.

## Editing content

All copy, phone numbers, the address, conditions, body-map zones and FAQs live in **`lib/site.ts`**.

## Confirm before launch (marked `VERIFY` in `lib/site.ts`)

- **Domain**: `site.url` is a placeholder (`akphysiorehab.in`).
- **WhatsApp number**: assumed to be 79045 44236. The booking form and every WhatsApp button send to it.
- **Opening hours**: not given, so the site says "By appointment. Call to confirm today's timings."
- **Photos**: none supplied yet. Real clinic and gym photos would strengthen the hero and gym sections.
- **FAQ answers** are general physiotherapy guidance. Ask the clinic to check them against its own policies.
