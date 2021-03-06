# Cambridge Clients

This project is a mono-repo of different clients (`order`, `pickup`, `marquee`). The package dependency manager for this project is `yarn`.

## Prerequisites

- yarn

## For first time setup

- Run below script at root to create `config.json` inside of each app.

```
for repoName in order pickup marquee;
  do
    cp example.config.json clients/${repoName}/public/config.json
  done
```

## Development setup

#### Install yarn packages

```
$ yarn install
```

#### Generate graph code from schema

```
$ yarn generate:code:graph
```

#### Start the development server (replace `$PACKAGE_NAME` with `order`, `pickup`, `marquee`)

```
$ yarn dev clients/$PACKAGE_NAME
```

#### Run unit test cases

```
$ yarn test $PACKAGE_NAME
```

#### Run storybook

```
$ yarn storybook $PACKAGE_NAME
```

## Create a production build

```
$ yarn build clients/$PACKAGE_NAME
```

## Create a static storybook build
```
$ yarn build-storybook -c clients/$PACKAGE_NAME/.storybook -o storybook-static/$PACKAGE_NAME
```

## Github Actions

On pushing code to any branch, github actions will execute two steps, `test` & `build`. The `test` step runs all unit test cases and if all tests are successful, the build step will be executed.
#   s t o r y b o o k  
 #   s t o r y b o o k  
 