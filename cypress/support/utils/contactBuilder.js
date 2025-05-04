import { faker } from '@faker-js/faker'

  function generateRealisticPhoneNumber() {
    const areaCode = faker.number.int({ min: 200, max: 999 })
	const centralOfficeCode = faker.number.int({ min: 200, max: 999 })
	const lineNumber = faker.number.int({ min: 1000, max: 9999 })
	return `${areaCode}-${centralOfficeCode}-${lineNumber}`

  }

  export function buildContact() {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      birthdate: faker.date.birthdate().toISOString().split('T')[0],
      email: faker.internet.email().toLowerCase(),
      phone: generateRealisticPhoneNumber(),
      street1: faker.location.streetAddress(),
      street2: faker.location.secondaryAddress(),
      city: faker.location.city(),
      stateProvince: faker.location.state(),
      postalCode: faker.location.zipCode(),
      country: faker.location.country(),
    }
}
  