export type Slide = {
  id: string;
  chapter: string;
  title: string;
  subtitle?: string;
  type?: string;
  notes: string;
  data?: any;
};

export const slides: Slide[] = [
  {
    id: 'title',
    chapter: 'Opening',
    title: 'I Still Call Myself a Designer',
    subtitle: 'How design can help us build better public services',
    type: 'hero',
    notes: 'Opening frame — introduce the talk and the speaker.',
  },
  {
    id: 'provocation',
    chapter: 'The Problem',
    title: 'Sometimes a service works only because the user works hard.',
    subtitle: 'A service is not well designed just because someone eventually gets through it.',
    type: 'quote',
    notes: 'Establish the central tension before anything else.',
  },
  {
    id: 'pollbreak',
    chapter: 'The Problem',
    title: 'Where do public services most often break down?',
    subtitle: "Let's hear from this room.",
    type: 'poll',
    notes: 'Live audience poll — surface real friction before naming it.',
  },
  {
    id: 'insideout',
    chapter: 'The Problem',
    title: 'How services fail from the inside out',
    subtitle: 'Most friction is not dramatic. It shows up quietly — as uncertainty, repetition and invisible handoffs.',
    type: 'scraps',
    notes: 'Give shape to the poll results using named failure patterns.',
    data: {
      cards: [
        { text: 'people don\'t know where to start', rotation: -2.5 },
        { text: 'language reflects our structure, not their task', rotation: 1.8 },
        { text: 'the same information gets asked for more than once', rotation: -1.2 },
        { text: 'digital tools sit on top of confusing processes', rotation: 2.4 },
        { text: 'nobody owns the whole experience', rotation: -3.1 },
      ],
      closing: 'The user experiences the gaps between teams.',
    },
  },
  {
    id: 'whymatters',
    chapter: 'The Problem',
    title: 'Why this matters here',
    subtitle: 'Public services are shaped by legislation, equity, risk, trust, legacy systems and multiple teams — which makes design harder, and more necessary.',
    type: 'splitPanel',
    notes: 'Civic and CoS relevance combined into one honest framing.',
    data: {
      left: {
        label: 'In government',
        points: [
          'legislation shapes what\'s possible',
          'equity determines who gets served',
          'trust is earned slowly and lost fast',
          'no single team owns the full journey',
        ],
      },
      right: {
        label: 'At City of Sydney',
        points: [
          'our services are often consequential and emotionally loaded',
          'people frequently arrive uncertain or frustrated',
          'staff feel the complexity too',
          'clarity is part of public trust',
        ],
      },
      closing: 'People don\'t experience us as divisions. They experience us as moments.',
    },
  },
  {
    id: 'who',
    chapter: 'The Lens',
    title: 'Who I am',
    subtitle: 'I didn\'t come through one neat professional lane. I kept moving — and kept asking the same question: how do people actually experience systems?',
    type: 'scrapbook',
    notes: 'Strategic biography in scrapbook form — personal, not corporate.',
    data: {
      items: [
        { label: '01', text: 'creative and visual design', note: 'where it started' },
        { label: '02', text: 'facilitation and strategy', note: 'getting into rooms' },
        { label: '03', text: 'organisational and change design', note: 'the bigger picture' },
        { label: '04', text: 'systems and service thinking', note: 'connecting everything' },
        { label: '05', text: 'public sector work', note: 'where it matters most' },
        { label: '06', text: 'City of Sydney', note: 'right now' },
      ],
    },
  },
  {
    id: 'constellation',
    chapter: 'The Lens',
    title: 'Designer',
    subtitle: 'Not because I do one kind of design — but because design is still the best word I have for how I work.',
    type: 'constellation',
    notes: 'Interactive identity map — each discipline is a facet, not a silo.',
    data: {
      items: [
        ['service', 'shaping the end-to-end experience across channels and touchpoints'],
        ['organisational', 'improving roles, rhythms and decision-making inside teams'],
        ['change', 'helping people move through transition with less friction'],
        ['experience', 'designing how systems feel, not just how they function'],
        ['systems', 'seeing connections across teams, tools and policies'],
        ['visual / graphic', 'making complex ideas clearer and more usable'],
        ['technology', 'prototyping tools and new possibilities'],
        ['facilitation / strategy', 'helping groups make sense, decide and move'],
      ],
    },
  },
  {
    id: 'means',
    chapter: 'The Lens',
    title: 'Design is not decoration. It\'s how we make intentions usable.',
    subtitle: 'Good policy only matters if people can actually understand and move through what we build.',
    type: 'manifesto',
    notes: 'Core design principles — stated plainly, not as a list of jargon.',
    data: {
      lines: [
        'make the next step visible',
        'reduce effort that shouldn\'t be the user\'s problem',
        'connect the whole journey, not just one touchpoint',
        'design for real behaviour — not ideal behaviour',
        'turn complexity into clarity',
        'make systems feel more human',
      ],
      closing: 'Design sits between intention and lived experience.',
    },
  },
  {
    id: 'servicedesign',
    chapter: 'The Lens',
    title: 'Service design = shaping the whole experience',
    subtitle: 'It looks at how people, process, policy, content, technology and decision-making work together across a full journey.',
    type: 'layers',
    notes: 'Make the scope of service design concrete before showing the method.',
    data: {
      layers: ['people', 'process', 'policy', 'content', 'data', 'digital', 'roles', 'environment', 'decisions', 'handoffs'],
      footer: 'Not one touchpoint. Not one team. Not one channel. The whole service.',
    },
  },
  {
    id: 'history',
    chapter: 'The Lens',
    title: 'A compressed design lineage',
    subtitle: 'As the problems got bigger, design expanded — from products to experiences, then to services and public systems.',
    type: 'progression',
    notes: 'Give context for why service design exists — it earned its place.',
    data: {
      items: [
        'Product design → how things work, feel and are used',
        'Human-centred design → start with people\'s needs, not organisational assumptions',
        'Service design → design the end-to-end journey across channels and touchpoints',
        'Public design → work across policy, operations, trust, equity and delivery in real civic systems',
      ],
      footer: 'The questions got bigger because the systems got bigger.',
    },
  },
  {
    id: 'diamond',
    chapter: 'The Method',
    title: 'Don\'t rush to solve the wrong problem',
    subtitle: 'The Double Diamond helps teams understand before they narrow, explore before they commit, and test before they lock things in.',
    type: 'diamond',
    notes: 'Anchor method — the most transferable thing in the talk.',
    data: {
      stages: [
        {
          name: 'Discover',
          question: 'What is really happening?',
          explanation: 'Look beyond assumptions. Talk to real people.',
          risk: 'Skipping this means solving symptoms.',
        },
        {
          name: 'Define',
          question: 'What is the right problem to solve?',
          explanation: 'Turn observations into one clear challenge.',
          risk: 'You frame the wrong target entirely.',
        },
        {
          name: 'Develop',
          question: 'What are possible responses?',
          explanation: 'Generate many options before committing to one.',
          risk: 'You go with the first idea, not the best.',
        },
        {
          name: 'Deliver',
          question: 'What should we implement and improve?',
          explanation: 'Build, learn and refine in cycles.',
          risk: 'You lock in too early and adapt too late.',
        },
      ],
      caution: 'Skipping the early stages usually means solving the symptom instead of the cause.',
    },
  },
  {
    id: 'practiceNow',
    chapter: 'The Practice',
    title: 'What this looks like in practice',
    subtitle: 'My current work sits at the intersection of service design, change and practical delivery.',
    type: 'cards',
    notes: 'Bridge from method to real work — sets up the case studies.',
    data: {
      cards: [
        {
          heading: 'Making the front door clearer',
          body: 'Improving entry pathways and intent routing so people can start with confidence — and arrive in the right place.',
        },
        {
          heading: 'Improving journeys, not just touchpoints',
          body: 'Reducing dead ends and invisible handoffs across the whole service — not just fixing the visible parts.',
        },
        {
          heading: 'Connecting people, process and platform',
          body: 'Aligning operations with digital experience so both improve together — not one at the expense of the other.',
        },
      ],
    },
  },
  {
    id: 'case1',
    chapter: 'The Practice',
    title: 'Case: clarifying the front door',
    subtitle: 'A design move — make entry choices clearer so people can start with confidence.',
    type: 'beforeAfter',
    notes: 'First case study — concrete example of the front door principle.',
  },
  {
    id: 'case2',
    chapter: 'The Practice',
    title: 'Case: staff experience is service design too',
    subtitle: 'Internal friction shapes external experience. Improving one improves the other.',
    type: 'caseStudy',
    notes: 'Second case study — expands the definition of who design serves.',
    data: {
      insight:
        'When staff struggle to find the right information or follow the right process, they improvise. That improvisation shows up as inconsistency for the people they\'re serving.',
      moves: [
        'mapped staff journey alongside the customer journey',
        'identified where staff decisions create downstream friction for users',
        'redesigned internal guidance to match the shape of the external experience',
      ],
      lesson: 'The people delivering the service are part of the system too.',
    },
  },
  {
    id: 'workshopintro',
    chapter: 'Your Turn',
    title: 'A 12-minute introduction to service redesign',
    subtitle: 'In pairs — use a compressed design process to reframe one frustrating experience and sketch one better version.',
    type: 'workshopHero',
    notes: 'Workshop entry — shift energy from watching to doing.',
  },
  {
    id: 'workshopsteps',
    chapter: 'Your Turn',
    title: 'Five steps. Twelve minutes.',
    subtitle: 'Interview · Frame · Ideate · Sketch · Test',
    type: 'steps',
    notes: 'Clear facilitation guide — one action per step.',
    data: {
      steps: [
        'Interview (3 mins) — Ask your partner about a frustrating service experience. Listen for task, friction, feeling and need.',
        'Frame (2 mins) — Turn what you heard into one clear "How might we…" question.',
        'Ideate (3 mins) — Generate at least 6 ideas before picking one.',
        'Sketch (2 mins) — Draw or outline one better version of the experience.',
        'Test (2 mins) — Show it back to your partner. Refine.',
      ],
      closing: 'The goal is not to solve everything. It\'s to practice seeing and shaping a service differently.',
    },
  },
  {
    id: 'workshopqr',
    chapter: 'Your Turn',
    title: 'Workshop companion',
    subtitle: 'Scan to run the five steps on mobile and share your output to the room.',
    type: 'text',
    notes: 'QR companion — mobile-friendly version of the workshop steps.',
  },
  {
    id: 'takeaway',
    chapter: 'Take This With You',
    title: 'You don\'t need "designer" in your title to work like one',
    subtitle: 'Many of the habits that improve services are available to anyone willing to pay attention.',
    type: 'bullets',
    notes: 'Practical takeaways — what to actually do on Monday.',
    data: {
      bullets: [
        'get closer to real experience — talk to people, observe the friction',
        'define the problem before jumping to solutions',
        'make the next step visible for the people you serve',
        'test ideas early — before they become fixed decisions',
        'improve across team boundaries, not just within them',
        'ask: whose effort are we designing around?',
      ],
      closing: 'Design is not a department. It\'s a practice.',
    },
  },
  {
    id: 'close',
    chapter: 'Close',
    title: 'Better public services are not built by accident. They\'re designed.',
    subtitle: 'And that work belongs to more of us than we think.',
    type: 'closingHero',
    notes: 'Final beat — leave them with the frame, not just the content.',
    data: {
      closing:
        'Every clearer step, better handoff and more legible journey changes how an institution feels to move through.',
    },
  },
];
