class ContactListPage {
  	visit() {
    	cy.visit('https://thinking-tester-contact-list.herokuapp.com/contactList')
		cy.get('#myTable', { timeout: 3000 }).should('be.visible')
  	}
  
  	getAddContactButton() {
    	return cy.get('#add-contact')
  	}

  	getContactListTable() {
    	return cy.get('#myTable')
  	}

  	getContactDetails(firstName, lastName) {
    	cy.contains(`${firstName} ${lastName}`).click()
  	}
	
}

export default ContactListPage