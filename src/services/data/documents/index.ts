import { DocumentType } from '../../documents/DocumentsService';

export interface GetDocumentByIdProps {
  documentId: number;
  documentType: DocumentType;
}
