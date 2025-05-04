describe('GET Contact List Tests', () => {
	before(() => {
		cy.authenticate()
	})

	it('can do a GET Contact List request', () => {
		cy.getContactList().then((response) => {
			expect(response.status).to.eq(200)
			expect(response.body).to.be.an('array')
			expect(response.body.length).to.be.greaterThan(0)
		})
	})

	it('returns a 401 response when the token is missing', () => {
		Cypress.env('authToken', null)
		cy.getContactList().then((response) => {
			expect(response.status).to.eq(401)
		})
	})
})