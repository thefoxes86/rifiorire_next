import { gql } from "@apollo/client";

const GQL_RIFIORIRECASA = gql`
  query MyQuery {
    page(id: "61", idType: DATABASE_ID) {
      id
      title(format: RENDERED)
      content(format: RENDERED)
      pagebuilder {
        category {
          title
          url
        }
        category2 {
          title
          url
        }
        linkSection1 {
          url
        }
        linkSection2 {
          url
        }
        imageCategory1 {
          srcSet(size: LARGE)
          link
        }
        imageCategory2 {
          srcSet(size: LARGE)
          link
        }
        textSection2
        textSections1
        titleCategory1
        titleCategory2
        titleSection1
        titleSection2
      }
    }
    firstCategory: products(first: 2, where: { categoryId: 31 }) {
      nodes {
        id
        databaseId
        onSale
        averageRating
        slug
        description
        date
        image {
          id
          uri
          title
          srcSet
          sourceUrl
        }
        name
        ... on SimpleProduct {
          salePrice
          regularPrice
          onSale
          price
          id
        }
        ... on VariableProduct {
          salePrice
          regularPrice
          onSale
          price
          id
        }
        ... on ExternalProduct {
          price
          id
          externalUrl
        }
        ... on GroupProduct {
          products {
            nodes {
              ... on SimpleProduct {
                id
                price
              }
            }
          }
          id
        }
      }
    }
    secondCategory: products(first: 2, where: { categoryId: 32 }) {
      nodes {
        id
        databaseId
        onSale
        averageRating
        slug
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
          salePrice
          regularPrice
          onSale
          price
          id
        }
        ... on VariableProduct {
          salePrice
          regularPrice
          onSale
          price
          id
        }
        ... on ExternalProduct {
          price
          id
          externalUrl
        }
        ... on GroupProduct {
          products {
            nodes {
              ... on SimpleProduct {
                id
                price
              }
            }
          }
          id
        }
      }
    }
    menu(idType: NAME, id: "primary") {
      menuItems(where: { location: PRIMARY }) {
        nodes {
          id
          path
          label
          parentId
        }
      }
    }
  }
`;

const GQL_RIFIOMENU = gql`
  query MyQuery {
    menu(idType: NAME, id: "primary") {
      menuItems(where: { location: PRIMARY }) {
        nodes {
          path
          label
          parentId
        }
      }
    }
  }
`;

export { GQL_RIFIOMENU, GQL_RIFIORIRECASA };
