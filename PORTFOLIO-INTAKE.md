# Portfolio Content Intake — Question Paper

**How to use this:** Answer anything you want changed. Where I've already pulled the
**current value** from the site, you can just write `KEEP` to leave it as-is, edit it
inline, or replace it entirely. Leave a field blank only if you genuinely don't have an
answer — I'll write the UX copy around your raw facts, so bullet points and fragments are
totally fine. You don't have to write polished sentences; that's my job.

> Scope note: **Projects are intentionally excluded** for now. Everything else that the
> site displays is covered below. Sections are ordered roughly by importance.

---



## SECTION 0 — Ground rules for your answers

- Give me **facts, not prose**. e.g. "started Innobot Nov 2025, not Sep" is perfect.
- If a date/number is wrong anywhere, flag it once here and I'll fix every instance.
- For anything you want me to invent or embellish, write `YOU WRITE IT` and I will.
- ⚠️ **Date conflict I already spotted:** the site says both **Sep 2025** and **Nov 2025**
for the Innobot Health start date. Please settle it in Q1.6 and I'll make it consistent.

---



## SECTION 1 — Identity & the basics

> Lands on: every page (name, title, meta), the `identity.json` block, the dev console.


| #   | Question                                             | Current value                                                 | Your answer                                                   |
| --- | ---------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| 1.1 | Full name (as displayed)                             | Kovidha Subasinghe                                            | Kovidha Subasinghe                                            |
| 1.2 | Name pronunciation (optional, for a tooltip)         | —                                                             |                                                               |
| 1.3 | Primary job title / headline                         | Intern Software Engineer · Software Engineering Undergraduate | Intern Software Engineer · Software Engineering Undergraduate |
| 1.4 | One-line "focus" descriptor                          | backend · automation · systems                                | backend, automation systems, saas systems                     |
| 1.5 | Location (city, country)                             | Galle, Sri Lanka                                              | Galle, Sri Lanka                                              |
| 1.6 | **Current role + start date (resolve the conflict)** | Intern @ Innobot Health — Sep 2025 *vs* Nov 2025              | Intern @ Innobot Health since Nov 2025                        |
| 1.7 | Are you currently available for opportunities?       | Yes (`available: true`)                                       | Yes                                                           |
| 1.8 | What are you seeking?                                | internships · collaborations                                  | Freelance projects, collaborations                            |
| 1.9 | Pronouns (only if you want them shown)               | not shown                                                     |                                                               |


---



## SECTION 2 — Contact & links

> Lands on: contact page, footers, nav, dev console, SEO structured data.


| #    | Question                                                                                                               | Current value                                                     | Your answer                                                                                                                            |
| ---- | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| 2.1  | Primary email                                                                                                          | [kovidhasubasinghe@gmail.com](mailto:kovidhasubasinghe@gmail.com) |                                                                                                                                        |
| 2.2  | GitHub URL + handle                                                                                                    | github.com/RogueChocoholic                                        |                                                                                                                                        |
| 2.3  | LinkedIn URL + handle                                                                                                  | linkedin.com/in/kovidha-subasinghe                                |                                                                                                                                        |
| 2.4  | Behance URL (design era)                                                                                               | behance.net/kovidhasubasinghe                                     |                                                                                                                                        |
| 2.5  | X / Twitter handle                                                                                                     | @devChocoholic                                                    |                                                                                                                                        |
| 2.6  | Any other links? (Instagram, YouTube, blog, Dribbble, etc.)                                                            | none shown                                                        |                                                                                                                                        |
| 2.7  | Phone number — show it or not?                                                                                         | not shown                                                         | 0704520494                                                                                                                             |
| 2.8  | Preferred contact method order                                                                                         | Email first, then LinkedIn                                        | email -> mobile -> linkedin                                                                                                            |
| 2.9  | Live deployment domain (for canonical/SEO URLs)                                                                        | kovidha-subasinghe.vercel.app                                     | kovidha.me                                                                                                                             |
| 2.10 | Do you want the contact form to actually send (e.g. via Basin/Formspree), or keep the "opens your mail app" behaviour? | opens mail app                                                    | i'll make a telegram bot and give you the id and my own chat id. the contact form should give me a structured message through the bot. |


