import { } from "@faker-js/faker"

Cypress.Commands.add('authenticate', () => {
    cy.request({
        method: 'POST',
        url: 'https://thinking-tester-contact-list.herokuapp.com/users/login',
        body: {
            'email': 'test@fake.com',
            'password': 'foobarfoo'
        },
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        Cypress.env('authToken', response.body.token)
    })
})

Cypress.Commands.add('getContactList', () => {
    cy.request({
        failOnStatusCode: false,
        method: 'GET',
        url: 'https://thinking-tester-contact-list.herokuapp.com/contacts',
        headers: {
            'Authorization': `Bearer ${Cypress.env('authToken')}`
        }
    })
})

Cypress.Commands.add('addContact', (contact) => {
    cy.request({
        failOnStatusCode: false,
        method: 'POST',
        url: 'http://thinking-tester-contact-list.herokuapp.com/contacts',
        body: contact,
        headers: {
            'Authorization': `Bearer ${Cypress.env('authToken')}`
        }
    })
})

Cypress.Commands.add('getContact', (contactId) => {
    cy.request({
        failOnStatusCode: false,
        method: 'GET',
        url: `https://thinking-tester-contact-list.herokuapp.com/contacts/${contactId}`,
        headers: {
            'Authorization': `Bearer ${Cypress.env('authToken')}`
        }
    })
})

Cypress.Commands.add('updateContact', (contactId, updatedContact) => {
    cy.request({
        failOnStatusCode: false,
        method: 'PUT',
        url: `https://thinking-tester-contact-list.herokuapp.com/contacts/${contactId}`,
        body: updatedContact,
        headers: {
            'Authorization': `Bearer ${Cypress.env('authToken')}`
        }
    })
})

Cypress.Commands.add('deleteContact', (contactId) => {
    cy.request({
        failOnStatusCode: false,
        method: 'DELETE',
        url: `https://thinking-tester-contact-list.herokuapp.com/contacts/${contactId}`,
        headers: {
            'Authorization': `Bearer ${Cypress.env('authToken')}`
        }
    })
})