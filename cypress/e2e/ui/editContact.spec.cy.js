import LoginPage from '../../support/pages/LoginPage'
import ContactListPage from '../../support/pages/ContactListPage'
import AddContactPage from '../../support/pages/AddContactPage'
import ContactDetailsPage from '../../support/pages/ContactDetailsPage'
import EditContactPage from '../../support/pages/EditContactPage'
import { buildContact } from "../../support/utils/contactBuilder"

describe('Edit Contact Tests', () => {

    const loginPage = new LoginPage()
    const contactListPage = new ContactListPage()
    const addContactPage = new AddContactPage()
    const contactDetailsPage = new ContactDetailsPage()
    const editContactPage = new EditContactPage()

    const contact = buildContact()
    
	beforeEach(() => {
        loginPage.login()
        contactListPage.getAddContactButton().click()
        addContactPage.addContact(contact)
        contactListPage.getContactDetails(contact.firstName, contact.lastName)
        contactDetailsPage.getEditContactButton().click()
	})

    it('can update the contact', () => {
        const updatedContact = buildContact()

        editContactPage.getFirstNameInput().clear().type(updatedContact.firstName)
        editContactPage.getLastNameInput().clear().type(updatedContact.lastName)
        editContactPage.getBirthdateInput().clear().type(updatedContact.birthdate)
        editContactPage.getEmailInput().clear().type(updatedContact.email)
        editContactPage.getPhoneInput().clear().type(updatedContact.phone)
        editContactPage.getStreet1Input().clear().type(updatedContact.street1)
        editContactPage.getStreet2Input().clear().type(updatedContact.street2)
        editContactPage.getCityInput().clear().type(updatedContact.city)
        editContactPage.getStateInput().clear().type(updatedContact.stateProvince)
        editContactPage.getPostalCodeInput().clear().type(updatedContact.postalCode)
        editContactPage.getCountryInput().clear().type(updatedContact.country)

        editContactPage.getSubmitButton().click()

        contactDetailsPage.getFirstName().should('contain', updatedContact.firstName)
        contactDetailsPage.getLastName().should('contain', updatedContact.lastName)
        contactDetailsPage.getBirthdate().should('contain', updatedContact.birthdate)
        contactDetailsPage.getEmail().should('contain', updatedContact.email)
        contactDetailsPage.getPhone().should('contain', updatedContact.phone)
        contactDetailsPage.getStreet1().should('contain', updatedContact.street1)
        contactDetailsPage.getStreet2().should('contain', updatedContact.street2)
        contactDetailsPage.getCity().should('contain', updatedContact.city)
        contactDetailsPage.getState().should('contain', updatedContact.stateProvince)
        contactDetailsPage.getPostalCode().should('contain', updatedContact.postalCode)
        contactDetailsPage.getCountry().should('contain', updatedContact.country)

        // Cleanup: Delete the contact
        contactDetailsPage.getDeleteContactButton().click()
        cy.on('window:confirm', () => true)

    })

    it('can cancel editing the contact', () => {
        const updatedContact = buildContact()

        editContactPage.getFirstNameInput().clear().type(updatedContact.firstName)
        editContactPage.getLastNameInput().clear().type(updatedContact.lastName)
        editContactPage.getCancelButton().click()
        contactListPage.visit()
        contactListPage.getContactListTable().should('not.contain', updatedContact.firstName)

        // Cleanup: Delete the original contact
        contactListPage.getContactDetails(contact.firstName, contact.lastName)
        contactDetailsPage.getDeleteContactButton().click()
        cy.on('window:confirm', () => true)
    })

})