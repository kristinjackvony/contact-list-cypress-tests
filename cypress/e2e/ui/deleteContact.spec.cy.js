import LoginPage from '../../support/pages/LoginPage'
import ContactListPage from '../../support/pages/ContactListPage'
import AddContactPage from '../../support/pages/AddContactPage'
import ContactDetailsPage from '../../support/pages/ContactDetailsPage'
import { buildContact } from "../../support/utils/contactBuilder"

describe('Delete Contact Tests', () => {

    const loginPage = new LoginPage()
    const contactListPage = new ContactListPage()
    const addContactPage = new AddContactPage()
    const contactDetailsPage = new ContactDetailsPage()

    const contact = buildContact()

    before(() => {
        loginPage.login()
        contactListPage.getAddContactButton().click()
        addContactPage.addContact(contact)
        contactListPage.getContactDetails(contact.firstName, contact.lastName)
    })

    it('can delete the contact', () => {
        contactDetailsPage.getDeleteContactButton().click()
        cy.on('window:confirm', () => true)
        contactListPage.visit()
        cy.contains(`${contact.firstName} ${contact.lastName}`).should('not.exist')
    })

})