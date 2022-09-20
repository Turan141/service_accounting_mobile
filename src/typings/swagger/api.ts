/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {TaskStatusesEnum} from "../../services/data";

export interface ApplicationOptionResult {
  applicationOptionName?: string;
  applicationOptionValue?: string;
  successful: SuccessfulEnum;
  error?: string;
  message?: string;
}

export enum SuccessfulEnum {
  Successful = 0,
  NotSuccessful = 1,
  NotStart = 2,
  Waiting = 4,
  Error = 8,
  Canseled = 16,
  ForgotPassword = 32,
}

export type Artifacts = Artifact[] & { CurrentItem?: Artifact; CurrentChanged?: EventHandler; TotalCount: number };

export type Artifact = Entity & {
  method: string;
  url: string;
  artefactMasterCode: string;
  fileName: string;
  referenceMasterCode?: string;
  nn: number;
  showInGrid: number;
  useInImport: number;
  params?: string;
  tag?: string;
  getUrl?: string;
  clearUrl?: string;
  enabledClear?: string;
};

export interface Entity {
  /** @format int32 */
  id: number;

  /** @format date-time */
  created: string;

  /** @format date-time */
  modified?: string;

  /** @format date-time */
  deleted?: string;
}

export type EventHandler = MulticastDelegate & object;

export type MulticastDelegate = Delegate & object;

export interface Delegate {
  target?: any;
  method: MethodInfo;
}

export type MethodInfo = MethodBase & { memberType: MemberTypes; returnParameter: ParameterInfo; returnType: string };

export enum MemberTypes {
  Constructor = 1,
  Event = 2,
  Field = 4,
  Method = 8,
  Property = 16,
  TypeInfo = 32,
  Custom = 64,
  NestedType = 128,
  All = 191,
}

export interface ParameterInfo {
  attributes: ParameterAttributes;
  member: MemberInfo;
  name?: string;
  parameterType: string;

  /** @format int32 */
  position: number;
  isIn: boolean;
  isLcid: boolean;
  isOptional: boolean;
  isOut: boolean;
  isRetval: boolean;
  defaultValue?: any;
  rawDefaultValue?: any;
  hasDefaultValue: boolean;
  customAttributes: CustomAttributeData[];

  /** @format int32 */
  metadataToken: number;
}

export enum ParameterAttributes {
  None = 0,
  In = 1,
  Out = 2,
  Lcid = 4,
  Retval = 8,
  Optional = 16,
  HasDefault = 4096,
  HasFieldMarshal = 8192,
  Reserved3 = 16384,
  Reserved4 = 32768,
  ReservedMask = 61440,
}

export interface MemberInfo {
  module: Module;
  customAttributes: CustomAttributeData[];
  isCollectible: boolean;

  /** @format int32 */
  metadataToken: number;
}

export interface Module {
  assembly: Assembly;
  fullyQualifiedName: string;
  name: string;

  /** @format int32 */
  mdStreamVersion: number;

  /** @format guid */
  moduleVersionId: string;
  scopeName: string;
  moduleHandle: ModuleHandle;
  customAttributes: CustomAttributeData[];

  /** @format int32 */
  metadataToken: number;
}

export interface Assembly {
  definedTypes: string[];
  exportedTypes: string[];
  codeBase?: string;
  entryPoint?: MethodInfo;
  fullName?: string;
  imageRuntimeVersion: string;
  isDynamic: boolean;
  location: string;
  reflectionOnly: boolean;
  isCollectible: boolean;
  isFullyTrusted: boolean;
  customAttributes: CustomAttributeData[];
  escapedCodeBase: string;
  manifestModule: Module;
  modules: Module[];
  globalAssemblyCache: boolean;

  /** @format int64 */
  hostContext: number;
  securityRuleSet: SecurityRuleSet;
}

export interface CustomAttributeData {
  attributeType: string;
  constructor: ConstructorInfo;
  constructorArguments: CustomAttributeTypedArgument[];
  namedArguments: CustomAttributeNamedArgument[];
}

export type ConstructorInfo = MethodBase & { memberType: MemberTypes };

