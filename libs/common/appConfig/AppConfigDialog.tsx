import {
  AppConfig,
  AppDynamicConfig,
  useAppConfigContext,
} from './AppConfigProvider';
import { AppConfigQuery, useAppConfigQuery } from '@bb/common/generated/graph';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@material-ui/core';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { isNotNullish } from '@bb/common';
import { useMemo } from 'react';

export function AppConfigDialog() {
  const [{ data }] = useAppConfigQuery();

  const { config, setConfig, appConfigDialogIsOpen, setAppConfigDialogIsOpen } =
    useAppConfigContext();

  return (
    <AppConfigDialogPresentation
      defaultValues={config}
      data={data}
      open={appConfigDialogIsOpen || !config}
      disableCancel={!config}
      onClose={() => {
        setAppConfigDialogIsOpen(false);
      }}
      onSubmit={(config) => {
        setConfig({
          storefrontId: config.storefrontId,
          storefrontName:
            data?.storefronts.find(
              (storefront) => storefront.id === config.storefrontId,
            )?.name || '',
          producerId: config.producerId,
          producerSerial:
            data?.storefronts
              .find((storefront) => storefront.id === config.storefrontId)
              ?.producers.find((producer) => producer?.id === config.producerId)
              ?.serial || '',
        });
        setAppConfigDialogIsOpen(false);
      }}
    />
  );
}

type FormValues = AppDynamicConfig;

export type AppConfigDialogPresentationProps = Pick<DialogProps, 'open'> & {
  defaultValues?: AppConfig;
  data: AppConfigQuery | undefined;
  onSubmit?: SubmitHandler<FormValues>;
  onClose?: () => void;
  disableCancel?: boolean;
};

export function AppConfigDialogPresentation(
  props: AppConfigDialogPresentationProps,
) {
  const { data, open, onClose, onSubmit, defaultValues, disableCancel } = props;

  const storefronts = data?.storefronts;

  const {
    control,
    handleSubmit,
    formState: { errors, ...formState },
    watch,
  } = useForm<FormValues>();

  const storefrontId = watch('storefrontId');

  const selectedStorefront = useMemo(
    () => storefronts?.find(({ id }) => id === storefrontId),
    [storefrontId, storefronts],
  );

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={onSubmit ? handleSubmit(onSubmit) : undefined}>
        <DialogTitle>Configuration</DialogTitle>
        <DialogContent sx={{ overflowY: 'unset' }}>
          <Stack spacing={2}>
            <Controller
              control={control}
              name="storefrontId"
              rules={{ required: true }}
              defaultValue={defaultValues?.storefrontId ?? ''}
              render={({ field }) => (
                <FormControl sx={{ minWidth: 240 }}>
                  <InputLabel>Storefront</InputLabel>
                  <Select
                    error={Boolean(errors.storefrontId)}
                    disabled={!storefronts}
                    label="Storefront"
                    {...field}>
                    {storefronts?.filter(isNotNullish).map(({ id, name }) => (
                      <MenuItem key={id} value={id}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.storefrontId ? (
                    <FormHelperText>
                      {errors.storefrontId?.message}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="producerId"
              rules={{ required: true }}
              defaultValue={defaultValues?.producerId ?? ''}
              render={({ field }) => (
                <FormControl sx={{ minWidth: 240 }}>
                  <InputLabel>Producer</InputLabel>
                  <Select
                    error={Boolean(errors.producerId)}
                    disabled={!selectedStorefront}
                    label="Producer"
                    {...field}>
                    {selectedStorefront?.producers
                      .filter(isNotNullish)
                      .map(({ id, serial }) => (
                        <MenuItem key={id} value={id}>
                          {serial}
                        </MenuItem>
                      ))}
                  </Select>
                  {errors.producerId ? (
                    <FormHelperText>
                      {errors.producerId?.message}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={disableCancel}
            onClick={() => {
              onClose?.();
            }}>
            Cancel
          </Button>
          <Button disabled={!formState.isValid} type="submit">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
