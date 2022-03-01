import { gql } from "@apollo/client";

const UPDATE_SHIPPING_METHODS = gql`
  mutation updateShippingMethod($input: [String]!) {
    updateShippingMethod(input: { shippingMethods: $input }) {
      clientMutationId
      cart {
        chosenShippingMethods
        shippingTotal
        total
        subtotal
      }
    }
  }
`;

export default UPDATE_SHIPPING_METHODS;
