class AddContactPage {
    
    addContact(contact) {
        this.getFirstNameInput().type(contact.firstName)
        this.getLastNameInput().type(contact.lastName)
        this.getBirthdateInput().type(contact.birthdate)
        this.getEmailInput().type(contact.email)
        this.getPhoneInput().type(contact.phone)
        this.getStreet1Input().type(contact.street1)
        this.getStreet2Input().type(contact.street2)
        this.getCityInput().type(contact.city)
        this.getStateInput().type(contact.stateProvince)
        this.getPostalCodeInput().type(contact.postalCode)
        this.getCountryInput().type(contact.country)
        this.getSubmitButton().click()
    }
    
    getFirstNameInput() {
      return cy.get('#firstName')
    }

    getLastNameInput() {
      return cy.get('#lastName')
    }

    getBirthdateInput() {
      return cy.get('#birthdate')
    }
    getEmailInput() {
      return cy.get('#email')
    }

    getPhoneInput() {
      return cy.get('#phone')
    }
    getStreet1Input() {
        return cy.get('#street1')
    }

    getStreet2Input() {
        return cy.get('#street2')
    }

    getCityInput() {
      return cy.get('#city')
    }
    getStateInput() {
      return cy.get('#stateProvince')
    }

    getPostalCodeInput() {
      return cy.get('#postalCode')
    }

    getCountryInput() {
      return cy.get('#country')
    }

    getSubmitButton() {
      return cy.get('#submit')
    }

    getCancelButton() {
      return cy.get('#cancel')
    }
  
  }
  
  export default AddContactPage