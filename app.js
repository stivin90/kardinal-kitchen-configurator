// Мебельная фирма Kardinal (offline)
// Откройте index.html двойным кликом — всё работает локально.

const MODULES = [
  // База стандартных модулей под российский рынок (ширины кратны 100 мм; часто встречаются 450 мм и бутылочницы 150/200 мм)
  // kind: base | upper | tall | corner

  // --- Нижний ряд (BASE) ---
  { id: "base-300-door",        title: "Нижний 300 (1 дверца)",           widthMm: 300, depthMm: 600, kind: "base",  doors: 1, drawers: 0 },
  { id: "base-400-door",        title: "Нижний 400 (1 дверца)",           widthMm: 400, depthMm: 600, kind: "base",  doors: 1, drawers: 0 },
  { id: "base-450-door",        title: "Нижний 450 (1 дверца)",           widthMm: 450, depthMm: 600, kind: "base",  doors: 1, drawers: 0 },
  { id: "base-600-doors",       title: "Нижний 600 (2 дверцы)",           widthMm: 600, depthMm: 600, kind: "base",  doors: 2, drawers: 0 },
  { id: "base-800-doors",       title: "Нижний 800 (2 дверцы)",           widthMm: 800, depthMm: 600, kind: "base",  doors: 2, drawers: 0 },

  { id: "base-400-3draw",       title: "Нижний 400 (3 ящика)",            widthMm: 400, depthMm: 600, kind: "base",  doors: 0, drawers: 3 },
  { id: "base-600-3draw",       title: "Нижний 600 (3 ящика)",            widthMm: 600, depthMm: 600, kind: "base",  doors: 0, drawers: 3 },
  { id: "base-800-3draw",       title: "Нижний 800 (3 ящика)",            widthMm: 800, depthMm: 600, kind: "base",  doors: 0, drawers: 3 },

  { id: "base-600-sink",        title: "Тумба мойки 600 (2 дверцы)",      widthMm: 600, depthMm: 600, kind: "base",  doors: 2, drawers: 0, hasSink: true },
  { id: "base-600-oven",        title: "Тумба под духовой 600",           widthMm: 600, depthMm: 600, kind: "base",  doors: 0, drawers: 1, hasOven: true },
  { id: "base-600-dw",          title: "Под ПММ 600 (фасад)",             widthMm: 600, depthMm: 600, kind: "base",  doors: 1, drawers: 0, hasDishwasher: true },
  { id: "base-150-bottle",      title: "Бутылочница 150 (выкатная)",      widthMm: 150, depthMm: 600, kind: "base",  doors: 0, drawers: 1, isPullOut: true },
  { id: "base-200-bottle",      title: "Бутылочница 200 (выкатная)",      widthMm: 200, depthMm: 600, kind: "base",  doors: 0, drawers: 1, isPullOut: true },

  // --- Угловые (CORNER) ---
  { id: "corner-900",           title: "Угловой 900×900",                 widthMm: 900, depthMm: 900, kind: "corner", doors: 1, drawers: 0 },

  // --- Пеналы (TALL) ---
  { id: "tall-600-pantry",      title: "Пенал 600 (кладовая)",            widthMm: 600, depthMm: 600, kind: "tall",  doors: 1, drawers: 1 },
  { id: "tall-600-fridge",      title: "Пенал 600 (под холодильник)",     widthMm: 600, depthMm: 600, kind: "tall",  doors: 1, drawers: 0, hasFridge: true },
  { id: "tall-600-4sections",   title: "Пенал 600 (4 секции)",              widthMm: 600, depthMm: 600, kind: "tall",  doors: 0, drawers: 0, sections: 4 },
  { id: "tall-450-3sections",   title: "Пенал 450 (3 секции)",              widthMm: 450, depthMm: 600, kind: "tall",  doors: 0, drawers: 0, sections: 3 },
  { id: "tall-600-pantry-3door-1draw", title: "Пенал 600 (3 дверцы + 1 ящик)",  widthMm: 600, depthMm: 600, kind: "tall", layout: ["door","door","door","drawer"] },
  { id: "tall-600-pantry-2door-2draw", title: "Пенал 600 (2 дверцы + 2 ящика)", widthMm: 600, depthMm: 600, kind: "tall", layout: ["door","door","drawer","drawer"] },

  // --- Верхний ряд (UPPER) ---
  { id: "upper-300",            title: "Верхний 300 (1 дверца)",          widthMm: 300, depthMm: 320, kind: "upper", doors: 1, drawers: 0 },
  { id: "upper-400",            title: "Верхний 400 (1 дверца)",          widthMm: 400, depthMm: 320, kind: "upper", doors: 1, drawers: 0 },
  { id: "upper-600",            title: "Верхний 600 (2 дверцы)",          widthMm: 600, depthMm: 320, kind: "upper", doors: 2, drawers: 0 },
  { id: "upper-800",            title: "Верхний 800 (2 дверцы)",          widthMm: 800, depthMm: 320, kind: "upper", doors: 2, drawers: 0 },
  { id: "upper-600-hood",       title: "Шкаф под вытяжку 600",            widthMm: 600, depthMm: 320, kind: "upper", doors: 1, drawers: 0, hasHood: true },
];

const COLORS = [
  { id: "white", name: "Белый", base: "#f4f4f2", edge: "#c9c9c6", accent: "#ffffff" },
];

const STATE = {
  wallMm: 3000,
  countertopDepthMm: 600,
  selectedModuleId: MODULES[0].id,
  selectedColorId: "white",
  items: [], // {id, moduleId, colorId}  — в этой демке элементы ВСЕГДА стоят встык слева направо
  ui: { grid: true, labels: true, shadow: true },

  // Drag & snap (перетаскивание с “магнитом” по позициям вставки)
  drag: {
    active: false,
    itemId: null,
    grabOffsetPx: 0,     // где схватили внутри блока
    cursorPx: 0,         // текущая позиция курсора по X в сцене (px)
    insertIndex: null,   // куда вставлять (0..n)
    dragRow: "lower",     // "lower" | "upper"
  },
};