---



## SECTION 3 — Home: Hero section

> The first thing visitors see. Big name + a 1–2 line bio.

- **3.1 — Big-name display.** Currently shows `KOVIDHA SUBASINGHE`. Keep, or use a different display (e.g. just first name)? → `keep it as is`
- **3.2 — Hero label (tiny line above the name).** Current: *"Intern Software Engineer · Undergraduate"*. → keep as is
- **3.3 — Hero bio (the punchy 2-liner).** Current:
  > "Software engineering undergraduate building real systems for real clients. Backend-focused · automation at Innobot Health · architecture-minded." Keep / rewrite / give me bullet facts and I'll write it → keep as is **3.4 — Giant background watchword.** Current: `BACKEND`. One word that defines you. → `BACKEND`

---



## SECTION 4 — Home: About teaser

> A pull-quote + a short 3-paragraph intro that links to the full About page.

- **4.1 — The big quote.** Current:
  > "I don't just write code — I architect systems and own their lifecycle."
  > Keep / rewrite / `YOU WRITE IT` → `keep`
- **4.2 — Short intro paragraphs.** These currently summarise: who you are, your degree, Innobot role, what your work focuses on. Any facts to add/change beyond Sections 1 & 6? → what already is is enough

---



## SECTION 5 — Skills

> Lands on: home skills section (animated bars + terminal demo), about page tool tags,
> dev console `skills` command.

**5.1 — Confirm the skill list and proficiency %.** These percentages drive the animated
bars. Edit numbers, add/remove rows.

**Languages**


| Skill         | Current % | Your % |
| ------------- | --------- | ------ |
| Java          | 75        | 80     |
| Python        | 80        | 85     |
| PHP           | 78        | 80     |
| JavaScript    | 72        | 75     |
| *(add more?)* |           |        |


**Automation**


| Skill           | Current % | Your % |
| --------------- | --------- | ------ |
| Python (RPA)    | 82        |        |
| Selenium        | 78        |        |
| Google APIs     | 75        |        |
| API Integration | 80        |        |


**Frameworks**


| Skill                           | Current % | Your % |
| ------------------------------- | --------- | ------ |
| Laravel                         | 65        |        |
| Spring Boot                     | 55        |        |
| *(Bootstrap? React? Tailwind?)* |           |        |


**Databases**


| Skill              | Current % | Your % |
| ------------------ | --------- | ------ |
| MySQL              | 85        | 90     |
| PostgreSQL         | 70        | 85     |
| Firebase Firestore | 68        | 78     |
| SQLite             | 72        | 72     |


- **5.2 — Tools** (shown as tags, no %). Current: Postman, IntelliJ IDEA, VS Code,
HeidiSQL, Google APIs. Add/remove (Git, Docker, Figma, Linux, etc.)? → `____`
- **5.3 — Any new skill categories** you want (e.g. "Cloud", "DevOps", "Testing")? → `micro services`
- **5.4 — Do the proficiency %s feel honest?** If you'd rather not show numbers at all, say so and I'll switch to a labels-only style (e.g. "Proficient / Solid / Learning"). → `do lables`

---



## SECTION 6 — Experience timeline

> Lands on: home experience section. Each entry = date range, role, company, description, tags.

For **each role**, confirm or edit. Add rows for anything missing.

**6.1 — Innobot Health**

- Dates: `Sep 2025 – Present` *(or Nov — see Q1.6)* → `Nov 11th`
- Role: `Intern Software Engineer` → `____`
- Company / location: `Innobot Health · Remote (USA healthcare)` → `____`
- What you do (1–2 lines or bullets): current = *"Python automations and RPA for US
healthcare/insurance operations — Selenium workflows, Google API integrations, multi-step
pipelines."* → `____`
- Tags: `Python, Selenium, Google APIs, RPA, API Integration` → `____`

**6.2 — Dessina.co**

- Dates: `Feb 2025 – Present` → `____`
- Role: `Software Engineer` → `____`
- Company / location: `Dessina.co · Colombo` → `Remote`
- What you do: current = *"Full SDLC for client projects — web & desktop apps with Java,
PHP, MySQL, JS, Bootstrap; ongoing client support."* → `____`
- Tags: `Java, PHP, MySQL, Full Stack` → `____`

