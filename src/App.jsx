import React, { useState, useRef, useEffect, useCallback } from "react";
import { Camera, Download, Trash2, X, Sparkles, Lock, RefreshCw, Timer, Heart, Star } from "lucide-react";

/* =========================================================================
   DESIGN TOKENS
   Cream base + deep plum structure + punchy pink & butter-yellow accents.
   Fredoka for display (bubbly personality), Quicksand for body/UI.
   Signature element: the frame-color ring around the live camera view —
   thick, glowing, and swappable — echoed as the "spine" color of every
   card and the strip builder.
   ========================================================================= */

const LOGO_URI = "data:image/png;base64,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";

const COLORS = {
  cream: "#FBF4E8",
  creamDeep: "#F3E9D6",
  plum: "#3D2B4F",
  plumSoft: "#5E4E6B",
  pink: "#FF6FA0",
  pinkSoft: "#FFD6DF",
  lavender: "#C9B8E8",
  yellow: "#FFD873",
  white: "#FFFFFF",
};

const FRAME_COLORS = [
  { name: "Plum", value: "#3D2B4F" },
  { name: "Pink", value: "#FF6FA0" },
  { name: "Lavender", value: "#9B85C9" },
  { name: "Butter", value: "#E8B94F" },
  { name: "Cream", value: "#FBF4E8" },
];

const FILTERS = [
  { key: "none", label: "None", css: "none" },
  { key: "vintage", label: "Vintage", css: "sepia(0.45) contrast(1.1) saturate(1.35) brightness(1.02)" },
  { key: "glow", label: "Soft Glow", css: "brightness(1.15) contrast(0.92) saturate(1.35)" },
  { key: "pastel", label: "Pastel Pink", css: "hue-rotate(-8deg) saturate(1.4) brightness(1.08) contrast(0.95)" },
  { key: "vhs", label: "VHS Glitch", css: "contrast(1.25) saturate(1.7) hue-rotate(6deg) brightness(0.98)" },
  { key: "bw", label: "B & W", css: "grayscale(1) contrast(1.15)" },
];

const STICKERS = ["🎀", "⭐", "✨", "💗", "🐰", "😺", "🍓", "💬"];

const FRAME_STYLES = [
  { key: "polaroid", label: "Polaroid" },
  { key: "pop", label: "Sticker Pop" },
];

/* Cloud-like scalloped divider, reused across sections */
function ScallopDivider({ color = COLORS.plum, flip = false }) {
  return (
    <svg
      viewBox="0 0 400 24"
      preserveAspectRatio="none"
      style={{ width: "100%", height: 20, display: "block", transform: flip ? "rotate(180deg)" : "none" }}
    >
      <path
        d="M0,0 
           Q 12.5,24 25,0 
           Q 37.5,24 50,0 
           Q 62.5,24 75,0 
           Q 87.5,24 100,0 
           Q 112.5,24 125,0 
           Q 137.5,24 150,0 
           Q 162.5,24 175,0 
           Q 187.5,24 200,0
           Q 212.5,24 225,0 
           Q 237.5,24 250,0 
           Q 262.5,24 275,0 
           Q 287.5,24 300,0 
           Q 312.5,24 325,0 
           Q 337.5,24 350,0 
           Q 362.5,24 375,0 
           Q 387.5,24 400,0 
           L400,0 L0,0 Z"
        fill={color}
      />
    </svg>
  );
}

function Sparkle({ style }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" style={{ position: "absolute", ...style }}>
      <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill={COLORS.yellow} opacity="0.9" />
    </svg>
  );
}

