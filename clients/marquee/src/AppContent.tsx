import { Announcer } from './announcer/Announcer';
import { BarkerView } from './views/Barker';
import { PickupAvailabilityView } from './views/PickupAvailability';
import { SixteenNine } from './views/SixteenNine';
import { useAppFeatureFlags } from '@bb/common/providers/appFeaturesProvider/AppFeaturesProvider';

export const MarqueeAppContent = () => {
  const { CONSUMER_WORKFLOW_MODE } = useAppFeatureFlags();
  const featureFlagVariant = CONSUMER_WORKFLOW_MODE?.variant.identifier;

  if (featureFlagVariant === 'B__VENDING_APPROACH')
    return (
      <SixteenNine>
        <BarkerView />
      </SixteenNine>
    );
  else
    return (
      <SixteenNine>
        <Announcer>
          <BarkerView />
          <PickupAvailabilityView />
        </Announcer>
      </SixteenNine>
    );
};
