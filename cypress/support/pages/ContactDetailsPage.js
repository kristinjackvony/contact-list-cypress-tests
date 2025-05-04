class ContactDetailsPage {
    
    getFirstName() {
      return cy.get('#firstName')
    }

    getLastName() {
      return cy.get('#lastName')
    }

    getBirthdate() {
      return cy.get('#birthdate')
    }
    getEmail() {
      return cy.get('#email')
    }

    getPhone() {
      return cy.get('#phone')
    }
    getStreet1() {
        return cy.get('#street1')
    }

    getStreet2() {
        return cy.get('#street2')
    }

    getCity() {
      return cy.get('#city')
    }
    getState() {
      return cy.get('#stateProvince')
    }

    getPostalCode() {
      return cy.get('#postalCode')
    }

    getCountry() {
      return cy.get('#country')
    }

    getEditContactButton() {
      return cy.get('#edit-contact')
    }

    getDeleteContactButton() {
        return cy.get('#delete')
    }

    getReturnToListButton() {
        return cy.get('#return')
    }
  
  }
  
  export default ContactDetailsPage