# Website image controls

These Studio extensions are copied into the sibling Studio's `website-images/`
folder by `npm run admin:build`, along with `page-image-catalog.json`.
Edit these originals, not the copied files.

`npm run admin:build` automatically refreshes the page inventory and local-file facts.
`node scripts/image-catalog.mjs` can also refresh the inventory on its own.
No image uploads, replacements or CMS mutations occur during either command.
External previews load from their current URLs; unknown byte sizes stay unknown.
The blog image input only adds file details to the existing Sanity editor.
