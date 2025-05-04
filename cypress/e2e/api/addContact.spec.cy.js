import { buildContact } from "../../support/utils/contactBuilder"
describe('POST Contact Tests', () => {

	let contactId
	const contact = buildContact()

	before(() => {
		cy.authenticate()
	})

	it('can do a POST Contact request', () => {
		cy.addContact(contact).then((response) => {
			contactId = response.body._id
			expect(response.status).to.eq(201)
			expect(response.body).to.have.property('firstName', contact.firstName)
			expect(response.body).to.have.property('lastName', contact.lastName)
			expect(response.body).to.have.property('birthdate', contact.birthdate)
			expect(response.body).to.have.property('email', contact.email)
			expect(response.body).to.have.property('phone', contact.phone)
			expect(response.body).to.have.property('street1', contact.street1)
			expect(response.body).to.have.property('street2', contact.street2)
			expect(response.body).to.have.property('city', contact.city)
			expect(response.body).to.have.property('stateProvince', contact.stateProvince)
			expect(response.body).to.have.property('postalCode', contact.postalCode)
			expect(response.body).to.have.property('country', contact.country)
		})
	})

	it('returns the correct error message when adding the first name too long', () => {
		contact.firstName = 'Abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstu'
		cy.addContact(contact).then((response) => {
			expect(response.status).to.eq(400)
			expect(response.body).property('message').to.include("`firstName` (`Abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstu`) is longer than the maximum allowed length (20)")
		})
	})

	afterEach(() => {
		cy.deleteContact(contactId)
	})

})