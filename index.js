/**
 * Simple linear increasing set of nummeric values.
 *
 * @constructor
 * @param {Number} value Starting value.
 * @public
 */
export default class Diffset {
  constructor(value) {
    this.last = 'number' === typeof value ? value : 0;
    this.set = [];
  }

  /**
   * Calculate the difference between the supplied value and our last known value.
   *
   * @param {Number} value Value to calculate
   * @returns {Number} Positive or negative difference between our last value.
   * @private
   */
  diff(value) {
    var currently = this.last;

    this.last = value;
    return value - currently;
  }

  /**
   * Add new values to the set.
   *
   * @param {Number} arguments Numbers to add to the set.
   * @returns {Diffset}
   * @public
   */
  push(...args) {
    for (var i = 0, l = args.length; i < l; i++) {
      this.set.push(this.diff(args[i]));
    }

    return this;
  }

  /**
   * Extract the internal set and return a copy of it.
   *
   * @param {Number} value Optional value to set the `last` known value to.
   * @returns {Array} Copy of the internal set we just flushed.
   * @public
   */
  extract(value) {
    var copy = this.set.slice(0);
    this.set.length = 0;

    if ('number' === typeof value) this.last = value;
    return copy;
  }
}
