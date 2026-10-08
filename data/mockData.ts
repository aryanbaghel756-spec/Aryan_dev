import { Topic, Participant, SkillScore, GDReport, TranscriptItem } from '@/types/arena';

export const TOPIC_PRESETS: Topic[] = [
  {
    id: 'topic-1',
    category: 'Current affairs',
    title: 'Sovereign AI Infrastructure vs Global Tech Monopolies',
    description: 'Should mid-sized economies subsidize domestic GPU compute clusters and sovereign foundation models, or leverage hyper-scaler clouds at lower capital cost?',
    contextPoints: [
      'Strategic national security and linguistic data sovereignty',
      'Capital expenditure constraints vs return on compute investment',
      'Open-source foundation models democratizing private deployments',
      'Risk of fragmented regulatory compliance across border compute nodes'
    ]
  },
  {
    id: 'topic-2',
    category: 'Case-based',
    title: 'Autonomous Transit Ethics: Rider Safety vs Pedestrian Harm Minimization',
    description: 'A level-4 autonomous fleet software encounters an unpreventable collision vector. How should the ethical optimization utility prioritize rider vs pedestrian survival?',
    contextPoints: [
      'Utilitarian casualty minimization algorithms',
      'Contractual duty of care owed to paying passengers',
      'Legal liability distribution between OEM, software vendor, and city transit',
      'Public acceptance thresholds for machine-made ethical trade-offs'
    ]
  },
  {
    id: 'topic-3',
    category: 'Controversial',
    title: 'Is Remote Work Erosion of Junior Talent Apprenticeship Inevitable?',
    description: 'Does the decentralized workforce compromise institutional knowledge transfer, informal mentorship, and high-velocity leadership development for new graduates?',
    contextPoints: [
      'Asynchronous documentation vs serendipitous hallway problem-solving',
      'Objective output-driven evaluation vs presence bias',
      'Geographic diversity of talent vs cohort cohesion',
      'Mental fatigue and blurring of professional and personal boundaries'
    ]
  },
  {
    id: 'topic-4',
    category: 'Abstract',
    title: 'Silence is More Persuasive Than Eloquence in Heated Debate',
    description: 'In an era dominated by rapid verbal exchanges and cognitive overload, examine the rhetorical power of strategic pauses, restraint, and deliberate silence.',
    contextPoints: [
      'Active listening as an asymmetric negotiation tool',
      'The difference between passive reticence and commanding stillness',
      'De-escalation dynamics when high-tempo speakers hit a wall of silence',
      'Evaluating candidates on the depth of synthesis rather than airtime volume'
    ]
  },
  {
    id: 'topic-5',
    category: 'Current affairs',
    title: 'Space Debris Governance and Liability for Mega-Constellations',
    description: 'With over 10,000 low-earth-orbit satellites deployed, evaluate multilateral enforcement frameworks for orbital cleanup and collision insurance.',
    contextPoints: [
      'Tragedy of the commons in commercial low-earth orbits',
      'Kessler syndrome probability in high-density orbital shells',
      'De-orbit timeline mandates and economic penalties',
      'Geopolitical friction over anti-satellite testing and salvage rights'
    ]
  },
  {
    id: 'topic-6',
    category: 'Abstract',
    title: 'Red is Not Merely a Color, But a Conviction',
    description: 'Analyze how human civilization attaches urgency, defiance, warning, and revolutionary momentum to the crimson spectrum.',
    contextPoints: [
      'Evolutionary biology of danger signals and elevated heart rates',
      'Socio-political revolutions and symbolic collective action',
      'Creative tension: warning of peril versus passion for change',
      'Navigating high-risk environments with uncompromising conviction'
    ]
  }
];

