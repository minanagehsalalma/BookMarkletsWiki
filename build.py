import json
from jinja2 import Environment, FileSystemLoader
import os
import urllib.parse


# --- Configuration ---
DATA_FILE = 'data/bookmarklets.json'
TEMPLATE_DIR = 'templates'
OUTPUT_DIR = '.'
REPO_URL_RAW = 'https://raw.githubusercontent.com/minanagehsalalma/BookMarkletsWiki/refs/heads/main'


# --- Main Build Logic ---
def main():
    # 1. Set up Jinja2 environment
    env = Environment(
        loader=FileSystemLoader(TEMPLATE_DIR),
        trim_blocks=True,
        lstrip_blocks=True
    )

    # 2. Load and process data
    with open(DATA_FILE, 'r') as f:
        data = json.load(f)

    for category in data['categories']:
        for bm in category['bookmarklets']:
            if bm.get('source_file'):
                # Read the raw JS from the source file
                with open(bm['source_file'].lstrip('/'), 'r') as f:
                    js_code = f.read().strip()

                # Escape the JS code for use in a bookmarklet
                js_code = urllib.parse.quote(js_code, safe='')

                # Create the javascript: URL
                bm['bookmarklet_url'] = f"javascript:{js_code}"
            else:
                # Fallback for bookmarklets without a source file
                bm['bookmarklet_url'] = "#"

            # Ensure the image path is absolute
            if bm.get('image'):
                bm['image'] = urllib.parse.urljoin(REPO_URL_RAW, bm['image'].lstrip('/'))

    # 3. Prepare context for templates
    context = {
        'metadata': data['metadata'],
        'categories': data['categories']
    }

    # 4. Render and save the HTML file
    template_html = env.get_template('index.html.j2')
    output_html = template_html.render(context)
    with open(os.path.join(OUTPUT_DIR, 'index.html'), 'w') as f:
        f.write(output_html)
    print("✅ index.html built successfully!")

    # 5. Render and save the README file
    template_readme = env.get_template('README.md.j2')
    output_readme = template_readme.render(context)
    with open(os.path.join(OUTPUT_DIR, 'README_test.md'), 'w') as f:
        f.write(output_readme)
    print("✅ README.md built successfully!")


if __name__ == '__main__':
    main()
