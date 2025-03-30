---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  # name: "logica_web"
  text: "Logic Programming Language for Data Analysis"
  tagline:  Logica (= Logic + aggregation) is an open-source, feature-enhanced version of Datalog that automatically compiles logic rules to query engines
  image:
    src: /max_flow.png
  actions:
    - theme: brand
      text: Getting Started
      link: /start/
    - theme: alt
      text: ⚽ Logica Playground
      link: https://logica.dev/sandbox.html
    - theme: alt
      text: User Guide
      link: /usrguide


features:
  - icon: <i class="fa-solid fa-rocket  fa-1x iconcolor" ></i>
    title: Declarative Data Science Simplified
    details: Logica’s intuitive syntax bridges beginner queries and complex data analysis.
  - icon: <i class="fa-solid fa-database fa-1x iconcolor"></i> 
    title: Versatile Query Engine Support
    details:  Compatible with SQLite, PostgreSQL, and BigQuery for diverse workflows.
  - icon: <i class="fa-solid fa-diagram-project  fa-1x iconcolor"></i>
    title: Native Python Workflow Support
    details:  Seamlessly integrates with Jupyter Notebooks / Google Colab for analysis and visualization.
  - icon: <i class="fa-solid fa-medal fa-1x iconcolor"></i>
    title: Enhanced Features for Data Science
    details: Advanced functions, named arguments, and aggregation for real-world tasks.
---