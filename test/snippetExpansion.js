/*jshint node:true, laxcomma:true */
/*global describe:true, it:true */
"use strict";

var assert    = require('assert');
var highlight = require('../lib/main');

var _ = require('lodash');

describe('Snippet expansions', function () {

    describe('Find snippets', function () {
        var lookup = ["hay fever"];
        var text   = "Allergic rhinitis is an allergic inflammation of the nasal airways. It occurs when an allergen, such as pollen, dust, Balsam of Peru, or animal dander (particles of shed skin and hair) is inhaled by an individual with a sensitized immune system. In such individuals, the allergen triggers the production of the antibody immunoglobulin E (IgE), which binds to mast cells and basophils containing histamine. When caused by pollens of any plants, it is called pollinosis, and, if specifically caused by grass pollens, it is known as hay fever. While symptoms resembling a cold or flu can be produced by an allergic reaction to pollen from plants and grasses, Hay fever including those used to make hay, it does not cause a fever.IgE bound to mast cells are stimulated by allergens, causing the release of inflammatory mediators such as histamine (and other chemicals). This usually causes sneezing, itchy and watery eyes, swelling and inflammation of the nasal passages, and an increase in mucus production. Symptoms vary in severity between individuals. Very sensitive individuals can experience hives or other rashes. Particulate matter in polluted air, and chemicals such as chlorine and detergents, which can normally be tolerated, can greatly aggravate allergic rhinitis. The physician John Bostock first described hay fever in 1819 as a disease.Allergies are common. Heredity and environmental exposures may contribute to a predisposition to allergies. It is roughly estimated that one in three people has an active allergy at any given time and at least three in four people develop an allergic reaction at least once in their lives. In Western countries, between 10–25% of people annually are affected by allergic rhinitis. IgE bound to mast cells are stimulated by allergens, causing the release of inflammatory mediators such as histamine (and other chemicals).[2] This usually causes sneezing, itchy and watery eyes, swelling and inflammation of the nasal passages, and an increase in mucus production. Symptoms vary in severity between individuals. Very sensitive individuals can experience hives or other rashes. Particulate matter in polluted air, and chemicals such as chlorine and detergents, which can normally be tolerated, can greatly aggravate allergic rhinitis. The physician John Bostock first identified the condition of hay fever in 1819, believing it to be a disease. The true agent causing hay fever was finally identified as pollen in 1859 by Charles Blackley, who concluded that pollen contained toxins leading to the reaction.[3] It was not until 1906 that the mechanisms of allergy as a type of hypersentivity were understood following the work of Clemens von Pirquet. Allergies are common. Heredity and environmental exposures may contribute to a predisposition to allergies. It is roughly estimated that one in three people has an active allergy at any given time and at least three in four people develop an allergic reaction at least once in their lives. In Western countries, between 10–25% of people annually are affected by allergic rhinitis.[4]";
        var result = highlight.snippetExpansions(text, lookup);

        it('Should find', function () {
            assert.equal(result.length, 5);
        });
    });
});
