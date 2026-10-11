export type UserRole = 
  | 'Public User'
  | 'Researcher'
  | 'Policymaker'
  | 'Institution Administrator'
  | 'Platform Administrator';

export type NavigationTab = 
  | 'overview'
  | 'library'
  | 'policy'
  | 'datasets'
  | 'gis'
  | 'simulator'
  | 'collaboration'
  | 'innovation'
  | 'reports';

export type ResourceCategory = 
  | 'Research Papers'
  | 'Policy Documents'
  | 'Case Studies'
  | 'Legal and Regulatory References'
  | 'Government Reports'
  | 'Geospatial Resources';

export interface ResearchResource {
  id: string;
  title: string;
  category: ResourceCategory;
  author: string;
  organization: string;
  year: number;
  date: string;
  abstract: string;
  keyFindings: string[];
  limitations: string;
  topicTags: string[];
  keywords: string[];
  doiOrRef: string;
  sourceUrl: string;
  accessLevel: 'Open Access' | 'Restricted' | 'Verified Institutional';
  isVerified: boolean;
  citationCount?: number;
  bookmarked?: boolean;
}

export interface PolicyDocument {
  id: string;
  title: string;
  shortCode: string;
  ministry: string;
  yearIntroduced: number;
  status: 'Active National Policy' | 'Model Act for States' | 'Pilot Implementation' | 'Under Review';
  objective: string;
  geographicScope: string;
  targetPopulation: string;
  implementationMechanism: string;
  relevantTopic: string;
  availableEvidence: string;
  reportedOutcomes: string;
  limitations: string;
  keyPillars: string[];
  sourceUrl: string;
}

export interface DatasetItem {
  id: string;
  title: string;
  publisher: string;
  category: 'Land Use & Cover' | 'Cadastral & Records' | 'Disputes & Judiciary' | 'Climate & Agriculture' | 'Geospatial & Boundaries';
  geographicCoverage: string;
  timePeriod: string;
  frequency: string;
  format: 'GeoJSON / Shapefile' | 'CSV / API' | 'Raster / Geotiff' | 'JSON / REST';
  recordCount: string;
  description: string;
  availableFields: string[];
  accessRestrictions: 'Open Government Data (OGD)' | 'Restricted Researcher Access' | 'Public API';
  lastUpdated: string;
  sourceUrl: string;
  isSimulatedDemoData?: boolean;
}

export interface StateGISData {
  stateCode: string;
  stateName: string;
  lat: number;
  lng: number;
  svamitvaDroneCoveragePercent: number; // 0-100
  dilrmpDigitizationPercent: number; // 0-100
  landDisputeDensityPer10k: number; // e.g. 42
  climateVulnerabilityIndex: number; // 1-10
  agriculturalConversionRatePercent: number; // 0-10
  totalVillages: number;
  droneMappedVillages: number;
  propertyCardsIssued: number;
  pendingLitigationCases: number;
  dominantLandUse: string;
}

export interface SimulationParams {
  districtsCount: number; // 10 to 750
  budgetCrores: number; // 50 to 5000
  timeHorizonYears: number; // 1 to 10
  targetAdoptionRate: number; // 20 to 100%
  parcelDensityFactor: number; // 0.8 to 1.5
  focusArea: 'Drone Demarcation' | 'Digital Land Registries' | 'Integrated RoR Mutation' | 'Dispute Fast-Track';
}

export interface SimulationResults {
  projectedVillagesCovered: number;
  projectedPropertyCardsLakhs: number;
  projectedDisputeReductionPercent: number;
  estimatedResolutionSavingsCrores: number;
  creditUnlockingPotentialCrores: number;
  administrativeEffortMonthsPerTehsil: number;
  baseline: {
    villages: number;
    propertyCardsLakhs: number;
    disputeRate: number;
    resolutionTimeMonths: number;
  };
  assumptions: string[];
}

export interface ResearchProject {
  id: string;
  title: string;
  researchQuestion: string;
  leadResearcher: string;
  organization: string;
  status: 'Draft' | 'In Review' | 'Updated' | 'Completed';
  tags: string[];
  teamMembers: string[];
  linkedResourceIds: string[];
  notes: string;
  tasks: { id: string; text: string; done: boolean }[];
  updatedAt: string;
}

export interface InnovationProposal {
  id: string;
  title: string;
  leadAuthor: string;
  institution: string;
  category: 'Policy Sandbox' | 'GIS Innovation' | 'AI for Land Titling' | 'Dispute Analytics';
  problemStatement: string;
  proposedMethodology: string;
  expectedPolicyOutcome: string;
  targetStates: string[];
  submittedAt: string;
  status: 'Under Review' | 'Shortlisted' | 'Needs Revision';
}
