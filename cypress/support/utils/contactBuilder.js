import { faker } from '@faker-js/faker'

  export function buildContact() {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      birthdate: faker.date.birthdate().toISOString().split('T')[0],
      email: faker.internet.email().toLowerCase(),
      phone: '800-555-1000',
      street1: faker.location.streetAddress(),
      street2: faker.location.secondaryAddress(),
      city: faker.location.city(),
      stateProvince: faker.location.state(),
      postalCode: faker.location.zipCode(),
      country: faker.location.country(),
    }
}
  