/**
 * copied directly from the talktalk login page v2.00t
 * pretty printed with google chrome
 */

var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const base64Encode = function(g) {
  var c, e, a;
  var f, d, b;
  a = g.length;
  e = 0;
  c = "";
  while (e < a) {
    f = g.charCodeAt(e++) & 255;
    if (e == a) {
      c += base64EncodeChars.charAt(f >> 2);
      c += base64EncodeChars.charAt((f & 3) << 4);
      c += "==";
      break
    }
    d = g.charCodeAt(e++);
    if (e == a) {
      c += base64EncodeChars.charAt(f >> 2);
      c += base64EncodeChars.charAt(((f & 3) << 4) | ((d & 240) >> 4));
      c += base64EncodeChars.charAt((d & 15) << 2);
      c += "=";
      break
    }
    b = g.charCodeAt(e++);
    c += base64EncodeChars.charAt(f >> 2);
    c += base64EncodeChars.charAt(((f & 3) << 4) | ((d & 240) >> 4));
    c += base64EncodeChars.charAt(((d & 15) << 2) | ((b & 192) >> 6));
    c += base64EncodeChars.charAt(b & 63)
  }
  return c
};

const SHA256 = function(p) {
  var k = 8;
  var n = 0;

  function i(q, t) {
    var s = (q & 65535) + (t & 65535);
    var r = (q >> 16) + (t >> 16) + (s >> 16);
    return (r << 16) | (s & 65535)
  }

  function e(r, q) {
    return (r >>> q) | (r << (32 - q))
  }

  function f(r, q) {
    return (r >>> q)
  }

  function a(q, s, r) {
    return ((q & s) ^ ((~q) & r))
  }

  function d(q, s, r) {
    return ((q & s) ^ (q & r) ^ (s & r))
  }

  function g(q) {
    return (e(q, 2) ^ e(q, 13) ^ e(q, 22))
  }

  function b(q) {
    return (e(q, 6) ^ e(q, 11) ^ e(q, 25))
  }

  function o(q) {
    return (e(q, 7) ^ e(q, 18) ^ f(q, 3))
  }

  function j(q) {
    return (e(q, 17) ^ e(q, 19) ^ f(q, 10))
  }

  function c(r, s) {
    var E = new Array(1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298);
    var t = new Array(1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225);
    var q = new Array(64);
    var G, F, D, C, A, y, x, w, v, u;
    var B, z;
    r[s >> 5] |= 128 << (24 - s % 32);
    r[((s + 64 >> 9) << 4) + 15] = s;
    for (var v = 0; v < r.length; v += 16) {
      G = t[0];
      F = t[1];
      D = t[2];
      C = t[3];
      A = t[4];
      y = t[5];
      x = t[6];
      w = t[7];
      for (var u = 0; u < 64; u++) {
        if (u < 16) {
          q[u] = r[u + v]
        } else {
          q[u] = i(i(i(j(q[u - 2]), q[u - 7]), o(q[u - 15])), q[u - 16])
        }
        B = i(i(i(i(w, b(A)), a(A, y, x)), E[u]), q[u]);
        z = i(g(G), d(G, F, D));
        w = x;
        x = y;
        y = A;
        A = i(C, B);
        C = D;
        D = F;
        F = G;
        G = i(B, z)
      }
      t[0] = i(G, t[0]);
      t[1] = i(F, t[1]);
      t[2] = i(D, t[2]);
      t[3] = i(C, t[3]);
      t[4] = i(A, t[4]);
      t[5] = i(y, t[5]);
      t[6] = i(x, t[6]);
      t[7] = i(w, t[7])
    }
    return t
  }

  function h(t) {
    var s = Array();
    var q = (1 << k) - 1;
    for (var r = 0; r < t.length * k; r += k) {
      s[r >> 5] |= (t.charCodeAt(r / k) & q) << (24 - r % 32)
    }
    return s
  }

  function m(r) {
    r = r.replace(/\r\n/g, "\n");
    var q = "";
    for (var t = 0; t < r.length; t++) {
      var s = r.charCodeAt(t);
      if (s < 128) {
        q += String.fromCharCode(s)
      } else {
        if ((s > 127) && (s < 2048)) {
          q += String.fromCharCode((s >> 6) | 192);
          q += String.fromCharCode((s & 63) | 128)
        } else {
          q += String.fromCharCode((s >> 12) | 224);
          q += String.fromCharCode(((s >> 6) & 63) | 128);
          q += String.fromCharCode((s & 63) | 128)
        }
      }
    }
    return q
  }

  function l(s) {
    var r = n ? "0123456789ABCDEF" : "0123456789abcdef";
    var t = "";
    for (var q = 0; q < s.length * 4; q++) {
      t += r.charAt((s[q >> 2] >> ((3 - q % 4) * 8 + 4)) & 15) + r.charAt((s[q >> 2] >> ((3 - q % 4) * 8)) & 15)
    }
    return t
  }
  p = m(p);
  return l(c(h(p), p.length * k))
};

module.exports = {
  encode: base64Encode,
  sha256: SHA256
};
