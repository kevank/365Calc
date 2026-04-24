// Quick Start questionnaire: 4 yes/no questions that pre-fill the most
// common third-party replacements. Each question maps to feature IDs
// from features.js. When the user answers "Yes", any of these features
// included in their currently-selected license get set to 'third-party'.
export const QUESTIONS = [
  {
    id: 'antivirus',
    title: 'Are you currently paying for a third-party endpoint security or antivirus product?',
    examples: 'CrowdStrike, SentinelOne, Sophos, Carbon Black, Trend Micro',
    featureIds: [
      'defender-for-business',
      'defender-endpoint-p1',
      'defender-endpoint-p2',
      'attack-surface-reduction',
    ],
  },
  {
    id: 'phone',
    title: 'Do you pay for a separate business phone system or VoIP provider?',
    examples: 'RingCentral, Zoom Phone, 8x8, Vonage, traditional PBX',
    featureIds: ['teams-phone'],
  },
  {
    id: 'email-security',
    title: 'Do you use a third-party email security or archiving gateway?',
    examples: 'Mimecast, Proofpoint, Abnormal, Barracuda',
    featureIds: [
      'exchange-online-protection',
      'defender-o365-p1',
      'defender-o365-p2',
      'email-archiving',
    ],
  },
  {
    id: 'identity',
    title: 'Do you use a third-party identity provider for SSO or MFA?',
    examples: 'Okta, Duo, Ping Identity, JumpCloud',
    featureIds: [
      'conditional-access',
      'sspr',
      'identity-protection',
      'pim',
    ],
  },
]
