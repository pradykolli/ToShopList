import React , { Component } from 'react';
import { Container , ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition , TransitionGroup} from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../Actions/itemActions'
import itemReducer from '../Reducers/itemReducer';
import PropTypes from 'prop-types';
// import { state } from 'fs';

class ShoppingList extends Component{
    componentDidMount(){
        this.props.getItems();
    }
    onDeleteClick = (id) => {
        this.props.deleteItem(id);
    }
    render(){
        // We are destructuring the items
        const { items } =  this.props.item;
        return(
            <Container>
                {
                    /* <Button 
                color="dark" 
                style={{marginBottom: '2rem'}}
                onClick = { () => {
                    const name = prompt('Enter Item');
                    if(name){
                        this.setState(state => ({
                            // Taking in the current items list using spread operator ... and adding in new item that we prompted.
                            items: [...state.items,{ id: uuid(), name}]
                        }));
                    }
                }}
                >Add Item</Button> */}
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({_id,name}) =>(
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button
                                     className = "remove-btn"
                                     color = 'danger'
                                     size = "sm"
                                     onClick ={this.onDeleteClick.bind(this,_id)}
                                    >&times;</Button>
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}
ShoppingList.propTypes = {
    getItems : PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}
const mapStateToProps = (state) =>({
    item : state.item
});
export default connect(mapStateToProps,{ getItems, deleteItem })(ShoppingList);