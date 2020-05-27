import React from 'react';

import Topbar from './components/Topbar';
import Filters from './components/Filters';
import Contacts from './components/Contacts';
import Contact from './components/Contact';
import Loading from './components/Loading';

import { filterByName } from './utils';

import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: [],
      hasFilter: false,
      contactsFiltered: [],
      sortBy: '',
      contactsSorted: [],
    };
  }

  handleFilter = name => {
    const { contacts } = this.state;

    if (name.length > 0) {
      const filteredContacts = filterByName(contacts, name);

      this.setState({
        ...this.state,
        hasFilter: true,
        contactsFiltered: filteredContacts,
      });
    } else {
      this.setState({
        ...this.state,
        hasFilter: false,
        contactsFiltered: [],
      });
    }
  }

  handleOrderByValue = value => {
    const compareValues = (key, order = 'asc') => {
      return function sortObjects(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          return 0;
        }

        const letA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
        const letB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

        let compare = 0;

        if (letA > letB) compare = 1;
        else if (letA < letB) compare = -1;

        return order === 'desc' ? compare * -1 : compare;
      };
    };

    const { contacts, sortBy } = this.state;

    let valueSort;
    let contactsSorted;

    if (value === sortBy) {
      valueSort = '';
      contactsSorted = [...contacts];
    } else {
      valueSort = value;
      contactsSorted = contacts.sort(compareValues(value));
    }

    this.setState({
      ...this.state,
      hasFilter: false,
      contactsFiltered: [],
      sortBy: valueSort,
      contactsSorted,
    });
  }

  componentDidMount() {
    fetch('https://5e82ac6c78337f00160ae496.mockapi.io/api/v1/contacts')
      .then(response => response.json())
      .then(contacts => this.setState({ contacts }));
  }

  render() {
    const {
      contacts,
      hasFilter,
      contactsFiltered,
      sortBy,
      contactsSorted,
    } = this.state;

    let outputContacts;

    if (!hasFilter) {
      if (contacts.length > 0 && contactsSorted.length > 0) {
        outputContacts = contactsSorted.map(contact => (
          <Contact key={contact.id} data={contact}/>
        ));
      } else if (contacts.length > 0 && contactsSorted.length === 0) {
        outputContacts = contacts.map(contact => (
          <Contact key={contact.id} data={contact}/>
        ));
      } else {
        outputContacts = <Loading />;
      }
    } else {
      outputContacts = contactsFiltered.map(contact => (
        <Contact key={contact.id} data={contact}/>
      ));
    }

    return (
      <div data-testid="app" className="app">
        <Topbar />

        <Filters
          onChange={this.handleFilter}
          handleSort={this.handleOrderByValue}
          filterSelected={sortBy}
        />

        <Contacts>{outputContacts}</Contacts>

      </div>
    );
  }
}

export default App;
