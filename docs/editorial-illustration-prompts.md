# C2 editorial image prompts

## Photographic direction C - 2026-10-07

These three assets were generated with the built-in OpenAI `image_gen.imagegen` tool on 2026-10-07 for the photographic correction of the existing C2 prototype. They are generated conceptual photography: visual metaphors that imitate deliberately staged editorial photographs. They do not document actual installations, events, experiments, research participants, or research data. The geometric working marks in the learning image are a metaphor for attempts and revision, not a validated mathematical construction or a scientific figure.

The shared art direction comes from cinematic framing, natural or gallery-like light, tangible materials, restrained plum shadows, off-white surfaces and small brick-red accents. The images use three distinct article-related ideas: mediated access to sources, responsibility for a final creative selection, and the visible process of learning. They do not claim that AI inevitably harms intelligence.

The previous linocut / woodcut / cut-paper system was replaced. These three old assets were removed from the repository:

- `src/assets/editorial/c2-trust-hidden-sources.png`
- `src/assets/editorial/c2-authorship-final-decision.png`
- `src/assets/editorial/c2-learning-active-reasoning.png`

Their previous prompts remain available in Git history. This document records the replacement assets and their exact generation prompts.

| Final asset | Actual source dimensions | Composition and use |
| --- | --- | --- |
| `src/assets/editorial/c2-trust-mediated-knowledge.png` | 2172 x 724 px | 3:1 panoramic gallery installation; homepage cover and lower article image |
| `src/assets/editorial/c2-authorship-selected-frame.png` | 1536 x 1024 px | 3:2 photographic proofs with a visible final selection |
| `src/assets/editorial/c2-learning-work-in-progress.png` | 1536 x 1024 px | 3:2 tracing-paper attempts, erased graphite and an unfinished construction |

The dimensions above were read from the final PNG files. Requested dimensions within the prompts are generation intentions, not measurements of the returned assets. Astro supplies the responsive optimized image variants; the source PNG files are retained for that pipeline.

## Trust: mediated knowledge

The first generation produced the selected final asset. Exact prompt:

```text
Use case: photorealistic-natural.
Asset type: a cinematic editorial cover photograph for an independent magazine of ideas. Create one very wide panoramic photograph, 3:1 aspect ratio, preferably 3072 x 1024 pixels.

Core idea: knowledge seen through an intermediary layer. In an empty contemporary gallery-like architectural space, a tall freestanding translucent deep-plum glass plane partially conceals an arrangement of archival source materials behind it. Several unbound archival sheets on unobtrusive slim supports and a small uneven stack of source papers are visible partly around the edge and partly through the coloured plane. What is seen through the plane is refracted, compressed or softened while exposed edges remain sharp: the material itself alters access to the evidence. This is a deliberately staged physical installation photographed for an ideas magazine, not an illustration of a diagram.

Composition: strong architectural geometry, a real floor-to-wall junction, deliberate depth and an oblique camera angle. The plum plane and the source materials occupy the upper centre-right and right of the panorama. Keep the lower-left half calm, spacious and light, with quiet off-white floor and wall: a pale editorial text panel will later overlap that area. Keep the principal optical interaction around 65–75 percent of the frame width so a centre-right mobile crop remains compelling. Preserve enough visible source material beyond the glass to communicate mediation, rather than making the glass a decorative object. A SINGLE SMALL brick-red metal wedge at the glass's foot is the only red accent and guides the eye back toward the source materials. No other decorative props.

Art direction and photographic treatment: materially believable, subtly surreal commissioned editorial photography. Real thick translucent coloured glass with convincing edge refraction, slight surface variation, natural contact shadows and optically plausible partial visibility. Sculptural but restrained staging. One strong raking natural light entering from a high unseen gallery window creates precise architectural shadow and luminous glass; quiet gallery ambience fills the shadows. Cinematic composition, controlled highlights, tangible paper grain, contemporary architectural photography. Do not simulate a glossy computer render or a cosy lifestyle still life.

Palette: off-white #FAFAF8 architectural surfaces and paper; charcoal #242026 shadows and a few archival tones; deep plum #4D284C glass; a very small brick-red #B3412B accent. Materials and light should carry these colours naturally.

No people, faces, hands, laptops, monitors, robots, brains, chips, neon, holograms, AI symbols, text labels, legible writing, logos, watermarks, charts, arrows or infographics. No linocut, woodcut, cut-paper illustration, drawn outlines, flat vector graphics, artificial gradient background, soft 3D corporate blobs, notebooks, books as decorative props, coffee cups, plants, cushions, or stock office/lifestyle styling.
```

## Authorship: the selected frame

The first generation produced the selected final asset. Exact prompt:

