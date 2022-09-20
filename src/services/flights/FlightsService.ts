import { GET, POST } from '../../utils';
import BaseService, { RestServiceRequestOptions } from '../BaseService';
import {
  Flight,
  FlightFilterData,
  Flights,
  Lirs,
  ResponseSuccessOfFlightResults,
  ResponseSuccessOfLirResults,
} from '../../typings/swagger/api';
import { logToConsole } from '../../utils/formatting';

enum FlightsEndpoints {
  Filter = 'Flight/Filter',
  Lir = 'Lir',
  GetFlightByFlightMasterCode = 'GetFlightByFlightMasterCode',
}

export class FlightsService extends BaseService {
  basePath = '/clients/';

  getFlights = async (
    data: FlightFilterData, // by now
    options: RequestInit = {},
    requestOptions: RestServiceRequestOptions = {}
  ): Promise<Flights> => {
    const response: ResponseSuccessOfFlightResults = await this.send(
      POST,
      '',
      FlightsEndpoints.Filter,
      { ...options, body: JSON.stringify(data) },
      requestOptions
    );
    return response.result.items;
  };

  getFlightByMasterCode = async (
    data,
    options: RequestInit = {},
    requestOptions: RestServiceRequestOptions = {}
  ): Promise<Flight> => {
    const response: Flight = await this.send(
      POST,
      '',
      FlightsEndpoints.GetFlightByFlightMasterCode,
      { ...options, body: JSON.stringify(data) },
      requestOptions
    );
    logToConsole(response);
    return response;
  };

  getLirsByFlightCode = async (
    data,
    options: RequestInit = {},
    requestOptions: RestServiceRequestOptions = {}
  ): Promise<Lirs> => {
    const response: ResponseSuccessOfLirResults = await this.send(
      GET,
      '',
      FlightsEndpoints.Lir + `/Get${data.type}ByFlightCode/${encodeURIComponent(data.flightCode)}`,
      { ...options },
      requestOptions
    );
    logToConsole(response);
    return response.result.items;
  };
}

const flightsService = new FlightsService();

export default flightsService;
