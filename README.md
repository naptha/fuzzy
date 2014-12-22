fuzzy
=====

The main idea is to add fuzzy search to the browser— a goal which is driven by the fact that OCR is rather imperfect. But even with a rather inaccurate recognition, it should be possible to narrow down the candidate space for valid matches with a kind of fuzzy matching pretty easily.

The problem is that there doesn't exist a nice clean API to hijack a browser's find-in-page system. There are probably [totally legitimate security concerns](http://arstechnica.com/security/2012/12/how-script-kiddies-can-hijack-your-browser-to-steal-your-password/) with opening up that kind of functionality (for instance, there was a paper published about a theoretical attack where someone might leak a document filled with "leaked" passwords, and a user might use Ctrl+F to search the list to see if their credentials were afflicted, whereupon the site might open a fraudulent dialog which records keystrokes thus rather ironically giving the attacker passwords). Though there isn't really any reason not to expose it as part of an extension API. 

Firefox has a fuzzier separation between extension and core, so it's [almost](https://addons.mozilla.org/en-US/firefox/addon/smart-find/) [certainly](https://addons.mozilla.org/en-US/firefox/addon/findbar-tweak/?src=search) possible to do it the easy and right way. 

Project Naptha currently has a system where it detects the keystroke Ctrl+F (or Cmd+F or F3) followed by an immediate defocus of the current page as a sign that the find-in-page bar has been summoned. At this point it scrambles to look in the OCR caches of all the pictures and carefully assembles invisible floating DOM elements over all the page's pictures. 

When the page gets returned its focus, the selected bit of text becomes immortalized as the `window.getSelection()` range. Naptha then maps the selected fraud-element to the virtual selection range on a picture before banishing its kin from the realm of the DOM-living.

What if it were possible to poll `getSelection()` continuously, and therefore continuously get a hold of what the current search query was? If the page doesn't have any instances of the search query, you can make sure that every reasonable text candidate exists on the page by constructing a fraud-empire of all one-letter mutations of the current selection. 

Nevermind the issue of how that'd fuck with find counts and stuff. The problem is that the entire premise of that is broken: `getSelection()` doesn't get populated until the find bar is closed. The selection regions don't respond to CSS (they're an undying infernal shade of yellow), and they exist entirely beyond the realm of the DOM. Key events aren't fired, and observing the page scrolls don't provide enough information to narrow down the text to the nearest paragraph, nevermind word. 

But hope isn't lost— because that infernal shade of yellow does show up when creating a page screenshot with `chrome.tabs.captureVisibleTab`. So it may be possible to detect the entrance of the find bar, continuously poll for screenshots, process the images for the bounding boxes of infernal yellow, locating the respective text nodes from the page's DOM, enumerating the single-letter mutations of that string, running the candidates through a fuzzy matching algorithm over the page's OCR'd images, and synthesizing dummy DOM nodes so that this ungodly process can happen oncemore at the next fearful striking of the keyboard.

This means that perhaps, this dream is not dead, merely morbidly ridiculous. 