export type MethodBase = MemberInfo & {
  methodImplementationFlags: MethodImplAttributes;
  callingConvention: CallingConventions;
  isAbstract: boolean;
  isConstructor: boolean;
  isFinal: boolean;
  isHideBySig: boolean;
  isSpecialName: boolean;
  isStatic: boolean;
  isVirtual: boolean;
  isAssembly: boolean;
  isFamily: boolean;
  isFamilyAndAssembly: boolean;
  isFamilyOrAssembly: boolean;
  isPrivate: boolean;
  isPublic: boolean;
  isConstructedGenericMethod: boolean;
  isGenericMethod: boolean;
  isGenericMethodDefinition: boolean;
  containsGenericParameters: boolean;
  isSecurityCritical: boolean;
  isSecuritySafeCritical: boolean;
  isSecurityTransparent: boolean;
};

export enum MethodImplAttributes {
  IL = 0,
  Managed = 0,
  Native = 1,
  OPTIL = 2,
  Runtime = 3,
  CodeTypeMask = 3,
  Unmanaged = 4,
  ManagedMask = 4,
  NoInlining = 8,
  ForwardRef = 16,
  Synchronized = 32,
  NoOptimization = 64,
  PreserveSig = 128,
  AggressiveInlining = 256,
  AggressiveOptimization = 512,
  InternalCall = 4096,
  MaxMethodImplVal = 65535,
}

export enum CallingConventions {
  Standard = 1,
  VarArgs = 2,
  Any = 3,
  HasThis = 32,
  ExplicitThis = 64,
}

export interface CustomAttributeTypedArgument {
  argumentType: string;
  value?: any;
}

export interface CustomAttributeNamedArgument {
  memberInfo: MemberInfo;
  typedValue: CustomAttributeTypedArgument;
  memberName: string;
  isField: boolean;
}

export enum SecurityRuleSet {
  None = 0,
  Level1 = 1,
  Level2 = 2,
}

export interface ModuleHandle {
  /** @format int32 */
  mdStreamVersion: number;
}

export interface ArtifactResult {
  artifactMasterCode?: string;
  successful: SuccessfulEnum;
  error?: string;
  message?: string;
  errorCode: CommandErrorCodeEnum;
  validateDataErrorCode: CommandErrorCodeEnum;
}

export enum CommandErrorCodeEnum {
  None = 0,
  Unknown = 900,
  CommandResultIsNull = 904,
  CommandResultWithException = 905,
  CommandResultCansel = 907,
  DataServerAddressUrlIsNull = 914,
  ExceptionClear = 915,
  FileNameIsNull = 924,
  ExceptionImport = 925,
  PathIsNull = 944,
  SessionCodeIsNull = 954,
}

export interface ResponseSuccessOfDistributorResults {
  result?: DistributorResults;
}

export interface DistributorResults {
  items?: Distributors;

  /** @format int64 */
  total: number;
}

export type Distributors = Distributor[] & { TotalCount: number };

export type Distributor = CommonEntity & {
  distributorMasterCode: string;
  dateVersion: string;
  tag?: string;
  version?: string;
  nn: number;
  param?: string;
  showInList: number;
};

export type CommonEntity = Entity & { name?: string; description?: string };

export interface ResponseSuccessOfDistributorResult {
  result?: DistributorResult;
}

export interface DistributorResult {
  distributorMasterCode?: string;
  successful: SuccessfulEnum;
  error?: string;
  message?: string;
  errorCode: CommandErrorCodeEnum;
  validateDataErrorCode: CommandErrorCodeEnum;
}

export interface ResponseSuccessOfDocumentView {
  result?: DocumentView;
}

export interface DocumentView {
  /** @format int32 */
  id: number;
  number?: string;
  status?: TaskStatusesEnum;
  createdBy?: string;
  lastModifiedBy?: string;

  /** @format int64 */
  createdAt: number;

  /** @format int64 */
  lastModifiedAt: number;
  properties?: Record<string, any>;
  items?: DocumentItemView[];
  lockState?: string;
  readOnly: boolean;
}

export interface DocumentItemView {
  /** @format int32 */
  id: number;
  title?: string;
  type?: string;

  /** @format int32 */
  orderingPresentation: number;
  status?: string;
  masterCode?: string;
  name?: string;
  createdBy?: string;
  createdByFullName?: string;
  lastModifiedBy?: string;
  lastModifiedByFullName?: string;

  /** @format int64 */
  createdAt: number;

  /** @format int64 */
  lastMidifiedAt: number;
  properties?: Record<string, any>;
  childs?: DocumentItemView[];
  additionalInfo?: string;
  reference?: ReferenceView;
}