const $ = (id) => document.getElementById(id);

const els = {
  wallInput: $("wallInput"),
  moduleSelect: $("moduleSelect"),
  addBtn: $("addBtn"),
  undoBtn: $("undoBtn"),
  clearBtn: $("clearBtn"),
  hint: $("hint"),
  bom: $("bom"),
  canvas: $("canvas"),
  statWall: $("statWall"),
  statUsed: $("statUsed"),
  statFree: $("statFree"),
  statTop: $("statTop"),
  toggleGrid: $("toggleGrid"),
  toggleLabels: $("toggleLabels"),
  toggleShadow: $("toggleShadow"),
};

function fmtMm(n){ return `${Math.max(0, Math.floor(n))} мм`; }

function computeCountertop(){
  // Авто-расчет столешницы для линейной планировки:
  // длина = сумма ширин нижних модулей (base + corner), пеналы и верхние не входят
  const depthMm = 600;
  const lengthMm = STATE.items.reduce((sum, it) => {
    const m = MODULES.find(x => x.id === it.moduleId);
    if(!m) return sum;
    if(m.kind === "base" || m.kind === "corner") return sum + m.widthMm;
    return sum;
  }, 0);
  const areaM2 = (lengthMm/1000) * (depthMm/1000);
  return { lengthMm, depthMm, areaM2 };
}

function fmtMeters(mm){ return (mm/1000).toFixed(2).replace(".", ","); }
function fmtArea(m2){ return m2.toFixed(2).replace(".", ","); }

function rowOfModuleId(moduleId){
  const m = MODULES.find(x => x.id === moduleId);
  return (m?.kind === "upper") ? "upper" : "lower";
}

function usedWidthMm(row){
  // row: "lower" | "upper" | "all"
  if(row === "all"){
    return Math.max(usedWidthMm("lower"), usedWidthMm("upper"));
  }
  return STATE.items.reduce((sum, it) => {
    const m = MODULES.find(x => x.id === it.moduleId);
    if(!m) return sum;
    const r = (m.kind === "upper") ? "upper" : "lower";
    if(r !== row) return sum;
    return sum + m.widthMm;
  }, 0);
}

function totalWidthMm(){
  // backward compatible: “занято” по стене = max(нижний ряд, верхний ряд)
  return usedWidthMm("all");
}

function canAdd(moduleId){
  const m = MODULES.find(x => x.id === moduleId);
  if(!m) return false;
  const row = (m.kind === "upper") ? "upper" : "lower";
  return usedWidthMm(row) + m.widthMm <= STATE.wallMm;
}

function uid(){
  return (crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()) + "-" + Math.random().toString(16).slice(2);
}

function initUI(){
  // modules
  els.moduleSelect.innerHTML = MODULES.map(m => `<option value="${m.id}">${m.title} — ${m.widthMm} мм</option>`).join("");
  els.moduleSelect.value = STATE.selectedModuleId;

  // colors: фиксированный белый

  // listeners
  els.wallInput.addEventListener("input", () => {
    STATE.wallMm = Number(els.wallInput.value || 0);
    renderAll();
  });

  els.moduleSelect.addEventListener("change", () => {
    STATE.selectedModuleId = els.moduleSelect.value;
    renderAll();
  });

  els.addBtn.addEventListener("click", () => {
    if(!canAdd(STATE.selectedModuleId)) return;
    STATE.items.push({ id: uid(), moduleId: STATE.selectedModuleId, colorId: STATE.selectedColorId });
    renderAll();
  });

  els.undoBtn.addEventListener("click", () => {
    STATE.items.pop();
    renderAll();
  });

  els.clearBtn.addEventListener("click", () => {
    STATE.items = [];
    renderAll();
  });

  els.toggleGrid.addEventListener("change", () => { STATE.ui.grid = els.toggleGrid.checked; renderCanvas(); });
  els.toggleLabels.addEventListener("change", () => { STATE.ui.labels = els.toggleLabels.checked; renderCanvas(); });
  els.toggleShadow.addEventListener("change", () => { STATE.ui.shadow = els.toggleShadow.checked; renderCanvas(); });


  // PDF / print (Save as PDF)
  $("pdfBtn").addEventListener("click", () => {
    if(STATE.items.length === 0){
      toast("Добавьте хотя бы один модуль перед сохранением PDF", true);
      return;
    }

    // Генерируем номер КП только для имени файла (внутри PDF не показываем)
    const { year, seq } = nextKpNumber();
    const filename = formatKpFilename(year, seq);

    // Большинство браузеров предлагает имя файла из document.title
    const prevTitle = document.title;
    document.title = filename;

    preparePrintArea();

    const restoreTitle = () => {
      document.title = prevTitle;
      window.removeEventListener("afterprint", restoreTitle);
    };
    window.addEventListener("afterprint", restoreTitle);

    setTimeout(() => window.print(), 60);
  });

// canvas drag events
  wireCanvasDrag();

  // canvas resize
  window.addEventListener("resize", () => renderCanvas());

  renderAll();
}


