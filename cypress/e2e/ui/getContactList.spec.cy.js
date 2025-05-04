import LoginPage from '../../support/pages/LoginPage'
import ContactListPage from '../../support/pages/ContactListPage'

describe('Contact List Page Tests', () => {

	const loginPage = new LoginPage()
	const contactListPage = new ContactListPage()

	beforeEach(() => {
		loginPage.login()
	})

	it('should display the contact list page correctly', () => {
		cy.get('h1').contains('Contact List')
		contactListPage.getAddContactButton().should('exist')
		cy.get('#logout').should('exist')
	})

	it('should display the contact list table', () => {
		contactListPage.getContactListTable().should('exist')
		cy.get('th').contains('Name')
		cy.get('th').contains('Birthdate')
		cy.get('th').contains('Email')
		cy.get('th').contains('Phone')
		cy.get('th').contains('Address')
		cy.get('th').contains('City, State/Province, Postal Code')
		cy.get('th').contains('Country')
		cy.get('.contactTableBodyRow').should('have.length.greaterThan', 0)
	})

})