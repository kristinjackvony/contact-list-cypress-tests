import { buildContact } from "../../support/utils/contactBuilder"
describe('PUT Contact Tests', () => {
	
    let contactId
	const updatedContact = buildContact()

	before(() => {
		cy.authenticate()
	})
	
	beforeEach(() => {
		const contact = buildContact()
		cy.addContact(contact).then((response) => {
			contactId = response.body._id
		})
	})

	it('can update the contact with a PUT request', () => {
		cy.updateContact(contactId, updatedContact).then((response) => {
			expect(response.status).to.eq(200)
			expect(response.body).to.have.property('_id', contactId)
			expect(response.body).to.have.property('firstName', updatedContact.firstName)
			expect(response.body).to.have.property('lastName', updatedContact.lastName)
			expect(response.body).to.have.property('birthdate', updatedContact.birthdate)
			expect(response.body).to.have.property('email', updatedContact.email)
			expect(response.body).to.have.property('phone', updatedContact.phone)
			expect(response.body).to.have.property('street1', updatedContact.street1)
			expect(response.body).to.have.property('street2', updatedContact.street2)
			expect(response.body).to.have.property('city', updatedContact.city)
			expect(response.body).to.have.property('stateProvince', updatedContact.stateProvince)
			expect(response.body).to.have.property('postalCode', updatedContact.postalCode)
			expect(response.body).to.have.property('country', updatedContact.country)
		})
	})

	it('returns the appropriate error when the last name is missing', () => {
		updatedContact.lastName = ''
		cy.updateContact(contactId, updatedContact).then((response) => {
			expect(response.status).to.eq(400)
			expect(response.body).property('message').to.include("`lastName` is required")
		})
	})

	afterEach(() => {
		cy.deleteContact(contactId)
	})
})