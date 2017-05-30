'use strict';

/**
 * Simple linear increasing set of nummeric values.
 *
 * @constructor
 * @param {Number} value Starting value.
 * @public
 */
function Diffset(value) {
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
Diffset.prototype.diff = function diff(value) {
  var currently = this.last;

  this.last = value;
  return value - currently;
};

/**
 * Add new values to the set.
 *
 * @param {Number} arguments Numbers to add to the set.
 * @returns {Diffset}
 * @public
 */
Diffset.prototype.push = function push() {
  for (var i = 0, l = arguments.length; i < l; i++) {
    this.set.push(this.diff(arguments[i]));
  }

  return this;
};

/**
 * Flush the internal set and return a copy of it.
 *
 * @param {Number} value Optional value to set the `last` known value to.
 * @returns {Array} Copy of the internal set we just flushed.
 *
 */
Diffset.prototype.flush = function flush(value) {
  var copy = this.set.slice(0);
  this.set.length = 0;

  if ('number' === typeof value) this.last = value;
  return copy;
};

//
// Expose the module.
//
module.exports = Diffset;
