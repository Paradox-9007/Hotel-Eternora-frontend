import { getBookingsData, getClientData } from "/shared/services/dataService.js";
import {
  convertEminutesToNormalminute,
  ExcelDate_to_NormalDate,
} from "./dateConverter.js";

const BOOKING_STATUS_LABELS = {
  A: "Active",
  C: "Confirmed",
  D: "Deposit Paid",
  E: "Rejected",
  F: "Faulty",
  I: "Internet",
  L: "Left",
  N: "No Show",
  O: "Closed",
  P: "Provisional",
  Q: "Quote",
  R: "Restricted",
  U: "Fully Paid",
  W: "Waitlist",
  X: "Cancelled",
};

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatMoney(value) {
  const amount = Number(value || 0) / 100;
  return `$${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatDate(value) {
  if (value === undefined || value === null || value === "") {
    return "";
  }

  const normalized = new Date(ExcelDate_to_NormalDate(Number(value)));
  return normalized.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(value) {
  if (value === undefined || value === null || value === "") {
    return "";
  }

  const { time } = convertEminutesToNormalminute(Number(value));
  return `${time.hours}:${time.minutes}`;
}

function calculateAge(excelBirthDate) {
  if (!excelBirthDate) {
    return "";
  }

  const birthDate = new Date(ExcelDate_to_NormalDate(Number(excelBirthDate)));
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age -= 1;
  }

  return age;
}

function getMembershipStatus(client) {
  return Array.isArray(client["Membership List"]) && client["Membership List"].length > 0
    ? "Member"
    : "General";
}

function average(numbers) {
  if (numbers.length === 0) {
    return 0;
  }

  return numbers.reduce((total, number) => total + number, 0) / numbers.length;
}

function buildTableRows(data, columns) {
  return data.map((row) =>
    columns.map((column) => {
      const display = column.display(row);
      const sortValue =
        typeof column.sort === "function" ? column.sort(row) : display;
      const filterValue =
        typeof column.filter === "function" ? column.filter(row) : display;

      return {
        display,
        sortValue,
        filterValue,
      };
    })
  );
}

function createTableShell(config) {
  const container = document.getElementById(config.containerId);

  if (!container) {
    return null;
  }

  container.innerHTML = `
    <div class="table-shell">
      <div class="table-toolbar">
        <div class="table-actions">
          <div class="table-filter-group" id="${config.containerId}-filters"></div>
          <div class="table-search-group">
            <input id="${config.containerId}-search" class="table-search-input" type="search" placeholder="Search ${config.searchLabel}..." />
            <button id="${config.containerId}-reset" class="table-reset-btn" type="button">Reset</button>
          </div>
        </div>
      </div>
      <div class="table-scroll">
        <table id="${config.containerId}-datatable" class="display data-table">
          <thead>
            <tr>
              ${config.columns
                .map((column) => `<th>${escapeHtml(column.label)}</th>`)
                .join("")}
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  `;

  return container.querySelector("table");
}

function populateTableBody(tableElement, rowMatrix) {
  const tbody = tableElement.querySelector("tbody");

  tbody.innerHTML = rowMatrix
    .map(
      (row) => `
        <tr>
          ${row
            .map(
              (cell) =>
                `<td data-order="${escapeHtml(cell.sortValue)}" data-search="${escapeHtml(
                  cell.filterValue
                )}">${escapeHtml(cell.display)}</td>`
            )
            .join("")}
        </tr>
      `
    )
    .join("");
}

function populateFilters(config, dataTable, rowMatrix) {
  const filtersContainer = document.getElementById(`${config.containerId}-filters`);

  if (!filtersContainer) {
    return;
  }

  filtersContainer.innerHTML = config.filters
    .map((filter) => {
      const uniqueValues = [...new Set(
        rowMatrix
          .map((row) => row[filter.columnIndex]?.filterValue)
          .filter((value) => value !== undefined && value !== "")
      )].sort((left, right) => String(left).localeCompare(String(right)));

      return `
        <div class="table-filter">
          <label for="${config.containerId}-${filter.id}">${escapeHtml(filter.label)}</label>
          <select id="${config.containerId}-${filter.id}">
            <option value="">All ${escapeHtml(filter.label)}</option>
            ${uniqueValues
              .map(
                (value) =>
                  `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`
              )
              .join("")}
          </select>
        </div>
      `;
    })
    .join("");

  config.filters.forEach((filter) => {
    const select = document.getElementById(`${config.containerId}-${filter.id}`);

    if (!select) {
      return;
    }

    select.addEventListener("change", () => {
      const escaped = $.fn.dataTable.util.escapeRegex(select.value);
      dataTable
        .column(filter.columnIndex)
        .search(select.value ? `^${escaped}$` : "", true, false)
        .draw();
    });
  });
}

function attachToolbarEvents(config, dataTable) {
  const searchInput = document.getElementById(`${config.containerId}-search`);
  const resetButton = document.getElementById(`${config.containerId}-reset`);

  searchInput?.addEventListener("input", () => {
    dataTable.search(searchInput.value).draw();
  });

  resetButton?.addEventListener("click", () => {
    dataTable.search("");

    config.filters.forEach((filter) => {
      const select = document.getElementById(`${config.containerId}-${filter.id}`);
      if (select) {
        select.value = "";
      }

      dataTable.column(filter.columnIndex).search("");
    });

    if (searchInput) {
      searchInput.value = "";
    }

    dataTable.draw();
  });
}

function initializeTable(config, data) {
  const tableElement = createTableShell(config);

  if (!tableElement) {
    return;
  }

  const rowMatrix = buildTableRows(data, config.columns);
  populateTableBody(tableElement, rowMatrix);

  const dataTable = $(tableElement).DataTable({
    dom: "Brtip",
    buttons: ["copy", "excel", "csv", "print"],
    pageLength: 10,
    lengthMenu: [10, 25, 50, 100],
    autoWidth: false,
    order: config.defaultOrder,
  });

  const exportContainer = document.getElementById(config.exportContainerId);
  if (exportContainer) {
    exportContainer.className = "export-buttons-container";
    exportContainer.innerHTML = "";
    dataTable.buttons().container().appendTo(exportContainer);
  }

  populateFilters(config, dataTable, rowMatrix);
  attachToolbarEvents(config, dataTable);
}

function createBookingDataTable(bookings) {

  initializeTable(
    {
      containerId: "booking-table",
      exportContainerId: "booking_down",
      searchLabel: "bookings",
      defaultOrder: [[3, "desc"]],
      filters: [
        { id: "status", label: "Status", columnIndex: 2 },
        { id: "guest-mix", label: "Guest Mix", columnIndex: 10 },
      ],
      columns: [
        {
          label: "Booking ID",
          display: (row) => `${row["Booking ID"]}`,
          sort: (row) => Number(row["Booking ID"]),
        },
        {
          label: "Guest ID",
          display: (row) => `${row["Guest ID"]}`,
          sort: (row) => Number(row["Guest ID"]),
        },
        {
          label: "Status",
          display: (row) =>
            BOOKING_STATUS_LABELS[row["Booking Status"]] || row["Booking Status"] || "Unknown",
        },
        {
          label: "Arrival Date",
          display: (row) => formatDate(row["Arrival Day"]),
          sort: (row) => Number(row["Arrival Day"]),
        },
        {
          label: "Arrival Time",
          display: (row) => formatTime(row["Arrival Minute"]),
          sort: (row) => Number(row["Arrival Minute"]),
        },
        {
          label: "Departure Date",
          display: (row) => formatDate(row["Departure Day"]),
          sort: (row) => Number(row["Departure Day"]),
        },
        {
          label: "Departure Time",
          display: (row) => formatTime(row["Departure Minute"]),
          sort: (row) => Number(row["Departure Minute"]),
        },
        {
          label: "Nights",
          display: (row) => `${row["Number of Days"]}`,
          sort: (row) => Number(row["Number of Days"]),
        },
        {
          label: "Adults",
          display: (row) => `${row["Adult Count"]}`,
          sort: (row) => Number(row["Adult Count"]),
        },
        {
          label: "Children",
          display: (row) => `${Array.isArray(row["Child Ages"]) ? row["Child Ages"].length : 0}`,
          sort: (row) => (Array.isArray(row["Child Ages"]) ? row["Child Ages"].length : 0),
        },
        {
          label: "Guest Mix",
          display: (row) =>
            Array.isArray(row["Child Ages"]) && row["Child Ages"].length > 0
              ? "Family Booking"
              : "Adults Only",
        },
        {
          label: "Unit ID",
          display: (row) => `${row["Booking Unit ID"]}`,
          sort: (row) => Number(row["Booking Unit ID"]),
        },
        {
          label: "ADR",
          display: (row) => formatMoney(row["Effective Average Daily Rate"]),
          sort: (row) => Number(row["Effective Average Daily Rate"]),
        },
        {
          label: "Accommodation",
          display: (row) => formatMoney(row["Accommodation Total"]),
          sort: (row) => Number(row["Accommodation Total"]),
        },
        {
          label: "Deposit",
          display: (row) => formatMoney(row["Deposit Total"]),
          sort: (row) => Number(row["Deposit Total"]),
        },
        {
          label: "Total Charge",
          display: (row) => formatMoney(row["Total Actual Charge"]),
          sort: (row) => Number(row["Total Actual Charge"]),
        },
      ],
    },
    bookings
  );
}

function createClientDataTable(clients) {
  const ages = clients
    .map((client) => calculateAge(client["Birth Date"]))
    .filter((age) => Number.isFinite(age));

  initializeTable(
    {
      containerId: "client-table",
      exportContainerId: "client_down",
      searchLabel: "clients",
      defaultOrder: [[5, "desc"]],
      filters: [
        { id: "membership", label: "Membership", columnIndex: 6 },
        { id: "gender", label: "Gender", columnIndex: 3 },
      ],
      columns: [
        {
          label: "Client ID",
          display: (row) => `${row["Client ID"]}`,
          sort: (row) => Number(row["Client ID"]),
        },
        {
          label: "Full Name",
          display: (row) => `${row["First Name"] || ""} ${row["Surname"] || ""}`.trim(),
        },
        {
          label: "Given Name",
          display: (row) => row["Given Name"] || "",
        },
        {
          label: "Gender",
          display: (row) => row["Gender"] || "",
        },
        {
          label: "Birth Date",
          display: (row) => formatDate(row["Birth Date"]),
          sort: (row) => Number(row["Birth Date"]),
        },
        {
          label: "Age",
          display: (row) => `${calculateAge(row["Birth Date"])}`,
          sort: (row) => Number(calculateAge(row["Birth Date"])),
        },
        {
          label: "Membership",
          display: (row) => getMembershipStatus(row),
        },
        {
          label: "Membership IDs",
          display: (row) =>
            Array.isArray(row["Membership List"]) && row["Membership List"].length > 0
              ? row["Membership List"].join(", ")
              : "None",
        },
        {
          label: "Membership Count",
          display: (row) =>
            `${Array.isArray(row["Membership List"]) ? row["Membership List"].length : 0}`,
          sort: (row) =>
            Array.isArray(row["Membership List"]) ? row["Membership List"].length : 0,
        },
      ],
    },
    clients
  );
}

async function initializeTables() {
  try {
    const [bookings, clients] = await Promise.all([
      getBookingsData(),
      getClientData(),
    ]);

    createBookingDataTable(bookings);
    createClientDataTable(clients);
  } catch (error) {
    console.error("Unable to initialize datasource tables:", error);
    const bookingContainer = document.getElementById("booking-table");
    const clientContainer = document.getElementById("client-table");

    if (bookingContainer) {
      bookingContainer.innerHTML =
        "<div class='table-shell'><div class='table-toolbar'>Booking data is temporarily unavailable.</div></div>";
    }

    if (clientContainer) {
      clientContainer.innerHTML =
        "<div class='table-shell'><div class='table-toolbar'>Client data is temporarily unavailable.</div></div>";
    }
  }
}

initializeTables();
