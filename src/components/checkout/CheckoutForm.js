import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import cx from "classnames";
import { v4 } from "uuid";
import YourOrder from "./YourOrder";
import PaymentModes from "./PaymentModes";
import { AppContext } from "../context/AppContext";
import validateAndSanitizeCheckoutForm from "../../validator/checkout";
import { getFormattedCart, createCheckoutData } from "../../functions";
import OrderSuccess from "./OrderSuccess";
import GET_CART from "../../queries/get-cart";
import CHECKOUT_MUTATION from "../../mutations/checkout";
import Address from "./Address";
import {
  handleBillingDifferentThanShipping,
  handleCreateAccount,
  handleExtraShippingCost,
  handleStripeCheckout,
  setStatesForCountry,
} from "../../utils/checkout";
import CheckboxField from "./form-elements/CheckboxField";
import CLEAR_CART_MUTATION from "../../mutations/clear-cart";
import ShippingMethods from "./ShippingMethods";
import UPDATE_CART from "../../mutations/update-cart";
import UPDATE_SHIPPING_METHODS from "../../mutations/update-shipping-method";

// Use this for testing purposes, so you dont have to fill the checkout form over an over again.
// const defaultCustomerInfo = {
// 	firstName: 'Imran',
// 	lastName: 'Sayed',
// 	address1: '123 Abc farm',
// 	address2: 'Hill Road',
// 	city: 'Mumbai',
// 	country: 'IN',
// 	state: 'Maharastra',
// 	postcode: '221029',
// 	email: 'codeytek.academy@gmail.com',
// 	phone: '9883778278',
// 	company: 'The Company',
// 	errors: null
// }

const defaultCustomerInfo = {
  firstName: "",
  lastName: "",
  address1: "",
  address2: "",
  city: "",
  country: "",
  state: "",
  postcode: "",
  email: "",
  phone: "",
  company: "",
  errors: null,
};

