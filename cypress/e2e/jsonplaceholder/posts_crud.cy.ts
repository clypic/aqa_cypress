describe('JSONPlaceholder API', () => {
  
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
        const postCreate = {
            title: 'International Women`s Day',
            body: 'Today is International Women`s Day, celebrated on March 8 each year. This day highlights the achievements of women and advocates for gender equality worldwide.',
            userId: 101
        }
        cy.postCreate(postCreate)
            .then(function(createdResponse) {
                expect(createdResponse.status).to.eq(201)
                cy.validatePostSchema(createdResponse.body)

                expect(createdResponse.body.title).to.eq(postCreate.title)
                expect(createdResponse.body.body).to.eq(postCreate.body)
                expect(createdResponse.body.userId).to.eq(postCreate.userId)

                cy.postDelete(createdResponse.body.id)
                    .then(function(getResponse) {
                        expect(getResponse.status).to.eq(200)
                    })
            })
    })
    
    it('Update Post', function() {
      const postUpdate = {
            title: 'International Women`s Day UPDATED.',
            body: 'Today is International Women`s Day, celebrated on March 8 each year. This day highlights the achievements of women and advocates for gender equality worldwide. UPDATED.',
            userId: 102
        }
        cy.postUpdate(100, postUpdate)
            .then(function(updatedResponse) {
                expect(updatedResponse.status).to.eq(200)
                cy.validatePostSchema(updatedResponse.body)
                
                expect(updatedResponse.body.title).to.eq(postUpdate.title)
                expect(updatedResponse.body.body).to.eq(postUpdate.body)
                expect(updatedResponse.body.userId).to.eq(postUpdate.userId)

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
