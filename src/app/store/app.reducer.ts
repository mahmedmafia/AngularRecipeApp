import * as fromShoppingList from '../ShoppingList/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';
export interface AppState {
    shoppingList: fromShoppingList.ShoppingListState;
    auth: fromAuth.authState;
}
export const appReducers: ActionReducerMap<AppState> = {
    shoppingList: fromShoppingList.shoppingListReducer,
    auth: fromAuth.authReducer
};
