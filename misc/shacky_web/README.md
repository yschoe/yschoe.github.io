# Shacky Tale Web Port

Static web port based on the Python port (`shacky_python/main.py`).

## Files

- `index.html`
- `assets.js` (hard-coded `.fon`, `.sd`, and `map2.map` data)
- `game.js`

## Run

Open directly in browser:

```text
file:///.../shacky_web/index.html
```

Or serve locally:

```bash
cd shacky_web
python -m http.server 8000
# open http://localhost:8000
```

## Controls

- Move: Arrow keys or `8/4/6/2`
- Attack: `A` or `Space`, then direction
- Map view: `M`
- Quit/end: `Esc`

## Notes

- Audio (beeps from `.sd`) starts after first user input due browser autoplay policies.
- Canvas size is fixed at 720x348 and scaled with CSS.
