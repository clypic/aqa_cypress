describe('JSONPlaceholder API', () => {

    beforeEach(function() {
        cy.fixture('JSONPlaceholder/service.json').as('service')
    })

    describe('Verify get Post/s', function() {
        it('Get all Posts', function() {
            cy.postGet()
                .then(function(response) {
                    expect(response.status).to.eq(200)
                    cy.validatePostsSchema(response.body)
                    expect(response.body).to.have.lengthOf(100)
                })
        })
        it('Get one Post', function() {
            const postId = 100
            cy.postGet(postId)
                .then(function(response) {
                    expect(response.status).to.eq(200)
                    cy.validatePostSchema(response.body)
                    expect(response.body['body']).to.eq('cupiditate quo est a modi nesciunt soluta\nipsa voluptas error itaque dicta in\nautem qui minus magnam et distinctio eum\naccusamus ratione error aut')
                    expect(response.body['id']).to.eq(postId)
                    expect(response.body['title']).to.eq('at nam consequatur ea labore ea harum')
                    expect(response.body['userId']).to.eq(10)
                })
        })
    })

    it('Create Post', function() {
        cy.request({
            method: 'POST',
            url: this.service.baseUrl + '/posts',
            body: {
                title: 'International Women`s Day',
                body: 'Today is International Women`s Day, celebrated on March 8 each year. This day highlights the achievements of women and advocates for gender equality worldwide.',
                userId: 101
            }
        })
            .then(function(createdResponse) {
                expect(createdResponse.status).to.eq(201)

                cy.postDelete(createdResponse.body.id)
                    .then(function(getResponse) {
                        expect(getResponse.status).to.eq(200)
                    })
            })
    })
    it('Update Post', function() {
        cy.request({
            method: 'PATCH',
            url: this.service.baseUrl + '/posts/100',
            body: {
                title: 'International Women`s Day',
                body: 'Today is International Women`s Day, celebrated on March 8 each year. This day highlights the achievements of women and advocates for gender equality worldwide.',
                userId: 100
            }
        })
            .then(function(updatedResponse) {
                expect(updatedResponse.status).to.eq(200)

                cy.postDelete(updatedResponse.body.id)
                    .then(function(getResponse) {
                        expect(getResponse.status).to.eq(200)
                    })
            })
    })

    it('Delete Post', function() {
        const postId = 101
        cy.postDelete(postId)
            .then(function(deleteResponse) {
                expect(deleteResponse.status).to.eq(200)

                cy.postGet(postId)
                    .then(function(getResponse) {
                        expect(getResponse.status).to.eq(404)
                    })
            })
    })

    it('Get non-existing Post', function() {
        cy.postGet(999)
            .then(function(getResponse) {
                expect(getResponse.status).to.eq(404)
            })
    })
})
