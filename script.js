document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id"); // This gets the ?id=xxx value
  if (id) {
    loadProjectDetails(id);
  } else {
    console.error("No project ID provided in the URL.");
  }
});

function loadProjectDetails(id) {
  fetch("project-details.json")
    .then((response) => response.json())
    .then((data) => {
      const project = data.projects.find((p) => p.id === id);
      if (project) {
        renderHeroHead(project);
        renderOverviewChallenge(project);
        renderTechStack(project);
        renderCardsSection(project);
        renderGallery(project);
        renderResults(project);
        renderKeyLearnings(project);
        renderNavButtons(data, id);
        // Initialize AOS
        AOS.init({
          once: true,
          duration: 800,
          easing: "ease-out-cubic",
        });

        // Mobile Menu Toggle
        const menuToggle = document.getElementById("menu-toggle");
        const mobileMenu = document.getElementById("mobile-menu");

        menuToggle.addEventListener("click", () => {
          mobileMenu.classList.toggle("hidden");
        });

        // Current Year
        document.getElementById("current-year").textContent =
          new Date().getFullYear();

        // Preloader
        window.addEventListener("load", () => {
          const preloader = document.querySelector(".preloader");
          setTimeout(() => {
            preloader.classList.add("fade-out");
          }, 500);
        });

        // Custom Cursor
        const cursor = document.querySelector(".custom-cursor");
        const cursorDot = document.querySelector(".cursor-dot");

        document.addEventListener("mousemove", (e) => {
          cursor.style.left = e.clientX + "px";
          cursor.style.top = e.clientY + "px";

          cursorDot.style.left = e.clientX + "px";
          cursorDot.style.top = e.clientY + "px";
        });

        document.addEventListener("mousedown", () => {
          cursor.style.width = "15px";
          cursor.style.height = "15px";
          cursor.style.backgroundColor = "rgba(79, 70, 229, 0.6)";
        });

        document.addEventListener("mouseup", () => {
          cursor.style.width = "20px";
          cursor.style.height = "20px";
          cursor.style.backgroundColor = "rgba(79, 70, 229, 0.3)";
        });

        // Initialize Lightbox
        lightbox.option({
          resizeDuration: 300,
          wrapAround: true,
          fadeDuration: 300,
        });
      } else {
        console.log("Project not found");
        window.location.href = "index.html";
      }
    })
    .catch((error) => {
      console.error("Error fetching project details: ", error);
    });
}

function renderHeroHead(data) {
  const projectType = document.getElementById("projectType");
  const projectName = document.getElementById("projectName");
  const heroImage = document.getElementById("heroImage");
  const projectClient = document.getElementById("projectClient");
  const projectTimeLine = document.getElementById("projectTimeLine");
  const projectRole = document.getElementById("projectRole");
  const liveLink = document.getElementById("liveLink");
  projectType.innerHTML = data.client.type;
  projectName.innerHTML = data.title;
  heroImage.src = data.image;
  projectClient.innerHTML = data.client.name;
  projectTimeLine.innerHTML = data.timeline;
  projectRole.innerHTML = data.role;
  liveLink.href = data.live_link;
}
function renderOverviewChallenge(data) {
  const overviewContainer = document.getElementById("overViewContainer");
  overviewContainer.innerHTML = ""; // clear existing content

  if (
    Array.isArray(data.project_overview) &&
    data.project_overview.length > 0
  ) {
    data.project_overview.forEach((text) => {
      const overview = document.createElement("p");
      overview.innerHTML = text;
      overview.classList.add("text-gray-600", "mb-4", "leading-relaxed");
      overviewContainer.appendChild(overview);
    });
  }

  const challengeSection = document.getElementById("challengeSection");
  const challengeTitle = document.getElementById("challengeTitle");
  const challengeContainer = document.getElementById("challengeContainer");
  challengeContainer.innerHTML = ""; // clear existing content

  if (data.challenge) {
    const hasParagraphs =
      Array.isArray(data.challenge.paragraphs) &&
      data.challenge.paragraphs.length > 0;
    const hasPoints =
      Array.isArray(data.challenge.points) && data.challenge.points.length > 0;

    if (!hasParagraphs && !hasPoints) {
      challengeSection.innerHTML = "";
      return;
    }

    challengeTitle.innerHTML = data.challenge.title_change;

    if (hasParagraphs) {
      data.challenge.paragraphs.forEach((text) => {
        const para = document.createElement("p");
        para.innerHTML = text;
        para.classList.add("text-gray-600", "mb-4", "leading-relaxed");
        challengeContainer.appendChild(para);
      });
    }

    if (hasPoints) {
      const ul = document.createElement("ul");
      ul.classList.add(
        "list-disc",
        "pl-6",
        "text-gray-600",
        "space-y-2",
        "mb-4"
      );
      data.challenge.points.forEach((point) => {
        const li = document.createElement("li");
        li.innerHTML = point;
        ul.appendChild(li);
      });
      challengeContainer.appendChild(ul);
    }
  } else {
    challengeSection.innerHTML = "";
  }
}

function renderTechStack(data) {
  const techStackContainer = document.getElementById("techStackContainer");
  const techStackDescription = document.getElementById("techStackDescription");
  const techStackSection = document.getElementById("techStackSection");

  if (data.technologies_used) {
    if (data.technologies_used.tech_stack) {
      for (let i = 0; i < data.technologies_used.tech_stack.length; i++) {
        const techStack = document.createElement("span");
        techStack.innerHTML = data.technologies_used.tech_stack[i];
        techStack.classList.add(
          "bg-indigo-50",
          "text-indigo-700",
          "px-3",
          "py-1",
          "rounded-full"
        );
        techStackContainer.appendChild(techStack);
      }
    }

    if (data.technologies_used.description) {
      techStackDescription.innerHTML = data.technologies_used.description;
    }
  } else {
    techStackSection.innerHTML = "";
  }
}