export const MOCK_PARTICIPANTS: Participant[] = [
  {
    id: 'mod',
    name: 'Dr. Evelyn Vance',
    role: 'moderator',
    personality: 'Moderator',
    tagline: 'Guiding flow, enforcing fairness, and synthesizing milestones',
    avatarSeed: 'moderator',
    color: '#ffc400',
    accentGlow: 'rgba(255, 196, 0, 0.5)',
    talkTimeSeconds: 42,
    isSpeaking: false,
    audioLevel: 0
  },
  {
    id: 'p-analyst',
    name: 'Aarav Mehta',
    role: 'ai',
    personality: 'Analyst',
    tagline: 'Deconstructs problems with quantitative logic and risk frameworks',
    avatarSeed: 'analyst',
    color: '#ff1e2d',
    accentGlow: 'rgba(255, 30, 45, 0.45)',
    talkTimeSeconds: 78,
    isSpeaking: false,
    audioLevel: 0
  },
  {
    id: 'p-critic',
    name: 'Priya Sharma',
    role: 'ai',
    personality: 'Critic',
    tagline: 'Tests hidden assumptions, interrogates blindspots, and pressure-tests claims',
    avatarSeed: 'critic',
    color: '#ff4d5a',
    accentGlow: 'rgba(255, 77, 90, 0.45)',
    talkTimeSeconds: 84,
    isSpeaking: false,
    audioLevel: 0
  },
  {
    id: 'p-creative',
    name: 'Rohan Kapoor',
    role: 'ai',
    personality: 'Creative',
    tagline: 'Introduces unorthodox lateral analogies and cross-industry paradigms',
    avatarSeed: 'creative',
    color: '#ffa834',
    accentGlow: 'rgba(255, 168, 52, 0.45)',
    talkTimeSeconds: 66,
    isSpeaking: false,
    audioLevel: 0
  },
  {
    id: 'p-quiet',
    name: 'Maya Sen',
    role: 'ai',
    personality: 'Quiet one',
    tagline: 'Patient, speaks infrequently, but delivers precise thematic tie-ups',
    avatarSeed: 'quiet',
    color: '#e6a100',
    accentGlow: 'rgba(230, 161, 0, 0.45)',
    talkTimeSeconds: 38,
    isSpeaking: false,
    audioLevel: 0
  },
  {
    id: 'p-dominator',
    name: 'Vikram Singhania',
    role: 'ai',
    personality: 'Dominator',
    tagline: 'Fast-paced, aggressive verbal tempo, demands constant floor retention',
    avatarSeed: 'dominator',
    color: '#b80010',
    accentGlow: 'rgba(184, 0, 16, 0.55)',
    talkTimeSeconds: 95,
    isSpeaking: false,
    audioLevel: 0
  },
  {
    id: 'user',
    name: 'You (Candidate)',
    role: 'user',
    personality: 'Candidate',
    tagline: 'Your mic is armed. Push-to-talk or unmute to contribute.',
    avatarSeed: 'you',
    color: '#ffc400',
    accentGlow: 'rgba(255, 196, 0, 0.6)',
    talkTimeSeconds: 88,
    isSpeaking: false,
    audioLevel: 0
  }
];

export const INITIAL_TRANSCRIPTS: TranscriptItem[] = [
  {
    id: 't-1',
    speakerId: 'mod',
    speakerName: 'Dr. Evelyn Vance',
    personality: 'Moderator',
    role: 'moderator',
    text: 'Welcome to this Group Discussion session. The floor is open for 8 minutes on our chosen topic. I invite any candidate to initiate the framework.',
    timestamp: '00:08',
    seconds: 8
  },
  {
    id: 't-2',
    speakerId: 'user',
    speakerName: 'You (Candidate)',
    personality: 'Candidate',
    role: 'user',
    text: 'Thank you, Moderator. I would like to initiate by framing this dilemma across two distinct dimensions: sovereign computational autonomy versus immediate economic return on capital.',
    timestamp: '00:32',
    seconds: 32,
    highlight: true
  },
  {
    id: 't-3',
    speakerId: 'p-analyst',
    speakerName: 'Aarav Mehta',
    personality: 'Analyst',
    role: 'ai',
    text: 'Building on what the first speaker noted, capital allocation is unforgiving. Building tier-4 datacenters requires billions in power infrastructure before training runs yield verifiable value.',
    timestamp: '01:14',
    seconds: 74
  },
  {
    id: 't-4',
    speakerId: 'p-dominator',
    speakerName: 'Vikram Singhania',
    personality: 'Dominator',
    role: 'ai',
    text: 'If you wait for economic parity, you lose the geopolitical window! Look at chip bans. Sovereignty is not an ROI ledger; it is an existential hedge against unilateral sanctions.',
    timestamp: '01:52',
    seconds: 112
  },
  {
    id: 't-5',
    speakerId: 'p-critic',
    speakerName: 'Priya Sharma',
    personality: 'Critic',
    role: 'ai',
    text: 'Hold on Vikram. Calling it an existential hedge does not magically solve a 40-megawatt substation bottleneck or talent migration. Are we subsidizing compute that will be obsolete in 18 months?',
    timestamp: '02:30',
    seconds: 150
  },
  {
    id: 't-6',
    speakerId: 'p-creative',
    speakerName: 'Rohan Kapoor',
    personality: 'Creative',
    role: 'ai',
    text: 'Consider how Scandinavian nations treated telecom infrastructure in the 1990s: public open optical fiber corridors that let private startups compete aggressively without owning the bedrock glass.',
    timestamp: '03:15',
    seconds: 195
  }
];

