import { Component } from 'react';
import shortid from 'shortid';

import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList';
import { Title, FormSet } from './App.styled';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  formSubmitHandle = ({ name, number }) => {
    const { contacts } = this.state;
    const contactsNames = contacts.map(contact => contact.name);

    if (contactsNames.includes(name)) {
      return alert(`${name} is already in contacts`);
    } else {
      const newContact = {
        id: shortid.generate(),
        name,
        number,
      };

      this.setState(prevState => ({
        contacts: [newContact, ...prevState.contacts],
      }));
    }
  };

  handleFilter = e => {
    const filterValue = e.currentTarget.value.toLowerCase();
    console.log(filterValue);
    this.setState({ filter: filterValue });
  };

  filterContacts = data => {
    const { filter } = this.state;
    let filteredContactsList = [];

    data.filter(contact => {
      if (contact.name.toLowerCase().includes(filter)) {
        return filteredContactsList.push(contact);
      } else {
        return filteredContactsList;
      }
    });
    return filteredContactsList;
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContactsList = this.filterContacts(contacts);

    return (
      <FormSet>
        <Title>Phonebook</Title>
        <ContactForm onSubmit={this.formSubmitHandle} />

        <Title>Contacts</Title>
        <Filter value={filter} onChange={this.handleFilter} />
        <ContactList
          contacts={filteredContactsList}
          onClick={this.deleteContact}
        />
      </FormSet>
    );
  }
}
