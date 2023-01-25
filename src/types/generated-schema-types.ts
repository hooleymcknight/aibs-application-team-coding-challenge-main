import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  ByteArray: any;
  Date: any;
  JSON: any;
  field_String_pattern_id: any;
  groupBy_List_String_pattern_id: any;
};

export type Aio_Grant = PriorityOrderedObject & {
  __typename?: 'AIO_Grant';
  awardee: Organization;
  fundingAgency: Organization;
  grantId: Scalars['String'];
  priorityOrder?: Maybe<Scalars['Int']>;
  referenceId: Scalars['String'];
  reportSymbol?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type Aio_GrantInput = {
  awardee: OrganizationInput;
  fundingAgency: OrganizationInput;
  grantId: Scalars['String'];
  priorityOrder?: InputMaybe<Scalars['Int']>;
  referenceId: Scalars['String'];
  reportSymbol?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type Aio_Project = {
  description: Scalars['String'];
  referenceId: Scalars['String'];
  shortTitle: Scalars['String'];
  title: Scalars['String'];
};

export type Aio_Protocol = PriorityOrderedObject & {
  __typename?: 'AIO_Protocol';
  priorityOrder?: Maybe<Scalars['Int']>;
  referenceId: Scalars['String'];
  shortTitle: Scalars['String'];
  title: Scalars['String'];
  url: Scalars['String'];
};

export type Aio_ProtocolInput = {
  priorityOrder?: InputMaybe<Scalars['Int']>;
  referenceId: Scalars['String'];
  shortTitle: Scalars['String'];
  title: Scalars['String'];
  urlResource: UrlResourceInput;
};

export type Aio_Specimen = {
  __typename?: 'AIO_Specimen';
  annotations?: Maybe<Array<Annotation>>;
  cRID: Crid;
  files?: Maybe<Array<SpecimenFile>>;
  images?: Maybe<Array<Image>>;
  measurements?: Maybe<Array<Measurement>>;
  projectReferenceIds: Array<Scalars['String']>;
  referenceId: Scalars['String'];
  relatedSpecimens?: Maybe<Array<RelatedSpecimen>>;
  specimenType?: Maybe<SpecimenType>;
};


export type Aio_SpecimenAnnotationsArgs = {
  featureTypes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Aio_SpecimenImagesArgs = {
  featureTypes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Aio_SpecimenMeasurementsArgs = {
  featureTypes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Aio_SpecimenFacetedSearchProperty = {
  __typename?: 'AIO_SpecimenFacetedSearchProperty';
  featureType: FeatureType;
  filterOperator?: Maybe<FilterOperator>;
  measurementStats?: Maybe<MeasurementStats>;
  modality?: Maybe<Array<Modality>>;
  type: Aio_SpecimenFacetedSearchPropertyType;
};

export enum Aio_SpecimenFacetedSearchPropertyType {
  Annotation = 'ANNOTATION',
  Image = 'IMAGE',
  Measurement = 'MEASUREMENT'
}

export type Aio_SpecimenInput = {
  annotations?: InputMaybe<Array<AnnotationInput>>;
  cRID: CridInput;
  files?: InputMaybe<Array<SpecimenFileInput>>;
  images?: InputMaybe<Array<ImageInput>>;
  measurements?: InputMaybe<Array<MeasurementInput>>;
  projectReferenceIds: Array<Scalars['String']>;
  referenceId: Scalars['String'];
  relatedSpecimens?: InputMaybe<Array<RelatedSpecimenInput>>;
  specimenType: SpecimenTypeInput;
};

export type AggregationOperation = {
  field?: InputMaybe<Scalars['String']>;
  operator?: InputMaybe<AggregationOperator>;
};

export enum AggregationOperator {
  Sum = 'SUM'
}

/** The result of an aggregation query. Contains the properties that were grouped by, as well as the count for this grouping. */
export type AggregationResult = {
  __typename?: 'AggregationResult';
  count?: Maybe<Scalars['Float']>;
  properties?: Maybe<Array<Maybe<PropertyValueTuple>>>;
};

export type Annotation = {
  __typename?: 'Annotation';
  featureType: FeatureType;
  modality?: Maybe<Array<Modality>>;
  referenceId: Scalars['String'];
  taxons: Array<Taxon>;
};

export type AnnotationDisplayProperty = FeatureDisplayProperty & {
  __typename?: 'AnnotationDisplayProperty';
  featureType: FeatureType;
  filterOperator?: Maybe<FilterOperator>;
  isDefault: Scalars['Boolean'];
  modality?: Maybe<Array<Modality>>;
  priorityOrder?: Maybe<Scalars['Int']>;
  type?: Maybe<FeatureDisplayType>;
};

export type AnnotationInput = {
  featureType: FeatureTypeInput;
  modality?: InputMaybe<Array<ModalityInput>>;
  referenceId: Scalars['String'];
  taxons: Array<TaxonInput>;
};

export type BffContact = {
  __typename?: 'BffContact';
  email?: Maybe<WebResourceLink>;
  name?: Maybe<Scalars['String']>;
};

export type BffFilter = {
  field?: InputMaybe<Scalars['String']>;
  operator?: InputMaybe<BffFilterOperator>;
  value?: InputMaybe<Scalars['String']>;
};

export enum BffFilterOperator {
  Contains = 'CONTAINS',
  Eq = 'EQ'
}

export type BffFilterType = {
  __typename?: 'BffFilterType';
  field?: Maybe<Scalars['String']>;
  operator?: Maybe<BffFilterOperator>;
  value?: Maybe<Scalars['String']>;
};

export type BffProgram = {
  __typename?: 'BffProgram';
  programLink?: Maybe<WebResourceLink>;
  subProgramLink?: Maybe<WebResourceLink>;
};

export type BffProject = {
  __typename?: 'BffProject';
  program?: Maybe<Scalars['String']>;
  projectLink?: Maybe<WebResourceLink>;
  subProgram?: Maybe<Scalars['String']>;
};

export type BffPublication = {
  __typename?: 'BffPublication';
  doiLink?: Maybe<WebResourceLink>;
  name?: Maybe<Scalars['String']>;
  pubMedLink?: Maybe<WebResourceLink>;
  year?: Maybe<Scalars['String']>;
};

export type BffSort = {
  field?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<BffSortOrder>;
};

export enum BffSortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type BffSortType = {
  __typename?: 'BffSortType';
  field?: Maybe<Scalars['String']>;
  order?: Maybe<BffSortOrder>;
};

export type BroadClass = {
  __typename?: 'BroadClass';
  name?: Maybe<Scalars['String']>;
};

export type Crid = {
  __typename?: 'CRID';
  registry: CridRegistry;
  symbol: Scalars['String'];
};

export type CridInput = {
  registry: CridRegistryInput;
  symbol: Scalars['String'];
};

export type CridRegistry = {
  __typename?: 'CRIDRegistry';
  description: Scalars['String'];
  referenceId: Scalars['String'];
};

export type CridRegistryInput = {
  description: Scalars['String'];
  referenceId: Scalars['String'];
};

export type CvImage = {
  __typename?: 'CVImage';
  featureType: FeatureType;
  properties?: Maybe<CvImageProperty>;
  referenceId: Scalars['String'];
  url: Scalars['String'];
};

export type CvImageProperty = {
  __typename?: 'CVImageProperty';
  cellType?: Maybe<Scalars['String']>;
  comparisonType?: Maybe<Scalars['String']>;
  gene?: Maybe<Scalars['String']>;
  metaData?: Maybe<Scalars['String']>;
  projectReferenceId: Scalars['String'];
};

export type CvImagePropertyInput = {
  cellType: Scalars['String'];
  comparisonType: Scalars['String'];
  gene: Scalars['String'];
  metaData: Scalars['String'];
  projectReferenceId: Scalars['String'];
};

export type CvProperties = {
  __typename?: 'CVProperties';
  cellType: Array<Scalars['String']>;
  comparisonType: Array<Scalars['String']>;
  gene: Array<Scalars['String']>;
  metaData: Array<Scalars['String']>;
};


export type CvPropertiesGeneArgs = {
  exact?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<SortOrder>;
  text?: InputMaybe<Scalars['String']>;
};

export type CellTypeAnatomyImage = {
  __typename?: 'CellTypeAnatomyImage';
  alt?: Maybe<Scalars['String']>;
  src?: Maybe<Scalars['String']>;
};

export type CellTypeTaxonomy = {
  __typename?: 'CellTypeTaxonomy';
  name?: Maybe<Scalars['String']>;
  nodes?: Maybe<Array<Maybe<CellTypeTaxonomyNode>>>;
};

/**
 * Through iterations from S3 -> EBI,
 * lets try to adhere to this structure so the client contract is the same
 */
export type CellTypeTaxonomyHierarchyNode = {
  __typename?: 'CellTypeTaxonomyHierarchyNode';
  accessionId: Scalars['String'];
  aliases?: Maybe<Array<Scalars['String']>>;
  classLabel?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  dataSections?: Maybe<Scalars['JSON']>;
  fullOntologyName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  nfForestMarkers?: Maybe<Array<WebResourceLink>>;
  ontologyIri?: Maybe<WebResourceLink>;
  parentId?: Maybe<Scalars['String']>;
  rank?: Maybe<Scalars['String']>;
  references?: Maybe<Array<Scalars['String']>>;
  summary?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/**
 * Through iterations from S3 -> EBI,
 * lets try to adhere to this structure so the client contract is the same
 */
export type CellTypeTaxonomyHierarchyNodeDataSectionsArgs = {
  taxonomyId?: InputMaybe<Scalars['String']>;
};

export type CellTypeTaxonomyInfo = {
  __typename?: 'CellTypeTaxonomyInfo';
  accessionId: Scalars['String'];
  age?: Maybe<Scalars['String']>;
  anatomy?: Maybe<Scalars['String']>;
  anatomyImages?: Maybe<Array<Maybe<CellTypeAnatomyImage>>>;
  attribution?: Maybe<Scalars['String']>;
  azimuthHeader?: Maybe<Scalars['String']>;
  azimuthLink?: Maybe<Scalars['String']>;
  azimuthText?: Maybe<Scalars['String']>;
  cellClassesCount?: Maybe<Scalars['String']>;
  cellSubclassesCount?: Maybe<Scalars['String']>;
  cellTypesCount?: Maybe<Scalars['String']>;
  crossSpeciesImages?: Maybe<Array<Scalars['String']>>;
  datasets?: Maybe<Array<Maybe<CellTypesDatasetInfo>>>;
  header?: Maybe<Scalars['String']>;
  mainDescription?: Maybe<Scalars['String']>;
  nodes?: Maybe<Array<CellTypeTaxonomyHierarchyNode>>;
  sex?: Maybe<Scalars['String']>;
  species?: Maybe<Scalars['String']>;
  subDescription?: Maybe<Scalars['String']>;
};


export type CellTypeTaxonomyInfoDatasetsArgs = {
  taxonomyId?: InputMaybe<Scalars['String']>;
};


export type CellTypeTaxonomyInfoNodesArgs = {
  accessionId?: InputMaybe<Scalars['String']>;
};

export type CellTypeTaxonomyNode = {
  __typename?: 'CellTypeTaxonomyNode';
  accessionId?: Maybe<Scalars['String']>;
  alias?: Maybe<Scalars['String']>;
  childrenIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  color?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['Int']>;
  parentId?: Maybe<Scalars['String']>;
};

export type CellTypesDatasetInfo = {
  __typename?: 'CellTypesDatasetInfo';
  cellsNuclei?: Maybe<Scalars['String']>;
  dataset?: Maybe<Scalars['String']>;
  downloadLink?: Maybe<Scalars['String']>;
  exploreLink?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};

export type Cluster = {
  __typename?: 'Cluster';
  name?: Maybe<Scalars['String']>;
};

export type Contact = PriorityOrderedObject & {
  __typename?: 'Contact';
  email: Scalars['String'];
  person: Person;
  priorityOrder?: Maybe<Scalars['Int']>;
};

export type ContactArrayDisplayProperty = {
  __typename?: 'ContactArrayDisplayProperty';
  metadata?: Maybe<PropertyDisplayNameMetadata>;
  value?: Maybe<Array<BffContact>>;
};

export type ContactInput = {
  email: Scalars['String'];
  person: PersonInput;
  priorityOrder?: InputMaybe<Scalars['Int']>;
};

export type CorticalLayer = {
  __typename?: 'CorticalLayer';
  name?: Maybe<Scalars['String']>;
};

export type DataCollection = PriorityOrderedObject & {
  __typename?: 'DataCollection';
  accessControl?: Maybe<Scalars['String']>;
  completionState?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  lastUpdatedAtDate?: Maybe<Scalars['Date']>;
  modality?: Maybe<Array<Maybe<Modality>>>;
  priorityOrder?: Maybe<Scalars['Int']>;
  publication?: Maybe<Array<Maybe<Publication>>>;
  referenceId: Scalars['String'];
  shortTitle: Scalars['String'];
  species?: Maybe<Array<Maybe<Species>>>;
  specimenCount?: Maybe<Array<Maybe<SpecimenCount>>>;
  specimenType?: Maybe<Array<Maybe<SpecimenType>>>;
  technique?: Maybe<Array<Maybe<Technique>>>;
  title: Scalars['String'];
  webResources?: Maybe<Array<Maybe<UrlResource>>>;
};

export type DataCollectionDisplay = {
  __typename?: 'DataCollectionDisplay';
  accessControl?: Maybe<StringDisplayProperty>;
  completionState?: Maybe<StringDisplayProperty>;
  description?: Maybe<StringDisplayProperty>;
  lastUpdatedAtDate?: Maybe<StringDisplayProperty>;
  modality?: Maybe<StringArrayDisplayProperty>;
  referenceId: Scalars['String'];
  shortTitle: StringDisplayProperty;
  species?: Maybe<StringArrayDisplayProperty>;
  specimenType?: Maybe<StringArrayDisplayProperty>;
  technique?: Maybe<StringArrayDisplayProperty>;
  totalSpecimenCount?: Maybe<IntDisplayProperty>;
  webResources?: Maybe<WebResourceLinkArrayDisplayProperty>;
};

export type DataCollectionDisplayProject = {
  __typename?: 'DataCollectionDisplayProject';
  associationsHeader?: Maybe<PropertyDisplayNameMetadata>;
  citation?: Maybe<StringDisplayProperty>;
  contact?: Maybe<ContactArrayDisplayProperty>;
  contributor?: Maybe<WebResourceLinkArrayDisplayProperty>;
  dataCollection?: Maybe<Array<Maybe<DataCollectionDisplay>>>;
  dataCollectionsHeader?: Maybe<PropertyDisplayNameMetadata>;
  dataCreator?: Maybe<StringArrayDisplayProperty>;
  description?: Maybe<StringDisplayProperty>;
  detailsHeader?: Maybe<PropertyDisplayNameMetadata>;
  doi?: Maybe<WebResourceLinkDisplayProperty>;
  fundingHeader?: Maybe<PropertyDisplayNameMetadata>;
  grant?: Maybe<Array<Maybe<WebResourceLink>>>;
  hasSpecimensPage: Scalars['Boolean'];
  highlightedWebResources?: Maybe<WebResourceLinkArrayDisplayProperty>;
  license?: Maybe<WebResourceLinkArrayDisplayProperty>;
  modality?: Maybe<StringArrayDisplayProperty>;
  program?: Maybe<ProgramDisplayProperty>;
  programShortTitle?: Maybe<StringDisplayProperty>;
  project?: Maybe<ProjectDisplayArrayProperty>;
  projectDescription?: Maybe<PropertyDisplayNameMetadata>;
  protocol?: Maybe<Array<Maybe<WebResourceLink>>>;
  protocolHeader?: Maybe<PropertyDisplayNameMetadata>;
  publication?: Maybe<PublicationDisplayProperty>;
  publisher?: Maybe<WebResourceLinkDisplayProperty>;
  publishingInfoHeader?: Maybe<PropertyDisplayNameMetadata>;
  referenceId: Scalars['String'];
  shortTitle: StringDisplayProperty;
  species?: Maybe<StringArrayDisplayProperty>;
  specimenType?: Maybe<StringArrayDisplayProperty>;
  subProgramShortTitle?: Maybe<StringDisplayProperty>;
  technique?: Maybe<StringArrayDisplayProperty>;
  title: StringDisplayProperty;
  year?: Maybe<StringArrayDisplayProperty>;
};

export type DataCollectionInput = {
  accessControl?: InputMaybe<Scalars['String']>;
  completionState?: InputMaybe<Scalars['String']>;
  description: Scalars['String'];
  lastUpdatedAtDate?: InputMaybe<Scalars['Date']>;
  modality?: InputMaybe<Array<InputMaybe<ModalityInput>>>;
  priorityOrder?: InputMaybe<Scalars['Int']>;
  publication?: InputMaybe<Array<InputMaybe<PublicationInput>>>;
  referenceId: Scalars['String'];
  shortTitle: Scalars['String'];
  species?: InputMaybe<Array<InputMaybe<SpeciesInput>>>;
  specimenCount?: InputMaybe<Array<InputMaybe<SpecimenCountInput>>>;
  specimenType?: InputMaybe<Array<InputMaybe<SpecimenTypeInput>>>;
  technique?: InputMaybe<Array<InputMaybe<TechniqueInput>>>;
  title: Scalars['String'];
  webResources?: InputMaybe<Array<InputMaybe<UrlResourceInput>>>;
};

export type DataCollectionProject = Aio_Project & PriorityOrderedObject & {
  __typename?: 'DataCollectionProject';
  citation?: Maybe<Scalars['String']>;
  contact?: Maybe<Array<Maybe<Contact>>>;
  dataCollection?: Maybe<Array<Maybe<DataCollection>>>;
  dataContributor?: Maybe<Array<Maybe<DataContributor>>>;
  dataCreator?: Maybe<Array<Maybe<DataCreator>>>;
  dataPublicationYear?: Maybe<Array<Maybe<Scalars['String']>>>;
  description: Scalars['String'];
  doiSymbol?: Maybe<Scalars['String']>;
  grant?: Maybe<Array<Maybe<Aio_Grant>>>;
  hasSpecimen: Scalars['Boolean'];
  hasSpecimenFiles: Scalars['Boolean'];
  highlightedWebResources?: Maybe<Array<Maybe<UrlResource>>>;
  informationWebResource?: Maybe<UrlResource>;
  license?: Maybe<Array<Maybe<License>>>;
  modality?: Maybe<Array<Maybe<Modality>>>;
  priorityOrder?: Maybe<Scalars['Int']>;
  protocol?: Maybe<Array<Maybe<Aio_Protocol>>>;
  publication?: Maybe<Array<Maybe<Publication>>>;
  publisher?: Maybe<Publisher>;
  readMeFile?: Maybe<Scalars['String']>;
  referenceId: Scalars['String'];
  relatedProjects?: Maybe<Array<Maybe<DataCollectionProject>>>;
  shortTitle: Scalars['String'];
  species?: Maybe<Array<Maybe<Species>>>;
  specimenType?: Maybe<Array<Maybe<SpecimenType>>>;
  subProgram?: Maybe<Array<Maybe<SubProgram>>>;
  supersedes?: Maybe<Array<Scalars['String']>>;
  taxonomies?: Maybe<Array<Taxonomy>>;
  technique?: Maybe<Array<Maybe<Technique>>>;
  title: Scalars['String'];
};

export type DataCollectionProjectInput = {
  citation?: InputMaybe<Scalars['String']>;
  contact?: InputMaybe<Array<InputMaybe<ContactInput>>>;
  dataCollection?: InputMaybe<Array<InputMaybe<DataCollectionInput>>>;
  dataContributor?: InputMaybe<Array<InputMaybe<DataContributorInput>>>;
  dataCreator?: InputMaybe<Array<InputMaybe<DataCreatorInput>>>;
  dataPublicationYear?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description: Scalars['String'];
  doiSymbol?: InputMaybe<Scalars['String']>;
  grant?: InputMaybe<Array<InputMaybe<Aio_GrantInput>>>;
  highlightedWebResources?: InputMaybe<Array<InputMaybe<UrlResourceInput>>>;
  informationWebResource?: InputMaybe<UrlResourceInput>;
  license?: InputMaybe<Array<InputMaybe<LicenseInput>>>;
  modality?: InputMaybe<Array<InputMaybe<ModalityInput>>>;
  priorityOrder?: InputMaybe<Scalars['Int']>;
  protocol?: InputMaybe<Array<InputMaybe<Aio_ProtocolInput>>>;
  publication?: InputMaybe<Array<InputMaybe<PublicationInput>>>;
  publisher?: InputMaybe<PublisherInput>;
  readMeFile?: InputMaybe<Scalars['String']>;
  referenceId: Scalars['String'];
  relatedProjects?: InputMaybe<Array<InputMaybe<RelatedDataCollectionProjectInput>>>;
  shortTitle: Scalars['String'];
  species?: InputMaybe<Array<InputMaybe<SpeciesInput>>>;
  specimenType?: InputMaybe<Array<InputMaybe<SpecimenTypeInput>>>;
  subProgram?: InputMaybe<Array<InputMaybe<SubProgramInput>>>;
  taxonomies?: InputMaybe<Array<TaxonomyInput>>;
  technique?: InputMaybe<Array<InputMaybe<TechniqueInput>>>;
  title: Scalars['String'];
};

export type DataContributor = PriorityOrderedObject & {
  __typename?: 'DataContributor';
  agentType: Scalars['String'];
  organization?: Maybe<Organization>;
  person?: Maybe<Person>;
  priorityOrder?: Maybe<Scalars['Int']>;
};

export type DataContributorInput = {
  agentType: Scalars['String'];
  organization?: InputMaybe<OrganizationInput>;
  person?: InputMaybe<PersonInput>;
  priorityOrder?: InputMaybe<Scalars['Int']>;
};

export type DataCreator = PriorityOrderedObject & {
  __typename?: 'DataCreator';
  agentType: Scalars['String'];
  organization?: Maybe<Organization>;
  person?: Maybe<Person>;
  priorityOrder?: Maybe<Scalars['Int']>;
};

export type DataCreatorInput = {
  agentType: Scalars['String'];
  organization?: InputMaybe<OrganizationInput>;
  person?: InputMaybe<PersonInput>;
  priorityOrder?: InputMaybe<Scalars['Int']>;
};

export type DataSet = {
  modality?: Maybe<Array<Maybe<Modality>>>;
  name?: Maybe<Scalars['String']>;
};

export type DisplayProperty = {
  referenceId?: Maybe<Scalars['String']>;
  type?: Maybe<DisplayPropertyType>;
};

export type DisplayPropertyFilter = {
  projectReferenceId?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<DisplayPropertyType>;
  typeReferenceId?: InputMaybe<Scalars['String']>;
};

export enum DisplayPropertyType {
  Project = 'PROJECT',
  SpecimenType = 'SPECIMEN_TYPE'
}

export type Donor = {
  __typename?: 'Donor';
  name?: Maybe<Scalars['String']>;
  sex?: Maybe<Scalars['String']>;
};

export type DownloadFile = {
  __typename?: 'DownloadFile';
  displayName?: Maybe<Scalars['String']>;
  downloadUrl?: Maybe<Scalars['String']>;
};

export type EntityInput = {
  entityType: EntityType;
  identifyingAttribute: Scalars['String'];
};

export type EntityRelationshipInput = {
  sourceEntity: EntityInput;
  targetEntity: EntityInput;
};

export enum EntityType {
  AioSpecimen = 'AIO_SPECIMEN',
  Annotation = 'ANNOTATION',
  ChildrenReferenceId = 'CHILDREN_REFERENCE_ID',
  Contact = 'CONTACT',
  DataCollection = 'DATA_COLLECTION',
  DataCollectionProject = 'DATA_COLLECTION_PROJECT',
  DataContributor = 'DATA_CONTRIBUTOR',
  DataCreator = 'DATA_CREATOR',
  DataPublicationYear = 'DATA_PUBLICATION_YEAR',
  DisplayFeature = 'DISPLAY_FEATURE',
  Grant = 'GRANT',
  HighlightedWebResource = 'HIGHLIGHTED_WEB_RESOURCE',
  Image = 'IMAGE',
  Licence = 'LICENCE',
  Measurement = 'MEASUREMENT',
  Modality = 'MODALITY',
  ProjectDisplayProperty = 'PROJECT_DISPLAY_PROPERTY',
  ProjectReferenceId = 'PROJECT_REFERENCE_ID',
  Protocol = 'PROTOCOL',
  Publication = 'PUBLICATION',
  RelatedProject = 'RELATED_PROJECT',
  RelatedSpecimens = 'RELATED_SPECIMENS',
  Species = 'SPECIES',
  SpecimenCount = 'SPECIMEN_COUNT',
  SpecimenFile = 'SPECIMEN_FILE',
  SpecimenType = 'SPECIMEN_TYPE',
  SubProgram = 'SUB_PROGRAM',
  Taxon = 'TAXON',
  Taxonomies = 'TAXONOMIES',
  TaxonomyNode = 'TAXONOMY_NODE',
  Technique = 'TECHNIQUE',
  WebResource = 'WEB_RESOURCE'
}

export enum ExportStatus {
  Complete = 'COMPLETE',
  Failure = 'FAILURE',
  NoData = 'NO_DATA',
  Running = 'RUNNING'
}

export type FeatureDisplayProperty = {
  featureType: FeatureType;
  filterOperator?: Maybe<FilterOperator>;
  isDefault: Scalars['Boolean'];
  modality?: Maybe<Array<Modality>>;
  priorityOrder?: Maybe<Scalars['Int']>;
  type?: Maybe<FeatureDisplayType>;
};

export type FeatureDisplayPropertyInput = {
  featureType: FeatureTypeInput;
  isDefault: Scalars['Boolean'];
  priorityOrder?: InputMaybe<Scalars['Int']>;
};

export enum FeatureDisplayType {
  Annotation = 'ANNOTATION',
  Image = 'IMAGE',
  Measurement = 'MEASUREMENT'
}

export type FeatureMatrixAggregationResult = {
  __typename?: 'FeatureMatrixAggregationResult';
  groupByResults?: Maybe<Array<Maybe<FeatureMatrixGroupByResult>>>;
  max?: Maybe<Scalars['Float']>;
  mean?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
};

export type FeatureMatrixGroupByResult = {
  __typename?: 'FeatureMatrixGroupByResult';
  featureResults?: Maybe<Array<Maybe<FeatureResult>>>;
  row?: Maybe<Scalars['String']>;
};

export type FeatureResult = {
  __typename?: 'FeatureResult';
  feature?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type FeatureType = {
  __typename?: 'FeatureType';
  description: Scalars['String'];
  referenceId: Scalars['String'];
  title: Scalars['String'];
};

export type FeatureTypeInput = {
  description: Scalars['String'];
  referenceId: Scalars['String'];
  title: Scalars['String'];
};

export type FileArchive = {
  __typename?: 'FileArchive';
  name: Scalars['String'];
  referenceId: Scalars['String'];
};

export type FileArchiveInput = {
  name: Scalars['String'];
  referenceId: Scalars['String'];
};

export type Filter = {
  field?: InputMaybe<Scalars['field_String_pattern_id']>;
  operator?: InputMaybe<FilterOperator>;
  value?: InputMaybe<Scalars['String']>;
};

export type FilterField = {
  __typename?: 'FilterField';
  alias?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  propertyName?: Maybe<Scalars['String']>;
};

/** Operations permitted when filtering on various fields. */
export enum FilterOperator {
  Between = 'BETWEEN',
  Contains = 'CONTAINS',
  Eq = 'EQ'
}

export type Gene = {
  __typename?: 'Gene';
  entrezId?: Maybe<Scalars['String']>;
  genome?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
};

export type Genotype = {
  __typename?: 'Genotype';
  name?: Maybe<Scalars['String']>;
};

export type Hemisphere = {
  __typename?: 'Hemisphere';
  name?: Maybe<Scalars['String']>;
};

export type Image = {
  __typename?: 'Image';
  annotated?: Maybe<Scalars['Boolean']>;
  bytes: Scalars['String'];
  featureType: FeatureType;
  height: Scalars['Int'];
  modality?: Maybe<Array<Modality>>;
  referenceId: Scalars['String'];
  url: Scalars['String'];
  width: Scalars['Int'];
};

export type ImageDimensions = {
  __typename?: 'ImageDimensions';
  height: Scalars['Int'];
  width: Scalars['Int'];
};

export type ImageDisplayProperty = FeatureDisplayProperty & {
  __typename?: 'ImageDisplayProperty';
  dimensions?: Maybe<ImageDimensions>;
  featureType: FeatureType;
  filterOperator?: Maybe<FilterOperator>;
  isDefault: Scalars['Boolean'];
  modality?: Maybe<Array<Modality>>;
  priorityOrder?: Maybe<Scalars['Int']>;
  type?: Maybe<FeatureDisplayType>;
};

export type ImageInput = {
  annotated?: InputMaybe<Scalars['Boolean']>;
  bytes: Scalars['String'];
  featureType: FeatureTypeInput;
  modality?: InputMaybe<Array<ModalityInput>>;
  referenceId: Scalars['String'];
};

export type IntDisplayProperty = {
  __typename?: 'IntDisplayProperty';
  metadata?: Maybe<PropertyDisplayNameMetadata>;
  value?: Maybe<Scalars['Int']>;
};

export type ItemCount = {
  __typename?: 'ItemCount';
  count?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type License = PriorityOrderedObject & {
  __typename?: 'License';
  priorityOrder?: Maybe<Scalars['Int']>;
  referenceId: Scalars['String'];
  shortTitle: Scalars['String'];
  title: Scalars['String'];
  urlResource?: Maybe<UrlResource>;
};

export type LicenseInput = {
  priorityOrder?: InputMaybe<Scalars['Int']>;
  referenceId: Scalars['String'];
  shortTitle: Scalars['String'];
  title: Scalars['String'];
  urlResource?: InputMaybe<UrlResourceInput>;
};

export enum MatrixAggregationCellMetadata {
  ClusterLabel = 'CLUSTER_LABEL'
}

export enum MatrixAggregationOperator {
  Medians = 'MEDIANS',
  TrimmedMeans = 'TRIMMED_MEANS'
}

export type Measurement = {
  __typename?: 'Measurement';
  featureType: FeatureType;
  measurementType: MeasurementType;
  modality?: Maybe<Array<Modality>>;
  referenceId: Scalars['String'];
  unit?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type MeasurementDisplayProperty = FeatureDisplayProperty & {
  __typename?: 'MeasurementDisplayProperty';
  featureType: FeatureType;
  filterOperator?: Maybe<FilterOperator>;
  isDefault: Scalars['Boolean'];
  measurementStats?: Maybe<MeasurementStats>;
  measurementType?: Maybe<MeasurementType>;
  modality?: Maybe<Array<Modality>>;
  priorityOrder?: Maybe<Scalars['Int']>;
  type?: Maybe<FeatureDisplayType>;
  unit?: Maybe<Scalars['String']>;
};

export type MeasurementInput = {
  featureType: FeatureTypeInput;
  measurementType: MeasurementType;
  modality?: InputMaybe<Array<ModalityInput>>;
  referenceId: Scalars['String'];
  unit?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type MeasurementStats = {
  __typename?: 'MeasurementStats';
  avg?: Maybe<Scalars['Float']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  std?: Maybe<Scalars['Float']>;
};

export enum MeasurementType {
  Qualitative = 'QUALITATIVE',
  Quantitative = 'QUANTITATIVE'
}

export type Modality = {
  __typename?: 'Modality';
  name?: Maybe<Scalars['String']>;
};

export type ModalityInput = {
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  deleteDataCollectionProject?: Maybe<Scalars['Boolean']>;
  removeEntityRelationship?: Maybe<Scalars['Boolean']>;
  restoreToLKG?: Maybe<Scalars['Boolean']>;
  updateDataCollectionProjectInventory?: Maybe<Array<Maybe<DataCollectionProject>>>;
  updateProjectDisplayProperty?: Maybe<ProjectDisplayProperty>;
  updateSpecimenTypeDisplayProperty?: Maybe<SpecimenTypeDisplayProperty>;
  updateSpecimens?: Maybe<Array<Maybe<Aio_Specimen>>>;
};


export type MutationDeleteDataCollectionProjectArgs = {
  referenceId: Scalars['String'];
  supersededBy?: InputMaybe<Array<Scalars['String']>>;
};


export type MutationRemoveEntityRelationshipArgs = {
  input: Array<EntityRelationshipInput>;
};


export type MutationUpdateDataCollectionProjectInventoryArgs = {
  input?: InputMaybe<Array<InputMaybe<DataCollectionProjectInput>>>;
};


export type MutationUpdateProjectDisplayPropertyArgs = {
  input?: InputMaybe<ProjectDisplayPropertyInput>;
};


export type MutationUpdateSpecimenTypeDisplayPropertyArgs = {
  input: SpecimenTypeDisplayPropertyInput;
};


export type MutationUpdateSpecimensArgs = {
  input?: InputMaybe<Array<InputMaybe<Aio_SpecimenInput>>>;
};

export type Organization = {
  __typename?: 'Organization';
  name: Scalars['String'];
  referenceId: Scalars['String'];
  rorSymbol?: Maybe<Scalars['String']>;
};

export type OrganizationInput = {
  name: Scalars['String'];
  referenceId: Scalars['String'];
  rorSymbol?: InputMaybe<Scalars['String']>;
};

export type PathologyImage = {
  __typename?: 'PathologyImage';
  description: Scalars['String'];
  donorReferenceId: Scalars['String'];
  featureType: FeatureType;
  slide: Scalars['String'];
  tileSource?: Maybe<TileSource>;
};

export type PathologyImageProperties = {
  __typename?: 'PathologyImageProperties';
  donorReferenceId: Scalars['String'];
  slides: Array<Scalars['String']>;
};

export type Person = {
  __typename?: 'Person';
  ORCID?: Maybe<Scalars['String']>;
  familyName: Scalars['String'];
  givenName: Scalars['String'];
  name: Scalars['String'];
  referenceId: Scalars['String'];
};

export type PersonInput = {
  ORCID?: InputMaybe<Scalars['String']>;
  familyName: Scalars['String'];
  givenName: Scalars['String'];
  name: Scalars['String'];
  referenceId: Scalars['String'];
};

export type Program = Aio_Project & PriorityOrderedObject & {
  __typename?: 'Program';
  description: Scalars['String'];
  informationWebResource?: Maybe<UrlResource>;
  priorityOrder?: Maybe<Scalars['Int']>;
  referenceId: Scalars['String'];
  shortTitle: Scalars['String'];
  title: Scalars['String'];
};

export type ProgramDisplayProperty = {
  __typename?: 'ProgramDisplayProperty';
  metadata?: Maybe<PropertyDisplayNameMetadata>;
  value: Array<BffProgram>;
};

export type ProgramInput = {
  description: Scalars['String'];
  informationWebResource?: InputMaybe<UrlResourceInput>;
  priorityOrder?: InputMaybe<Scalars['Int']>;
  referenceId: Scalars['String'];
  shortTitle: Scalars['String'];
  title: Scalars['String'];
};

export type ProjectDisplayArrayProperty = {
  __typename?: 'ProjectDisplayArrayProperty';
  metadata?: Maybe<PropertyDisplayNameMetadata>;
  value: Array<BffProject>;
};

export type ProjectDisplayProperty = DisplayProperty & {
  __typename?: 'ProjectDisplayProperty';
  defaultFilter?: Maybe<Scalars['String']>;
  defaultSort?: Maybe<Scalars['String']>;
  displayFeatures?: Maybe<Array<FeatureDisplayProperty>>;
  referenceId?: Maybe<Scalars['String']>;
  type?: Maybe<DisplayPropertyType>;
};

export type ProjectDisplayPropertyInput = {
  defaultFilter?: InputMaybe<Array<Filter>>;
  defaultSort?: InputMaybe<Array<Sort>>;
  displayFeatures: Array<FeatureDisplayPropertyInput>;
  projectReferenceId?: InputMaybe<Scalars['String']>;
};

export type PropertyDisplayNameMetadata = {
  __typename?: 'PropertyDisplayNameMetadata';
  description: Scalars['String'];
  longName: Scalars['String'];
  shortName: Scalars['String'];
};

/** Tuple utility type representing a property and its value. */
export type PropertyValueTuple = {
  __typename?: 'PropertyValueTuple';
  property?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type Publication = PriorityOrderedObject & {
  __typename?: 'Publication';
  author: Person;
  doiSymbol: Scalars['String'];
  priorityOrder?: Maybe<Scalars['Int']>;
  publicationYear: Scalars['String'];
  pubmedId?: Maybe<Scalars['String']>;
  referenceId: Scalars['String'];
  title?: Maybe<Scalars['String']>;
};

export type PublicationDisplayProperty = {
  __typename?: 'PublicationDisplayProperty';
  metadata?: Maybe<PropertyDisplayNameMetadata>;
  value: Array<BffPublication>;
};

export type PublicationInput = {
  author: PersonInput;
  doiSymbol: Scalars['String'];
  priorityOrder?: InputMaybe<Scalars['Int']>;
  publicationYear: Scalars['String'];
  pubmedId?: InputMaybe<Scalars['String']>;
  referenceId: Scalars['String'];
  title?: InputMaybe<Scalars['String']>;
};

export type Publisher = {
  __typename?: 'Publisher';
  organization: Organization;
};

export type PublisherInput = {
  organization: OrganizationInput;
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  aggregateRowsOnFeatureMatrix?: Maybe<FeatureMatrixAggregationResult>;
  aio_specimen?: Maybe<Array<Maybe<Aio_Specimen>>>;
  aio_specimenCounts?: Maybe<Array<Maybe<AggregationResult>>>;
  aio_specimenFacetedSearchProperties?: Maybe<Array<Maybe<Aio_SpecimenFacetedSearchProperty>>>;
  aio_specimenRangeCounts?: Maybe<Array<Maybe<AggregationResult>>>;
  allRowsForFeature?: Maybe<Scalars['JSON']>;
  /** queries cell types documents for suggested document matches */
  autosuggestCellTypes?: Maybe<Scalars['JSON']>;
  dataCollectionProjectFacetedSearchProperties?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Run faceted search on the available datasets, sorting and filtering on various properties and sub-properties. */
  dataCollectionProjectInventory?: Maybe<Array<Maybe<DataCollectionProject>>>;
  dataCollectionProjectInventoryCounts?: Maybe<Array<Maybe<AggregationResult>>>;
  /**
   * Parameters:
   *   projectReferenceId: DataCollectionProject from which to export specimen data
   *   bundleType: type of export bundle to create
   */
  exportSpecimen?: Maybe<SpecimenExportResult>;
  /** returns a list of IDs for the available taxonomies in the system */
  getAvailableTaxonomies: Array<Maybe<TaxonomySpecies>>;
  /**
   * provides metadata about taxonomy
   * these metadata include details about every node in the taxonomy via the "nodes" property
   * the "nodes" property can also be filtered to a node with the nested "accessionId" parameter
   */
  getCellTypesTaxonomyInfo?: Maybe<CellTypeTaxonomyInfo>;
  /** queries data collection projects to display */
  getDataCollectionProjectDisplay: Array<Maybe<DataCollectionDisplayProject>>;
  getDisplayProperty?: Maybe<DisplayProperty>;
  getDonorPathologyImageProperties?: Maybe<PathologyImageProperties>;
  getDonorPathologyImageSet?: Maybe<Array<PathologyImage>>;
  getFeaturesInDataSet?: Maybe<Array<Maybe<Gene>>>;
  /** queries data collection project faceted search properties and includes a display name */
  getFilterField?: Maybe<Array<Maybe<FilterField>>>;
  /** queries data collection project inventory counts and returns a list of items with counts for a groupBy category */
  getItemCount?: Maybe<Array<Maybe<ItemCount>>>;
  getProjectCVImageProperties?: Maybe<CvProperties>;
  getProjectCVImageSet?: Maybe<Array<Maybe<CvImage>>>;
  /**
   * Query default display options for a specimen collection
   * Returns null if no collection is found with the given filter input arg
   */
  getSpecimenViewDefaultOptions?: Maybe<SpecimenViewDefaultOptions>;
  getTSNEData?: Maybe<Scalars['ByteArray']>;
  getTranscriptomicDataSet?: Maybe<TranscriptomicDataSet>;
  listTranscriptomicDataSets?: Maybe<Array<Maybe<TranscriptomicDataSet>>>;
  /** queries cell types documents for full document matches */
  searchCellTypes?: Maybe<Scalars['JSON']>;
  searchFeaturesInDataSet?: Maybe<Array<Maybe<Gene>>>;
  specimen?: Maybe<Array<Maybe<Specimen>>>;
  specimenAggregate?: Maybe<Array<Maybe<AggregationResult>>>;
  specimenFacetedSearchProperties?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryAggregateRowsOnFeatureMatrixArgs = {
  dataset?: InputMaybe<Scalars['String']>;
  features?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  groupBy?: InputMaybe<MatrixAggregationCellMetadata>;
  operator?: InputMaybe<MatrixAggregationOperator>;
  rows?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryAio_SpecimenArgs = {
  filter?: InputMaybe<Array<InputMaybe<Filter>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<Sort>>>;
};


export type QueryAio_SpecimenCountsArgs = {
  filter?: InputMaybe<Array<InputMaybe<Filter>>>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['groupBy_List_String_pattern_id']>>>;
  sort?: InputMaybe<Array<InputMaybe<Sort>>>;
};


export type QueryAio_SpecimenFacetedSearchPropertiesArgs = {
  filter?: InputMaybe<Array<InputMaybe<Filter>>>;
};


export type QueryAio_SpecimenRangeCountsArgs = {
  filter?: InputMaybe<Array<InputMaybe<Filter>>>;
  groupBy?: InputMaybe<RangeGroupBy>;
};


export type QueryAllRowsForFeatureArgs = {
  dataset?: InputMaybe<Scalars['String']>;
  feature?: InputMaybe<Scalars['String']>;
};


export type QueryAutosuggestCellTypesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  q: Scalars['String'];
  species?: InputMaybe<Array<Scalars['String']>>;
};


export type QueryDataCollectionProjectInventoryArgs = {
  filter?: InputMaybe<Array<InputMaybe<Filter>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<Sort>>>;
};


export type QueryDataCollectionProjectInventoryCountsArgs = {
  filter?: InputMaybe<Array<InputMaybe<Filter>>>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['groupBy_List_String_pattern_id']>>>;
};


export type QueryExportSpecimenArgs = {
  bundleType: SpecimenBundleType;
  projectReferenceId: Scalars['String'];
};


export type QueryGetCellTypesTaxonomyInfoArgs = {
  taxonomyId?: InputMaybe<Scalars['String']>;
};


export type QueryGetDataCollectionProjectDisplayArgs = {
  filter?: InputMaybe<Array<InputMaybe<BffFilter>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<BffSort>>>;
};


export type QueryGetDisplayPropertyArgs = {
  displayPropertyFilter: DisplayPropertyFilter;
};


export type QueryGetDonorPathologyImagePropertiesArgs = {
  donorReferenceId: Scalars['String'];
};


export type QueryGetDonorPathologyImageSetArgs = {
  donorReferenceId: Scalars['String'];
  slide: Scalars['String'];
};


export type QueryGetFeaturesInDataSetArgs = {
  DataSet: Scalars['String'];
  features: Array<InputMaybe<Scalars['String']>>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryGetItemCountArgs = {
  filter?: InputMaybe<Array<InputMaybe<BffFilter>>>;
  groupBy?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<BffSort>;
};


export type QueryGetProjectCvImagePropertiesArgs = {
  projectReferenceId: Scalars['String'];
};


export type QueryGetProjectCvImageSetArgs = {
  input?: InputMaybe<CvImagePropertyInput>;
};


export type QueryGetSpecimenViewDefaultOptionsArgs = {
  filter: Array<BffFilter>;
};


export type QueryGetTsneDataArgs = {
  TSNEName?: InputMaybe<Scalars['String']>;
};


export type QueryGetTranscriptomicDataSetArgs = {
  DataSet?: InputMaybe<Scalars['String']>;
};


export type QuerySearchCellTypesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  q: Scalars['String'];
  species?: InputMaybe<Array<Scalars['String']>>;
};


export type QuerySearchFeaturesInDataSetArgs = {
  DataSet: Scalars['String'];
  exact?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<Sort>>>;
  text: Scalars['String'];
};


export type QuerySpecimenArgs = {
  filter?: InputMaybe<Array<InputMaybe<Filter>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<Sort>>>;
};


export type QuerySpecimenAggregateArgs = {
  aggregationOperation?: InputMaybe<AggregationOperation>;
  filter?: InputMaybe<Array<InputMaybe<Filter>>>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['groupBy_List_String_pattern_id']>>>;
  sort?: InputMaybe<Array<InputMaybe<Sort>>>;
};

/** Input used to bucket properties by a value range for performing aggregations like counts */
export type RangeGroupBy = {
  field?: InputMaybe<Scalars['field_String_pattern_id']>;
  range?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Region = {
  __typename?: 'Region';
  name?: Maybe<Scalars['String']>;
};

export type RelatedDataCollectionProjectInput = {
  priorityOrder?: InputMaybe<Scalars['Int']>;
  referenceId: Scalars['String'];
};

export type RelatedSpecimen = {
  __typename?: 'RelatedSpecimen';
  relationship: SpecimenRelationship;
  specimenReferenceIds: Array<Scalars['String']>;
};

export type RelatedSpecimenInput = {
  relationship: SpecimenRelationshipInputType;
  specimenReferenceIds: Array<Scalars['String']>;
};

export type Sort = {
  field?: InputMaybe<Scalars['field_String_pattern_id']>;
  order?: InputMaybe<SortOrder>;
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Species = {
  __typename?: 'Species';
  name?: Maybe<Scalars['String']>;
};

export type SpeciesInput = {
  name: Scalars['String'];
};

export type Specimen = {
  __typename?: 'Specimen';
  broadClass?: Maybe<BroadClass>;
  cluster?: Maybe<Cluster>;
  corticalLayer?: Maybe<Array<Maybe<CorticalLayer>>>;
  dataSet?: Maybe<Scalars['String']>;
  donor?: Maybe<Donor>;
  genotype?: Maybe<Genotype>;
  hemisphere?: Maybe<Hemisphere>;
  name?: Maybe<Scalars['String']>;
  region?: Maybe<Array<Maybe<Region>>>;
  specimenType?: Maybe<Scalars['String']>;
  subclass?: Maybe<Subclass>;
  subspecimenCount?: Maybe<Scalars['Int']>;
  subspecimenType?: Maybe<Scalars['String']>;
};

export enum SpecimenBundleType {
  Manifest = 'MANIFEST',
  Metadata = 'METADATA'
}

export type SpecimenCount = {
  __typename?: 'SpecimenCount';
  specimenCount?: Maybe<Scalars['Int']>;
  specimenType: SpecimenType;
};

export type SpecimenCountInput = {
  specimenCount?: InputMaybe<Scalars['Int']>;
  specimenType: SpecimenTypeInput;
};

export type SpecimenExportResult = {
  __typename?: 'SpecimenExportResult';
  errorMessage?: Maybe<Scalars['String']>;
  status: ExportStatus;
  url?: Maybe<Scalars['String']>;
};

export type SpecimenFile = {
  __typename?: 'SpecimenFile';
  archive: FileArchive;
  checksum?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  referenceId: Scalars['String'];
  type: Scalars['String'];
  uri: Scalars['String'];
};

export type SpecimenFileInput = {
  archive: FileArchiveInput;
  checksum?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  referenceId: Scalars['String'];
  type: Scalars['String'];
  uri: Scalars['String'];
};

export enum SpecimenRelationship {
  Derives = 'DERIVES',
  DerivesFrom = 'DERIVES_FROM'
}

export enum SpecimenRelationshipInputType {
  DerivesFrom = 'DERIVES_FROM'
}

export type SpecimenType = PriorityOrderedObject & {
  __typename?: 'SpecimenType';
  name: Scalars['String'];
  priorityOrder?: Maybe<Scalars['Int']>;
  referenceId?: Maybe<Scalars['String']>;
};

export type SpecimenTypeDisplayProperty = DisplayProperty & {
  __typename?: 'SpecimenTypeDisplayProperty';
  defaultFilter?: Maybe<Scalars['String']>;
  defaultSort?: Maybe<Scalars['String']>;
  displayFeatures?: Maybe<Array<FeatureDisplayProperty>>;
  projectReferenceId?: Maybe<Scalars['String']>;
  referenceId?: Maybe<Scalars['String']>;
  type?: Maybe<DisplayPropertyType>;
};

export type SpecimenTypeDisplayPropertyInput = {
  defaultFilter?: InputMaybe<Array<Filter>>;
  defaultSort?: InputMaybe<Array<Sort>>;
  displayFeatures: Array<FeatureDisplayPropertyInput>;
  projectReferenceId: Scalars['String'];
  specimenTypeReferenceId: Scalars['String'];
};

export type SpecimenTypeInput = {
  name: Scalars['String'];
  priorityOrder?: InputMaybe<Scalars['Int']>;
  referenceId?: InputMaybe<Scalars['String']>;
};

export type SpecimenViewDefaultOptions = {
  __typename?: 'SpecimenViewDefaultOptions';
  /**
   * Default UI filter feature type reference ids (ordered) for specimen view.
   * Though initially implemented, this is not currently used. We marked it for deprecation.
   * However, there is a possibility we take advantage of this field during DT-1811.
   * Thus, it is NOT deprecated any longer.
   */
  filterFeatures: Array<Scalars['String']>;
  /** Default redux filter state for specimen view */
  filterState: Array<BffFilterType>;
  /** Default thumbnail images to show in list view */
  listImageFeatures: Array<Scalars['String']>;
  /** Default redux sort state for specimen view */
  sortState: Array<BffSortType>;
  /** Default UI summary feature type reference ids (ordered) for specimen */
  summaryFeatures: Array<Scalars['String']>;
  /** Default UI table column feature type reference ids (ordered) for specimen view */
  tableColumnFeatures: Array<Scalars['String']>;
};

export enum SpecimensViewTitle {
  List = 'LIST',
  Properties = 'PROPERTIES'
}

export type StringArrayDisplayProperty = {
  __typename?: 'StringArrayDisplayProperty';
  metadata?: Maybe<PropertyDisplayNameMetadata>;
  value?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type StringDisplayProperty = {
  __typename?: 'StringDisplayProperty';
  metadata?: Maybe<PropertyDisplayNameMetadata>;
  value?: Maybe<Scalars['String']>;
};

export type SubProgram = Aio_Project & PriorityOrderedObject & {
  __typename?: 'SubProgram';
  description: Scalars['String'];
  informationWebResource?: Maybe<UrlResource>;
  priorityOrder?: Maybe<Scalars['Int']>;
  program?: Maybe<Program>;
  referenceId: Scalars['String'];
  shortTitle: Scalars['String'];
  title: Scalars['String'];
};

export type SubProgramInput = {
  description: Scalars['String'];
  informationWebResource?: InputMaybe<UrlResourceInput>;
  priorityOrder?: InputMaybe<Scalars['Int']>;
  program?: InputMaybe<ProgramInput>;
  referenceId: Scalars['String'];
  shortTitle: Scalars['String'];
  title: Scalars['String'];
};

export type Subclass = {
  __typename?: 'Subclass';
  name?: Maybe<Scalars['String']>;
};

export type Taxon = {
  __typename?: 'Taxon';
  cRID: Crid;
  description: Scalars['String'];
  referenceId: Scalars['String'];
  symbol: Scalars['String'];
};

export type TaxonInput = {
  cRID: CridInput;
  description: Scalars['String'];
  referenceId: Scalars['String'];
  symbol: Scalars['String'];
};

export type Taxonomy = {
  __typename?: 'Taxonomy';
  description: Scalars['String'];
  referenceId: Scalars['String'];
  shortTitle: Scalars['String'];
  taxonomyNodes?: Maybe<Array<TaxonomyNode>>;
  title: Scalars['String'];
  type: TaxonomyType;
};

export type TaxonomyInput = {
  description: Scalars['String'];
  referenceId: Scalars['String'];
  shortTitle: Scalars['String'];
  taxonomyNodes?: InputMaybe<Array<TaxonomyNodeInput>>;
  title: Scalars['String'];
  type: TaxonomyType;
};

export type TaxonomyNode = {
  __typename?: 'TaxonomyNode';
  childrenReferenceIds?: Maybe<Array<Scalars['String']>>;
  color?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  featureTypeReferenceId?: Maybe<Scalars['String']>;
  parentReferenceId?: Maybe<Scalars['String']>;
  priorityOrder?: Maybe<Scalars['Int']>;
  referenceId: Scalars['String'];
  shortTitle: Scalars['String'];
  taxon: Taxon;
  title: Scalars['String'];
};

export type TaxonomyNodeInput = {
  childrenReferenceIds?: InputMaybe<Array<Scalars['String']>>;
  color?: InputMaybe<Scalars['String']>;
  description: Scalars['String'];
  featureTypeReferenceId?: InputMaybe<Scalars['String']>;
  parentReferenceId?: InputMaybe<Scalars['String']>;
  priorityOrder?: InputMaybe<Scalars['Int']>;
  referenceId: Scalars['String'];
  shortTitle: Scalars['String'];
  taxon: TaxonInput;
  title: Scalars['String'];
};

export type TaxonomySpecies = {
  __typename?: 'TaxonomySpecies';
  species: Scalars['String'];
  taxonomyId: Scalars['String'];
};

export enum TaxonomyType {
  ClassHierarchy = 'CLASS_HIERARCHY'
}

export type Technique = {
  __typename?: 'Technique';
  name?: Maybe<Scalars['String']>;
};

export type TechniqueInput = {
  name: Scalars['String'];
};

export type TileSource = {
  __typename?: 'TileSource';
  annotationSvg?: Maybe<Scalars['String']>;
  metadataUrl: Scalars['String'];
  url: Scalars['String'];
};

export type TranscriptomicDataSet = DataSet & {
  __typename?: 'TranscriptomicDataSet';
  cellTypeTaxonomy?: Maybe<Array<Maybe<CellTypeTaxonomy>>>;
  defaultCentralMeasure?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  downloadFiles?: Maybe<Array<Maybe<DownloadFile>>>;
  downloadPage?: Maybe<Scalars['String']>;
  features?: Maybe<Array<Maybe<Gene>>>;
  markers?: Maybe<Array<Maybe<Gene>>>;
  modality?: Maybe<Array<Maybe<Modality>>>;
  name?: Maybe<Scalars['String']>;
  protocolsUrl?: Maybe<Scalars['String']>;
  tSNEPlots?: Maybe<Array<Maybe<TSnePlotInfo>>>;
};

export type UrlResource = PriorityOrderedObject & {
  __typename?: 'UrlResource';
  priorityOrder?: Maybe<Scalars['Int']>;
  referenceId: Scalars['String'];
  shortTitle: Scalars['String'];
  title: Scalars['String'];
  type: Scalars['String'];
  url: Scalars['String'];
};

export type UrlResourceInput = {
  priorityOrder?: InputMaybe<Scalars['Int']>;
  referenceId: Scalars['String'];
  shortTitle: Scalars['String'];
  title: Scalars['String'];
  type: Scalars['String'];
  url: Scalars['String'];
};

export type WebResourceLink = {
  __typename?: 'WebResourceLink';
  iconKey?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type WebResourceLinkArrayDisplayProperty = {
  __typename?: 'WebResourceLinkArrayDisplayProperty';
  metadata?: Maybe<PropertyDisplayNameMetadata>;
  value?: Maybe<Array<Maybe<WebResourceLink>>>;
};

export type WebResourceLinkDisplayProperty = {
  __typename?: 'WebResourceLinkDisplayProperty';
  metadata?: Maybe<PropertyDisplayNameMetadata>;
  value?: Maybe<WebResourceLink>;
};

export type PriorityOrderedObject = {
  priorityOrder?: Maybe<Scalars['Int']>;
};

export type TSnePlotInfo = {
  __typename?: 'tSNEPlotInfo';
  name?: Maybe<Scalars['String']>;
};

export type AzimuthExplorerQueryVariables = Exact<{
  taxonomyId: Scalars['String'];
}>;


export type AzimuthExplorerQuery = { __typename?: 'Query', azimuthText?: { __typename?: 'CellTypeTaxonomyInfo', azimuthText?: string | null, azimuthLink?: string | null, azimuthHeader?: string | null, id: string } | null };

export type SearchCellTypesQueryVariables = Exact<{
  q: Scalars['String'];
  species?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type SearchCellTypesQuery = { __typename?: 'Query', searchCellTypes?: any | null };

export type CellTypeCardQueryVariables = Exact<{
  taxId: Scalars['String'];
  cellTypeId: Scalars['String'];
}>;


export type CellTypeCardQuery = { __typename?: 'Query', sidebar?: { __typename?: 'CellTypeTaxonomyInfo', accessionId: string, age?: string | null, anatomy?: string | null, sex?: string | null, species?: string | null, id: string, anatomyImages?: Array<{ __typename?: 'CellTypeAnatomyImage', src?: string | null, alt?: string | null } | null> | null, nodes?: Array<{ __typename?: 'CellTypeTaxonomyHierarchyNode', accessionId: string, aliases?: Array<string> | null, classLabel?: string | null, color?: string | null, fullOntologyName?: string | null, label?: string | null, symbol?: string | null, tags?: Array<string | null> | null, nfForestMarkers?: Array<{ __typename?: 'WebResourceLink', text?: string | null, url?: string | null }> | null, ontologyIri?: { __typename?: 'WebResourceLink', text?: string | null, url?: string | null } | null }> | null } | null };

export type CellTypeCardSummaryQueryVariables = Exact<{
  taxonomyId: Scalars['String'];
  accessionId?: InputMaybe<Scalars['String']>;
}>;


export type CellTypeCardSummaryQuery = { __typename?: 'Query', nodeSummary?: { __typename?: 'CellTypeTaxonomyInfo', id: string, nodes?: Array<{ __typename?: 'CellTypeTaxonomyHierarchyNode', summary?: string | null, references?: Array<string> | null, label?: string | null }> | null } | null };

export type DataSectionQueryQueryVariables = Exact<{
  taxonomyId: Scalars['String'];
  accessionId: Scalars['String'];
}>;


export type DataSectionQueryQuery = { __typename?: 'Query', section?: { __typename?: 'CellTypeTaxonomyInfo', id: string, nodes?: Array<{ __typename?: 'CellTypeTaxonomyHierarchyNode', dataSections?: any | null }> | null } | null };

export type SidebarExplorerQueryVariables = Exact<{
  taxonomyId: Scalars['String'];
}>;


export type SidebarExplorerQuery = { __typename?: 'Query', sidebar?: { __typename?: 'CellTypeTaxonomyInfo', accessionId: string, age?: string | null, anatomy?: string | null, cellClassesCount?: string | null, cellSubclassesCount?: string | null, cellTypesCount?: string | null, header?: string | null, mainDescription?: string | null, attribution?: string | null, sex?: string | null, species?: string | null, crossSpeciesImages?: Array<string> | null, id: string, anatomyImages?: Array<{ __typename?: 'CellTypeAnatomyImage', src?: string | null, alt?: string | null } | null> | null, datasets?: Array<{ __typename?: 'CellTypesDatasetInfo', dataset?: string | null, cellsNuclei?: string | null, downloadLink?: string | null, exploreLink?: string | null } | null> | null } | null };

export type ListCellTypeTaxonomiesQueryVariables = Exact<{ [key: string]: never; }>;


export type ListCellTypeTaxonomiesQuery = { __typename?: 'Query', availableTaxonomies: Array<{ __typename?: 'TaxonomySpecies', species: string, taxonomyId: string } | null> };

export type SunburstExplorerQueryVariables = Exact<{
  taxonomyId: Scalars['String'];
}>;


export type SunburstExplorerQuery = { __typename?: 'Query', sunburstHierarchy?: { __typename?: 'CellTypeTaxonomyInfo', accessionId: string, species?: string | null, id: string, nodes?: Array<{ __typename?: 'CellTypeTaxonomyHierarchyNode', id?: string | null, parentId?: string | null, accessionId: string, label?: string | null, color?: string | null, rank?: string | null }> | null } | null };

export type GeneSearchQueryQueryVariables = Exact<{
  projectReferenceId: Scalars['String'];
  text?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortOrder>;
  limit?: InputMaybe<Scalars['Int']>;
  exact?: InputMaybe<Scalars['Boolean']>;
}>;


export type GeneSearchQueryQuery = { __typename?: 'Query', getProjectCVImageProperties?: { __typename?: 'CVProperties', cellType: Array<string>, gene: Array<string>, metaData: Array<string>, comparisonType: Array<string> } | null };

export type ImageSearchQueryQueryVariables = Exact<{
  projectReferenceId: Scalars['String'];
  cellType: Scalars['String'];
  gene: Scalars['String'];
  metaData: Scalars['String'];
  comparisonType: Scalars['String'];
}>;


export type ImageSearchQueryQuery = { __typename?: 'Query', getProjectCVImageSet?: Array<{ __typename?: 'CVImage', url: string, featureType: { __typename?: 'FeatureType', referenceId: string, title: string } } | null> | null };

export type DonorProfileIdQueryQueryVariables = Exact<{
  donorReferenceId: Scalars['String'];
  donorIdFeatureType?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
}>;


export type DonorProfileIdQueryQuery = { __typename?: 'Query', aio_specimen?: Array<{ __typename?: 'AIO_Specimen', annotations?: Array<{ __typename?: 'Annotation', featureType: { __typename?: 'FeatureType', title: string }, taxons: Array<{ __typename?: 'Taxon', symbol: string }> }> | null } | null> | null };

export type DonorProfileIdsQueryVariables = Exact<{
  donorReferenceId: Scalars['String'];
  donorIdFeatureType?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
}>;


export type DonorProfileIdsQuery = { __typename?: 'Query', aio_specimen?: Array<{ __typename?: 'AIO_Specimen', annotations?: Array<{ __typename?: 'Annotation', referenceId: string, featureType: { __typename?: 'FeatureType', title: string }, taxons: Array<{ __typename?: 'Taxon', symbol: string }> }> | null } | null> | null };

export type DonorProfileImagePropertiesQueryQueryVariables = Exact<{
  donorReferenceId: Scalars['String'];
}>;


export type DonorProfileImagePropertiesQueryQuery = { __typename?: 'Query', getDonorPathologyImageProperties?: { __typename?: 'PathologyImageProperties', donorReferenceId: string, slides: Array<string> } | null };

export type DonorProfileImageSetQueryQueryVariables = Exact<{
  donorReferenceId: Scalars['String'];
  slide: Scalars['String'];
}>;


export type DonorProfileImageSetQueryQuery = { __typename?: 'Query', getDonorPathologyImageSet?: Array<{ __typename?: 'PathologyImage', donorReferenceId: string, description: string, slide: string, featureType: { __typename?: 'FeatureType', referenceId: string, description: string }, tileSource?: { __typename?: 'TileSource', url: string, metadataUrl: string, annotationSvg?: string | null } | null }> | null };

export type TotalProjectCountQueryVariables = Exact<{
  filter?: InputMaybe<Array<InputMaybe<BffFilter>> | InputMaybe<BffFilter>>;
}>;


export type TotalProjectCountQuery = { __typename?: 'Query', Projects?: Array<{ __typename?: 'ItemCount', count?: number | null } | null> | null };

export type StringDisplayFragment = { __typename?: 'StringDisplayProperty', value?: string | null, metadata?: { __typename?: 'PropertyDisplayNameMetadata', shortName: string, longName: string, description: string } | null };

export type StringArrayDisplayFragment = { __typename?: 'StringArrayDisplayProperty', value?: Array<string | null> | null, metadata?: { __typename?: 'PropertyDisplayNameMetadata', shortName: string, longName: string, description: string } | null };

export type DataCollectionProjectListQueryQueryVariables = Exact<{
  filter?: InputMaybe<Array<InputMaybe<BffFilter>> | InputMaybe<BffFilter>>;
  sort?: InputMaybe<Array<InputMaybe<BffSort>> | InputMaybe<BffSort>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type DataCollectionProjectListQueryQuery = { __typename?: 'Query', getDataCollectionProjectDisplay: Array<{ __typename?: 'DataCollectionDisplayProject', referenceId: string, hasSpecimensPage: boolean, description?: { __typename?: 'StringDisplayProperty', value?: string | null, metadata?: { __typename?: 'PropertyDisplayNameMetadata', shortName: string, longName: string, description: string } | null } | null, title: { __typename?: 'StringDisplayProperty', value?: string | null, metadata?: { __typename?: 'PropertyDisplayNameMetadata', shortName: string, longName: string, description: string } | null }, dataCreator?: { __typename?: 'StringArrayDisplayProperty', value?: Array<string | null> | null, metadata?: { __typename?: 'PropertyDisplayNameMetadata', shortName: string, longName: string, description: string } | null } | null, modality?: { __typename?: 'StringArrayDisplayProperty', value?: Array<string | null> | null, metadata?: { __typename?: 'PropertyDisplayNameMetadata', shortName: string, longName: string, description: string } | null } | null, technique?: { __typename?: 'StringArrayDisplayProperty', value?: Array<string | null> | null, metadata?: { __typename?: 'PropertyDisplayNameMetadata', shortName: string, longName: string, description: string } | null } | null, specimenType?: { __typename?: 'StringArrayDisplayProperty', value?: Array<string | null> | null, metadata?: { __typename?: 'PropertyDisplayNameMetadata', shortName: string, longName: string, description: string } | null } | null, species?: { __typename?: 'StringArrayDisplayProperty', value?: Array<string | null> | null, metadata?: { __typename?: 'PropertyDisplayNameMetadata', shortName: string, longName: string, description: string } | null } | null, shortTitle: { __typename?: 'StringDisplayProperty', value?: string | null, metadata?: { __typename?: 'PropertyDisplayNameMetadata', shortName: string, longName: string, description: string } | null }, subProgramShortTitle?: { __typename?: 'StringDisplayProperty', value?: string | null, metadata?: { __typename?: 'PropertyDisplayNameMetadata', shortName: string, longName: string, description: string } | null } | null, programShortTitle?: { __typename?: 'StringDisplayProperty', value?: string | null, metadata?: { __typename?: 'PropertyDisplayNameMetadata', shortName: string, longName: string, description: string } | null } | null, webResources?: { __typename?: 'WebResourceLinkArrayDisplayProperty', value?: Array<{ __typename?: 'WebResourceLink', url?: string | null, text?: string | null, iconKey?: string | null } | null> | null, metadata?: { __typename?: 'PropertyDisplayNameMetadata', description: string, shortName: string, longName: string } | null } | null } | null> };

export type FilterDisplayNamesQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type FilterDisplayNamesQueryQuery = { __typename?: 'Query', getFilterField?: Array<{ __typename?: 'FilterField', alias?: string | null, displayName?: string | null } | null> | null };

export type GetSpecimensIdsQueryVariables = Exact<{
  sort?: InputMaybe<Array<InputMaybe<Sort>> | InputMaybe<Sort>>;
  filter?: InputMaybe<Array<InputMaybe<Filter>> | InputMaybe<Filter>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type GetSpecimensIdsQuery = { __typename?: 'Query', specimensIds?: Array<{ __typename?: 'AIO_Specimen', cRID: { __typename?: 'CRID', symbol: string } } | null> | null };

export type GetSpecimenImagesQueryVariables = Exact<{
  sort?: InputMaybe<Array<InputMaybe<Sort>> | InputMaybe<Sort>>;
  filter?: InputMaybe<Array<InputMaybe<Filter>> | InputMaybe<Filter>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  featureTypes?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  imageRefIds?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
}>;


export type GetSpecimenImagesQuery = { __typename?: 'Query', specimens?: Array<{ __typename?: 'AIO_Specimen', referenceId: string, cRID: { __typename?: 'CRID', symbol: string, registry: { __typename?: 'CRIDRegistry', referenceId: string, description: string } }, annotations?: Array<{ __typename?: 'Annotation', referenceId: string, featureType: { __typename?: 'FeatureType', referenceId: string, title: string }, taxons: Array<{ __typename?: 'Taxon', symbol: string }> }> | null, measurements?: Array<{ __typename?: 'Measurement', value?: string | null, measurementType: MeasurementType, featureType: { __typename?: 'FeatureType', referenceId: string, title: string, description: string } }> | null, images?: Array<{ __typename?: 'Image', referenceId: string, url: string, annotated?: boolean | null, height: number, width: number, featureType: { __typename?: 'FeatureType', referenceId: string, title: string } }> | null } | null> | null };

export type SpecimenCountQueryVariables = Exact<{
  filter?: InputMaybe<Array<InputMaybe<Filter>> | InputMaybe<Filter>>;
}>;


export type SpecimenCountQuery = { __typename?: 'Query', totalCount?: Array<{ __typename?: 'AggregationResult', count?: number | null } | null> | null };

export type PropertiesQueryVariables = Exact<{
  filter: Array<Filter> | Filter;
  displayPropertyFilter: DisplayPropertyFilter;
}>;


export type PropertiesQuery = { __typename?: 'Query', options?: { __typename?: 'ProjectDisplayProperty', displayFeatures?: Array<{ __typename?: 'AnnotationDisplayProperty', type?: FeatureDisplayType | null, filterOperator?: FilterOperator | null, featureType: { __typename?: 'FeatureType', referenceId: string, title: string, description: string }, modality?: Array<{ __typename?: 'Modality', name?: string | null }> | null } | { __typename?: 'ImageDisplayProperty', type?: FeatureDisplayType | null, filterOperator?: FilterOperator | null, featureType: { __typename?: 'FeatureType', referenceId: string, title: string, description: string }, modality?: Array<{ __typename?: 'Modality', name?: string | null }> | null } | { __typename?: 'MeasurementDisplayProperty', type?: FeatureDisplayType | null, filterOperator?: FilterOperator | null, measurementStats?: { __typename?: 'MeasurementStats', min?: number | null, max?: number | null, avg?: number | null, std?: number | null } | null, featureType: { __typename?: 'FeatureType', referenceId: string, title: string, description: string }, modality?: Array<{ __typename?: 'Modality', name?: string | null }> | null }> | null } | { __typename?: 'SpecimenTypeDisplayProperty' } | null, idOption?: Array<{ __typename?: 'AIO_Specimen', cRID: { __typename?: 'CRID', registry: { __typename?: 'CRIDRegistry', referenceId: string, description: string } } } | null> | null };

export type DisplayPropertiesQueryVariables = Exact<{
  typeReferenceId: Scalars['String'];
}>;


export type DisplayPropertiesQuery = { __typename?: 'Query', getDisplayProperty?: { __typename?: 'ProjectDisplayProperty', displayFeatures?: Array<{ __typename?: 'AnnotationDisplayProperty', type?: FeatureDisplayType | null, featureType: { __typename?: 'FeatureType', referenceId: string } } | { __typename?: 'ImageDisplayProperty', type?: FeatureDisplayType | null, dimensions?: { __typename?: 'ImageDimensions', height: number, width: number } | null, featureType: { __typename?: 'FeatureType', referenceId: string } } | { __typename?: 'MeasurementDisplayProperty', measurementType?: MeasurementType | null, unit?: string | null, type?: FeatureDisplayType | null, featureType: { __typename?: 'FeatureType', referenceId: string } }> | null } | { __typename?: 'SpecimenTypeDisplayProperty' } | null };

export const StringDisplayFragmentDoc = gql`
    fragment StringDisplay on StringDisplayProperty {
  value
  metadata {
    shortName
    longName
    description
  }
}
    `;
export const StringArrayDisplayFragmentDoc = gql`
    fragment StringArrayDisplay on StringArrayDisplayProperty {
  value
  metadata {
    shortName
    longName
    description
  }
}
    `;
export const AzimuthExplorerDocument = gql`
    query azimuthExplorer($taxonomyId: String!) {
  azimuthText: getCellTypesTaxonomyInfo(taxonomyId: $taxonomyId) {
    id: accessionId
    azimuthText
    azimuthLink
    azimuthHeader
  }
}
    `;

/**
 * __useAzimuthExplorerQuery__
 *
 * To run a query within a React component, call `useAzimuthExplorerQuery` and pass it any options that fit your needs.
 * When your component renders, `useAzimuthExplorerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAzimuthExplorerQuery({
 *   variables: {
 *      taxonomyId: // value for 'taxonomyId'
 *   },
 * });
 */
export function useAzimuthExplorerQuery(baseOptions: Apollo.QueryHookOptions<AzimuthExplorerQuery, AzimuthExplorerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AzimuthExplorerQuery, AzimuthExplorerQueryVariables>(AzimuthExplorerDocument, options);
      }
export function useAzimuthExplorerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AzimuthExplorerQuery, AzimuthExplorerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AzimuthExplorerQuery, AzimuthExplorerQueryVariables>(AzimuthExplorerDocument, options);
        }
export type AzimuthExplorerQueryHookResult = ReturnType<typeof useAzimuthExplorerQuery>;
export type AzimuthExplorerLazyQueryHookResult = ReturnType<typeof useAzimuthExplorerLazyQuery>;
export type AzimuthExplorerQueryResult = Apollo.QueryResult<AzimuthExplorerQuery, AzimuthExplorerQueryVariables>;
export const SearchCellTypesDocument = gql`
    query searchCellTypes($q: String!, $species: [String!]) {
  searchCellTypes(q: $q, species: $species)
}
    `;

/**
 * __useSearchCellTypesQuery__
 *
 * To run a query within a React component, call `useSearchCellTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchCellTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchCellTypesQuery({
 *   variables: {
 *      q: // value for 'q'
 *      species: // value for 'species'
 *   },
 * });
 */
export function useSearchCellTypesQuery(baseOptions: Apollo.QueryHookOptions<SearchCellTypesQuery, SearchCellTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchCellTypesQuery, SearchCellTypesQueryVariables>(SearchCellTypesDocument, options);
      }
export function useSearchCellTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchCellTypesQuery, SearchCellTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchCellTypesQuery, SearchCellTypesQueryVariables>(SearchCellTypesDocument, options);
        }
export type SearchCellTypesQueryHookResult = ReturnType<typeof useSearchCellTypesQuery>;
export type SearchCellTypesLazyQueryHookResult = ReturnType<typeof useSearchCellTypesLazyQuery>;
export type SearchCellTypesQueryResult = Apollo.QueryResult<SearchCellTypesQuery, SearchCellTypesQueryVariables>;
export const CellTypeCardDocument = gql`
    query cellTypeCard($taxId: String!, $cellTypeId: String!) {
  sidebar: getCellTypesTaxonomyInfo(taxonomyId: $taxId) {
    id: accessionId
    accessionId
    age
    anatomy
    anatomyImages {
      src
      alt
    }
    sex
    species
    nodes(accessionId: $cellTypeId) {
      accessionId
      aliases
      classLabel
      color
      fullOntologyName
      label
      symbol
      tags
      nfForestMarkers {
        text
        url
      }
      ontologyIri {
        text
        url
      }
    }
  }
}
    `;

/**
 * __useCellTypeCardQuery__
 *
 * To run a query within a React component, call `useCellTypeCardQuery` and pass it any options that fit your needs.
 * When your component renders, `useCellTypeCardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCellTypeCardQuery({
 *   variables: {
 *      taxId: // value for 'taxId'
 *      cellTypeId: // value for 'cellTypeId'
 *   },
 * });
 */
export function useCellTypeCardQuery(baseOptions: Apollo.QueryHookOptions<CellTypeCardQuery, CellTypeCardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CellTypeCardQuery, CellTypeCardQueryVariables>(CellTypeCardDocument, options);
      }
export function useCellTypeCardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CellTypeCardQuery, CellTypeCardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CellTypeCardQuery, CellTypeCardQueryVariables>(CellTypeCardDocument, options);
        }
export type CellTypeCardQueryHookResult = ReturnType<typeof useCellTypeCardQuery>;
export type CellTypeCardLazyQueryHookResult = ReturnType<typeof useCellTypeCardLazyQuery>;
export type CellTypeCardQueryResult = Apollo.QueryResult<CellTypeCardQuery, CellTypeCardQueryVariables>;
export const CellTypeCardSummaryDocument = gql`
    query cellTypeCardSummary($taxonomyId: String!, $accessionId: String) {
  nodeSummary: getCellTypesTaxonomyInfo(taxonomyId: $taxonomyId) {
    id: accessionId
    nodes(accessionId: $accessionId) {
      summary
      references
      label
    }
  }
}
    `;

/**
 * __useCellTypeCardSummaryQuery__
 *
 * To run a query within a React component, call `useCellTypeCardSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useCellTypeCardSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCellTypeCardSummaryQuery({
 *   variables: {
 *      taxonomyId: // value for 'taxonomyId'
 *      accessionId: // value for 'accessionId'
 *   },
 * });
 */
export function useCellTypeCardSummaryQuery(baseOptions: Apollo.QueryHookOptions<CellTypeCardSummaryQuery, CellTypeCardSummaryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CellTypeCardSummaryQuery, CellTypeCardSummaryQueryVariables>(CellTypeCardSummaryDocument, options);
      }
export function useCellTypeCardSummaryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CellTypeCardSummaryQuery, CellTypeCardSummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CellTypeCardSummaryQuery, CellTypeCardSummaryQueryVariables>(CellTypeCardSummaryDocument, options);
        }
export type CellTypeCardSummaryQueryHookResult = ReturnType<typeof useCellTypeCardSummaryQuery>;
export type CellTypeCardSummaryLazyQueryHookResult = ReturnType<typeof useCellTypeCardSummaryLazyQuery>;
export type CellTypeCardSummaryQueryResult = Apollo.QueryResult<CellTypeCardSummaryQuery, CellTypeCardSummaryQueryVariables>;
export const DataSectionQueryDocument = gql`
    query dataSectionQuery($taxonomyId: String!, $accessionId: String!) {
  section: getCellTypesTaxonomyInfo(taxonomyId: $taxonomyId) {
    id: accessionId
    nodes(accessionId: $accessionId) {
      dataSections(taxonomyId: $taxonomyId)
    }
  }
}
    `;

/**
 * __useDataSectionQueryQuery__
 *
 * To run a query within a React component, call `useDataSectionQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useDataSectionQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDataSectionQueryQuery({
 *   variables: {
 *      taxonomyId: // value for 'taxonomyId'
 *      accessionId: // value for 'accessionId'
 *   },
 * });
 */
export function useDataSectionQueryQuery(baseOptions: Apollo.QueryHookOptions<DataSectionQueryQuery, DataSectionQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DataSectionQueryQuery, DataSectionQueryQueryVariables>(DataSectionQueryDocument, options);
      }
export function useDataSectionQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DataSectionQueryQuery, DataSectionQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DataSectionQueryQuery, DataSectionQueryQueryVariables>(DataSectionQueryDocument, options);
        }
export type DataSectionQueryQueryHookResult = ReturnType<typeof useDataSectionQueryQuery>;
export type DataSectionQueryLazyQueryHookResult = ReturnType<typeof useDataSectionQueryLazyQuery>;
export type DataSectionQueryQueryResult = Apollo.QueryResult<DataSectionQueryQuery, DataSectionQueryQueryVariables>;
export const SidebarExplorerDocument = gql`
    query sidebarExplorer($taxonomyId: String!) {
  sidebar: getCellTypesTaxonomyInfo(taxonomyId: $taxonomyId) {
    id: accessionId
    accessionId
    age
    anatomy
    cellClassesCount
    cellSubclassesCount
    cellTypesCount
    header
    mainDescription
    attribution
    sex
    species
    anatomyImages {
      src
      alt
    }
    datasets(taxonomyId: $taxonomyId) {
      dataset
      cellsNuclei
      downloadLink
      exploreLink
    }
    crossSpeciesImages
  }
}
    `;

/**
 * __useSidebarExplorerQuery__
 *
 * To run a query within a React component, call `useSidebarExplorerQuery` and pass it any options that fit your needs.
 * When your component renders, `useSidebarExplorerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSidebarExplorerQuery({
 *   variables: {
 *      taxonomyId: // value for 'taxonomyId'
 *   },
 * });
 */
export function useSidebarExplorerQuery(baseOptions: Apollo.QueryHookOptions<SidebarExplorerQuery, SidebarExplorerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SidebarExplorerQuery, SidebarExplorerQueryVariables>(SidebarExplorerDocument, options);
      }
export function useSidebarExplorerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SidebarExplorerQuery, SidebarExplorerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SidebarExplorerQuery, SidebarExplorerQueryVariables>(SidebarExplorerDocument, options);
        }
export type SidebarExplorerQueryHookResult = ReturnType<typeof useSidebarExplorerQuery>;
export type SidebarExplorerLazyQueryHookResult = ReturnType<typeof useSidebarExplorerLazyQuery>;
export type SidebarExplorerQueryResult = Apollo.QueryResult<SidebarExplorerQuery, SidebarExplorerQueryVariables>;
export const ListCellTypeTaxonomiesDocument = gql`
    query listCellTypeTaxonomies {
  availableTaxonomies: getAvailableTaxonomies {
    species
    taxonomyId
  }
}
    `;

/**
 * __useListCellTypeTaxonomiesQuery__
 *
 * To run a query within a React component, call `useListCellTypeTaxonomiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListCellTypeTaxonomiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListCellTypeTaxonomiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useListCellTypeTaxonomiesQuery(baseOptions?: Apollo.QueryHookOptions<ListCellTypeTaxonomiesQuery, ListCellTypeTaxonomiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListCellTypeTaxonomiesQuery, ListCellTypeTaxonomiesQueryVariables>(ListCellTypeTaxonomiesDocument, options);
      }
export function useListCellTypeTaxonomiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListCellTypeTaxonomiesQuery, ListCellTypeTaxonomiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListCellTypeTaxonomiesQuery, ListCellTypeTaxonomiesQueryVariables>(ListCellTypeTaxonomiesDocument, options);
        }
export type ListCellTypeTaxonomiesQueryHookResult = ReturnType<typeof useListCellTypeTaxonomiesQuery>;
export type ListCellTypeTaxonomiesLazyQueryHookResult = ReturnType<typeof useListCellTypeTaxonomiesLazyQuery>;
export type ListCellTypeTaxonomiesQueryResult = Apollo.QueryResult<ListCellTypeTaxonomiesQuery, ListCellTypeTaxonomiesQueryVariables>;
export const SunburstExplorerDocument = gql`
    query sunburstExplorer($taxonomyId: String!) {
  sunburstHierarchy: getCellTypesTaxonomyInfo(taxonomyId: $taxonomyId) {
    id: accessionId
    accessionId
    species
    nodes {
      id
      parentId
      accessionId
      label
      color
      rank
    }
  }
}
    `;

/**
 * __useSunburstExplorerQuery__
 *
 * To run a query within a React component, call `useSunburstExplorerQuery` and pass it any options that fit your needs.
 * When your component renders, `useSunburstExplorerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSunburstExplorerQuery({
 *   variables: {
 *      taxonomyId: // value for 'taxonomyId'
 *   },
 * });
 */
export function useSunburstExplorerQuery(baseOptions: Apollo.QueryHookOptions<SunburstExplorerQuery, SunburstExplorerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SunburstExplorerQuery, SunburstExplorerQueryVariables>(SunburstExplorerDocument, options);
      }
export function useSunburstExplorerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SunburstExplorerQuery, SunburstExplorerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SunburstExplorerQuery, SunburstExplorerQueryVariables>(SunburstExplorerDocument, options);
        }
export type SunburstExplorerQueryHookResult = ReturnType<typeof useSunburstExplorerQuery>;
export type SunburstExplorerLazyQueryHookResult = ReturnType<typeof useSunburstExplorerLazyQuery>;
export type SunburstExplorerQueryResult = Apollo.QueryResult<SunburstExplorerQuery, SunburstExplorerQueryVariables>;
export const GeneSearchQueryDocument = gql`
    query geneSearchQuery($projectReferenceId: String!, $text: String, $sort: SortOrder, $limit: Int, $exact: Boolean) {
  getProjectCVImageProperties(projectReferenceId: $projectReferenceId) {
    cellType
    gene(text: $text, sort: $sort, limit: $limit, exact: $exact)
    metaData
    comparisonType
  }
}
    `;

/**
 * __useGeneSearchQueryQuery__
 *
 * To run a query within a React component, call `useGeneSearchQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGeneSearchQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGeneSearchQueryQuery({
 *   variables: {
 *      projectReferenceId: // value for 'projectReferenceId'
 *      text: // value for 'text'
 *      sort: // value for 'sort'
 *      limit: // value for 'limit'
 *      exact: // value for 'exact'
 *   },
 * });
 */
export function useGeneSearchQueryQuery(baseOptions: Apollo.QueryHookOptions<GeneSearchQueryQuery, GeneSearchQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GeneSearchQueryQuery, GeneSearchQueryQueryVariables>(GeneSearchQueryDocument, options);
      }
export function useGeneSearchQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GeneSearchQueryQuery, GeneSearchQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GeneSearchQueryQuery, GeneSearchQueryQueryVariables>(GeneSearchQueryDocument, options);
        }
export type GeneSearchQueryQueryHookResult = ReturnType<typeof useGeneSearchQueryQuery>;
export type GeneSearchQueryLazyQueryHookResult = ReturnType<typeof useGeneSearchQueryLazyQuery>;
export type GeneSearchQueryQueryResult = Apollo.QueryResult<GeneSearchQueryQuery, GeneSearchQueryQueryVariables>;
export const ImageSearchQueryDocument = gql`
    query imageSearchQuery($projectReferenceId: String!, $cellType: String!, $gene: String!, $metaData: String!, $comparisonType: String!) {
  getProjectCVImageSet(
    input: {projectReferenceId: $projectReferenceId, cellType: $cellType, gene: $gene, metaData: $metaData, comparisonType: $comparisonType}
  ) {
    featureType {
      referenceId
      title
    }
    url
  }
}
    `;

/**
 * __useImageSearchQueryQuery__
 *
 * To run a query within a React component, call `useImageSearchQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useImageSearchQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useImageSearchQueryQuery({
 *   variables: {
 *      projectReferenceId: // value for 'projectReferenceId'
 *      cellType: // value for 'cellType'
 *      gene: // value for 'gene'
 *      metaData: // value for 'metaData'
 *      comparisonType: // value for 'comparisonType'
 *   },
 * });
 */
export function useImageSearchQueryQuery(baseOptions: Apollo.QueryHookOptions<ImageSearchQueryQuery, ImageSearchQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ImageSearchQueryQuery, ImageSearchQueryQueryVariables>(ImageSearchQueryDocument, options);
      }
export function useImageSearchQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ImageSearchQueryQuery, ImageSearchQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ImageSearchQueryQuery, ImageSearchQueryQueryVariables>(ImageSearchQueryDocument, options);
        }
export type ImageSearchQueryQueryHookResult = ReturnType<typeof useImageSearchQueryQuery>;
export type ImageSearchQueryLazyQueryHookResult = ReturnType<typeof useImageSearchQueryLazyQuery>;
export type ImageSearchQueryQueryResult = Apollo.QueryResult<ImageSearchQueryQuery, ImageSearchQueryQueryVariables>;
export const DonorProfileIdQueryDocument = gql`
    query donorProfileIdQuery($donorReferenceId: String!, $donorIdFeatureType: [String]) {
  aio_specimen(
    filter: [{field: "referenceId", operator: EQ, value: $donorReferenceId}]
  ) {
    annotations(featureTypes: $donorIdFeatureType) {
      featureType {
        title
      }
      taxons {
        symbol
      }
    }
  }
}
    `;

/**
 * __useDonorProfileIdQueryQuery__
 *
 * To run a query within a React component, call `useDonorProfileIdQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useDonorProfileIdQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDonorProfileIdQueryQuery({
 *   variables: {
 *      donorReferenceId: // value for 'donorReferenceId'
 *      donorIdFeatureType: // value for 'donorIdFeatureType'
 *   },
 * });
 */
export function useDonorProfileIdQueryQuery(baseOptions: Apollo.QueryHookOptions<DonorProfileIdQueryQuery, DonorProfileIdQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DonorProfileIdQueryQuery, DonorProfileIdQueryQueryVariables>(DonorProfileIdQueryDocument, options);
      }
export function useDonorProfileIdQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DonorProfileIdQueryQuery, DonorProfileIdQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DonorProfileIdQueryQuery, DonorProfileIdQueryQueryVariables>(DonorProfileIdQueryDocument, options);
        }
export type DonorProfileIdQueryQueryHookResult = ReturnType<typeof useDonorProfileIdQueryQuery>;
export type DonorProfileIdQueryLazyQueryHookResult = ReturnType<typeof useDonorProfileIdQueryLazyQuery>;
export type DonorProfileIdQueryQueryResult = Apollo.QueryResult<DonorProfileIdQueryQuery, DonorProfileIdQueryQueryVariables>;
export const DonorProfileIdsDocument = gql`
    query donorProfileIds($donorReferenceId: String!, $donorIdFeatureType: [String]) {
  aio_specimen(
    filter: [{field: "projectReferenceIds", operator: CONTAINS, value: $donorReferenceId}]
  ) {
    annotations(featureTypes: $donorIdFeatureType) {
      referenceId
      featureType {
        title
      }
      taxons {
        symbol
      }
    }
  }
}
    `;

/**
 * __useDonorProfileIdsQuery__
 *
 * To run a query within a React component, call `useDonorProfileIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDonorProfileIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDonorProfileIdsQuery({
 *   variables: {
 *      donorReferenceId: // value for 'donorReferenceId'
 *      donorIdFeatureType: // value for 'donorIdFeatureType'
 *   },
 * });
 */
export function useDonorProfileIdsQuery(baseOptions: Apollo.QueryHookOptions<DonorProfileIdsQuery, DonorProfileIdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DonorProfileIdsQuery, DonorProfileIdsQueryVariables>(DonorProfileIdsDocument, options);
      }
export function useDonorProfileIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DonorProfileIdsQuery, DonorProfileIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DonorProfileIdsQuery, DonorProfileIdsQueryVariables>(DonorProfileIdsDocument, options);
        }
export type DonorProfileIdsQueryHookResult = ReturnType<typeof useDonorProfileIdsQuery>;
export type DonorProfileIdsLazyQueryHookResult = ReturnType<typeof useDonorProfileIdsLazyQuery>;
export type DonorProfileIdsQueryResult = Apollo.QueryResult<DonorProfileIdsQuery, DonorProfileIdsQueryVariables>;
export const DonorProfileImagePropertiesQueryDocument = gql`
    query donorProfileImagePropertiesQuery($donorReferenceId: String!) {
  getDonorPathologyImageProperties(donorReferenceId: $donorReferenceId) {
    donorReferenceId
    slides
  }
}
    `;

/**
 * __useDonorProfileImagePropertiesQueryQuery__
 *
 * To run a query within a React component, call `useDonorProfileImagePropertiesQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useDonorProfileImagePropertiesQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDonorProfileImagePropertiesQueryQuery({
 *   variables: {
 *      donorReferenceId: // value for 'donorReferenceId'
 *   },
 * });
 */
export function useDonorProfileImagePropertiesQueryQuery(baseOptions: Apollo.QueryHookOptions<DonorProfileImagePropertiesQueryQuery, DonorProfileImagePropertiesQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DonorProfileImagePropertiesQueryQuery, DonorProfileImagePropertiesQueryQueryVariables>(DonorProfileImagePropertiesQueryDocument, options);
      }
export function useDonorProfileImagePropertiesQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DonorProfileImagePropertiesQueryQuery, DonorProfileImagePropertiesQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DonorProfileImagePropertiesQueryQuery, DonorProfileImagePropertiesQueryQueryVariables>(DonorProfileImagePropertiesQueryDocument, options);
        }
export type DonorProfileImagePropertiesQueryQueryHookResult = ReturnType<typeof useDonorProfileImagePropertiesQueryQuery>;
export type DonorProfileImagePropertiesQueryLazyQueryHookResult = ReturnType<typeof useDonorProfileImagePropertiesQueryLazyQuery>;
export type DonorProfileImagePropertiesQueryQueryResult = Apollo.QueryResult<DonorProfileImagePropertiesQueryQuery, DonorProfileImagePropertiesQueryQueryVariables>;
export const DonorProfileImageSetQueryDocument = gql`
    query donorProfileImageSetQuery($donorReferenceId: String!, $slide: String!) {
  getDonorPathologyImageSet(donorReferenceId: $donorReferenceId, slide: $slide) {
    donorReferenceId
    description
    featureType {
      referenceId
      description
    }
    slide
    tileSource {
      url
      metadataUrl
      annotationSvg
    }
  }
}
    `;

/**
 * __useDonorProfileImageSetQueryQuery__
 *
 * To run a query within a React component, call `useDonorProfileImageSetQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useDonorProfileImageSetQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDonorProfileImageSetQueryQuery({
 *   variables: {
 *      donorReferenceId: // value for 'donorReferenceId'
 *      slide: // value for 'slide'
 *   },
 * });
 */
export function useDonorProfileImageSetQueryQuery(baseOptions: Apollo.QueryHookOptions<DonorProfileImageSetQueryQuery, DonorProfileImageSetQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DonorProfileImageSetQueryQuery, DonorProfileImageSetQueryQueryVariables>(DonorProfileImageSetQueryDocument, options);
      }
export function useDonorProfileImageSetQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DonorProfileImageSetQueryQuery, DonorProfileImageSetQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DonorProfileImageSetQueryQuery, DonorProfileImageSetQueryQueryVariables>(DonorProfileImageSetQueryDocument, options);
        }
export type DonorProfileImageSetQueryQueryHookResult = ReturnType<typeof useDonorProfileImageSetQueryQuery>;
export type DonorProfileImageSetQueryLazyQueryHookResult = ReturnType<typeof useDonorProfileImageSetQueryLazyQuery>;
export type DonorProfileImageSetQueryQueryResult = Apollo.QueryResult<DonorProfileImageSetQueryQuery, DonorProfileImageSetQueryQueryVariables>;
export const TotalProjectCountDocument = gql`
    query totalProjectCount($filter: [BffFilter]) {
  Projects: getItemCount(filter: $filter) {
    count
  }
}
    `;

/**
 * __useTotalProjectCountQuery__
 *
 * To run a query within a React component, call `useTotalProjectCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useTotalProjectCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTotalProjectCountQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useTotalProjectCountQuery(baseOptions?: Apollo.QueryHookOptions<TotalProjectCountQuery, TotalProjectCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TotalProjectCountQuery, TotalProjectCountQueryVariables>(TotalProjectCountDocument, options);
      }
export function useTotalProjectCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TotalProjectCountQuery, TotalProjectCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TotalProjectCountQuery, TotalProjectCountQueryVariables>(TotalProjectCountDocument, options);
        }
export type TotalProjectCountQueryHookResult = ReturnType<typeof useTotalProjectCountQuery>;
export type TotalProjectCountLazyQueryHookResult = ReturnType<typeof useTotalProjectCountLazyQuery>;
export type TotalProjectCountQueryResult = Apollo.QueryResult<TotalProjectCountQuery, TotalProjectCountQueryVariables>;
export const DataCollectionProjectListQueryDocument = gql`
    query dataCollectionProjectListQuery($filter: [BffFilter], $sort: [BffSort], $limit: Int, $offset: Int) {
  getDataCollectionProjectDisplay(
    filter: $filter
    sort: $sort
    limit: $limit
    offset: $offset
  ) {
    referenceId
    hasSpecimensPage
    description {
      ...StringDisplay
    }
    title {
      ...StringDisplay
    }
    dataCreator {
      ...StringArrayDisplay
    }
    modality {
      ...StringArrayDisplay
    }
    technique {
      ...StringArrayDisplay
    }
    specimenType {
      ...StringArrayDisplay
    }
    species {
      ...StringArrayDisplay
    }
    shortTitle {
      ...StringDisplay
    }
    subProgramShortTitle {
      ...StringDisplay
    }
    programShortTitle {
      ...StringDisplay
    }
    webResources: highlightedWebResources {
      value {
        url
        text
        iconKey
      }
      metadata {
        description
        shortName
        longName
      }
    }
  }
}
    ${StringDisplayFragmentDoc}
${StringArrayDisplayFragmentDoc}`;

/**
 * __useDataCollectionProjectListQueryQuery__
 *
 * To run a query within a React component, call `useDataCollectionProjectListQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useDataCollectionProjectListQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDataCollectionProjectListQueryQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      sort: // value for 'sort'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useDataCollectionProjectListQueryQuery(baseOptions?: Apollo.QueryHookOptions<DataCollectionProjectListQueryQuery, DataCollectionProjectListQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DataCollectionProjectListQueryQuery, DataCollectionProjectListQueryQueryVariables>(DataCollectionProjectListQueryDocument, options);
      }
export function useDataCollectionProjectListQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DataCollectionProjectListQueryQuery, DataCollectionProjectListQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DataCollectionProjectListQueryQuery, DataCollectionProjectListQueryQueryVariables>(DataCollectionProjectListQueryDocument, options);
        }
export type DataCollectionProjectListQueryQueryHookResult = ReturnType<typeof useDataCollectionProjectListQueryQuery>;
export type DataCollectionProjectListQueryLazyQueryHookResult = ReturnType<typeof useDataCollectionProjectListQueryLazyQuery>;
export type DataCollectionProjectListQueryQueryResult = Apollo.QueryResult<DataCollectionProjectListQueryQuery, DataCollectionProjectListQueryQueryVariables>;
export const FilterDisplayNamesQueryDocument = gql`
    query filterDisplayNamesQuery {
  getFilterField {
    alias
    displayName
  }
}
    `;

/**
 * __useFilterDisplayNamesQueryQuery__
 *
 * To run a query within a React component, call `useFilterDisplayNamesQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useFilterDisplayNamesQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFilterDisplayNamesQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useFilterDisplayNamesQueryQuery(baseOptions?: Apollo.QueryHookOptions<FilterDisplayNamesQueryQuery, FilterDisplayNamesQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FilterDisplayNamesQueryQuery, FilterDisplayNamesQueryQueryVariables>(FilterDisplayNamesQueryDocument, options);
      }
export function useFilterDisplayNamesQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FilterDisplayNamesQueryQuery, FilterDisplayNamesQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FilterDisplayNamesQueryQuery, FilterDisplayNamesQueryQueryVariables>(FilterDisplayNamesQueryDocument, options);
        }
export type FilterDisplayNamesQueryQueryHookResult = ReturnType<typeof useFilterDisplayNamesQueryQuery>;
export type FilterDisplayNamesQueryLazyQueryHookResult = ReturnType<typeof useFilterDisplayNamesQueryLazyQuery>;
export type FilterDisplayNamesQueryQueryResult = Apollo.QueryResult<FilterDisplayNamesQueryQuery, FilterDisplayNamesQueryQueryVariables>;
export const GetSpecimensIdsDocument = gql`
    query getSpecimensIds($sort: [Sort], $filter: [Filter], $limit: Int, $offset: Int) {
  specimensIds: aio_specimen(
    sort: $sort
    filter: $filter
    limit: $limit
    offset: $offset
  ) @connection(key: "SpecimenIds") {
    cRID {
      symbol
    }
  }
}
    `;

/**
 * __useGetSpecimensIdsQuery__
 *
 * To run a query within a React component, call `useGetSpecimensIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSpecimensIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSpecimensIdsQuery({
 *   variables: {
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetSpecimensIdsQuery(baseOptions?: Apollo.QueryHookOptions<GetSpecimensIdsQuery, GetSpecimensIdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSpecimensIdsQuery, GetSpecimensIdsQueryVariables>(GetSpecimensIdsDocument, options);
      }
export function useGetSpecimensIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSpecimensIdsQuery, GetSpecimensIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSpecimensIdsQuery, GetSpecimensIdsQueryVariables>(GetSpecimensIdsDocument, options);
        }
export type GetSpecimensIdsQueryHookResult = ReturnType<typeof useGetSpecimensIdsQuery>;
export type GetSpecimensIdsLazyQueryHookResult = ReturnType<typeof useGetSpecimensIdsLazyQuery>;
export type GetSpecimensIdsQueryResult = Apollo.QueryResult<GetSpecimensIdsQuery, GetSpecimensIdsQueryVariables>;
export const GetSpecimenImagesDocument = gql`
    query getSpecimenImages($sort: [Sort], $filter: [Filter], $limit: Int, $offset: Int, $featureTypes: [String], $imageRefIds: [String]) {
  specimens: aio_specimen(
    sort: $sort
    filter: $filter
    limit: $limit
    offset: $offset
  ) @connection(key: "SpecimenImages", filter: $filter, sort: $sort) {
    referenceId
    cRID {
      symbol
      registry {
        referenceId
        description
      }
    }
    annotations(featureTypes: $featureTypes) @connection(key: "SpecimenImageAnnotations", filter: ["featureTypes"]) {
      referenceId
      featureType {
        referenceId
        title
      }
      taxons {
        symbol
      }
    }
    measurements(featureTypes: $featureTypes) @connection(key: "SpecimenImageAnnotations") {
      value
      featureType {
        referenceId
        title
        description
      }
      measurementType
    }
    images(featureTypes: $imageRefIds) @connection(key: "SpecimenImageAnnotations", filter: ["featureTypes"]) {
      referenceId
      featureType {
        referenceId
        title
      }
      url
      annotated
      height
      width
    }
  }
}
    `;

/**
 * __useGetSpecimenImagesQuery__
 *
 * To run a query within a React component, call `useGetSpecimenImagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSpecimenImagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSpecimenImagesQuery({
 *   variables: {
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      featureTypes: // value for 'featureTypes'
 *      imageRefIds: // value for 'imageRefIds'
 *   },
 * });
 */
export function useGetSpecimenImagesQuery(baseOptions?: Apollo.QueryHookOptions<GetSpecimenImagesQuery, GetSpecimenImagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSpecimenImagesQuery, GetSpecimenImagesQueryVariables>(GetSpecimenImagesDocument, options);
      }
export function useGetSpecimenImagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSpecimenImagesQuery, GetSpecimenImagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSpecimenImagesQuery, GetSpecimenImagesQueryVariables>(GetSpecimenImagesDocument, options);
        }
export type GetSpecimenImagesQueryHookResult = ReturnType<typeof useGetSpecimenImagesQuery>;
export type GetSpecimenImagesLazyQueryHookResult = ReturnType<typeof useGetSpecimenImagesLazyQuery>;
export type GetSpecimenImagesQueryResult = Apollo.QueryResult<GetSpecimenImagesQuery, GetSpecimenImagesQueryVariables>;
export const SpecimenCountDocument = gql`
    query specimenCount($filter: [Filter]) {
  totalCount: aio_specimenCounts(filter: $filter) {
    count
  }
}
    `;

/**
 * __useSpecimenCountQuery__
 *
 * To run a query within a React component, call `useSpecimenCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpecimenCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpecimenCountQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useSpecimenCountQuery(baseOptions?: Apollo.QueryHookOptions<SpecimenCountQuery, SpecimenCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SpecimenCountQuery, SpecimenCountQueryVariables>(SpecimenCountDocument, options);
      }
export function useSpecimenCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SpecimenCountQuery, SpecimenCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SpecimenCountQuery, SpecimenCountQueryVariables>(SpecimenCountDocument, options);
        }
export type SpecimenCountQueryHookResult = ReturnType<typeof useSpecimenCountQuery>;
export type SpecimenCountLazyQueryHookResult = ReturnType<typeof useSpecimenCountLazyQuery>;
export type SpecimenCountQueryResult = Apollo.QueryResult<SpecimenCountQuery, SpecimenCountQueryVariables>;
export const PropertiesDocument = gql`
    query Properties($filter: [Filter!]!, $displayPropertyFilter: DisplayPropertyFilter!) {
  options: getDisplayProperty(displayPropertyFilter: $displayPropertyFilter) {
    ... on ProjectDisplayProperty {
      displayFeatures {
        featureType {
          referenceId
          title
          description
        }
        modality {
          name
        }
        type
        filterOperator
        ... on MeasurementDisplayProperty {
          measurementStats {
            min
            max
            avg
            std
          }
        }
      }
    }
  }
  idOption: aio_specimen(limit: 1, filter: $filter) @connection(key: "SpecimenCRIDs") {
    cRID {
      registry {
        referenceId
        description
      }
    }
  }
}
    `;

/**
 * __usePropertiesQuery__
 *
 * To run a query within a React component, call `usePropertiesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePropertiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePropertiesQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      displayPropertyFilter: // value for 'displayPropertyFilter'
 *   },
 * });
 */
export function usePropertiesQuery(baseOptions: Apollo.QueryHookOptions<PropertiesQuery, PropertiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PropertiesQuery, PropertiesQueryVariables>(PropertiesDocument, options);
      }
export function usePropertiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PropertiesQuery, PropertiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PropertiesQuery, PropertiesQueryVariables>(PropertiesDocument, options);
        }
export type PropertiesQueryHookResult = ReturnType<typeof usePropertiesQuery>;
export type PropertiesLazyQueryHookResult = ReturnType<typeof usePropertiesLazyQuery>;
export type PropertiesQueryResult = Apollo.QueryResult<PropertiesQuery, PropertiesQueryVariables>;
export const DisplayPropertiesDocument = gql`
    query displayProperties($typeReferenceId: String!) {
  getDisplayProperty(
    displayPropertyFilter: {typeReferenceId: $typeReferenceId, type: PROJECT}
  ) {
    ... on ProjectDisplayProperty {
      displayFeatures {
        featureType {
          referenceId
        }
        type
        ... on ImageDisplayProperty {
          dimensions {
            height
            width
          }
        }
        ... on MeasurementDisplayProperty {
          measurementType
          unit
        }
      }
    }
  }
}
    `;

/**
 * __useDisplayPropertiesQuery__
 *
 * To run a query within a React component, call `useDisplayPropertiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useDisplayPropertiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDisplayPropertiesQuery({
 *   variables: {
 *      typeReferenceId: // value for 'typeReferenceId'
 *   },
 * });
 */
export function useDisplayPropertiesQuery(baseOptions: Apollo.QueryHookOptions<DisplayPropertiesQuery, DisplayPropertiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DisplayPropertiesQuery, DisplayPropertiesQueryVariables>(DisplayPropertiesDocument, options);
      }
export function useDisplayPropertiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DisplayPropertiesQuery, DisplayPropertiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DisplayPropertiesQuery, DisplayPropertiesQueryVariables>(DisplayPropertiesDocument, options);
        }
export type DisplayPropertiesQueryHookResult = ReturnType<typeof useDisplayPropertiesQuery>;
export type DisplayPropertiesLazyQueryHookResult = ReturnType<typeof useDisplayPropertiesLazyQuery>;
export type DisplayPropertiesQueryResult = Apollo.QueryResult<DisplayPropertiesQuery, DisplayPropertiesQueryVariables>;