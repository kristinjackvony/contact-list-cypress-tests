class LoginPage {
    visit() {
      cy.visit('https://thinking-tester-contact-list.herokuapp.com')
    }
  
    getEmailField() {
      return cy.get('#email')
    }
  
    getPasswordField() {
      return cy.get('#password')
    }
  
    getLoginButton() {
      return cy.get('#submit')
    }
  
    login() {
      this.visit()
      this.getEmailField().type('test@fake.com')
      this.getPasswordField().type('foobarfoo')
      this.getLoginButton().click()
    }
  }
  
  export default LoginPage
  