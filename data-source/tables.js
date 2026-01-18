import { convertEminutesToNormalminute, ExcelDate_to_NormalDate } from './dateConverter.js';

let bookingData = [];
let clientData = [];
let activeFilters = {}; // Track active filters

// Fetch booking data
fetch('https://grooveintheback.onrender.com/api/bookings')
    .then(response => response.json())
    .then(data => {
        console.log('Received booking data:', data);
        bookingData = data.payload;
        generateTable(bookingData, 'booking-table', 'No booking data available');
    })
    .catch(error => console.error('Error fetching bookings:', error));

// Fetch client data
fetch('https://grooveintheback.onrender.com/api/clients')
    .then(response => response.json())
    .then(data => {
        console.log('Received client data:', data); // Log the entire data to inspect its structure
        clientData = data.payload;
        generateTable(clientData, 'client-table', 'No client data available');
    })
    .catch(error => console.error('Error fetching clients:', error));

// Function to generate tables dynamically with filter options
function generateTable(data, containerId, emptyMessage) {
    const tableContainer = document.getElementById(containerId);
    tableContainer.innerHTML = ''; // Clear existing content
    
    // Create a search container above the table
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    
    // Create search input
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.className = 'form-control';
    searchInput.placeholder = `Search ${containerId === 'booking-table' ? 'bookings' : 'clients'}...`;
    searchInput.id = `${containerId}-search`;
    searchInput.style = 'display: flex; !important; max-width: 500px; font-size: 10px; height: 39px; text-align: left; padding: 13px 4px; margin-right: 0px; font-size: 12px;';
    
    
    // Create the clear button
    const clearAllFiltersBtn = document.createElement('button');
    clearAllFiltersBtn.className = 'btn btn-sm btn-outline-danger';
    clearAllFiltersBtn.style = 'display: flex; !important; max-width: 90px; font-size: 10px; height: 39px; text-align: center; padding: 13px 4px; margin-right: 0px;';
    clearAllFiltersBtn.textContent = 'Reset Filters';
    
    // Add event listener to clear filters
    clearAllFiltersBtn.addEventListener('click', () => {
        activeFilters = {};
        updateActiveFiltersDisplay(containerId);
    
        // Regenerate the table with the original data
        if (containerId === 'booking-table') {
            generateTable(bookingData, 'booking-table', 'No booking data available');
        } else {
            generateTable(clientData, 'client-table', 'No client data available');
        }
    });
    
    // Create active filters display area
    const activeFiltersContainer = document.createElement('div');
    activeFiltersContainer.className = 'active-filters-container';
    activeFiltersContainer.id = `${containerId}-active-filters`;

    // Create the table
    const table = document.createElement('table');
    table.className = 'data-table table table-bordered table-striped'; 
    table.id = `${containerId}-datatable`;

    if (data && data.length > 0) {
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        // Get headers from the first item
        let headers = new Set(Object.keys(data[0])); // Use Set to prevent duplicates
        headers.delete("Client Status List"); // Remove unwanted headers
        headers.delete("Arrival Day"); 
        headers.delete("Departure Day");
        headers.delete("Creation Minute");
        headers.delete("Membership List");

        // Add custom headers for Membership List
        if (data.some(item => Array.isArray(item["Membership List"]) && item["Membership List"].length > 0)) {
            headers.add("Membership Type");
            headers.add("Membership State");
            headers.add("Membership Tier");
            headers.add("Priority");
        }

        // Create table headers
        headers.forEach(key => {
            const th = document.createElement('th');
            th.innerHTML = `<p style="width:100%; text-align:center; white-space:wrap; margin: 18px 0px;">${key}</p>`;
            
            // Add a filter button in each header cell
            const filterButton = document.createElement('button');
            filterButton.style = 'width:100%; height:24px; margin:auto 0 0 0; text-align:center; padding:auto;';
            filterButton.innerHTML = '<p style="margin:auto auto;"><i class="fa fa-filter"></i></p>';
            filterButton.className = 'btn btn-outline-secondary btn-sm ml-2';
            filterButton.title = `Filter by ${key}`;
            filterButton.addEventListener('click', (event) => {
                // Remove any existing filter modals before showing a new one padding
                const existingModals = document.querySelectorAll('.filter-modal');
                existingModals.forEach(modal => modal.remove());
                
                showFilterOptions(event, containerId, key, data);
            });
            
            th.appendChild(filterButton);
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Create table body
        const tbody = document.createElement('tbody');
        data.forEach(item => {
            const row = document.createElement('tr');
            headers.forEach(key => {
                const cell = document.createElement('td');

                if (Array.isArray(item[key])) {
                    // If the key is "Membership List", format it
                    if (key === "Membership List") {
                        cell.textContent = item[key].map(membership => membership["Membership Type Description"]).join(", ");
                    } else {
                        cell.textContent = JSON.stringify(item[key]); // Show raw data for other arrays
                    }
                } else if (["Membership Type", "Membership State", "Membership Tier", "Priority"].includes(key)) {
                    // Extract Membership details
                    const membership = item["Membership List"]?.[0]; // Get the first membership (if exists)
                    if (key === "Membership Type") {
                        cell.textContent = membership?.["Membership Type Description"] || "";
                    } else if (key === "Membership State") {
                        cell.textContent = membership?.["Membership State Description"] || "";
                    } else if (key === "Membership Tier") {
                        cell.textContent = membership?.["Membership Tier Description"] || "";
                    } else if (key === "Priority") {
                        cell.textContent = membership?.["Priority"] || "";
                    }
                } else if (key === "Arrival Minute" || key === "Departure Minute") {
                    // Convert Excel minutes to normal time
                    cell.textContent = `${convertEminutesToNormalminute(item[key]).day}: ${convertEminutesToNormalminute(item[key]).time.hours}: ${convertEminutesToNormalminute(item[key]).time.minutes}`;
                } else if (key === "Birth Date") {
                    // Convert Excel minutes to normal time
                    cell.textContent = `${ExcelDate_to_NormalDate(item[key])}`;
                } else {
                    cell.textContent = item[key] ?? ''; // Use nullish coalescing for safer handling
                }
                
                row.appendChild(cell);
            });
            tbody.appendChild(row);
        });

        table.appendChild(tbody);
    } else {
        // Handle empty data case
        const noDataRow = document.createElement('tr');
        const noDataCell = document.createElement('td');
        noDataCell.textContent = emptyMessage;
        noDataCell.colSpan = 5; // Ensure proper column span
        noDataCell.style.textAlign = 'center';
        noDataRow.appendChild(noDataCell);

        const tbody = document.createElement('tbody');
        tbody.appendChild(noDataRow);
        table.appendChild(tbody);
    }


        // Add search container and active filters to the DOM
    tableContainer.appendChild(searchContainer);
    tableContainer.appendChild(activeFiltersContainer);
    tableContainer.appendChild(table);

    const dataTable = $(table).DataTable({
        paging: false,
        searching: true,
        ordering: false,
        info: true,
        responsive: true,
        buttons: [
            'copy', 'excel', 'csv', 'print'
        ]
    });
    
    // Determine which corresponding down div to use based on current containerId
    let buttonContainerId;
    if (containerId === 'booking-table') {
        buttonContainerId = 'booking_down';
    } else if (containerId === 'client-table') {
        buttonContainerId = 'client_down'; // Using your spelling, but you might want to fix this to "client_down"
    }
    
    // Get the button container by ID
    const buttonContainer = document.getElementById(buttonContainerId);
    
    // If the container exists, clear existing buttons and add the export buttons to it
    if (buttonContainer) {
        buttonContainer.className = 'export-buttons-container';
        
        // Clear existing buttons
        buttonContainer.innerHTML = '';
    
        // Move the DataTables buttons into our container
        new $.fn.dataTable.Buttons(dataTable, {
            buttons: ['copy', 'excel', 'csv', 'print']
        }).container().appendTo(buttonContainer);
        
        // Add styles for the buttons container
        const buttonStyles = document.createElement('style');
        buttonStyles.textContent = `
            .export-buttons-container {
                display: flex;
                justify-content: flex-end;
                margin-top: 15px;
                padding: 10px 0;
                border-top: 1px solid #ddd;
            }
            
            .export-buttons-container .dt-buttons .dt-button {
                    margin-left: 5px;
                    font-weight: bold;
                    color: var(--main-text);
        `;
        
        // Only append the styles if they haven't been added already
        if (!document.querySelector('style[data-button-styles]')) {
            buttonStyles.setAttribute('data-button-styles', 'true');
            document.head.appendChild(buttonStyles);
        }
    }
    
    // Update active filters display
    updateActiveFiltersDisplay(containerId);
    
}

// Function to show filter options for a column
function showFilterOptions(event, containerId, columnName, data) {
    // Create filter modal
    const filterModal = document.createElement('div');
    filterModal.className = 'filter-modal card';
    filterModal.style.position = 'absolute';
    filterModal.style.zIndex = '1000';
    filterModal.style.minWidth = '200px';
    filterModal.style.maxHeight = '400px';
    filterModal.style.overflowY = 'auto';
    
    // Position the modal near the click
    const rect = event.target.getBoundingClientRect();
    filterModal.style.top = `${window.scrollY + rect.bottom + 5}px`;
    filterModal.style.left = `${window.scrollX + rect.left}px`;

    // Create header
    const filterHeader = document.createElement('div');
    filterHeader.className = 'card-header d-flex justify-content-between align-items-center';
    
    const headerTitle = document.createElement('h5');
    headerTitle.className = 'mb-0';
    headerTitle.textContent = `Filter by ${columnName}`;
    
    const closeButton = document.createElement('button');
    closeButton.className = 'btn-close';
    closeButton.addEventListener('click', () => filterModal.remove());
    
    filterHeader.appendChild(headerTitle);
    filterHeader.appendChild(closeButton);
    filterModal.appendChild(filterHeader);

    // Create search input for filter values
    const filterSearch = document.createElement('div');
    filterSearch.className = 'card-body pb-0';
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.className = 'form-control mb-2';
    searchInput.placeholder = 'Search values...';
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const tableRows = table.querySelectorAll('tbody tr');
        
        tableRows.forEach(row => {
            const rowText = row.textContent.toLowerCase();
            row.style.display = rowText.includes(searchTerm) ? '' : 'none';
        });
    });
    
    filterSearch.appendChild(searchInput);
    filterModal.appendChild(filterSearch);

    // Create the filter options list
    const filterListContainer = document.createElement('div');
    filterListContainer.className = 'card-body pt-0';
    
    const filterList = document.createElement('ul');
    filterList.className = 'list-group';
    
    // Get unique values for the column
    const uniqueValues = [...new Set(data.map(item => {
        if (["Membership Type", "Membership State", "Membership Tier", "Priority"].includes(columnName)) {
            const membership = item["Membership List"]?.[0];
            if (columnName === "Membership Type") {
                return membership?.["Membership Type Description"] || "";
            } else if (columnName === "Membership State") {
                return membership?.["Membership State Description"] || "";
            } else if (columnName === "Membership Tier") {
                return membership?.["Membership Tier Description"] || "";
            } else if (columnName === "Priority") {
                return membership?.["Priority"] || "";
            }
        } else {
            return item[columnName];
        }
    }))].filter(value => value != null && value !== '').sort();

    // Add "Clear filter" option
    if (activeFilters[columnName]) {
        const clearItem = document.createElement('li');
        clearItem.className = 'list-group-item list-group-item-action text-danger';
        clearItem.textContent = 'Clear filter';
        clearItem.addEventListener('click', () => {
            delete activeFilters[columnName];
            applyFilters(containerId);
            filterModal.remove();
        });
        filterList.appendChild(clearItem);
    }

    // Add filter options
    uniqueValues.forEach(value => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item list-group-item-action';
        
        // Show if this filter is currently active
        if (activeFilters[columnName] === value) {
            listItem.classList.add('active');
        }
        
        listItem.textContent = value;
        listItem.addEventListener('click', () => {
            activeFilters[columnName] = value;
            applyFilters(containerId);
            filterModal.remove();
        });
        
        filterList.appendChild(listItem);
    });

    filterListContainer.appendChild(filterList);
    filterModal.appendChild(filterListContainer);
    
    // Add event listener to close the modal when clicking outside
    document.addEventListener('click', function closeModal(e) {
        if (!filterModal.contains(e.target) && e.target !== event.target) {
            filterModal.remove();
            document.removeEventListener('click', closeModal);
        }
    });

    document.body.appendChild(filterModal);
}

