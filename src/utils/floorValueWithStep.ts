function floorValueWithStep(value: number, step: number) {
  const inv = 1.0 / step;
  return Math.floor(value * inv) / inv;
}

export default floorValueWithStep;
