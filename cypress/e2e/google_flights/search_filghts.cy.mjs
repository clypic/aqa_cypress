
//https://docs.cypress.io/app/guides/cross-origin-testing
describe('Google Travel Flights page', () => {

    before(function() {
        cy.fixture('GoogleFlights.json').as('data')
    })

    it('visit', function() {
        cy.origin('https://www.google.com', function() {
            cy.visit(`/travel/flights`)
            cy.scrollTo('bottom')
            cy.document().screenshot()
        })

        cy.origin('https://consent.google.com', function() {
            cy.get(`button[aria-label='Reject all']`).eq(2).click()
            cy.document().screenshot()
        })
    })
})

