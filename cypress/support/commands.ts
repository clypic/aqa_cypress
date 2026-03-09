import Ajv from 'ajv'



Cypress.Commands.add('validatePostsSchema', (data) => {
    cy.fixture('JSONPlaceholder/schemas/PostSchema.json')
        .then(function(postSchema) {
            cy.fixture('JSONPlaceholder/schemas/PostsSchema.json')
                .then(function(postsSchema) {
                    const ajv = new Ajv()
                    const validate = ajv.addSchema(postSchema).compile(postsSchema)
                    const valid = validate(data)
                    expect(valid, JSON.stringify(validate.errors)).to.eq(true)
                })
        })
})

Cypress.Commands.add('validatePostSchema', (data) => {
    cy.fixture('JSONPlaceholder/schemas/PostSchema.json')
        .then(function(postSchema) {
            const ajv = new Ajv()
            const validate = ajv.compile(postSchema)
            const valid = validate(data)
            expect(valid, JSON.stringify(validate.errors)).to.eq(true)
        })
})

Cypress.Commands.add('postGet', function(baseUrl, postId = null) {
    const url = postId ? `${baseUrl}/posts/${postId}` : `${baseUrl}/posts`
    return cy.request({ method: 'GET', url, failOnStatusCode: false })
})
Cypress.Commands.add('postDelete', function(baseUrl, postId) {
    return cy.request({ method: 'DELETE', url: `${baseUrl}/posts/${postId}`, failOnStatusCode: false })
        .then(function(response) {
            expect(response.status).to.eq(200)
        })
})
