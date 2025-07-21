(async () => {
  /* ─ helpers ─ */
  const $ = (q, c = document) => [...c.querySelectorAll(q)];
  const add = (url, meta, map) => {
    if (!url || url.startsWith('blob:') || map.has(url)) return;
    map.set(url, { u: url, ...meta });
  };
  const fmtD  = s => isFinite(s) ? new Date(s * 1e3).toISOString().substr(11, 8) : ' ?';
  const fmtMB = b => b ? (b / 1048576).toFixed(2) + ' MB' : ' ?';

  /* ─ neat-ify address bar (no reload) ─ */
  {
    const m = location.href.match(/[?&]v=(\d{5,})/);
    if (m && /facebook\.com\/watch/.test(location.href)) {
      history.replaceState(
        null, '',
        `https://www.facebook.com/story.php?story_fbid=${m[1]}&id=${m[1]}`
      );
    }
  }

  /* ─ collect candidate MP4 URLs ─ */
  const collectDOM = () => {
    const map = new Map();
    $('video').forEach(v => {
      const meta = { w: v.videoWidth, h: v.videoHeight, d: v.duration };
      add(v.currentSrc || v.src, meta, map);
      $('source', v).forEach(s => add(s.src, meta, map));
    });
    $('meta[property="og:video"], meta[property="og:video:secure_url"]')
      .forEach(t => add(t.content, {}, map));
    $('[data-store]').forEach(el => {
      let ds = el.getAttribute('data-store'); if (!ds) return;
      try {
        ds = JSON.parse(ds.replace(/&quot;/g, '"').replace(/&amp;/g, '&'));
        ['src', 'hd_src', 'sd_src'].forEach(k => add(ds[k], {}, map));
      } catch {}
    });
    return [...map.values()];
  };

  const collectJSON = () => {
    const urls = new Set();
    const rx = /"(?:playable_url_quality_hd|playable_url|hd_src(?:_no_ratelimit)?|sd_src(?:_no_ratelimit)?)"\s*:\s*"([^"]+?\.mp4[^"]*?)"/g;
    $('script').forEach(s => {
      let m; while ((m = rx.exec(s.textContent))) {
        urls.add(
          m[1].replace(/\\\//g,'/').replace(/\\u0025/gi,'%').replace(/\\u0026/gi,'&')
        );
      }
    });
    return [...urls].map(u => ({ u }));
  };

  const list = [
    ...new Map([...collectDOM(), ...collectJSON()].map(o => [o.u, o])).values()
  ];

  if (!list.length) {
    alert('No video found.\n• Click the play button once, then run the bookmarklet again.');
    return;
  }

  /* ─ fetch file sizes (HEAD) – optional ─ */
  await Promise.all(list.map(async o => {
    try { o.sz = +(await fetch(o.u, { method:'HEAD' })).headers.get('content-length') || 0; }
    catch { o.sz = 0; }
  }));

  /* ─ popup UI ─ */
  const modal = document.createElement('div');
  modal.id = 'fbDLgui';
  modal.innerHTML = /*html*/`
  <style>
    #fbDLgui{position:fixed;inset:0;z-index:2147483647;background:#0004;backdrop-filter:blur(2px);}
    #fbDLbox{position:absolute;top:8vh;left:50%;transform:translateX(-50%);
             width:80%;max-width:700px;height:80vh;background:#fff;border-radius:10px;
             box-shadow:0 6px 24px #0003;display:flex;flex-direction:column;font:14px/1.4 sans-serif;}
    #fbDLhdr{display:flex;align-items:center;justify-content:space-between;padding:10px 16px;
             background:#4267B2;color:#fff;border-radius:10px 10px 0 0;}
    #fbDLhdr h2{margin:0;font-size:15px;font-weight:600;}
    #fbDLclose{border:none;background:none;color:#fff;font-size:22px;cursor:pointer;}
    #fbDLtbl{flex:1 1 auto;margin:0 16px 16px;overflow:auto;border:1px solid #ddd;}
    #fbDLtbl table{border-collapse:collapse;width:100%;}
    #fbDLtbl th,#fbDLtbl td{padding:6px 8px;text-align:left;border-bottom:1px solid #eee;font-size:13px;}
    #fbDLtbl th{background:#f5f6fa;position:sticky;top:0;}
    #fbDLtbl tr:hover{background:#fafbff;}
  </style>
  <div id="fbDLbox">
    <div id="fbDLhdr"><h2>Facebook&nbsp;Video&nbsp;Downloader</h2><button id="fbDLclose">×</button></div>
    <div id="fbDLtbl"><table>
      <thead><tr><th>File</th><th>Resolution</th><th>Duration</th><th>Size</th></tr></thead>
      <tbody></tbody>
    </table></div>
  </div>`;
  document.body.appendChild(modal);

  const tbody   = modal.querySelector('tbody');
  const shorten = s => s.length > 40 ? `${s.slice(0,18)}…${s.slice(-18)}` : s;

  list.forEach(o => {
    const name = shorten(decodeURIComponent(o.u.split('/').pop().split('?')[0]) || '(unnamed)'),
          res  = o.w ? `${o.w}×${o.h}` : ' ?';
    const tr = document.createElement('tr');
    tr.innerHTML =
      `<td><a href="${o.u}" target="_blank" download>${name}</a></td>
       <td>${res}</td>
       <td>${fmtD(o.d)}</td>
       <td>${fmtMB(o.sz)}</td>`;
    tbody.appendChild(tr);
  });

  modal.querySelector('#fbDLclose').onclick = () => modal.remove();
})();
