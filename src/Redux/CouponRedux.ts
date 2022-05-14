import { CouponAction } from "../Actions/Actions/CouponActions";
import { ActionType } from "../Actions/ActionType";
import { couponModel } from "../Model/CouponModel";

export class CouponAppState {
  public coupons: couponModel[] = [];
}

export function tryGetAllCouponsGuest(coupons: couponModel[]): CouponAction {
  return { type: ActionType.GET_ALL_COUPONS_GUEST, payload: coupons };
}

export function couponsReducer(
  currentState: CouponAppState = new CouponAppState(),
  action: CouponAction
): CouponAppState {
  const newState = { ...currentState };

  switch (action.type) {
    case ActionType.GET_ALL_COUPONS_GUEST:
      newState.coupons = action.payload;
      break;
  }

  return newState;
}
