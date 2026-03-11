import Ajv from 'ajv'

Cypress.Commands.add('postOptions', function() {
    return cy.env(['jsonplaceholder'])
        .then(function({ jsonplaceholder }) {
            return cy.request({
                failOnStatusCode: false,
                method: 'OPTIONS',
                url: `${jsonplaceholder.baseUrl}/posts`
            })
        })
})
Cypress.Commands.add('postGet', function(postId = null) {
    return cy.env(['jsonplaceholder']).then(function({ jsonplaceholder }) {
        const url = postId ? `${jsonplaceholder.baseUrl}/posts/${postId}` : `${jsonplaceholder.baseUrl}/posts`
        return cy.request({ method: 'GET', url, failOnStatusCode: false })
    })
})

Cypress.Commands.add('postCreate', function(body) {
    return cy.env(['jsonplaceholder'])
        .then(function({ jsonplaceholder }) {
            return cy.request({
                method: 'POST',
                url: `${jsonplaceholder.baseUrl}/posts`,
                body,
            })
        })
})

Cypress.Commands.add('postUpdate', function(postId, body) {
    return cy.env(['jsonplaceholder'])
        .then(function({ jsonplaceholder }) {
            return cy.request({
                method: 'PATCH',
                url: `${jsonplaceholder.baseUrl}/posts/${postId}`,
                body,
            })
        })
})


Cypress.Commands.add('postDelete', function(postId) {
    return cy.env(['jsonplaceholder'])
        .then(function({ jsonplaceholder }) {
            return cy.request({ method: 'DELETE', url: `${jsonplaceholder.baseUrl}/posts/${postId}`, failOnStatusCode: false })
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