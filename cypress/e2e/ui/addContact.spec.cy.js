import LoginPage from '../../support/pages/LoginPage'
import ContactListPage from '../../support/pages/ContactListPage'
import AddContactPage from '../../support/pages/AddContactPage'
import ContactDetailsPage from '../../support/pages/ContactDetailsPage'
import { buildContact } from "../../support/utils/contactBuilder"

describe('Add Contact Tests', () => {

    const loginPage = new LoginPage()
    const contactListPage = new ContactListPage()
    const addContactPage = new AddContactPage()
    const contactDetailsPage = new ContactDetailsPage()
    const contact = buildContact()

	beforeEach(() => {
		loginPage.login()
	})

    it('can add a new contact', () => {
        contactListPage.getAddContactButton().click()

        addContactPage.getFirstNameInput().type(contact.firstName)
        addContactPage.getLastNameInput().type(contact.lastName)
        addContactPage.getBirthdateInput().type(contact.birthdate)
        addContactPage.getEmailInput().type(contact.email)
        addContactPage.getPhoneInput().type(contact.phone)
        addContactPage.getStreet1Input().type(contact.street1)
        addContactPage.getStreet2Input().type(contact.street2)
        addContactPage.getCityInput().type(contact.city)
        addContactPage.getStateInput().type(contact.stateProvince)
        addContactPage.getPostalCodeInput().type(contact.postalCode)
        addContactPage.getCountryInput().type(contact.country)
        addContactPage.getSubmitButton().click()

        contactListPage.getContactListTable().should('contain', contact.firstName)
        contactListPage.getContactDetails(contact.firstName, contact.lastName)

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

        // Cleanup: Delete the contact
        contactDetailsPage.getDeleteContactButton().click()
        cy.on('window:confirm', () => true)
    })

    it('can cancel adding a new contact', () => {
        const cancelContact = buildContact()
        
        contactListPage.getAddContactButton().click()
        addContactPage.getFirstNameInput().type(cancelContact.firstName)
        addContactPage.getLastNameInput().type(cancelContact.lastName)
        addContactPage.getCancelButton().click()
        contactListPage.getContactListTable().should('not.contain', cancelContact.firstName)
    })

    it('returns an approprate error message when adding a contact with a missing first name', () => {
        contactListPage.getAddContactButton().click()
        addContactPage.getLastNameInput().type(contact.lastName)
        addContactPage.getSubmitButton().click()
        cy.get('#error').invoke('text').should('contain', '`firstName` is required')
    })

    it('returns an approprate error message when adding a first name with too many characters', () => {
        contact.firstName = 'Abcdefghijklmnopqrstu'

        contactListPage.getAddContactButton().click()
        addContactPage.getFirstNameInput().type(contact.firstName)
        addContactPage.getLastNameInput().type(contact.lastName)
        addContactPage.getSubmitButton().click()
        cy.get('#error').invoke('text').should('contain', '`firstName` (`Abcdefghijklmnopqrstu`) is longer than the maximum allowed length (20)')
    })
})