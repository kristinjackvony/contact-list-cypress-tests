import { buildContact } from "../../support/utils/contactBuilder"
describe('PUT Contact Tests', () => {
	
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

	it('can update the contact with a PUT request', () => {
		const updatedContact = buildContact()
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

	it('returns a 401 response when the token is missing', () => {
		const updatedContact = buildContact()
		Cypress.env('authToken', null)
		cy.updateContact(contactId, updatedContact).then((response) => {
			expect(response.status).to.eq(401)
			
			// Cleanup: Delete the contact created in the beforeEach
			cy.authenticate().then(() => {
				cy.deleteContact(contactId)
			})
		})
	})

	it('returns the correct error message when the first name is missing', () => {
		const updatedContact = buildContact()
		updatedContact.firstName = ''
		cy.updateContact(contactId, updatedContact).then((response) => {
			expect(response.status).to.eq(400)
			expect(response.body).property('message').to.include("`firstName` is required")
		})
	})

	it('returns the correct error message when the last name is missing', () => {
		const updatedContact = buildContact()
		updatedContact.lastName = ''
		cy.updateContact(contactId, updatedContact).then((response) => {
			expect(response.status).to.eq(400)
			expect(response.body).property('message').to.include("`lastName` is required")
		})
	})

	it('returns the correct error message when the first name is too long', () => {
		const updatedContact = buildContact()
		updatedContact.firstName = 'Abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstu'
		cy.updateContact(contactId, updatedContact).then((response) => {
			expect(response.status).to.eq(400)
			expect(response.body).property('message').to.include("`firstName` (`Abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstu`) is longer than the maximum allowed length (20)")
		})
	})

	it('returns the correct error message when the last name is too long', () => {
		const updatedContact = buildContact()
		updatedContact.lastName = 'Abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstu'
		cy.updateContact(contactId, updatedContact).then((response) => {
			expect(response.status).to.eq(400)
			expect(response.body).property('message').to.include("`lastName` (`Abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstu`) is longer than the maximum allowed length (20)")
		})
	})

	it('returns the correct error message when the birthdate is invalid', () => {
		const updatedContact = buildContact()
		updatedContact.birthdate = 'foobar'
		cy.updateContact(contactId, updatedContact).then((response) => {
			expect(response.status).to.eq(400)
			expect(response.body).property('message').to.include("birthdate: Birthdate is invalid")
		})
	})

	it('returns the correct error message when the email is invalid', () => {
		const updatedContact = buildContact()
		updatedContact.email = 'foobar'
		cy.updateContact(contactId, updatedContact).then((response) => {
			expect(response.status).to.eq(400)
			expect(response.body).property('message').to.include("email: Email is invalid")
		})
	})

	it('returns the correct error message when the phone number is invalid', () => {
		const updatedContact = buildContact()
		updatedContact.phone = 'foobar'
		cy.updateContact(contactId, updatedContact).then((response) => {
			expect(response.status).to.eq(400)
			expect(response.body).property('message').to.include("phone: Phone number is invalid")
		})
	})

	it('returns the correct error message when street1 is too long', () => {
		const updatedContact = buildContact()
		updatedContact.street1 = 'Frosty the Snowman was a jolly happy soul'
		cy.updateContact(contactId, updatedContact).then((response) => {
			expect(response.status).to.eq(400)
			expect(response.body).property('message').to.include("`street1` (`Frosty the Snowman was a jolly happy soul`) is longer than the maximum allowed length")
		})
	})

	it('returns the correct error message when street2 is too long', () => {
		const updatedContact = buildContact()
		updatedContact.street2 = 'Frosty the Snowman was a jolly happy soul'
		cy.updateContact(contactId, updatedContact).then((response) => {
			expect(response.status).to.eq(400)
			expect(response.body).property('message').to.include("`street2` (`Frosty the Snowman was a jolly happy soul`) is longer than the maximum allowed length")
		})
	})

	it('returns the correct error message when the city is too long', () => {
		const updatedContact = buildContact()
		updatedContact.city = 'Frosty the Snowman was a jolly happy soul'
		cy.updateContact(contactId, updatedContact).then((response) => {
			expect(response.status).to.eq(400)
			expect(response.body).property('message').to.include("`city` (`Frosty the Snowman was a jolly happy soul`) is longer than the maximum allowed length")
		})
	})

	it('returns the correct error message when the state is too long', () => {
		const updatedContact = buildContact()
		updatedContact.stateProvince = 'Frosty the Snowman wa'
		cy.updateContact(contactId, updatedContact).then((response) => {
			expect(response.status).to.eq(400)
			expect(response.body).property('message').to.include("`stateProvince` (`Frosty the Snowman wa`) is longer than the maximum allowed length")
		})
	})

	it('returns the correct error message when the postal code is invalid', () => {
		const updatedContact = buildContact()
		updatedContact.postalCode = 'foobar'
		cy.updateContact(contactId, updatedContact).then((response) => {
			expect(response.status).to.eq(400)
			expect(response.body).property('message').to.include("Postal code is invalid")
		})
	})

	it('returns the correct error message when the country is too long', () => {
		const updatedContact = buildContact()
		updatedContact.country = 'Frosty the Snowman was a jolly happy soul'
		cy.updateContact(contactId, updatedContact).then((response) => {
			expect(response.status).to.eq(400)
			expect(response.body).property('message').to.include("`country` (`Frosty the Snowman was a jolly happy soul`) is longer than the maximum allowed length")
		})
	})

	afterEach(() => {
		cy.deleteContact(contactId)
	})
})