export interface ReferenceView {
  name?: string;
  description?: string;
  masterCode?: string;
  parentMasterCode?: string;
  properties?: Record<string, string>;

  /** @format int32 */
  orderPresentation?: number;
}

export interface ResponseSuccessOfResponsePaginationOfDocumentView {
  result?: ResponsePaginationOfDocumentView;
}

export interface ResponsePaginationOfDocumentView {
  items?: DocumentView[];

  /** @format int32 */
  count: number;

  /** @format int32 */
  total: number;
}

export type RequestPaginationOfDocumentFilter = RequestPagination & { filter?: DocumentFilter };

export interface DocumentFilter {
  number?: string;
  statuses?: string[];
  valuesFilter?: Record<string, string>;
  valuesRangeFilter?: PropertyValueRangeFilter[];
}

export interface PropertyValueRangeFilter {
  name: string;
  from: string;
  to: string;
}

export interface RequestPagination {
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  skip: number;

  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  take: number;
}

export interface DocumentDto {
  status?: string;
  properties?: Record<string, string>;
  items?: DocumentItemDto[];
}

export interface DocumentItemDto {
  /** @pattern [A-Za-z]+ */
  type: string;

  /** @pattern [A-Za-z]+ */
  status?: string;
  referenceMasterCode?: string;
  additionalInfo?: string;
  properties?: Record<string, string>;
  childs?: DocumentItemDto[];
}

export interface DocumentItemUpdateDto {
  referenceMasterCode?: string;
  additionalInfo?: string;
  properties?: Record<string, string>;
}

export interface ResponseSuccessOfICollectionOfActionView {
  result?: ActionView[];
}

export interface ActionView {
  name?: string;
  type?: string;
  message?: string;

  /** @format int32 */
  documentId: number;

  /** @format int32 */
  documentItemid?: number;

  /** @format int64 */
  modified: number;
  created?: string;
  deleted?: string;
  description?: string;
  user?: UserNames;
}

export interface UserNames {
  fullName?: string;
  firstName?: string;
  secondName?: string;
  staffId?: string;
}

export interface ResponseSuccessOfRequestPaginationOfDocumentTypeView {
  result?: RequestPaginationOfDocumentTypeView;
}

export type RequestPaginationOfDocumentTypeView = RequestPagination & { filter?: DocumentTypeView };

export interface DocumentTypeView {
  /** @format int32 */
  id: number;
  name?: string;
  description?: string;
  properties?: PropertyView[];
  statuses?: DocumentTypeStatusView[];
  items?: DocumentItemTypeView[];
}

export interface PropertyView {
  name?: string;
  description?: string;

  /** @format int32 */
  valueType: number;
  isRequired: boolean;
  enumValues?: number[];
  refMasterCode?: string;
}

export interface DocumentTypeStatusView {
  name?: string;
  description?: string;
}

export interface DocumentItemTypeView {
  name?: string;
  description?: string;
  refMasterCode?: string;
  isRequiredItemReference: boolean;
  properties?: PropertyView[];
  statuses?: DocumentItemTypeStatusView[];
}

export interface DocumentItemTypeStatusView {
  name?: string;
  description?: string;
}

export interface ResponseSuccessOfResponsePaginationOfAttachmentView {
  result?: ResponsePaginationOfAttachmentView;
}

export interface ResponsePaginationOfAttachmentView {
  items?: AttachmentView[];

  /** @format int32 */
  count: number;

  /** @format int32 */
  total: number;
}

export interface AttachmentView {
  name?: string;
  mimeType?: string;
  url?: string;

  /** @format int64 */
  created: number;
}

export interface ProblemDetails {
  type?: string;
  title?: string;

  /** @format int32 */
  status?: number;
  detail?: string;
  instance?: string;
  extensions?: Record<string, any>;
}

export type ArtifactResults = ArtifactResult[] & {
  CurrentItem?: ArtifactResult;
  CurrentChanged?: EventHandler;
  TotalCount: number;
};

export interface ResponseSuccessOfFlightResults {
  result?: FlightResults;
}

export interface FlightResults {
  items?: Flights;

  /** @format int64 */
  total: number;
}

export type Flights = Flight[] & { TotalCount: number };

