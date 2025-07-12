# My Favorite Bookmarklets

A curated collection of useful and fun bookmarklets to enhance your browsing experience.

## 📚 What are Bookmarklets?

Bookmarklets are small JavaScript programs stored as a URL in a browser's bookmark. When clicked, they execute the JavaScript code on the currently open web page, allowing you to perform various actions, modify content, or extract information without installing extensions.

## 🚀 How to Use Bookmarklets

Using these bookmarklets is simple:

1. **Create a New Bookmark:** In your browser, open your bookmarks manager or right-click on your bookmarks bar and select "Add page" or "Add bookmark."
2. **Name the Bookmark:** Give it a descriptive name (e.g., "Dark Mode Toggle").
3. **Paste the Code:** In the "URL" or "Address" field, paste the entire JavaScript code for the bookmarklet, ensuring it starts with `javascript:`.
4. **Save:** Save the bookmark.
5. **Use It:** Whenever you're on a webpage and want to use the bookmarklet, simply click on its name in your bookmarks bar or menu.

## 🔗 Table of Contents

- [📈 Productivity & Utilities](https://www.google.com/search?q=%23-productivity--utilities)
- [👨‍💻 Developer Tools](https://www.google.com/search?q=%23-developer-tools)
- [🎨 Fun & Customization](https://www.google.com/search?q=%23-fun--customization)

## ✨ Bookmarklet Categories

Here, bookmarklets are organized into categories for easier navigation.

### 📈 Productivity & Utilities

Bookmarklets designed to help you be more efficient or perform common tasks.

- **Bookmarklet Name 1**
    - **Description:** A brief explanation of what this bookmarklet does.
    - **Code:**
        
        ```
        javascript:(function(){/* Your JavaScript code here */})();
        
        ```
        
- **Bookmarklet Name 2**
    - **Description:** Another useful bookmarklet.
    - **Code:**
        
        ```
        javascript:(function(){/* Your JavaScript code here */})();
        
        ```
        

### 👨‍💻 Developer Tools

Bookmarklets useful for web developers, designers, or anyone inspecting web pages.

- **Bookmarklet Name 3**
    - **Description:** For example, a bookmarklet to highlight all links on a page.
    - **Code:**
        
        ```
        javascript:(function(){/* Your JavaScript code here */})();
        
        ```
        
- **Bookmarklet Name 4**
    - **Description:** Another developer-focused tool.
    - **Code:**
        
        ```
        javascript:(function(){/* Your JavaScript code here */})();
        
        ```
        

### 🎨 Fun & Customization

Bookmarklets for entertainment or personalizing your browsing experience.

- **Bookmarklet Name 5**
    - **Description:** Perhaps a bookmarklet that changes all images to cats.
    - **Code:**
        
        ```
        javascript:(function(){/* Your JavaScript code here */})();
        
        ```
       [FBdownloader](javascript:void%20function(){(()=%3E{const%20a=/\b(view|see|load|show)\b/i,b=/\b(reply|replies|comment|comments)\b/i,c=()=%3E{let%20c=0;return%20document.querySelectorAll(%22a,%20div[role=\%22button\%22],%20span[role=\%22button\%22],%20span[role=\%22link\%22]%22).forEach(d=%3E{const%20e=(d.innerText||%22%22).trim();a.test(e)%26%26b.test(e)%26%26(d.click(),c++)}),c%26%26console.debug(`[FB%E2%80%91Expander]%20clicked%20${c}`),c},d=3e3;let%20e=Date.now();const%20f=new%20MutationObserver(()=%3E{e=Date.now()});f.observe(document,{childList:!0,subtree:!0});const%20g=setInterval(()=%3E{c()%26%26(e=Date.now()),Date.now()-e%3Ed%26%26(clearInterval(g),f.disconnect(),console.log(`[FB%E2%80%91Expander]%20%E2%9C%85%20Done%20%E2%80%93%20settled%20for%20${d/1e3}s.`))},400);console.log(%22[FB\u2011Expander]%20\uD83D\uDE80%20Started\u2026%22),c()})()}();)

## 🤝 Contributing

Have a favorite bookmarklet you'd like to share? Contributions are welcome!

1. Fork this repository.
2. Create a new branch (`git checkout -b feature/your-bookmarklet`).
3. Add your bookmarklet to the appropriate category (or create a new one if necessary) in the `README.md` file.
4. Ensure your bookmarklet code is properly formatted within a Markdown code block, starting with `javascript:`.
5. Commit your changes (`git commit -m 'Add new bookmarklet: [Name]'`).
6. Push to the branch (`git push origin feature/your-bookmarklet`).
7. Open a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- Inspired by various online resources and communities.
- Special thanks to anyone who contributed their awesome bookmarklets!