**6.3 — Freelance Web Developer**

- Dates: `Oct 2024 – Present` → `____`
- Role: `Freelance Web Developer` → `____`
- Location: `Self-employed · Sri Lanka` → `____`
- What you do: current = *"Client-facing web apps & portals — LMS to reservation systems,
owning architecture, build, maintenance."* → `____`
- Tags: `PHP, MySQL, Client work` → `____`

**6.4 — Any other roles/jobs/internships** to add (or remove)? → `____`

---



## SECTION 7 — Education

> Lands on: experience timeline + about page + SEO.


| #   | Question                                               | Current value                                                        | Your answer                                                                                                                                                                                                         |
| --- | ------------------------------------------------------ | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 7.1 | Degree                                                 | BSc (Hons) Software Engineering                                      |                                                                                                                                                                                                                     |
| 7.2 | Awarding university                                    | Birmingham City University                                           |                                                                                                                                                                                                                     |
| 7.3 | Delivered via / local institute                        | Java Institute for Advanced Technology                               |                                                                                                                                                                                                                     |
| 7.4 | Dates (start – expected grad)                          | 2023 – 2027                                                          |                                                                                                                                                                                                                     |
| 7.5 | Location of study                                      | Galle, Sri Lanka                                                     | Colombo, Sri Lanka                                                                                                                                                                                                  |
| 7.6 | GPA / classification / honors (show it?)               | not shown                                                            | Undergraduate                                                                                                                                                                                                       |
| 7.7 | Relevant coursework worth highlighting                 | "fundamentals, systems architecture, databases, applied development" | database management, object oriented programming, microservices, android, object oriented design patterns, web development, java EE,                                                                                |
| 7.8 | Earlier schooling worth listing (e.g. Mahinda College) | implied via Web Team MCG                                             | Primary Education Siridhamma College 2008-2012 Secondary Education Mahinda College 2012 - 2021                                                                                                                      |
| 7.9 | Certifications / online courses to feature             | none shown                                                           | **Level 4 Professional Diploma in Software Engineering** **([https://verify.skillsandeducationgroup.co.uk/?reference=86278091-01-D6OU](https://verify.skillsandeducationgroup.co.uk/?reference=86278091-01-D6OU))** |


---



## SECTION 8 — About page: Origin story

> The "Who am I?" narrative section.

- **8.1 — Opening hook line.** Current (serif, italic):
  > "I didn't get into software engineering to build todo apps. I got into it to build
  > systems that solve actual problems."
  > Keep / rewrite / `YOU WRITE IT` → `____`
- **8.2 — The story (a few paragraphs).** What should the narrative cover beyond the facts
already captured? Anything personal about *why* you got into engineering, a turning point, what drives you? Bullets are fine. → `Tried to get into software because of interest and passion but didn't know how or where to start so i worked on graphics and editing. Finally found a way to start with java institute and my coding journey began`
- **8.3 — Page hero headline.** Current: *"THE ENGINEER behind the code."* → `____`

---



## SECTION 9 — About page: Philosophy (3 principles)

> Three numbered principles describing how you think/work. Confirm or replace each.

- **9.1 — Principle 01.** Current title: **ARCHITECTURE FIRST** —
*"Before I write a line of code, I understand the shape of the problem..."* → `____`
- **9.2 — Principle 02.** Current title: **OWN THE LIFECYCLE** —
*"I've shipped systems from a blank file to production..."* → `____`
- **9.3 — Principle 03.** Current title: **AUTOMATE OR DIE** —
*"If a human is doing something a script could do, that's a problem I need to solve..."*
→ `____`
- **9.4 — Want a different number of principles** (e.g. 4)? Or different themes? → `____`

---



## SECTION 10 — About page: Creative / design era

> The "earlier chapter" section about your graphic-design background.


| #    | Question                                | Current value                                                                                                           | Your answer |
| ---- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------- |
| 10.1 | Keep this section at all?               | yes                                                                                                                     |             |
| 10.2 | Era date range                          | 2021 – 2025 (and 2017–2022 for MCG)                                                                                     |             |
| 10.3 | Roles to list                           | Graphic Designer · Web Team MCG (2017–2022); Past VP · Web Team MCG (2021–2022); Freelance Graphic Designer (2021–2025) |             |
| 10.4 | Short description of the design chapter | current text mentions Web Team MCG, freelance visuals, brand storytelling                                               |             |
| 10.5 | Behance link to feature                 | behance.net/kovidhasubasinghe                                                                                           |             |
| 10.6 | Any other creative achievements/awards  | none shown                                                                                                              |             |


---



## SECTION 11 — Personality & interests

> The icon cards + quotes on the About page that give you character.

- **11.1 — Interest/trait cards** (currently 3): **Chocoholic** (dark chocolate, no milk),
**Systems thinker**, **Reliability-obsessed**. Keep, edit the blurbs, or add more
(hobbies, sports, music, gaming, reading)? → `____`
- **11.2 — The "chocoholic" running gag.** It appears in several places (dev console easter
egg, identity.json, boot sequence). Keep it? Any other signature quirk you'd like woven
through? → `____`
- **11.3 — Favourite quote(s).** Current secondary quote:
  > "The best engineers aren't the ones who know everything — they're the ones who know how
  > to figure things out fast."
  > Keep / replace / add → `____`
- **11.4 — A fun fact or two** I can sprinkle in → `both cat person and a dog person`

---



## SECTION 12 — Tone & voice

> So my UX writing matches you.

- **12.1 — How should you come across?** (pick / mix: confident, humble, playful, blunt, technical, warm, cinematic, minimal) → `playful, confident`
- **12.2 — Any words/phrases to avoid?** (e.g. "passionate", "ninja", "rockstar") → `____`
- **12.3 — Any signature phrases you DO want used?** → `____`
- **12.4 — British or American spelling?** (site currently mixes; I'll standardise) → `british`

---



## SECTION 13 — Easter eggs & boot sequence (optional flair)

> Lands on: the intro terminal animation + the ```-key dev console. Pure personality —
> skip if you don't care, and I'll keep the current vibe.

- **13.1 — Intro boot lines.** Current is a fake-OS boot ("KOVIDHA.OS v2.4.1 — booting...",
"Loading cacao dependency", etc.). Keep / tweak / new gags? → `____`
- **13.2 — Dev console commands.** Currently: `help, about, skills, projects, contact, chocoholic, clear, exit`. Want any extra hidden commands (e.g. `resume`, `joke`,
`coffee`, `sudo`)? → `____`
- **13.3 — Hidden message / secret** you'd enjoy people discovering? → `____`

---



## SECTION 14 — Assets & files

> Things I can't write — you need to provide the files.


| #    | Item                            | Current state                             | Notes / your answer |
| ---- | ------------------------------- | ----------------------------------------- | ------------------- |
| 14.1 | Profile photo                   | `assets/img/hero.png`                     | provide new one?    |
| 14.2 | Open Graph / social share image | uses hero.png                             | want a custom one?  |
| 14.3 | Resume / CV PDF                 | `assets/cv/Kovidha-Subasinghe-Resume.pdf` | provide latest      |
| 14.4 | Favicon / logo                  | `KS.` monogram + favicons                 | keep?               |
| 14.5 | Any brand colors to change      | cacao/amber/cream dark theme              | keep?               |


---



## SECTION 15 — SEO & meta (I can mostly handle this)

> I'll auto-generate most of this from your answers above. Only answer if you have prefs.

- **15.1 — Search keywords** you specifically want to rank for → `kovidha, kovidha subasinghe, chocoholic`
- **15.2 — Meta description tweaks** (the blurb shown in Google results) → `___`
- **15.3 — Preferred site title format** (current: "Kovidha Subasinghe | Intern Software Engineer & SWE Undergraduate") → Kovidha Subasinghe | Let's collaborate

---



### Final notes / anything else

Put anything that didn't fit above here — corrections, ideas, "remove X entirely", etc.

→ `____`

---

*Once you fill this in (even partially), hand it back and I'll populate every page,
resolve the date inconsistencies, and write all the supporting copy. Projects we'll tackle
separately.*