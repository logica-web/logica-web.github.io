# Research Team

Logica and its associated projects are developed and maintained by a dedicated team of researchers and engineers committed to advancing the fields of declarative data science and logic programming.

<div class="team-grid">

<div class="team-card">
  <div class="team-photo">
    <img src="/publications/photo/evgeny.png" alt="Evgeny Skvortsov" />
  </div>
  <h3><a href="https://research.google/people/evgenyskvortsov/?&type=google" target="_blank" rel="noopener noreferrer">Evgeny Skvortsov</a></h3>
  <p class="title">Senior Staff Software Engineer</p>
  <p class="institution">Google</p>
</div>

<div class="team-card">
  <div class="team-photo">
    <img src="/publications/photo/ojaswa.png" alt="Ojaswa Garg" />
  </div>
  <h3><a href="https://www.linkedin.com/in/ojaswa-garg/" target="_blank" rel="noopener noreferrer">Ojaswa Garg</a></h3>
  <p class="title">AI Engineer</p>
  <p class="institution">Google</p>
</div>

<div class="team-card">
  <div class="team-photo">
    <img src="/publications/photo/shayan.png" alt="Shayan Mirjafari" />
  </div>
  <h3><a href="https://scholar.google.com/citations?user=CrwgHuwAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">Shayan Mirjafari</a></h3>
  <p class="title">AI Software Engineer</p>
  <p class="institution">Google</p>
</div>

<div class="team-card">
  <div class="team-photo">
    <img src="/publications/photo/yilin.png" alt="Yilin Xia" />
  </div>
  <h3><a href="https://ischool.illinois.edu/people/yilin-xia" target="_blank" rel="noopener noreferrer">Yilin Xia</a></h3>
  <p class="title">PhD Student</p>
  <p class="institution">University of Illinois Urbana-Champaign</p>
</div>

<div class="team-card">
  <div class="team-photo">
    <img src="/publications/photo/shawn.jpg" alt="Shawn Bowers" />
  </div>
  <h3><a href="https://www.gonzaga.edu/academics/faculty-listing/detail/shawn-bowers-phd-e0ff96a0" target="_blank" rel="noopener noreferrer">Shawn Bowers</a></h3>
  <p class="title">Professor</p>
  <p class="institution">Gonzaga University</p>
</div>

<div class="team-card">
  <div class="team-photo">
    <img src="/publications/photo/bertram.jpg" alt="Bertram Ludäscher" />
  </div>
  <h3><a href="https://ischool.illinois.edu/people/bertram-ludascher" target="_blank" rel="noopener noreferrer">Bertram Ludäscher</a></h3>
  <p class="title">Professor</p>
  <p class="institution">University of Illinois Urbana-Champaign</p>
</div>

</div>


<style>
.team-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin: 2rem 0;
}

@media (max-width: 768px) {
  .team-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .team-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

.team-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.5rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 12px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.team-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.team-photo {
  width: 150px;
  height: 150px;
  margin-bottom: 1rem;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--vp-c-brand-1);
  flex-shrink: 0;
}

.team-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.team-card h3 {
  margin: 0.5rem 0 0.25rem 0;
  font-size: 1.2rem;
  color: var(--vp-c-text-1);
  min-height: 2.4em;
  line-height: 1.2em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.team-card h3 a {
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: color 0.2s;
}

.team-card h3 a:hover {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
}

.team-card .title {
  margin: 0.25rem 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  min-height: 2.5em;
  line-height: 1.25em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.team-card .institution {
  margin: 0.25rem 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  font-style: italic;
  min-height: 2.4em;
  line-height: 1.2em;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
