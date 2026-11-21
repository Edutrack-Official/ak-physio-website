/**
 * Single source of truth for the clinic's copy and contact details.
 * Edit content here, not in components.
 *
 * Items marked VERIFY were not in the brief and must be confirmed by the
 * clinic before launch.
 */

export const site = {
  name: "AK Physio & Rehab",
  legalName: "AK Physio & Rehab Clinic",
  motto: "Movement is Medicine",
  pillars: ["Pain Relief", "Mobility", "Strength", "Performance"],
  description:
    "Physiotherapy and rehabilitation in Thudiyalur, Coimbatore — with an in-house gym, so your recovery carries on from the treatment table to full strength under one roof.",
  // VERIFY: the clinic's real domain.
  url: "https://www.akphysiorehab.in",
  address: {
    lines: ["Leelaram Clinic, Priyamangala Towers, 1st Floor", "Thudiyalur, Coimbatore – 641034"],
    short: "Thudiyalur, Coimbatore",
    mapQuery: "Priyamangala Towers, Thudiyalur, Coimbatore 641034",
  },
  phones: [
    { display: "79045 44236", href: "+917904544236" },
    { display: "96880 90658", href: "+919688090658" },
  ],
  // VERIFY: which number takes WhatsApp. The first one is assumed.
  whatsapp: "917904544236",
} as const;

export const doctor = {
  name: "Dr. Arunkumar",
  // VERIFY: exact title and qualifications (e.g. BPT, MPT, specialisation).
  role: "Physiotherapist",
  photo: "/images/team/dr-arunkumar.jpg",
  photoAlt: "Dr. Arunkumar in a white clinic coat with a caduceus pin and navy scrubs, seated",
  instagram: "drarunkumar_ak",
  instagramUrl: "https://www.instagram.com/drarunkumar_ak/",
} as const;

export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.mapQuery)}`;
export const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(site.address.mapQuery)}&output=embed`;