function renderAll(){
  // stats
  const used = totalWidthMm();
  els.statWall.textContent = fmtMm(STATE.wallMm);
  els.statUsed.textContent = fmtMm(used);
  els.statFree.textContent = fmtMm(Math.max(0, STATE.wallMm - used));

  const top = computeCountertop();
  if(els.statTop){ els.statTop.textContent = `${fmtArea(top.areaM2)} м²`; }

  // buttons + hint
  const ok = canAdd(STATE.selectedModuleId);
  els.addBtn.disabled = !ok;
  els.undoBtn.disabled = STATE.items.length === 0;
  els.clearBtn.disabled = STATE.items.length === 0;

  if(!ok){
    els.hint.textContent = "Этот модуль не помещается по длине стены. Увеличьте стену или удалите модуль.";
    els.hint.style.color = "rgba(255,77,109,.95)";
  }else{
    els.hint.textContent = "Можно перетаскивать модули мышью — они примагничиваются и меняют порядок.";
    els.hint.style.color = "rgba(255,255,255,.80)";
  }

  // BOM
  renderBOM();

  // canvas
  renderCanvas();
}

function renderBOM(){
  if(STATE.items.length === 0){
    els.bom.innerHTML = `<div class="empty">Пока пусто — добавьте модули слева.</div>`;
    return;
  }
  const list = STATE.items.map(it => {
    const m = MODULES.find(x => x.id === it.moduleId);
    const c = COLORS.find(x => x.id === it.colorId);
    return `<li><b>${m?.title || "?"}</b> — ${m?.widthMm || 0} мм — <span style="color:rgba(255,255,255,.72)">${c?.name || "?"}</span></li>`;
  }).join("");
  els.bom.innerHTML = `<ul>${list}</ul>`;
}


// ---------- Drag & Snap (reorder) ----------
function wireCanvasDrag(){
  const canvas = els.canvas;

  const getLocal = (ev) => {
    const rect = canvas.getBoundingClientRect();
    const x = (ev.clientX - rect.left);
    const y = (ev.clientY - rect.top);
    return { x, y, rect };
  };

  const onDown = (ev) => {
    if(STATE.items.length === 0) return;
    const { x, y } = getLocal(ev);

    const hit = hitTestModule(x, y);
    if(!hit) return;

    STATE.drag.active = true;
    STATE.drag.itemId = hit.itemId;
    STATE.drag.grabOffsetPx = x - hit.rect.x;
    STATE.drag.cursorPx = x;
    STATE.drag.insertIndex = hit.index; // initial
    STATE.drag.dragRow = hit.row || "lower";
    canvas.style.cursor = "grabbing";

    // capture pointer
    canvas.setPointerCapture?.(ev.pointerId);
    renderCanvas();
  };

  const onMove = (ev) => {
    if(!STATE.drag.active) return;
    const { x } = getLocal(ev);
    STATE.drag.cursorPx = x;

    // compute insert index by cursor (snaps to positions)
    STATE.drag.insertIndex = computeInsertIndex(x);
    renderCanvas();
  };

  const onUp = (ev) => {
    if(!STATE.drag.active) return;

    // commit reorder
    commitReorder();

    // reset
    STATE.drag.active = false;
    STATE.drag.itemId = null;
    STATE.drag.grabOffsetPx = 0;
    STATE.drag.cursorPx = 0;
    STATE.drag.insertIndex = null;

    canvas.style.cursor = "default";
    renderAll();
  };

  canvas.addEventListener("pointerdown", onDown);
  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("pointerup", onUp);
  canvas.addEventListener("pointercancel", onUp);

  // Hover cursor feedback
  canvas.addEventListener("mousemove", (ev) => {
    if(STATE.drag.active) return;
    const { x, y } = getLocal(ev);
    const hit = hitTestModule(x, y);
    canvas.style.cursor = hit ? "grab" : "default";
  });
}

function commitReorder(){
  const id = STATE.drag.itemId;
  const dragRow = STATE.drag.dragRow || "lower";
  const insert = STATE.drag.insertIndex;
  if(!id || insert == null) return;

  // Split items into row and other
  const rowItems = [];
  const otherItems = [];
  for(const it of STATE.items){
    const row = rowOfModuleId(it.moduleId);
    if(row === dragRow) rowItems.push(it);
    else otherItems.push(it);
  }

  const idx = rowItems.findIndex(it => it.id === id);
  if(idx < 0) return;

  const [dragged] = rowItems.splice(idx, 1);

  const clamped = Math.max(0, Math.min(insert, rowItems.length));
  rowItems.splice(clamped, 0, dragged);

  // Rebuild STATE.items keeping row grouping order: lower first, then upper
  // (так понятнее пользователю: нижние внизу, верхние наверху)
  if(dragRow === "lower"){
    STATE.items = [...rowItems, ...otherItems];
  } else {
    // dragRow upper
    STATE.items = [...otherItems, ...rowItems];
  }
}

function computeInsertIndex(cursorX){
  const layout = computeLayout(); // packed positions in px
  const dragId = STATE.drag.itemId;
  const dragRow = STATE.drag.dragRow || "lower";

  // Filter positions by row (upper vs lower)
  const filtered = layout.positions.filter(p => {
    if(p.id === dragId) return false;
    return (p.row === dragRow);
  });

  if(filtered.length === 0) return 0;

  // Determine index by cursor relative to centers in this row
  let index = 0;
  for(let i=0;i<filtered.length;i++){
    if(cursorX > filtered[i].center) index = i + 1;
  }

  // “магнит” к стыкам в этой же строке
  const snaps = computeSnapLines(filtered);
  const nearest = nearestSnap(snaps, cursorX, 14);
  if(nearest != null){
    index = nearest.index;
  }

  return index;
}

function computeSnapLines(filteredPositions){
  // Returns array of {x, index} where index = insertion index in filtered list
  const lines = [];
  // start line (before first)
  lines.push({ x: filteredPositions[0].x, index: 0 });

  for(let i=0;i<filteredPositions.length;i++){
    const p = filteredPositions[i];
    lines.push({ x: p.x + p.w, index: i+1 });
  }
  return lines;
}

