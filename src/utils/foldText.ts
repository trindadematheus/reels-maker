export default function fold(
  txt: string,
  charNumbers = 28,
  useSpaces: boolean,
  a?: any
): any {
  a = a || [];

  if (txt.length <= charNumbers) {
    a.push(txt);
    return a;
  }

  var line = txt.substring(0, charNumbers);

  if (!useSpaces) {
    a.push(line);

    return fold(txt.substring(charNumbers), charNumbers, useSpaces, a);
  } else {
    var lastSpaceRgx = /\s(?!.*\s)/;
    var idx = line.search(lastSpaceRgx);
    var nextIdx = charNumbers;

    if (idx > 0) {
      line = line.substring(0, idx);
      nextIdx = idx;
    }

    a.push(line);

    return fold(txt.substring(nextIdx), charNumbers, useSpaces, a);
  }
}
