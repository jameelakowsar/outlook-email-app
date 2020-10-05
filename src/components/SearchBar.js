import React from 'react';

export class SearchBar extends React.Component{    
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
    };
  }
  render() {
    return (
      <form className="example">
        <input
          type="text"
          placeholder="Search mail and people"
          name="search"
          onChange={this.onChange}
          value={this.state.searchValue}
        />
        <button type="submit">
          <i className="fa fa-search" />
        </button>
      </form>
    );
  }

  onChange = (event) => {
    let searchValue = event.target.value;
    this.setState({ searchValue });
    searchValue = searchValue.trim();
    if (searchValue.length === 1) {
      return;
    }
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.props.onSearch(searchValue.trim());
    }, 1000);
  };
}
