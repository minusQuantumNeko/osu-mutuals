// ==UserScript==
// @name         osu-mutuals
// @namespace    megamix.dev
// @version      0.0.1
// @description  A basic script to count mutuals visible on your friends list.
// @author       MegaMix_Craft
// @match        https://osu.ppy.sh/home/friends
// @match        https://osu.ppy.sh/home/friends?filter=all
// @icon         https://www.google.com/s2/favicons?sz=64&domain=osu.ppy.sh
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    function createMutualsCounter() {
        // Select "Online" <a> tag to place "Mutuals" one after it
        const targetLink = document.querySelector('a.update-streams-v2__item[href="https://osu.ppy.sh/home/friends?filter=online"]');

        if (targetLink) {
            // Create "Mutuals" <a> tag
            const newLink = document.createElement('a');
            newLink.className = 'update-streams-v2__item t-changelog-stream--all';
            newLink.setAttribute('data-key', 'mutuals');

            // Create the inner elements
            const barElement = document.createElement('div');
            barElement.className = 'update-streams-v2__bar u-changelog-stream--bg purple-line';

            const nameElement = document.createElement('p');
            nameElement.className = 'update-streams-v2__row update-streams-v2__row--name';
            nameElement.textContent = 'Mutuals';

            const versionElement = document.createElement('p');
            versionElement.className = 'update-streams-v2__row update-streams-v2__row--version';

            // Count the number of mutual friends
            const mutualsCount = document.querySelectorAll('.user-cards.user-cards--brick > .user-card-brick--mutual').length;
            versionElement.textContent = mutualsCount;

            // Append the inner elements to "Mutuals" <a> tag
            newLink.appendChild(barElement);
            newLink.appendChild(nameElement);
            newLink.appendChild(versionElement);

            // Insert "Mutuals" <a> tag
            targetLink.parentNode.insertBefore(newLink, targetLink.nextSibling);
        }
    }

    // Apply CSS
    function applyCustomCSS() {
        const style = document.createElement('style');
        style.textContent = `
            .purple-line {
                background-color: #eb4791 !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Run the functions when the page is fully loaded
    window.addEventListener('load', function() {
        createMutualsCounter();
        applyCustomCSS();
    });
})();