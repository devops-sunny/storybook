import { Navigate, Route, Routes } from 'react-router-dom';

import { Approach } from './approach/Approach';
import { Attract } from './attract/Attract';
import { ConfirmHandoff } from './confirm/ConfirmHandoff/ConfirmHandoff';
import { ConfirmOrderSummary } from './confirm/ConfirmOrderSummary';
import { ConfirmPayment } from './confirm/ConfirmPayment/ConfirmPayment';
import { Delivery } from './delivery/Delivery';
import { Greet } from './greet/Greet';
import { Menu } from './order/menu/Menu';
import { OrderItemModification } from './order/orderItem/OrderItemModification';
import { WaitHere } from './wait/WaitHere';
import { WaitProgress } from './wait/WaitProgress';
import { timeouts } from './common/constants';

export const AppRoutes: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/attract" />} />
      <Route path="/attract" element={<Attract />} />
      <Route
        path="/approach"
        element={<Approach timeoutMs={timeouts.APPROACH_NAVIGATE_TO_ATTRACT} />}
      />
      <Route
        path="/greet"
        element={<Greet timeoutMs={timeouts.GREET_NAVIGATE_TO_ORDER_SUGGEST} />}
      />
      <Route path="/order/:orderId">
        <Route path="/menu/:menuId" element={<Menu />} />
        <Route
          path="/product/:productVariationId"
          element={<OrderItemModification />}
        />
        <Route
          path="/order-item/:orderItemId"
          element={<OrderItemModification />}
        />
        <Route path="/summary" element={<ConfirmOrderSummary />} />
        <Route
          path="/payment"
          element={
            <ConfirmPayment timeoutMs={timeouts.NAVIGATE_AFTER_ACTION} />
          }
        />
        <Route
          path="/handoff"
          element={
            <ConfirmHandoff timeoutMs={timeouts.NAVIGATE_AFTER_ACTION} />
          }
        />
        <Route
          path="/wait"
          element={<WaitHere timeoutMs={timeouts.WAIT_LOOP_NAVIGATE} />}
        />
        <Route
          path="/progress"
          element={<WaitProgress timeoutMs={timeouts.WAIT_LOOP_NAVIGATE} />}
        />
        <Route
          path="/delivery"
          element={
            <Delivery timeoutMs={timeouts.DELIVERY_NAVIGATE_TO_APPROACH} />
          }
        />
      </Route>
    </Routes>
  );
};
