(function() {
    window.addEventListener('DOMContentLoaded', () => {
        const searchBox = document.createElement('div');
        searchBox.id = 'search-box';

        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search...';

        const searchResults = document.createElement('ul');
        searchResults.id = 'search-results';

        searchBox.appendChild(searchInput);
        searchBox.appendChild(searchResults);

        const body = document.querySelector('body');
        body.appendChild(searchBox);

        // let uiButtons = document.querySelectorAll('#tabs>.tab-nav button');

        let lastAltKeyDownTime = 0;
        let searchBoxIsVisible = false;

        function openSearchBox() {
            searchBox.classList.add('visible');
            searchInput.focus();
            searchBoxIsVisible = true;
        }

        function closeSearchBox() {
            searchBox.classList.remove('visible');
            searchInput.value = '';
            searchResults.innerHTML = '';
            searchBoxIsVisible = false;
        }

        function handleClickOutsideSearchBox(event) {
            if (searchBoxIsVisible && !searchBox.contains(event.target)) {
                closeSearchBox();
            }
        }

        function handleAltKeyDown(event) {
            let now = Date.now();
            if (event.key === 'Alt' && now - lastAltKeyDownTime < 500) {
                openSearchBox();
            }
            lastAltKeyDownTime = now;
        }

        function handleSearchInput(event) {
            let uiButtons = document.querySelectorAll('#tabs>.tab-nav button');
            let searchTerm = event.target.value.trim();
            if (searchTerm.length === 0) {
                searchResults.innerHTML = '';
                return;
            }
            // let regex = new RegExp(searchTerm, 'i');
            // let matches = Array.from(uiButtons).filter(button => regex.test(button.textContent));
            // let html = matches.map(button => `<li>${button.textContent}</li>`).join('');
            let matchingResults = [];
            for (let i = 0; i < uiButtons.length; i++) {
                let button = uiButtons[i];
                let buttonText = button.textContent.toLowerCase();
                if (buttonText.includes(searchTerm)) {
                    matchingResults.push(button);
                }
            }
            let html = matchingResults.map(button => `<li>${button.textContent}</li>`).join('');
            searchResults.innerHTML = html;
        }

        function handleSearchResultClick(event) {
            let uiButtons = document.querySelectorAll('#tabs>.tab-nav button');
            let target = event.target;
            while (target && target.tagName !== 'LI') {
                target = target.parentNode;
            }
            if (target) {
                let buttonText = target.textContent.trim();
                let button = Array.from(uiButtons).find(button => button.textContent.trim() === buttonText);
                button.click();
                closeSearchBox();
            }
        }

        document.addEventListener('keydown', handleAltKeyDown);
        searchInput.addEventListener('input', handleSearchInput);
        searchResults.addEventListener('click', handleSearchResultClick);
        document.addEventListener('click', handleClickOutsideSearchBox);
    });
})();