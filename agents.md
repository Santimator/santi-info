For any Hugo-related command or build, check .github/workflows/*.yml for the canonical setup and reuse it.

I'm considering taking inspiration on this site: https://iddi-labs.com/

## Hugo to GitHub Pages Pipeline with Modular Strategy

This site uses Hugo static site generator with a highly modular architecture for deployment to GitHub Pages.

### Pipeline Overview

1. **Content Management**: Markdown files in `content/` directory
2. **Data Layer**: TOML files in `data/` for structured data (CV, education, etc.)
3. **Templates**: Modular layouts in `layouts/` directory
4. **Build Process**: GitHub Actions workflow in `.github/workflows/hugo.yml`
5. **Deployment**: Automatic deployment to GitHub Pages

### Modular Architecture

- **Content**: Separate markdown files for each section (astrology.md, cv.md, education.md, etc.)
- **Data**: Structured TOML files for CV components (education, experience, images, links)
- **Layouts**: Reusable partials for CV sections
- **Styling**: Modular SCSS files in `assets/scss/`
- **Configuration**: Centralized in `config.toml`

### Build Strategy

The GitHub Actions workflow handles:
- Hugo installation and build
- Artifact generation
- Automatic deployment to GitHub Pages

This modular approach allows for easy content updates, reusable components, and maintainable code structure.
