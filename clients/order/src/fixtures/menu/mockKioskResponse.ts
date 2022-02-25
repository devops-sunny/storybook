import { Kiosk } from '@bb/common/types/tmpTypes/menuEntityTypes';
import { UrqlResponseType } from '@bb/common/types/tmpTypes/responseTypes';
import { mockKiosk } from './kiosk';

export const mockKioskResponse: UrqlResponseType<Kiosk> = {
  data: {
    ...mockKiosk,
  },
};