function nearestSnap(lines, x, thresholdPx){
  let best = null;
  for(const ln of lines){
    const d = Math.abs(ln.x - x);
    if(d <= thresholdPx && (!best || d < best.d)){
      best = { d, index: ln.index };
    }
  }
  return best;
}

function hitTestModule(pxX, pxY){
  const layout = computeLayout();
  const rects = layout.positions; // includes all items, packed
  for(let i=0;i<rects.length;i++){
    const r = rects[i].rect;
    if(pxX >= r.x && pxX <= r.x+r.w && pxY >= r.y && pxY <= r.y+r.h){
      const it = STATE.items.find(x => x.id === rects[i].id);
      const row = it ? rowOfModuleId(it.moduleId) : "lower";
      return { itemId: rects[i].id, rect: r, index: i, row };
    }
  }
  return null;
}

// ---------- Canvas rendering ----------
function renderCanvas(){
  const canvas = els.canvas;
  const wrap = canvas.parentElement;
  const ctx = canvas.getContext("2d");

  const cssW = Math.max(640, wrap.clientWidth);
  const cssH = Math.max(420, wrap.clientHeight);

  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.floor(cssW * dpr);
  canvas.height = Math.floor(cssH * dpr);
  canvas.style.width = cssW + "px";
  canvas.style.height = cssH + "px";

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  // clear
  ctx.clearRect(0, 0, cssW, cssH);

  // scene
  const pad = 26;
  const sceneW = cssW - pad*2;
  const sceneH = cssH - pad*2;

  // background vignette
  const grad = ctx.createRadialGradient(cssW*0.3, cssH*0.25, 10, cssW*0.3, cssH*0.25, cssW);
  grad.addColorStop(0, "rgba(255,255,255,.08)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0,0,cssW,cssH);

  // frame
  roundRect(ctx, pad, pad, sceneW, sceneH, 16, "rgba(255,255,255,.06)", "rgba(255,255,255,.14)");

  // scale by wall
  const wall = Math.max(1, STATE.wallMm);

    // Масштаб строго по длине стены: на канвасе всегда помещается вся указанная длина
  const wallScale = (sceneW / wall);
  const scale = wallScale;



  // baseline
  const baseY = pad + sceneH*0.72;
  const floorY = baseY + 74;

  // grid
  if(STATE.ui.grid){
    drawGrid(ctx, pad, pad, sceneW, sceneH, 50, "rgba(255,255,255,.06)");
    // ticks along wall
    drawWallTicks(ctx, pad, baseY+100, sceneW, wall, scale);
  }

  // floor
  ctx.strokeStyle = "rgba(255,255,255,.12)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad, floorY);
  ctx.lineTo(pad + sceneW, floorY);
  ctx.stroke();

  // layout for drawing (packed)
  const layout = computeLayout({ cssW, cssH, pad, sceneW, sceneH, baseY, scale });

  // free space highlight
  const used = totalWidthMm();
  const freeMm = Math.max(0, wall - used);
  const freePx = Math.floor(freeMm * scale);
  const usedPx = Math.floor(used * scale);
  const freeX = pad + usedPx;

  if(freeMm > 0){
    const fxg = ctx.createLinearGradient(freeX, 0, freeX + freePx, 0);
    fxg.addColorStop(0, "rgba(44,230,166,.10)");
    fxg.addColorStop(1, "rgba(124,92,255,.08)");
    ctx.fillStyle = fxg;
    ctx.fillRect(freeX, baseY-280, freePx, 300);

    ctx.fillStyle = "rgba(255,255,255,.78)";
    ctx.font = "12px ui-sans-serif, system-ui";
    ctx.fillText(`Свободно: ${Math.floor(freeMm)} мм`, freeX + 10, baseY-250);
  }

  // draw non-drag items in their computed positions (with placeholder gap if dragging)
  for(const p of layout.drawPositions){
    const it = STATE.items.find(x => x.id === p.id);
    if(!it) continue;
    const m = MODULES.find(x => x.id === it.moduleId);
    const c = COLORS.find(x => x.id === it.colorId);
    if(!m || !c) continue;

    drawCabinet(ctx, p.rect.x, p.rect.y, p.rect.w, p.rect.h, m, c, {
      shadow: STATE.ui.shadow,
      labels: STATE.ui.labels,
      alpha: p.alpha ?? 1,
    });
  }

  // insertion indicator
  if(STATE.drag.active){
    drawInsertLine(ctx, layout.insertLineX, pad+18, baseY+96);
  }

  // dragged ghost on top
  if(STATE.drag.active && layout.dragGhost){
    const g = layout.dragGhost;
    const it = STATE.items.find(x => x.id === g.id);
    if(it){
      const m = MODULES.find(x => x.id === it.moduleId);
      const c = COLORS.find(x => x.id === it.colorId);
      if(m && c){
        drawCabinet(ctx, g.rect.x, g.rect.y, g.rect.w, g.rect.h, m, c, {
          shadow: true,
          labels: STATE.ui.labels,
          alpha: 0.95,
          glow: true,
        });
      }
    }
  }

  // title
  ctx.fillStyle = "rgba(255,255,255,.85)";
  ctx.font = "13px ui-sans-serif, system-ui";
  ctx.fillText("План (2D) — перетаскивание + магнит по стыкам", pad, pad + 18);
}

function computeLayout(scene){
  // Computes packed positions in px for current items.
  // ВАЖНО: верхний и нижний ряды имеют СВОИ курсоры X, поэтому верхние модули не создают “дыр” в нижнем ряду.

  const canvas = els.canvas;
  const wrap = canvas.parentElement;

  const cssW = scene?.cssW ?? Math.max(640, wrap.clientWidth);
  const cssH = scene?.cssH ?? Math.max(420, wrap.clientHeight);
  const pad = scene?.pad ?? 26;
  const sceneW = scene?.sceneW ?? (cssW - pad*2);
  const wall = Math.max(1, STATE.wallMm);
  const wallScale = (sceneW / wall);

  // Horizontal auto-fit: масштаб под текущую ширину модулей (увеличиваем/уменьшаем автоматически)
  // При этом ограничиваем чрезмерное увеличение (чтобы не было гигантских модулей, когда их мало)
  const usedMmAll = Math.max(1, totalWidthMm());
  const fitScale = (sceneW / usedMmAll);
  const scale = scene?.scale ?? Math.min(fitScale, wallScale * 1.45);
  // Base line is anchored near the bottom; then we derive heights so everything fits vertically on small screens.
  const baseY = scene?.baseY ?? (cssH - pad - 46);

  // Vertical sizing (responsive): keep tall cabinets and upper row inside the canvas.
  const topLimit = pad + 12;
  const availableH = Math.max(180, baseY - topLimit);
  const tallH = Math.min(350, availableH);
  const upperH = Math.min(140, Math.max(110, Math.floor(tallH * 0.40)));
  const upperGap = Math.max(170, tallH - upperH); // distance from baseY to bottom of upper modules
  const baseH = Math.min(170, Math.max(130, Math.floor(tallH * 0.50)));

  const positions = [];

  let xLowerMm = 0;
  let xUpperMm = 0;

  // Сегменты пеналов по X (в мм) в нижнем ряду — чтобы верхние шкафы не рисовались поверх пеналов
  const tallSegments = [];
  let scanX = 0;
  for(const it of STATE.items){
    const m = MODULES.find(x => x.id === it.moduleId);
    if(!m) continue;
    const row = (m.kind === "upper") ? "upper" : "lower";
    if(row !== "lower") continue;

    const start = scanX;
    const end = scanX + m.widthMm;
    if(m.kind === "tall"){
      tallSegments.push({ start, end });
    }
    scanX = end;
  }

  function bumpUpperCursorIfOverTall(){
    // если текущий xUpperMm попадает внутрь пенала — перескакиваем в конец пенала
    let changed = true;
    while(changed){
      changed = false;
      for(const seg of tallSegments){
        if(xUpperMm >= seg.start && xUpperMm < seg.end){
          xUpperMm = seg.end;
          changed = true;
        }
      }
    }
  }

  for(const it of STATE.items){
    const m = MODULES.find(x => x.id === it.moduleId);
    if(!m) continue;

    const row = (m.kind === "upper") ? "upper" : "lower";

    // width in px uses module width (same for both rows)
    const w = Math.max(32, Math.round(m.widthMm * scale));

    let h;
    if(m.kind === "tall") h = tallH;
    else if(m.kind === "upper") h = upperH;
    else h = baseH;

    // X depends on row cursor
    let x;
    if(row === "upper"){
      bumpUpperCursorIfOverTall();
      x = pad + Math.floor(xUpperMm * scale);
      xUpperMm += m.widthMm;
      bumpUpperCursorIfOverTall();
    } else {
      x = pad + Math.floor(xLowerMm * scale);
      xLowerMm += m.widthMm;
    }

    // Y depends on row
    let y;
    if(row === "upper"){
      const upperBottomY = baseY - upperGap;
      y = upperBottomY - h;
    } else {
      y = baseY - h;
    }

    positions.push({
      id: it.id,
      row,
      x, w, center: x + w/2,
      rect: { x, y, w, h },
    });
  }

  // dragging arrangement

  if(!STATE.drag.active || !STATE.drag.itemId){
    return { positions, drawPositions: positions.map(p => ({id:p.id, rect:p.rect})), insertLineX: null, dragGhost: null };
  }

  const dragId = STATE.drag.itemId;
  const dragPos = positions.find(p => p.id === dragId);
  if(!dragPos){
    return { positions, drawPositions: positions.map(p => ({id:p.id, rect:p.rect})), insertLineX: null, dragGhost: null };
  }

  // filtered positions (without dragged)
  const dragRow = STATE.drag.dragRow || "lower";
  const filtered = positions.filter(p => p.id !== dragId && p.row === dragRow);

  // compute insertion line X based on insertIndex in filtered list
  let insertIndex = STATE.drag.insertIndex;
  if(insertIndex == null) insertIndex = 0;
  insertIndex = Math.max(0, Math.min(insertIndex, filtered.length));

  let lineX;
  if(filtered.length === 0){
    lineX = pad;
  } else if(insertIndex === 0){
    lineX = filtered[0].x;
  } else {
    const prev = filtered[insertIndex - 1];
    lineX = prev.x + prev.w;
  }

  // build drawPositions with placeholder gap (skip dragged) — pack left->right but leave space where insertion is
  const draggedW = dragPos.w;
  const drawPositions = [];

  // We repack based on original module widths but with insertion gap
  // We'll use filtered items order as current order (without dragged) but visually insert a gap at insertIndex.
  // First, map id->w,h via existing positions
  const map = new Map();
  for(const p of positions) map.set(p.id, p);

  // Construct a virtual list with null placeholder representing dragged slot
  const virt = filtered.map(p => p.id);
  virt.splice(insertIndex, 0, null);

  let xPx = pad;
  for(const id of virt){
    if(id === null){
      xPx += draggedW;
      continue;
    }
    const p = map.get(id);
    if(!p) continue;
    const r = { x: xPx, y: p.rect.y, w: p.rect.w, h: p.rect.h };
    drawPositions.push({ id, rect: r, alpha: 0.92 });
    xPx += p.rect.w;
  }

  // ghost position follows cursor (x only), but snaps to lineX (magnet) when close
  const cursorX = STATE.drag.cursorPx;
  const wantedX = cursorX - STATE.drag.grabOffsetPx;
  const snapThreshold = 16; // px
  const ghostX = (Math.abs(wantedX - lineX) <= snapThreshold) ? lineX : wantedX;

  const ghostRect = {
    x: clamp(ghostX, pad, pad + sceneW - draggedW),
    y: dragPos.rect.y,
    w: dragPos.rect.w,
    h: dragPos.rect.h,
  };

  return {
    positions,
    drawPositions,
    insertLineX: lineX,
    dragGhost: { id: dragId, rect: ghostRect },
  };
}

function clamp(v, a, b){ return Math.max(a, Math.min(b, v)); }

function drawInsertLine(ctx, x, y1, y2){
  ctx.save();
  ctx.strokeStyle = "rgba(124,92,255,.95)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x, y1);
  ctx.lineTo(x, y2);
  ctx.stroke();

  // little caps
  ctx.fillStyle = "rgba(124,92,255,.95)";
  ctx.beginPath(); ctx.arc(x, y1, 5, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(x, y2, 5, 0, Math.PI*2); ctx.fill();
  ctx.restore();
}

// --- drawing helpers ---
function roundRect(ctx, x, y, w, h, r, fill, stroke){
  const rr = Math.min(r, w/2, h/2);
  ctx.beginPath();
  ctx.moveTo(x+rr, y);
  ctx.arcTo(x+w, y, x+w, y+h, rr);
  ctx.arcTo(x+w, y+h, x, y+h, rr);
  ctx.arcTo(x, y+h, x, y, rr);
  ctx.arcTo(x, y, x+w, y, rr);
  ctx.closePath();
  if(fill){ ctx.fillStyle = fill; ctx.fill(); }
  if(stroke){ ctx.strokeStyle = stroke; ctx.lineWidth = 1; ctx.stroke(); }
}

function drawGrid(ctx, x, y, w, h, step, color){
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  for(let i=step; i<w; i+=step){
    ctx.beginPath(); ctx.moveTo(x+i, y); ctx.lineTo(x+i, y+h); ctx.stroke();
  }
  for(let j=step; j<h; j+=step){
    ctx.beginPath(); ctx.moveTo(x, y+j); ctx.lineTo(x+w, y+j); ctx.stroke();
  }
  ctx.restore();
}

function drawWallTicks(ctx, x, y, w, wallMm, scale){
  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,.12)";
  ctx.fillStyle = "rgba(255,255,255,.55)";
  ctx.font = "11px ui-sans-serif, system-ui";
  ctx.lineWidth = 1;

  const major = 500;
  const minor = 100;

  for(let mm=0; mm<=wallMm; mm+=minor){
    const px = x + Math.floor(mm * scale);
    const isMajor = (mm % major === 0);
    ctx.beginPath();
    ctx.moveTo(px, y);
    ctx.lineTo(px, y + (isMajor ? 10 : 6));
    ctx.stroke();
    if(isMajor){
      ctx.fillText(String(mm), px + 2, y + 22);
    }
  }
  // baseline
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x+w, y); ctx.stroke();
  ctx.restore();
}

