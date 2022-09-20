import { action, makeObservable, observable, runInAction, toJS } from 'mobx';
import RootStore from './RootStore';
import { DocumentItemDto, DocumentView, RequestPaginationOfDocumentFilter } from '../typings/swagger/api';
import documentsService, { DocumentServiceProps, FinishTenderProps } from '../services/documents/DocumentsService';
import { TaskStatusesEnum } from '../services/data';
import { DocumentItemNamesEnum, EditItemProps } from './data/documents';
import { TASKS_STACK } from '../navigation/stacks';
import { logToConsole } from '../utils/formatting';
import { TasksStackScreens } from '../navigation/enums';
import { useNavigation } from '@react-navigation/core';
import { navigate } from '../navigation/RootNavigation';

export class TenderStore {
  rootStore: RootStore = null;

  @observable
  loading: boolean = false;

  @observable
  tenders: DocumentView[] = [];

  @observable
  currentTender: DocumentView = null;

  @observable
  showResults: boolean = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @action
  setLoading = async (state: boolean) => {
    this.loading = state;
  };

  @action
  setTenders = async (tenders: DocumentView[]) => {
    this.tenders = tenders;
  };

  @action
  setCurrentTender = async (tender: DocumentView) => {
    this.currentTender = tender;
  };

  @action
  setShowResults = async (state: boolean) => {
    this.showResults = state;
  };

  @action
  getTenders = async (
    filter: RequestPaginationOfDocumentFilter = {
      skip: 0,
      take: 20,
    }
  ) => {
    try {
      await this.setLoading(true);
      const data = await documentsService.getDocumentsListByType(filter, 'Requests');
      runInAction(() => {
        this.tenders = toJS(data);
      });
    } catch (error) {
      // Global error handler
    } finally {
      await this.setLoading(false);
      await this.setShowResults(true);
    }
  };

  @action
  getTenderById = async (id: number) => {
    try {
      await this.setLoading(true);
      const data = await documentsService.getDocumentById({ documentId: id, documentType: 'Requests' });
      this.setCurrentTender(data.result);
    } catch (error) {
      // Global error handler
      console.warn('failed to get tender by id '.toUpperCase(), error);
    } finally {
      await this.setLoading(false);
    }
  };

  @action
  addPositionsToTender = async (items: DocumentItemDto[]) => {
    try {
      await this.setLoading(true);
      const data = await documentsService.addPositionsToExistingDocument({
        documentType: 'Requests',
        documentId: this.currentTender.id,
        items,
      });
      this.setCurrentTender(data.result);
      return data.result.items;
    } catch (error) {
      throw new Error('ERROR ADDING ITEMS' + error);
      // Global error handler
    } finally {
      await this.setLoading(false);
    }
  };

  @action
  deletePositionsOfTender = async (itemIds: number[]) => {
    try {
      await this.setLoading(true);
      const data = await documentsService.deleteItemsOfExistingDocument({
        documentType: 'Requests',
        documentId: this.currentTender.id,
        itemIds,
      });
      this.setCurrentTender(data.result);
      return data.result.items;
    } catch (error) {
      throw new Error('ERROR DELETING ITEMS' + error);
      // Global error handler
    } finally {
      await this.setLoading(false);
    }
  };

  @action
  acceptTender = async (data: DocumentServiceProps) => {
    try {
      this.setLoading(true);

      console.log('PAYLOAD accept tender', data);

      await documentsService.changeDocumentStatus({
        documentType: 'Requests',
        documentId: this.currentTender.id,
        status: TaskStatusesEnum.ConfirmedPerformer,
      });
    } catch (error) {
      console.log('ERROR WHILE ACCEPTING TENDER: ', error);
    } finally {
      await this.setLoading(false);
    }
  };

  @action
  changeTenderStatus = async (status: TaskStatusesEnum) => {
    try {
      this.setLoading(true);

      await documentsService.changeDocumentStatus({
        documentType: 'Requests',
        documentId: this.currentTender.id,
        status,
      });
    } catch (error) {
      console.log('ERROR WHILE CHANGING TENDER STATUS  ', error);
    } finally {
      await this.setLoading(false);
    }
  };

