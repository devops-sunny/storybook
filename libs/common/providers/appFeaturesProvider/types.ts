export type AppFeatureVariant = {
  identifier: string;
  name: string;
  description: string;
  params?: Record<string, unknown>;
};

export type AppFeature = {
  identifier: string;
  name: string;
  description: string;
  variant: AppFeatureVariant;
};

export type AppFeatures = Record<string, AppFeature>;

export type AppFeaturesJson = {
  features: AppFeatures;
};
