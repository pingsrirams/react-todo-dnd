import React, { Component } from 'react';
import './App.css';
import RLDD from 'react-list-drag-and-drop/lib/RLDD';
import Header from './header';
import details from './details';

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      items: [],
      startIndex: 0,
      counter: 5
    };
    //binding this context to itemRenderer and handleRLDDChange
    this.itemRenderer = this.itemRenderer.bind(this);
    this.handleRLDDChange = this.handleRLDDChange.bind(this);
  }

  // Slicing only 5 items to loop through to store in "items".
  // Increasing counter by 5 so next time 10 objects will load.
  componentDidMount() {
    let items = details.slice(this.state.startIndex, this.state.counter);
    // console.log(items);
    this.setState(prevState => ({ items, startIndex: prevState.counter, counter: prevState.counter + 5 }));
  }

  onCheck = id => {
    details.map(element => {
      if (element.id === id) {
        element.completed = !element.completed;
        document.getElementById(id).style.textDecoration = element.completed ? "line-through" : "none"
      }
    });
    console.log(this.state.items);
  };

  showMore = () => { 
    let temp = this.state.items;
    let items = details.slice(this.state.startIndex, this.state.counter);
    temp.push(...items);
    this.setState(prevState => ({ items: temp, startIndex: prevState.counter, counter: prevState.counter + 5 }));
  };

  itemRenderer(item) {
    return (
      <div key={item.id} id={item.id} style={this.detailStyle}>
        <input
          type="checkbox"
          onChange={this.onCheck.bind(this, item.id)}
        >
        </input>
        {/* below openeing and closing tag for leaving space */}
        {" "}
        <span>{item.details}</span>
      </div>
    );
  }

  // From docs
  handleRLDDChange(reorderedItems) {
    this.setState({ items: reorderedItems });
  }

  // button css
  buttonStyle = {
    backgroundColor: "#f8de00",
    color: "white",
    minWidth: "100px",
    width: "auto",
    height: "30px",
    padding: "6px",
    fontWeight: "bold",
    borderRadius: "10%",
    border: "none",
    outline: "none"
  };

  // details css
  detailStyle = {
    backgroundColor: "f4f4f4",
    padding: "10px",
    borderBottom: "1px #ccc dotted",
    cursor: "grab"
  };
  
  render() {
    return (
      <div className="App">
        <Header />
        {/* third party library for making my list draggable and droppable */}
        {/* https://www.npmjs.com/package/react-list-drag-and-drop */}
        <RLDD
          items={this.state.items}
          itemRenderer={this.itemRenderer} // from docs
          onChange={this.handleRLDDChange} // from docs
        />
        {/* button to load more */}
        <button
          style={this.buttonStyle}
          onClick={this.showMore}
          disabled={this.state.items.length >= details.length ? true : false}
        >
          {this.state.items.length >= details.length ? "End of List" : "Load More"}
        </button>
      </div>
    )
  }
}

export default App;
