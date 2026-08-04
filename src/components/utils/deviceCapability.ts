// CPU core count is a poor proxy for 3D/GPU performance (a powerful gaming
// laptop can still report a low core count) and was skipping 3D on capable
// machines. Only the explicit, user-set reduced-motion preference is a
// reliable signal here.
const isLowPowerDevice = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default isLowPowerDevice;