const CheckoutForm = ({ countriesData }) => {
  const { billingCountries, shippingCountries } = countriesData || {};

  const router = useRouter();

  const initialState = {
    billing: {
      ...defaultCustomerInfo,
    },
    shipping: {
      ...defaultCustomerInfo,
    },
    createAccount: false,
    orderNotes: "",
    billingDifferentThanShipping: false,
    paymentMethod: "",
    shippingMethod: "",
  };

  const [cart, setCart] = useState();
  const [input, setInput] = useState(initialState);
  const [orderData, setOrderData] = useState(null);
  const [requestError, setRequestError] = useState(null);
  const [theShippingStates, setTheShippingStates] = useState([]);
  const [isFetchingShippingStates, setIsFetchingShippingStates] = useState(
    false
  );
  const [theBillingStates, setTheBillingStates] = useState([]);
  const [isFetchingBillingStates, setIsFetchingBillingStates] = useState(false);
  const [isStripeOrderProcessing, setIsStripeOrderProcessing] = useState(false);
  const [createdOrderData, setCreatedOrderData] = useState({});
  const [shippingMethod, setShippingMethod] = useState(null);
  const [paymentMethod, setPaymentmethod] = useState(null);

  // Get Cart Data.
  const { data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);
      localStorage.setItem("woo-next-cart", JSON.stringify(updatedCart));

      // Update cart data in React Context.
      setCart(data.cart);
    },
  });

  // Create New order: Checkout Mutation.
  const [
    checkout,
    { data: checkoutResponse, loading: checkoutLoading },
  ] = useMutation(CHECKOUT_MUTATION, {
    variables: {
      input: orderData,
    },
    onError: (error) => {
      if (error) {
        setRequestError(error?.graphQLErrors?.[0]?.message ?? "");
      }
    },
  });

  const [
    updateShippingMethod,
    { data: shipping, loading, error },
  ] = useMutation(UPDATE_SHIPPING_METHODS, {
    onCompleted: () => {
      if (shippingMethod === null) setShippingMethod("flat_rate:1");
      refetch();
    },
  });
  const [clearCartMutation] = useMutation(CLEAR_CART_MUTATION);

  // Update Cart Mutation.
  const [
    updateCart,
    {
      data: updateCartResponse,
      loading: updateCartProcessing,
      error: updateCartError,
    },
  ] = useMutation(UPDATE_CART, {
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      if (error) {
        const errorMessage = error?.graphQLErrors?.[0]?.message
          ? error.graphQLErrors[0].message
          : "";
        setRequestError(errorMessage);
      }
    },
  });

  /*
   * Handle form submit.
   *
   * @param {Object} event Event Object.
   *
   * @return {void}
   */
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    /**
     * Validate Billing and Shipping Details
     *
     * Note:
     * 1. If billing is different than shipping address, only then validate billing.
     * 2. We are passing theBillingStates?.length and theShippingStates?.length, so that
     * the respective states should only be mandatory, if a country has states.
     */
    const billingValidationResult = input?.billingDifferentThanShipping
      ? validateAndSanitizeCheckoutForm(
          input?.billing,
          theBillingStates?.length
        )
      : { errors: null, isValid: true };
    const shippingValidationResult = validateAndSanitizeCheckoutForm(
      input?.shipping,
      theShippingStates?.length
    );

    if (!shippingValidationResult.isValid || !billingValidationResult.isValid) {
      setInput({
        ...input,
        billing: { ...input.billing, errors: billingValidationResult.errors },
        shipping: {
          ...input.shipping,
          errors: shippingValidationResult.errors,
        },
      });

      return;
    }

    if ("stripe-mode" === input.paymentMethod) {
      const createdOrderData = await handleStripeCheckout(
        input,
        cart?.products,
        setRequestError,
        clearCartMutation,
        setIsStripeOrderProcessing,
        setCreatedOrderData
      );
      return null;
    }

    const checkOutData = createCheckoutData(input);
    setRequestError(null);
    /**
     *  When order data is set, checkout mutation will automatically be called,
     *  because 'orderData' is added in useEffect as a dependency.
     */
    setOrderData(checkOutData);
  };

  /*
   * Handle onchange input.
   *
   * @param {Object} event Event Object.
   * @param {bool} isShipping If this is false it means it is billing.
   * @param {bool} isBillingOrShipping If this is false means its standard input and not billing or shipping.
   *
   * @return {void}
   */

  // Update Cart Mutation.
  const [
    clearCart,
    { data: clearCartRes, loading: clearCartProcessing, error: clearCartError },
  ] = useMutation(CLEAR_CART_MUTATION, {
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      if (error) {
        const errorMessage = !isEmpty(error?.graphQLErrors?.[0])
          ? error.graphQLErrors[0]?.message
          : "";
        setRequestError(errorMessage);
      }
    },
  });

  const handleOnChange = async (
    event,
    isShipping = false,
    isBillingOrShipping = false
  ) => {
    const { target } = event || {};

    // flat_rate:1  6,00 €
    // local_pickup:4 Free
    // flat_rate:6 9,00 €
    if ("shippingMethod" === target.name) {
      setShippingMethod(target.value);
      updateShippingMethod({
        variables: {
          input: {
            shippingMethods: target.value,
          },
        },
      });
    }

    if ("paymentMethod" === target.name) {
      setPaymentmethod(target.value);
    }

    if ("state" === target.name) {
      (async () => {
        const res = await handleExtraShippingCost(target.value);
        console.log("Response", shippingMethod);
        res === true
          ? shippingMethod !== "local_pickup:4"
            ? updateShippingMethod({
                variables: {
                  input: {
                    shippingMethods: "flat_rate:6",
                  },
                },
              })
            : ""
          : shippingMethod !== "local_pickup:4"
          ? updateShippingMethod({
              variables: {
                input: {
                  shippingMethods: "flat_rate:1",
                },
              },
            })
          : "";
      })();
    }

    if ("createAccount" === target.name) {
      handleCreateAccount(input, setInput, target);
    } else if ("billingDifferentThanShipping" === target.name) {
      handleBillingDifferentThanShipping(input, setInput, target);
    } else if (isBillingOrShipping) {
      if (isShipping) {
        await handleShippingChange(target);
      } else {
        await handleBillingChange(target);
      }
    } else {
      const newState = { ...input, [target.name]: target.value };
      setInput(newState);
    }
  };

  const handleShippingChange = async (target) => {
    const newState = {
      ...input,
      shipping: { ...input?.shipping, [target.name]: target.value },
    };
    setInput(newState);
    await setStatesForCountry(
      target,
      setTheShippingStates,
      setIsFetchingShippingStates
    );
  };

  const handleBillingChange = async (target) => {
    const newState = {
      ...input,
      billing: { ...input?.billing, [target.name]: target.value },
    };
    setInput(newState);
    await setStatesForCountry(
      target,
      setTheBillingStates,
      setIsFetchingBillingStates
    );
  };

  // Clear the entire cart.
  const handleClearCart = async (event) => {
    event.stopPropagation();
    event.preventDefault();

    if (clearCartProcessing) {
      return;
    }

    await clearCart({
      variables: {
        input: {
          clientMutationId: v4(),
          all: true,
        },
      },
    });
    router.push("/");
  };

  useEffect(async () => {
    updateShippingMethod({
      variables: {
        input: {
          shippingMethods: "flat_rate:1",
        },
      },
    });
    if (null !== orderData) {
      // Call the checkout mutation when the value for orderData changes/updates.
      await checkout();
    }
  }, [, orderData]);

  // Loading state
  const isOrderProcessing = checkoutLoading || isStripeOrderProcessing;

  return (
    <>
      {cart ? (
        <form onSubmit={handleFormSubmit} className="woo-next-checkout-form">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div>
              {/*Shipping Details*/}
              <div className="billing-details">
                <h2 className="text-xl font-medium mb-4">
                  Indirizzo di spedizione
                </h2>
                <Address
                  states={theShippingStates}
                  countries={shippingCountries}
                  input={input?.shipping}
                  handleOnChange={(event) => handleOnChange(event, true, true)}
                  isFetchingStates={isFetchingShippingStates}
                  isShipping
                  isBillingOrShipping
                />
              </div>
              <div>
                <CheckboxField
                  name="condizioniGenerali"
                  type="checkbox"
                  checked={input?.condizioniGenerali}
                  handleOnChange={handleOnChange}
                  required={true}
                  label="Condizioni Generali di Vendita"
                  containerClassNames="mb-4 pt-4"
                />
              </div>
              <div>
                <CheckboxField
                  name="billingDifferentThanShipping"
                  type="checkbox"
                  checked={input?.billingDifferentThanShipping}
                  handleOnChange={handleOnChange}
                  label="Spedisci ad un indirizzo differente"
                  containerClassNames="mb-4 pt-4"
                />
              </div>
              {/*Billing Details*/}
              {input?.billingDifferentThanShipping ? (
                <div className="billing-details">
                  <h2 className="text-xl font-medium mb-4">Billing Details</h2>
                  <Address
                    states={theBillingStates}
                    countries={billingCountries}
                    input={input?.billing}
                    handleOnChange={(event) =>
                      handleOnChange(event, false, true)
                    }
                    isFetchingStates={isFetchingBillingStates}
                    isShipping={false}
                    isBillingOrShipping
                  />
                </div>
              ) : null}
            </div>
            {/* Order & Payments*/}
            <div className="your-orders">
              {/*	Order*/}
              <h2 className="text-xl font-medium mb-4">Il tuo ordine</h2>
              <div className="clear-cart text-right">
                <button
                  className="px-4 py-1 bg-primary text-white rounded-sm w-auto"
                  onClick={(event) => handleClearCart(event)}
                  disabled={clearCartProcessing}
                >
                  <span className="woo-next-cart">Svuota Carrello</span>
                  <i className="fa fa-arrow-alt-right" />
                </button>
                {clearCartProcessing ? <p>Sto svuotando il carrello...</p> : ""}
                {updateCartProcessing ? (
                  <p>Sto aggiornando il carrello...</p>
                ) : null}
              </div>
              <YourOrder cart={cart} />

              <ShippingMethods
                input={input}
                handleOnChange={handleOnChange}
                shippingMethodSelected={shippingMethod}
                shipMethods={cart.availableShippingMethods[0]}
              />

              {/*Payment*/}
              <PaymentModes input={input} handleOnChange={handleOnChange} />

              <div className="woo-next-place-order-btn-wrap mt-5">
                {!isOrderProcessing && (
                  <button
                    disabled={!paymentMethod ? true : false}
                    className={cx(
                      "bg-secondary text-white px-5 py-3 rounded-sm w-auto xl:w-full",
                      { "opacity-50": isOrderProcessing },
                      { "opacity-50": !shippingMethod },
                      { "opacity-50": !paymentMethod }
                    )}
                    type="submit"
                  >
                    Ordina adesso
                  </button>
                )}
              </div>

              {/* Checkout Loading*/}
              {isOrderProcessing && <p>Stiamo processando il tuo ordine...</p>}
              {requestError && (
                <p>Errore : {requestError} :( Prova nuovamente</p>
              )}
            </div>
          </div>
        </form>
      ) : null}
      {/*	Show message if Order Success*/}
      <OrderSuccess response={checkoutResponse} />
    </>
  );
};

export default CheckoutForm;
