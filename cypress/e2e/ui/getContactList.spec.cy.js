import LoginPage from '../../support/pages/LoginPage'
import ContactListPage from '../../support/pages/ContactListPage'

describe('Contact List Page Tests', () => {

	const loginPage = new LoginPage()
	const contactListPage = new ContactListPage()

	beforeEach(() => {
		loginPage.login()
	})

	it('should display the contact list page', () => {
		cy.get('h1').contains('Contact List')
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
	})

	it('should display the contact list table with data', () => {
		cy.get('.contactTableBodyRow').should('have.length.greaterThan', 0)
	})

	it('should display the add contact button', () => {
		contactListPage.getAddContactButton().should('exist')
	})

	it('should display the logout button', () => {
		cy.get('#logout').should('exist')
	})

})