function drawCabinet(ctx, x, y, w, h, mod, col, opts){
  const shadow = opts.shadow !== false;
  const labels = !!opts.labels;
  const alpha = (opts.alpha == null) ? 1 : opts.alpha;

  ctx.save();
  ctx.globalAlpha = alpha;

  // glow for dragged
  if(opts.glow){
    ctx.save();
    ctx.shadowColor = "rgba(124,92,255,.55)";
    ctx.shadowBlur = 18;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    roundRect(ctx, x, y, w, h, 14, "rgba(124,92,255,.08)", "rgba(124,92,255,.20)");
    ctx.restore();
  }

  // shadow
  if(shadow){
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,.28)";
    roundRect(ctx, x+4, y+8, w, h, 14, "rgba(0,0,0,.28)", null);
    ctx.restore();
  }

  // carcass
  const carcassFill = "rgba(250,252,255,.10)";
  const carcassStroke = "rgba(255,255,255,.18)";
  roundRect(ctx, x, y, w, h, 14, carcassFill, carcassStroke);

  // inner inset area
  const inset = 10;
  const ix = x + inset;
  const iy = y + inset;
  const iw = w - inset*2;
  const ih = h - inset*2;

  // facade base with subtle gradient
  const g = ctx.createLinearGradient(ix, iy, ix+iw, iy+ih);
  g.addColorStop(0, shade(col.base, 0.10));
  g.addColorStop(1, shade(col.base, -0.06));
  roundRect(ctx, ix, iy, iw, ih, 12, g, col.edge);

  // panel frame (filenka)
  const frame = 10;
  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,.22)";
  ctx.lineWidth = 1;
  roundRect(ctx, ix+frame, iy+frame, iw-frame*2, ih-frame*2, 10, null, "rgba(255,255,255,.10)");
  ctx.restore();

  // if layout: custom stacked segments (door/drawer)
  if(mod.layout && Array.isArray(mod.layout) && mod.layout.length){
    const gap = 6;
    const n = mod.layout.length;
    const segH = Math.floor((ih - gap*(n-1)) / n);
    for(let i=0;i<n;i++){
      const sy = iy + i*(segH+gap);
      const type = mod.layout[i];
      if(type === "drawer"){
        drawDrawerFront(ctx, ix, sy, iw, segH, col, i);
      } else {
        // door
        drawDoorFront(ctx, ix, sy, iw, segH, col, 0, 1);
      }
    }
  } else if(mod.sections && mod.sections > 0){
    const gap = 6;
    const n = mod.sections;
    const sectionH = Math.floor((ih - gap*(n-1)) / n);
    for(let i=0;i<n;i++){
      const sy = iy + i*(sectionH+gap);
      drawDoorFront(ctx, ix, sy, iw, sectionH, col, 0, 1);
    }
  } else if(mod.drawers && mod.drawers > 0){
    const gap = 6;
    const sectionH = Math.floor((ih - gap*(mod.drawers-1)) / mod.drawers);
    for(let i=0;i<mod.drawers;i++){
      const sy = iy + i*(sectionH+gap);
      drawDrawerFront(ctx, ix, sy, iw, sectionH, col, i);
    }
  } else {
    // doors split
    const doors = mod.doors || 1;
    const gap = 6;
    const doorW = Math.floor((iw - gap*(doors-1)) / doors);
    for(let i=0;i<doors;i++){
      const sx = ix + i*(doorW+gap);
      drawDoorFront(ctx, sx, iy, doorW, ih, col, i, doors);
    }
  }

  // corner hint (diagonal)
  if(mod.kind === "corner"){
    ctx.save();
    ctx.strokeStyle = "rgba(255,255,255,.22)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(ix + 8, iy + ih - 8);
    ctx.lineTo(ix + iw - 8, iy + 8);
    ctx.stroke();
    ctx.restore();
  }

  // sink icon
  if(mod.hasSink){
    const s = Math.max(32, Math.floor(iw*0.35));
    const sx = ix + Math.floor((iw - s)/2);
    const sy = iy + Math.floor(ih*0.30);
    ctx.save();
    roundRect(ctx, sx, sy, s, Math.floor(s*0.75), 10, "rgba(0,0,0,.18)", "rgba(255,255,255,.18)");
    ctx.strokeStyle = "rgba(255,255,255,.20)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(sx+6, sy+10);
    ctx.lineTo(sx+s-6, sy+10);
    ctx.stroke();
    ctx.restore();
  }

  // hood icon
  if(mod.hasHood){
    const hw = Math.max(46, Math.floor(iw*0.55));
    const hx = ix + Math.floor((iw-hw)/2);
    const hy = iy + Math.floor(ih*0.30);
    ctx.save();
    roundRect(ctx, hx, hy, hw, 26, 10, "rgba(0,0,0,.20)", "rgba(255,255,255,.18)");
    ctx.fillStyle = "rgba(255,255,255,.16)";
    ctx.fillRect(hx+10, hy+8, hw-20, 4);
    ctx.restore();
  }

  // dishwasher hint
  if(mod.hasDishwasher){
    ctx.save();
    ctx.strokeStyle = "rgba(255,255,255,.22)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(ix+12, iy+12, iw-24, ih-24);
    ctx.stroke();
    ctx.restore();
  }

  // fridge hint
  if(mod.hasFridge){
    ctx.save();
    ctx.strokeStyle = "rgba(255,255,255,.20)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(ix+18, iy+18);
    ctx.lineTo(ix+18, iy+ih-18);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(ix+iw-18, iy+18);
    ctx.lineTo(ix+iw-18, iy+ih-18);
    ctx.stroke();
    ctx.restore();
  }

  // oven cutout
  if(mod.hasOven){
    const ow = Math.max(60, Math.floor(iw*0.72));
    const oh = Math.max(50, Math.floor(ih*0.28));
    const ox = ix + Math.floor((iw - ow)/2);
    const oy = iy + Math.floor(ih*0.46);
    ctx.save();
    roundRect(ctx, ox, oy, ow, oh, 10, "rgba(0,0,0,.38)", "rgba(255,255,255,.18)");
    // glass shine
    const gg = ctx.createLinearGradient(ox, oy, ox+ow, oy+oh);
    gg.addColorStop(0, "rgba(255,255,255,.10)");
    gg.addColorStop(0.45, "rgba(255,255,255,.02)");
    gg.addColorStop(1, "rgba(255,255,255,.12)");
    roundRect(ctx, ox+6, oy+6, ow-12, oh-12, 8, gg, "rgba(255,255,255,.10)");
    // knobs line
    ctx.strokeStyle = "rgba(255,255,255,.22)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(ox+14, oy-10);
    ctx.lineTo(ox+ow-14, oy-10);
    ctx.stroke();
    ctx.restore();
  }

  // label
  if(labels){
    ctx.save();
    ctx.fillStyle = "rgba(255,255,255,.82)";
    ctx.font = "12px ui-sans-serif, system-ui";
    ctx.fillText(`${mod.widthMm} мм`, x + 10, y - 10);
    ctx.restore();
  }

  ctx.restore();
}

