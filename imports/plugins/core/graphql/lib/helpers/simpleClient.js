import graphql from "graphql.js";
import { Accounts } from "meteor/accounts-base";
import { Reaction } from "/client/modules/core";
import updateFulfillmentOptionsForGroup from "../mutations/updateFulfillmentOptionsForGroup.graphql";
import createFlatRateFulfillmentMethod from "../mutations/createFlatRateFulfillmentMethod.graphql";
import updateFlatRateFulfillmentMethod from "../mutations/updateFlatRateFulfillmentMethod.graphql";
import deleteFlatRateFulfillmentMethod from "../mutations/deleteFlatRateFulfillmentMethod.graphql";
import enablePaymentMethodForShop from "../mutations/enablePaymentMethodForShop.graphql";
import placeOrderWithExampleIOUPayment from "../mutations/placeOrderWithExampleIOUPayment.graphql";
import placeOrderWithStripeCardPayment from "../mutations/placeOrderWithStripeCardPayment.graphql";
import availablePaymentMethods from "../queries/availablePaymentMethods.graphql";
import paymentMethods from "../queries/paymentMethods.graphql";

/**
 * In React components, you should use Apollo. This client is available for Blaze
 * components and other code, but ideally we will not need this forever.
 */

const client = graphql(Reaction.absoluteUrl("graphql-alpha"), { asJSON: true });

/**
 * @summary Sets the meteor-login-token header for all GraphQL requests done
 *   through simpleClient.
 * @returns {undefined}
 * @private
 */
function setTokenHeader() {
  const token = Accounts._storedLoginToken();
  if (token) {
    client.headers({ "meteor-login-token": token });
  } else {
    client.headers({});
  }
}

export default {
  createMutationFunction(mutation) {
    const cachedMutationFunction = client.mutate(mutation);
    return (variables) => {
      setTokenHeader();
      return cachedMutationFunction(variables);
    };
  },
  mutations: {
    createFlatRateFulfillmentMethod: (variables) => {
      setTokenHeader();
      return client.mutate(createFlatRateFulfillmentMethod)(variables);
    },
    deleteFlatRateFulfillmentMethod: (variables) => {
      setTokenHeader();
      return client.mutate(deleteFlatRateFulfillmentMethod)(variables);
    },
    enablePaymentMethodForShop: (variables) => {
      setTokenHeader();
      return client.mutate(enablePaymentMethodForShop)(variables);
    },
    placeOrderWithExampleIOUPayment: (variables) => {
      setTokenHeader();
      return client.mutate(placeOrderWithExampleIOUPayment)(variables);
    },
    placeOrderWithStripeCardPayment: (variables) => {
      setTokenHeader();
      return client.mutate(placeOrderWithStripeCardPayment)(variables);
    },
    updateFlatRateFulfillmentMethod: (variables) => {
      setTokenHeader();
      return client.mutate(updateFlatRateFulfillmentMethod)(variables);
    },
    updateFulfillmentOptionsForGroup: (variables) => {
      setTokenHeader();
      return client.mutate(updateFulfillmentOptionsForGroup)(variables);
    }
  },
  queries: {
    availablePaymentMethods: (variables) => {
      setTokenHeader();
      return client.query(availablePaymentMethods)(variables);
    },
    paymentMethods: (variables) => {
      setTokenHeader();
      return client.query(paymentMethods)(variables);
    }
  }
};
