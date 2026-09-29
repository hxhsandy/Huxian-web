// 飾品實驗室草稿。正式 FOX_ITEMS 由遊星驗收後接入。
window.ITEM_LAB_DRAFTS = [
  { id: 'peach-wreath', slot: 'tail', name: '桃花花圈',
    desc: '折下來的桃枝。桃夭說，折枝的人要記得回來還。',
    note: '三朵錯落桃花與兩片綠葉，留空隙圍著尾尖。',
    build: function (anchor, L) {
      var T = L.THREE, r = anchor.userData.tailR || 0.12;
      var g = new T.Group(), front = new T.Group(), sway = new T.Group();
      g.add(front); front.add(sway); g.userData.sway = sway;
      if (!anchor.userData.thumb) {
        var d = new T.Vector3(L.BOW_DIR[0], L.BOW_DIR[1], L.BOW_DIR[2]).normalize();
        var flat = new T.Vector3(d.x, 0, d.z).normalize();
        front.position.copy(flat).multiplyScalar(r * 0.98 + 0.02);
        front.quaternion.setFromUnitVectors(new T.Vector3(0, 0, 1), d);
        front.rotateX(-0.4);
      }
      var flowerGeo = L.peachBlossomGeo(0xe9729f, 0xfbd6e3, 0xa43861, 0.14, 1.05, 0);
      var flowerMat = new T.MeshBasicMaterial({ vertexColors: true, side: T.DoubleSide });
      var blooms = [[-0.105, -0.012, 0.056, -0.25], [0.005, 0.055, 0.066, 0.14], [0.115, -0.03, 0.054, 0.35]];
      blooms.forEach(function (p) {
        var f = new T.Mesh(flowerGeo, flowerMat);
        f.position.set(p[0], p[1], 0.018); f.rotation.z = p[3]; f.scale.setScalar(p[2]); sway.add(f);
      });
      var gold = L.toon(0xf2d16e, { emissive: 0x62420e }), dots = [];
      blooms.forEach(function (p) {
        var geo = L.SPH_LO.clone();
        geo.applyMatrix4(new T.Matrix4().makeScale(0.012, 0.012, 0.006));
        geo.translate(p[0], p[1], 0.029); dots.push(geo);
      });
      sway.add(new T.Mesh(L.mergeGeos(dots), gold));
      var leafMat = L.toon(0x2f7650, { emissive: 0x0d2718 });
      var leafOutline = L.outlineMat(0x17442f, 0.006);
      [[-0.045, -0.07, -0.48], [0.072, 0.09, 0.65]].forEach(function (p) {
        var leaf = L.itemPart(L.SPH_LO, leafMat, leafOutline);
        leaf.position.set(p[0], p[1], 0.012);
        leaf.scale.set(0.018, 0.043, 0.009); leaf.rotation.z = p[2]; sway.add(leaf);
      });
      return g;
    },
    upd: function (obj, t) { obj.userData.sway.rotation.z = 0.055 * Math.sin(t * 1.7); } },

  { id: 'longevity-lock', slot: 'neck', name: '長命鎖',
    desc: '給小孩子戴的長命鎖。塗山說，這是有人拜託她保管的。',
    note: '銀色雲形鎖與橫桿，下方三條珠鍊輕晃。',
    build: function (anchor, L) {
      var T = L.THREE, g = new T.Group(), sh = new T.Shape();
      sh.moveTo(-0.045, 0.055);
      sh.quadraticCurveTo(-0.11, 0.08, -0.094, 0.022);
      sh.quadraticCurveTo(-0.124, -0.014, -0.087, -0.034);
      sh.quadraticCurveTo(-0.092, -0.069, -0.045, -0.052);
      sh.quadraticCurveTo(0, -0.095, 0.045, -0.052);
      sh.quadraticCurveTo(0.092, -0.069, 0.087, -0.034);
      sh.quadraticCurveTo(0.124, -0.014, 0.094, 0.022);
      sh.quadraticCurveTo(0.11, 0.08, 0.045, 0.055);
      sh.lineTo(0.045, 0.032); sh.quadraticCurveTo(0, 0.009, -0.045, 0.032); sh.closePath();
      var silver = L.toon(0xaebfcc, { emissive: 0x213346 });
      var plateGeo = new T.ExtrudeGeometry(sh, { depth: 0.016, bevelEnabled: true, bevelThickness: 0.006, bevelSize: 0.006, bevelSegments: 2 });
      var plate = L.itemPart(plateGeo, silver); g.add(plate);
      var bar = L.itemPart(new T.CylinderGeometry(0.008, 0.008, 0.09, 10), silver);
      bar.rotation.z = Math.PI / 2; bar.position.set(0, 0.064, 0.015); g.add(bar);
      var hole = L.SPH_LO.clone(); hole.applyMatrix4(new T.Matrix4().makeScale(0.012, 0.012, 0.003));
      hole.translate(0, 0.01, 0.031);
      var key = new T.BoxGeometry(0.009, 0.025, 0.004); key.translate(0, -0.009, 0.031);
      g.add(new T.Mesh(L.mergeGeos([hole, key]), L.toon(0x566e7c, { emissive: 0x172631 })));
      var chainGeo = new T.CylinderGeometry(0.003, 0.003, 0.055, 6);
      var chains = [];
      [-0.053, 0, 0.053].forEach(function (x) {
        var swing = new T.Group(); swing.position.set(x, -0.053, 0.012);
        var rod = chainGeo.clone(); rod.translate(0, -0.031, 0);
        var bead = L.SPH_LO.clone(); bead.applyMatrix4(new T.Matrix4().makeScale(0.013, 0.013, 0.012));
        bead.translate(0, -0.067, 0);
        swing.add(new T.Mesh(L.mergeGeos([rod, bead]), silver));
        chains.push(swing); g.add(swing);
      });
      g.position.set(0, -0.052, -0.015); g.scale.setScalar(0.9);
      g.userData.chains = chains;
      return g;
    },
    upd: function (obj, t) {
      obj.userData.chains.forEach(function (chain, i) {
        chain.rotation.z = 0.13 * Math.sin(t * 2.25 + i * 0.82);
      });
    } },

  { id: 'sky-mirror', slot: 'head', name: '天鏡碎片',
    desc: '天門鏡子的一小片。照出來的不是你的臉，是一扇爬滿紫藤的窗。',
    note: '額前銀藍小圓鏡，三片金色吊墜與緩慢掠過的反光。',
    build: function (anchor, L) {
      var T = L.THREE, H = L.HEAD_TOP, g = new T.Group();
      var gold = L.toon(0xe7bd67, { emissive: 0x624011 });
      var mirror = new T.Group(); mirror.rotation.x = -0.52; g.add(mirror);
      var rim = L.itemPart(L.SPH_LO, gold); rim.scale.set(0.079, 0.079, 0.012); mirror.add(rim);
      var face = L.itemPart(L.SPH_LO, L.toon(0xb8deec, { emissive: 0x406b82 }), false);
      face.position.z = 0.012; face.scale.set(0.064, 0.064, 0.005); mirror.add(face);
      var glint = new T.Mesh(L.SPH_LO, new T.MeshBasicMaterial({ color: 0xfff7e4, transparent: true, opacity: 0.68, depthWrite: false }));
      glint.scale.set(0.011, 0.052, 0.003); glint.position.set(-0.04, 0, 0.019);
      glint.rotation.z = -0.35; mirror.add(glint);
      var pendants = [];
      [-0.042, 0, 0.042].forEach(function (x, i) {
        var swing = new T.Group(); swing.position.set(x, -0.074, 0.028);
        var stem = new T.BoxGeometry(0.004, 0.014, 0.004); stem.translate(0, -0.008, 0);
        var tag = new T.BoxGeometry(0.019, 0.057 + (i === 1 ? 0.01 : 0), 0.007);
        tag.translate(0, -0.044, 0);
        swing.add(L.itemPart(L.mergeGeos([stem, tag]), gold));
        pendants.push(swing); g.add(swing);
      });
      g.position.set(-H[0], 0.16 - H[1], 0.245 - H[2]);
      g.userData.glint = glint; g.userData.pendants = pendants;
      return g;
    },
    upd: function (obj, t) {
      var sweep = (t * 0.32) % 1;
      obj.userData.glint.position.x = -0.047 + 0.094 * sweep;
      obj.userData.glint.material.opacity = 0.55 * Math.sin(Math.PI * sweep);
      obj.userData.pendants.forEach(function (p, i) { p.rotation.z = 0.085 * Math.sin(t * 1.8 + i * 0.8); });
    } },

  { id: 'peach-pin', slot: 'head', name: '桃花簪',
    desc: '簪頭的桃花一直沒有謝。',
    note: '桃夭同款耳前桃花、金珠與輕擺紅流蘇。',
    build: function (anchor, L) {
      var T = L.THREE, H = L.HEAD_TOP, g = new T.Group();
      var flower = new T.Mesh(
        L.peachBlossomGeo(0xe9729f, 0xfbd6e3, 0xdb5f90, 0.12, 1.05, 0),
        new T.MeshBasicMaterial({ vertexColors: true, side: T.DoubleSide })
      );
      flower.scale.setScalar(0.088);
      flower.quaternion.setFromUnitVectors(new T.Vector3(0, 0, 1), new T.Vector3(-0.5, 0.42, 0.76).normalize());
      flower.rotateZ(-0.3);
      flower.position.set(-0.01, 0.015, 0.023);
      g.add(flower);
      var center = new T.Mesh(L.SPH_LO, new T.MeshBasicMaterial({ color: 0xf4cd5a }));
      center.position.set(-0.02, 0.019, 0.072); center.scale.set(0.013, 0.013, 0.006); g.add(center);
      var gold = L.toon(0xf2c65a, { emissive: 0x6a4a10 });
      var bead = L.itemPart(L.SPH, gold);
      bead.scale.setScalar(0.018); bead.position.set(-0.082, -0.045, 0.023); g.add(bead);
      var tassel = new T.Group(); tassel.position.set(-0.082, -0.061, 0.023); g.add(tassel);
      var thread = new T.CylinderGeometry(0.0045, 0.0045, 0.035, 6);
      thread.translate(0, -0.0175, 0);
      var tie = L.SPH_LO.clone();
      tie.applyMatrix4(new T.Matrix4().makeScale(0.011, 0.011, 0.009));
      tie.translate(0, -0.045, 0);
      var fringe = new T.CylinderGeometry(0.009, 0.021, 0.087, 10);
      fringe.translate(0, -0.098, 0);
      var tip = L.SPH_LO.clone();
      tip.applyMatrix4(new T.Matrix4().makeScale(0.021, 0.006, 0.021));
      tip.translate(0, -0.142, 0);
      tassel.add(L.itemPart(L.mergeGeos([thread, tie, fringe, tip]), L.toon(0xd8344a, { emissive: 0x5a0c14 }), L.outlineMat(0x8a1a2a, 0.003)));
      g.position.set(-0.185 - H[0], 0.19 - H[1], 0.1 - H[2]);
      g.userData.tassel = tassel;
      return g;
    },
    upd: function (obj, t) { obj.userData.tassel.rotation.z = 0.12 * Math.sin(t * 2.1); } },

  { id: 'red-cord', slot: 'neck', name: '紅繩',
    desc: '兩端都打了結，另一頭不知道繫在誰身上。',
    note: '四環紅色中國結，中央金珠與微擺流蘇。',
    build: function (anchor, L) {
      var T = L.THREE, g = new T.Group();
      var red = L.toon(0xd8344a, { emissive: 0x4a0813 });
      var loops = [];
      [[-0.033, 0.026], [0.033, 0.026], [-0.033, -0.026], [0.033, -0.026]].forEach(function (p) {
        var geo = new T.TorusGeometry(0.031, 0.009, 8, 20);
        geo.applyMatrix4(new T.Matrix4().makeScale(0.95, 1.14, 0.65));
        geo.translate(p[0], p[1], 0);
        loops.push(geo);
      });
      g.add(L.itemPart(L.mergeGeos(loops), red, L.outlineMat(0x8f1c2e, 0.004)));
      var knot = L.itemPart(L.SPH_LO, red, L.outlineMat(0x8f1c2e, 0.004));
      knot.scale.set(0.028, 0.027, 0.018); knot.position.z = 0.012; g.add(knot);
      var gold = L.toon(0xf2c65a, { emissive: 0x6a4a10 });
      var bead = L.itemPart(L.SPH_LO, gold);
      bead.scale.set(0.013, 0.013, 0.008); bead.position.set(0, 0.002, 0.03); g.add(bead);
      var tassel = new T.Group(); tassel.position.set(0, -0.065, 0.006); g.add(tassel);
      var cap = new T.CylinderGeometry(0.015, 0.016, 0.018, 10);
      cap.translate(0, -0.009, 0);
      tassel.add(L.itemPart(cap, gold));
      var strands = [];
      [-0.013, 0, 0.013].forEach(function (x) {
        var s = new T.CylinderGeometry(0.004, 0.006, 0.085, 6);
        s.translate(x, -0.06, 0); strands.push(s);
      });
      tassel.add(L.itemPart(L.mergeGeos(strands), red, L.outlineMat(0x8f1c2e, 0.0025)));
      g.position.set(0, -0.035, -0.015);
      g.userData.tassel = tassel;
      return g;
    },
    upd: function (obj, t) { obj.userData.tassel.rotation.z = 0.09 * Math.sin(t * 1.8); } },

  { id: 'sun-disc', slot: 'head', name: '日輪',
    desc: '很燙。天狐說，以前也有人拿過它，後來往下走了。',
    note: '十二道金色日芒、橙紅日心與柔和脈動聖光。',
    build: function (anchor, L) {
      var T = L.THREE, H = L.HEAD_TOP, g = new T.Group();
      var haloMat = new T.MeshBasicMaterial({ color: 0xffd779, transparent: true, opacity: 0.24, depthWrite: false, blending: T.AdditiveBlending });
      var halo = new T.Mesh(new T.TorusGeometry(0.077, 0.006, 8, 36), haloMat);
      halo.position.z = -0.015; g.add(halo);
      var sh = new T.Shape(), N = 12;
      for (var i = 0; i <= N * 2; i++) {
        var a = Math.PI / 2 + i / (N * 2) * Math.PI * 2, r = i % 2 ? 0.053 : 0.074;
        if (i) sh.lineTo(Math.cos(a) * r, Math.sin(a) * r);
        else sh.moveTo(Math.cos(a) * r, Math.sin(a) * r);
      }
      var sun = L.itemPart(
        new T.ExtrudeGeometry(sh, { depth: 0.009, bevelEnabled: true, bevelThickness: 0.003, bevelSize: 0.003, bevelSegments: 2 }),
        L.toon(0xf2c65a, { emissive: 0x80520f })
      );
      g.add(sun);
      var core = L.itemPart(L.SPH_LO, L.toon(0xffa83a, { emissive: 0x8b3907 }));
      core.scale.set(0.04, 0.04, 0.012); core.position.z = 0.015; g.add(core);
      g.position.set(0.235 - H[0], 0.205 - H[1], 0.075 - H[2]);
      g.rotation.set(-0.15, 0.5, -0.3);
      g.userData.halo = halo;
      return g;
    },
    upd: function (obj, t) { obj.userData.halo.material.opacity = 0.15 + 0.07 * Math.sin(t * 1.9); } },

  { id: 'maple-collar', slot: 'neck', name: '楓葉胸針',
    desc: '背面用金線繡了一個小小的字，已經磨得看不清了。',
    note: '第二關封面同輪廓的厚楓葉：五尖角、細鋸齒與亮橘葉面。',
    build: function (anchor, L) {
      var T = L.THREE, g = new T.Group(), sh = new T.Shape(), radius = 0.105, pts = [];
      var lobes = [[-2, 0.62, 0], [-1, 0.9, 1], [0, 1, 1], [1, 0.9, 1], [2, 0.62, 0]];
      function point(a, r) { return [Math.cos(a) * r * radius, Math.sin(a) * r * radius]; }
      lobes.forEach(function (l) {
        var a = Math.PI / 2 + l[0] * 0.96, len = l[1];
        pts.push(point(a - 0.48, 0.34));
        if (l[2]) {
          pts.push(point(a - 0.27, 0.6 * len), point(a - 0.23, 0.76 * len), point(a - 0.1, 0.66 * len));
        } else pts.push(point(a - 0.16, 0.62 * len));
        pts.push(point(a, len));
        if (l[2]) {
          pts.push(point(a + 0.1, 0.66 * len), point(a + 0.23, 0.76 * len), point(a + 0.27, 0.6 * len));
        } else pts.push(point(a + 0.16, 0.62 * len));
      });
      pts.push(point(-Math.PI / 2 + 0.2, 0.16), point(-Math.PI / 2 - 0.2, 0.16));
      pts.forEach(function (p, i) { if (i) sh.lineTo(p[0], p[1]); else sh.moveTo(p[0], p[1]); });
      sh.closePath();
      var leaf = L.itemPart(
        new T.ExtrudeGeometry(sh, { depth: 0.016, bevelEnabled: true, bevelThickness: 0.002, bevelSize: 0.002, bevelSegments: 2 }),
        L.toon(0xd35b25, { emissive: 0x4c1b0a }), L.outlineMat(0xffcf62, 0.004));
      g.add(leaf);
      var stem = L.itemPart(new T.CylinderGeometry(0.004, 0.0045, 0.07, 6),
        L.toon(0xb85c29, { emissive: 0x371508 }), false);
      stem.position.set(0, -0.038, 0.012); g.add(stem);
      var size = radius / 0.46;
      var face = new T.Mesh(new T.PlaneGeometry(size, size),
        new T.MeshBasicMaterial({ map: L.MAPLE_TEX, color: L.MAPLE_COL[0], transparent: true, depthWrite: false, side: T.DoubleSide }));
      face.position.set(0, size * 0.08, 0.022); g.add(face);
      g.position.set(0, -0.065, 0.025);
      return g;
    } },

  { id: 'tail-tassel', slot: 'tail', name: '流蘇尾飾',
    desc: '桂花樹上掛的那串流蘇，不知道什麼時候掉下來的。',
    note: '妲己封面同款六角深木框黃燈，縮小後漂在尾尖旁。',
    build: function (anchor, L) {
      var T = L.THREE, r = anchor.userData.tailR || 0.12;
      var g = new T.Group(), face = new T.Group(), bob = new T.Group();
      g.add(face); face.add(bob);
      if (!anchor.userData.thumb) {
        var d = new T.Vector3(L.BOW_DIR[0], L.BOW_DIR[1], L.BOW_DIR[2]).normalize();
        var flat = new T.Vector3(d.x, 0, d.z).normalize();
        face.position.copy(flat).multiplyScalar(r * 0.98 + 0.02);
        face.quaternion.setFromUnitVectors(new T.Vector3(0, 0, 1), d);
      }
      bob.position.set(anchor.userData.thumb ? -0.025 : -0.1, 0.045, 0.025);
      bob.scale.setScalar(1.18);
      var wood = L.toon(0x3e171a, { emissive: 0x160708 });
      var woodEdge = L.outlineMat(0xd9b46a, 0.004);
      var paper = new T.Mesh(new T.CylinderGeometry(0.052, 0.052, 0.095, 6),
        L.toon(0xffd186, { emissive: 0xe07020 }));
      bob.add(paper);
      var caps = [L.xf(new T.CylinderGeometry(0.032, 0.055, 0.018, 6), 0, 0.056, 0, 1),
        L.xf(new T.CylinderGeometry(0.055, 0.032, 0.018, 6), 0, -0.056, 0, 1)];
      bob.add(L.itemPart(L.mergeGeos(caps), wood, woodEdge));
      var ribs = [];
      for (var q = 0; q < 6; q++) {
        var a = q / 6 * Math.PI * 2;
        ribs.push(L.xf(new T.BoxGeometry(0.008, 0.101, 0.008),
          Math.sin(a) * 0.052, 0, Math.cos(a) * 0.052, 1));
      }
      bob.add(L.itemPart(L.mergeGeos(ribs), wood, woodEdge));
      var loop = L.itemPart(new T.TorusGeometry(0.011, 0.003, 6, 12), wood, false);
      loop.position.y = 0.073; bob.add(loop);
      var glow = L.sprite(bob, L.glowTex, 0xffd450, 0.36, true);
      glow.position.z = -0.08;
      glow.scale.set(0.34, 0.34, 1);
      g.userData.bob = bob;
      g.userData.glow = glow;
      return g;
    },
    upd: function (obj, t) {
      obj.userData.bob.position.y = 0.045 + 0.009 * Math.sin(t * 1.7);
      obj.userData.bob.rotation.z = 0.07 * Math.sin(t * 1.25);
      obj.userData.glow.material.opacity = 0.36 + 0.18 * Math.sin(t * 1.9);
    } }
];
