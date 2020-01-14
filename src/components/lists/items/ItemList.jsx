import React, {Component} from 'react';
import {connect} from 'react-redux';
import Item from './item/Item';
import { addItem } from "../../../redux/actions";
import styles from './ItemList.css';

function mapStateToProps(state) {
    const {itemList} = state.items;
    return {
        itemList
    };
}

class ItemList extends Component {
    constructor(props) {
        super(props);
        this.handleAddItemClick = this.handleAddItemClick.bind(this);
    }


    handleAddItemClick() {
        this.props.addItem();
    }

    render() {
        const { itemList } = this.props;
        return (
            <div className="ItemListPanel">
                <div>
                    {
                        itemList.map(item => <Item key={item.id} id={item.id} />)
                    }
                </div>
                <div>
                    <button className="AddItemButton" onClick={this.handleAddItemClick}>Add item</button>
                </div>

            </div>
        );
    }
}

export default connect(
    mapStateToProps, { addItem }
)(ItemList);