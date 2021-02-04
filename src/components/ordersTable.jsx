import React, { Component } from 'react';
import Table from './common/table';

class OrdersTable extends Component {

    columns = [
        { path: 'orderId', label: 'Order Id', enableSort: false},
        { path: 'customerId', label: 'Cust Id', enableSort: false},
        { path: 'deliveryPincode', label: 'Pin Code', enableSort: true},
        { path: 'orderDate', label: 'Order Date', enableSort: true},
        { path: 'items', label: 'Items', enableSort: false}
    ]
    
    render() { 
        const {orders, onSort, sortColumn} = this.props 

        return (
            <> 
            {this.props.children}
            <Table columns={this.columns} sortColumn={sortColumn} onSort={onSort} data={orders} />
            </>
         );
    }
}
 
export default OrdersTable;