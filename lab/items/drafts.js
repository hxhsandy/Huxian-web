// 飾品實驗室草稿。正式 FOX_ITEMS 由遊星驗收後接入。
window.ITEM_LAB_DRAFTS = [
  { id: 'peach-wreath', slot: 'tail', name: '桃花花圈',
    desc: '折下來的桃枝。桃夭說，折枝的人要記得回來還。',
    note: '三朵錯落桃花與兩片綠葉，留空隙圍著尾尖。',
    build: function (anchor, L) {
      var T = L.THREE, r = anchor.userData.tailR || 0.12;
      var g = new T.Group(), front = new T.Group(); g.add(front);
      if (!anchor.userData.thumb) {
        var d = new T.Vector3(L.BOW_DIR[0], L.BOW_DIR[1], L.BOW_DIR[2]).normalize();
        var flat = new T.Vector3(d.x, 0, d.z).normalize();
        front.position.copy(flat).multiplyScalar(r * 0.98 + 0.02);
        front.quaternion.setFromUnitVectors(new T.Vector3(0, 0, 1), d);
      }
      var flowerGeo = L.peachBlossomGeo(0xe9729f, 0xfbd6e3, 0xe9c47c, 0.1, 1.05, 0);
      var flowerMat = new T.MeshBasicMaterial({ vertexColors: true, side: T.DoubleSide });
      var blooms = [[-0.105, -0.012, 0.056, -0.25], [0.005, 0.055, 0.066, 0.14], [0.115, -0.03, 0.054, 0.35]];
      blooms.forEach(function (p) {
        var f = new T.Mesh(flowerGeo, flowerMat);
        f.position.set(p[0], p[1], 0.018); f.rotation.z = p[3]; f.scale.setScalar(p[2]); front.add(f);
      });
      var gold = L.toon(0xf2d16e, { emissive: 0x62420e }), dots = [];
      blooms.forEach(function (p) {
        var geo = L.SPH_LO.clone();
        geo.applyMatrix4(new T.Matrix4().makeScale(0.012, 0.012, 0.006));
        geo.translate(p[0], p[1], 0.029); dots.push(geo);
      });
      front.add(new T.Mesh(L.mergeGeos(dots), gold));
      var leafMat = L.toon(0x5c9c69, { emissive: 0x142d1c });
      [[-0.045, -0.07, -0.48], [0.072, 0.09, 0.65]].forEach(function (p) {
        var leaf = L.itemPart(L.SPH_LO, leafMat);
        leaf.position.set(p[0], p[1], 0.012);
        leaf.scale.set(0.018, 0.043, 0.009); leaf.rotation.z = p[2]; front.add(leaf);
      });
      return g;
    },
    upd: function (obj, t) { obj.children[0].rotation.z = 0.055 * Math.sin(t * 1.7); } },

  { id: 'longevity-lock', slot: 'neck', name: '長命鎖',
    desc: '給小孩子戴的長命鎖。塗山說，這是有人拜託她保管的。',
    note: '銀色鎖牌，下方三條銀鍊各帶一顆小珠。',
    build: function (anchor, L) {
      var T = L.THREE, g = new T.Group(), sh = new T.Shape();
      sh.moveTo(-0.062, 0.052); sh.quadraticCurveTo(-0.048, 0.067, -0.032, 0.06);
      sh.quadraticCurveTo(0, 0.044, 0.032, 0.06);
      sh.quadraticCurveTo(0.048, 0.067, 0.062, 0.052);
      sh.lineTo(0.088, -0.034); sh.quadraticCurveTo(0.07, -0.069, 0.035, -0.066);
      sh.quadraticCurveTo(0, -0.086, -0.035, -0.066);
      sh.quadraticCurveTo(-0.07, -0.069, -0.088, -0.034); sh.closePath();
      var silver = L.toon(0xaebfcc, { emissive: 0x213346 });
      var plateGeo = new T.ExtrudeGeometry(sh, { depth: 0.016, bevelEnabled: true, bevelThickness: 0.006, bevelSize: 0.006, bevelSegments: 2 });
      var plate = L.itemPart(plateGeo, silver); g.add(plate);
      var hole = L.SPH_LO.clone(); hole.applyMatrix4(new T.Matrix4().makeScale(0.012, 0.012, 0.003));
      hole.translate(0, 0.01, 0.031);
      var key = new T.BoxGeometry(0.009, 0.025, 0.004); key.translate(0, -0.009, 0.031);
      g.add(new T.Mesh(L.mergeGeos([hole, key]), L.toon(0x566e7c, { emissive: 0x172631 })));
      var chainGeo = new T.CylinderGeometry(0.003, 0.003, 0.055, 6);
      var chains = [];
      [-0.053, 0, 0.053].forEach(function (x) {
        var swing = new T.Group(); swing.position.set(x, -0.053, 0.024);
        var rod = chainGeo.clone(); rod.translate(0, -0.031, 0);
        var bead = L.SPH_LO.clone(); bead.applyMatrix4(new T.Matrix4().makeScale(0.013, 0.013, 0.012));
        bead.translate(0, -0.067, 0);
        swing.add(new T.Mesh(L.mergeGeos([rod, bead]), silver));
        chains.push(swing); g.add(swing);
      });
      g.position.set(0, -0.052, 0.062); g.userData.chains = chains;
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
      var rim = L.itemPart(L.SPH_LO, gold); rim.scale.set(0.079, 0.079, 0.012); g.add(rim);
      var face = L.itemPart(L.SPH_LO, L.toon(0xb8deec, { emissive: 0x406b82 }), false);
      face.position.z = 0.012; face.scale.set(0.064, 0.064, 0.005); g.add(face);
      var glint = new T.Mesh(L.SPH_LO, new T.MeshBasicMaterial({ color: 0xfff7e4, transparent: true, opacity: 0.68, depthWrite: false }));
      glint.scale.set(0.011, 0.052, 0.003); glint.position.set(-0.04, 0, 0.019);
      glint.rotation.z = -0.35; g.add(glint);
      var pendants = [];
      [-0.042, 0, 0.042].forEach(function (x, i) {
        var swing = new T.Group(); swing.position.set(x, -0.074, 0.008);
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
    } }
];
