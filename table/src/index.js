import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class ProductCategory extends React.Component {
  render() {
    const product1 = this.props.category;
    return (<tr><th colspan='2' >{product1}</th></tr>);
  }
}

class ProductRow extends React.Component {

  render() {
    const product3 = this.props.product2;
  const name = product3.stocked ? product3.name:
               <span style={{color: 'red'}}>{product3.name}</span>;
    return (
            <tr>
              <td>{name}</td>
              <td>{product3.price}</td>
            </tr>
            );
  }
}



class ProductTable extends React.Component {
  render() {
    const rows=[];
    let lastCategory = null;
    const filter = this.props.searchValue;
    const inStockedOnly = this.props.stockValue;

    this.props.products.forEach((product) => {

      if(product.name.indexOf(filter) === -1){
        return;
      }
      if(inStockedOnly && !product.stocked){
        return;
      }
      if(product.category !== lastCategory){
        rows.push(<ProductCategory category={product.category}  />);
      }
      rows.push(<ProductRow product2={product} />);
      lastCategory = product.category;
    });
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>

    );
  }
}

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.handleClickValue = this.handleClickValue.bind(this);
  }
  handleClickValue(e){
    this.props.onClick(e.target.checked);
  }
  handleChangeValue(e){
    this.props.onChange(e.target.value);
  }
  render() {
    return (
      <div>
        <form>
          <p className="para2">
            <input type="text" placeholder="Search..." value={this.props.searchValue} onChange={this.handleChangeValue}/>
          </p>
          <p className="para1">
            <input type="checkbox" checked={this.props.stockValue} onClick={this.handleClickValue} />
            Only show products in stock
          </p>
        </form>
      </div>
    );
  }
}


class FilterableProductTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchValue: '',
      stockedOnly: false,
      }
      this.handleChangeValue = this.handleChangeValue.bind(this);
      this.handleClickValue = this.handleClickValue.bind(this);
  }
  handleChangeValue(filter){
    this.setState({
      searchValue: filter,
    });
  }
  handleClickValue(stockedChanged){
    this.setState({
        stockedOnly: stockedChanged,
    });
  }
  render() {
    return (
      <div>
        <SearchBar searchValue={this.state.searchValue} stockValue={this.state.stockedOnly} onChange={this.handleChangeValue} onClick={this.handleClickValue} />
        <ProductTable products={this.props.products} searchValue={this.state.searchValue} stockValue={this.state.stockedOnly}/>
      </div>
    );
  }
}

const PRODUCTS = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

ReactDOM.render(<FilterableProductTable products={PRODUCTS} />, document.getElementById("root"));