export const MOCK_REPORT_DATA: GDReport = {
  overallScore: 84,
  percentile: 88,
  performanceBadge: 'Strategic Catalyst',
  summary: 'You demonstrated strong initiative by opening the discussion with a balanced two-dimensional framework. You successfully navigated aggressive floor challenges from the Dominator and drew in quieter perspectives while anchoring the core premise.',
  durationSeconds: 491,
  totalExchanges: 24,
  interruptionCount: 3,
  participationShare: [
    { participantId: 'user', name: 'You', percentage: 22, seconds: 108, color: '#ffc400', isUser: true },
    { participantId: 'p-dominator', name: 'Vikram (Dominator)', percentage: 24, seconds: 118, color: '#ff1e2d' },
    { participantId: 'p-analyst', name: 'Aarav (Analyst)', percentage: 19, seconds: 93, color: '#ff626e' },
    { participantId: 'p-critic', name: 'Priya (Critic)', percentage: 17, seconds: 83, color: '#e65100' },
    { participantId: 'p-creative', name: 'Rohan (Creative)', percentage: 11, seconds: 54, color: '#ffa834' },
    { participantId: 'mod', name: 'Moderator', percentage: 7, seconds: 35, color: '#7a7a85' },
  ],
  skills: [
    {
      id: 'skill-starting',
      title: 'Starting the Discussion',
      score: 9.0,
      status: 'strength',
      badgeText: 'Decisive Initiative',
      feedback: 'You took command within the first 30 seconds with a crisp definition rather than generic platitudes. This established the structural baseline that the rest of the panel referenced throughout.',
      quotedMoment: {
        timestamp: '00:32',
        quote: '"I would like to initiate by framing this dilemma across two distinct dimensions: sovereign computational autonomy versus immediate economic return on capital."',
        context: 'Opening turn immediately after the Moderator invited opening statements.'
      }
    },
    {
      id: 'skill-ideas',
      title: 'Quality of Ideas & Substantiation',
      score: 8.5,
      status: 'strength',
      badgeText: 'High Signal',
      feedback: 'Your points combined conceptual clarity with concrete analogies. The distinction between public compute utility and private foundation models kept the group from falling into a false dichotomy.',
      quotedMoment: {
        timestamp: '02:45',
        quote: '"We must differentiate between state-funded compute grids as public utilities versus subsidizing private frontier LLMs. The power grid model applies cleanly here."',
        context: 'Intervening when Priya and Vikram reached an ideological standoff.'
      }
    },
    {
      id: 'skill-building',
      title: 'Building on Others',
      score: 8.0,
      status: 'good',
      badgeText: 'Collaborative Bridge',
      feedback: 'You acknowledged Aarav’s cost metrics before expanding with your utility parallel, demonstrating that you were synthesizing rather than merely waiting for your turn to speak.',
      quotedMoment: {
        timestamp: '03:40',
        quote: '"Rohan’s Scandinavian fiber analogy directly solves the capital lockup Aarav warned about earlier—we can lease off-peak compute hours to private research."',
        context: 'Connecting two divergent perspectives into a unified compromise solution.'
      }
    },
    {
      id: 'skill-listening',
      title: 'Active Listening & Inclusivity',
      score: 8.5,
      status: 'strength',
      badgeText: 'Panel Awareness',
      feedback: 'When Maya was overshadowed by Vikram’s rapid-fire delivery, you created an explicit entry wedge to invite her input, which moderators consistently rate as a high-tier leadership signal.',
      quotedMoment: {
        timestamp: '04:55',
        quote: '"Before we proceed to the export restrictions, Maya had raised an intriguing angle about talent retention that we should hear out."',
        context: 'De-escalating an aggressive floor monologue from Vikram.'
      }
    },
    {
      id: 'skill-interruptions',
      title: 'Handling Interruptions',
      score: 7.5,
      status: 'needs-work',
      badgeText: 'Assertive Recovery',
      feedback: 'When interrupted by the Dominator at 01:52, you yielded ground slightly too quickly. Practice holding your cadence for one more sentence with courteous phrases like "Allow me 10 seconds to finish the premise, Vikram."',
      quotedMoment: {
        timestamp: '01:50',
        quote: '"—and therefore the capital recovery window— [cut off by Vikram: \'If you wait for economic parity...\']"',
        context: 'Mid-sentence yield during the early heated discussion phase.'
      }
    },
    {
      id: 'skill-ending',
      title: 'Ending Strongly & Synthesis',
      score: 9.0,
      status: 'strength',
      badgeText: 'Executive Closure',
      feedback: 'Your closing summary in the final round brought together all 3 divergent threads (sovereignty, fiscal pragmatism, public utility model) into a decisive, non-repetitive consensus verdict.',
      quotedMoment: {
        timestamp: '07:28',
        quote: '"In conclusion, the panel converges on a hybrid doctrine: sovereign ownership of compute infrastructure paired with open market application development."',
        context: 'Final 40 seconds closing round summary.'
      }
    }
  ]
};