export type Flight = CommonEntity & {
  flightMasterCode: string;
  flightCode?: string;
  flightNumber?: string;
  flightDate?: string;
  direction?: string;
  departureAirport?: string;
  arrivalAirport?: string;
  company?: string;
  airlineIATA?: string;
  airplane?: string;
  status?: string;
  handlingTypeID?: string;
  flightCategory?: string;
  st?: string;
  et?: string;
  at?: string;
  flsSt?: string;
  flsEt?: string;
  flsAt?: string;
  stDateTime?: string;
  etDateTime?: string;
  atDateTime?: string;
  flsStDateTime?: string;
  flsEtDateTime?: string;
  flsAtDateTime?: string;
  flightType?: string;
  post?: string;
  terminal?: string;
  exitgate?: string;
  fullNumberOfFlight?: string;
  delayCode?: string;
};

export interface FlightResult {
  flightMasterCode?: string;
  successful: SuccessfulEnum;
  error?: string;
  message?: string;
  errorCode: CommandErrorCodeEnum;
  validateDataErrorCode: CommandErrorCodeEnum;
}

export type FlightFilterData = CommonFilterData & {
  skip?: string;
  take?: string;
  name?: string;
  description?: string;
  flightMasterCode?: string;
  flightCode?: string;
  flightNumber?: string;
  flightDate?: string;
  direction?: string;
  departureAirport?: string;
  arrivalAirport?: string;
  company?: string;
  airlineIATA?: string;
  airplane?: string;
  status?: string;
  handlingTypeID?: string;
  flightCategory?: string;
  st?: string;
  et?: string;
  at?: string;
  flsSt?: string;
  flsEt?: string;
  flsAt?: string;
  flightType?: string;
  post?: string;
  terminal?: string;
  exitgate?: string;
  fullNumberOfFlight?: string;
  delayCode?: string;
  fromStDateTime?: string;
  toStDateTime?: string;
};

export interface CommonFilterData {
  sortDirection: EnSortDirection;
  sortField?: string;
}

export enum EnSortDirection {
  DESC = 0,
  ASC = 1,
}

export type Employees = Employee[] & { CurrentItem?: Employee; CurrentChanged?: EventHandler; TotalCount: number };

export type Employee = Entity & {
  name?: string;
  surname?: string;
  patronymic?: string;
  staffId?: string;
  emplId?: string;
};

export type References = Reference[] & { CurrentItem?: Reference; CurrentChanged?: EventHandler; TotalCount: number };

export type Reference = CommonEntity & {
  parentId?: number;
  parent?: Reference;
  childs?: Reference[];
  masterCode?: string;
  properties?: ReferenceProperty[];
  values?: ReferencePropertyValue[];
  refValues?: ReferencePropertyValue[];
  orderPresentation?: number;
  documentItemTypePropertyValues?: DocumentItemTypePropertyValue[];
};

export type ReferenceProperty = Property & {
  referenceId: number;
  reference?: Reference;
  values?: ReferencePropertyValue[];
  refMasterCode?: string;
};

export type ReferencePropertyValue = PropertyValue & {
  referenceId: number;
  reference?: Reference;
  referencePropertyId: number;
  referenceProperty?: ReferenceProperty;
  ref?: Reference;
  refId?: number;
};

export type PropertyValue = Entity & {
  value?: string;
  intValue?: number;
  doubleValue?: number;
  boolValue?: boolean;
  dateTimeValue?: string;
  enumValue?: number;
};

export type Property = CommonEntity & { valueType: PropertyValueType; isRequired: boolean; enumValues?: number[] };

export enum PropertyValueType {
  Integer = 0,
  Double = 1,
  Boolean = 2,
  String = 3,
  DateTime = 4,
  Enum = 5,
  Ref = 6,
  Employee = 7,
}

export type DocumentItemTypePropertyValue = PropertyValue & {
  documentItemId: number;
  documentItem?: DocumentItem;
  propertyId: number;
  property?: DocumentItemTypeProperty;
  ref?: Reference;
  refId?: number;
};

export type DocumentItem = Entity & {
  documentId: number;
  document?: Document;
  documentItemTypeId: number;
  documentItemType?: DocumentItemType;
  parentId?: number;
  parent?: DocumentItem;
  childs?: DocumentItem[];
  propertyValues?: DocumentItemTypePropertyValue[];
  statusId?: number;
  status?: DocumentItemStatus;
  createdByEmployeeId?: string;
  updateByEmployeeId?: string;
  deletedByEmployeeId?: string;
  actions?: DocumentAction[];
  referenceId?: number;
  reference?: Reference;
  additionalInfo?: string;
  attachments?: Attachment[];
};

