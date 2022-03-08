import { Fragment } from "react";
import CheckoutCartItem from "./CheckoutCartItem";

const YourOrder = ({ cart }) => {
  return (
    <Fragment>
      {cart ? (
        <Fragment>
          {/*Product Listing*/}
          <table className="checkout-cart table table-hover w-full mb-10">
            <thead>
              <tr className="woo-next-cart-head-container text-left">
                <th className="woo-next-cart-heading-el" scope="col" />
                <th className="woo-next-cart-heading-el" scope="col">
                  Prodotti
                </th>
                <th className="woo-next-cart-heading-el" scope="col">
                  Totale
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.contents.nodes.length &&
                cart.contents.nodes.map((item) => (
                  <CheckoutCartItem
                    key={item.productId}
                    item={item.product.node}
                  />
                ))}
              {/*Total*/}

              <tr className="bg-gray-200">
                <td className="" />
                <td className="woo-next-checkout-total font-normal text-xl">
                  Costo di spedizione
                </td>
                <td className="woo-next-checkout-total font-bold text-xl">
                  {cart.shippingTotal}
                </td>
              </tr>
              <tr className="bg-gray-200">
                <td className="" />

                <td className="woo-next-checkout-total font-normal text-xl">
                  Totale
                </td>
                <td className="woo-next-checkout-total font-bold text-xl">
                  {cart.total}
                </td>
              </tr>
              {/* <tr className="">
							<td className=""/>
							<td className="woo-next-checkout-total">Total</td>
							<td className="woo-next-checkout-total">{ cart.totalProductsPrice }</td>
						</tr> */}
            </tbody>
          </table>
        </Fragment>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default YourOrder;
