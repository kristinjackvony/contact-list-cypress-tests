import { buildContact } from "../../support/utils/contactBuilder"

describe('DELETE Contact Tests', () => {
	
    let contactId
    
    beforeEach(() => {
		cy.authenticate()
		const contact = buildContact()
		cy.addContact(contact).then((response) => {
			contactId = response.body._id
		})
	})

	it('can DELETE a contact with the command', () => {
		cy.deleteContact(contactId).then((response) => {
			expect(response.status).to.eq(200)
			expect(response.body).to.equal('Contact deleted')
		})
		// Verify that the contact has been deleted
		cy.getContact(contactId).then((response) => {
			expect(response.status).to.eq(404)
		})
	})

	it('returns a 401 response when the token is missing', () => {
		Cypress.env('authToken', null)
		cy.deleteContact(contactId).then((response) => {
			expect(response.status).to.eq(401)
			
			// Cleanup: Delete the contact created in the beforeEach
			cy.authenticate().then(() => {
				cy.deleteContact(contactId)
			})
		})
	})

	it('returns a 404 when the contact does not exist', () => {
		const invalidContactId = '6812ce3fabd89300150e48e2'
		cy.deleteContact(invalidContactId).then((response) => {
			expect(response.status).to.eq(404)
		})
		// Cleanup: Delete the contact created in the beforeEach
		cy.deleteContact(contactId)
	})
})