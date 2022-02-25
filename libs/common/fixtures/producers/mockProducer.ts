import { ChainableMockProducer } from '@bb/common/types/tmpTypes/chainableTypes';
import { Producer } from '@bb/common/types/tmpTypes/entityTypes';
import { v4 as uuidv4 } from 'uuid';

export const mockProducer = (params?: {
  producer: Producer;
}): ChainableMockProducer => {
  let value: Producer = params?.producer
    ? { ...params.producer }
    : {
        id: uuidv4(),
        heartbeatAt: new Date(),
      };
  const chainableActions: ChainableMockProducer = {
    value: () => ({ ...value }),
    updateHeartbeat: () => {
      value = {
        ...value,
        heartbeatAt: new Date(),
      };
      return chainableActions;
    },
  };
  return chainableActions;
};