```text
Use case: photorealistic-natural.
Asset type: an art-directed editorial photograph for a contemporary independent magazine, illustrating human authorship through selecting and revising the final image.
Create a genuinely photographic staged still life, landscape 3:2 at 1536 by 1024 pixels or larger. A close, slightly oblique overhead view of four physical photographic proof prints on a spare matte editing surface. Every print shows the SAME source photograph: an empty modern concrete gallery corner with one tall rectangular opening and one diagonal shaft of daylight. They are recognizable variants of that exact same image, with deliberately different crops, tonal density, and framing, rather than unrelated pictures.
One selected print is clearly dominant in the foreground, squared up and separated slightly from the alternatives. A single confident, restrained brick-red grease-pencil oval around its pale border marks the final selection. A small red crop-corner correction inside its margin records a framing revision. The other three proof variants sit partly overlapped behind it, unmarked and visibly subordinate. Keep the physical papers intact, not cut into a collage. The scene must communicate a considered final choice and responsibility for it, not just a stack of attractive photographs.
Art direction: cinematic editorial photography made for a gallery-minded magazine of ideas. Strong precise framing, real photographic perspective and lens rendering, raking natural or gallery light, sculptural shadows, restrained highlights, detailed fiber-based photographic paper, subtle silver-gelatin-like surface sheen and tiny believable paper-edge irregularities. A purposeful staged image with quiet tension and ample breathing room, no cosy atmosphere. Everything has physical photographic realism; nothing drawn or rendered as illustration.
Palette: paper offwhite #FAFAF8, charcoal #242026, deep plum #4D284C in the editing surface or shaded reflections, and only a small brick-red #B3412B selection mark. Controlled neutral light with deep but legible shadows. The tonal contrast and gesture must remain clear as a thumbnail.
Exclude all text, lettering, numerals, labels, logos, watermarks, typography, hands, people, laptops, screens, keyboards, coffee, books, plants, ordinary lifestyle desk props, robots, brains, chips, holograms, neon, charts, infographic arrows, symbolic diagrams, drawn outlines, linocut, woodcut, cut-paper illustration, cartoon rendering, corporate 3D and beige stock photography. Do not simulate an illustration or a painting. This is a photograph of real proof prints and the physical evidence of one final editorial decision.
```

## Learning: work in progress - successful generation

The second generation produced the selected final asset. It retained the same photographic concept with a shorter description after the first call returned no image. Exact successful prompt:

```text
Create one sophisticated staged editorial PHOTOGRAPH, 3:2 landscape, 1536x1024 or larger. The subject is the physical process of learning through repeated attempts and corrections.
A cinematic close oblique view of three real translucent tracing-paper sheets, partially overlapping on a dark matte surface. The papers carry sparse rough graphite attempts at the same unfinished geometric construction: short hand-drawn line segments, faint erased earlier positions and a few revised angles. Leave the solution incomplete. One tiny terracotta pencil mark highlights the current attempt. Paper fibres, creases, erased graphite dust and a few small eraser crumbs are sharply photographic. A small worn eraser is partly cropped at the lower edge. No other objects.
Carefully directed natural window light skims the paper and casts a deep plum shadow. Palette: off-white paper #FAFAF8, charcoal ground and graphite #242026, rich plum shadows #4D284C, a tiny brick-red accent #B3412B. Quiet composition, strong framing, tactile real materials, restrained contemporary cinematic editorial art direction. The active traces occupy the central two-thirds and remain understandable at thumbnail size.
This must look like a real photograph of a small artist-designed set. Do not render the whole image as a drawing, collage, linocut, woodcut or infographic. The graphite marks are physical marks on photographed paper, without readable text or mathematical notation. No people, hands, computers, books, classroom, logos, watermarks, frames or split panels. No charts or labels. This is a visual metaphor for practice and revision, not an instructional diagram or presentation slide.
```

## Learning: first attempt - no image returned

The first call returned an output moderation error (`moderation_blocked`) and produced no image. This prompt is retained as generation provenance only; it is not the prompt of a separate delivered asset. Exact unsuccessful prompt:

```text
Use case: photorealistic-natural.
Asset type: a staged cinematic editorial photograph for Prompted Psyche, an authorial magazine of ideas about people and AI. One article-specific image about LEARNING AS A PROCESS, not just obtaining a correct result.
Primary request: photograph tangible traces of working towards an answer. A close, oblique cinematic crop of three real sheets of thin translucent drafting paper on a dark charcoal surface. The sheets are slightly staggered, with one crisp paper edge gently rising into the light. On each sheet, a modest graphite construction is attempted again: an incomplete angular path with a few softly erased earlier turns and retraced lines. These are sparse unresolved working traces, not a maze or explanatory chart. A single small brick-red correction mark near the last unfinished turn draws the eye. Fine erased graphite, a few eraser crumbs and slight paper creases make the effort materially visible. One small worn eraser partly enters the lower edge; no other objects.
Meaning: the reader sees attempts, feedback, correction and an unresolved next step. The photograph concerns practising reasoning and building independent skill, without claiming that AI inevitably harms intelligence. It illustrates a question, not data or a scientific result.
Art direction: sophisticated deliberately staged contemporary editorial photography, like a film still of a thought in progress; tactile real paper fibres, real graphite, subtle natural imperfections, strong controlled framing. Photographic surface detail and depth must be unmistakable. Not a drawing, print, linocut, woodcut, cut-paper collage illustration, infographic or stock study-desk photo. The scene is intimate and material, distinct from a gallery installation or photographic proof selection.
Composition: one 3:2 landscape image, 1536x1024 or larger. Close oblique viewpoint, medium-format lens character, main physical process in the central two-thirds, enough breathing room around it to work at magazine thumbnail size. The unfinished pencil attempts are visible but not a busy page of tiny symbols. No hands or people. No computer screen.
Light and color: a precise shaft of soft natural window light rakes across off-white paper #FAFAF8, casting a long deep plum-tinted shadow #4D284C over the charcoal ground #242026. Rich restrained cinematic contrast, one tiny terracotta accent #B3412B. Background visually quiet; paper texture and graphite remain real, not tinted illustration.
Avoid: any legible writing, letters, numerals, formulas, headings, equations, charts, legends, arrows, logos, watermarks, books, classrooms, keyboard, laptop, neon, robots, brains, AI icons, holograms, generic stationery flat-lay, sepia nostalgia, exaggerated fake science, decorative 3D graphics or illustration linework. No frame, no split panels, no before/after graphic.
```
