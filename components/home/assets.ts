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
} as const;

/** Largest CSS width a step is drawn at: its natural pixel width. */
export const STEP_DISPLAY_MAX_WIDTH = demo.stepSize.width;
