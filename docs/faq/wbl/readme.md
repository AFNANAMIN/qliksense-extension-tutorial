---
title: What's a .WBL file?
slug: wbl
chapter: faq
draft: false
---

> The Workbench load file (wbfolder.wbl) is used by the Extension- & Mashup editor and contains a list of files which should be loaded into the editor.
When you save an extension- or mashup project from the editor, a WBL file is automatically created and included in the project.

Note: This file is not necessary for using a visualization extension, just in case you have added some files to Workbench and you want to edit those files in Workbench.

If you want to load any existing visualization extension only the main script file + the .qext file will be loaded in Workbench.
By adding additional file names - separated by a semicolon and line carriage - to the wbfolder.wbl you can enable also these additional files to be loaded in Workbench.

```text
my-extension.qext
my-extension.qs
library1.js
library2.js
image1.png
```