export function whatsappLink(text: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const navLinks = [
  { label: "Specialties", href: "#specialties" },
  { label: "Where it hurts", href: "#body-map" },
  { label: "Rehab Gym", href: "#gym" },
  { label: "Your Journey", href: "#journey" },
  { label: "FAQ", href: "#faq" },
  { label: "Visit", href: "#visit" },
] as const;

export type Specialty = {
  id: string;
  icon: "Spine" | "Bone" | "Activity";
  title: string;
  summary: string;
  conditions: { name: string; note: string }[];
};

export const specialties: Specialty[] = [
  {
    id: "spine",
    icon: "Spine",
    title: "Spine Care",
    summary:
      "Settle the pain first, then rebuild the posture, core control and movement habits that keep it from coming back.",
    conditions: [
      { name: "Neck pain", note: "Stiffness, desk posture strain, radiating arm pain" },
      { name: "Back pain", note: "Acute spasms and long-standing lower-back pain" },
      { name: "Slip disc", note: "Disc bulge and sciatica — managed without rushing" },
    ],
  },
  {
    id: "joint",
    icon: "Bone",
    title: "Joint & Limb Care",
    summary:
      "Restore range, reduce swelling and load the joint back to strength — so stairs, squats and reaching overhead feel normal again.",
    conditions: [
      { name: "Knee pain", note: "Overuse, ligament strain and kneecap pain" },
      { name: "Arthritis", note: "Keeping arthritic joints moving and strong" },
      { name: "Frozen shoulder", note: "Staged mobility work through each phase" },
      { name: "Shoulder pain", note: "Rotator cuff, impingement and posture-related pain" },
    ],
  },
  {
    id: "sports",
    icon: "Activity",
    title: "Sports & Rehabilitation",
    summary:
      "From the first weeks after an injury, stroke or surgery to getting back to sport, work and independent living.",
    conditions: [
      { name: "Sports injuries", note: "Sprains, strains and return-to-play testing" },
      { name: "Stroke & neuro rehab", note: "Balance, gait, hand function and daily-living skills" },
      { name: "Post-surgical rehab", note: "Ortho and neuro protocols after surgery" },
    ],
  },
];

/** Hotspots on the body map. x/y are in the SVG's 200×440 viewBox. */
export const bodyZones = [
  {
    id: "head",
    label: "Head & nerves",
    x: 100,
    y: 34,
    specialty: "sports",
    title: "Stroke & neuro rehabilitation",
    body:
      "Weakness on one side, balance problems, an unsteady walk or a hand that won't cooperate. Neuro rehab retrains movement step by step, with goals built around daily life.",
    helps: ["Gait & balance training", "Hand & arm function", "Daily-living independence"],
  },
  {
    id: "neck",
    label: "Neck",
    x: 100,
    y: 68,
    specialty: "spine",
    title: "Neck pain",
    body:
      "Stiffness from long hours at a screen, headaches that start at the base of the skull, or pain that travels into the arm. We treat the pain and fix the load behind it.",
    helps: ["Manual therapy", "Posture & ergonomics", "Deep neck strengthening"],
  },
  {
    id: "shoulder",
    label: "Shoulder",
    x: 60,
    y: 98,
    specialty: "joint",
    title: "Shoulder pain & frozen shoulder",
    body:
      "Can't reach overhead, sleep on that side, or get your arm behind your back? Frozen shoulder and cuff problems respond to patient, staged mobility and strength work.",
    helps: ["Joint mobilisation", "Rotator cuff loading", "Range-of-motion plan"],
  },
  {
    id: "back",
    label: "Lower back",
    x: 100,
    y: 186,
    specialty: "spine",
    title: "Back pain & slip disc",
    body:
      "Back spasms, a disc bulge or sciatica down the leg. Most back pain improves with the right care: calming the pain, then core and hip strength so you can trust your back again.",
    helps: ["Pain-relief modalities", "Core & hip strength", "Safe lifting & bending"],
  },
  {
    id: "knee",
    label: "Knee",
    x: 119,
    y: 328,
    specialty: "joint",
    title: "Knee pain & arthritis",
    body:
      "Pain on stairs, stiffness after sitting, or swelling after a game. Strengthening the muscles around the knee is one of the most reliable ways to protect it.",
    helps: ["Quads & glute strength", "Arthritis management", "Post-op knee rehab"],
  },
  {
    id: "ankle",
    label: "Ankle & sport",
    x: 79,
    y: 404,
    specialty: "sports",
    title: "Sports injuries",
    body:
      "Sprained ankle, pulled hamstring, or a niggle that keeps returning. We rehab the injury, then test you before you go back to full play.",
    helps: ["Injury rehab", "Agility & landing drills", "Return-to-play testing"],
  },
] as const;

export type BodyZone = (typeof bodyZones)[number];

export const journey = [
  {
    step: "01",
    title: "Assess",
    pillar: "Understand",
    body:
      "A full assessment: your history, how you move, what hurts and what you want to get back to. You leave knowing what's going on.",
  },
  {
    step: "02",
    title: "Relieve",
    pillar: "Pain Relief",
    body:
      "Hands-on therapy, guided exercise and pain-relief modalities to calm things down so you can move with confidence.",
  },
  {
    step: "03",
    title: "Restore",
    pillar: "Mobility",
    body:
      "Range of motion, control and balance come back through targeted exercise, progressed session by session.",
  },
  {
    step: "04",
    title: "Strengthen",
    pillar: "Strength & Performance",
    body:
      "Your rehab moves onto the gym floor. Supervised strength work so you leave stronger than before the injury.",
  },
] as const;

export const gymFeatures = [
  {
    icon: "Dumbbell",
    title: "Strength, supervised",
    body: "Loads chosen for where you are in recovery, with technique checked by a physiotherapist.",
  },
  {
    icon: "HeartPulse",
    title: "Rehab-to-fitness",
    body: "Finish your rehab and keep training in the same space, on the same plan.",
  },
  {
    icon: "ShieldCheck",
    title: "Injury-aware programming",
    body: "Every exercise is picked with your history in mind. Nothing that works against your recovery.",
  },
  {
    icon: "Trophy",
    title: "Performance work",
    body: "Power, agility and conditioning for athletes getting back to sport, and for those who want to get better at it.",
  },
] as const;

export const promises = [
  { title: "One-to-one sessions", body: "Your session is with your physiotherapist, start to finish." },
  { title: "A plan you understand", body: "We explain what's wrong and what each stage is for." },
  { title: "Home exercise guidance", body: "Simple routines that keep progress going between visits." },
  { title: "Gym under the same roof", body: "No hand-off to a trainer who hasn't seen your case." },
] as const;

/** General physiotherapy questions. Keep answers honest; no clinic policy is invented here. */
export const faqs = [
  {
    q: "Do I need a doctor's referral to see a physiotherapist?",
    a: "No, you can book directly. If you've had surgery or recent scans, bring the reports. They help us plan safely around your surgeon's advice.",
  },
  {
    q: "How many sessions will I need?",
    a: "It depends on the condition, how long you've had it and your goals. After the first assessment we'll give you an honest estimate and review it as you progress.",
  },
  {
    q: "What should I wear?",
    a: "Comfortable, loose clothing that lets us see and move the area being treated: shorts for knee problems, a vest or loose top for shoulder and neck.",
  },
  {
    q: "I've just had surgery. When should I start physiotherapy?",
    a: "Usually as soon as your surgeon allows. Early, protocol-based rehab helps prevent stiffness and muscle loss. Call us and we'll plan around your surgeon's instructions.",
  },
  {
    q: "Can I use the gym without an injury?",
    a: "Call the clinic to ask about gym-only training. Because programmes are built by physiotherapists, they suit anyone who wants to train safely around old injuries or stiff joints.",
  },
  {
    q: "How do I book an appointment?",
    a: "Call or WhatsApp us on either number, or use the booking form on this page. We'll confirm a time that suits you.",
  },
] as const;

export const marqueeItems = [
  "Neck pain",
  "Back pain",
  "Slip disc",
  "Knee pain",
  "Arthritis",
  "Frozen shoulder",
  "Shoulder pain",
  "Sports injuries",
  "Stroke rehab",
  "Neuro rehab",
  "Post-surgical rehab",
] as const;
