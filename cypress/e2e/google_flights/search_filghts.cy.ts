
//https://docs.cypress.io/app/guides/cross-origin-testing
describe('Google Travel Flights page', () => {

    beforeEach(function() {
        cy.fixture('GoogleFlights/selectors.json').as('selectors')
    })

    it('visit page', function() {
        cy.env(['google_flights', 'google_consent'])
          .then(function({ googleFlights, googleConsent }) {

            cy.origin(googleFlights.baseUrl, function() {
                cy.visit(`/travel/flights`)
                cy.scrollTo('bottom')
                cy.document().screenshot()
            })

            cy.origin(googleConsent.baseUrl, function() {
                cy.get(selectors.buttonRejectAll).eq(2).click()
                cy.document().screenshot()
            })
        })
    })
})

