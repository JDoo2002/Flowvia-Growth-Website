export const bookingUrl = 'https://flowviagrowth.com.au/booking-page';

export const process = [
  {
    icon: 'target',
    title: 'Targeted ad campaigns',
    description: 'We run ads that reach homeowners looking for solar and batteries in your service area, bringing new enquiries into your business.',
    detail: 'Local enquiries. Built for your business.',
  },
  {
    icon: 'message',
    title: 'Your own AI assistant',
    description: 'We set up an AI assistant that responds in seconds, follows up with every lead and captures the homeowner and property details your team needs.',
    detail: 'Every lead followed up. Around the clock.',
  },
  {
    icon: 'calendar',
    title: 'Calendar booking & reminders',
    description: 'We connect the assistant to your calendar so qualified homeowners can book a site assessment, with reminders to help minimise no-shows.',
    detail: 'You show up. You install.',
  },
];

export const faqs = [
  {
    question: 'What exactly does Flowvia do?',
    answer: 'We build and manage a lead and appointment system for solar and battery installers: targeted ads, an AI assistant that qualifies and follows up with enquiries, and bookings in your calendar. Your team handles the assessments and sales.',
  },
  {
    question: 'Is there a lock-in contract?',
    answer: 'No. We start with a 90-day roadmap, with no lock-in contract. Regular check-ins help you review progress and decide what comes next.',
  },
  {
    question: 'How is this different from buying leads?',
    answer: 'Buying a lead still leaves your team to contact, qualify and book it. Flowvia brings those steps together, from the ad to the booked assessment. You own the leads that come through your system.',
  },
  {
    question: 'Do I need to set anything up myself?',
    answer: 'We handle the build, launch and calendar connection. You provide your service areas, business details and appointment availability so we can tailor the system to your team.',
  },
  {
    question: 'How will we track results?',
    answer: 'We review enquiries, follow-up and booked appointments in regular check-ins as part of your 90-day roadmap, so you can see how the system is performing.',
  },
  {
    question: 'How does the AI handle homeowner questions?',
    answer: 'We tailor the assistant to your business and common solar and battery questions. It answers initial enquiries and gathers the property and energy-use details your team needs for the assessment.',
  },
];

export const comparison = [
  {
    id: 'before',
    title: 'Manual follow-up',
    label: 'Before',
    avatar: 'SI',
    name: 'Solar installer',
    status: 'When the team has a spare moment',
    messages: [
      { who: 'user', text: 'Hi, I’d like a quote for solar and a battery.' },
      { who: 'business', text: 'Hi! Thanks for your enquiry, we’ll get back to you.', time: '2 hours later' },
      { who: 'business', text: 'Are you still keen on that quote?', time: '4 hours later' },
    ],
    outcome: 'No appointment booked',
    outcomeDetail: 'Left on seen. The enquiry goes cold.',
  },
  {
    id: 'after',
    title: 'A system that follows through',
    label: 'With Flowvia',
    avatar: 'AI',
    name: 'Solar & Battery Assistant',
    status: 'Replies in seconds, 24/7',
    messages: [
      { who: 'user', text: 'Hi, I’d like a quote for solar and a battery.' },
      { who: 'business', text: 'Great to hear from you! Is this for your own home, and roughly what’s your quarterly power bill?', time: 'Replied in 2 sec' },
      { who: 'user', text: 'Yes, my home. About $600 a quarter.' },
      { who: 'business', text: 'Perfect. I can book a free assessment this week. Does Thursday suit?', time: 'Replied in 2 sec' },
    ],
    outcome: 'Lead qualified · Ready for assessment',
    outcomeDetail: 'Details captured. A clear next step.',
  },
];
