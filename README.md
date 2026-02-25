# Welcome to triwritescode.com

## Script to convert png to webp

```bash
for f in *.png; do cwebp -q 80 "$f" -o "${f%.png}.webp" && rm "$f"; done
```
