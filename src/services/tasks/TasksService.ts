import { GET } from '../../utils';
import BaseService, { RestServiceRequestOptions } from '../BaseService';
import { TaskGetByIdParams, TaskSchema } from '../data';

export class TasksService extends BaseService {
  getNoSignTasks = async (
    options: RequestInit = {},
    requestOptions: RestServiceRequestOptions = {}
  ): Promise<TaskSchema[]> => {
    return this.sendFake(
      'noSignTasks', // Mock data
      GET,
      '',
      '/tasks',
      options,
      requestOptions
    );
  };

  getById = async (
    request: TaskGetByIdParams,
    options: RequestInit = {},
    requestOptions: RestServiceRequestOptions = {}
  ): Promise<TaskSchema> => {
    const data: TaskSchema[] = await this.sendFake(
      'noSignTasks', // Mock data
      GET,
      '',
      `/tasks/getById/${request.id}`,
      options,
      requestOptions
    );

    return data.find(task => task.id === request.id);
  };
}

const tasksService = new TasksService();

export default tasksService;