export type Document = Entity & {
  number?: string;
  documentTypeId: number;
  documentType?: DocumentType;
  documentStatusId?: number;
  documentStatus?: DocumentStatus;
  propertiesValue?: DocumentTypePropertyValue[];
  createdByEmployee?: string;
  updateByEmployee?: string;
  deletedByEmployee?: string;
  items?: DocumentItem[];
  actions?: DocumentAction[];
  attachments?: Attachment[];
  locks?: LockDocument[];
};

export type DocumentType = CommonEntity & {
  documents?: Document[];
  statuses?: DocumentStatus[];
  properties?: DocumentTypeProperty[];
  values?: DocumentTypePropertyValue[];
  documentItems?: DocumentItem[];
  documentItemTypes?: DocumentItemType[];
  documentTypePrefix?: string;
  documentTypePostfix?: string;
  documentIndex: number;
};

export type DocumentStatus = CommonEntity & {
  documentTypeId: number;
  documentType?: DocumentType;
  documents?: Document[];
};

export type DocumentTypeProperty = Property & {
  documentTypeId: number;
  documentType?: DocumentType;
  refMasterCode?: string;
  values?: DocumentTypePropertyValue[];
};

export type DocumentTypePropertyValue = PropertyValue & {
  documentTypeId: number;
  documentType?: DocumentType;
  documentTypePropertyId: number;
  documentTypeProperty?: DocumentTypeProperty;
  documentId: number;
  document?: Document;
  refId?: number;
  ref?: Reference;
};

export type DocumentItemType = CommonEntity & {
  documentTypeId: number;
  documentType?: DocumentType;
  documentItems?: DocumentItem[];
  properties?: DocumentItemTypeProperty[];
  documentItemStatuses?: DocumentItemStatus[];
  referenceMasterCode?: string;
  isRquiredItemReference: boolean;
};

export type DocumentItemTypeProperty = Property & {
  documentItemTypeId: number;
  documentItemType?: DocumentItemType;
  refMasterCode?: string;
  values?: DocumentItemTypePropertyValue[];
};

export type DocumentItemStatus = CommonEntity & {
  documentItemTypeId: number;
  documentItemType?: DocumentItemType;
  documentItems?: DocumentItem[];
};

export type DocumentAction = CommonEntity & {
  documentId: number;
  document?: Document;
  documentItemId?: number;
  documentItem?: DocumentItem;
  message?: string;
  type?: string;
};

export type Attachment = CommonEntity & {
  mimeType?: string;
  guid: string;
  documentId: number;
  document?: Document;
  documentItemId?: number;
  documentItem?: DocumentItem;
};

export type LockDocument = Entity & {
  documentId: number;
  document?: Document;
  userId?: string;
  userFullName?: string;
  isUnlocked: boolean;
};

export interface ResponsePaginationOfReferenceView {
  items?: ReferenceView[];

  /** @format int32 */
  count: number;

  /** @format int32 */
  total: number;
}

export type DocumentTypes = DocumentType[] & {
  CurrentItem?: DocumentType;
  CurrentChanged?: EventHandler;
  TotalCount: number;
};

export interface PingResult {
  error?: string;
  message?: string;

  /** @format date-time */
  utc: string;
  successful: SuccessfulEnum;
}

export interface SooRealm {
  realm?: string;
  url?: string;
}

export interface ResponseSuccessOfResponseImport {
  result?: ResponseImport;
}

export interface ResponseImport {
  /** @format int32 */
  itemsTotal: number;

  /** @format int32 */
  itemsSuccess: number;

  /** @format int32 */
  itemsError: number;
  errors?: Record<string, string>;
}

export interface RequestImportOfEmployeeCreateDto {
  items: EmployeeCreateDto[];
}

export interface EmployeeCreateDto {
  name?: string;
  surname?: string;
  patronymic?: string;
  staffId: string;
  emplId?: string;
}

export interface RequestImportOfReferenceCreateDto {
  items: ReferenceCreateDto[];
}

export interface ReferenceCreateDto {
  name: string;
  description?: string;
  masterCode: string;
  parentMasterCode?: string;

  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  orderPresentation?: number;
}

