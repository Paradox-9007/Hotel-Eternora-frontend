import holidays from "./holiday-data.js";

const DateTime = luxon.DateTime;



// ─────────────────────────────────────────────
// State
// ─────────────────────────────────────────────

const state = {
  selectedCountry: "Thailand",
  currentYear: DateTime.local().year,
  currentMonth: DateTime.local().month,
};

let carouselBound = false;

// ─────────────────────────────────────────────
// Dynamic Holiday Generator
// ─────────────────────────────────────────────

function getYearHolidayData() {
  const countryData =
    holidays?.[state.selectedCountry];

  if (!countryData) {
    return {};
  }
    return (
    countryData[state.currentYear] || {}
    );
}

// ─────────────────────────────────────────────
// Holiday Counter
// ─────────────────────────────────────────────

function countMonthHolidays(
  month,
  holidayList
) {
  return Object.keys(
    holidayList
  ).filter((dateString) => {
    return (
      DateTime.fromISO(
        dateString
      ).month === month
    );
  }).length;
}

// ─────────────────────────────────────────────
// Calendar Insights
// ─────────────────────────────────────────────

function updateCalendarInsights() {
  const heading = document.getElementById(
    "fullcalendartext"
  );

  const holidayList = getYearHolidayData();

  const holidayCount = Object.values(
    holidayList
    ).reduce((total, holiday) => {
    return total +
        (Array.isArray(holiday)
        ? holiday.length
        : 1);
    }, 0);

  const selectedMonthName = DateTime.local(
    state.currentYear,
    state.currentMonth
  ).toFormat("LLLL");

  const selectedMonthHolidayCount =
    countMonthHolidays(
      state.currentMonth,
      holidayList
    );

  heading.innerHTML = `
    <h4 class="text-center mb-2">
      Full Year Calendar
    </h4>

    <p class="text-center mb-0">
      ${state.selectedCountry}
      public holidays for
      ${state.currentYear}
      with ${selectedMonthName}
      highlighted in the carousel.
    </p>
  `;

  // Optional Insights Chips
  const insights =
    document.getElementById(
      "calendar-insights"
    );

  if (insights) {
    insights.innerHTML = `
      <div class="insight-chip">
        <strong>Country:</strong>
        ${state.selectedCountry}
      </div>

      <div class="insight-chip">
        <strong>Year:</strong>
        ${state.currentYear}
      </div>

      <div class="insight-chip">
        <strong>Holiday Days:</strong>
        ${holidayCount}
      </div>

      <div class="insight-chip">
        <strong>${selectedMonthName}:</strong>
        ${selectedMonthHolidayCount}
        holiday${
          selectedMonthHolidayCount === 1
            ? ""
            : "s"
        }
      </div>
    `;
  }
}

// ─────────────────────────────────────────────
// Generate Calendar
// ─────────────────────────────────────────────

function generateCalendar(
  month,
  year,
  holidayList
) {
  const dt = DateTime.local(year, month);

  const firstDay = dt.startOf("month");

  const lastDay = dt.endOf("month");

  const today = DateTime.local();

  const monthHolidayCount =
    countMonthHolidays(month, holidayList);

  let html = `
    <div class="calendar-month">

      <div class="month-header">
        <h4>
          ${dt.toFormat("LLLL yyyy")}
        </h4>

        <span class="month-badge">
          ${monthHolidayCount}
          holiday${
            monthHolidayCount === 1
              ? ""
              : "s"
          }
        </span>
      </div>

      <div class="calendar-days">

        ${[
          "Sun",
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
        ]
          .map(
            (day) =>
              `
                <div class="day-header">
                  ${day}
                </div>
              `
          )
          .join("")}
  `;

  // Empty Cells

  for (
    let index = 0;
    index < firstDay.weekday % 7;
    index += 1
  ) {
    html += `
      <div class="calendar-cell is-empty">
      </div>
    `;
  }

  // Calendar Days

  for (
    let day = 1;
    day <= lastDay.day;
    day += 1
  ) {
    const currentDate = DateTime.local(
      year,
      month,
      day
    );

    const fullDateStr =
      currentDate.toISODate();

    const holidayNamesRaw =
    holidayList[fullDateStr];

    const holidayNames = Array.isArray(
    holidayNamesRaw
    )
    ? holidayNamesRaw
    : holidayNamesRaw
    ? [holidayNamesRaw]
    : [];

    const isHoliday =
    holidayNames.length > 0;

    const isToday = currentDate.hasSame(
      today,
      "day"
    );

    html += `
      <div
        class="
          calendar-cell
          ${isHoliday ? "holiday" : ""}
          ${isToday ? "today" : ""}
        "
      >

        <div class="day-number">
          ${day}
        </div>

        ${
          isHoliday
            ? `
              <div class="holiday-label">
                ${holidayNames.join("<br>")}
              </div>
            `
            : ""
        }

        ${
          isToday && !isHoliday
            ? `
              <div class="holiday-label">
                Today
              </div>
            `
            : ""
        }

      </div>
    `;
  }

  html += `
      </div>
    </div>
  `;

  return html;
}

