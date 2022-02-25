import { ProducersQueryResponse } from '@bb/common/types/tmpTypes/responseTypes';
import { v4 as uuidv4 } from 'uuid';

export const mockProducersResponse = (): ProducersQueryResponse => {
  return {
    data: {
      producers: [
        { id: uuidv4(), heartbeatAt: new Date() },
        { id: uuidv4(), heartbeatAt: new Date() },
      ],
    },
  };
};
