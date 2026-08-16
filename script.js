const tracks = {
  ai: {
    label: "Track one",
    title: "AI Coding Foundations",
    description:
      "Learn how to direct AI tools, review generated code, spot weak assumptions, and turn an idea into a working interface.",
    items: [
      "Prompt briefs that developers can actually use",
      "Code reading for non traditional builders",
      "Feature planning, testing, and iteration"
    ]
  },
  product: {
    label: "Track two",
    title: "Product Judgment",
    description:
      "Train yourself to see the whole product, including users, data, risk, flows, copy, and the decisions that make an app feel dependable.",
    items: [
      "User journeys and feature boundaries",
      "Acceptance criteria before implementation",
      "Launch scope that stays realistic"
    ]
  },
  deploy: {
    label: "Track three",
    title: "GitHub, Supabase, and Vercel",
    description:
      "Understand the practical route from local files to a live product, with checks for configuration, security, and user access.",
    items: [
      "GitHub repository setup",
      "Supabase tables, storage, and policies",
      "Vercel deployment and release checks"
    ]
  },
  security: {
    label: "Track four",
    title: "Security and Trust Basics",
    description:
      "Learn the practical checks that keep AI built apps safer, including access rules, form handling, data exposure, and deployment settings.",
    items: [
      "Common security mistakes in fast builds",
      "Supabase policy thinking for beginners",
      "Launch checks before sharing a public link"
    ]
  }
};

const tabs = document.querySelectorAll(".track-tab");
const label = document.querySelector("#track-label");
const title = document.querySelector("#track-title");
const description = document.querySelector("#track-description");
const list = document.querySelector("#track-list");
const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".nav");
const waitlistForms = document.querySelectorAll("[data-waitlist-form]");

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const getWaitlistEntries = () => JSON.parse(localStorage.getItem("labipilot_waitlist") || "[]");

const setText = (selector, value) => {
  const element = document.querySelector(selector);
  if (element) {
    element.textContent = value;
  }
};

const csvValue = (value) => `"${String(value || "").replaceAll('"', '""')}"`;

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const track = tracks[tab.dataset.track];
    tabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    label.textContent = track.label;
    title.textContent = track.title;
    description.textContent = track.description;
    list.innerHTML = track.items.map((item) => `<li>${item}</li>`).join("");
  });
});

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

waitlistForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const entry = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      interest: String(formData.get("interest") || "General LabiPilot waitlist").trim(),
      createdAt: new Date().toISOString()
    };

    if (!entry.name || !entry.email) {
      const note = form.querySelector(".form-note");
      if (note) {
        note.textContent = "Please add your name and email before submitting.";
      }
      return;
    }

    const existing = getWaitlistEntries();
    existing.push(entry);
    localStorage.setItem("labipilot_waitlist", JSON.stringify(existing));
    const note = form.querySelector(".form-note");
    if (note) {
      note.textContent =
        "Thank you. Your request has been saved on this device. Supabase connection is the next live data step.";
    }
    form.reset();
  });
});

const waitlistTable = document.querySelector("[data-waitlist-table]");
if (waitlistTable) {
  const signups = getWaitlistEntries();
  setText("[data-admin-total]", signups.length);
  setText("[data-admin-source]", "Local");

  if (signups.length) {
    const latest = signups
      .map((item) => new Date(item.createdAt).getTime())
      .filter(Boolean)
      .sort((a, b) => b - a)[0];
    const days = latest ? Math.floor((Date.now() - latest) / 86400000) : 0;
    setText("[data-admin-latest]", days);
    setText("[data-admin-status]", `${signups.length} local signup${signups.length === 1 ? "" : "s"} found on this device.`);
  } else {
    setText("[data-admin-latest]", 0);
    setText("[data-admin-status]", "No local signups yet. Add a test signup from the contact page.");
  }

  waitlistTable.innerHTML = signups.length
    ? signups
        .map(
          (item) => `
            <tr>
              <td>${escapeHtml(item.name)}</td>
              <td>${escapeHtml(item.email)}</td>
              <td>${escapeHtml(item.interest)}</td>
              <td>${escapeHtml(new Date(item.createdAt).toLocaleString())}</td>
            </tr>
          `
        )
        .join("")
    : `<tr><td colspan="4">No local waitlist entries yet.</td></tr>`;
}

const exportWaitlistButton = document.querySelector("[data-export-waitlist]");
if (exportWaitlistButton) {
  exportWaitlistButton.addEventListener("click", () => {
    const signups = getWaitlistEntries();
    if (!signups.length) {
      exportWaitlistButton.textContent = "Nothing to export";
      return;
    }
    const rows = [
      ["Name", "Email", "Interest", "Submitted"],
      ...signups.map((item) => [item.name, item.email, item.interest, item.createdAt])
    ];
    const csv = rows.map((row) => row.map(csvValue).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "labipilot-waitlist.csv";
    link.click();
    URL.revokeObjectURL(url);
    exportWaitlistButton.textContent = "Exported";
  });
}

const clearWaitlistButton = document.querySelector("[data-clear-waitlist]");
if (clearWaitlistButton) {
  clearWaitlistButton.addEventListener("click", () => {
    localStorage.removeItem("labipilot_waitlist");
    window.location.reload();
  });
}

const completedLessons = JSON.parse(localStorage.getItem("labipilot_completed_lessons") || "[]");
const dashboardCompleted = document.querySelector("[data-dashboard-completed]");
if (dashboardCompleted) {
  dashboardCompleted.textContent = completedLessons.length;
}

document.querySelectorAll("[data-progress-row]").forEach((row) => {
  if (completedLessons.includes(row.dataset.progressRow)) {
    row.classList.add("done");
  }
});

document.querySelectorAll("[data-complete-lesson]").forEach((button) => {
  button.addEventListener("click", () => {
    const lessonId = button.dataset.completeLesson;
    const nextLessons = completedLessons.includes(lessonId)
      ? completedLessons
      : [...completedLessons, lessonId];
    localStorage.setItem("labipilot_completed_lessons", JSON.stringify(nextLessons));
    const status = document.querySelector("[data-lesson-status]");
    if (status) {
      status.textContent = "Lesson complete. Open the dashboard to see your progress.";
    }
    button.textContent = "Lesson completed";
    button.disabled = true;
  });
});

document.querySelectorAll("[data-copy-target]").forEach((button) => {
  button.addEventListener("click", async () => {
    const target = document.getElementById(button.dataset.copyTarget);
    if (!target) {
      return;
    }
    try {
      await navigator.clipboard.writeText(target.textContent);
      button.textContent = "Copied";
    } catch {
      button.textContent = "Select and copy";
    }
  });
});
