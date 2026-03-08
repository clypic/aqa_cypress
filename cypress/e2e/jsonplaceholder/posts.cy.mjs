describe('JSONPlaceholder API', () => {

    before(function() {
        cy.fixture('JSONPlaceholder.json').as('data')
    })

    context('call', function() {

        beforeEach('call', function() {
            cy.request({ method: 'OPTIONS', url: this.data.baseUrl + '/posts' }).as('res')
        })

        it('verify success.', function() {
            expect(this.res.status).to.eq(204)
            expect(this.res.body).to.have.length(0)
        })

        describe('verify methods have', function() {

            beforeEach('call', function() {
                cy.wrap(this.res.headers['access-control-allow-methods'].split(',')).as('resAllowedMethods')
            })

            it('lenght of 6', function() {
                expect(this.resAllowedMethods).to.have.length(6)
            })

						it('HEAD', function() {
						    expect(this.resAllowedMethods).to.include('HEAD')
						})
						
            it('GET', function() {
                expect(this.resAllowedMethods).to.include('GET')
            })

						it('PUT', function() {
						    expect(this.resAllowedMethods).to.include('PUT')
						})
						
            it('PATCH', function() {
                expect(this.resAllowedMethods).to.include('PATCH')
            })

						it('POST', function() {
						    expect(this.resAllowedMethods).to.include('POST')
						})
						
            it('DELETE', function() {
                expect(this.resAllowedMethods).to.include('DELETE')
            })
        })
    })
})
