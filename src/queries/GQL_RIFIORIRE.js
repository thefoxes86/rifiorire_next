import { gql } from "@apollo/client";

const GQL_RIFIORIRECASA = gql`
  query HomeRifio {
    page(id: "61", idType: DATABASE_ID) {
      id
      title(format: RENDERED)
      content(format: RENDERED)
      pagebuilder {
        aboutSectionText
        aboutSectionTitle
        aboutSectionImage {
          srcSet(size: LARGE)
          mediaItemUrl
        }
        category
        category2
        imageCategory1 {
          srcSet(size: LARGE)
          mediaItemUrl
        }
        imageCategory2 {
          mediaItemUrl
          srcSet
        }
        imagePreFooterFull {
          mediaItemUrl
          srcSet
        }
        singleLinkSection1
        singleLinkSection2
        singleTextSection1
        singleTextSection2
        singleTitleSection1
        singleTitleSection2
        slides {
          buttonLink
          buttonText
          fieldGroupName
          image {
            mediaItemUrl
            srcSet
          }
        }
        textCategory1
        textCategory2
        titleCategory1
        titleCategory2
      }
    }
  }
`;

const FIRST_CATEGORY_HOME = gql`
  query firstCategory($cat1: String!, $cat2: String!) {
    firstCategory: products(first: 2, where: { category: $cat1 }) {
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
    secondCategory: products(first: 2, where: { category: $cat2 }) {
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
  }
`;

const GQL_RIFIOMENU = gql`
  query MyQuery {
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

const GQL_RIFIORIRECHISIAMO = gql`
  query AboutRifio {
    page(id: "162", idType: DATABASE_ID) {
      id
      title(format: RENDERED)
      content(format: RENDERED)
    }
  }
`;

const GQL_RIFIORIRECONTATTI = gql`
  query ContattiRifio {
    page(id: "164", idType: DATABASE_ID) {
      id
      title(format: RENDERED)
      content(format: RENDERED)
    }
  }
`;

const GQL_RIFIORIREGENERICPAGE = gql`
  query PageGeneralRifio($idPage: ID!) {
    page(id: $idPage, idType: DATABASE_ID) {
      id
      title(format: RENDERED)
      content(format: RENDERED)
    }
  }
`;

export {
  GQL_RIFIOMENU,
  GQL_RIFIORIRECASA,
  FIRST_CATEGORY_HOME,
  GQL_RIFIORIRECHISIAMO,
  GQL_RIFIORIRECONTATTI,
  GQL_RIFIORIREGENERICPAGE,
};
