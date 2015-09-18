module.exports = {

  friendlyName: 'Create a new card token',
  description: 'Creates a single use token for a credit card.',
  extendedDescription: 'Creates a single use token that wraps the details of a credit card. This token can be used in place of a credit card object with any API method. These tokens can only be used once: by creating a new charge object, or attaching them to a customer.',
  cacheable: false,

  inputs: {

    apiKey: {
      description: 'Your Stripe API key',
      whereToGet: {
        url: 'https://dashboard.stripe.com/account/apikeys',
        description: 'Copy either "Test Secret Key" or "Live Secret Key" from your Stripe dashboard.',
        extendedDescription: 'Make sure you are logged in to your Stripe account, or create an account if you have not already done so.'
      },
      example: 'somestring837483749blah',
      required: true
    },

    cardNumber: {
      description: 'Credit card number',
      whereToGet: {
        url: 'https://stripe.com/docs/testing#cards',
        description: 'The card number, as a string without any separators.',
        extendedDescription: 'The Stripe testing docs list credit card numbers that fail or succeed in predeteremined ways.'
      },
      example: '4242424242424242',
      required: true
    },

    expMonth: {
      description: 'Expiration month',
      whereToGet: {
        url: 'https://stripe.com/docs/testing#cards',
        description: 'Two digit number representing the card\'s expiration month.',
        extendedDescription: 'The stripe testing cards accept any date in the future.'
      },
      example: 12,
      required: true
    },

    expYear: {
      description: 'Expiration year',
      whereToGet: {
        url: 'https://stripe.com/docs/testing#cards',
        description: 'Two or four digit number representing the card\'s expiration year.',
        extendedDescription: 'The stripe testing cards accept any date in the future.'
      },
      example: 2020,
      required: true
    },

    cvc: {
      description: 'CVC',
      whereToGet: {
        url: 'https://stripe.com/docs/testing#cards',
        description: 'Card security code.',
        extendedDescription: 'The stripe testing cards accept any 3 digit combination.'
      },
      example: 123,
      required: true
    }

  },

  defaultExit: 'success',

  exits: {
    error: {
      description: 'Unexpected error',
      variableName: 'err'
    },
    success: {
      description: 'New card token was created',
      variableName: 'newToken',
      example: {
        id: 'tok_16mO8zH3RtMvL54SBlXjudIq'
      }
    } 
  },

  fn: function (inputs, exits) {

    var stripe = require('stripe')(inputs.apiKey);

    stripe.tokens.create({
      card: {
        number: inputs.cardNumber,
        exp_month: inputs.expMonth,
        exp_year: inputs.expYear,
        cvc: inputs.cvc
      }
    }, function(err, token) {
      if (err) return exits.error(err);
      return exits.success(token);
    });

  }

};
