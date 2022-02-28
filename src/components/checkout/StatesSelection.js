import PropTypes from "prop-types";
import { memo, useEffect } from "react";
import cx from "classnames";

import Abbr from "./form-elements/Abbr";
import Error from "./Error";
import { useQuery } from "@apollo/client";
import GET_CART from "../../queries/get-cart";

const StateSelection = ({
  handleOnChange,
  input,
  states,
  isFetchingStates,
  isShipping,
}) => {
  //   useEffect(() => {
  //     console.log("State", input.state);
  //   }, [input.state]);

  const { state, errors } = input || {};

  const inputId = `state-${isShipping ? "shipping" : "billing"}`;

  if (isFetchingStates) {
    // Show loading component.
    return (
      <div className="mb-3">
        <label className="leading-7 text-sm text-gray-700">
          State/County
          <Abbr required />
        </label>
        <div className="relative w-full border-none">
          <select
            disabled
            value=""
            name="state"
            className="opacity-50 bg-gray-100 bg-opacity-50 border border-gray-500 text-gray-500 appearance-none inline-block py-3 pl-3 pr-8 rounded leading-tight w-full"
          >
            <option value="">Loading...</option>
          </select>
        </div>
      </div>
    );
  }

  if (!states.length) {
    return null;
  }

  return (
    <div className="mb-3">
      <label className="leading-7 text-sm text-gray-600" htmlFor={inputId}>
        State/County
        <Abbr required />
      </label>
      <div className="relative w-full border-none">
        <select
          disabled={isFetchingStates}
          onChange={handleOnChange}
          value={state}
          name="state"
          className={cx(
            "bg-gray-100 bg-opacity-50 border border-gray-400 text-gray-500 appearance-none inline-block py-3 pl-3 pr-8 rounded leading-tight w-full",
            { "opacity-50": isFetchingStates }
          )}
          id={inputId}
        >
          <option value="">Select a state...</option>
          {states.map((state, index) => (
            <option
              key={state?.stateCode ?? index}
              value={state?.stateName ?? ""}
            >
              {state?.stateName}
            </option>
          ))}
        </select>
      </div>
      <Error errors={errors} fieldName={"state"} />
    </div>
  );
};

StateSelection.propTypes = {
  handleOnChange: PropTypes.func,
  input: PropTypes.object,
  states: PropTypes.array,
  isFetchingStates: PropTypes.bool,
  isShipping: PropTypes.bool,
};

StateSelection.defaultProps = {
  handleOnChange: () => null,
  input: {},
  states: [],
  isFetchingStates: false,
  isShipping: true,
};

export default memo(StateSelection);
