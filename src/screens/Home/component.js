import React, { Component } from 'react';
import { includes, find, times, uniqBy, union } from 'lodash';
import { mockData } from '../../mockData'
import './styles.css';

export default class HomeScreen extends Component {
    state = {
        searchText: '',
        cartItems: [],
        itemQuantity: 0,
        searchResults: [],
        showCart: false,
    }

    handleChangeText = text => {
        this.setState({ searchText: text }, () => {
            const results = mockData.find(el => el.item_name.toLowerCase().includes(text))
            console.log({results})
            this.setState({ searchResults: [...this.state.searchResults, results] })
        })
    }

    handleQtyText = qty => {
        this.setState({ itemQuantity: parseInt(qty, 10)})
    }

    handleAdd = (e, itemId) => {    
        e.preventDefault();
        this.setState({
            cartItems: [...this.state.cartItems, itemId]
        }, () => console.log(this.state.cartItems)
)
    }
    handleSubtract = (e, itemId) => {    
        e.preventDefault();
        const { cartItems } = this.state;
        let matchedItems = cartItems.filter(el => el === itemId)
        matchedItems.pop();
        this.setState({
            cartItems: matchedItems
        }, () => console.log(this.state.cartItems)
)
    }

    toggleCart = () => {
        this.setState({
            showCart: !this.state.showCart
        }, () => console.log(this.state.showCart))
    }

    renderCart = () => {
            const uniqueItemIds = uniqBy(this.state.cartItems, Math.floor)
            const itemsToRender = mockData.filter(el => uniqueItemIds.includes(el.id))

            return itemsToRender.map(el => (
                <div>
                    <img className="item" alt="item" src={el.image} />
                    <p className="product-name">{el.item_name}</p>
                    <p className="product-description">{el.item_description}</p>
                    <p className="product-price">{el.item_price}</p>
                    <p>Amount: {this.state.cartItems.filter(item => item === el.id).length}</p>
                    <button onClick={e => this.handleAdd(e, el.id)} className="cart-add-buton"><span> + </span></button>
                    <button onClick={e => this.handleSubtract(e, el.id)} className="cart-add-buton"><span> - </span></button>
                </div>
            ))
    }

    render() {
        const { searchText, searchResults, showCart } = this.state;
        return (
            <div className="container">
                <header className="header">
                    <p className="store-title">Home</p>                    
                    <button onClick={e => this.toggleCart(e)} className="cart-buton"><span>View Cart</span></button>
                    <p>Items in cart {this.state.cartItems.length}</p>
                </header>
                <div>
                    <input onChange={e => this.handleChangeText(e.target.value)} type="text" placeholder="Search..." />
                </div>
               { showCart && ( 
               <div className="cart">
                 <button onClick={e => this.toggleCart(e)} className="cart-buton"><span>Close Cart</span></button>

                    {this.renderCart()}
                </div>)}
                <div className="item-container">
                    {(searchText.length === 0) && (searchResults.length === 0) && (
                        mockData.map(el => {
                        
                        return (
                            <div>
                                <img className="item" alt="item" src={el.image}/>
                                <p className="product-name">{el.item_name}</p>
                                <p className="product-description">{el.item_description}</p>
                                <p className="product-price">{el.item_price}</p>
                                <input onChange={e => this.handleQtyText(e.target.value)} type="text" placeholder="1" />
                                <button onClick={e => this.handleAdd(e, el.id)} className="cart-add-buton"><span>Add to cart</span></button>
                            </div>

                        )
                    }))}
                    {searchResults.length > 0 && (
                        searchResults.map(el => {
                        
                        return (
                            <div>
                                <img className="item" alt="item" src={el.image}/>
                                <p className="product-name">{el.item_name}</p>
                                <p className="product-description">{el.item_description}</p>
                                <p className="product-price">{el.item_price}</p>
                                <input onChange={e => this.handleQtyText(e.target.value)} type="text" placeholder="1" />
                                <button onClick={e => this.handleAdd(e, el.id)} className="cart-add-buton"><span>Add to cart</span></button>
                            </div>

                        )
                    }))}
                </div>
            </div>
        );
    }
}

