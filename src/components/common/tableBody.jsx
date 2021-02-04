import _ from 'lodash';

const TableBody = props => {

    const {data, columns} = props;
    const formatItems = item => item.replace(/:/g, " - ").replace(/;/g, '\n')

    const renderCell = (item, column) => {
        return column.path === 'items' ? formatItems(_.get(item, column.path)) : _.get(item, column.path);
    }

    return ( 
        <tbody>
            {data.map((item, index) => (
                <tr key={index}>
                    {columns.map(column => <td key={index + column.path}>{renderCell(item, column)}</td>)}
                </tr>
            ))}
        </tbody>
     );
}
 
export default TableBody;
