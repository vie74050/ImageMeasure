# ImageMeasure Template #

Author: Vienna Ly, BCIT LTC 2022

Repo: GitHub <https://github.com/vie74050/ImageMeasure>

Demo on learn.bcit.ca LOR: <https://learn.bcit.ca/d2l/lor/viewer/view.d2l?ou=6605&loIdentId=41801>

## HTML template ##

- Expects 1 `<img>` tag
- Expects a table, format must have Scale and SigFig as headings

```html
<table>
    <thead>
        <tr>
            <th>Scale</th><th>SigFig</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td><td>1</td>
        </tr>
    </tbody>
</table>

```

- Scale = desired length (L) / pixel length (H)
- SigFig: number of decimals to round L to
    >e.g. for 5.12345 and SigFig = 1, L = 5.1

## Usage in Learning Hub ##

>! Documentation below are instructions for using learn.bcit.ca Learning Hub tools, current as of Jun 2022.

### Add NEW from LOR ###

To add the template HTML files from LOR (only need to do this once per course)

1. From **Content**, click **NEW > Add Object From LOR**
2. Search for "Image Measure Template" (include quote marks for specific result)
3. Select item from the search result and then Next. Choose "Copy as Content" when prompted.

>For this component, files will be created in `Coures Files /Interactive/ImageMeasure/` (default)
>
>- demo.html --> use this directly or as Template
>- demo.png

The new page "**Image Measure Demo**" will be added to your **Content**.

### New from Template: creating multiple files ###

Once you have the html file in **Course Files**, you can use it as a template to **Create New** file(s) using the **Select a Document Template** option on Learning Hub.

#### Best Practice ####

- Keep the html page and related image together
- Folder and file names should indicate the Content topic (Content Page name) to which each is associated

>e.g.
>```
>ImageMeasure-TopicName/
>   |_topic.html
>   |_topic.jpg
>
>or 
>
>ImageMeasure/
>    |_topic1.html
>    |_topic1.jpg
>    |_topic2.html
>    |_topic2.jpg
>```

### Editing the Scale and SigFig ###

In Edit Mode

1. Insert an image (D2L Learning Hub feature) and adjust size as needed
2. To get pixel length (H), set Scale to 1
    - console output also shows the pixel length
    - increase SigFig for more precision

Exit Edit Mode (Play Mode)

3. Move calliper ends to a known length **L** on image
4. Calculate Scale = L / H

In Edit Mode

5. Enter the Calculated Scale in the table under "Scale"
6. Set the number of significant figures to show in the table under "SigFig"

### Embed files into other Content pages ###

```html
<iframe src="{OrgUnitPath}Interactive/ImageMeasure/demo.html" 
    marginwidth="0" 
    frameborder="0" 
    height="500" 
    width="100%" 
    scrolling="No">
</iframe>
```

1. Change the `src` path to point to the desired file in Course Files. A quick way to get the file path:
    - Go to the file in **Course Files (a.k.a Manage Files)**
    - Select **Edit File** from the file menu ( ⌄ )  
    - Copy the **File Name** path shown at the top (e.g. `/content/enforced/7541-ViennaLySandbox/Interactive/ImageMeasure/`)
    - Paste to the replace the path`src="___PASTE-FILE-NAME____"`

2. (**As needed**) Adjust the **height**/**width** of the iframe as needed to fit the content
