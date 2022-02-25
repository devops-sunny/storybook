import { PickupStatusLayout } from './PickupStatusLayout.web';
import { PickupStatuses } from './PickupStatus.enum';
import { ViewSkeleton } from '@bb/common/viewSkeleton/ViewSkeleton';

export type PickupStatusProps = {
  status: keyof typeof PickupStatuses;
  engagedOrderName?: string;
};

export function PickupStatus(
  props: React.PropsWithChildren<PickupStatusProps>,
) {
  const { status, engagedOrderName } = props;

  // @TODO - later on, these components will split out to their own files
  const Idle = () => {
    return <ViewSkeleton title={PickupStatuses.idle} navigations={[]} />;
  };

  const Available = () => {
    return <ViewSkeleton title={PickupStatuses.available} navigations={[]} />;
  };

  const Engaged = (props: { orderName?: string }) => {
    const { orderName } = props;
    const title = orderName
      ? `${PickupStatuses.engaged}: ${orderName}`
      : `${PickupStatuses.engaged}`;
    return <ViewSkeleton title={title} navigations={[]} />;
  };

  const viewComponents = {
    [PickupStatuses.idle]: <Idle />,
    [PickupStatuses.available]: <Available />,
    [PickupStatuses.engaged]: <Engaged orderName={engagedOrderName} />,
  };

  return (
    <PickupStatusLayout status={status}>
      {viewComponents[status]}
    </PickupStatusLayout>
  );
}