  @action
  finishTender = async (data: FinishTenderProps) => {
    try {
      this.setLoading(true);

      console.log('PAYLOAD adding sign ', {
        properties: {
          fullName: data.fullName,
          position: data.position,
          customerComments: data.customerComments,
        },
      });

      if (data.isCustomerSignExists) {
        await this.editItemOfDocument({
          itemType: DocumentItemNamesEnum.CustomerSign,
          additionalInfo: data.additionalInfo,
          properties: {
            customerComments: data.customerComments,
          },
        });
      } else {
        await this.addPositionsToTender([
          {
            type: DocumentItemNamesEnum.CustomerSign,
            additionalInfo: data.additionalInfo,
            properties: {
              fullName: data.fullName,
              position: data.position,
              customerComments: data.customerComments,
            },
          },
        ]);
      }

      if (!data.isTenderSignCancelled) {
        await documentsService.addAttachmentToExistingItem({
          attachment: data.signature,
          documentId: this.currentTender.id,
          documentType: 'Requests',
          itemId: this.currentTender.items.find(item => item.type === DocumentItemNamesEnum.CustomerSign).id,
        });
      }

      await documentsService.changeDocumentStatus({
        documentId: this.currentTender.id,
        documentType: 'Requests',
        status: !data.isTenderSignCancelled ? TaskStatusesEnum.Completed : TaskStatusesEnum.CompletedWithoutSignature,
      });

      console.log('FINISH OF TENDER SUCCEED');
      navigate(TASKS_STACK);
    } catch (error) {
      console.log('ERROR WHILE FINISHING TENDER: ', error);
      throw new Error('');
    } finally {
      this.setLoading(false);
    }
  };

  @action
  editItemOfDocument = async ({ itemType, id, additionalInfo, properties, referenceMasterCode }: EditItemProps) => {
    try {
      this.setLoading(true);
      logToConsole({ itemType, id, additionalInfo, properties, referenceMasterCode });
      let resultTender;
      if (itemType) {
        resultTender = await documentsService.editItemOfExistingDocument({
          documentType: 'Requests',
          documentId: this.currentTender.id,
          itemId: this.currentTender.items.find(item => item.type === itemType).id,
          referenceMasterCode,
          additionalInfo,
          properties,
        });
      }
      if (id) {
        resultTender = await documentsService.editItemOfExistingDocument({
          documentType: 'Requests',
          documentId: this.currentTender.id,
          itemId: id,
          referenceMasterCode,
          additionalInfo,
          properties,
        });
      }
      this.setCurrentTender(resultTender.result);
      return resultTender.result.items;
    } catch (error) {
      // Global error handler
      throw new Error('ERROR EDITING ITEM ' + error);
    } finally {
      this.setLoading(false);
    }
  };

  @action
  cancelService = async (serviceCancellationReason: string) => {
    try {
      this.setLoading(true);
      await documentsService.changeDocumentStatus({
        documentType: 'Requests',
        status: TaskStatusesEnum.Canceled,
        documentId: this.currentTender.id,
        properties: {
          serviceCancellation: 'true',
          serviceCancellationReason: serviceCancellationReason,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  };

  @action
  launchForcedDowntime = async () => {
    try {
      this.setLoading(true);
      if (!this.currentTender.items.find(item => item.type === DocumentItemNamesEnum.ForcedDownTime)?.id) {
        await this.addPositionsToTender([
          {
            type: DocumentItemNamesEnum.ForcedDownTime,
          },
        ]);
      }
      const resultTender = await documentsService.changeItemDocumentStatus({
        documentType: 'Requests',
        documentId: this.currentTender.id,
        itemId: this.currentTender.items.find(item => item.type === DocumentItemNamesEnum.ForcedDownTime)?.id,
        status: TaskStatusesEnum.Started,
      });
      this.setCurrentTender(resultTender.result);
      return resultTender.result.items.find(item => item.type === DocumentItemNamesEnum.ForcedDownTime);
    } catch (error) {
      // Global error handler
    } finally {
      this.setLoading(false);
    }
  };

  @action
  stopForcedDowntime = async () => {
    try {
      this.setLoading(true);
      const resultTender = await documentsService.changeItemDocumentStatus({
        documentType: 'Requests',
        documentId: this.currentTender.id,
        itemId: this.currentTender.items.find(item => item.type === DocumentItemNamesEnum.ForcedDownTime).id,
        status: TaskStatusesEnum.Completed,
      });
      this.setCurrentTender(resultTender.result);
      return resultTender.result.items.find(item => item.type === DocumentItemNamesEnum.ForcedDownTime);
    } catch (error) {
      // Global error handler
    } finally {
      this.setLoading(false);
    }
  };

  @action
  changeItemStatus = async (status: TaskStatusesEnum, type?: DocumentItemNamesEnum, id?: number) => {
    try {
      await this.setLoading(true);
      logToConsole('starting changing status of item', this.currentTender, type, id);
      const resultTender = await documentsService.changeItemDocumentStatus({
        documentType: 'Requests',
        documentId: this.currentTender.id,
        itemId: id || this.currentTender.items.find(item => item.type === type).id,
        status,
      });
      logToConsole(resultTender);
      this.setCurrentTender(resultTender.result);
      logToConsole('items after changing item status', resultTender.result.items);
      if (type) {
        return resultTender.result.items.find(item => item.type === type);
      }
      if (id) {
        return resultTender.result.items.find(item => item.id === id);
      }
    } catch (error) {
      logToConsole(error);
    } finally {
      await this.setLoading(false);
    }
  };
}

export default TenderStore;