export interface RequestImportOfReferencePropertyDto {
  items: ReferencePropertyDto[];
}

export interface ReferencePropertyDto {
  name: string;
  description?: string;
  valueType: PropertyValueType;
  isRequired: boolean;
  enumValues?: number[];
  refMasterCode?: string;
}

export interface RequestImportOfReferenceItemDto {
  items: ReferenceItemDto[];
}

export interface ReferenceItemDto {
  name: string;
  description?: string;
  masterCode: string;
  values: Record<string, string>;

  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  orderPresentation?: number;
}

export interface RequestImportOfDocumentTypeDto {
  items: DocumentTypeDto[];
}

export interface DocumentTypeDto {
  /** @pattern [A-Za-z]+ */
  name: string;
  description?: string;
  statuses?: DocumentStatusDto[];
  properties?: DocumentTypePropertyDto[];
  items?: DocumentItemTypeDto[];
}

export interface DocumentStatusDto {
  /** @pattern [A-Za-z]+ */
  name: string;
  description?: string;
}

export interface DocumentTypePropertyDto {
  /** @pattern [A-Za-z]+ */
  name: string;
  description?: string;
  valueType: PropertyValueType;
  enumValues?: number[];
  refMasterCode?: string;
  isRequired: boolean;
}

export interface DocumentItemTypeDto {
  /** @pattern [A-Za-z]+ */
  name: string;
  description?: string;
  refMasterCode?: string;
  isRequiredItemReference: boolean;
  properties?: DocumentItemTypePropertyDto[];
  statuses?: DocumentItemStatusDto[];
}

export interface DocumentItemTypePropertyDto {
  /** @pattern [A-Za-z]+ */
  name: string;
  description?: string;
  valueType: PropertyValueType;
  enumValues?: number[];
  refMasterCode?: string;
  isRequired: boolean;
}

export interface DocumentItemStatusDto {
  /** @pattern [A-Za-z]+ */
  name: string;
  description?: string;
}

export interface ResponseSuccessOfFlightResult {
  result?: FlightResult;
}

export interface ResponseSuccessOfLirResults {
  result?: LirResults;
}

export interface LirResults {
  items?: Lirs;

  /** @format int64 */
  total: number;
}

export type Lirs = Lir[] & { TotalCount: number };

export type Lir = CommonEntity & {
  lirMasterCode?: string;
  flightMasterCode?: string;
  flightCode: string;
  flightNumber?: string;
  flightDate?: string;
  header?: string;
  content?: string;
  tag?: string;
  from?: string;
};

export interface LirResult {
  lirMasterCode?: string;
  successful: SuccessfulEnum;
  error?: string;
  message?: string;
  errorCode: CommandErrorCodeEnum;
  validateDataErrorCode: CommandErrorCodeEnum;
}

export interface ResponseSuccessOfResponsePaginationOfReferenceView {
  result?: ResponsePaginationOfReferenceView;
}

export type RequestPaginationReference = RequestPagination & {
  filter?: ReferenceFilter;
  valuesFilter?: Record<string, string>;
  valuesRangeFilter?: PropertyValueRangeFilter[];
  propertiesSearch?: PropertiesSearch;
};

export interface ReferenceFilter {
  name?: string;
  itemMasterCode?: string;
}

export interface PropertiesSearch {
  properties: string[];
  value: string;
  fullMatch?: boolean;
}

export interface ResponseSuccessOfIEnumerableOfPropertyView {
  result?: PropertyView[];
}

export interface ResponseSuccessOfIEnumerableOfReferenceView {
  result?: ReferenceView[];
}

export interface ResponseSuccessOfEmployeeView {
  result?: EmployeeView;
}

export interface EmployeeView {
  name?: string;
  surname?: string;
  patronymic?: string;
  staffId?: string;
}

export interface ResponseSuccessOfResponsePaginationOfEmployeeView {
  result?: ResponsePaginationOfEmployeeView;
}

export interface ResponsePaginationOfEmployeeView {
  items?: EmployeeView[];

  /** @format int32 */
  count: number;

  /** @format int32 */
  total: number;
}

export type RequestPaginationOfEmployeeFilter = RequestPagination & { filter?: EmployeeFilter };

export interface EmployeeFilter {
  fullName?: string;
}
