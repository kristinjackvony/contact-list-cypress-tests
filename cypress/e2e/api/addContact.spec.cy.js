import { buildContact } from "../../support/utils/contactBuilder"
describe('POST Contact Tests', () => {

	let contactId

	beforeEach(() => {
		cy.authenticate()
	})

	it('can do a POST Contact request', () => {
		const contact = buildContact()
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

			//Clean Up
			cy.deleteContact(contactId)
		})
	})

	it('returns a 401 response when the token is missing', () => {
		const contact = buildContact()
		Cypress.env('authToken', null)
		cy.addContact(contact).then((response) => {
			expect(response.status).to.eq(401)
		})
	})

	it('returns the correct error message when the first name is missing', () => {
		const contact = buildContact()
		contact.firstName = ''
		cy.addContact(contact).then((response) => {
			expect(response.status).to.eq(400)
			expect(response.body).property('message').to.include("`firstName` is required")
		})
	})

	it('returns the correct error message when the last name is missing', () => {
		const contact = buildContact()
		contact.lastName = ''
		cy.addContact(contact).then((response) => {
			expect(response.status).to.eq(400)
			expect(response.body).property('message').to.include("`lastName` is required")
		})
	})

	it('returns the correct error message when the first name is too long', () => {
		const contact = buildContact()
		contact.firstName = 'Abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstu'
		cy.addContact(contact).then((response) => {
			expect(response.status).to.eq(400)
			expect(response.body).property('message').to.include("`firstName` (`Abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstu`) is longer than the maximum allowed length (20)")
		})
	})

	it('returns the correct error message when the last name is too long', () => {
		const contact = buildContact()
		contact.lastName = 'Abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstu'
		cy.addContact(contact).then((response) => {
			expect(response.status).to.eq(400)
			expect(response.body).property('message').to.include("`lastName` (`Abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstu`) is longer than the maximum allowed length (20)")
		})
	})

	it('returns the correct error message when the birthdate is invalid', () => {
		const contact = buildContact()
		contact.birthdate = 'foobar'
		cy.addContact(contact).then((response) => {
			expect(response.status).to.eq(400)
			expect(response.body).property('message').to.include("birthdate: Birthdate is invalid")
		})
	})

	it('returns the correct error message when the email is invalid', () => {
		const contact = buildContact()
		contact.email = 'foobar'
		cy.addContact(contact).then((response) => {
			expect(response.status).to.eq(400)
			expect(response.body).property('message').to.include("email: Email is invalid")
		})
	})

	it('returns the correct error message when the phone number is invalid', () => {
		const contact = buildContact()
		contact.phone = 'foobar'
		cy.addContact(contact).then((response) => {
			expect(response.status).to.eq(400)
			expect(response.body).property('message').to.include("phone: Phone number is invalid")
		})
	})

	it('returns the correct error message when street1 is too long', () => {
		const contact = buildContact()
		contact.street1 = 'Frosty the Snowman was a jolly happy soul'
		cy.addContact(contact).then((response) => {
			expect(response.status).to.eq(400)
			expect(response.body).property('message').to.include("`street1` (`Frosty the Snowman was a jolly happy soul`) is longer than the maximum allowed length")
		})
	})

	it('returns the correct error message when street2 is too long', () => {
		const contact = buildContact()
		contact.street2 = 'Frosty the Snowman was a jolly happy soul'
		cy.addContact(contact).then((response) => {
			expect(response.status).to.eq(400)
			expect(response.body).property('message').to.include("`street2` (`Frosty the Snowman was a jolly happy soul`) is longer than the maximum allowed length")
		})
	})

	it('returns the correct error message when the city is too long', () => {
		const contact = buildContact()
		contact.city = 'Frosty the Snowman was a jolly happy soul'
		cy.addContact(contact).then((response) => {
			expect(response.status).to.eq(400)
			expect(response.body).property('message').to.include("`city` (`Frosty the Snowman was a jolly happy soul`) is longer than the maximum allowed length")
		})
	})

	it('returns the correct error message when the state is too long', () => {
		const contact = buildContact()
		contact.stateProvince = 'Frosty the Snowman wa'
		cy.addContact(contact).then((response) => {
			expect(response.status).to.eq(400)
			expect(response.body).property('message').to.include("`stateProvince` (`Frosty the Snowman wa`) is longer than the maximum allowed length")
		})
	})

	it('returns the correct error message when the postal code is invalid', () => {
		const contact = buildContact()
		contact.postalCode = 'foobar'
		cy.addContact(contact).then((response) => {
			expect(response.status).to.eq(400)
			expect(response.body).property('message').to.include("Postal code is invalid")
		})
	})

	it('returns the correct error message when the country is too long', () => {
		const contact = buildContact()
		contact.country = 'Frosty the Snowman was a jolly happy soul'
		cy.addContact(contact).then((response) => {
			expect(response.status).to.eq(400)
			expect(response.body).property('message').to.include("`country` (`Frosty the Snowman was a jolly happy soul`) is longer than the maximum allowed length")
		})
	})

})