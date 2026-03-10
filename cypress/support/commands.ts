import Ajv from 'ajv'

Cypress.Commands.add('postOptions', function() {
    return cy.env(['apiBaseUrl'])
        .then(function({ apiBaseUrl }) {
            return cy.request({
                failOnStatusCode: false,
                method: 'OPTIONS',
                url: `${apiBaseUrl}/posts`
            })
        })
})
Cypress.Commands.add('postGet', function(postId = null) {
    return cy.env(['apiBaseUrl']).then(function({ apiBaseUrl }) {
        const url = postId ? `${apiBaseUrl}/posts/${postId}` : `${apiBaseUrl}/posts`
        return cy.request({ method: 'GET', url, failOnStatusCode: false })
    })
})
Cypress.Commands.add('postDelete', function(postId) {
    return cy.env(['apiBaseUrl'])
        .then(function({ apiBaseUrl }) {
            return cy.request({ method: 'DELETE', url: `${apiBaseUrl}/posts/${postId}`, failOnStatusCode: false })
                .then(function(response) {
                    expect(response.status).to.eq(200)
                })
        })
})
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