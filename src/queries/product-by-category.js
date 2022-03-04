import { gql } from "@apollo/client";

export const PRODUCT_BY_CATEGORY_SLUG = gql`
  query PRODUCT_BY_CATEGORY_SLUG($slug: ID!) {
    productCategory(id: $slug, idType: SLUG) {
      id
      name
      databaseId
      description
      products(first: 50) {
        nodes {
          id
          productId: databaseId
          averageRating
          slug
          onSale
          date
          description
          image {
            id
            uri
            title
            srcSet
            sourceUrl
          }
          name
          ... on SimpleProduct {
            price
            regularPrice
            onSale
            id
          }
          ... on VariableProduct {
            price
            regularPrice
            onSale
            id
          }
          ... on ExternalProduct {
            price
            id
            onSale
            regularPrice
            externalUrl
          }
          # ... on GroupProduct {
          #   id
          #   products {
          #     nodes {
          #       ... on SimpleProduct {
          #         id
          #         price
          #         regularPrice
          #       }
          #     }
          #   }
          # }
        }
      }
    }
  }
`;

export const PRODUCT_CATEGORIES_SLUGS = gql`
  query PRODUCT_CATEGORIES_SLUGS {
    productCategories {
      nodes {
        id
        slug
      }
    }
  }
`;