// Function to apply the active filters

// Function to apply the active filters
function applyFilters(containerId) {
    // Get the original dataset
    const originalData = containerId === 'booking-table' ? bookingData : clientData;
    
    // Apply all active filters
    const filteredData = originalData.filter(item => {
        return Object.entries(activeFilters).every(([columnName, filterValue]) => {
            if (["Membership Type", "Membership State", "Membership Tier", "Priority"].includes(columnName)) {
                const membership = item["Membership List"]?.[0];
                let valueToCheck;
                
                if (columnName === "Membership Type") {
                    valueToCheck = membership?.["Membership Type Description"] || "";
                } else if (columnName === "Membership State") {
                    valueToCheck = membership?.["Membership State Description"] || "";
                } else if (columnName === "Membership Tier") {
                    valueToCheck = membership?.["Membership Tier Description"] || "";
                } else if (columnName === "Priority") {
                    valueToCheck = membership?.["Priority"] || "";
                }
                
                return valueToCheck === filterValue;
            } else {
                return item[columnName] === filterValue;
            }
        });
    });
    
    // Regenerate the table with filtered data
    generateTable(filteredData, containerId, `No ${containerId === 'booking-table' ? 'booking' : 'client'} data available`);
}


// Function to update the active filters display
function updateActiveFiltersDisplay(containerId) {
    const container = document.getElementById(`${containerId}-active-filters`);
    if (!container) return; // Safety check
    
    // Find the clear all button - might be in a different location depending on your HTML structure
    const clearAllBtn = document.querySelector(`button.btn-outline-danger`);
    
    if (Object.keys(activeFilters).length === 0) {
        container.innerHTML = '';
        if (clearAllBtn) clearAllBtn.style.display = 'flex';
        return;
    }
    
    if (clearAllBtn) clearAllBtn.style.display = 'inline-block';
    container.innerHTML = '<strong>Active Filters: </strong>';
    
    Object.entries(activeFilters).forEach(([column, value]) => {
        const filterBadge = document.createElement('span');
        filterBadge.className = 'badge badge-info mr-2';
        filterBadge.innerHTML = `${column}: ${value} <span class="filter-remove">✕</span>`;
        filterBadge.style.fontSize = '0.8rem'; // Adjust as needed
        
        // Add click handler to remove this specific filter
        filterBadge.querySelector('.filter-remove').addEventListener('click', () => {
            delete activeFilters[column];
            updateActiveFiltersDisplay(containerId);
            applyFilters(containerId);
        });
        
        container.appendChild(filterBadge);
    });
}

// Add CSS for filter modal and badges
const filterStyles = document.createElement('style');
filterStyles.textContent = `
.filter-modal {
    box-shadow: 0 6px 12px rgba(0,0,0,0.2); /* Increased shadow for more depth */
    padding: 10px; /* Added padding for more space inside the modal */
}

.filter-remove {
    cursor: pointer;
    margin-left: 10px; /* Increased margin for better spacing */
    font-size: 1.2rem; /* Increased font size */
}

.filter-remove:hover {
    color: #fff;
    font-weight: bold;
}

.active-filters-container {
    margin-bottom: 15px; /* Increased margin for more space */
}

.badge {
    padding: 10px 15px; /* Increased padding for larger badges */
    margin-right: 10px; /* Increased margin for better spacing */
    display: inline-flex;
    align-items: center;
    background-color: #17a2b8;
    color: white;
    font-size: 1rem;
}
`;

// Only append the styles if they haven't been added already
if (!document.querySelector('style[data-filter-styles]')) {
    filterStyles.setAttribute('data-filter-styles', 'true');
    document.head.appendChild(filterStyles);
}