export const BUSINESS_PREMIUM_MONTHLY_COST = 22.00;

export const featureCategories = [
  {
    id: 'security',
    name: 'Security - Defender for Business',
    description: 'Enterprise-grade endpoint and email security included in Business Premium',
    icon: 'shield',
    features: [
      {
        id: 'endpoint-protection',
        name: 'Endpoint Protection',
        description: 'Next-gen antivirus, EDR, and threat & vulnerability management',
        competitors: 'CrowdStrike, SentinelOne, Sophos, Norton',
        defaultCost: 5.00,
      },
      {
        id: 'email-security',
        name: 'Email Security (Safe Links & Attachments)',
        description: 'Defender for Office 365 Plan 1 - real-time protection against phishing and malware',
        competitors: 'Proofpoint, Mimecast, Barracuda',
        defaultCost: 4.00,
      },
      {
        id: 'attack-surface-reduction',
        name: 'Attack Surface Reduction',
        description: 'Rules and policies to reduce your organization\'s attack surface',
        competitors: 'Carbon Black, Trend Micro, Sophos',
        defaultCost: 3.00,
      },
    ],
  },
  {
    id: 'identity',
    name: 'Identity & Access - Azure AD P1',
    description: 'Advanced identity and access management with Azure Active Directory Premium P1',
    icon: 'fingerprint',
    features: [
      {
        id: 'conditional-access',
        name: 'Conditional Access',
        description: 'Policy-based access controls based on user, location, device, and risk',
        competitors: 'Okta, Duo Security, JumpCloud',
        defaultCost: 4.00,
      },
      {
        id: 'mfa',
        name: 'Multi-Factor Authentication',
        description: 'Comprehensive MFA with multiple verification methods',
        competitors: 'Duo, Authy, RSA SecurID, YubiKey',
        defaultCost: 3.00,
      },
      {
        id: 'sspr',
        name: 'Self-Service Password Reset',
        description: 'Allow users to reset passwords without helpdesk involvement',
        competitors: 'ManageEngine, Specops, Avatier',
        defaultCost: 2.00,
      },
    ],
  },
  {
    id: 'device-management',
    name: 'Device Management - Intune',
    description: 'Cloud-based endpoint management for mobile devices and PCs',
    icon: 'devices',
    features: [
      {
        id: 'mdm',
        name: 'Mobile Device Management (MDM)',
        description: 'Enroll, configure, and secure mobile devices and desktops',
        competitors: 'VMware Workspace ONE, Jamf, Kandji',
        defaultCost: 6.00,
      },
      {
        id: 'mam',
        name: 'Mobile Application Management (MAM)',
        description: 'Manage and protect corporate data within apps',
        competitors: 'MobileIron, Citrix, BlackBerry UEM',
        defaultCost: 3.00,
      },
      {
        id: 'autopilot',
        name: 'Windows Autopilot',
        description: 'Zero-touch deployment and provisioning of Windows devices',
        competitors: 'Manual imaging, SCCM, ManageEngine',
        defaultCost: 2.00,
      },
    ],
  },
  {
    id: 'information-protection',
    name: 'Information Protection',
    description: 'Data classification, labeling, and loss prevention capabilities',
    icon: 'lock',
    features: [
      {
        id: 'sensitivity-labels',
        name: 'Sensitivity Labels',
        description: 'Classify and protect documents and emails with configurable labels',
        competitors: 'Titus, Boldon James, Vera',
        defaultCost: 3.00,
      },
      {
        id: 'dlp',
        name: 'Data Loss Prevention (Basic)',
        description: 'Prevent accidental sharing of sensitive information',
        competitors: 'Symantec DLP, Digital Guardian, Forcepoint',
        defaultCost: 4.00,
      },
    ],
  },
  {
    id: 'communication',
    name: 'Communication - Microsoft Teams',
    description: 'Enterprise chat, video meetings, and collaboration platform',
    icon: 'chat',
    features: [
      {
        id: 'teams-meetings',
        name: 'Team Chat & Video Meetings',
        description: 'Unlimited chat, video conferencing with up to 300 participants',
        competitors: 'Zoom, Slack, Webex, Google Meet',
        defaultCost: 8.00,
      },
      {
        id: 'file-collaboration',
        name: 'File Sharing & Collaboration',
        description: 'SharePoint and OneDrive integrated file sharing within Teams',
        competitors: 'Dropbox Business, Box, Google Workspace',
        defaultCost: 5.00,
      },
    ],
  },
  {
    id: 'productivity',
    name: 'Productivity - Microsoft 365 Apps',
    description: 'Desktop and web versions of Office applications with cloud storage',
    icon: 'apps',
    features: [
      {
        id: 'office-apps',
        name: 'Office Desktop Apps',
        description: 'Word, Excel, PowerPoint, Outlook, Access, Publisher (desktop + web)',
        competitors: 'Google Workspace, LibreOffice, Zoho Office',
        defaultCost: 10.00,
      },
      {
        id: 'onedrive',
        name: 'OneDrive for Business (1TB)',
        description: '1TB cloud storage per user with sync and sharing',
        competitors: 'Dropbox, Box, Google Drive, iCloud',
        defaultCost: 5.00,
      },
    ],
  },
  {
    id: 'email',
    name: 'Email - Exchange Online',
    description: 'Enterprise email with 50GB mailbox and advanced features',
    icon: 'email',
    features: [
      {
        id: 'business-email',
        name: 'Business Email (50GB Mailbox)',
        description: 'Professional email with custom domain, shared mailboxes, and calendaring',
        competitors: 'Google Workspace, Zoho Mail, Fastmail',
        defaultCost: 6.00,
      },
      {
        id: 'email-archiving',
        name: 'Exchange Online Archiving',
        description: 'In-place archiving with unlimited storage for compliance',
        competitors: 'Barracuda, Mimecast Archive, Proofpoint',
        defaultCost: 3.00,
      },
    ],
  },
];

// Calculate the total embedded value per user per month
export const calculateTotalEmbeddedValue = () => {
  return featureCategories.reduce((total, category) => {
    return total + category.features.reduce((catTotal, feature) => {
      return catTotal + feature.defaultCost;
    }, 0);
  }, 0);
};