function drawDoorFront(ctx, x, y, w, h, col, idx, total){
  const bevel = 8;
  const g = ctx.createLinearGradient(x, y, x+w, y+h);
  g.addColorStop(0, shade(col.accent, 0.06));
  g.addColorStop(1, shade(col.base, -0.08));
  roundRect(ctx, x, y, w, h, 10, g, "rgba(255,255,255,.10)");
  roundRect(ctx, x+bevel, y+bevel, w-bevel*2, h-bevel*2, 8, null, "rgba(0,0,0,.18)");

  // handle position
  const hx = (idx === 0) ? (x + w - 18) : (x + 18);
  const hy = y + h/2;

  // handle
  ctx.save();
  ctx.strokeStyle = "rgba(0,0,0,.35)";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(hx - 10, hy);
  ctx.lineTo(hx + 10, hy);
  ctx.stroke();

  ctx.strokeStyle = "rgba(255,255,255,.12)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(hx - 10, hy - 1);
  ctx.lineTo(hx + 10, hy - 1);
  ctx.stroke();
  ctx.restore();
}

function drawDrawerFront(ctx, x, y, w, h, col, idx){
  const g = ctx.createLinearGradient(x, y, x+w, y+h);
  g.addColorStop(0, shade(col.base, 0.10));
  g.addColorStop(1, shade(col.base, -0.10));
  roundRect(ctx, x, y, w, h, 10, g, "rgba(255,255,255,.10)");

  // handle centered
  const hx = x + w/2;
  const hy = y + h/2;
  ctx.save();
  ctx.strokeStyle = "rgba(0,0,0,.35)";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(hx - 18, hy);
  ctx.lineTo(hx + 18, hy);
  ctx.stroke();
  ctx.strokeStyle = "rgba(255,255,255,.12)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(hx - 18, hy - 1);
  ctx.lineTo(hx + 18, hy - 1);
  ctx.stroke();
  ctx.restore();
}

