function isEqual(a: Record<string, any>, b: Record<string, any>): boolean {

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) {
      return false;
    }

    for (const key of keysA) {
      const valA = a[key];
      const valB = b[key];

      const areObj = (valA !== null && typeof valA === 'object') && (valB !== null && typeof valB === 'object');

      if (areObj) {
        if (!isEqual(valA, valB)) {
          return false;
        }
      } else if (valA !== valB) {
        return false;
      }
    }

    return true;
}

export default isEqual;
