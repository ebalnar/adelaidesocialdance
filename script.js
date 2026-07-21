(function () {
  "use strict";

  const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const ALL_STYLES = ["Salsa", "Bachata", "Zouk", "Kizomba", "West Coast Swing", "Swing", "Line Dance", "Scottish Country Dance", "Rock 'n' Roll", "Ballroom", "Samba", "Cumbia", "Tango", "Festival"];

  const activeFilters = new Set(); // empty set = show all
  const activeLearnFilters = new Set(); // empty set = show all schools

  function toISODate(d) {
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }

  function startOfWeek(date) {
    // Monday-start week
    const d = new Date(date);
    const day = d.getDay(); // 0 = Sunday
    const diff = (day === 0 ? -6 : 1 - day);
    d.setDate(d.getDate() + diff);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  function addDays(date, n) {
    const d = new Date(date);
    d.setDate(d.getDate() + n);
    return d;
  }

  function formatDayHeading(date) {
    return DAY_NAMES[date.getDay()] + " " + date.getDate() + " " + MONTH_NAMES[date.getMonth()];
  }

  // A day's events stay visible until 5AM the next morning (events often run
  // past midnight), then drop off the list entirely. So "today" for display
  // purposes is actually still "yesterday" until 5AM rolls around.
  function getEffectiveCutoffDate(now) {
    const cutoff = new Date(now);
    if (now.getHours() < 5) {
      cutoff.setDate(cutoff.getDate() - 1);
    }
    cutoff.setHours(0, 0, 0, 0);
    return cutoff;
  }

  function formatWeekRange(start, end) {
    const sameMonth = start.getMonth() === end.getMonth();
    const startStr = MONTH_NAMES[start.getMonth()] + " " + start.getDate();
    const endStr = (sameMonth ? "" : MONTH_NAMES[end.getMonth()] + " ") + end.getDate();
    return startStr + " – " + endStr;
  }

  function styleColor(style) {
    return (STYLE_COLORS && STYLE_COLORS[style]) || DEFAULT_STYLE_COLOR || "#6b7280";
  }

  // Return array of events occurring on a given Date object.
  function eventsForDate(date) {
    const iso = toISODate(date);
    const dow = date.getDay();
    return EVENTS.filter(function (ev) {
      if (ev.recurrence === "weekly") return ev.dayOfWeek === dow;
      if (ev.recurrence === "dated") return ev.dates.indexOf(iso) !== -1;
      return false;
    });
  }

  function eventMatchesFilter(ev) {
    if (activeFilters.size === 0) return true;
    return ev.styles.some(function (s) { return activeFilters.has(s); });
  }

  function buildStyleTags(styles) {
    return styles.map(function (s) {
      return '<span class="style-tag" style="--tag-color:' + styleColor(s) + '">' + s + "</span>";
    }).join("");
  }

  function buildMiniStyleTags(styles) {
    return styles.map(function (s) {
      return '<span class="style-tag-mini" style="--tag-color:' + styleColor(s) + '">' + s + "</span>";
    }).join("");
  }

  function buildEventCard(ev, dateISO) {
    const cardId = "ev-" + ev.id + "-" + dateISO;
    const linkHtml = ev.link ? '<a class="event-link" href="' + ev.link + '" target="_blank" rel="noopener">Visit event page →</a>' : "";
    const noteHtml = ev.note ? '<div class="event-note">Note: ' + ev.note + "</div>" : "";

    return (
      '<div class="event-card" data-id="' + cardId + '" data-styles="' + ev.styles.join("|") + '">' +
        '<button class="event-toggle" aria-expanded="false">' +
          '<div class="event-main">' +
            '<p class="event-name">' + ev.name + "</p>" +
            '<div class="style-tags-mini">' + buildMiniStyleTags(ev.styles) + "</div>" +
            '<div class="event-meta"><span>' + ev.venue + "</span><span>·</span><span>" + ev.time + "</span><span>·</span><span>" + ev.cost + "</span></div>" +
          "</div>" +
          '<span class="event-chevron">▾</span>' +
        "</button>" +
        '<div class="event-details">' +
          '<div class="detail-row"><span class="label">Venue</span><span class="value">' + ev.venue + ", " + ev.address + "</span></div>" +
          '<div class="detail-row"><span class="label">Host</span><span class="value">' + ev.host + "</span></div>" +
          '<div class="detail-row"><span class="label">Time</span><span class="value">' + ev.time + "</span></div>" +
          '<div class="detail-row"><span class="label">Cost</span><span class="value">' + ev.cost + "</span></div>" +
          '<p class="event-desc">' + ev.description + "</p>" +
          noteHtml +
          linkHtml +
          '<div class="style-tags">' + buildStyleTags(ev.styles) + "</div>" +
        "</div>" +
      "</div>"
    );
  }

  function buildDayBlock(date, isToday, cutoff) {
    if (date < cutoff) return ""; // day has passed (past the 5AM rollover) — drop it

    const dayEvents = eventsForDate(date).sort(function (a, b) { return a.name.localeCompare(b.name); });
    const iso = toISODate(date);
    const visibleEvents = dayEvents; // filtering applied via CSS display toggling later

    if (visibleEvents.length === 0) return "";

    const cards = visibleEvents.map(function (ev) { return buildEventCard(ev, iso); }).join("");

    return (
      '<div class="day-block" data-date="' + iso + '">' +
        '<h3 class="day-heading">' + formatDayHeading(date) + (isToday ? '<span class="today-flag">Today</span>' : "") + "</h3>" +
        cards +
      "</div>"
    );
  }

  function buildWeekSection(label, weekStart, cutoff) {
    const weekEnd = addDays(weekStart, 6);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let dayBlocks = "";
    for (let i = 0; i < 7; i++) {
      const d = addDays(weekStart, i);
      const isToday = toISODate(d) === toISODate(today);
      dayBlocks += buildDayBlock(d, isToday, cutoff);
    }

    return (
      '<section class="week-section">' +
        '<div class="week-heading">' + label + "</div>" +
        '<div class="week-range">' + formatWeekRange(weekStart, weekEnd) + "</div>" +
        (dayBlocks || '<p class="empty-day-note">No events found for this week yet.</p>') +
      "</section>"
    );
  }

  // Build the list of weeks to display: today's week through the end of
  // next calendar month (i.e. roughly the next two calendar months).
  function buildWeeksList(today) {
    const thisWeekStart = startOfWeek(today);
    const coverageEnd = new Date(today.getFullYear(), today.getMonth() + 2, 0); // last day of next month

    const weeks = [];
    let cursor = thisWeekStart;
    let i = 0;
    while (cursor <= coverageEnd) {
      let label;
      if (i === 0) label = "This Week";
      else if (i === 1) label = "Next Week";
      else label = "Week of " + MONTH_NAMES[cursor.getMonth()] + " " + cursor.getDate();
      weeks.push({ label: label, start: cursor });
      cursor = addDays(cursor, 7);
      i++;
    }
    return { weeks: weeks, coverageEnd: coverageEnd };
  }

  function renderTopNote(coverageEnd) {
    const el = document.getElementById("scope-note");
    if (!el) return;
    el.textContent = "Showing every event we know about, from today through the end of " +
      MONTH_NAMES[coverageEnd.getMonth()] + " " + coverageEnd.getFullYear() + ".";
  }

  function render() {
    const now = new Date();
    const cutoff = getEffectiveCutoffDate(now);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const built = buildWeeksList(today);
    const html = built.weeks.map(function (w) { return buildWeekSection(w.label, w.start, cutoff); }).join("");

    document.getElementById("calendar").innerHTML = html;
    applyFilters();
    attachCardHandlers();
    renderTopNote(built.coverageEnd);
  }

  function attachCardHandlers() {
    document.querySelectorAll(".event-toggle").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const card = btn.closest(".event-card");
        const open = card.classList.toggle("open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
    });
  }

  function applyFilters() {
    document.querySelectorAll(".event-card").forEach(function (card) {
      const styles = card.getAttribute("data-styles").split("|");
      const show = activeFilters.size === 0 || styles.some(function (s) { return activeFilters.has(s); });
      card.style.display = show ? "" : "none";
    });

    document.querySelectorAll(".day-block").forEach(function (block) {
      const anyVisible = Array.from(block.querySelectorAll(".event-card")).some(function (c) { return c.style.display !== "none"; });
      block.style.display = anyVisible ? "" : "none";
    });
  }

  function buildFilterBar() {
    const bar = document.getElementById("filter-bar");
    let html = '<button class="filter-btn active" data-style="__all__">All Styles</button>';
    html += ALL_STYLES.map(function (s) {
      return '<button class="filter-btn" data-style="' + s + '" style="--dot:' + styleColor(s) + '"><span class="dot"></span>' + s + "</button>";
    }).join("");
    bar.innerHTML = html;

    bar.addEventListener("click", function (e) {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      const style = btn.getAttribute("data-style");

      if (style === "__all__") {
        activeFilters.clear();
        bar.querySelectorAll(".filter-btn").forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
      } else {
        bar.querySelector('[data-style="__all__"]').classList.remove("active");
        if (activeFilters.has(style)) {
          activeFilters.delete(style);
          btn.classList.remove("active");
        } else {
          activeFilters.add(style);
          btn.classList.add("active");
        }
        if (activeFilters.size === 0) {
          bar.querySelector('[data-style="__all__"]').classList.add("active");
        }
      }
      applyFilters();
    });
  }

  // ------------------------------------------------------------ where-to-learn
  function buildLearnView() {
    const container = document.getElementById("learn-content");
    if (!container || typeof SCHOOLS === "undefined") return;

    const html = Object.keys(SCHOOLS).map(function (genre) {
      const schools = SCHOOLS[genre];
      const color = styleColor(genre === "Swing Dancing" ? "Swing" : genre);
      const rows = schools.map(function (s) {
        const locationHtml = s.location ? '<p class="school-location">' + s.location + "</p>" : "";
        const descHtml = s.description ? '<p class="school-desc">' + s.description + "</p>" : "";
        const noteHtml = s.note ? '<p class="school-note">' + s.note + "</p>" : "";
        const linkHtml = s.link
          ? '<a class="school-link" href="' + s.link + '" target="_blank" rel="noopener">Visit website →</a>'
          : "";
        return (
          '<li class="school-row">' +
            '<p class="school-name">' + s.name + "</p>" +
            locationHtml +
            descHtml +
            linkHtml +
            noteHtml +
          "</li>"
        );
      }).join("");

      return (
        '<div class="genre-block" data-genre="' + genre + '">' +
          '<h3 class="genre-heading" style="--tag-color:' + color + '">' + genre + "</h3>" +
          '<ul class="school-list">' + rows + "</ul>" +
        "</div>"
      );
    }).join("");

    container.innerHTML = html;
  }

  function applyLearnFilters() {
    document.querySelectorAll(".genre-block").forEach(function (block) {
      const genre = block.getAttribute("data-genre");
      const show = activeLearnFilters.size === 0 || activeLearnFilters.has(genre);
      block.style.display = show ? "" : "none";
    });
  }

  function buildLearnFilterBar() {
    const bar = document.getElementById("learn-filter-bar");
    if (!bar || typeof SCHOOLS === "undefined") return;
    const genres = Object.keys(SCHOOLS);

    let html = '<button class="filter-btn active" data-genre="__all__">All Styles</button>';
    html += genres.map(function (g) {
      const color = styleColor(g === "Swing Dancing" ? "Swing" : g);
      return '<button class="filter-btn" data-genre="' + g + '" style="--dot:' + color + '"><span class="dot"></span>' + g + "</button>";
    }).join("");
    bar.innerHTML = html;

    bar.addEventListener("click", function (e) {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      const genre = btn.getAttribute("data-genre");

      if (genre === "__all__") {
        activeLearnFilters.clear();
        bar.querySelectorAll(".filter-btn").forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
      } else {
        bar.querySelector('[data-genre="__all__"]').classList.remove("active");
        if (activeLearnFilters.has(genre)) {
          activeLearnFilters.delete(genre);
          btn.classList.remove("active");
        } else {
          activeLearnFilters.add(genre);
          btn.classList.add("active");
        }
        if (activeLearnFilters.size === 0) {
          bar.querySelector('[data-genre="__all__"]').classList.add("active");
        }
      }
      applyLearnFilters();
    });
  }

  // ------------------------------------------------------------ calendar grid
  const DOW_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let calMode = "month";
  let calAnchor = new Date();
  calAnchor.setHours(0, 0, 0, 0);

  function addMonths(date, n) {
    return new Date(date.getFullYear(), date.getMonth() + n, 1);
  }

  function buildDowHeaderRow() {
    return DOW_SHORT.map(function (d) { return '<div class="cal-dow">' + d + "</div>"; }).join("");
  }

  function buildCalCell(date, inMonth, isWeekMode) {
    const iso = toISODate(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isToday = iso === toISODate(today);
    const events = eventsForDate(date).sort(function (a, b) { return a.name.localeCompare(b.name); });
    const maxShow = isWeekMode ? 8 : 3;
    const shown = events.slice(0, maxShow);
    const extra = events.length - shown.length;

    const pills = shown.map(function (ev) {
      const color = ev.styles && ev.styles[0] ? styleColor(ev.styles[0]) : DEFAULT_STYLE_COLOR;
      return '<div class="cal-event"><span class="dot" style="background:' + color + '"></span><span class="cal-event-label">' + ev.name + "</span></div>";
    }).join("");
    const moreHtml = extra > 0 ? '<div class="cal-more">+' + extra + " more</div>" : "";

    let classes = "cal-cell";
    if (!inMonth) classes += " cal-cell-out";
    if (isToday) classes += " cal-cell-today";
    if (events.length) classes += " cal-cell-has-events";

    return (
      '<div class="' + classes + '" data-date="' + iso + '">' +
        '<div class="cal-daynum">' + date.getDate() + "</div>" +
        '<div class="cal-events">' + pills + moreHtml + "</div>" +
      "</div>"
    );
  }

  function renderCalGrid() {
    const label = document.getElementById("cal-label");
    const grid = document.getElementById("cal-grid");
    if (!grid || !label) return;

    let html = buildDowHeaderRow();

    if (calMode === "month") {
      const first = new Date(calAnchor.getFullYear(), calAnchor.getMonth(), 1);
      label.textContent = MONTH_NAMES[first.getMonth()] + " " + first.getFullYear();

      const daysInMonth = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
      const lastOfMonth = new Date(first.getFullYear(), first.getMonth(), daysInMonth);
      const startGrid = startOfWeek(first);
      const endGrid = addDays(startOfWeek(lastOfMonth), 6);

      let cursor = startGrid;
      while (cursor <= endGrid) {
        html += buildCalCell(cursor, cursor.getMonth() === first.getMonth(), false);
        cursor = addDays(cursor, 1);
      }
      grid.className = "cal-grid cal-grid-month";
    } else {
      const weekStart = startOfWeek(calAnchor);
      const weekEnd = addDays(weekStart, 6);
      label.textContent = formatWeekRange(weekStart, weekEnd) + ", " + weekStart.getFullYear();

      for (let i = 0; i < 7; i++) {
        html += buildCalCell(addDays(weekStart, i), true, true);
      }
      grid.className = "cal-grid cal-grid-week";
    }

    grid.innerHTML = html;
    attachCalCellHandlers();
  }

  function jumpToDayInList(iso) {
    const bar = document.getElementById("tab-bar");
    const whatsonBtn = bar && bar.querySelector('[data-view="calendar"]');
    if (whatsonBtn) whatsonBtn.click();

    setTimeout(function () {
      const target = document.querySelector('.day-block[data-date="' + iso + '"]');
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      target.classList.add("day-block-flash");
      setTimeout(function () { target.classList.remove("day-block-flash"); }, 1500);
    }, 60);
  }

  function attachCalCellHandlers() {
    // Overflow days from the previous/next month are shown dimmed just for grid
    // alignment — they're not meaningfully clickable, so skip them.
    document.querySelectorAll(".cal-cell:not(.cal-cell-out)").forEach(function (cell) {
      cell.addEventListener("click", function () {
        jumpToDayInList(cell.getAttribute("data-date"));
      });
    });
  }

  function setupCalControls() {
    const prev = document.getElementById("cal-prev");
    const next = document.getElementById("cal-next");
    const todayBtn = document.getElementById("cal-today");
    const modeBtns = document.querySelectorAll(".cal-mode-btn");
    if (!prev) return;

    prev.addEventListener("click", function () {
      calAnchor = calMode === "month" ? addMonths(calAnchor, -1) : addDays(calAnchor, -7);
      renderCalGrid();
    });
    next.addEventListener("click", function () {
      calAnchor = calMode === "month" ? addMonths(calAnchor, 1) : addDays(calAnchor, 7);
      renderCalGrid();
    });
    todayBtn.addEventListener("click", function () {
      calAnchor = new Date();
      calAnchor.setHours(0, 0, 0, 0);
      renderCalGrid();
    });
    modeBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        modeBtns.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        calMode = btn.getAttribute("data-mode");
        renderCalGrid();
      });
    });
  }

  function setupTabs() {
    const bar = document.getElementById("tab-bar");
    if (!bar) return;
    bar.addEventListener("click", function (e) {
      const btn = e.target.closest(".tab-btn");
      if (!btn) return;
      const view = btn.getAttribute("data-view");

      bar.querySelectorAll(".tab-btn").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");

      document.querySelectorAll(".view").forEach(function (v) { v.hidden = true; });
      document.getElementById("view-" + view).hidden = false;
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    buildFilterBar();
    render();
    buildLearnView();
    buildLearnFilterBar();
    setupCalControls();
    renderCalGrid();
    setupTabs();
  });
})();
