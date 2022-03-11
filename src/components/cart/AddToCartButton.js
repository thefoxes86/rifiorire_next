import { useState, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Link from "next/link";
import { v4 } from "uuid";
import cx from "classnames";

import { AppContext } from "../context/AppContext";
import { getFormattedCart } from "../../functions";
import GET_CART from "../../queries/get-cart";
import ADD_TO_CART from "../../mutations/add-to-cart";

const AddToCart = (props) => {
  const { product } = props;

  const productQryInput = {
    clientMutationId: v4(), // Generate a unique id.
    productId: product.productId,
  };

  const [cart, setCart] = useContext(AppContext);
  const [showViewCart, setShowViewCart] = useState(false);
  const [requestError, setRequestError] = useState(null);

  // Get Cart Data.
  const { data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);
      localStorage.setItem("woo-next-cart", JSON.stringify(updatedCart));

      // Update cart data in React Context.
      setCart(updatedCart);
    },
  });

  // Add to Cart Mutation.
  const [
    addToCart,
    { data: addToCartRes, loading: addToCartLoading, error: addToCartError },
  ] = useMutation(ADD_TO_CART, {
    variables: {
      input: productQryInput,
    },
    onCompleted: () => {
      // On Success:
      // 1. Make the GET_CART query to update the cart with new values in React context.
      refetch();

      // 2. Show View Cart Button
      setShowViewCart(true);
    },
    onError: (error) => {
      if (error) {
        setRequestError(error?.graphQLErrors?.[0]?.message ?? "");
      }
    },
  });

  const handleAddToCartClick = async () => {
    setRequestError(null);
    await addToCart();
  };

  return (
    <div>
      {/*	Check if its an external product then put its external buy link */}
      {"ExternalProduct" === product.__typename ? (
        <a
          href={product?.externalUrl ?? "/"}
          target="_blank"
          className="px-20 mt-5 py-3 uppercase font-thin bg-black text-white hover:bg-secondary hover:text-white"
        >
          Buy now
        </a>
      ) : (
        <div className="w-100">
          <button
            disabled={addToCartLoading}
            onClick={handleAddToCartClick}
            className={cx(
              "px-20 py-3 uppercase font-thin bg-secondary text-white hover:bg-primary",
              {
                "hover:bg-black hover:text-white": !addToCartLoading,
              },
              { "opacity-50 cursor-not-allowed": addToCartLoading }
            )}
          >
            {addToCartLoading ? "Sto aggiungendo..." : "Aggiungi al carrello"}
          </button>
        </div>
      )}
      {showViewCart ? (
        <Link href="/cart">
          <button className="px-20 mt-5 py-3 uppercase font-thin bg-black text-white hover:bg-secondary hover:text-white">
            Vai al carrello
          </button>
        </Link>
      ) : (
        ""
      )}
    </div>
  );
};

export default AddToCart;
