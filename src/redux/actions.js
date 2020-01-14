import {
    ADD_ITEM
} from './actionNames';

export const addItem = (content) => ({
    type: ADD_ITEM,
    payload: content
});
