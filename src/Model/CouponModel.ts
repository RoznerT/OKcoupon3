export class CouponModel {
  
  public id: number = 0;
  public companyName: string = "";
  public category: string = "";
  public title: string = "";
  public description: string = "";
  public startDate: number = 0;
  public endDate: number = 0;
  public amount: number = 0;
  public price: number = 0;
  public image: string = "";
  
}
/*
export class CouponsAppState {
  public coupons: CouponModel[] = [];
}

export enum CouponsActionType {
  CouponsDownloaded = "CouponsDownloaded",
  CouponAdded = "CouponAdded",
  CouponUpdated = "CouponUpdated",
  CouponDeleted = "CouponDeleted"
}

export interface CouponAction {
  type: CouponsActionType;
  payload?: any;
}

export function couponsDownloadedAction(coupons: CouponModel[]): CouponAction {
  return { type: CouponsActionType.CouponsDownloaded, payload: coupons };
}

export function couponsAddedAction(coupon: CouponModel): CouponAction {
  return { type: CouponsActionType.CouponAdded, payload: coupon };
}

export function couponsUpdatedAction(coupon: CouponModel): CouponAction {
  return { type: CouponsActionType.CouponUpdated, payload: coupon };
}

export function couponsDeletedAction(id:number): CouponAction {
  return { type: CouponsActionType.CouponDeleted, payload: id };
}

export function couponsReducer(currentState: CouponsAppState = new CouponsAppState(),action:CouponAction): CouponsAppState{
  // const newState = new CatsAppState();

  const newState = {...currentState} //Spread Operator
  switch(action.type){
      case CouponsActionType.CouponsDownloaded:
          newState.coupons = action.payload;
          break;
      case CouponsActionType.CouponAdded:
          newState.coupons.push(action.payload);
          break;
      case CouponsActionType.CouponUpdated:
          //  const idx = newState.cats.filter(c => c.id === action.payload.id);
          //  newState.cats[idx]=action.payload;    
          break
          case CouponsActionType.CouponDeleted:
              //  const idx = newState.cats.filter(c => c.id === action.payload.id);
               // newState.cats.fil
              break
  }
  return newState;
  
}*/