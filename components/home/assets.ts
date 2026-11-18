/**
 * Sketch Steps 2.0 product imagery. Screens are real app screenshots
 * (iOS status bar cropped). Alt text lives in messages/<locale>.json.
 */

export const SCREEN = { width: 826, height: 1692 } as const;

const screen = (name: string) => `/images/v2/${name}.jpg`;

export const screens = {
  home: screen("home"),
  chooseStyle: screen("choose-style"),
  tutorialReadyPortrait: screen("tutorial-ready-portrait"),
  tutorialReadyDog: screen("tutorial-ready-dog"),
  stepViewerPortrait: screen("step-viewer-portrait"),
  stepViewerPortrait2: screen("step-viewer-portrait-2"),
  allStepsPortrait: screen("all-steps-portrait"),
  allStepsDog: screen("all-steps-dog"),
  traceAiEffects: screen("trace-ai-effects"),
  traceAiReady: screen("trace-ai-ready"),
  tracingStudio: screen("tracing-studio"),
  tracingStudioAnime: screen("tracing-studio-anime"),
  freeTutorials: screen("free-tutorials"),
  myGallery: screen("my-gallery"),
} as const;

/**
 * Portrait tutorial used by the interactive demo: the original photo and the
 * 9 generated steps, in order (exported from the app, 3:4 portrait).
 *
 * The step files are only ~299×400 px (trimmed by 3 px per edge to remove export border lines, 292×394), so they are shown at no more than their
 * natural CSS width and served as-is (re-encoding files this small only adds
 * artifacts). Replace them 1:1 with larger exports (ideally 900×1200) and raise
 * STEP_DISPLAY_MAX_WIDTH to sharpen the demo on Retina screens.
 */
export const demo = {
  photo: "/images/v2/demo/portrait-photo.webp",
  photoSize: { width: 1086, height: 1448 },
  stepSize: { width: 292, height: 394 },
  steps: Array.from(
    { length: 9 },
    (_, i) => `/images/v2/demo/portrait-step-${i + 1}.jpg`,
  ),
  /**
   * Per-step framing that puts every step in step 9's frame, so the head keeps
   * the same size, eye line and centreline as the user moves through the steps.
   * The exports were not framed consistently: steps 1-6 are drawn ~5-7% larger
   * and lower. Values were measured by correlating each step's pencil lines
   * with the next one (scale + shift, in source pixels), then chained to step 9.
   * Applied as a CSS transform: files are untouched, nothing is stretched
   * (uniform scale), and scale <= 1 so no step is ever enlarged. Only blank
   * paper leaves the frame; the gap is filled by the paper-coloured stage.
   */
  stepFraming: [
    { scale: 0.931, x: 3.8, y: -23.5 },
    { scale: 0.936, x: 2.8, y: -23.5 },
    { scale: 0.94, x: 1.9, y: -23.5 },
    { scale: 0.955, x: -1, y: -14.9 },
    { scale: 0.95, x: 0, y: -14.9 },
    { scale: 0.945, x: 0, y: -13.9 },
    { scale: 0.995, x: -3, y: 0 },
    { scale: 1, x: -1, y: 0 },
    { scale: 1, x: 0, y: 0 },
  ],
} as const;

/** Largest CSS width a step is drawn at: its natural pixel width. */
export const STEP_DISPLAY_MAX_WIDTH = demo.stepSize.width;
