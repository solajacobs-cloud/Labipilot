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
const form = document.querySelector(".join-form");

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

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const note = form.querySelector(".form-note");
    if (note) {
      note.textContent =
        "Thank you. Connect this form to Supabase when you want to collect real signups.";
    }
  });
}
