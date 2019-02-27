import { stripe } from './config'; 
import { assert, catchErrors } from './helpers';

import * as functions from 'firebase-functions';


/**
Returns a coupon from Stripe
*/
export function getCoupon(coupon: string) {
    return stripe.coupons.retrieve(coupon);
}


export const stripeGetCoupon= functions.https.onCall( async (data, context) => {
    const coupon = assert(data, 'coupon');
    return catchErrors(getCoupon(coupon));
});
  