// ─────────────────────────────────────────────
// Carousel Events
// ─────────────────────────────────────────────

function bindCarouselEvents() {
  if (carouselBound) {
    return;
  }

  const carouselElement =
    document.getElementById(
      "carouselExample"
    );

  carouselElement.addEventListener(
    "slide.bs.carousel",
    (event) => {
      state.currentMonth = event.to + 1;

      document.getElementById(
        "month-select"
      ).value = state.currentMonth;

      updateCalendarInsights();
    }
  );

  carouselBound = true;
}

// ─────────────────────────────────────────────
// Populate Carousel
// ─────────────────────────────────────────────

function populateCarousel() {
  const calendarCarousel =
    document.getElementById(
      "calendar-carousel"
    );

  const holidayList =
    getYearHolidayData();

  calendarCarousel.innerHTML = "";

  for (
    let month = 1;
    month <= 12;
    month += 1
  ) {
    const slide =
      document.createElement("div");

    slide.className = `
      carousel-item${
        month === state.currentMonth
          ? " active"
          : ""
      }
    `;

    slide.innerHTML = generateCalendar(
      month,
      state.currentYear,
      holidayList
    );

    calendarCarousel.appendChild(slide);
  }

  const carousel =
    bootstrap.Carousel.getOrCreateInstance(
      document.getElementById(
        "carouselExample"
      ),
      {
        interval: false,
        ride: false,
      }
    );

  carousel.to(state.currentMonth - 1);

  updateCalendarInsights();

  bindCarouselEvents();
}

// ─────────────────────────────────────────────
// Initialize Calendar
// ─────────────────────────────────────────────

function initializeCalendar() {
  const yearSelect =
    document.getElementById(
      "year-select"
    );

  const monthSelect =
    document.getElementById(
      "month-select"
    );

  const countrySelect =
    document.getElementById(
      "country-select"
    );

  const todayButton =
    document.getElementById(
      "calendar-today-btn"
    );

  const now = DateTime.local();

  yearSelect.value = state.currentYear;

  monthSelect.value = state.currentMonth;

  countrySelect.value =
    state.selectedCountry;

  // Year Change

  yearSelect.addEventListener(
    "change",
    (event) => {
      state.currentYear =
        Number.parseInt(
          event.target.value,
          10
        );

      populateCarousel();
    }
  );

  // Month Change

  monthSelect.addEventListener(
    "change",
    (event) => {
      state.currentMonth =
        Number.parseInt(
          event.target.value,
          10
        );

      populateCarousel();
    }
  );

  // Country Change

  countrySelect.addEventListener(
    "change",
    (event) => {
      state.selectedCountry =
        event.target.value;

      populateCarousel();
    }
  );

  // Current Month Button

  todayButton.addEventListener(
    "click",
    () => {
      state.currentYear = now.year;

      state.currentMonth = now.month;

      yearSelect.value =
        state.currentYear;

      monthSelect.value =
        state.currentMonth;

      populateCarousel();
    }
  );

  populateCarousel();
}

// ─────────────────────────────────────────────
// Start
// ─────────────────────────────────────────────

document.addEventListener(
  "DOMContentLoaded",
  initializeCalendar
);


