class EditContactPage {
    
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
  
export default EditContactPage