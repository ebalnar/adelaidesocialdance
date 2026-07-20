(function () {
  "use strict";

  const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const ALL_STYLES = ["Salsa", "Bachata", "Zouk", "Kizomba", "West Coast Swing", "Line Dance", "Festival"];

  const activeFilters = new Set(); // empty set = show all

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

  function buildEventCard(ev, dateISO) {
    const cardId = "ev-" + ev.id + "-" + dateISO;
    const linkHtml = ev.link ? '<a class="event-link" href="' + ev.link + '" target="_blank" rel="noopener">Visit event page →</a>' : "";
    const noteHtml = ev.note ? '<div class="event-note">Note: ' + ev.note + "</div>" : "";

    return (
      '<div class="event-card" data-id="' + cardId + '" data-styles="' + ev.styles.join("|") + '">' +
        '<button class="event-toggle" aria-expanded="false">' +
          '<div class="event-main">' +
            '<p class="event-name">' + ev.name + "</p>" +
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

  function buildDayBlock(date, isToday) {
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

  function buildWeekSection(label, weekStart) {
    const weekEnd = addDays(weekStart, 6);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let dayBlocks = "";
    for (let i = 0; i < 7; i++) {
      const d = addDays(weekStart, i);
      const isToday = toISODate(d) === toISODate(today);
      dayBlocks += buildDayBlock(d, isToday);
    }

    return (
      '<section class="week-section">' +
        '<div class="week-heading">' + label + "</div>" +
        '<div class="week-range">' + formatWeekRange(weekStart, weekEnd) + "</div>" +
        (dayBlocks || '<p class="empty-day-note">No events found for this week yet.</p>') +
      "</section>"
    );
  }

  function render() {
    const today = new Date();
    const thisWeekStart = startOfWeek(today);
    const nextWeekStart = addDays(thisWeekStart, 7);

    const html =
      buildWeekSection("This Week", thisWeekStart) +
      buildWeekSection("Next Week", nextWeekStart);

    document.getElementById("calendar").innerHTML = html;
    applyFilters();
    attachCardHandlers();
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

  document.addEventListener("DOMContentLoaded", function () {
    buildFilterBar();
    render();
  });
})();
