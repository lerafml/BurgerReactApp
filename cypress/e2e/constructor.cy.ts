/// <reference types="cypress" />
import { apiConfig } from '@utils/api';

describe('constructor spec', () => {
	beforeEach(() => {
		cy.intercept('GET', apiConfig.authUrl, { fixture: 'user.json' });
		cy.intercept('GET', apiConfig.baseUrl, { fixture: 'ingredients.json' });

		window.localStorage.setItem(
			'accessToken',
			JSON.stringify('testAccessToken')
		);
		window.localStorage.setItem(
			'refreshToken',
			JSON.stringify('testRefreshToken')
		);

		cy.visit('/');
	});

	it('should dnd successfully', () => {
		cy.get('[data-test="ingredient"]').first().as('bun');
		cy.get('[data-test="constructor"]').as('constructor');
		cy.get('@bun').trigger('dragstart');
		cy.get('@constructor').trigger('drop');
		cy.get('[data-test="constructor-bun-1"]').should('exist');
		cy.get('[data-test="constructor-bun-2"]').should('exist');

		cy.get('[data-test="ingredient"]').last().as('ingredient');
		cy.get('@ingredient').trigger('dragstart');
		cy.get('@constructor').trigger('drop');
		cy.get('[data-test="constructorIngredients"]').as('constructorIngredients');
		cy.get('@constructorIngredients').should('exist');
		cy.get('@constructorIngredients').find('li').should('have.length', 1);

		cy.get('@ingredient').trigger('dragstart');
		cy.get('@constructor').trigger('drop');
		cy.get('@constructorIngredients').find('li').should('have.length', 2);
	});

	it('should open and close modal successfully', () => {
		cy.get('[data-test="ingredient"]').first().as('ingredient');
		cy.get('@ingredient').click();
		cy.get('[data-test="modal"]').as('modal');
		cy.get('@modal').should('exist');
		cy.get('@modal').should('contain', 'Краторная булка N-200i');

		cy.get('[data-test="closeBtn"]').click();
		cy.get('@modal').should('not.exist');

		cy.get('@ingredient').click();
		cy.get('@modal').should('exist');

		cy.get('[data-test="modalOverlay"]').click('topLeft');
		cy.get('@modal').should('not.exist');
	});
});
