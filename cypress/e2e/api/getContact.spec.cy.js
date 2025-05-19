import { buildContact } from "../../support/utils/contactBuilder"
describe('GET Contact List Tests', () => {

	let contactId
	
	before(() => {
		cy.authenticate()
	})
	
	beforeEach(() => {
		const contact = buildContact()
		cy.addContact(contact).then((response) => {
			contactId = response.body._id
		})
	})

	it('can GET a contact', () => {
		cy.getContact(contactId).then((response) => {	
			expect(response.status).to.eq(200)
			expect(response.body).to.have.property('_id', contactId)
			expect(response.body).to.have.property('firstName')
			expect(response.body).to.have.property('lastName')
			expect(response.body).to.have.property('birthdate')
			expect(response.body).to.have.property('email')
			expect(response.body).to.have.property('phone')
			expect(response.body).to.have.property('street1')
			expect(response.body).to.have.property('street2')
			expect(response.body).to.have.property('city')
			expect(response.body).to.have.property('stateProvince')
			expect(response.body).to.have.property('postalCode')
			expect(response.body).to.have.property('country')
		})
	})

	it('returns a 401 response when the token is missing', () => {
		Cypress.env('authToken', null)
		cy.getContact(contactId).then((response) => {
			expect(response.status).to.eq(401)
			
			// Cleanup: Delete the contact created in the beforeEach
			cy.authenticate().then(() => {
				cy.deleteContact(contactId)
			})
		})
	})

	it('returns a 404 when the contact does not exist', () => {
		const invalidContactId = '6812ce3fabd89300150e48e2'
		cy.getContact(invalidContactId).then((response) => {	
			expect(response.status).to.eq(404)
		})
	})

	afterEach(() => {
		cy.deleteContact(contactId)
	})

})