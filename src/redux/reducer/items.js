import {
    ADD_ITEM
} from '../actionNames';

const initialState = {itemList: [], itemId: 0};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_ITEM:
            const { itemId } = state;
            const item = {
                id: itemId
            };
            return {
                ...state,
                itemList: [...state.itemList, item],
                itemId: itemId + 1
            };
        default:
            return state;
    }
}