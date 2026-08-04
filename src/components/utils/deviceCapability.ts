// Cheap heuristic to skip heavy 3D/physics on low-end hardware or when the
// user has asked for reduced motion. Capability doesn't change mid-session,
// so this is safe to call on demand instead of tracking it in state.
const isLowPowerDevice = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
  navigator.hardwareConcurrency <= 4;

export default isLowPowerDevice;
