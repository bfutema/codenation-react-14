function isName(contact, name) {
  return contact.name.toUpperCase().includes(name.toUpperCase());
}

function filterByName(contacts, name) {
  return contacts.filter(contact => isName(contact, name));
}

function orderByName(contacts) {
  return contacts.sort(function (a, b) {
    return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
  });
}

function orderContacts(contacts, typeOrder) {
  let orderedContacts = [];

  switch (typeOrder) {
    case 0 : contacts = orderByName(contacts); break;
    default : break;
  }

  return orderedContacts;
}

export {
  isName,
  filterByName,
  orderContacts,
};