export default function KawaiiPhotobooth() {
  const [tab, setTab] = useState("booth");

  /* ---------------- camera ---------------- */
  const videoRef = useRef(null);
  const captureCanvasRef = useRef(null);
  const containerRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [facingMode, setFacingMode] = useState("user");

  const [filterKey, setFilterKey] = useState("none");
  const [frameColor, setFrameColor] = useState(FRAME_COLORS[0].value);
  const [frameStyle, setFrameStyle] = useState("polaroid");
  const [countdownSetting, setCountdownSetting] = useState(3);
  const [countingDown, setCountingDown] = useState(null);
  const [flash, setFlash] = useState(false);

  const [placedStickers, setPlacedStickers] = useState([]); // {id, emoji, xPct, yPct, size}
  const dragId = useRef(null);

  const [photos, setPhotos] = useState([]); // {id, dataUrl, ts}
  const [strips, setStrips] = useState([]); // {id, dataUrl, ts}

  /* ---------------- design tab ---------------- */
  const [template, setTemplate] = useState("strip4");
  const [selectedPhotoIds, setSelectedPhotoIds] = useState([]);
  const [stripFrameColor, setStripFrameColor] = useState(FRAME_COLORS[1].value);
  const [caption, setCaption] = useState("kawaii memories");

  const activeFilter = FILTERS.find((f) => f.key === filterKey) || FILTERS[0];

  /* ---------- camera lifecycle ---------- */
  const startCamera = useCallback(async (mode) => {
    setCameraError(null);
    try {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
      const s = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: mode, width: { ideal: 720 }, height: { ideal: 960 } },
        audio: false,
      });
      setStream(s);
      if (videoRef.current) {
        videoRef.current.srcObject = s;
      }
    } catch (err) {
      setCameraError("no-access");
    }
  }, [stream]);

  useEffect(() => {
    startCamera(facingMode);
    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facingMode]);

  useEffect(() => {
    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- sticker drag on live view ---------- */
  const addSticker = (emoji) => {
    setPlacedStickers((prev) => [
      ...prev,
      { id: `${Date.now()}-${Math.random()}`, emoji, xPct: 50, yPct: 50, size: 44 },
    ]);
  };

  const onPointerDownSticker = (id) => (e) => {
    e.stopPropagation();
    dragId.current = id;
  };

  const onPointerMoveContainer = (e) => {
    if (!dragId.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const xPct = Math.min(96, Math.max(4, ((clientX - rect.left) / rect.width) * 100));
    const yPct = Math.min(96, Math.max(4, ((clientY - rect.top) / rect.height) * 100));
    setPlacedStickers((prev) =>
      prev.map((s) => (s.id === dragId.current ? { ...s, xPct, yPct } : s))
    );
  };

  const onPointerUpContainer = () => {
    dragId.current = null;
  };

  const removeSticker = (id) => {
    setPlacedStickers((prev) => prev.filter((s) => s.id !== id));
  };

  const resizeSticker = (id, delta) => {
    setPlacedStickers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, size: Math.max(20, Math.min(96, s.size + delta)) } : s))
    );
  };

  /* ---------- capture ---------- */
  const drawFrameBorder = (ctx, w, h, style, color) => {
    if (style === "pop") {
      const border = Math.round(w * 0.045);
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = border;
      const r = 28;
      ctx.beginPath();
      ctx.moveTo(border / 2 + r, border / 2);
      ctx.arcTo(w - border / 2, border / 2, w - border / 2, h - border / 2, r);
      ctx.arcTo(w - border / 2, h - border / 2, border / 2, h - border / 2, r);
      ctx.arcTo(border / 2, h - border / 2, border / 2, border / 2, r);
      ctx.arcTo(border / 2, border / 2, w - border / 2, border / 2, r);
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    } else {
      // polaroid: thin colored border + cream caption bar at bottom
      const border = Math.round(w * 0.035);
      const bottomBar = Math.round(h * 0.14);
      ctx.save();
      ctx.fillStyle = COLORS.cream;
      ctx.fillRect(0, h - bottomBar, w, bottomBar);
      ctx.strokeStyle = color;
      ctx.lineWidth = border;
      ctx.strokeRect(border / 2, border / 2, w - border, h - border);
      ctx.restore();
    }
  };

  const captureFrame = () => {
    const video = videoRef.current;
    const canvas = captureCanvasRef.current;
    if (!video || !canvas) return null;
    const w = video.videoWidth || 720;
    const h = video.videoHeight || 960;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");

    ctx.save();
    ctx.filter = activeFilter.css;
    if (facingMode === "user") {
      ctx.translate(w, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0, w, h);
    ctx.restore();

    // VHS scanlines
    if (filterKey === "vhs") {
      ctx.save();
      ctx.globalAlpha = 0.12;
      ctx.fillStyle = "#000000";
      for (let y = 0; y < h; y += 4) {
        ctx.fillRect(0, y, w, 1);
      }
      ctx.restore();
    }

    // stickers
    placedStickers.forEach((s) => {
      const px = (s.xPct / 100) * w;
      const py = (s.yPct / 100) * h;
      ctx.save();
      ctx.font = `${(s.size / 100) * w * 0.8}px serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(s.emoji, px, py);
      ctx.restore();
    });

    drawFrameBorder(ctx, w, h, frameStyle, frameColor);

    const dataUrl = canvas.toDataURL("image/png");
    setPhotos((prev) => [{ id: `${Date.now()}`, dataUrl, ts: Date.now() }, ...prev]);

    setFlash(true);
    setTimeout(() => setFlash(false), 220);

    return dataUrl;
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  /* ---------- one-click auto strip ---------- */
  const [autoTemplate, setAutoTemplate] = useState("strip4");
  const [autoRunning, setAutoRunning] = useState(false);
  const [autoCountdown, setAutoCountdown] = useState(null);
  const [autoProgress, setAutoProgress] = useState(null); // {current, total}

  const waitAutoCountdown = async (seconds) => {
    if (seconds === 0) {
      setAutoCountdown(0);
      await delay(250);
      setAutoCountdown(null);
      return;
    }
    for (let s = seconds; s >= 0; s--) {
      setAutoCountdown(s);
      await delay(750);
    }
    setAutoCountdown(null);
  };

  const runAutoStrip = async () => {
    if (cameraError || autoRunning || countingDown !== null) return;
    setAutoRunning(true);
    const shots = autoTemplate === "single" ? 1 : 4;
    const collected = [];
    for (let i = 0; i < shots; i++) {
      setAutoProgress({ current: i + 1, total: shots });
      await waitAutoCountdown(countdownSetting);
      const dataUrl = captureFrame();
      if (dataUrl) collected.push(dataUrl);
      await delay(550);
    }
    setAutoProgress(null);
    if (collected.length > 0) {
      await buildStripFromDataUrls(collected, autoTemplate, frameColor, caption);
      setTab("gallery");
    }
    setAutoRunning(false);
  };

  const handleCapturePress = () => {
    if (autoRunning) return;
    if (countdownSetting === 0) {
      captureFrame();
      return;
    }
    setCountingDown(countdownSetting);
  };

  useEffect(() => {
    if (countingDown === null) return;
    if (countingDown === 0) {
      captureFrame();
      setCountingDown(null);
      return;
    }
    const t = setTimeout(() => setCountingDown((c) => c - 1), 800);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countingDown]);

  const deletePhoto = (id) => setPhotos((prev) => prev.filter((p) => p.id !== id));
  const deleteStrip = (id) => setStrips((prev) => prev.filter((s) => s.id !== id));

  /* ---------- strip builder ---------- */
  const maxSelectable = template === "strip4" ? 4 : template === "grid2x2" ? 4 : 1;

  const toggleSelectPhoto = (id) => {
    setSelectedPhotoIds((prev) => {
      if (prev.includes(id)) return prev.filter((p) => p !== id);
      if (prev.length >= maxSelectable) return prev;
      return [...prev, id];
    });
  };

  useEffect(() => {
    setSelectedPhotoIds([]);
  }, [template]);

  const buildStripFromDataUrls = async (dataUrls, tmpl, color, cap) => {
    if (!dataUrls || dataUrls.length === 0) return;

    const cellW = 480;
    const cellH = 640;
    const pad = 24;
    const border = 16;
    const captionH = 90;

    let cols = 1, rows = 1;
    if (tmpl === "strip4") { cols = 1; rows = dataUrls.length; }
    if (tmpl === "grid2x2") { cols = 2; rows = Math.ceil(dataUrls.length / 2); }
    if (tmpl === "single") { cols = 1; rows = 1; }

    const canvasW = cols * cellW + pad * (cols + 1);
    const canvasH = rows * cellH + pad * (rows + 1) + captionH;

    const canvas = document.createElement("canvas");
    canvas.width = canvasW;
    canvas.height = canvasH;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvasW, canvasH);

    ctx.fillStyle = COLORS.cream;
    ctx.fillRect(border, border, canvasW - border * 2, canvasH - border * 2);

    const loadImg = (src) =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = src;
      });

    for (let i = 0; i < dataUrls.length; i++) {
      const img = await loadImg(dataUrls[i]);
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = pad + col * (cellW + pad);
      const y = pad + row * (cellH + pad);
      ctx.save();
      ctx.beginPath();
      ctx.rect(x, y, cellW, cellH);
      ctx.clip();
      // cover-fit
      const scale = Math.max(cellW / img.width, cellH / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      ctx.drawImage(img, x + (cellW - dw) / 2, y + (cellH - dh) / 2, dw, dh);
      ctx.restore();
      ctx.strokeStyle = color;
      ctx.lineWidth = 6;
      ctx.strokeRect(x, y, cellW, cellH);
    }

    ctx.fillStyle = color;
    ctx.font = "italic 44px Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText(cap || "kawaii memories", canvasW / 2, canvasH - captionH / 2 + 14);

    const dataUrl = canvas.toDataURL("image/png");
    setStrips((prev) => [{ id: `${Date.now()}`, dataUrl, ts: Date.now() }, ...prev]);
  };

  const buildStrip = async () => {
    const chosen = selectedPhotoIds
      .map((id) => photos.find((p) => p.id === id))
      .filter(Boolean)
      .map((p) => p.dataUrl);
    if (chosen.length === 0) return;
    await buildStripFromDataUrls(chosen, template, stripFrameColor, caption);
    setTab("gallery");
  };

  const download = (dataUrl, name) => {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = name;
    a.click();
  };

  /* ============================= RENDER ============================= */

  return (
    <div style={styles.app}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Quicksand:wght@500;600;700&display=swap');
        * { box-sizing: border-box; font-family: 'Quicksand', sans-serif; }
        .kb-display { font-family: 'Fredoka', sans-serif; }
        .kb-tab-btn { transition: transform 0.15s ease, background 0.15s ease; }
        .kb-tab-btn:active { transform: scale(0.96); }
        .kb-swatch { transition: transform 0.12s ease; cursor: pointer; }
        .kb-swatch:hover { transform: scale(1.12); }
        .kb-shutter { transition: transform 0.12s ease; }
        .kb-shutter:active { transform: scale(0.92); }
        .kb-card { transition: transform 0.15s ease, box-shadow 0.15s ease; }
        .kb-card:hover { transform: translateY(-4px) rotate(-1deg); }
        @keyframes kb-pop { 0% { transform: scale(0.7); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes kb-float { 0%,100% { transform: translateY(0);} 50% { transform: translateY(-6px);} }
        .kb-float { animation: kb-float 3.2s ease-in-out infinite; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.plum}55; border-radius: 8px; }
      `}</style>

      <canvas ref={captureCanvasRef} style={{ display: "none" }} />

      {/* ---------------- HEADER ---------------- */}
      <header style={styles.header}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src={LOGO_URI} alt="Kawaii Booth logo" style={styles.logoImg} />
          <h1 className="kb-display" style={styles.logo}>Kawaii Booth</h1>
        </div>
        <nav style={styles.nav}>
          {[
            { key: "booth", label: "Booth" },
            { key: "design", label: "Design" },
            { key: "gallery", label: "Gallery" },
          ].map((t) => (
            <button
              key={t.key}
              className="kb-tab-btn"
              onClick={() => setTab(t.key)}
              style={{
                ...styles.tabBtn,
                background: tab === t.key ? COLORS.plum : "transparent",
                color: tab === t.key ? COLORS.cream : COLORS.plum,
              }}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      <ScallopDivider color={COLORS.plum} />

      <main style={styles.main}>
        {/* ============================= BOOTH TAB ============================= */}
        {tab === "booth" && (
          <div style={styles.boothGrid}>
            <div>
              <div
                ref={containerRef}
                onMouseMove={onPointerMoveContainer}
                onMouseUp={onPointerUpContainer}
                onMouseLeave={onPointerUpContainer}
                onTouchMove={onPointerMoveContainer}
                onTouchEnd={onPointerUpContainer}
                style={{
                  ...styles.videoFrame,
                  border: `${frameStyle === "pop" ? 14 : 8}px solid ${frameColor}`,
                  boxShadow: `0 0 0 4px ${COLORS.cream}, 0 12px 0 ${frameColor}33, 0 18px 30px -6px ${frameColor}55`,
                  borderRadius: frameStyle === "pop" ? 28 : 10,
                }}
              >
                {cameraError ? (
                  <div style={styles.cameraFallback}>
                    <Camera size={40} color={COLORS.plum} />
                    <p className="kb-display" style={{ color: COLORS.plum, marginTop: 10 }}>
                      Camera not available
                    </p>
                    <p style={{ color: COLORS.plumSoft, fontSize: 13, textAlign: "center", maxWidth: 220 }}>
                      Allow camera access in your browser to start snapping, or check that no other app is using it.
                    </p>
                    <button style={styles.smallBtn} onClick={() => startCamera(facingMode)}>
                      <RefreshCw size={14} /> Try again
                    </button>
                  </div>
                ) : (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        filter: activeFilter.css,
                        transform: facingMode === "user" ? "scaleX(-1)" : "none",
                      }}
                    />
                    {placedStickers.map((s) => (
                      <div
                        key={s.id}
                        onMouseDown={onPointerDownSticker(s.id)}
                        onTouchStart={onPointerDownSticker(s.id)}
                        style={{
                          position: "absolute",
                          left: `${s.xPct}%`,
                          top: `${s.yPct}%`,
                          transform: "translate(-50%, -50%)",
                          fontSize: s.size,
                          cursor: "grab",
                          userSelect: "none",
                          touchAction: "none",
                        }}
                      >
                        <div style={{ position: "relative" }}>
                          <span>{s.emoji}</span>
                          <button
                            onClick={(e) => { e.stopPropagation(); removeSticker(s.id); }}
                            style={styles.stickerRemove}
                          >
                            <X size={10} color="#fff" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {(countingDown !== null || autoCountdown !== null) && (
                      <div style={styles.countdownOverlay} className="kb-display">
                        <div>
                          {autoRunning
                            ? (autoCountdown === null ? "📸" : autoCountdown)
                            : (countingDown === 0 ? "📸" : countingDown)}
                        </div>
                        {autoRunning && autoProgress && (
                          <div style={{ fontSize: 16, marginTop: 4 }}>
                            Shot {autoProgress.current} of {autoProgress.total}
                          </div>
                        )}
                      </div>
                    )}
                    {flash && <div style={styles.flash} />}
                  </>
                )}
              </div>

              <div style={styles.controlsRow}>
                <button
                  className="kb-shutter"
                  onClick={handleCapturePress}
                  disabled={!!cameraError || countingDown !== null || autoRunning}
                  style={{ ...styles.shutterBtn, background: frameColor, opacity: autoRunning ? 0.5 : 1 }}
                  title="Snap a photo"
                >
                  <Camera size={26} color="#fff" />
                </button>
                <button
                  style={styles.smallBtn}
                  onClick={() => setFacingMode((m) => (m === "user" ? "environment" : "user"))}
                >
                  <RefreshCw size={14} /> Flip
                </button>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Timer size={16} color={COLORS.plum} />
                  {[0, 3, 5].map((s) => (
                    <button
                      key={s}
                      onClick={() => setCountdownSetting(s)}
                      style={{
                        ...styles.pillBtn,
                        background: countdownSetting === s ? COLORS.plum : COLORS.creamDeep,
                        color: countdownSetting === s ? COLORS.cream : COLORS.plum,
                      }}
                    >
                      {s === 0 ? "off" : `${s}s`}
                    </button>
                  ))}
                </div>
              </div>

              <div style={styles.privacyNote}>
                <Lock size={13} color={COLORS.plumSoft} />
                <span>Your camera stream and photos stay on this device — nothing is uploaded, ever.</span>
              </div>
            </div>

            {/* side controls */}
            <div style={styles.sideControls}>
              <section style={{ ...styles.panel, borderColor: frameColor }}>
                <p className="kb-display" style={styles.panelTitle}>One-click strip 🎬</p>
                <p style={styles.hint}>
                  Snaps {autoTemplate === "single" ? 1 : 4} photo{autoTemplate === "single" ? "" : "s"} in a row on your timer, then builds the strip for you.
                </p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                  {[
                    { key: "strip4", label: "Classic 4-cut" },
                    { key: "grid2x2", label: "2×2 Grid" },
                    { key: "single", label: "Single" },
                  ].map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setAutoTemplate(t.key)}
                      disabled={autoRunning}
                      style={{
                        ...styles.pillBtn,
                        background: autoTemplate === t.key ? COLORS.plum : COLORS.creamDeep,
                        color: autoTemplate === t.key ? COLORS.cream : COLORS.plum,
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
                <button
                  onClick={runAutoStrip}
                  disabled={!!cameraError || autoRunning || countingDown !== null}
                  style={{
                    ...styles.primaryBtn,
                    width: "100%",
                    justifyContent: "center",
                    background: frameColor,
                    opacity: !!cameraError || autoRunning ? 0.6 : 1,
                  }}
                >
                  <Sparkles size={16} /> {autoRunning ? "Snapping..." : "Start Strip"}
                </button>
              </section>

              <section style={styles.panel}>
                <p className="kb-display" style={styles.panelTitle}>Frame color</p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {FRAME_COLORS.map((c) => (
                    <button
                      key={c.value}
                      className="kb-swatch"
                      onClick={() => setFrameColor(c.value)}
                      title={c.name}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: c.value,
                        border: frameColor === c.value ? `3px solid ${COLORS.plum}` : "3px solid transparent",
                        boxShadow: frameColor === c.value ? `0 0 0 2px ${COLORS.cream}, 0 0 10px ${c.value}` : "none",
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                  {FRAME_STYLES.map((fs) => (
                    <button
                      key={fs.key}
                      onClick={() => setFrameStyle(fs.key)}
                      style={{
                        ...styles.pillBtn,
                        flex: 1,
                        background: frameStyle === fs.key ? COLORS.plum : COLORS.creamDeep,
                        color: frameStyle === fs.key ? COLORS.cream : COLORS.plum,
                      }}
                    >
                      {fs.label}
                    </button>
                  ))}
                </div>
              </section>

              <section style={styles.panel}>
                <p className="kb-display" style={styles.panelTitle}>Filters</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {FILTERS.map((f) => (
                    <button
                      key={f.key}
                      onClick={() => setFilterKey(f.key)}
                      style={{
                        ...styles.pillBtn,
                        background: filterKey === f.key ? COLORS.pink : COLORS.creamDeep,
                        color: filterKey === f.key ? "#fff" : COLORS.plum,
                      }}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </section>

              <section style={styles.panel}>
                <p className="kb-display" style={styles.panelTitle}>Face stickers</p>
                <p style={styles.hint}>Tap to add, then drag onto your face in the preview.</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {STICKERS.map((emoji) => (
                    <button key={emoji} onClick={() => addSticker(emoji)} style={styles.stickerBtn}>
                      {emoji}
                    </button>
                  ))}
                </div>
                {placedStickers.length > 0 && (
                  <div style={{ marginTop: 10, display: "flex", gap: 6 }}>
                    <button
                      style={styles.smallBtn}
                      onClick={() => placedStickers[placedStickers.length - 1] && resizeSticker(placedStickers[placedStickers.length - 1].id, -8)}
                    >
                      Smaller
                    </button>
                    <button
                      style={styles.smallBtn}
                      onClick={() => placedStickers[placedStickers.length - 1] && resizeSticker(placedStickers[placedStickers.length - 1].id, 8)}
                    >
                      Bigger
                    </button>
                    <button style={styles.smallBtn} onClick={() => setPlacedStickers([])}>
                      Clear all
                    </button>
                  </div>
                )}
              </section>
            </div>
          </div>
        )}

        {/* ============================= DESIGN TAB ============================= */}
        {tab === "design" && (
          <div>
            <p className="kb-display" style={styles.sectionTitle}>Build a strip</p>
            {photos.length === 0 ? (
              <EmptyState
                icon={<Camera size={32} color={COLORS.plumSoft} />}
                title="No photos yet"
                subtitle="Snap a few in the Booth tab, then come back to design a strip."
              />
            ) : (
              <>
                <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
                  {[
                    { key: "strip4", label: "Classic 4-cut" },
                    { key: "grid2x2", label: "2×2 Grid" },
                    { key: "single", label: "Single Polaroid" },
                  ].map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setTemplate(t.key)}
                      style={{
                        ...styles.pillBtn,
                        background: template === t.key ? COLORS.plum : COLORS.creamDeep,
                        color: template === t.key ? COLORS.cream : COLORS.plum,
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                <p style={styles.hint}>
                  Select up to {maxSelectable} photo{maxSelectable > 1 ? "s" : ""} ({selectedPhotoIds.length}/{maxSelectable} chosen)
                </p>
                <div style={styles.photoGrid}>
                  {photos.map((p) => {
                    const selected = selectedPhotoIds.includes(p.id);
                    return (
                      <div
                        key={p.id}
                        onClick={() => toggleSelectPhoto(p.id)}
                        className="kb-card"
                        style={{
                          ...styles.photoThumb,
                          outline: selected ? `4px solid ${COLORS.pink}` : `4px solid transparent`,
                        }}
                      >
                        <img src={p.dataUrl} alt="" style={styles.thumbImg} />
                        {selected && (
                          <div style={styles.selectedBadge}>{selectedPhotoIds.indexOf(p.id) + 1}</div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div style={{ ...styles.panel, marginTop: 20 }}>
                  <p className="kb-display" style={styles.panelTitle}>Strip frame color</p>
                  <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
                    {FRAME_COLORS.map((c) => (
                      <button
                        key={c.value}
                        className="kb-swatch"
                        onClick={() => setStripFrameColor(c.value)}
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: "50%",
                          background: c.value,
                          border: stripFrameColor === c.value ? `3px solid ${COLORS.plum}` : "3px solid transparent",
                          boxShadow: stripFrameColor === c.value ? `0 0 10px ${c.value}` : "none",
                          cursor: "pointer",
                        }}
                      />
                    ))}
                  </div>
                  <input
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Add a caption..."
                    style={styles.textInput}
                    maxLength={40}
                  />
                  <button
                    onClick={buildStrip}
                    disabled={selectedPhotoIds.length === 0}
                    style={{
                      ...styles.primaryBtn,
                      opacity: selectedPhotoIds.length === 0 ? 0.5 : 1,
                      marginTop: 14,
                    }}
                  >
                    <Sparkles size={16} /> Compile strip
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* ============================= GALLERY TAB ============================= */}
        {tab === "gallery" && (
          <div>
            <p className="kb-display" style={styles.sectionTitle}>Strips</p>
            {strips.length === 0 ? (
              <EmptyState
                icon={<Sparkles size={32} color={COLORS.plumSoft} />}
                title="No strips yet"
                subtitle="Head to Design to compile your first photo strip."
              />
            ) : (
              <div style={styles.galleryGrid}>
                {strips.map((s) => (
                  <div key={s.id} className="kb-card" style={styles.galleryCard}>
                    <img src={s.dataUrl} alt="" style={styles.galleryImg} />
                    <div style={styles.galleryActions}>
                      <button style={styles.iconBtn} onClick={() => download(s.dataUrl, `kawaii-strip-${s.id}.png`)}>
                        <Download size={15} />
                      </button>
                      <button style={styles.iconBtnDanger} onClick={() => deleteStrip(s.id)}>
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <p className="kb-display" style={{ ...styles.sectionTitle, marginTop: 30 }}>Photos</p>
            {photos.length === 0 ? (
              <EmptyState
                icon={<Camera size={32} color={COLORS.plumSoft} />}
                title="No photos yet"
                subtitle="Snap your first one in the Booth tab!"
              />
            ) : (
              <div style={styles.galleryGrid}>
                {photos.map((p) => (
                  <div key={p.id} className="kb-card" style={styles.galleryCard}>
                    <img src={p.dataUrl} alt="" style={styles.galleryImg} />
                    <div style={styles.galleryActions}>
                      <button style={styles.iconBtn} onClick={() => download(p.dataUrl, `kawaii-photo-${p.id}.png`)}>
                        <Download size={15} />
                      </button>
                      <button style={styles.iconBtnDanger} onClick={() => deletePhoto(p.id)}>
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <ScallopDivider color={COLORS.plum} flip />
      <footer style={styles.footer}>
        <Heart size={12} color={COLORS.pink} fill={COLORS.pink} />
        <span>made for your cutest memories · everything stays on your device</span>
        <Star size={12} color={COLORS.yellow} fill={COLORS.yellow} />
      </footer>
    </div>
  );
}

function EmptyState({ icon, title, subtitle }) {
  return (
    <div style={styles.emptyState}>
      <div className="kb-float">{icon}</div>
      <p className="kb-display" style={{ color: COLORS.plum, fontSize: 17, marginTop: 10 }}>{title}</p>
      <p style={{ color: COLORS.plumSoft, fontSize: 13, marginTop: 4 }}>{subtitle}</p>
    </div>
  );
}

const styles = {
  app: {
    minHeight: "100%",
    background: `linear-gradient(180deg, ${COLORS.cream} 0%, ${COLORS.creamDeep} 100%)`,
    color: COLORS.plum,
    paddingBottom: 20,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 20px 12px",
    background: COLORS.plum,
    flexWrap: "wrap",
    gap: 10,
  },
  logo: { color: COLORS.cream, fontSize: 24, margin: 0, position: "relative" },
  logoImg: { width: 44, height: 44, objectFit: "contain", flexShrink: 0 },
  nav: { display: "flex", gap: 6, background: COLORS.cream + "22", padding: 4, borderRadius: 999 },
  tabBtn: {
    border: "none",
    padding: "8px 16px",
    borderRadius: 999,
    fontWeight: 700,
    fontSize: 13,
    cursor: "pointer",
  },
  main: { padding: "20px 20px 10px", maxWidth: 1000, margin: "0 auto" },
  boothGrid: { display: "grid", gridTemplateColumns: "minmax(260px, 460px) 1fr", gap: 24 },
  videoFrame: {
    position: "relative",
    width: "100%",
    aspectRatio: "3/4",
    overflow: "hidden",
    background: "#000",
    touchAction: "none",
  },
  cameraFallback: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: COLORS.creamDeep,
    padding: 20,
    gap: 4,
  },
  countdownOverlay: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 90,
    color: "#fff",
    background: "rgba(0,0,0,0.25)",
    textShadow: "0 4px 12px rgba(0,0,0,0.4)",
    textAlign: "center",
  },
  flash: { position: "absolute", inset: 0, background: "#fff", animation: "kb-pop 0.22s ease-out" },
  stickerRemove: {
    position: "absolute",
    top: -8,
    right: -10,
    width: 16,
    height: 16,
    borderRadius: "50%",
    background: COLORS.pink,
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  controlsRow: { display: "flex", alignItems: "center", gap: 14, marginTop: 16, flexWrap: "wrap" },
  shutterBtn: {
    width: 58,
    height: 58,
    borderRadius: "50%",
    border: `4px solid ${COLORS.cream}`,
    boxShadow: "0 6px 14px rgba(0,0,0,0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  smallBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 12px",
    borderRadius: 999,
    border: `2px solid ${COLORS.plum}`,
    background: "transparent",
    color: COLORS.plum,
    fontWeight: 600,
    fontSize: 12,
    cursor: "pointer",
  },
  pillBtn: {
    border: "none",
    padding: "7px 14px",
    borderRadius: 999,
    fontWeight: 700,
    fontSize: 12,
    cursor: "pointer",
  },
  privacyNote: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    marginTop: 14,
    fontSize: 11.5,
    color: COLORS.plumSoft,
    background: COLORS.creamDeep,
    padding: "8px 12px",
    borderRadius: 10,
  },
  sideControls: { display: "flex", flexDirection: "column", gap: 16 },
  panel: {
    background: COLORS.white,
    border: `3px solid ${COLORS.plum}`,
    borderRadius: 18,
    padding: 16,
  },
  panelTitle: { margin: "0 0 10px", fontSize: 16, color: COLORS.plum },
  hint: { fontSize: 12, color: COLORS.plumSoft, margin: "0 0 8px" },
  stickerBtn: {
    width: 40,
    height: 40,
    fontSize: 20,
    borderRadius: 12,
    border: `2px solid ${COLORS.creamDeep}`,
    background: COLORS.creamDeep,
    cursor: "pointer",
  },
  sectionTitle: { fontSize: 22, color: COLORS.plum, marginBottom: 14 },
  photoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
    gap: 12,
  },
  photoThumb: {
    position: "relative",
    borderRadius: 12,
    overflow: "hidden",
    cursor: "pointer",
    aspectRatio: "3/4",
  },
  thumbImg: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  selectedBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    background: COLORS.pink,
    color: "#fff",
    width: 22,
    height: 22,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: 700,
  },
  textInput: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 12,
    border: `2px solid ${COLORS.creamDeep}`,
    fontSize: 14,
    fontFamily: "'Quicksand', sans-serif",
  },
  primaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: COLORS.pink,
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: 999,
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
  },
  galleryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
    gap: 16,
  },
  galleryCard: {
    background: COLORS.white,
    border: `3px solid ${COLORS.plum}`,
    borderRadius: 14,
    padding: 8,
    position: "relative",
  },
  galleryImg: { width: "100%", borderRadius: 8, display: "block" },
  galleryActions: { display: "flex", gap: 6, marginTop: 8, justifyContent: "flex-end" },
  iconBtn: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    border: "none",
    background: COLORS.plum,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  iconBtnDanger: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    border: "none",
    background: "#E85D75",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "50px 20px",
    background: COLORS.white,
    borderRadius: 18,
    border: `3px dashed ${COLORS.lavender}`,
    textAlign: "center",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "10px 20px 4px",
    fontSize: 11,
    color: COLORS.plumSoft,
    background: COLORS.plum,
  },
};
