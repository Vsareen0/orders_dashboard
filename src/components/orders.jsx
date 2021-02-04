import React, { Component } from 'react';
import OrdersTable from './ordersTable';
import getOrders from '../services/orders';


class Orders extends Component {
    state = {
        orders: [],
        filteredOrders: [],
        filter: {
            pincode: '',
            date: ''
        },
        sortColumn: { path: 'orderId', order: 'asc'}
    };

    handleSort = sortColumn => {
        this.setState({ sortColumn })
    }

    handlePinChange = e => {
        this.setState(prevState => ({ filter: { ...prevState.filter, pincode: e.target.value} }), this.filterOrders);
    }

    handleDateChange = e => {
        let filterDate = new Date(e.target.value);
        let month = filterDate.getMonth()+1;
        let day = filterDate.getDate() <= 9 ? `0${filterDate.getDate()}` : filterDate.getDate();
        let year = filterDate.getFullYear();
        filterDate = day+'/'+month+'/'+year;

        this.setState(prevState => ({ filter: { ...prevState.filter, date: filterDate} }), this.filterOrders);   
    }

    filterOrders = () => {
        let {orders, filter} = this.state;

        let filteredOrders = orders.filter(order =>  (filter.pincode !== '' && order.deliveryPincode.includes(filter.pincode)) 
                                                    ||  (filter.date !== '' && order.orderDate === filter.date));
        this.setState({ filteredOrders })
    }

    comparePath = (a,b) => {
        const { path, order } = this.state.sortColumn;

        if(order === 'asc'){
            if(a[path] < b[path]){
                return -1;
            }
            if(a[path] > b[path]){
                return 1;
            }
            return 0;
        } else {
            if(a[path] > b[path]){
                return -1;
            }
            if(a[path] < b[path]){
                return 1;
            }
            return 0;
        }
    }

    render() { 
        const {filteredOrders, sortColumn} = this.state;
        const sorted = filteredOrders.sort(this.comparePath);

        return ( 
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-3">
                        <div className="input-group my-3">
                            <span className="input-group-text">Pincode: </span>
                            <input
                                className="form-control"
                                aria-label="Pincode"
                                value={this.state.filter.pincode || ''} 
                                onChange={this.handlePinChange} />
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="input-group my-3">
                            <span className="input-group-text">Date: </span>
                            <input
                                type="date" 
                                className="form-control" 
                                aria-label="Date"
                                value={this.state.filter.date || ''}
                                onChange={this.handleDateChange} />
                        </div>
                    </div>
                </div>
                <OrdersTable orders={sorted} onSort={this.handleSort} sortColumn={sortColumn}>
                    {sorted.length === 0 ? <p>There are no orders in the database.</p> : ''}
                </OrdersTable>
            </div>
       );
    }


    componentDidMount(){
        getOrders()
        .then(res => {
            if(res.status === 200){
                this.setState({ orders: res.data, filteredOrders: res.data })
            } else {
                console.error(`error: ${res.status}`);
            }
        })
        .catch(err => console.log(err))
    }
}
 
export default Orders;