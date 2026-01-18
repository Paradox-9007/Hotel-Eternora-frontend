$(document).ready(function() {
    // Handle navigation click
    $('.abc-nav-link').click(function(e) {
        e.preventDefault();
        // Update active section
        $('.content-section').removeClass('active');
        $($(this).data('target')).addClass('active');
        
        // Update active nav item
        $('.abc-nav-link').removeClass('active');
        $(this).addClass('active');
    });

    // Toggle sidebar
    $('#toggle-sidebar').click(function() {
        toggleSidebar();
    });
    
    // Responsive handling
    function checkWidth() {
        if ($(window).width() < 576) {
            $('#sidebar').removeClass('collapsed');
        }
    }
    
    // Check on page load and resize
    checkWidth();
    $(window).resize(checkWidth);

    // Initialize loading
    loadDashboards();

    // Handle shortcut keys
    $(document).keydown(function(e) {
        // Check if the focus is on an input field
        if ($(e.target).is('input, textarea')) {
            return; // Exit the function if the focus is on an input or textarea
        }
    
        const activeSection = $('.content-section.active');
        let newActiveSection;
    
        if (e.key === 'S' || e.key === 's' || e.key === 'ArrowDown') {
            // Move down
            newActiveSection = activeSection.next('.content-section');
        } else if (e.key === 'W' || e.key === 'w' || e.key === 'ArrowUp') {
            // Move up
            newActiveSection = activeSection.prev('.content-section');
        } else if (e.key === 'D' || e.key === 'd' || e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            // Toggle sidebar
            toggleSidebar();
        } else if (e.key >= '1' && e.key <= '9') {
            // Navigate to corresponding section
            newActiveSection = $(`#section${e.key}`);
        }
    
        if (newActiveSection && newActiveSection.length) {
            activeSection.removeClass('active');
            newActiveSection.addClass('active');
    
            // Update active nav item
            const newActiveNavLink = $(`.abc-nav-link[data-target="#${newActiveSection.attr('id')}"]`);
            $('.abc-nav-link').removeClass('active');
            newActiveNavLink.addClass('active');
        }
    });

    function toggleSidebar() {
        $('#sidebar').toggleClass('collapsed');
        $('#toggle-sidebar').find('i').toggleClass('fa-arrow-left fa-arrow-right');
    }
});

async function loadDashboards() {
    const dashboards = [
        { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, 
        { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }
    ];

    try {
        for (const dashboard of dashboards) {
            try {
                const response = await fetch(`/dashboards/dashboard-${dashboard.id}.html`);
                const data = await response.text();
                const section = document.getElementById(`section${dashboard.id}`);
                section.innerHTML = data;

                // Execute any script elements within the loaded HTML
                const scripts = section.querySelectorAll('script');
                scripts.forEach(script => {
                    const newScript = document.createElement('script');
                    newScript.textContent = script.textContent;
                    newScript.type = 'module';
                    document.body.appendChild(newScript);
                });

            } catch (error) {
                console.error(`Error loading dashboard ${dashboard.id}:`, error);
            }
        }
    } catch (error) {
        console.error("Error in loadDashboards:", error);
    }
}