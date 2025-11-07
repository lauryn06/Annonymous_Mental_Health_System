const resources = [
    {
        title: "Managing Stress",
        description: "Tips and techniques to manage daily stress effectively.",
        link: "stress.html"
    },
    {
        title: "Dealing with Anxiety",
        description: "Learn strategies to cope with anxiety and panic attacks.",
        link: "#"
    },
    {
        title: "Mindfulness Exercises",
        description: "Simple mindfulness exercises to calm your mind.",
        link: "exercise.html"
    },
    {
        title: "Getting Professional Help",
        description: "How to reach counselors and mental health professionals anonymously.",
        link: "#"
    }
];

const resourcesList = document.getElementById('resources-list');
const searchInput = document.getElementById('search-input');

function displayResources(filteredResources) {
    resourcesList.innerHTML = '';
    filteredResources.forEach(resource => {
        const card = document.createElement('div');
        card.classList.add('resource-card');
        card.innerHTML = `
            <h3>${resource.title}</h3>
            <p>${resource.description}</p>
            <a href="${resource.link}" style="color: var(--card-color); text-decoration: underline;">Read More</a>
        `;
        resourcesList.appendChild(card);
    });
}

// Initial display
displayResources(resources);

// Search filter
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filtered = resources.filter(r => r.title.toLowerCase().includes(query) || r.description.toLowerCase().includes(query));
    displayResources(filtered);
});
