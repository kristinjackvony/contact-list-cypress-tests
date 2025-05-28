import LoginPage from '../../support/pages/LoginPage'
import ContactListPage from '../../support/pages/ContactListPage'
import AddContactPage from '../../support/pages/AddContactPage'
import ContactDetailsPage from '../../support/pages/ContactDetailsPage'
import { buildContact } from "../../support/utils/contactBuilder"

describe('Get Contact Details Tests', () => {

    const loginPage = new LoginPage()
    const contactListPage = new ContactListPage()
    const addContactPage = new AddContactPage()
    const contactDetailsPage = new ContactDetailsPage()

    const contact = buildContact()

    before(() => {
        //loginPage.login()
        //contactListPage.getAddContactButton().click()
        cy.authenticate()
        cy.addContact(contact)
        //addContactPage.addContact(contact)
    })
    
	beforeEach(() => {
        loginPage.login()
        contactListPage.getContactDetails(contact.firstName, contact.lastName)
	})

    it('should display the Edit Contact, Delete Contact, and Return to List buttons', () => {
        contactDetailsPage.getEditContactButton().should('exist')
        contactDetailsPage.getDeleteContactButton().should('exist')
        contactDetailsPage.getReturnToListButton().should('exist')
    })

    it('should display the contact details', () => {
        contactDetailsPage.getFirstName().should('contain', contact.firstName)
        contactDetailsPage.getLastName().should('contain', contact.lastName)
        contactDetailsPage.getBirthdate().should('contain', contact.birthdate)
        contactDetailsPage.getEmail().should('contain', contact.email)
        contactDetailsPage.getPhone().should('contain', contact.phone)
        contactDetailsPage.getStreet1().should('contain', contact.street1)
        contactDetailsPage.getStreet2().should('contain', contact.street2)
        contactDetailsPage.getCity().should('contain', contact.city)
        contactDetailsPage.getState().should('contain', contact.stateProvince)
        contactDetailsPage.getPostalCode().should('contain', contact.postalCode)
        contactDetailsPage.getCountry().should('contain', contact.country)
    })

    it('should navigate back to the contact list', () => {
        contactDetailsPage.getReturnToListButton().click()
        cy.url().should('include', '/contactList')
        contactListPage.getContactListTable().should('exist')
    })

    // Cleanup: Delete the contact after all tests
    after(() => {
        contactListPage.getContactDetails(contact.firstName, contact.lastName)
        contactDetailsPage.getDeleteContactButton().click()
        cy.on('window:confirm', () => true)
    })

})