// color helper: lighten/darken hex or rgb string
function shade(color, amount){
  const c = parseColor(color);
  const t = amount < 0 ? 0 : 255;
  const p = Math.abs(amount);
  const r = Math.floor((t - c.r)*p + c.r);
  const g = Math.floor((t - c.g)*p + c.g);
  const b = Math.floor((t - c.b)*p + c.b);
  return `rgb(${r},${g},${b})`;
}

function parseColor(s){
  if(s.startsWith("#")){
    let hex = s.slice(1).trim();
    if(hex.length === 3){
      hex = hex.split("").map(ch => ch+ch).join("");
    }
    const n = parseInt(hex, 16);
    return { r:(n>>16)&255, g:(n>>8)&255, b:n&255 };
  }
  const m = s.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i);
  if(m) return { r:+m[1], g:+m[2], b:+m[3] };
  return { r:255, g:255, b:255 };
}

// tiny toast
let toastTimer = null;
function toast(msg, isError=false){
  let t = document.getElementById("toast");
  if(!t){
    t = document.createElement("div");
    t.id = "toast";
    t.style.position="fixed";
    t.style.right="16px";
    t.style.bottom="16px";
    t.style.padding="10px 12px";
    t.style.borderRadius="14px";
    t.style.border="1px solid rgba(255,255,255,.14)";
    t.style.background="rgba(0,0,0,.45)";
    t.style.backdropFilter="blur(10px)";
    t.style.color="rgba(255,255,255,.92)";
    t.style.font="13px ui-sans-serif, system-ui";
    t.style.boxShadow="0 10px 30px rgba(0,0,0,.25)";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.borderColor = isError ? "rgba(255,77,109,.55)" : "rgba(44,230,166,.35)";
  t.style.opacity = "1";
  if(toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.style.opacity="0"; }, 2200);
}

