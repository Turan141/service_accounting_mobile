import { GET } from '../../utils';
import BaseService, { RestServiceRequestOptions } from '../BaseService';
import { UserModel } from '../data';

enum UsersEndpoints {
  GetById = 'GetInfoByUserId',
}

export class UsersService extends BaseService {
  basePath = '/clients/TKO/';

  getById = async (
    params: { id: number },
    options: RequestInit = {},
    requestOptions: RestServiceRequestOptions = {}
  ): Promise<UserModel> => {
    const data: UserModel = await this.send(GET, `id=${params.id}`, UsersEndpoints.GetById, options, requestOptions);

    return data;
  };
}

const usersService = new UsersService();

export default usersService;
