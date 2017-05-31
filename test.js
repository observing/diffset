import assume from 'assume';
import Diffset from './';

describe('diffset', function () {
  it('is a function', function () {
    assume(Diffset).is.a('function');
  });

  describe('constructor', function () {
    it('can construct a set without arguments', function () {
      var ds = new Diffset();

      assume(ds.last).equals(0);
    });

    it('accepts an initial value', function () {
      var ds = new Diffset(100);

      assume(ds.last).equals(100);
    });
  });

  describe('#diff', function () {
    it('calculates the difference between the previous value', function () {
      var ds = new Diffset();

      ds.last = 0;
      assume(ds.diff(100)).equals(100);

      ds.last = 100;
      assume(ds.diff(120)).equals(20);

      ds.last = 100;
      assume(ds.diff(101)).equals(1);

      ds.last = 100;
      assume(ds.diff(90)).equals(-10);
    });

    it('automatically increases the last with the supplied value', function () {
      var ds = new Diffset();

      assume(ds.last).equals(0);

      ds.diff(100);
      assume(ds.last).equals(100);

      ds.diff(190);
      assume(ds.last).equals(190);
    });
  });

  describe('#push', function () {
    it('adds the diffs into an internal set', function () {
      var ds = new Diffset();

      ds.push(10, 12, 39, 40, 42, 40, 25);

      assume(ds.set).deep.equals([10, 2, 27, 1, 2, -2, -15]);
    });
  });

  describe('#extract', function () {
    it('extracts the data', function () {
      var ds = new Diffset();

      ds.push(10, 12, 39, 40, 42, 40, 25);

      var data = ds.extract();

      assume(data).deep.equals([10, 2, 27, 1, 2, -2, -15]);
      assume(ds.set).deep.equals([]);
    });

    it('resets the internal set', function () {
      var ds = new Diffset();

      ds.push(10, 12, 39, 40, 42, 40, 25);
      assume(ds.set.length).equals(7);

      ds.extract();
      assume(ds.set.length).equals(0);
    });
  });
});
