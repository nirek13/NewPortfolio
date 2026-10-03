/** Shared settings for the signature intro (read by the layout boot script and the loader). */

/** When true the intro plays once per tab session; when false it plays on every full page load. */
export const INTRO_ONCE_PER_SESSION = false;

export const INTRO_SESSION_KEY = 'sig-intro-seen';

/** Minimum time the signature stays on screen, measured from its first painted frame. */
export const INTRO_MIN_VISIBLE_MS = 2600;

/** Pause after the ink finishes before the mark flies into the nav. */
export const INTRO_HOLD_AFTER_INK_MS = 400;

/** Hard ceiling, so a browser that never fires the animation events still releases the page. */
export const INTRO_MAX_WAIT_MS = 5000;

/** Duration of the fly-to-nav exit; keep in sync with `.sig-loader-mark` transition in globals.css. */
export const INTRO_EXIT_MS = 780;
