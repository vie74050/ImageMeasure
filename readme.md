# ImageMeasure Template #

Author: Vienna Ly, BCIT LTC 2022

Repo: GitHub https://github.com/vie74050/ImageMeasure

Demo POC: https://vie74050.github.io/ImageMeasure/demo.html

## HTML template setup note: ##

- Get image from HTML: expect 1 <img> tag
- Get scale from table: table format must be

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

- Scale = desred length (L) / pixel length (H)
- SigFig: number of decimals to round L to
    >e.g. for 5.12345 and SigFig = 1, L = 5.1

## Usage in Learning Hub ##

In Edit Mode

1. Insert an image (D2L Learning Hub feature) and adjust size as needed
2. To get pixel length (H), set Scale to 1
    - console output also shows the pixel length
    - increase SigFig for more precision

Exit Edit Mode (Play Mode)

3. Move calliper ends to a known length **L** on image
4. Calculate scale = L / H

In Edit Mode

5. Enter the Scale in the table under "Scale"
6. Set the number of significant figures to show in the table under "SigFig"
