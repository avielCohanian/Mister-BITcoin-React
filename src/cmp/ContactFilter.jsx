import { Component } from 'react';

export class ContactFilter extends Component {
  state = {
    filterBy: '',
    // phone: '',
  };

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.type === 'number' ? +target.value : target.value;
    this.setState({ [field]: value }, () => {
      this.props.onChangeFilter(this.state);
    });
  };

  render() {
    const { filterBy } = this.state;
    return (
      <form className="contact-filter  ">
        <section className="input-container">
          {/* <label htmlFor="filterBy">Search:</label> */}
          <input
            onChange={this.handleChange}
            value={filterBy}
            type="text"
            name="filterBy"
            id="filterBy"
            placeholder="Search"
            title="Search people by Name, Phone or Email"
          />
        </section>
      </form>
    );
  }
}
