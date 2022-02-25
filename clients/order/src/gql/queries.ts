import { gql } from '@urql/core';

export const QUERY_ORDER = gql`
  query Order($id: UUID!) {
    order(id: $id) {
      id
      items {
        id
        modifiedProductVariation {
          id
          productVariation {
            id
            name
          }
          modifications {
            component {
              id
              name
            }
          }
        }
        status
        validConditions
        invalidConditions
        completeConditions
        incompleteConditions
      }
      status
      validConditions
      invalidConditions
      completeConditions
      incompleteConditions
    }
  }
`;

export const QUERY_KIOSK_MENUS = gql`
  query Kiosk($storefrontId: UUID!) {
    kiosk(storefrontId: $storefrontId) {
      id
      name
      mainMenu {
        id
        name
        items {
          id
          name
        }
      }
    }
  }
`;

export const QUERY_MAIN_MENU = gql`
  query MainMenu($menuId: UUID!) {
    mainMenu(menuId: $menuId) {
      id
      name
      displayName
      description
      image {
        id
        name
        accessibleName
        sourceUrl
      }
      items {
        id
        name
        displayName
        description
        image {
          id
          name
          accessibleName
          sourceUrl
        }
      }
    }
  }
`;

export const QUERY_SUB_MENU = gql`
  query SubMenu($menuId: UUID!) {
    subMenu(menuId: $menuId) {
      id
      name
      displayName
      description
      image {
        id
        name
        accessibleName
        sourceUrl
      }
      items {
        id
        name
        displayName
        description
        image {
          id
          name
          accessibleName
          sourceUrl
        }
        product {
          id
          name
          productVariationIds {
            id
            name
          }
        }
        productSizes {
          id
          name
          productId
          sizeComponentId
          displayName
          price {
            value
            iso4217Currency
          }
        }
      }
    }
  }
`;

export const QUERY_SUB_MENUS = gql`
  query SubMenus($menuIds: [UUID]!) {
    subMenus(menuIds: $menuIds) {
      menu {
        id
        name
        displayName
        description
        image {
          id
          name
          accessibleName
          sourceUrl
        }
        items {
          id
          name
          displayName
          description
          image {
            id
            name
            accessibleName
            sourceUrl
          }
          product {
            id
            name
            productVariationIds {
              id
              name
            }
          }
          productSizes {
            id
            name
            productId
            sizeComponentId
            displayName
            price {
              value
              iso4217Currency
            }
          }
        }
      }
    }
  }
`;

export const QUERY_PRODUCT_VARIATION_CONTENT = gql`
  query ProductVariationContent(
    $productVariationId: UUID
    $productVariationName: string
  ) {
    productVariationContent(
      productVariationId: $productVariationId
      productVariationName: $productVariationName
    ) {
      id
      name
      image {
        id
        name
        accessibleName
        sourceUrl
      }
      displayName
      description
      price {
        value
        iso4217Currency
      }
      calories
      productDisplayName
      sizeDisplayName
    }
  }
`;
