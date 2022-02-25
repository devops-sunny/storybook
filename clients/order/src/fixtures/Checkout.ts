import { OrderItemStatus } from '@bb/order/generated/graph';

export const checkoutResponse = {
  order: {
    id: '6b4f041b-ba3b-44d8-9e07-0b1f0d5a1a3b',
    status: [OrderItemStatus.ProductionReady],
    items: [
      {
        id: '167c01fe-b586-459a-b2a0-ec4245ddc8e6',
        status: OrderItemStatus.ProductionReady,
        modifiedProductVariation: {
          id: '92c62000-0a6d-41fb-a273-a473d060374a',
          productVariation: {
            id: 'd95b2e36-21c8-47c7-b35c-57de1e846ab3',
            product: {
              id: 'ac0cc6f4-52a2-4466-b493-58a64f2d306f',
              name: 'americano',
            },
            rules: [
              {
                id: '25a964da-49e6-42a7-ab9b-8916c78a7a4f',
                component: {
                  id: '7f797965-7bcf-4ca0-98d8-17f212e3387e',
                  name: '12-oz',
                  unitOfMeasure: {
                    id: '512aea7d-9627-4d79-8e3e-d49811bb6b8c',
                    name: 'absolute',
                  },
                },
                value: null,
              },
              {
                id: 'ed60e9db-d30b-4c2c-bd72-f402355bbac1',
                component: {
                  id: 'add0f674-c3d4-4a64-8f31-2396a3e041c7',
                  name: 'costa-mocha-italia',
                  unitOfMeasure: {
                    id: '72b4813b-b814-4acb-8dd2-886dfccbc1be',
                    name: 'shot',
                  },
                },
                value: 3,
              },
            ],
          },
        },
      },
    ],
  },
};