initUI();


// ---------- PDF via Print (Save as PDF) ----------
function preparePrintArea(){
  const now = new Date();
  const dateStr = now.toLocaleDateString("ru-RU", { year:"numeric", month:"2-digit", day:"2-digit" });

  const name = ($("clientName")?.value || "").trim() || "—";
  const phone = ($("clientPhone")?.value || "").trim() || "—";
  const note = ($("clientNote")?.value || "").trim() || "—";

  const wall = STATE.wallMm;
  const used = totalWidthMm();
  const free = Math.max(0, wall - used);

  // Canvas image
  const canvas = els.canvas;
  const dataUrl = canvas.toDataURL("image/png", 1.0);

  $("printDate").textContent = dateStr;
  $("printClient").textContent = name;
  $("printPhone").textContent = phone;

  $("printWall").textContent = fmtMm(wall);
  $("printUsed").textContent = fmtMm(used);
  $("printFree").textContent = fmtMm(free);

  const top = computeCountertop();
  const pt = $("printTop");
  if(pt){ pt.textContent = `${fmtMeters(top.lengthMm)} м × ${fmtMm(top.depthMm)} (${fmtArea(top.areaM2)} м²)`; }

  $("printNote").textContent = note;

  const img = $("printImage");
  img.src = dataUrl;

  // BOM html
  $("printBOM").innerHTML = buildBOMHtml();

  const pa = $("printArea");
  if(pa) pa.setAttribute("aria-hidden", "false");
}

function buildBOMHtml(){
  if(STATE.items.length === 0) return "<div>—</div>";
  const rows = STATE.items.map((it) => {
    const m = MODULES.find(x => x.id === it.moduleId);
    const c = COLORS.find(x => x.id === it.colorId);
    return `<li><b>${escapeHtml(m?.title || "?")}</b> — ${m?.widthMm || 0} мм — <span style="color:#555">${escapeHtml(c?.name || "?")}</span></li>`;
  }).join("");
  return `<ul>${rows}</ul>`;
}

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, (ch) => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[ch]));
}


// ---------- KP number (localStorage) ----------
function nextKpNumber(){
  // Формат: KP-KARDINAL-YYYY-0001
  const year = new Date().getFullYear();
  const key = `kardinal_kp_counter_${year}`;
  const current = Number(localStorage.getItem(key) || "0");
  const next = current + 1;
  localStorage.setItem(key, String(next));
  return { year, seq: next };
}

function formatKpFilename(year, seq){
  const padded = String(seq).padStart(4, "0");
  return `KP-KARDINAL-${year}-${padded}`;
}


// ===== Mobile Bar Actions =====
document.addEventListener("DOMContentLoaded",()=>{
  const map = [
    ["mbAdd","addBtn"],
    ["mbUndo","undoBtn"],
    ["mbClear","clearBtn"],
    ["mbPdf","pdfBtn"]
  ];
  map.forEach(([m,orig])=>{
    const mb=document.getElementById(m);
    const o=document.getElementById(orig);
    if(mb && o){
      mb.addEventListener("click",()=>o.click());
    }
  });
});
