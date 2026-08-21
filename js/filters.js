const burgerMenu = document.getElementById('menu-filters-button');
const sideMenu = document.getElementById('filters-sidebar');
const closeSideMenu = document.querySelector('.close-sidebar');

const isPhone = window.innerWidth < 580;

window.addEventListener('scroll', () => {
    if (!isPhone) {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight
        ) - window.innerHeight;

        const scrollPercent = (scrollTop / docHeight) * 100;

        if (scrollPercent >= 5) {
            burgerMenu.classList.add('visible');
        } else {
            burgerMenu.classList.remove('visible');
            sideMenu.classList.remove('open');
        }
    }
});

burgerMenu.addEventListener('click', () => {
    sideMenu.classList.add('open');
});

closeSideMenu.addEventListener('click', () => {
    sideMenu.classList.remove('open');
});

const filterButtons = document.querySelectorAll('.filter-button');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        const drawings = document.querySelectorAll('.drawing');

        if (filter === 'all') {
            filterButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            drawings.forEach(drawing => drawing.style.display = 'block');
            return;
        }

        button.classList.toggle('selected');

        document.querySelector('[data-filter="all"]').classList.remove('selected');

        const activeGroups = {};
        const activeFilters = [];

        filterButtons.forEach(btn => {
            if (btn.classList.contains('selected')) {
                const g = btn.getAttribute('data-group');
                const f = btn.getAttribute('data-filter');
                if (!activeGroups[g]) activeGroups[g] = [];
                activeGroups[g].push(f);
                activeFilters.push(f)
            }
        });

        if (activeFilters.length === 5 || Object.keys(activeGroups).length === 0) {
            document.querySelector('[data-filter="all"]').classList.add('selected');
            filterButtons.forEach(btn => {
                if (btn !== document.querySelector('[data-filter="all"]')) {
                    btn.classList.remove('selected');
                }
            });
            drawings.forEach(drawing => drawing.style.display = 'block');
            return;
        }

        drawings.forEach(drawing => {
            let visible = true;

            for (const group in activeGroups) {
                const filters = activeGroups[group];
                const hasOne = filters.some(f => drawing.classList.contains(f));
                if (!hasOne) {
                    visible = false;
                    break;
                }
            }
            drawing.style.display = visible ? 'block' : 'none';
        });
    });
});