function renderCardsSection(data) {
  const titleContainer = document.getElementById("cardSection1_title");
  const descriptionContainer = document.getElementById(
    "cardSection1_description"
  );
  const cardSection1 = document.getElementById("cardSection1");
  const cardContainer = document.getElementById("cardSection_container");

  if (data.card_section_1) {
    const title = data.card_section_1.title;
    const paragraph = data.card_section_1.paragraph;
    const details = data.card_section_1.details;

    if (title) {
      titleContainer.innerHTML = title;
    }
    if (paragraph) {
      descriptionContainer.innerHTML = paragraph;
    }

    if (details) {
      for (let i = 0; i < details.length; i++) {
        const card = document.createElement("div");
        card.className = "bg-white p-6 rounded-lg shadow-md";

        card.innerHTML = `
        <div class="text-indigo-600 text-xl mb-3">
            <i class="fas ${details[i].icon}"></i>
        </div>
        <h3 class="text-lg font-semibold mb-2 font-playfair">${details[i].title}</h3>
        <p class="text-gray-600">${details[i].description}</p>
    `;
        cardContainer.appendChild(card);
      }
    }
  } else {
    cardSection1.innerHTML = "";
  }
}

function renderGallery(data) {
  const galleryContainer = document.getElementById("projectGalleryContainer");
  if (data && data.gallery) {
    const images = data.gallery;
    for (let i = 0; i < data.gallery.length; i++) {
      var card = `
    <a href="${images[i].src}"
       data-lightbox="project-gallery"
       class="gallery-item rounded-lg overflow-hidden img-hover-zoom">
       <img src="${images[i].src}"
            alt="${images[i].alt}" class="w-full h-48 object-cover">
    </a>
    `;

      galleryContainer.innerHTML += card;
    }
  }
}

function renderResults(data) {
  const resultContainer = document.getElementById("resultContainer");
  const resultDescription = document.getElementById("resultDescription");
  const resultSection = document.getElementById("resultSection");

  if (data.results_impact) {
    const results = data.results_impact;
    if (!results.paragraph && !results.details) {
      resultSection.innerHTML = "";
      return;
    } else if (results.paragraph == "" && results.details.length < 1) {
      resultSection.innerHTML = "";
      return;
    }
    if (results.paragraph && results.paragraph != "") {
      resultDescription.innerHTML = results.paragraph;
    }

    if (results.details && results.details.length > 0) {
      for (let i = 0; i < results.details.length; i++) {
        var card = `<div class="bg-white p-6 rounded-lg shadow-md text-center">
                            <div class="text-indigo-600 text-3xl font-bold mb-2">
                                ${results.details[i].digit}
                            </div>
                            <p class="text-gray-600">
                                ${results.details[i].impact}
                            </p>
                        </div>
            `;
        resultContainer.innerHTML += card;
      }
    }
  } else {
    resultSection.innerHTML = "";
  }
}

function renderKeyLearnings(data) {
  const keyLearningsContainer = document.getElementById(
    "keyLearningsContainer"
  );
  const keyLearningSection = document.getElementById("keyLearningSection");

  if (data.key_learnings) {
    const key_learnings = data.key_learnings;
    if (key_learnings.paragraphs) {
      if (key_learnings.paragraphs.length > 0) {
        for (let i = 0; i < key_learnings.paragraphs.length; i++) {
          const key_learning = document.createElement("p");
          key_learning.innerHTML = key_learnings.paragraphs[i];
          key_learning.classList.add(
            "text-gray-600",
            "mb-4",
            "leading-relaxed"
          );
          keyLearningsContainer.appendChild(key_learning);
        }
      }
    }

    if (key_learnings.points) {
      const points = document.createElement("ul");
      points.classList.add("list-disc", "pl-6", "text-gray-600", "space-y-2");
      keyLearningsContainer.appendChild(points);
      if (key_learnings.points.length > 0) {
        for (let i = 0; i < key_learnings.points.length; i++) {
          const point = document.createElement("li");
          point.innerHTML = key_learnings.points[i];
          points.appendChild(point);
        }
      }
    }
  } else {
    keyLearningSection.innerHTML = "";
  }
}

function renderNavButtons(project, id) {
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");
  var projects = project.projects;
  const currentProjectId = id;

  // Assuming 'projects' is your array
  const currentIndex = projects.findIndex((p) => p.id === currentProjectId);

  const aboveProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const belowProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  if (aboveProject) {
    nextButton.href = `project-details.html?id=${aboveProject.id}`;
    nextButton.innerHTML = ` <span class="block text-sm text-gray-500 mb-1">Previous Project</span>
                            <span class="text-indigo-600 group-hover:text-indigo-700 font-medium flex items-center">
                                <i
                                    class="fas fa-arrow-left mr-2 transform group-hover:-translate-x-1 transition-transform"></i>
                                ${aboveProject.title}
                            </span>`;
  } else {
    nextButton.innerHTML = "";
  }

  if (belowProject) {
    prevButton.href = `project-details.html?id=${belowProject.id}`;
    prevButton.innerHTML = ` <span class="block text-sm text-gray-500 mb-1">Next Project</span>
                            <span
                                class="text-indigo-600 group-hover:text-indigo-700 font-medium flex items-center justify-end">
                                ${belowProject.title}
                                <i
                                    class="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform"></i>
                            </span>`;
  } else {
    prevButton.innerHTML = "";
  }
}
